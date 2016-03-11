import * as _ from './util'
import { Velem, Vcomponent, VstatelessComponent } from './virtual-dom'

export let isValidElement = obj => obj != null && !!obj.isVdom

export let cloneElement = (originElem, props, ...children) => {
	let { type, key, ref } = originElem
	let newProps = _.extend(_.extend({ key, ref }, originElem.props), props)
	let vnode = createElement(type, newProps, ...children)
	if (vnode.ref === originElem.ref) {
		vnode.refs = originElem.refs
	}
	return vnode
}

export let createFactory = type => {
	let factory = (...args) => createElement(type, ...args)
	factory.type = type
	return factory
}

let createElement = function(type, props, children) {
	let Vnode = null
	let argsLen = arguments.length

	if (argsLen > 3) {
		children = [children]
		for (let i = 3; i < argsLen; i++) {
			children[i - 2] = arguments[i]
		}
	}

	let vType = typeof type

	if (vType === 'string') {
		Vnode = Velem
	} else if (vType === 'function') {
		if (type.prototype && typeof type.prototype.forceUpdate === 'function') {
			Vnode = Vcomponent
		} else {
			Vnode = VstatelessComponent
		}
	} else {
		throw new Error(`React.createElement: unexpect type [ ${type} ]`)
	}

	let key = null
	let ref = null
	let finalProps = {}
	if (props != null) {
		for (let propKey in props) {
			if (!_.hasOwn(props, propKey)) {
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
			} else {
				finalProps[propKey] = props[propKey]
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

	if (children !== undefined) {
		finalProps.children = children
	}

	let vnode = new Vnode(type, finalProps)
	vnode.key = key
	vnode.ref = ref
	return vnode
}

export default createElement