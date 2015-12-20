import * as _ from './util'
import { COMPONENT_ID, VNODE_TYPE } from './constant'

let store = {}
export let render = (vtree, container, callback) => {
	if (!vtree) {
		throw new Error(`cannot render ${ vtree } to container`)
	}
	let id = _.getAttr(container, COMPONENT_ID)
	if (store.hasOwnProperty(id)) {
		store[id].updateTree(vtree, container)
	} else {
		_.setAttr(container, COMPONENT_ID, id = getUid())
		container.innerHTML = ''
		vtree.initTree(container)
	}
	store[id] = vtree

	let result

	switch (vtree.vtype) {
		case VNODE_TYPE.ELEMENT:
			result = container.firstChild
			break
		case VNODE_TYPE.COMPONENT:
			result = vtree.component
			break
		default:
			result = null
	}

	if (isFn(callback)) {
		callback.call(result)
	}
	
	return result
}

export let unmount = container => {
	let id = _.getAttr(container, COMPONENT_ID)
	if (store.hasOwnProperty(id)) {
		store[id].destroyTree(container)
		delete store[id]
		return true
	}
	return false
}