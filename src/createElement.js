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

let createElement = (type, props, ...children) => {
	let Vnode = null

	if (_.isStr(type)) {
		Vnode = Velem
	} else if (_.isComponent(type)) {
		Vnode = Vcomponent
	} else if (_.isStatelessComponent(type)) {
		Vnode = VstatelessComponent
	} else {
		throw new Error(`React.createElement: unexpect type [ ${type} ]`)
	}

	let key = null
	let ref = null
	if (props != null) {
		if (props.key !== undefined) {
			key = '' + props.key
			delete props.key
		}
		if (props.ref !== undefined) {
			ref = props.ref
			delete props.ref
		}
	}

	let vnode = new Vnode(type, _.mergeProps(props, children, type.defaultProps))
	vnode.key = key
	vnode.ref = ref
	return vnode
}

export default createElement