import * as _ from './util'
import { VNODE_TYPE, DIFF_TYPE, SVGNamespaceURI } from './constant'
import diff from './diff'

let noop = _.noop
let refs = null

export let initTree = (vtree, parentNode, parentContext) => {
    let { vtype } = vtree
    let init = null
    if (vtype === VNODE_TYPE.ELEMENT) {
        init = initVelem
    } else if (vtype === VNODE_TYPE.TEXT) {
        init = initVtext
    } else if (vtype === VNODE_TYPE.COMPONENT) {
        init = initVcomponent
    } else if (vtype === VNODE_TYPE.STATELESS_COMPONENT) {
        init = initVstatelessComponent
    }
    return init(vtree, parentNode, parentContext)
}

export let updateTree = (vtree, newVtree, node, parentNode, parentContext) => {
    let { vtype } = vtree
    let update = null
    if (vtype === VNODE_TYPE.ELEMENT) {
        update = updateVelem
    } else if (vtype === VNODE_TYPE.TEXT) {
        update = updateVtext
    } else if (vtype === VNODE_TYPE.COMPONENT) {
        update = updateVcomponent
    } else if (vtype === VNODE_TYPE.STATELESS_COMPONENT) {
        update = updateVstatelessComponent
    }
    return update(vtree, newVtree, node, parentNode, parentContext)
}

export let destroyTree = (vtree, node) => {
    let { vtype } = vtree
    let destroy = null
    if (vtype === VNODE_TYPE.ELEMENT) {
        destroy = destroyVelem
    } else if (vtype === VNODE_TYPE.TEXT) {
        destroy = destroyVtext
    } else if (vtype === VNODE_TYPE.COMPONENT) {
        destroy = destroyVcomponent
    } else if (vtype === VNODE_TYPE.STATELESS_COMPONENT) {
        destroy = destroyVstatelessComponent
    }
    destroy(vtree, node)
}

export let createVtext = text => ({
	vtype: VNODE_TYPE.TEXT,
	text: text
})

let initVtext = (vtext, parentNode) => {
    let textNode = document.createTextNode(vtext.text)
    appendNode(parentNode, textNode)
    return textNode
}

let updateVtext = (vtext, newVtext, textNode) => {
	if (newVtext.text !== vtext.text) {
		textNode.replaceData(0, textNode.length, newVtext.text)
	}
	return textNode
}

let destroyVtext = textNode => {
	removeNode(textNode)
}

export let createVelem = (type, props) => ({
	vtype: VNODE_TYPE.ELEMENT,
	type: type,
	props: props,
    refs: refs
})

let initVelem = (velem, parentNode, parentContext) => {
    let { type, props } = velem
    let node
    if (type === 'svg' || parentNode.namespaceURI === SVGNamespaceURI) {
        node = document.createElementNS(SVGNamespaceURI, type)
    } else {
        node = document.createElement(type)
    }
    let children = props.children = getFlattenChildren(props.children, getVnode)
    if (children) {
        var len = children.length
        var i = -1
        while (len--) {
            initTree(children[++i], node, parentContext)
        }
    }
    _.setProps(node, props)
    appendNode(parentNode, node)
    attachRef(velem, node)
    return node
}

