import * as _ from './util'
import {
    SVGNamespaceURI,
    notBubbleEvents,
    VELEMENT,
    VSTATELESS,
    VCOMPONENT,
    VCOMMENT
} from './constant'
import { getEventName } from './event-system'

let noop = _.noop
let refs = null

export let createVelem = (type, props) => ({
    vtype: VELEMENT,
    type: type,
    props: props,
    refs: refs
})

export let createVstateless = (type, props) => ({
    vtype: VSTATELESS,
    id: _.getUid(),
    type: type,
    props: props
})

export let createVcomponent = (type, props) => ({
    vtype: VCOMPONENT,
    id: _.getUid(),
    type: type,
    props: props,
    refs: refs
})

export let createVcomment = comment => ({
    vtype: VCOMMENT,
    comment: comment
})


export let initVnode = (vnode, parentContext, namespaceURI) => {
    let { vtype } = vnode
    let node = null
    if (!vtype) {
        node = document.createTextNode(vnode)
    } else if (vtype === VELEMENT) {
        node = initVelem(vnode, parentContext, namespaceURI)
    } else if (vtype === VCOMPONENT) {
        node = initVcomponent(vnode, parentContext, namespaceURI)
    } else if (vtype === VSTATELESS) {
        node = initVstateless(vnode, parentContext, namespaceURI)
    } else if (vtype === VCOMMENT) {
        node = document.createComment(vnode.comment)
    }
    return node
}

let updateVnode = (vnode, newVnode, node, parentContext) => {
    let newNode = node
    let { vtype } = vnode

    if (vtype === VELEMENT) {
        newNode = updateVelem(vnode, newVnode, node, parentContext)
    } else if (vtype === VCOMPONENT) {
        newNode = updateVcomponent(vnode, newVnode, node, parentContext)
    } else if (vtype === VSTATELESS) {
        newNode = updateVstateless(vnode, newVnode, node, parentContext)
    }

    return newNode
}

export let destroyVnode = (vnode, node) => {
    let { vtype } = vnode

    if (vtype === VELEMENT) {
        destroyVelem(vnode, node)
    } else if (vtype === VCOMPONENT) {
        destroyVcomponent(vnode, node)
    } else if (vtype === VSTATELESS) {
        destroyVstateless(vnode, node)
    }
}


let initVelem = (velem, parentContext, namespaceURI) => {
    let { type, props } = velem
    let node = null
    
    if (type === 'svg' || namespaceURI === SVGNamespaceURI) {
        node = document.createElementNS(SVGNamespaceURI, type)
        namespaceURI = SVGNamespaceURI
    } else {
        node = document.createElement(type)
    }

    initChildren(node, props.children, parentContext)
    _.setProps(node, props)

    if (velem.ref !== null) {
        attachRef(velem.refs, velem.ref, node)
    }

    return node
}

let initChildren = (node, children, parentContext) => {
    node.vchildren = []
    if (_.isArr(children)) {
        _.flattenChildren(children, collectVchild, node, parentContext)
    } else {
        collectVchild(children, node, parentContext)
    }
}

let updateChildren = (node, newChildren, parentContext) => {
    let { vchildren, childNodes, namespaceURI } = node
    let newVchildren = node.vchildren = []

    for (let i = 0, len = vchildren.length; i < len; i++) {
        vchildren[i].node = childNodes[i]
    }

    if (_.isArr(newChildren)) {
        _.flattenChildren(newChildren, collectNewVchild, newVchildren, vchildren)
    } else {
        collectNewVchild(newChildren, newVchildren, vchildren)
    }

    for (let i = 0, len = newVchildren.length; i < len; i++) {
        let newItem = newVchildren[i]
        let newVnode = newItem.vnode
        let oldItem = newItem.prev
        let newChildNode = null
        if (oldItem) {
            newChildNode = oldItem.node
            newItem.prev = null
            if (oldItem.index !== newItem.index) {
                attachNode(node, newChildNode, childNodes[newItem.index], vchildren)
            }
            if (newVnode !== oldItem.vnode) {
                if (!newVnode.vtype) { // textNode
                    newChildNode.nodeValue = newVnode
                } else {
                    newChildNode = updateVnode(oldItem.vnode, newVnode, newChildNode, parentContext)
                }
            }
        } else {
            newChildNode = initVnode(newVnode, parentContext, namespaceURI)
            attachNode(node, newChildNode, childNodes[newItem.index], vchildren, true)
        }
    }

    for (let i = 0, len = vchildren.length; i < len; i++) {
        let item = vchildren[i]
        destroyVnode(item.vnode, item.node)
        node.removeChild(item.node)
    }
}

