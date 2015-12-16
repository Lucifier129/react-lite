import { CREATE, REMOVE, REPLACE, PROPS, UPDATE } from './constant'
import create, { addChild } from './create'
import { updateComponent } from './component'
import diff from './diff'
import {
	isObj,
	isFn,
	isComponent,
	appendChild,
	removeChild,
	replaceChild,
	mergeProps,
	mapChildren,
	patchProps
} from 'util'

/**
* patch dom
*/
let patch = (node, patches, parent) => {
	if (!patches) {
		return node
	}
	let { vnode, newVnode, type, childrenType } = patches
	let newNode
	parent = node ? node.parentNode : parent
	switch (type) {
		case CREATE:
			newNode = create(newVnode)
			appendChild(parent, newNode)
			break
		case REMOVE:
			removeChild(parent, node)
			break
		case REPLACE:
			newNode = create(newVnode)
			replaceChild(parent, newNode, node)
			break
		case PROPS:
			if (isComponent(vnode.tagName)) {
				let newProps = mergeProps(newVnode.props, newVnode.children)
				newVnode.content = newVnode.tagName({...newProps, ...newVnode.tagName.defaultProps })
				if (isObj(newVnode.content) && isFn(newVnode.content.render)) {
					newVnode.content = newVnode.content.render()
				}
				let patches = diff(vnode.content, newVnode.content)
				return patch(node, patches, parent)
			} else {
				patchProps(node, vnode.props, newVnode.props)
			}
			break
		case UPDATE:
			updateComponent(vnode.component, mergeProps(newVnode.props, newVnode.children))
			newVnode.component = vnode.component
			break
	}

	switch (childrenType) {
		case REMOVE:
			while (node.firstChild) {
				removeChild(node, node.firstChild)
			}
			break
		case CREATE:
			newVnode.children = mapChildren(newVnode.children, child => addChild(node, child))
			break
		case REPLACE:
			newVnode.children = mapChildren(newVnode.children, (newChild, i) => {
				let patches = diff(vnode.children[i], newChild)
				patch(node.childNodes[i], patches, node)
			})
			while (node.childNodes.length > newVnode.children.length) {
				removeChild(node, node.lastChild)
			}
			break
	}

	return newNode || node
}

export default patch