let updateVelem = (velem, newVelem, node, parentNode, parentContext) => {
    let { props } = velem
    let newProps = newVelem.props
    let oldHtml = props.dangerouslySetInnerHTML && props.dangerouslySetInnerHTML.__html
    let children = props.children
    if (oldHtml == null && children) {
        var childNodes = node.childNodes
        var newChildren = newProps.children = getFlattenChildren(newProps.children, getVnode)
        if (newChildren) {
            var len = newChildren.length
            var i = -1
            while (len--) {
                var newVchild = newChildren[++i]
                var vchild = children[i]
                if (vchild) {
                    compareTwoTrees(vchild, newVchild, childNodes[i], node, parentContext)
                } else {
                    initTree(newVchild, node, parentContext)
                }
            }
        }
        var childrenLen = children.length
        var newChildrenLen = newChildren && newChildren.length || 0
        
        // destroy old children not in the newChildren
        while (childrenLen > newChildrenLen) {
            childrenLen -= 1
            destroyTree(children[childrenLen], childNodes[childrenLen])
        }
        _.patchProps(node, props, newProps)
    } else {
        // should patch props first, make sure innerHTML was cleared 
        _.patchProps(node, props, newProps)
        var newChildren = newProps.children = getFlattenChildren(newProps.children, getVnode)
        if (newChildren) {
            var len = newChildren.length
            var i = -1
            while (len--) {
                initTree(newChildren[++i], node, parentContext)
            }
        }
    }
    updateRef(velem, newVelem, node)
    return node
}

let destroyVelem = (velem, node) => {
    let { children } = velem.props
    if (children) {
        var childNodes = node.childNodes
        var $removeNode = removeNode
        removeNode = noop
        var len = children.length
        var i = -1
        while (len--) {
            destroyTree(children[++i], childNodes[i])
        }
        removeNode = $removeNode
    }
    detachRef(velem)
    removeNode(node)
}

let getFlattenChildren = (children, iteratee) => {
    if (_.isArr(children)) {
        return _.flattenChildren(children, iteratee)
    } else if (!_.isUndefined(children) && !_.isBln(children)) {
        return [iteratee(children, 0)]
    }
}

export let createVstatelessComponent = (type, props) => ({
	id: _.getUid(),
	vtype: VNODE_TYPE.STATELESS_COMPONENT,
	type: type,
	props: props
})

let initVstatelessComponent = (vstatelessComponent, parentNode, parentContext) => {
	let vtree = renderVstatelessComponent(vstatelessComponent, parentContext)
	let node = initTree(vtree, parentNode, parentContext)
	node.cache = node.cache || {}
	node.cache[vstatelessComponent.id] = vtree
	return node
}

let updateVstatelessComponent = (vstatelessComponent, newVstatelessComponent, node, parentNode, parentContext) => {
    let id = vstatelessComponent.id
    let vtree = node.cache[id]
    delete node.cache[id]
    let newVtree = renderVstatelessComponent(newVstatelessComponent, parentContext)
    let newNode = compareTwoTrees(vtree, newVtree, node, parentNode, parentContext)
    newNode.cache = newNode.cache || {}
    newNode.cache[newVstatelessComponent.id] = newVtree
    if (newNode !== node) {
        _.extend(newNode.cache, node.cache)
    }
    return newNode
}

let destroyVstatelessComponent = (vstatelessComponent, node) => {
    let id = vstatelessComponent.id
    let vtree = node.cache[id]
    delete node.cache[id]
    destroyTree(vtree, node)
}

let renderVstatelessComponent = (vstatelessComponent, parentContext) => {
    let { type: factory, props } = vstatelessComponent
    let componentContext = getContextByTypes(parentContext, factory.contextTypes)
    let vtree = factory(props, componentContext)
    if (vtree && vtree.render) {
        vtree = vtree.render()
    }
    return getVnode(vtree)
}

export let createVcomponent = (type, props) => ({
	id: _.getUid(),
	vtype: VNODE_TYPE.COMPONENT,
	type: type,
	props: props,
    refs: refs
})

let initVcomponent = (vcomponent, parentNode, parentContext) => {
    let { type: Component, props, id } = vcomponent
    let componentContext = getContextByTypes(parentContext, Component.contextTypes)
    let component = new Component(props, componentContext)
    let { $updater: updater, $cache: cache } = component
    cache.parentContext = parentContext
    updater.isPending = true
    component.props = component.props || props
    if (component.componentWillMount) {
        component.componentWillMount()
        component.state = updater.getState()
    }
    let vtree = renderComponent(component, parentContext)
    let node = initTree(vtree, parentNode, vtree.context)
    node.cache = node.cache || {}
    node.cache[id] = component
    cache.vtree = vtree
    cache.node = node
    cache.isMounted = true
    pendingComponents.push(component)
    attachRef(vcomponent, component)
    return node
}