let attachNode = (node, newNode, existNode, vchildren, isNewNode) => {
    if (!existNode) {
        node.appendChild(newNode)
    } else if (existNode !== newNode) {
        if (!isNewNode) {
            node.removeChild(newNode)
        }
        for (let i = 0, len = vchildren.length; i < len; i++) {
            let item = vchildren[i]
            if (item.node === existNode) {
                vchildren.splice(i, 1)
                destroyVnode(item.vnode, item.node)
                node.replaceChild(newNode, existNode)
                return
            }
        }
        node.insertBefore(newNode, existNode)
    }
}

let collectVchild = (vchild, node, parentContext) => {
    if (vchild == null || _.isBln(vchild)) {
        return false
    }
    vchild = vchild.vtype ? vchild : '' + vchild

    let childNode = initVnode(vchild, parentContext, node.namespaceURI)
    node.appendChild(childNode)
    node.vchildren.push({
        vnode: vchild,
        index: node.vchildren.length
    })
}

let collectNewVchild = (newVchild, newVchildren, vchildren) => {
    if (newVchild == null || _.isBln(newVchild)) {
        return false
    }

    let oldItem = null
    newVchild = newVchild.vtype ? newVchild : '' + newVchild

    let { refs, type, key } = newVchild
    for (let i = 0, len = vchildren.length; i < len; i++) {
        let item = vchildren[i]
        let vnode = item.vnode
        if (vnode === newVchild || vnode.refs === refs && vnode.type === type && vnode.key === key) {
            oldItem = item
            vchildren.splice(i, 1)
            break
        }
    }

    newVchildren.push({
        prev: oldItem,
        vnode: newVchild,
        index: newVchildren.length
    })

}

let updateVelem = (velem, newVelem, node, parentContext) => {
    let { props } = velem
    let newProps = newVelem.props
    let oldHtml = props.dangerouslySetInnerHTML && props.dangerouslySetInnerHTML.__html
    let newChildren = newProps.children

    if (oldHtml == null && node.vchildren.length) {
        updateChildren(node, newChildren, parentContext)
        _.patchProps(node, props, newProps)
    } else {
        // should patch props first, make sure innerHTML was cleared 
        _.patchProps(node, props, newProps)
        initChildren(node, newChildren, parentContext)
    }
    if (velem.ref !== null) {
        if (newVelem.ref !== null) {
            attachRef(newVelem.refs, newVelem.ref, node)
        } else {
            detachRef(velem.refs, velem.ref)
        }
    } else {
        attachRef(newVelem.refs, newVelem.ref, node)
    }
    return node
}

let destroyVelem = (velem, node) => {
    let { props } = velem
    let { vchildren, childNodes } = node

    for (let i = 0, len = vchildren.length; i < len; i++) {
        let item = vchildren[i]
        destroyVnode(item.vnode, childNodes[i])
    }

    if (velem.ref !== null) {
        detachRef(velem.refs, velem.ref)
    }
    node.eventStore = node.vchildren = null
    for (let key in props) {
        if (props.hasOwnProperty(key) && _.EVENT_KEYS.test(key)) {
            key = getEventName(key)
            if (notBubbleEvents[key] === true) {
                node[key] = null
            }
        }
    }
}

let initVstateless = (vstateless, parentContext, namespaceURI) => {
    let vnode = renderVstateless(vstateless, parentContext)
    let node = initVnode(vnode, parentContext, namespaceURI)
    node.cache = node.cache || {}
    node.cache[vstateless.id] = vnode
    return node
}
let updateVstateless = (vstateless, newVstateless, node, parentContext) => {
    let id = vstateless.id
    let vnode = node.cache[id]
    delete node.cache[id]
    let newVnode = renderVstateless(newVstateless, parentContext)
    let newNode = compareTwoVnodes(vnode, newVnode, node, parentContext)
    newNode.cache = newNode.cache || {}
    newNode.cache[newVstateless.id] = newVnode
    if (newNode !== node) {
        _.extend(newNode.cache, node.cache)
    }
    return newNode
}
let destroyVstateless = (vstateless, node) => {
    let id = vstateless.id
    let vnode = node.cache[id]
    delete node.cache[id]
    destroyVnode(vnode, node)
}

let renderVstateless = (vstateless, parentContext) => {
    let { type: factory, props } = vstateless
    let componentContext = getContextByTypes(parentContext, factory.contextTypes)
    let vnode = factory(props, componentContext)
    if (vnode && vnode.render) {
        vnode = vnode.render()
    }
    if (vnode === null || vnode === false) {
        vnode = createVcomment(`react-empty: ${_.getUid()}`)
    } else if (!vnode || !vnode.vtype) {
        throw new Error(`@${factory.name}#render:You may have returned undefined, an array or some other invalid object`)
    }
    return vnode
}

