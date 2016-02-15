import * as _ from './util'
import { VNODE_TYPE, DIFF_TYPE } from './constant'
import { updatePropsAndState } from './Component'
import { isValidElement } from './createElement'
import diff from './diff'

function Vtree(properties) {
	_.extend(this, properties)
}

let noop = _.noop
let getDOMNode = function() { return this }
Vtree.prototype = {
	attachRef(refValue) {
		let { ref: refKey, refs, vtype } = this
		if (!refs || refKey == null || !refValue) {
			return
		}
		if (refValue.nodeName) {
	    	// support react v0.13 style: this.refs.myInput.getDOMNode()
	    	refValue.getDOMNode = getDOMNode
	    }
		if (_.isFn(refKey)) {
	    	refKey(refValue)
	    } else {
	    	refs[refKey] = refValue
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
	updateRef(newVtree, refValue) {
		if (!this.refs) {
			newVtree.attachRef(refValue)
			return
		}
		if (!newVtree.refs) {
			this.detachRef()
			return
		}
		if (this.refs !== newVtree.refs) {
			this.detachRef()
			newVtree.attachRef(refValue)
			return
		}
		let oldRef = this.ref
		let newRef = newVtree.ref
		if (newRef == null) {
			this.detachRef()
		} else if (oldRef !== newRef) {
			this.detachRef()
			newVtree.attachRef(refValue)
		}
	},
	updateTree(node, newVtree, parentNode, parentContext) {
		let newNode = node
		switch (diff(this, newVtree)) {
			case DIFF_TYPE.CREATE:
				newNode = newVtree.initTree(parentNode, parentContext)
				break
			case DIFF_TYPE.REMOVE:
				this.destroyTree(node)
				break
			case DIFF_TYPE.REPLACE:
				let $removeNode = removeNode
				removeNode = noop
				this.destroyTree(node)
				removeNode = $removeNode
				newNode = newVtree.initTree(
					nextNode => parentNode.replaceChild(nextNode, node),
					parentContext
				)
				break
			case DIFF_TYPE.UPDATE:
				newNode = this.update(node, newVtree, parentNode, parentContext)
				break
		}
		return newNode
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
	update(node, nextVtext) {
		if (nextVtext.text !== this.text) {
			node.replaceData(0, node.length, nextVtext.text)
		}
		return node
	},
	initTree(parentNode) {
		let node = document.createTextNode(this.text)
		appendNode(parentNode, node)
		return node
	},
	destroyTree(node) {
		removeNode(node)
	}
})

export function Velem(type, props) {
	this.type = type
	this.props = props
}

let getInnerHTML = props => {
	let innerHTMLObj = props.dangerouslySetInnerHTML
	return innerHTMLObj && innerHTMLObj.__html
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
		this.eachChildren(vchild => {
			vchild.initTree(node, parentContext)
		})
		appendNode(parentNode, node)
		this.attachRef(node)
		return node
	},
	destroyTree(node) {
		let childNodes = []
		for (let i = 0, len = node.childNodes.length; i < len; i++) {
			childNodes.push(node.childNodes[i])
		}
		this.eachChildren((vchild, index) => {
			vchild.destroyTree(childNodes[index])
		})
		this.detachRef()
		removeNode(node)
	},
	update(node, newVelem, parentNode, parentContext) {
		let { props } = this
		let newProps = newVelem.props
		let oldHtml = getInnerHTML(props)
		if (oldHtml == null) {
			var children = !_.isUndefined(props.children) ? props.children : []
			if (!_.isArr(children)) {
				children = [children]
			}
			var count = 0
			var childNodes = node.childNodes
			newVelem.eachChildren((newVchild, index) => {
				count += 1
				var vchild = children[index]
				if (vchild) {
					vchild.updateTree(childNodes[index], newVchild, node, parentContext)
				} else {
					newVchild.initTree(node, parentContext)
				}
			})
			var childrenLen = children.length
			// destroy old children not in the newChildren
			while (childrenLen > count) {
				childrenLen -= 1
				children[childrenLen].destroyTree(childNodes[childrenLen])
			}
			_.patchProps(node, props, newProps)
		} else {
			_.patchProps(node, props, newProps)
			newVelem.eachChildren(newVchild => newVchild.initTree(node, parentContext))
		}
		this.updateRef(newVelem, node)
		return node
	}
})

