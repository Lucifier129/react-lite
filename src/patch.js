import {
	isStr,
	isObj,
	isFn,
	toArray,
	setProps,
	setStyleValue,
	removeProps,
	setEvent,
	removeEvent,
	isEventKey,
	appendChild,
	removeChild,
	replaceChild,
	mergeProps,
	removeProp
} from './util'
import { CREATE, REMOVE, REORDER, REPLACE, INSERT, PROPS, WIDGET, UPDATE } from './constant'
import create, { addChild } from './create'
import { updateComponent } from './component'

/**
* patch dom
*/
let patch = (node, patches, parent) => {
	if (!patches) {
		return node
	}
	let { vnode, newVnode, type, childrenType } = patches
	let newNode
	parent = node ? node.parentNode : parent
	switch (type) {
		case CREATE:
			newNode = create(newVnode)
			appendChild(parent, newNode)
			break
		case REMOVE:
			removeChild(parent, node)
			break
		case REPLACE:
			newNode = create(newVnode)
			replaceChild(parent, newNode, node)
			break
		case PROPS:
			patchProps(node, vnode.props, newVnode.props)
			break
		case UPDATE:
			updateComponent(vnode.component, mergeProps(newVnode.props, newVnode.children))
			newVnode.component = vnode.component
			break
	}

	switch (childrenType) {
		case REMOVE:
			toArray(node.childNodes).forEach(child => removeChild(node, child))
			break
		case CREATE:
			patches.newChildren.forEach(child => addChild(node, child))
			break
		case REPLACE:
			let children = toArray(node.childNodes)
			patches.childrenPatches.forEach((childPatches, index) => {
				patch(children[index], childPatches, node)	
			})
			break
	}

	return newNode || node
}

export default patch

let patchProps = (node, props, newProps) => {
	if (props == null && newProps) {
		return setProps(node, newProps)
	} else if (newProps == null && props) {
		return Object.keys(props).each(key => removeProp(node, key))
	}
	Object.keys({ ...props, ...newProps }).forEach(key => {
		let value = props[key]
		let newValue = newProps[key]
		if (newValue === value || key === 'key') {
			return
		}
		switch (true) {
			case key === 'style':
				patchStyle(node, props.style, newProps.style)
				break
			case isEventKey(key):
				if (!isFn(newValue)) {
					removeEvent(node, key)
				} else {
					setEvent(node, key, newValue)
				}
				break
			case key in node:
				if (newValue === undefined) {
					removeProp(node, key)
				} else {
					node[key] = newValue
				}
				break
			default:
				if (newValue === undefined) {
					node.removeAttribute(key)
				} else {
					node.setAttribute(key, newValue)
				}
		}
	})
}

let patchStyle = (node, style, newStyle) => {
	let domStyle = node.style
	Object.keys({ ...style, ...newStyle }).forEach(key => {
		let value = newStyle[key]
		if (value === undefined) {
			domStyle[key] = ''
		} else if (value !== style[key]) {
			setStyleValue(domStyle, key, value)
		}
	})
}
