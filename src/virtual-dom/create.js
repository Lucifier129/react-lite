import { isStr, isFn, isObj, isArr, isNum } from './util'

/**
* 根据 tagName props attrs 创建 real-dom
*/
let create = vnode => {

	if (vnode == null) {
		return document.createElement('noscript')
	}

	if (isStr(vnode) || isNum(vnode)) {
		return document.createTextNode(vnode)
	}

	if (vnode.type === 'Widget') {
		return vnode.init()
	}

	let { tagName, props, children } = vnode
	if (tagName == null) {
		debugger
	}
	let elem = document.createElement(tagName)
	if (isObj(props)) {
		setProps(elem, props)
	}
	if (children && children.length > 0) {
		children.forEach(child => addChild(elem, child))
	}
	return elem
}

export default create

export let addChild = (elem, child) => {
	if (isArr(child)) {
		return child.forEach(item => addChild(elem, item))
	}
	let childNode = create(child)
	elem.appendChild(childNode)
}

export let setProps = (elem, props) => {
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

export let setAttrs = (elem, attrs) => {
	if (!isObj(attrs)) {
		return
	}
	Object.keys(attrs).forEach(attrName => {
		elem.setAttribute(attrName, attrs[attrName])
	})
}

export let setStyle = (elem, style) => {
	if (!isObj(style)) {
		return
	}
	Object.keys(style).forEach(key => {
		elem.style[key] = style[key]
	})
}