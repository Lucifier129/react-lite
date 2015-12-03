import { isStr, isObj, isFn } from './util'
import { CREATE, REMOVE, REORDER, REPLACE, INSERT, PROPS } from './constant'

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
		case isStr(vnode) || isStr(newVnode):
			patches.type = REPLACE
			patches.vnode = newVnode
			break
		case vnode.tagName !== newVnode.tagName:
			patches.type = REPLACE
			patches.vnode = newVnode
			break
		case vnode.props || newVnode.props:
			patches.type = PROPS
			patches.store = {
				props: vnode.props,
				newProps: newVnode.props
			}
	}
	if (!patches.type || patches.type === PROPS) {
		let childrenPatches = {}
		let children = vnode.children
		let newChildren = newVnode.children
		if (children.length === 0) {
			childrenPatches.type = CREATE
			childrenPatches.vnodes = newChildren
		} else if (newChildren.length === 0) {
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
		patches.children = childrenPatches
	}
	return patches
}

export default diff