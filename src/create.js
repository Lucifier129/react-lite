import { initComponent } from './component'
import {
	isObj,
	isComponentClass,
	isComponent,
	setProps,
	appendChild,
	mergeProps,
	mapChildren
} from 'util'

/**
* 根据 tagName props attrs 创建 real-dom
*/
let create = vnode => {
	if (vnode === null) {
		return document.createElement('noscript')
	}
	if (!isObj(vnode)) {
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
		return create(Component(props))
	}

	let elem = document.createElement(tagName)
	if (props) {
		setProps(elem, props)
	}
	if (children && children.length > 0) {
		vnode.children = mapChildren(children, child => addChild(elem, child))
	}
	return elem
}

export default create

export let addChild = (elem, child) => {
	appendChild(elem, create(child))
}