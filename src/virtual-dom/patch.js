import { isStr, isObj, isFn, setProps, setStyleValue, removeProps, setEvent, removeEvent, isEventKey } from './util'
import { CREATE, REMOVE, REORDER, REPLACE, INSERT, PROPS, WIDGET } from './constant'
import create, { addChild } from './create'

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
			parent.appendChild(newNode)
			break
		case REMOVE:
			parent.removeChild(node)
			break
		case REPLACE:
			newNode = create(newVnode)
			parent.replaceChild(newNode, node)
			break
		case PROPS:
			applyProps(node, vnode.props, newVnode.props)
			break
		case WIDGET:
			newVnode.update(vnode, node)
			break
	}

	switch (childrenType) {
		case REMOVE:
			node.innerHTML = ''
			break
		case CREATE:
			patches.newChildren.forEach(child => addChild(node, child))
			break
		case REPLACE:
			let children = Array.prototype.slice.call(node.childNodes)
			patches.childrenPatches.forEach((childPatches, index) => {
				patch(children[index], childPatches, node)	
			})
			break
	}

	return newNode || node
}

export default patch

let applyProps = (node, props, newProps) => {
	if (props == null && isObj(newProps)) {
		return setProps(node, newProps)
	} else if (newProps == null && isObj(props)) {
		return Object.keys(props).each(key => removeProp(node, key))
	}
	Object.keys({ ...props, ...newProps }).forEach(key => {
		let value = props[key]
		let newValue = newProps[key]
		switch (true) {
			case key === 'style':
				patchStyle(node, props.style, newProps.style)
				break
			case isEventKey(key):
				if (!isFn(newValue)) {
					removeEvent(node, key)
				} else if (newValue !== value) {
					setEvent(node, key, newValue)
				}
				break
			case key in node:
				if (newValue === undefined) {
					removeProp(node, key)
				} else if (newValue !== value) {
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
