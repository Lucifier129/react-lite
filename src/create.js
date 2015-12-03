import { isStr, isFn, isObj } from './util'

/**
* 根据 tagName props attrs 创建 real-dom
*/
let create = vnode => {
	if (isStr(vnode)) {
		return document.createTextNode(vnode)
	}
	let { tagName, props, children } = vnode
	let elem = document.createElement(tagName)
	if (isObj(props)) {
		Object.keys(props).forEach(key => {
			let value = props[key]
			if (key === 'attributes') {
				return setAttrs(elem, value)
			}
			if (key === 'style') {
				return setStyle(elem, value)
			}
			elem[key] = value
		})
	}
	if (children && children.length > 0) {
		children.forEach(child => {
			let childNode = create(child)
			elem.appendChild(childNode)
		})
	}
	return elem
}

export default create

let setAttrs = (elem, attrs) => {
	if (!isObj(attrs)) {
		return
	}
	Object.keys(attrs).forEach(attrName => {
		elem.setAttribute(attrName, attrs[attrName])
	})
}

let setStyle = (elem, style) => {
	if (!isObj(style)) {
		return
	}
	Object.keys(style).forEach(key => {
		elem.style[key] = style[key]
	})
}