export function VstatelessComponent(type, props) {
	this.type = type
	this.props = props
	this.id = _.getUid()
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
		return getVnode(vtree)
	},
	initTree(parentNode, parentContext) {
		let vtree = this.renderTree(parentContext)
		let node = vtree.initTree(parentNode, parentContext)
		node.cache = node.cache || {}
		node.cache[this.id] = vtree
		return node
	},
	destroyTree(node) {
		let id = this.id
		let vtree = node.cache[id]
		let $removeNode = removeNode
		removeNode = noop
		delete node.cache[id]
		vtree.destroyTree(node)
		removeNode = $removeNode
		removeNode(node)
	},
	update(node, newVstatelessComponent, parentNode, parentContext) {
		let id = this.id
		let vtree = node.cache[id]
		delete node.cache[id]
		let newVtree = newVstatelessComponent.renderTree(parentContext)
		let newNode = vtree.updateTree(node, newVtree, parentNode, parentContext)
		newNode.cache = newNode.cache || {}
		newNode.cache[newVstatelessComponent.id] = newVtree
		if (newNode !== node) {
			_.extend(newNode.cache, node.cache)
		}
		return newNode
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
let callDidMount = store => store.vcomponent.didMount(store.node)
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
	this.id = _.getUid()
}
Vcomponent.prototype = new Vtree({
	vtype: VNODE_TYPE.COMPONENT,
	initTree(parentNode, parentContext) {
		let { type: Component, props, id } = this
		let componentContext = getContextByTypes(parentContext, Component.contextTypes)
		let component = new Component(props, componentContext)
		let { $updater: updater, $cache: cache } = component
		cache.parentContext = parentContext
		updater.isPending = true
		component.props = component.props || props
		component.componentWillMount()
		updatePropsAndState(component, component.props, updater.getState(), component.context)
		let vtree = renderComponent(component, parentContext)
		let node = vtree.initTree(parentNode, vtree.context)
		node.cache = node.cache || {}
		node.cache[id] = component
		cache.vtree = vtree
		cache.node = node
		cache.isMounted = true
		didMountComponents.push({ node, vcomponent: this })
		return node
	},
	didMount(node) {
		let component = node.cache[this.id]
		let updater = component.$updater
		component.componentDidMount()
		updater.isPending = false
		this.attachRef(component)
		updater.emitUpdate()
	},
	destroyTree(node) {
		let id = this.id
		let component = node.cache[id]
		let cache = component.$cache
		let $removeNode = removeNode
		removeNode = noop
		delete node.cache[id]
		this.detachRef()
		component.setState = noop
		component.componentWillUnmount()
		cache.vtree.destroyTree(node)
		removeNode = $removeNode
		removeNode(node)
		delete component.setState
		cache.isMounted = false
		cache.node
		= cache.parentContext
		= cache.vtree
		= component.refs
		= component.context
		= null
	},
	update(node, newVtree, parentNode, parentContext) {
		let id = this.id
		let component = node.cache[id]
		let {
			$updater: updater,
			$cache: cache
		} = component
		let { 
			type: Component,
			props: nextProps,
		} = newVtree
		let componentContext = getContextByTypes(parentContext, Component.contextTypes)
		delete node.cache[id]
		node.cache[newVtree.id] = component
		cache.parentContext = parentContext
		updater.isPending = true
		component.componentWillReceiveProps(nextProps, componentContext)
		updater.isPending = false
		updater.emitUpdate(nextProps, componentContext)
		this.updateRef(newVtree, component)
		return cache.node
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