let updateVcomponent = (vcomponent, newVcomponent, node, parentNode, parentContext) => {
    let id = vcomponent.id
    let component = node.cache[id]
    let {
        $updater: updater,
        $cache: cache
    } = component
    let {
        type: Component,
        props: nextProps,
    } = newVcomponent
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
    updateRef(vcomponent, newVcomponent, component)
    return cache.node
}

let destroyVcomponent = (vcomponent, node) => {
    let id = vcomponent.id
    let component = node.cache[id]
    let cache = component.$cache
    delete node.cache[id]
    detachRef(vcomponent)
    component.setState = component.forceUpdate = noop
    if (component.componentWillUnmount) {
        component.componentWillUnmount()
    }
    destroyTree(cache.vtree, node)
    delete component.setState
    cache.isMounted = false
    cache.node = cache.parentContext = cache.vtree = component.refs = component.context = null
}

export let getContextByTypes = (curContext, contextTypes) => {
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
	let vtree = component.render()
	if (_.isUndefined(vtree)) {
		throw new Error('component can not render undefined')
	}
	vtree = getVnode(vtree)
	let curContext = refs = null
    if (component.getChildContext) {
        curContext = component.getChildContext()
    }
	if (curContext) {
		curContext = _.extend(_.extend({}, parentContext), curContext)
	} else {
		curContext = parentContext
	}
	vtree.context = curContext
	return vtree
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

export function compareTwoTrees(vtree, newVtree, node, parentNode, parentContext) {
    let newNode = node
    switch (diff(vtree, newVtree)) {
        case DIFF_TYPE.UPDATE:
            newNode = updateTree(vtree, newVtree, node, parentNode, parentContext)
            break
        case DIFF_TYPE.REMOVE:
            destroyTree(vtree, node)
            break
        case DIFF_TYPE.REPLACE:
            let $removeNode = removeNode
            removeNode = noop
            destroyTree(vtree, node)
            removeNode = $removeNode
            newNode = initTree(
            	newVtree,
                nextNode => parentNode.replaceChild(nextNode, node),
                parentContext
            )
            break
        case DIFF_TYPE.CREATE:
            newNode = initTree(newVtree, parentNode, parentContext)
            break
    }
    return newNode
}

let removeNode = node => {
	// if node.parentNode had set innerHTML, do nothing
	if (node && node.parentNode) {
		node.parentNode.removeChild(node)
	}
}
let appendNode = (parentNode, node) => {
	// for replacing node
	if (_.isFn(parentNode)) {
		parentNode(node)
	} else {
		parentNode.appendChild(node)
	}
}

let getVnode = vnode => {
	if (vnode === null) {
		vnode = createVelem('noscript', {})
	} else if (!vnode || !vnode.vtype) {
		vnode = createVtext(vnode)
	}
	return vnode
}

let getDOMNode = function() { return this }

let attachRef = (vtree, refValue) => {
    let { ref: refKey, refs, vtype } = vtree
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

let detachRef = vtree => {
    let { ref: refKey, refs } = vtree
    if (!refs || refKey == null) {
        return
    }
    if (_.isFn(refKey)) {
        refKey(null)
    } else {
        delete refs[refKey]
    }
}

let updateRef = (vtree, newVtree, refValue) => {
    if (!vtree.refs) {
        attachRef(newVtree, refValue)
        return
    }
    if (!newVtree.refs) {
        detachRef(vtree)
        return
    }
    if (vtree.refs !== newVtree.refs) {
        detachRef(vtree)
        attachRef(newVtree, refValue)
        return
    }
    let oldRef = vtree.ref
    let newRef = newVtree.ref
    if (newRef == null) {
        detachRef(vtree)
    } else if (oldRef !== newRef) {
        detachRef(vtree)
        attachRef(newVtree, refValue)
    }
}