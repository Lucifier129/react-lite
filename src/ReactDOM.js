import * as _ from './util'
import { COMPONENT_ID, VNODE_TYPE, TRUE } from './constant'
import { clearPendingComponents, compareTwoTrees } from './virtual-dom'
import { updateQueue } from './Component'

let pendingRendering = {}
let vtreeStore = {}
let renderTreeIntoContainer = (vtree, container, callback, parentContext) => {
	if (!vtree) {
		throw new Error(`cannot render ${ vtree } to container`)
	}
	let id = container[COMPONENT_ID] || (container[COMPONENT_ID] = _.getUid())
	let argsCache = pendingRendering[id]

	// component lify cycle method maybe call root rendering
	// should bundle them and render by only one time
	if (argsCache) {
		if (argsCache === TRUE) {
			pendingRendering[id] = argsCache = [vtree, callback, parentContext]
		} else {
			argsCache[0] = vtree
			argsCache[2] = parentContext
			if (callback) {
				argsCache[1] = argsCache[1] ? _.pipe(argsCache[1], callback) : callback
			}
		}
		return
	}

	pendingRendering[id] = TRUE
	if (vtreeStore[id]) {
		compareTwoTrees(vtreeStore[id], vtree, container.firstChild, container, parentContext)
	} else {
		container.innerHTML = ''
		vtree.initTree(container, parentContext)
	}
	vtreeStore[id] = vtree
	let isPending = updateQueue.isPending
	updateQueue.isPending = true
	clearPendingComponents(true)
	argsCache = pendingRendering[id]
	delete pendingRendering[id]

	let result = null
	if (_.isArr(argsCache)) {
		result = renderTreeIntoContainer(argsCache[0], container, argsCache[1], argsCache[2])
	} else if (vtree.vtype === VNODE_TYPE.ELEMENT) {
		result = container.firstChild
	} else if (vtree.vtype === VNODE_TYPE.COMPONENT) {
		result = container.firstChild.cache[vtree.id]
	}
	
	if (!isPending) {
		updateQueue.isPending = false
		updateQueue.batchUpdate()
	}

	if (callback) {
		callback.call(result)
	}
	
	return result
}

let updateComponents = component => {
	component.$updater.updateComponent()
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
	if (vtreeStore[id]) {
		vtreeStore[id].destroyTree(container.firstChild)
		delete vtreeStore[id]
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