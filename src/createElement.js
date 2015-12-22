import * as _ from './util'
import { Velem, Vcomponent, VstatelessComponent, getComponent } from './virtual-dom'

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
	return new Vnode(type, props, children, getComponent())
}

export default createElement