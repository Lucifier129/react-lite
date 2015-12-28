import * as _ from './util'
import { Velem, Vcomponent, VstatelessComponent, collectRef } from './virtual-dom'

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
	if (children.length === 0) {
		children = undefined
	}
	let vnode = new Vnode(type, props, children)
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