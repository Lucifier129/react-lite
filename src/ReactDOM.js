import * as _ from './util'
import { COMPONENT_ID, VNODE_TYPE } from './constant'
import { clearDidMount } from './virtual-dom'

let store = {}
let renderTreeIntoContainer = (vtree, container, callback, parentContext) => {
	if (!vtree) {
		throw new Error(`cannot render ${ vtree } to container`)
	}
	let id = container[COMPONENT_ID]
	if (store.hasOwnProperty(id)) {
		store[id].updateTree(vtree, container, parentContext)
	} else {
		container[COMPONENT_ID] = id = _.getUid()
		container.innerHTML = ''
		vtree.initTree(container, parentContext)
	}
	store[id] = vtree
	clearDidMount()

	let result = null
	switch (vtree.vtype) {
		case VNODE_TYPE.ELEMENT:
			result = vtree.node
			break
		case VNODE_TYPE.COMPONENT:
			result = vtree.component
			break
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
		store[id].destroyTree()
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
	if (_.isFn(component.getDOMNode) && component.node) {
		return component.getDOMNode()
	}
	throw new Error('findDOMNode can not find Node')
}