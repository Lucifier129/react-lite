import * as _ from './util'
import diff from './diff'
import create from './create'
import { Component } from './Component'
import { DIFF_TYPE: type, VNODE_TYPE } from './constant'

let patch = (node, vnode, newVnode, parent) => {
	let diffType = diff(vnode, newVnode)
	let newNode
	parent = node ? node.parentNode : parent

	switch (diffType) {
		case type.CREATE:
			newNode = create(newVnode)
			parent.appendChild(newNode)
			if (newNode.props && newNode.props.ref) {
				if (_.isFn(newNode.props.ref)) {
					newNode.props.ref()
				}
			}

	}

	return newNode || node
}

export default patch

let didMount = vnode => {
	if (!_.isObj(vnode)) {
		return
	}
	switch (vnode.vtype) {
		case VNODE_TYPE.ELEMENT:
			if (_.isObj(vnode.props) && _.isFn(vnode.props.ref)) {
				vnode.props.ref(vnode.node)
			}
			break
		case VNODE_TYPE.COMPONENT:
			componentDidMount(component)
			break
	}
}