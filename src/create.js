import {
	isStr,
	isFn,
	isObj,
	isArr,
	isNum,
	isBln,
	isComponentClass,
	isComponent,
	setProps,
	appendChild,
	mergeProps
} from './util'
import { WIDGET, WILL_MOUNT, DID_MOUNT } from './constant'
import { initComponent } from './component'

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

	let { tagName, props, children } = vnode
	if (isComponent(tagName)) {
		let Component = tagName
		props = mergeProps(props, children)
		if (isComponentClass(Component)) {
			let { node, component } = initComponent(Component, props)
			vnode.component = component
			return node
		}
		vnode = Component(props)
		return create(vnode)
	}

	let elem = document.createElement(tagName)
	if (props) {
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
		appendChild(elem, childNode)
	}
}