import { isStr, isObj, isFn, isArr, isNum, isComponent, isComponentClass } from './util'
import { CREATE, REMOVE, REPLACE, PROPS, UPDATE } from './constant'

/**
* diff vnode and newVnode
*/
let diff = (vnode, newVnode) => {
	let children
	let type
	switch (true) {
		case vnode === newVnode:
			return
		case newVnode == null:
			type = REMOVE
			break
		case vnode == null:
			type = CREATE
			break
		case vnode.tagName !== newVnode.tagName:
			type = REPLACE
			break
		case isComponentClass(vnode.tagName) && !!vnode.component:
			type = UPDATE
			break
		case !!(vnode.props || newVnode.props):
			if (newVnode.props && newVnode.props.key && newVnode.props.key !== vnode.props.key) {
				type = REPLACE
			} else {
				type = PROPS
			}
			break
		case (isStr(vnode) || isNum(vnode) || isStr(newVnode) || isNum(newVnode)) && vnode != newVnode:
			type = REPLACE
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
	let childrenType
	let childrenPatches
	if (!newChildren) {
		childrenType = REMOVE
	} else if (!children) {
		childrenType = CREATE
	} else {
		childrenPatches = []
		let maxLen = Math.max(children.length, newChildren.length)
		for (let i = 0; i < maxLen; i++) {
			childrenPatches.push(diff(children[i], newChildren[i]))
		}
		childrenType = REPLACE
		return { childrenType, childrenPatches }
	}

	if (childrenType) {
		return { childrenType, newChildren }
	}
}