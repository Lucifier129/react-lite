import * as _ from './util'
import { Velem, Vcomponent, VstatelessComponent, handleVnodeWithRef } from './virtual-dom'

export let isValidElement = obj => obj != null && !!obj.vtype

export let cloneElement = function(originElem, props) {
	let children = Array.prototype.slice.call(arguments, 2)
	let { type, key, ref } = originElem
	props = _.extend({ key, ref }, originElem.props, props)
	let vnode = createElement(type, props, ...children)
	if (vnode.ref === originElem.ref) {
		vnode.refs = originElem.refs
	}
	return vnode
}

export let createFactory = type => {
	let factory = function() {
		let args = Array.prototype.slice.call(arguments)
		return createElement(type, ...args)
	}
	factory.type = type
	return factory
}

let createElement = function(type, props) {
	let children = Array.prototype.slice.call(arguments, 2)
	let Vnode
	switch (true) {
		case _.isStr(type):
			Vnode = Velem
			break
		case _.isComponent(type):
			Vnode = Vcomponent
			break
		case _.isStatelessComponent(type):
			Vnode = VstatelessComponent
			break
		default:
			throw new Error(`React.createElement: unexpect type [ ${type} ]`)
	}
	let key = null
	let ref = null
	let hasRef = false
	if (props != null) {
		if (!_.isUndefined(props.key)) {
			key = '' + props.key
			delete props.key
		}
		if (!_.isUndefined(props.ref)) {
			ref = props.ref
			delete props.ref
			hasRef = true
		}
	}
	let vnode = new Vnode(type, _.mergeProps(props, children, type.defaultProps))
	vnode.key = key
	vnode.ref = ref
	if (hasRef && Vnode !== VstatelessComponent) {
		handleVnodeWithRef(vnode)
	}
	return vnode
}

export default createElement