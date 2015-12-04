import { isStr, isObj, isFn, isArr } from './util'
import { CREATE, REMOVE, REORDER, REPLACE, INSERT, PROPS, Widget } from './constant'

/**
* diff vnode and newVnode
*/
let diff = (vnode, newVnode) => {
	let patches = {}
	switch (true) {
		case newVnode == null:
			patches.type = REMOVE
			break
		case vnode == null:
			patches.type = CREATE
			patches.vnode = newVnode
			break
		case vnode.type === Widget && newVnode.type === Widget:
			patches.type = Widget
			patches.store = { vnode, newVnode }
			break
		case vnode.type === Widget || newVnode.type === Widget:
			patches.type = CREATE
			patches.vnode = newVnode
			break
		case (isStr(vnode) || isStr(newVnode)) && vnode !== newVnode:
			patches.type = REPLACE
			patches.vnode = newVnode
			break
		case vnode.tagName !== newVnode.tagName:
			patches.type = REPLACE
			patches.vnode = newVnode
			break
		case !!(vnode.props || newVnode.props):
			patches.type = PROPS
			patches.store = {
				props: vnode.props,
				newProps: newVnode.props
			}
			break
	}
	if (!patches.type || patches.type === PROPS) {
		let childrenPatches = {}
		let children = handleChildren([], vnode.children)
		let newChildren = handleChildren([], newVnode.children)
		if (!children || children.length === 0) {
			if (newChildren && newChildren.length > 0) {
				childrenPatches.type = CREATE
				childrenPatches.vnodes = newChildren
			}
		} else if (!newChildren || newChildren.length === 0) {
			childrenPatches.type = REMOVE
		} else {
			let length = Math.max(children.length, newChildren.length)
			let store = []
			for (let i = 0; i < length; i += 1) {
				let item = diff(children[i], newChildren[i])
				store.push(item)
			}
			childrenPatches.type = REPLACE
			childrenPatches.store = store
		}
		if (childrenPatches.type) {
			patches.children = childrenPatches
		}
	}

	patches = patches.type || patches.children ? patches : null
	if (!patches) {
		//debugger
	}
	return patches
}

export default diff

let handleChildren = (store, children) => {
	if (isArr(children)) {
		children.forEach(child => {
			if (isArr(child)) {
				return handleChildren(store, child)
			}
			store.push(child)
		})
	}
	return store
}