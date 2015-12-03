import { isStr, isObj, isFn } from './util'
import { CREATE, REMOVE, REORDER, REPLACE, INSERT, PROPS } from './constant'
import create, { setAttrs, setStyle, setProps, addChild } from './create'
/**
* patch dom
*/

let patch = (node, patches, parent) => {
	let newNode
	parent = parent || node.parentNode
	switch (patches.type) {
		case CREATE:
			newNode = create(patches.vnode)
			parent.appendChild(newNode)
			break
		case REMOVE:
			parent.removeChild(node)
			break
		case REPLACE:
			newNode = create(patches.vnode)
			parent.replaceChild(newNode, node)
			break
		case PROPS:
			let { props, newProps } = patches.store 
			applyProps(node, props, newProps)
			break
	}
	if (!patches.children || (patches.type && patches.type !== PROPS)) {
		return newNode || node
	}

	switch (patches.children.type) {
		case CREATE:
			patches.children.vnodes.forEach(vnode => node.appendChild(vnode))
			break
		case REMOVE:
			Array.prototype.slice.call(node.children).forEach(child => node.removeChild(child))
			break
		case REPLACE:
			patches.children.store.forEach((childPatches, index) => 
				patch(node.children[i], childPatches, node)	
			)
			break
	}

	return newNode || node
}

export default patch

let applyProps = (node, props, newProps) => {
	if (props == null && isObj(newProps)) {
		return setProps(node, newProps)
	} else if (newProps == null && isObj(props)) {
		return removeProps(node, props)
	}
	Object.keys({ ...props, ...newProps }).forEach(key => {
		if (key === 'attributes') {
			return patchAttrs(node, props.attributes, newProps.attributes)
		} else if (key === 'style') {
			return patchStyle(node, props.style, newProps.style)
		}
		node[key] = newProps[key]
	})
}


let removeProps = (node, props) => {
	Object.keys(props).forEach(key => {
		let value = props[key]
		if (key === 'attributes') {
			return removeAttrs(node, value)
		} else if (key === 'style') {
			return removeStyle(node, value)
		}
		try {
			node[key] = ''
		} catch (e) {
			node[key] = null
		}
	})
}

let removeAttrs = (node, attrs) => {
	if (!isObj(attrs)) {
		return
	}
	Object.keys(attrs).forEach(attrName => node.removeAttribute(attrName))
}

let removeStyle = (node, style) => {
	if (!isObj(style)) {
		return
	}
	Object.keys(style).forEach(key => node.style[key] = '')
}

let patchAttrs = (node, attrs, newAttrs) => {
	Object.keys({ ...attrs, ...newAttrs }).forEach(attrName => {
		let newAttr = newAttrs[attrName]
		if (newAttr === undefined) {
			node.removeAttribute(attrName)
		} else {
			node.setAttribute(attrName, newAttr)
		}
	})
}

let patchStyle = (node, style, newStyle) => {
	Object.keys({ ...style, ...newStyle }).forEach(key => {
		let value = newStyle[key]
		node.style[key] = value !== undefined ? value : ''
	})
}