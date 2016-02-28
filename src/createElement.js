import * as _ from './util'
import { createVelem, createVcomponent, createVstatelessComponent, handleVnodeWithRef } from './virtual-dom'

export let isValidElement = obj => obj != null && !!obj.vtype

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

let createElement = (type, props, ...children) => {
	let createVnode
	switch (true) {
		case _.isStr(type):
			createVnode = createVelem
			break
		case _.isComponent(type):
			createVnode = createVcomponent
			break
		case _.isStatelessComponent(type):
			createVnode = createVstatelessComponent
			break
		default:
			throw new Error(`React.createElement: unexpect type [ ${type} ]`)
	}
	let key = null
	let ref = null
	let hasRef = false
	if (props != null) {
		if (props.key !== undefined) {
			key = '' + props.key
			delete props.key
		}
		if (props.ref !== undefined) {
			ref = props.ref
			delete props.ref
			hasRef = true
		}
	}
	let vnode = createVnode(type, _.mergeProps(props, children, type.defaultProps))
	vnode.key = key
	vnode.ref = ref
	if (hasRef && createVnode !== createVstatelessComponent) {
		handleVnodeWithRef(vnode)
	}
	return vnode
}

export default createElement