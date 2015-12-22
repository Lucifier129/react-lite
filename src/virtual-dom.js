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
	eachChildren: noop,
	mapTree: noop,
	initTree: noop,
	destroyTree: noop,
	attachRef: noop,
	detachRef: noop,
	updateRef: noop,
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

export function Velem(type, props, children) {
	this.type = type
	this.props = props
	this.children = children
}

let detachTree = vtree => {
	let { props, vtype } = vtree
	if (vtree !== noop) {
		vtree.detachRef(props && props.ref)
		unbindRefs(vtree)
	}
	if (vtype === VNODE_TYPE.COMPONENT) {
		vtree.component.vtree.destroyTree()
	} else if (vtype === VNODE_TYPE.STATELESS_COMPONENT) {
		vtree.destroyTree()
	}
}
let destroyTree = vtree => vtree.destroyTree()
Velem.prototype = new Vtree({
	constructor: Velem,
	vtype: VNODE_TYPE.ELEMENT,
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
	mapTree(iteratee) {
		iteratee(this)
		this.eachChildren(vchild => vchild.mapTree(iteratee))
	},
	initTree(parentNode) {
		let { type, props } = this
		let node = this.node = createElement(type, props)
		this.eachChildren(vchild => {
			vchild.initTree(node)
		})
		appendNode(parentNode, node)
		this.attachRef(props && props.ref, node)
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
		if (this.detachRef !== noop) {
			newVelem.detachRef = this.detachRef
			newVelem.attachRef = this.attachRef
			newVelem.updateRef = this.updateRef
			let newRefKey = newVelem.props && newVelem.props.ref
			let oldRefKey = props && props.ref
			if (oldRefKey !== newRefKey) {
				this.updateRef(newRefKey, oldRefKey, node)
			}
		}
	}
})

export function VstatelessComponent(type, props, children) {
	this.type = type
	this.props = props
	this.children = children
}

VstatelessComponent.prototype = new Vtree({
	constructor: VstatelessComponent,
	vtype: VNODE_TYPE.STATELESS_COMPONENT,
	mapTree(iteratee) {
		iteratee(this)
	},
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

export function Vcomponent(type, props, children) {
	this.type = type
	this.props = props
	this.children = children
}

Vcomponent.prototype = new Vtree({
	constructor: Vcomponent,
	vtype: VNODE_TYPE.COMPONENT,
	mapTree(iteratee) {
		iteratee(this)
	},
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
		let vtree = checkVtree(component.render())
		vtree.mapTree(bindRefs(component.refs))
		component.vtree = vtree
		vtree.initTree(parentNode)
		component.node = this.node = vtree.node
		component.componentDidMount()
		updater.isPendingForceUpdate = false
		this.attachRef(props.ref, component)
		updater.emitUpdate()
	},
	destroyTree() {
		let { component, props } = this
		component.componentWillUnmount()
		detachTree(this)
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
		updater.emitUpdate(nextProps)
		if (this.detachRef !== noop) {
			newVtree.detachRef = this.detachRef
			newVtree.attachRef = this.attachRef
			newVtree.updateRef = this.updateRef
			let newRefKey = nextProps.ref
			let oldRefKey = this.props && this.props.ref
			if (newRefKey !== oldRefKey) {
				this.updateRef(newRefKey, oldRefKey, component)
			}
		}
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

let attachRef = (refKey, refValue, refs) => {
	if (refValue && refValue.nodeName) {
		refValue.getDOMNode = getDOMNode
	}
	if (_.isFn(refKey)) {
		refKey(refValue)
	} else if (_.isStr(refKey)) {
		refs[refKey] = refValue
	}
}

let detachRef = (refKey, refs) => {
	if (_.isFn(refKey)) {
		refKey(null)
	} else if (_.isStr(refKey)) {
		delete refs[refKey]
	}
}

let updateRef = (newRefKey, oldRefKey, refValue, refs) => {
	detachRef(oldRefKey, refs)
	attachRef(newRefKey, refValue, refs)
}

let bindRefs = refs => {
	let $attachRef = (refKey, refValue) => attachRef(refKey, refValue, refs)
	let	$detachRef = (refKey) => detachRef(refKey, refs)
	let	$updateRef = (newRefKey, oldRefKey, refValue) => updateRef(newRefKey, oldRefKey, refValue, refs)
	return vnode => {
		if (vnode.vtype === VNODE_TYPE.TEXT || vnode.vtype === VNODE_TYPE.STATELESS_COMPONENT) {
			return
		}
		let { props } = vnode
		if (!props || _.isUndefined(props.ref)) {
			return
		}
		vnode.attachRef = $attachRef
		vnode.detachRef = $detachRef
		vnode.updateRef = $updateRef
	}
}

let unbindRefs = vnode => {
	delete vnode.attachRef
	delete vnode.detachRef
	delete vnode.updateRef
}