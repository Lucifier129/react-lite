import { initComponent } from './component'
import {
	isFn,
	isUndefined,
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

	if (isUndefined(vnode)) {
		throw new Error('create(vnode): vnode is undefined')
	}

	if (!isObj(vnode)) {
		return document.createTextNode(vnode)
	}

	let { tagName, props, children } = vnode

	if (isUndefined(tagName)) {
		throw new Error('create(vnode): vnode.tagName is undefined')
	}

	if (isComponent(tagName)) {
		let Component = tagName
		props = mergeProps(props, children)
		if (isComponentClass(Component)) {
			let { node, component } = initComponent(Component, props)
			vnode.component = component
			return node
		}
		vnode.content = Component({ ...props, ...Component.defaultProps })
		if (isObj(vnode.content) && isFn(vnode.content.render)) {
			vnode.content = vnode.content.render()
		}
		return create(vnode.content)
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