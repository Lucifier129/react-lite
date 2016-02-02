import * as _ from './util'
import { VNODE_TYPE, DIFF_TYPE } from './constant'
import { updatePropsAndState } from './Component'
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
	updateTree(newVtree, parentNode) {
		let { node } = this
		let $removeNode
		switch (diff(this, newVtree)) {
			case DIFF_TYPE.CREATE:
				newVtree.initTree(parentNode)
				break
			case DIFF_TYPE.REMOVE:
				this.destroyTree()
				break
			case DIFF_TYPE.REPLACE:
				// don't remove the existNode for replacing
				$removeNode = removeNode
				removeNode = noop
				this.destroyTree()
				removeNode = $removeNode
				newVtree.initTree(
					newNode => parentNode.replaceChild(newNode, node)
				)
				break
			case DIFF_TYPE.UPDATE:
				this.update(newVtree, parentNode)
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
		return this
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
			this.props.children = newChildren = []
			_.forEach(children, (vchild, index) => {
				vchild = getVnode(vchild)
				iteratee(vchild, index)
				newChildren.push(vchild)
			})
			this.sorted = true
		} else if (!_.isUndefined(children)) {
			children = this.props.children = getVnode(children)
			iteratee(children, 0)
		}
	},
	initTree(parentNode) {
		let { type, props } = this
		let node = document.createElement(type)
		_.setProps(node, props)
		this.node = node
		this.eachChildren(vchild => {
			vchild.initTree(node)
		})
		appendNode(parentNode, node)
		this.attachRef()
	},
	destroyTree() {
		mapTree(this, unmountTree)
		removeNode(this.node)
		this.node = null
	},
	update(newVelem) {
		let { node, props } = this
		let children = !_.isUndefined(props.children) ? props.children : []
		let count = 0
		let vindex
		if (!_.isArr(children)) {
			children = [children]
		}
		_.patchProps(node, props, newVelem.props)
		newVelem.node = node
		newVelem.eachChildren((newVchild, index) => {
			let vchild = children[index]
			count += 1
			// if newVchild.node exist, destroy it and remove it when it's in children
			if (vchild !== newVchild && newVchild.node) {
				newVchild.destroyTree()
				vindex = _.findIndex(children, newVchild, index + 1)
				if (vindex !== -1) {
					children.splice(vindex, 1)
				}
			}
			if (vchild) {
				vchild.updateTree(newVchild, node)
			} else {
				newVchild.initTree(node)
			}
		})
		// destroy old children not in the newChildren
		while (children.length > count) {
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
	renderTree() {
		let { type: factory, props, context } = this
		let vtree = factory(props, getContextByTypes(context, factory.contextTypes))
		if (vtree && vtree.render) {
			vtree = vtree.render()
		}
		this.vtree = getVnode(vtree)
		setContext(context, this.vtree)
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
		newVtree.renderTree()
		this.vtree.updateTree(newVtree.vtree, parentNode)
		newVtree.node = newVtree.vtree.node
		this.node = this.vtree = null
	}
})

let setRefs = noop
export let handleVnodeWithRef = vnode => {
	setRefs(vnode)
}
let getContextByTypes = (curContext, contextTypes) => {
	let context = {}
	if (!contextTypes || !curContext) {
		return context
	}
	_.mapValue(contextTypes, (_, key) => {
		context[key] = curContext[key]
	})
	return context
}

export let setContext = (context, vtree) => {
	mapTree(vtree, item => {
		if (isValidComponent(item)) {
			item.context = context
		}
	})
}
let bindRefs = refs => vnode => {
	if (!vnode.refs) {
		vnode.refs = refs
	}
}

export let renderComponent = (component, parentContext) => {
	let curContext = component.getChildContext()
	curContext = _.extend({}, parentContext, curContext)
	setRefs = bindRefs(component.refs)
	let vtree = component.render()
	if (_.isUndefined(vtree)) {
		throw new Error('component can not render undefined')
	}
	vtree = getVnode(vtree)
	setContext(curContext, vtree)
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
	didMountComponents = []
	_.eachItem(components, callDidMount)
}

let neverUpdate = () => false
export function Vcomponent(type, props) {
	this.type = type
	this.props = props
}
Vcomponent.prototype = new Vtree({
	vtype: VNODE_TYPE.COMPONENT,
	initTree(parentNode) {
		let { type: Component, props, context } = this
		let componentContext = getContextByTypes(context, Component.contextTypes)
		let component = this.component = new Component(props, componentContext)
		let { $updater: updater, $cache: cache } = component
		cache.$context = context
		updater.isPending = true
		component.props = component.props || props
		component.componentWillMount()
		updatePropsAndState(component, component.props, updater.getState(), component.context)
		let vtree = component.vtree = renderComponent(component, context)
		vtree.initTree(parentNode)
		cache.isMounted = true
		component.node = this.node = vtree.node
		didMountComponents.push(this)
	},
	didMount() {
		let { component } = this
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
	update(newVtree, parentNode) {
		let { component } = this
		if (!component) {
			return
		}
		let { type: Component, props: nextProps, context: nextContext } = newVtree
		let { $updater: updater, $cache } = component
		let context = getContextByTypes(nextContext, Component.contextTypes)
		$cache.$context = nextContext
		updater.isPending = true
		component.componentWillReceiveProps(nextProps, context)
		updater.isPending = false
		updater.emitUpdate(nextProps, context)
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

let mapTree = (vtree, iteratee) => {
	let stack = [vtree]
	while (stack.length) {
		let item = stack.shift()
		if (iteratee(item) === false) {
			continue
		}
		if (item && item.props && !_.isUndefined(item.props.children)) {
			if (_.isArr(item.props.children)) {
				stack.push(...item.props.children)
			} else {
				stack.push(item.props.children)
			}
		}
	}
}

let getVnode = vnode => {
	if (vnode === null) {
		vnode = new Velem('noscript', {})
	} else if (!_.isObj(vnode)) {
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