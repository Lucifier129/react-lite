import * as _ from './util'
import { VNODE_TYPE } from './constant'
import { Velem, Vcomponent, VstatelessComponent, collectRef } from './virtual-dom'

export let isValidElement = obj => {
	if (obj == null) {
		return false
	}
	if (obj.vtype === VNODE_TYPE.ELEMENT || obj.vtype === VNODE_TYPE.COMPONENT) {
		return true
	}
	return false
}

export let cloneElement = (originElem, props, ...children) => {
	let type = originElem.type
	props = _.extend({}, originElem.props, props)
	let vnode = createElement(type, props, ...children)
	if (vnode.ref === originElem.ref) {
		vnode.refs = originElem.refs
	}
	return vnode
}

let createElement = (type, props, ...children) => {
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
			throw new Error(`React.createElement: unexpect type ${type}`)
	}
	let vnode = new Vnode(type, _.mergeProps(props, children, type.defaultProps))
	let hasKey = _.hasKey(vnode, 'key')
	let hasRef = _.hasKey(vnode, 'ref')
	vnode.key = hasKey ? vnode.props.key : null
	vnode.ref = hasRef ? vnode.props.ref : null
	if (hasRef && Vnode !== VstatelessComponent) {
		collectRef(vnode)
	}
	return vnode
}

export default createElement