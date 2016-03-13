import * as _ from '../util'
import { createVcomment } from './vcomment'
import { createVtext, updateVtext } from './vtext'
import { createVelem, updateVelem, destroyVelem } from './velement'
import { createVstateless, updateVstateless, destroyVstateless } from './vstateless'
import { createVcomponent, updateVcomponent, destroyVcomponent } from './vcomponent'
import { VTEXT, VELEMENT, VSTATELESS, VCOMPONENT, VCOMMENT, notBubbleEvents } from '../constant'

export let initVnode = (vnode, parentContext, namespaceURI) => {
    let { vtype } = vnode
    let node = null
    if (vtype === VELEMENT) {
        node = initVelem(vnode, parentContext, namespaceURI)
    } else if (vtype === VTEXT) {
        node = initVtext(vnode)
    } else if (vtype === VCOMPONENT) {
        node = initVcomponent(vnode, parentContext, namespaceURI)
    } else if (vtype === VSTATELESS) {
        node = initVstateless(vnode, parentContext, namespaceURI)
    } else if (vtype === VCOMMENT) {
        node = initVcomment(vnode)
    }
    return node
}

export let updateVnode = (vnode, newVnode, node, parentContext) => {
    let { vtype } = vnode
    let newNode = node

    if (vtype === VCOMMENT) {
    	return newNode
    }

    if (vtype === VELEMENT) {
        newNode = updateVelem(vnode, newVnode, node, parentContext)
    } else if (vtype === VTEXT) {
        newNode = updateVtext(vnode, newVnode, node, parentContext)
    } else if (vtype === VCOMPONENT) {
        newNode = updateVcomponent(vnode, newVnode, node, parentContext)
    } else if (vtype === VSTATELESS) {
        newNode = updateVstateless(vnode, newVnode, node, parentContext)
    }

    return newNode
}

export let destroyVnode = (vnode, node, remove) => {
    let { vtype } = vnode

    if (vtype !== VTEXT && vtype !== VCOMMENT) {
    	if (vtype === VELEMENT) {
	        destroyVelem(vnode, node)
	    } else if (vtype === VCOMPONENT) {
	        destroyVcomponent(vnode, node)
	    } else if (vtype === VSTATELESS) {
	        destroyVstateless(vnode, node)
	    } else if (vtype === VCOMMENT) {
	        destroyVcomment(vnode, node)
	    }
    }

    if (remove) {
        remove(node)
    }
}

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

export let createElement = function(type, props, children) {
	let createVnode = null
	let argsLen = arguments.length

	if (argsLen > 3) {
		children = [children]
		for (let i = 3; i < argsLen; i++) {
			children[i - 2] = arguments[i]
		}
	}

	let vType = typeof type

	if (vType === 'string') {
		createVnode = createVelem
	} else if (vType === 'function') {
		if (type.prototype && typeof type.prototype.forceUpdate === 'function') {
			createVnode = createVcomponent
		} else {
			createVnode = createVstateless
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

	let vnode = createVnode(type, finalProps)
	vnode.key = key
	vnode.ref = ref
	return vnode
}



