import * as _ from './util'
import { VNODE_TYPE, DIFF_TYPE, COMPONENT_ID } from './constant'
import { checkVtree, shouldUpdate, updatePropsAndState } from './component'
import diff from './diff'

function Vtree(properties) {
	_.extend(this, properties)
}

let noop = () => {}
Vtree.prototype = {
	constructor: Vtree,
	mapTree(iteratee) {
		iteratee(this)
		this.eachChildren(vchild => vchild.mapTree(iteratee))
	},
	attachRef() {
		let { props, context, vtype } = this
		if (!context) {
			return
		}
		let { refs } = context
		let refKey
		let refValue
		if (vtype === VNODE_TYPE.ELEMENT) {
			refValue = this.node
			refValue.getDOMNode = getDOMNode
		} else if (vtype === VNODE_TYPE.COMPONENT) {
			refValue = this.component
		}
		if (refValue && refs && props && props.ref) {
			refKey = props.ref
			if (_.isFn(refKey)) {
				refKey(refValue)
			} else if (_.isStr(refKey)) {
				refs[refKey] = refValue
			}
		}
	},
	detachRef() {
		let { props, context } = this
		if (!context) {
			return
		}
		let { refs } = context
		let refKey
		if (refs && props && props.ref) {
			if (_.isFn(props.ref)) {
				props.ref(null)
			} else {
				delete refs[props.ref]
			}
		}
	},
	updateRef(newVtree) {
		if (this.context !== newVtree.context) {
			this.detachRef()
			newVtree.attachRef()
			return
		}
		let props = this.props
		let newProps = newVtree.props
		let oldTreeRef = props && props.ref
		let newTreeRef = newProps && newProps.ref
		if (_.isUndefined(newTreeRef)) {
			this.detachRef()
		} else if (oldTreeRef !== newTreeRef) {
			this.detachRef()
			newVtree.attachRef()
		}
	},
	eachChildren(iteratee) {
		let { children, sorted } = this
		if (sorted) {
			_.eachItem(children, iteratee)
			return
		}
		if (children && children.length > 0) {
			var newChildren = []
			_.forEach(children, (vchild, index) => {
				vchild = getVnode(vchild)
				iteratee(vchild, index)
				newChildren.push(vchild)
			})
			this.children = newChildren
			this.sorted = true
		}
	},
	updateTree(nextVtree, parentNode) {
		updateTree(this, nextVtree, parentNode)
	}
}

export function Vtext(text) {
	this.text = text
}

Vtext.prototype = new Vtree({
	constructor: Vtext,
	vtype: VNODE_TYPE.TEXT,
	update(nextVtext) {
		let { node, text } = this
		if (nextVtext.text !== text) {
			node.replaceData(0, node.length, nextVtext.text)
		}
		nextVtext.node = this.node
		return this
	},
	initTree(parentNode) {
		this.node = createTextNode(this.text)
		appendNode(parentNode, this.node)
	},
	destroyTree() {
		removeNode(this.node)
	}
})

export function Velem(type, props, children, context) {
	this.type = type
	this.props = props
	this.children = children
	this.context = context
}

let detachTree = vtree => {
	let { vtype } = vtree
	if (vtype === VNODE_TYPE.COMPONENT || vtype === VNODE_TYPE.STATELESS_COMPONENT) {
		vtree.destroyTree()
	} else if (vtype === VNODE_TYPE.ELEMENT) {
		vtree.detachRef()
	}
}
let destroyTree = vtree => vtree.destroyTree()
Velem.prototype = new Vtree({
	constructor: Velem,
	vtype: VNODE_TYPE.ELEMENT,
	initTree(parentNode) {
		let { type, props } = this
		let node = this.node = createElement(type, props)
		this.eachChildren(vchild => {
			vchild.initTree(node)
		})
		appendNode(parentNode, node)
		this.attachRef()
	},
	destroyTree() {
		let { node, props } = this
		this.mapTree(detachTree)
		removeNode(node)
	},
	update(newVelem) {
		let { node, props } = this
		let children = this.children || []
		_.patchProps(node, props, newVelem.props)
		newVelem.node = node
		newVelem.eachChildren((newVchild, index) => {
			newVelem
			let vchild = children[index]
			if (vchild) {
				vchild.updateTree(newVchild, node)
			} else {
				newVchild.initTree(node)
			}
		})

		let newVchildLen = newVelem.children && newVelem.children.length ? newVelem.children.length : 0
		if (children.length > newVchildLen) {
			_.eachItem(children.slice(newVchildLen), destroyTree)
		}
		this.updateRef(newVelem)
	}
})

