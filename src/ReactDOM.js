import * as _ from './util'
import { COMPONENT_ID} from './constant'
import { clearPendingComponents, compareTwoTrees } from './virtual-dom'
import { updateQueue } from './Component'

let pendingRendering = {}
let vtreeStore = {}
let renderTreeIntoContainer = (vtree, container, callback, parentContext) => {
	if (!vtree.isVdom) {
		throw new Error(`cannot render ${ vtree } to container`)
	}
	let id = container[COMPONENT_ID] || (container[COMPONENT_ID] = _.getUid())
	let argsCache = pendingRendering[id]

	// component lify cycle method maybe call root rendering
	// should bundle them and render by only one time
	if (argsCache) {
		if (argsCache === true) {
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

	pendingRendering[id] = true
	if (vtreeStore[id]) {
		compareTwoTrees(vtreeStore[id], vtree, container.firstChild, parentContext)
	} else {
		var rootNode = vtree.init(parentContext, container.namespaceURI)
		container.innerHTML = ''
		container.appendChild(rootNode)
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
	} else if (_.isStr(vtree.type)) {
		result = container.firstChild
	} else if (_.isComponent(vtree.type)) {
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
		vtreeStore[id].destroy(container.firstChild)
		container.innerHTML = ''
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