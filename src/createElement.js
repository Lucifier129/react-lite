import * as _ from './util'
import { createVelem, createVcomponent, createVstateless } from './virtual-dom'

export function isValidElement(obj) {
	return obj != null && !!obj.vtype
}

export function cloneElement(originElem, props, ...children) {
	let { type, key, ref } = originElem
	let newProps = _.extend(_.extend({ key, ref }, originElem.props), props)
	let vnode = createElement(type, newProps, ...children)
	if (vnode.ref === originElem.ref) {
		vnode.refs = originElem.refs
	}
	return vnode
}

export function createFactory(type) {
	let factory = (...args) => createElement(type, ...args)
	factory.type = type
	return factory
}

export default function createElement(type, props, children) {
	let createVnode = null
	let varType = typeof type

	if (varType === 'string') {
		createVnode = createVelem
	} else if (varType === 'function') {
		if (type.prototype && typeof type.prototype.forceUpdate === 'function') {
			createVnode = createVcomponent
		} else {
			createVnode = createVstateless
		}
	} else {
		throw new Error(`React.createElement: unexpect type [ ${type} ]`)
	}

	let key = null
	let ref = null
	let finalProps = {}
	let propValue = null
	if (props != null) {
		for (let propKey in props) {
			if (!props.hasOwnProperty(propKey)) {
				continue
			}
			if (propKey === 'key') {
				if (props.key !== undefined) {
					key = '' + props.key
				}
			} else if (propKey === 'ref') {
				if (props.ref !== undefined) {
					ref = props.ref
				}
			} else if ((propValue = props[propKey]) !== undefined) {
				finalProps[propKey] = propValue
			}
		}
	}

	let defaultProps = type.defaultProps

	if (defaultProps) {
		for (let propKey in defaultProps) {
			if (finalProps[propKey] === undefined) {
				finalProps[propKey] = defaultProps[propKey]
			}
		}
	}

	let childrenLen = arguments.length - 2
	let finalChildren = children

	if (childrenLen > 1) {
		finalChildren = Array(childrenLen)
		for (let i = 0; i < childrenLen; i++) {
			finalChildren[i] = arguments[i + 2]
		}
	}

	if (finalChildren !== undefined) {
		finalProps.children = finalChildren
	}

	let vnode = createVnode(type, finalProps)
	vnode.key = key
	vnode.ref = ref
	return vnode
}