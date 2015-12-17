import * as _ from './util'
import { initComponent, isComponent, isStateComponent } from './Component'
import { VNODE_TYPE } from './constant'

/**
* 根据 type props 创建 real-dom
*/
let create = (vnode) => {

	if (vnode === null || _.isBln(vnode)) {
		return document.createElement('noscript')
	}

	if (_.isUndefined(vnode)) {
		throw new Error('create(vnode): vnode is undefined')
	}

	if (!_.isObj(vnode)) {
		return document.createTextNode(vnode)
	}

	let { type, props } = vnode

	if (_.isUndefined(type)) {
		throw new Error('create(vnode): vnode.type is undefined')
	}

	let elem = document.createElement(type)
	_.setProps(elem, props)
	
	return elem
}

export default create