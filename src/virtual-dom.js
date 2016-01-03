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
	constructor: Vtree,
	attachRef() {
		let { ref: refKey, refs, vtype } = this
		if (!refs || refKey == null) {
			return
		}
		let refValue
		if (vtype === VNODE_TYPE.ELEMENT) {
			refValue = this.node
			// support react v0.13 style: this.refs.myInput.getDOMNode()
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
		compareTwoTree(this, nextVtree, parentNode)
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
		// deliver node to the newTree for next updating
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

export function Velem(type, props) {
	this.type = type
	this.props = props
}

let unmountTree = vtree => {
	if (isValidComponent(vtree)) {
		vtree.destroyTree()
		return false //ignore mapping children
	}
	vtree.detachRef()
}
Velem.prototype = new Vtree({
	constructor: Velem,
	vtype: VNODE_TYPE.ELEMENT,
	eachChildren(iteratee) {
		let { children } = this.props
		let { sorted } = this
		
		if (sorted) {
			_.eachItem(children, iteratee)
			return
		}
		// the default children often be nesting array, so then here make it flat
		if (_.isArr(children)) {
			var newChildren = []
			_.forEach(children, (vchild, index) => {
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
		mapTree(this, unmountTree)
		removeNode(this.node)
	},
	update(newVelem) {
		let { node, props } = this
		let children = !_.isUndefined(props.children) ? props.children : []
		let count = 0
		if (!_.isArr(children)) {
			children = [children]
		}
		_.patchProps(node, props, newVelem.props)
		newVelem.node = node
		newVelem.eachChildren((newVchild, index) => {
			let vchild = children[index]
			if (vchild) {
				vchild.updateTree(newVchild, node)
			} else {
				newVchild.initTree(node)
			}
			count += 1
		})
		// destroy old children not in the newChildren
		while (children.length > count) {
			children[count].destroyTree()
			count += 1
		}
		this.updateRef(newVelem)
	}
})

export function VstatelessComponent(type, props) {
	this.type = type
	this.props = props
}

VstatelessComponent.prototype = new Vtree({
	constructor: VstatelessComponent,
	vtype: VNODE_TYPE.STATELESS_COMPONENT,
	attachRef: noop,
	detachRef: noop,
	updateRef: noop,
	renderTree() {
		let { type: factory, props, context } = this
		let vtree = factory(props, getContextByTypes(context, factory.contextTypes))
		if (vtree && _.isFn(vtree.render)) {
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
	}
})

let setRefs = noop
export let handleVnodeWithRef = vnode => {
	setRefs(vnode)
}
let getContextByTypes = (curContext, contextTypes) => {
	let context = {}
	if (!_.isObj(contextTypes) || !_.isObj(curContext)) {
		return context
	}
	_.mapValue(contextTypes, (_, key) => {
		context[key] = curContext[key]
	})
	return context
}

let setContext = (context, vtree) => {
	mapTree(vtree, item => {
		if (isValidComponent(item)) {
			if (item.context) {
				item.context = _.extend(item.context, context)
			} else {
				item.context = context
			}
		}
	})
}
let bindRefs = refs => vnode => {
	if (!vnode.refs) {
		vnode.refs = refs
	}
}

export let renderComponent = (component, context) => {
	let curContext = component.getChildContext()
	curContext = _.extend({}, context, curContext)
	setRefs = bindRefs(component.refs)
	let vtree = checkVtree(component.render())
	setRefs = noop
	setContext(curContext, vtree)
	return vtree
}
let neverUpdate = () => false
let didMountComponents = []
let callDidMount = obj => obj.didMount()
export let clearDidMount = () => {
	let components = didMountComponents
	didMountComponents = []
	_.eachItem(components, callDidMount)
}
export function Vcomponent(type, props) {
	this.type = type
	this.props = props
}
Vcomponent.prototype = new Vtree({
	constructor: Vcomponent,
	vtype: VNODE_TYPE.COMPONENT,
	initTree(parentNode) {
		let { type: Component, props, context } = this
		let component = this.component = new Component(props, getContextByTypes(context, Component.contextTypes))
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
		component.shouldComponentUpdate = neverUpdate
		component.forceUpdate = component.setState = noop
		this.detachRef()
		component.componentWillUnmount()
		component.vtree.destroyTree()
		component.$cache.isMounted = false
		this.component = this.node = component.node = component.refs = component.context = null
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
	}
})

let compareTwoTree = (vtree, newVtree, parentNode) => {
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
			// don't remove the existNode for replacing
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
		// for replace node
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
	_.setProps(node, props)
	return node
}

let mapTree = (vtree, iteratee) => {
	let stack = [vtree]
	let item
	let shouldMapChildren
	while (stack.length) {
		item = stack.shift()
		shouldMapChildren = iteratee(item)
		if (shouldMapChildren === false) {
			continue
		}
		if (item && item.props && !_.isUndefined(item.props.children)) {
			if (_.isArr(item.props.children)) {
				stack.push.apply(stack, item.props.children)
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

let checkVtree = vtree => {
	if (_.isUndefined(vtree)) {
		throw new Error('component can not render undefined')
	}
	return getVnode(vtree)
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