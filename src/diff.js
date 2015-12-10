import {
	isStr,
	isObj,
	isFn,
	isArr,
	isNum,
	isUndefined,
	isComponent,
	isComponentClass,
	mapChildren,
	hasKey,
	collectChildren
} from './util'
import { CREATE, REMOVE, REPLACE, PROPS, UPDATE } from './constant'

/**
* diff vnode and newVnode
*/
let diff = (vnode, newVnode) => {
	let children
	let type
	switch (true) {
		case vnode === newVnode:
			return null
		case isUndefined(newVnode):
			type = REMOVE
			break
		case isUndefined(vnode):
			type = CREATE
			break
		case vnode === null || newVnode === null || vnode.tagName !== newVnode.tagName:
			type = REPLACE
			break
		case isComponentClass(vnode.tagName):
			type = UPDATE
			break
		case !!(vnode.props || newVnode.props):
			if (hasKey(newVnode) && newVnode.props.key !== vnode.props.key) {
				type = REPLACE
			} else {
				type = PROPS
			}
			break
		case !isObj(vnode) && !isObj(newVnode) && vnode != newVnode:
			type = REPLACE
			break
	}
	if (!type || type === PROPS) {
		let childrenType = diffChildren(vnode.children, newVnode.children)
		return { type, vnode, newVnode, childrenType }
	}
	return type ? { type, vnode, newVnode } : null
}

export default diff

let diffChildren = (children, newChildren) => {
	let childrenType
	if (!newChildren) {
		childrenType = REMOVE
	} else if (!children) {
		childrenType = CREATE
	} else {
		childrenType = REPLACE
	}
	return childrenType
}