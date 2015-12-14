import create from './create'
import diff from './diff'
import patch from './patch'
import { isFn, isStr, getUid, appendChild, removeChild, $triggerOnce, setAttr, getAttr, isComponent, isComponentClass } from 'util'
import { COMPONENT_ID, DID_MOUNT, REF_CALLBACK } from './constant'

let store = {}
export let render = (vnode, container, callback) => {
	let id = getAttr(container, COMPONENT_ID)
	if (store.hasOwnProperty(id)) {
		let patches = diff(store[id], vnode)
		patch(container.firstChild, patches, container)
		store[id] = vnode
	} else {
		let node = create(vnode)
		setAttr(container, COMPONENT_ID, id = getUid())
		store[id] = vnode
		container.innerHTML = ''
		appendChild(container, node)
	}
	$triggerOnce(REF_CALLBACK)
	$triggerOnce(DID_MOUNT)
	if (isFn(callback)) {
		callback()
	}

	if (!vnode) {
		return
	}

	if (isComponentClass(vnode.tagName)) {
		return vnode.component
	} else if (vnode && isStr(vnode.tagName)) {
		return container.firstChild
	} else {
		return null
	}
}

export let unmount = container => {
	let id = getAttr(container, COMPONENT_ID)
	if (store.hasOwnProperty(id)) {
		let firstChild = container.firstChild
		if (firstChild) {
			removeChild(container, firstChild)
		}
		delete store[id]
		return true
	}
	return false
}