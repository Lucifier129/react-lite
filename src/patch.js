import {
	isStr,
	isObj,
	isFn,
	isUndefined,
	toArray,
	setProp,
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
	removeProp,
	mapChildren,
	setAttr,
	removeAttr,
	collectRef
} from 'util'
import { CREATE, REMOVE, REORDER, REPLACE, INSERT, PROPS, WIDGET, UPDATE } from './constant'
import create, { addChild } from './create'
import { updateComponent } from './component'
import diff from './diff'

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
			while (node.childNodes.length) {
				removeChild(node, node.firstChild)
			}
			break
		case CREATE:
			newVnode.children = mapChildren(patches.newChildren, child => addChild(node, child))
			break
		case REPLACE:
			let childNodes = toArray(node.childNodes)
			newVnode.children = mapChildren(newVnode.children, (newChild, i) => {
				let patches = diff(vnode.children[i], newChild)
				patch(childNodes[i], patches, node)
			})
			while (node.childNodes.length > newVnode.children.length) {
				removeChild(node, node.lastChild)
			}
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

	for (let key in newProps) {
		if (!newProps.hasOwnProperty(key)) {
			continue
		}
		let newValue = newProps[key]
		if (isUndefined(newValue)) {
			removeProp(node, key)
		} else if (newValue !== props[key]) {
			setProp(node, key, newValue)
		} else if (key === 'ref' && newValue) {
			collectRef(newValue, node)
		}
		delete props[key]
	}

	for (let key in props) {
		if (!props.hasOwnProperty(key)) {
			continue
		}
		if (isUndefined(newValue[key])) {
			removeProp(node, key)
		}
	}
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
