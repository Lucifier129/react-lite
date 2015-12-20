import * as _ from './util'
import { VNODE_TYPE } from './constant'
import { shouldUpdate } from './component'

let noop = () => {}
let empty = {}

function Vdom(properties = empty) {
	_.mapValue(properties, (value, key) => {
		this[key] = value
	})
}

Vdom.prototype = {
	constructor: Vdom,
	eachChildren: noop,
	mapTree: noop,
	initTree: noop,
	destroyTree: noop,
	attachRef: noop,
	detachRef: noop,
	updateRef: noop,
	create: noop,
	update: noop,
	remove: noop,
	replace: noop,
	updateTree(nextVtree, parentNode, vcontext) {
		updateTree(this, nextVtree, parentNode, vcontext)
	}
}

export function Vtext(text) {
	this.text = text
}

Vtext.prototype = new Vdom({
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

Velem.prototype = new Vdom({
	constructor: Velem,
	vtype: VNODE_TYPE.ELEMENT,
	eachChildren(iteratee) {
		let { children, sorted } = this
		if (sorted) {
			_.forEach(children, iteratee)
			return
		}
		if (children && children.length > 0) {
			let newChildren = []
			eachVnode(children, (vchild, index) => {
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
	initTree(parentNode, vcontext) {
		let { type, props } = this
		let node = this.node = createElement(type, props)
		this.eachChildren(vchild => {
			vchild.initTree(node, vcontext)
		})
		appendNode(parentNode, node)
		this.attachRef(props && props.ref, node)
	},
	destroyTree(parentNode, vcontext) {
		let { node, props } = this
		this.eachChildren(vchild => {
			vchild.destroyTree(node, vcontext)
		})
		removeNode(node)
		this.detachRef(props && props.ref)
		unbindRefs(this)
	},
	update(newVelem, parentNode, vcontext) {
		let { node, props } = this
		_.patchProps(node, props, newVelem.props)
		let newRefKey = newVelem.props && newVelem.props.ref
		let oldRefKey = props && props.ref
		newVelem.node = node
		let newChildren = newVelem.children || []
		this.eachChildren((vchild, index) => {
			vchild.updateTree(newChildren[index], node, vcontext)
		})
		if (oldRefKey !== newRefKey) {
			this.updateRef(newRefKey, oldRefKey, node)
		}
	}
})

export function VstatelessComponent(factory, props, children) {
	this.factory = factory
	this.props = props
	this.children = children
}

VstatelessComponent.prototype = new Vdom({
	constructor: VstatelessComponent,
	vtype: VNODE_TYPE.STATELESS_COMPONENT,
	renderTree() {
		let { factory } = this
		let props = _.mergeProps(this.props, this.children, factory.defaultProps)
		let vtree = factory(props)
		if (_.isObj(vtree) && _.isFn(vtree.render)) {
			vtree = vtree.render()
		}
		this.vtree = getVnode(vtree)
	}
	initTree(parentNode, vcontext) {
		this.renderTree()
		this.tree.initTree(parentNode, vcontext)
	},
	destroyTree(parentNode, vcontext) {
		this.vtree.destroyTree(parentNode, vcontext)
	},
	update(newComponent, parentNode, vcontext) {
		let { vtree } = this
		newComponent.renderTree()
		vtree.updateTree(newComponent.vtree, parentNode, vcontext)
	}
})

export function Vcomponent(Component, props, children) {
	this.Component = Component
	this.props = props
	this.children = children
}

Vcomponent.prototype = new Vdom({
	constructor: Vcomponent,
	vtype: VNODE_TYPE.COMPONENT,
	mapTree(iteratee) {
		iteratee(this)
	},
	initTree(parentNode, vcontext) {
		let { Component } = this
		let props = _.mergeProps(this.props, this.children, Component.defaultProps)
		let component = this.component = new Component(props)
		component.props = component.props || props
		component.componentWillMount()
		let vtree = getVnode(component.render())
		vtree.mapTree(bindRefs(component.refs))
		vtree.initTree(parentNode, component)
		component.componentDidMount()
		component.vtree = vtree
		this.attachRef(props.ref, component)
	},
	destroyTree(parentNode, vcontext) {
		let { component } = this
		let { props, vtree } = component
		component.componentWillUnmount()
		vtree.destroyTree(parentNode, vcontext)
		this.detachRef(props.ref, component)
		unbindRefs(this)
		component.refs = null
	},
	update(newVtree, parentNode, vcontext) {
		let { component } = this
		let { Component, props, children } = newVtree
		let nextProps = _.mergeProps(props, children, Component.defaultProps)
		component.componentWillReceiveProps(nextProps)
		shouldUpdate(component, nextProps, component.state)
		let newRefKey = nextProps.ref
		let oldRefKey = this.props && this.props.ref
		if (newRefKey !== oldRefKey) {
			this.updateRef(newRefKey, oldRefKey, component)
		}
	}
})

let updateTree = (vtree, newVtree, parentNode, vcontext) => {
	let diffType = diff(vtree, nextVtree)
	switch (diffType) {
		case DIFF_TYPE.CREATE:
			nextVtree.initTree(parentNode, vcontext)
			break
		case DIFF_TYPE.REMOVE:
			vtree.destroyTree(parentNode, vcontext)
			break
		case DIFF_TYPE.REPLACE:
			vtree.destroyTree(parentNode, vcontext)
			newVtree.initTree(newNode => {
				replaceNode(parentNode, newNode, vtree.node)
			}, vcontext)
			break
		case DIFF_TYPE.UPDATE:
			vtree.update(newVtree, parentNode, vcontext)
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
		if (_.isFn(parentNode)) {
			parentNode(newNode, existNode)
		} else {
			parentNode.replaceChild(newNode, existNode)
		}
	}
}

let createTextNode = text => document.createTextNode(text)
let createElement = (tagName, props) =>  {
	let node = document.createElement(tagName)
	props && _.setProps(props)
	return node
}

export let getVnode = vnode => {
	if (vnode === null || vnode === false) {
		vnode = { type: 'noscript' }
	} else if (!_.isObj(vnode)) {
		vnode = { text: vnode }
	}
	return vnode
}

let eachVnode = (vnodes, iteratee) => 
	_.forEach(vnodes, (vnode, index) =>
		iteratee(getVnode(vnode), index)
	)

let attachRef = (refKey, refValue, refs) => {
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

let bindRefs = refs => vnode => {
	vnode.attachRef = (refKey, refValue) => attachRef(refKey, refValue, refs)
	vnode.detachRef = (refKey) => detachRef(refKey, refs)
	vnode.updateRef = (newRefKey, oldRefKey, refValue) => updateRef(newRefKey, oldRefKey, refValue, refs)
}

let unbindRefs = vnode => {
	delete vnode.attachRef
	delete vnode.detachRef
	delete vnode.updateRef
}