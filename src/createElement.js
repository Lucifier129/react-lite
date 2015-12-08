import { isBln, isArr } from './util'
let createElement = (tagName, props, ...children) => {
	let vnode = {tagName, props }
	children = getFlatChildren([], children)
	if (children.length) {
		vnode.children = children
	}
	return vnode
}

export default createElement

let getFlatChildren = (store, children) => {
	if (isArr(children)) {
		children.forEach(item => {
			if (isArr(item)) {
				return getFlatChildren(store, item)
			}
			if (!isBln(item)) {
				store.push(item)
			}
		})
	}
	return store
}