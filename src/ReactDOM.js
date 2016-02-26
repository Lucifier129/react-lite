import * as _ from './util'
import { COMPONENT_ID, VNODE_TYPE, TRUE } from './constant'
import { clearDidMount } from './virtual-dom'

let didMounts = []
let cache = {}
let store = {}
let renderTreeIntoContainer = (vtree, container, callback, parentContext) => {
	if (!vtree) {
		throw new Error(`cannot render ${ vtree } to container`)
	}
	let id = container[COMPONENT_ID] || (container[COMPONENT_ID] = _.getUid())
	let argsCache = cache[id]
	if (argsCache) {
		if (argsCache === TRUE) {
			cache[id] = argsCache = [vtree, callback, parentContext]
		} else {
			argsCache[0] = vtree
			argsCache[2] = parentContext
			if (callback) {
				argsCache[1] = argsCache[1] ? _.pipe(argsCache[1], callback) : callback
			}
		}
		return
	}
	cache[id] = TRUE
	if (store[id]) {
		store[id].updateTree(container.firstChild, vtree, container, parentContext, didMounts)
	} else {
		container.innerHTML = ''
		vtree.initTree(container, parentContext, didMounts)
	}
	store[id] = vtree
	clearDidMount()	

	let result = null
	argsCache = cache[id]
	delete cache[id]
	if (_.isArr(argsCache)) {
		result = renderTreeIntoContainer(argsCache[0], container, argsCache[1], argsCache[2])
	} else if (vtree.vtype === VNODE_TYPE.ELEMENT) {
		result = container.firstChild
	} else if (vtree.vtype === VNODE_TYPE.COMPONENT) {
		result = container.firstChild.cache[vtree.id]
	}

	if (_.isFn(callback)) {
		callback.call(result)
	}
	
	return result
}

export let render = (vtree, container, callback) => {
	return renderTreeIntoContainer(vtree, container, callback)
}

export let unstable_renderSubtreeIntoContainer = (parentComponent, subVtree, container, callback) => {
	let context = parentComponent.vtree
	? parentComponent.vtree.context
	: parentComponent.$cache.parentContext
	return renderTreeIntoContainer(subVtree, container, callback, context)
}

export let unmountComponentAtNode = container => {
	if (!container.nodeName) {
		throw new Error('expect node')
	}
	let id = container[COMPONENT_ID]
	if (store.hasOwnProperty(id)) {
		store[id].destroyTree(container.firstChild)
		delete store[id]
		return true
	}
	return false
}

export let findDOMNode = node => {
	if (node == null) {
		return null
	}
	if (node.nodeName) {
		return node
	}
	let component = node
	// if component.node equal to false, component must be unmounted
	if (component.getDOMNode && component.$cache.isMounted) {
		return component.getDOMNode()
	}
	throw new Error('findDOMNode can not find Node')
}