export function VstatelessComponent(type, props, children, context) {
	this.type = type
	this.props = props
	this.children = children
	this.context = context
}

VstatelessComponent.prototype = new Vtree({
	constructor: VstatelessComponent,
	vtype: VNODE_TYPE.STATELESS_COMPONENT,
	renderTree() {
		let { type: factory } = this
		let props = _.mergeProps(this.props, this.children, factory.defaultProps)
		let vtree = factory(props)
		if (vtree && _.isFn(vtree.render)) {
			vtree = vtree.render()
		}
		this.vtree = getVnode(vtree)
	},
	initTree(parentNode) {
		this.renderTree()
		this.vtree.initTree(parentNode)
		this.node = this.vtree.node
	},
	destroyTree() {
		this.vtree.destroyTree()
		this.node = this.vtree = null
	},
	update(newVtree, parentNode) {
		let { vtree } = this
		newVtree.renderTree()
		vtree.updateTree(newVtree.vtree, parentNode)
	}
})

let curComponent = null
let cacheComponent = null
export let getComponent = () => curComponent
export let setComponent = component => {
	cacheComponent = curComponent
	curComponent = component
}
export let resetComponent = () => {
	curComponent = cacheComponent
}

export function Vcomponent(type, props, children, context) {
	this.type = type
	this.props = props
	this.children = children
	this.context = context
}
Vcomponent.prototype = new Vtree({
	constructor: Vcomponent,
	vtype: VNODE_TYPE.COMPONENT,
	initTree(parentNode) {
		let { type: Component } = this
		let props = _.mergeProps(this.props, this.children, Component.defaultProps)
		let component = this.component = new Component(props)
		let updater = component.$updater
		updater.isPendingForceUpdate = true
		component.props = component.props || props
		component.componentWillMount()
		let nextState = updater.getState()
		if (nextState !== component.state) {
			updatePropsAndState(component, component.props, nextState)
		}
		setComponent(component)
		let vtree = checkVtree(component.render())
		resetComponent()
		component.vtree = vtree
		vtree.initTree(parentNode)
		component.node = this.node = vtree.node
		component.componentDidMount()
		updater.isPendingForceUpdate = false
		this.attachRef()
		updater.emitUpdate()
	},
	destroyTree() {
		let { component, props } = this
		component.componentWillUnmount()
		this.detachRef()
		component.vtree.destroyTree()
		this.component = this.node = component.node = component.refs = null
	},
	update(newVtree, parentNode) {
		let { component } = this
		if (!component) {
			return
		}
		let { type: Component, props, children } = newVtree
		let nextProps = _.mergeProps(props, children, Component.defaultProps)
		let updater = component.$updater
		newVtree.component = component
		updater.isPendingForceUpdate = true
		component.componentWillReceiveProps(nextProps)
		updater.isPendingForceUpdate = false
		this.updateRef(newVtree)
		updater.emitUpdate(nextProps)
	}
})

let updateTree = (vtree, newVtree, parentNode) => {
	let diffType = diff(vtree, newVtree)
	switch (diffType) {
		case DIFF_TYPE.CREATE:
			newVtree.initTree(parentNode)
			break
		case DIFF_TYPE.REMOVE:
			vtree.destroyTree()
			break
		case DIFF_TYPE.REPLACE:
			newVtree.initTree(newNode => {
				replaceNode(parentNode, newNode, vtree.node)
			})
			vtree.destroyTree()
			break
		case DIFF_TYPE.UPDATE:
			vtree.update(newVtree, parentNode)
			break
	}
}

let removeNode = (node) => {
	if (node && node.parentNode) {
		node.parentNode.removeChild(node)
	}
}
let appendNode = (parentNode, node) => {
	if (parentNode && node) {
		if (_.isFn(parentNode)) {
			parentNode(node)
		} else {
			parentNode.appendChild(node)
		}
	}
}
let replaceNode = (parentNode, newNode, existNode) => {
	if (newNode && existNode) {
		parentNode = parentNode || existNode.parentNode
		parentNode.replaceChild(newNode, existNode)
	}
}

let createTextNode = text => document.createTextNode(text)
let createElement = (tagName, props) =>  {
	let node = document.createElement(tagName)
	props && _.setProps(node, props)
	return node
}

export let getVnode = vnode => {
	if (vnode === null || vnode === false) {
		vnode = new Velem('noscript')
	} else if (!_.isObj(vnode)) {
		vnode = new Vtext(vnode)
	}
	return vnode
}

let getDOMNode = function() { return this }