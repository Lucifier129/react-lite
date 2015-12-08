import create from './create'
import diff from './diff'
import patch from './patch'
import { isFn, getUid, appendChild, removeChild, $triggerOnce } from './util'
import { COMPONENT_ID, DID_MOUNT } from './constant'

let store = {}
export let render = (vnode, container, callback) => {
	let id = container.getAttribute(COMPONENT_ID)
	if (id) {
		let patches = diff(store[id], vnode)
		patch(container.firstChild, patches)
		store[id] = vnode
	} else {
		let node = create(vnode)
		container.setAttribute(COMPONENT_ID, id = getUid())
		store[id] = vnode
		container.innerHTML = ''
		appendChild(container, node)
	}
	$triggerOnce(DID_MOUNT)
	if (isFn(callback)) {
		callback()
	}
}

export let unmount = container => {
	let id = container.getAttribute(COMPONENT_ID)
	if (store.hasOwnProperty(id)) {
		let firstChild = container.firstChild
		if (firstChild) {
			removeChild(container, firstChild)
		}
		delete store[id]
	}
}