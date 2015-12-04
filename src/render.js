import { create, diff } from './virtual-dom'
import { types } from 'refer'
import { richPatch, clearDidMounts, callUnmounts } from './component'
import { getId, info, ATTR_ID } from './util'

let { isFn } = types

let store = info.store =  {}

export let render = (vnode, container, callback) => {
	let id = container.getAttribute(ATTR_ID)
	if (id) {
		let prevVnode = store[id]
		let patches = diff(prevVnode, vnode)
		richPatch(container.firstChild, patches)
		store[id] = vnode
	} else {
		let node = create(vnode)
		container.setAttribute(ATTR_ID, id = getId())
		store[id] = vnode
		container.innerHTML = ''
		container.appendChild(node)
		clearDidMounts()
	}
	if (isFn(callback)) {
		callback()
	}
}

export let unmount = container => {
	let id = container.getAttribute(ATTR_ID)
	if (id) {
		let prevVnode = store[id]
		if (prevVnode) {
			delete store[id]
			callUnmounts(container)
			container.innerHTML = ''
		}
	}
}