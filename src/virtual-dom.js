import * as _ from './util'
import { VNODE_TYPE, DIFF_TYPE } from './constant'
import { updatePropsAndState, updateQueue } from './Component'
import { isValidElement } from './createElement'
import diff from './diff'

function Vtree(properties) {
	_.extend(this, properties)
}

let noop = _.noop
let getDOMNode = function() { return this }
Vtree.prototype = {
	attachRef() {
		let { ref: refKey, refs, vtype } = this
		if (!refs || refKey == null) {
			return
		}
		let refValue
		if (vtype === VNODE_TYPE.ELEMENT) {
			refValue = this.node
			// support react v0.13 style: this.refs.myInput.getDOMNode()
			this.node.getDOMNode = getDOMNode
		} else if (vtype === VNODE_TYPE.COMPONENT) {
			refValue = this.component
		}
		if (refValue != null) {
			if (_.isFn(refKey)) {
				refKey(refValue)
			} else {
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
	replaceTree(oldTree, parentNode, parentContext) {
		let { node } = oldTree
		// don't remove the existNode for replacing
		let $removeNode = removeNode
		removeNode = noop
		oldTree.destroyTree()
		removeNode = $removeNode
		this.initTree(
			newNode => parentNode.replaceChild(newNode, node),
			parentContext
		)
	},
	updateTree(newVtree, parentNode, parentContext) {
		let { node } = this
		let $removeNode
		switch (diff(this, newVtree)) {
			case DIFF_TYPE.CREATE:
				newVtree.initTree(parentNode, parentContext)
				break
			case DIFF_TYPE.REMOVE:
				this.destroyTree()
				break
			case DIFF_TYPE.REPLACE:
				newVtree.replaceTree(this, parentNode, parentContext)
				break
			case DIFF_TYPE.UPDATE:
				this.update(newVtree, parentNode, parentContext)
				break
		}
	}
}

export function Vtext(text) {
	this.text = text
}

Vtext.prototype = new Vtree({
	vtype: VNODE_TYPE.TEXT,
	attachRef: noop,
	detachRef: noop,
	updateRef: noop,
	update(nextVtext) {
		let { node, text } = this
		if (nextVtext.text !== text) {
			node.replaceData(0, node.length, nextVtext.text)
		}
		// deliver node to the newTree for next updating
		nextVtext.node = node
		this.node = null
	},
	initTree(parentNode) {
		this.node = document.createTextNode(this.text)
		appendNode(parentNode, this.node)
	},
	destroyTree() {
		removeNode(this.node)
		this.node = null
	}
})

export function Velem(type, props) {
	this.type = type
	this.props = props
}

let unmountTree = vtree => {
	if (isValidComponent(vtree)) {
		vtree.destroyTree()
		return false //ignore mapping children
	} else if (vtree.vtype === VNODE_TYPE.ELEMENT) {
		let { node, props } = vtree
		// aviod triggered when node was removed
		if (props.onLoad) {
			node.onload = null
		}
		if (node.eventStore) {
			node.eventStore = null
		}
		vtree.detachRef()
	}
}
Velem.prototype = new Vtree({
	vtype: VNODE_TYPE.ELEMENT,
	eachChildren(iteratee) {
		let { children } = this.props
		let newChildren
		if (this.sorted) {
			_.eachItem(children, iteratee)
			return
		}
		// the default children often be nesting array, make it flat and cache
		if (_.isArr(children)) {
			newChildren = []
			_.flattenChildren(children, (vchild, index) => {
				vchild = getVnode(vchild)
				iteratee(vchild, index)
				newChildren.push(vchild)
			})
			this.props.children = newChildren
			this.sorted = true
		} else if (!_.isUndefined(children)) {
			children = this.props.children = getVnode(children)
			iteratee(children, 0)
		}
	},
	initTree(parentNode, parentContext) {
		let { type, props } = this
		let node = document.createElement(type)
		_.setProps(node, props)
		this.node = node
		this.eachChildren(vchild => {
			vchild.initTree(node, parentContext)
		})
		appendNode(parentNode, node)
		this.attachRef()
	},
	destroyTree() {
		mapTree(this, unmountTree)
		removeNode(this.node)
		this.node = null
	},
	update(newVelem, parentNode, parentContext) {
		let { node, props } = this
		let children = !_.isUndefined(props.children) ? props.children : []
		let count = 0
		if (!_.isArr(children)) {
			children = [children]
		}
		_.patchProps(node, props, newVelem.props)
		newVelem.node = node
		newVelem.eachChildren((newVchild, index) => {
			count += 1
			let vchild = children[index]
			if (vchild === newVchild) {
				return
			}
			if (newVchild.node) {
				newVchild.destroyTree()
				// reorder vchild
				let vindex = _.findIndex(children, newVchild, index + 1)
				if (vindex !== -1) {
					children.splice(vindex, 1)
				}
			}
			let childNode = vchild && vchild.node
			// vchild may be replaced, detect childNode.parentNode equal to node or not
			if (!childNode || childNode.parentNode !== node) {
				newVchild.initTree(node, parentContext)
			} else {
				vchild.updateTree(newVchild, node, parentContext)
			}
		})
		let childrenLen = children.length
		// destroy old children not in the newChildren
		while (childrenLen > count) {
			children[count].destroyTree()
			count += 1
		}
		this.updateRef(newVelem)
		this.node = null
	}
})

export function VstatelessComponent(type, props) {
	this.type = type
	this.props = props
}

VstatelessComponent.prototype = new Vtree({
	vtype: VNODE_TYPE.STATELESS_COMPONENT,
	attachRef: noop,
	detachRef: noop,
	updateRef: noop,
	renderTree(parentContext) {
		let { type: factory, props } = this
		let componentContext = getContextByTypes(parentContext, factory.contextTypes)
		let vtree = factory(props, componentContext)
		if (vtree && vtree.render) {
			vtree = vtree.render()
		}
		this.vtree = getVnode(vtree)
	},
	initTree(parentNode, parentContext) {
		this.renderTree(parentContext)
		this.vtree.initTree(parentNode, parentContext)
		this.node = this.vtree.node
	},
	destroyTree() {
		this.vtree.destroyTree()
		this.vtree = this.node = null
	},
	update(newVtree, parentNode, parentContext) {
		newVtree.renderTree(parentContext)
		this.vtree.updateTree(newVtree.vtree, parentNode, parentContext)
		this.vtree = this.node = null
	}
})

let setRefs = noop
export let handleVnodeWithRef = vnode => {
	setRefs(vnode)
}
export let getContextByTypes = (curContext, contextTypes) => {
	let context = {}
	if (!contextTypes || !curContext) {
		return context
	}
	for (let key in contextTypes) {
		if (contextTypes.hasOwnProperty(key)) {
			context[key] = curContext[key]
		}
	}
	return context
}

let bindRefs = refs => vnode => {
	vnode.refs = vnode.refs || refs
}

export let renderComponent = (component, parentContext) => {
	setRefs = bindRefs(component.refs)
	let vtree = component.render()
	if (_.isUndefined(vtree)) {
		throw new Error('component can not render undefined')
	}
	vtree = getVnode(vtree)
	let curContext = component.getChildContext()
	if (curContext) {
		curContext = _.extend({}, parentContext, curContext)
	} else {
		curContext = parentContext
	}
	vtree.context = curContext
	setRefs = noop
	return vtree
}

let didMountComponents = []
let callDidMount = obj => obj.didMount()
export let clearDidMount = () => {
	let components = didMountComponents
	if (components.length === 0) {
		return
	}
	updateQueue.isPending = true
	didMountComponents = []
	_.eachItem(components, callDidMount)
	updateQueue.batchUpdate()
}

let neverUpdate = () => false
export function Vcomponent(type, props) {
	this.type = type
	this.props = props
}
Vcomponent.prototype = new Vtree({
	vtype: VNODE_TYPE.COMPONENT,
	initTree(parentNode, parentContext) {
		let { type: Component, props } = this
		let componentContext = getContextByTypes(parentContext, Component.contextTypes)
		let component = new Component(props, componentContext)
		let { $updater: updater, $cache: cache } = component
		cache.parentContext = parentContext
		this.component = component
		updater.isPending = true
		component.props = component.props || props
		component.componentWillMount()
		updatePropsAndState(component, component.props, updater.getState(), component.context)
		let vtree = component.vtree = renderComponent(component, parentContext)
		vtree.initTree(parentNode, vtree.context)
		cache.isMounted = true
		component.node = this.node = vtree.node
		didMountComponents.push(this)
	},
	didMount() {
		let { component } = this
		if (!component) {
			return
		}
		let updater = component.$updater
		component.componentDidMount()
		updater.isPending = false
		this.attachRef()
		updater.emitUpdate()
	},
	destroyTree() {
		let { component } = this
		if (!component) {
			return
		}
		this.detachRef()
		component.setState = noop
		component.componentWillUnmount()
		component.vtree.destroyTree()
		delete component.setState
		component.$cache.isMounted = false
		this.component = this.node
		= component.vtree
		= component.node
		= component.refs
		= component.context
		= null
	},
	update(newVtree, parentNode, parentContext) {
		let { component } = this
		if (!component) {
			return
		}
		let { 
			type: Component, 
			props: nextProps, 
		} = newVtree
		let { $updater: updater, $cache: cache } = component
		let componentContext = getContextByTypes(parentContext, Component.contextTypes)
		cache.parentContext = parentContext
		updater.isPending = true
		component.componentWillReceiveProps(nextProps, componentContext)
		updater.isPending = false
		updater.emitUpdate(nextProps, componentContext)
		newVtree.component = component
		newVtree.node = component.node
		this.updateRef(newVtree)
		this.component = this.node = null
	}
})

let removeNode = node => {
	// if node.parentNode had set innerHTML, do nothing
	if (node && node.parentNode) {
		node.parentNode.removeChild(node)
	}
}
let appendNode = (parentNode, node) => {
	// for replacing node
	if (_.isFn(parentNode)) {
		parentNode(node)
	} else {
		parentNode.appendChild(node)
	}
}

let mapTree = (tree, iteratee) => {
	let queue = [tree]
	while (queue.length) {
		let item = queue.shift()
		// as you know, vnode's children may be nested list
		if (_.isArr(item)) {
			queue.splice(0, 0, ...item)
			continue
		}
		// if iteratee return false, ignore mapping children
		if (iteratee(item) === false) {
			continue
		}
		if (item && item.props && !_.isUndefined(item.props.children)) {
			_.isArr(item.props.children)
			? queue.push(...item.props.children)
			: queue.push(item.props.children)
		}
	}
}

let getVnode = vnode => {
	if (vnode === null) {
		vnode = new Velem('noscript', {})
	} else if (!isValidElement(vnode)) {
		vnode = new Vtext(vnode)
	}
	return vnode
}

let isValidComponent = obj => {
	if (obj == null) {
		return false
	}
	let vtype = obj.vtype
	if (vtype === VNODE_TYPE.COMPONENT || vtype === VNODE_TYPE.STATELESS_COMPONENT) {
		return true
	}
	return false
}