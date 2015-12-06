import { isStr, isFn, isObj, isArr, isNum, isBln, setProps } from './util'
import { WIDGET } from './constant'

/**
* 根据 tagName props attrs 创建 real-dom
*/
let create = vnode => {

	if (isBln(vnode)) {
		return
	}

	if (vnode == null) {
		return document.createElement('noscript')
	}

	if (isStr(vnode) || isNum(vnode)) {
		return document.createTextNode(vnode)
	}

	if (vnode.type === WIDGET) {
		return vnode.init()
	}

	let { tagName, props, children } = vnode

	if (isFn(tagName)) {
		props.children = children
		vnode = tagName(props)
		return create(vnode)
	}

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
	if (childNode !== undefined) {
		elem.appendChild(childNode)
	}
}