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
let create = (vnode, componentId) => {
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
			let { node, component } = initComponent(Component, props, componentId)
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
		vnode.children = mapChildren(children, vchild => addChild(elem, vchild, componentId))
	}
	return elem
}

export default create

export let addChild = (elem, vchild, componentId) => {
	let childNode = create(vchild, componentId)
	let { props } = vchild
	appendChild(elem, childNode, componentId, )
	if (componentId && props && props.ref) {
		if (isFn(props.ref)) {
			elem.detachRef = props.ref
			props.ref(elem)
		} else {
			elem.parentId = componentId
			attachRef(componentId, props.ref, elem)
		}
	}
}