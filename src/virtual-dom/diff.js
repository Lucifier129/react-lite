import { isStr, isObj, isFn, isArr } from './util'
import { CREATE, REMOVE, REORDER, REPLACE, INSERT, PROPS, WIDGET } from './constant'

/**
* diff vnode and newVnode
*/
let diff = (vnode, newVnode) => {
	let children
	let type
	switch (true) {
		case newVnode == null:
			type = REMOVE
			break
		case vnode == null:
			type = CREATE
			break
		case vnode.type === WIDGET && newVnode.type === WIDGET:
			type = WIDGET
			break
		case vnode.type === WIDGET || newVnode.type === WIDGET:
			type = CREATE
			break
		case (isStr(vnode) || isStr(newVnode)) && vnode !== newVnode:
			type = REPLACE
			break
		case vnode.tagName !== newVnode.tagName:
			type = REPLACE
			break
		case !!(vnode.props || newVnode.props):
			type = PROPS
			break
	}
	if (!type || type === PROPS) {
		children = diffChildren(vnode.children, newVnode.children)
		if (children) {
			return { type, vnode, newVnode, ...children }
		}
	}

	return type ? { type, vnode, newVnode } : null
}

export default diff

let diffChildren = (children, newChildren) => {
	children = getFlatChildren([], children)
	newChildren = getFlatChildren([], newChildren)
	let patches = { children, newChildren }
	let childrenType
	if (children.length === 0) {
		if (newChildren.length > 0) {
			childrenType = CREATE
		}
	} else if (newChildren.length === 0) {
		childrenType = REMOVE
	} else {
		let maxLen = Math.max(children.length, newChildren.length)
		let childrenPatches = []
		for (let i = 0; i < maxLen; i++) {
			childrenPatches.push(diff(children[i], newChildren[i]))
		}
		childrenType = REPLACE
		patches.childrenPatches = childrenPatches
	}

	if (childrenType) {
		patches.childrenType = childrenType
		return patches
	}
}

let getFlatChildren = (store, children) => {
	if (isArr(children)) {
		children.forEach(item => {
			if (isArr(item)) {
				return getFlatChildren(store, item)
			}
			store.push(item)
		})
	}
	return store
}