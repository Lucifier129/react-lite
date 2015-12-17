import { CREATE, REMOVE, REPLACE, PROPS, UPDATE } from './constant'
import {
	isObj,
	isUndefined,
	isComponent,
	isComponentClass,
	mapChildren,
	hasKey
} from 'util'

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
		case isComponent(vnode.tagName) || !!(vnode.props || newVnode.props):
			if (hasKey(vnode) && hasKey(newVnode)) {
				if (vnode.props.key === newVnode.props.key) {
					type = UPDATE
				} else {
					type = REPLACE
				}
			} else if (hasKey(vnode) || hasKey(newVnode)) {
				type = REPLACE
			} else {
				type = UPDATE
			}
			if (type === UPDATE && !isComponentClass(vnode.tagName)) {
				type = PROPS
			}
			break
		case !isObj(vnode) && !isObj(newVnode) && vnode != newVnode:
			type = REPLACE
			break
	}
	if (!type || (type === PROPS && !isComponent(vnode.tagName))) {
		if (vnode.props && vnode.props.dangerouslySetInnerHTML || newVnode.props && newVnode.props.dangerouslySetInnerHTML) {
			//pass
		} else {
			let childrenType = diffChildren(vnode.children, newVnode.children)
			return { type, vnode, newVnode, childrenType }
		}
		
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