import * as _ from './util'
import { VNODE_TYPE, DIFF_TYPE, COMPONENT_ID } from './constant'
import { shouldUpdate, updatePropsAndState } from './component'
import diff from './diff'

function Vtree(properties) {
	_.extend(this, properties)
}

let noop = () => {}
let getDOMNode = function() { return this }
Vtree.prototype = {
	constructor: Vtree,
	mapTree: noop,
	attachRef() {
		let { ref: refKey, refs, vtype } = this
		if (!refs || refKey == null) {
			return
		}
		let refValue
		if (vtype === VNODE_TYPE.ELEMENT) {
			refValue = this.node
			refValue.getDOMNode = getDOMNode
		} else if (vtype === VNODE_TYPE.COMPONENT) {
			refValue = this.component
		}
		if (refValue) {
			if (_.isFn(refKey)) {
				refKey(refValue)
			} else if (_.isStr(refKey)) {
				refs[refKey] = refValue
			}
		}
	},
	detachRef() {
		let { ref: refKey, refs } = this
		if (!refs || refKey == null) {
			return
		}
		if (_.isFn(refKey)) {
			refKey(null)
			} else {
			delete refs[refKey]
		}
	},
	updateRef(newVtree) {
		if (!this.refs) {
			newVtree.attachRef()
			return
		}
		if (!newVtree.refs) {
			this.detachRef()
			return
		}
		if (this.refs !== newVtree.refs) {
			this.detachRef()
			newVtree.attachRef()
			return
		}
		let oldRef = this.ref
		let newRef = newVtree.ref
		if (newRef == null) {
			this.detachRef()
		} else if (oldRef !== newRef) {
			this.detachRef()
			newVtree.attachRef()
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
	attachRef: noop,
	detachRef: noop,
	updateRef: noop,
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

let unmountTree = vtree => {
	let { vtype } = vtree
	if (vtype === VNODE_TYPE.COMPONENT || vtype === VNODE_TYPE.STATELESS_COMPONENT) {
		vtree.destroyTree()
		return
	}
	vtree.detachRef()
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
		this.attachRef()
	},
	destroyTree() {
		let { node, props } = this
		this.mapTree(unmountTree)
		removeNode(node)
	},
	update(newVelem) {
		let { node, props } = this
		let children = this.children || []
		_.patchProps(node, props, newVelem.props)
		newVelem.node = node
		newVelem.eachChildren((newVchild, index) => {
			let vchild = children[index]
			if (vchild) {
				vchild.updateTree(newVchild, node)
			} else {
				newVchild.initTree(node)
			}
		})

		let newVchildLen = newVelem.children ? newVelem.children.length : 0
		if (children.length > newVchildLen) {
			_.eachItem(children.slice(newVchildLen), destroyTree)
		}
		this.updateRef(newVelem)
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
	attachRef: noop,
	detachRef: noop,
	updateRef: noop,
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

let setRefs = noop
export let collectRef = vnode => {
	setRefs(vnode)
}
let bindRefs = refs => vnode => {
	if (!vnode.refs) {
		vnode.refs = refs
	}
}
export let renderComponent = component => {
	setRefs = bindRefs(component.refs)
	let vtree = checkVtree(component.render())
	setRefs = noop
	return vtree
}
let neverUpdate = () => false
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
		let { $updater: updater, $cache: cache } = component
		updater.isPending = true
		component.props = component.props || props
		component.componentWillMount()
		updatePropsAndState(component, component.props, updater.getState())
		let vtree = component.vtree = renderComponent(component)
		vtree.initTree(parentNode)
		cache.isMounted = true
		component.node = this.node = vtree.node
		component.componentDidMount()
		updater.isPending = false
		this.attachRef()
		updater.emitUpdate()
	},
	destroyTree() {
		let { component, props } = this
		component.shouldComponentUpdate = neverUpdate
		component.forceUpdate = noop
		this.detachRef()
		component.componentWillUnmount()
		component.vtree.destroyTree()
		component.$cache.isMounted = false
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
		updater.isPending = true
		component.componentWillReceiveProps(nextProps)
		updater.isPending = false
		updater.emitUpdate(nextProps)
		this.updateRef(newVtree)
	}
})

let updateTree = (vtree, newVtree, parentNode) => {
	let diffType = diff(vtree, newVtree)
	let $removeNode
	let node
	switch (diffType) {
		case DIFF_TYPE.CREATE:
			newVtree.initTree(parentNode)
			break
		case DIFF_TYPE.REMOVE:
			vtree.destroyTree()
			break
		case DIFF_TYPE.REPLACE:
			node = vtree.node
			$removeNode = removeNode
			removeNode = noop
			vtree.destroyTree()
			removeNode = $removeNode
			newVtree.initTree(newNode => {
				replaceNode(parentNode, newNode, node)
			})
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

let getVnode = vnode => {
	if (vnode === null || vnode === false) {
		vnode = new Velem('noscript')
	} else if (!_.isObj(vnode)) {
		vnode = new Vtext(vnode)
	}
	return vnode
}

let checkVtree = vtree => {
	if (_.isUndefined(vtree)) {
		throw new Error('component can not render undefined')
	}
	return getVnode(vtree)
}