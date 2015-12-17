
let createElement = (tagName, props, ...children) => {
	let vnode = { tagName, props }
	if (children.length) {
		vnode.children = children
	}
	return vnode
}

export default createElement