let initVcomponent = (vcomponent, parentContext, namespaceURI) => {
    let { type: Component, props, id } = vcomponent
    let componentContext = getContextByTypes(parentContext, Component.contextTypes)
    let component = new Component(props, componentContext)
    let { $updater: updater, $cache: cache } = component
    cache.parentContext = parentContext
    updater.isPending = true
    component.props = component.props || props
    component.context = component.context || componentContext
    if (component.componentWillMount) {
        component.componentWillMount()
        component.state = updater.getState()
    }
    let vnode = renderComponent(component, parentContext)
    let node = initVnode(vnode, vnode.context, namespaceURI)
    node.cache = node.cache || {}
    node.cache[id] = component
    cache.vnode = vnode
    cache.node = node
    cache.isMounted = true
    pendingComponents.push(component)
    if (vcomponent.ref !== null) {
        attachRef(vcomponent.refs, vcomponent.ref, component)
    }
    return node
}
let updateVcomponent = (vcomponent, newVcomponent, node, parentContext) => {
    let id = vcomponent.id
    let component = node.cache[id]
    let { $updater: updater, $cache: cache } = component
    let { type: Component, props: nextProps } = newVcomponent
    let componentContext = getContextByTypes(parentContext, Component.contextTypes)
    delete node.cache[id]
    node.cache[newVcomponent.id] = component
    cache.parentContext = parentContext
    if (component.componentWillReceiveProps) {
        updater.isPending = true
        component.componentWillReceiveProps(nextProps, componentContext)
        updater.isPending = false
    }
    updater.emitUpdate(nextProps, componentContext)
    if (vcomponent.ref !== null) {
        if (newVcomponent.ref !== null) {
            attachRef(newVcomponent.refs, newVcomponent.ref, component)
        } else {
            detachRef(vcomponent.refs, vcomponent.ref)
        }
    } else {
        attachRef(newVcomponent.refs, newVcomponent.ref, component)
    }
    return cache.node
}
let destroyVcomponent = (vcomponent, node) => {
    let id = vcomponent.id
    let component = node.cache[id]
    let cache = component.$cache
    delete node.cache[id]
    if (vcomponent.ref !== null) {
        detachRef(vcomponent.refs, vcomponent.ref)
    }
    component.setState = component.forceUpdate = noop
    if (component.componentWillUnmount) {
        component.componentWillUnmount()
    }
    destroyVnode(cache.vnode, node)
    delete component.setState
    cache.isMounted = false
    cache.node = cache.parentContext = cache.vnode = component.refs = component.context = null
}

let getContextByTypes = (curContext, contextTypes) => {
	let context = {}
	if (!contextTypes || !curContext) {
		return context
	}
	for (let key in contextTypes) {
		if (contextTypes.hasOwnProperty(key)) {
			context[key] = curContext[key]
		}
	}
	return context
}

export let renderComponent = (component, parentContext) => {
    refs = component.refs
	let vnode = component.render()

    if (vnode === null || vnode === false) {
        vnode = createVcomment(`react-empty: ${_.getUid()}`)
    } else if (!vnode || !vnode.vtype) {
        throw new Error(`@${component.constructor.name}#render:You may have returned undefined, an array or some other invalid object`)
    }
    
	let curContext = refs = null
    if (component.getChildContext) {
        curContext = component.getChildContext()
    }
	if (curContext) {
		curContext = _.extend(_.extend({}, parentContext), curContext)
	} else {
		curContext = parentContext
	}
	vnode.context = curContext
	return vnode
}

let pendingComponents = []
export let clearPendingComponents = () => {
	let components = pendingComponents
	let len = components.length
	if (!len) {
		return
	}
	pendingComponents = []
    let i = -1
    while (len--) {
        let component = components[++i]
        let updater = component.$updater
        if (component.componentDidMount) {
            component.componentDidMount()
        }
        updater.isPending = false
        updater.emitUpdate()
    }
}

export function compareTwoVnodes(vnode, newVnode, node, parentContext) {
    let newNode = node

    if (newVnode == null) { // remove
        destroyVnode(vnode, node)
        node.parentNode.removeChild(node)
    } else if (vnode.type !== newVnode.type || newVnode.key !== vnode.key) {  // replace
        destroyVnode(vnode, node)
        newNode = initVnode(newVnode, parentContext, node.namespaceURI)
        node.parentNode.replaceChild(newNode, node)
    } else if (vnode !== newVnode) { 
        // same type and same key -> update
        newNode = updateVnode(vnode, newVnode, node, parentContext) 
    }
    
    return newNode
}

let getDOMNode = function() { return this }

let attachRef = (refs, refKey, refValue) => {
    if (!refs || refKey == null || !refValue) {
        return
    }
    if (refValue.nodeName && !refValue.getDOMNode) {
        // support react v0.13 style: this.refs.myInput.getDOMNode()
        refValue.getDOMNode = getDOMNode
    }
    if (_.isFn(refKey)) {
        refKey(refValue)
    } else {
        refs[refKey] = refValue
    }
}

let detachRef = (refs, refKey) => {
    if (!refs || refKey == null) {
        return
    }
    if (_.isFn(refKey)) {
        refKey(null)
    } else {
        delete refs[refKey]
    }
}