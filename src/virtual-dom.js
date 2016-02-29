import * as _ from './util'
import { VNODE_TYPE, DIFF_TYPE, SVGNamespaceURI } from './constant'
import diff from './diff'

let noop = _.noop
let refs = null

export let createVtext = text => ({
	vtype: VNODE_TYPE.TEXT,
	text: text,
    init: initVtext,
    update: updateVtext,
    destroy: destroyVtext
})

let initVtext = function(parentNode) {
    let textNode = document.createTextNode(this.text)
    appendNode(parentNode, textNode)
    return textNode
}

let updateVtext = function(newVtext, textNode) {
	if (newVtext.text !== this.text) {
		textNode.replaceData(0, textNode.length, newVtext.text)
	}
	return textNode
}

let destroyVtext = function(textNode) {
	removeNode(textNode)
}

export let createVelem = (type, props) => ({
	vtype: VNODE_TYPE.ELEMENT,
	type: type,
	props: props,
    refs: refs,
    init: initVelem,
    update: updateVelem,
    destroy: destroyVelem
})

let initVelem = function(parentNode, parentContext) {
    let { type, props } = this
    let node
    if (type === 'svg' || parentNode.namespaceURI === SVGNamespaceURI) {
        node = document.createElementNS(SVGNamespaceURI, type)
    } else {
        node = document.createElement(type)
    }
    let children = props.children
    
    if (_.isArr(children)) {
        children = props.children = _.flattenChildren(children, getVnode)
    } else if (children !== undefined && !_.isBln(children)) {
        children = props.children = [getVnode(children)]
    } else {
        children = props.children = undefined
    }

    if (children) {
        var len = children.length
        var i = -1
        while (len--) {
            children[++i].init(node, parentContext)
        }
    }
    _.setProps(node, props)
    appendNode(parentNode, node)
    attachRef(this, node)
    return node
}

let updateVelem = function(newVelem, node, parentNode, parentContext) {
    let { props } = this
    let newProps = newVelem.props
    let oldHtml = props.dangerouslySetInnerHTML && props.dangerouslySetInnerHTML.__html
    let children = props.children
    var newChildren = newProps.children

    if (_.isArr(newChildren)) {
        newChildren = newProps.children = _.flattenChildren(newChildren, getVnode)
    } else if (newChildren !== undefined && !_.isBln(newChildren)) {
        newChildren = newProps.children = [getVnode(newChildren)]
    } else {
        newChildren = newProps.children = undefined
    }

    if (oldHtml == null && children) {
        var childNodes = node.childNodes
        if (newChildren) {
            var len = newChildren.length
            var i = -1
            while (len--) {
                var newVchild = newChildren[++i]
                var vchild = children[i]
                if (vchild) {
                    compareTwoTrees(vchild, newVchild, childNodes[i], node, parentContext)
                } else {
                    newVchild.init(node, parentContext)
                }
            }
        }
        var childrenLen = children.length
        var newChildrenLen = newChildren && newChildren.length || 0
        
        // destroy old children not in the newChildren
        while (childrenLen > newChildrenLen) {
            childrenLen -= 1
            children[childrenLen].destroy(childNodes[childrenLen])
        }
        _.patchProps(node, props, newProps)
    } else {
        // should patch props first, make sure innerHTML was cleared 
        _.patchProps(node, props, newProps)
        if (newChildren) {
            var len = newChildren.length
            var i = -1
            while (len--) {
                newChildren[++i].init(node, parentContext)
            }
        }
    }
    updateRef(this, newVelem, node)
    return node
}

let destroyVelem = function(node) {
    let { children } = this.props
    if (children) {
        var childNodes = node.childNodes
        var $removeNode = removeNode
        removeNode = noop
        var len = children.length
        var i = -1
        while (len--) {
            children[++i].destroy(childNodes[i])
        }
        removeNode = $removeNode
    }
    detachRef(this)
    removeNode(node)
}

export let createVstatelessComponent = (type, props) => ({
	id: _.getUid(),
	vtype: VNODE_TYPE.STATELESS_COMPONENT,
	type: type,
	props: props,
    init: initVstatelessComponent,
    update: updateVstatelessComponent,
    destroy: destroyVstatelessComponent
})

let initVstatelessComponent = function(parentNode, parentContext) {
	let vtree = renderVstatelessComponent(this, parentContext)
	let node = vtree.init(parentNode, parentContext)
	node.cache = node.cache || {}
	node.cache[this.id] = vtree
	return node
}

let updateVstatelessComponent = function(newVstatelessComponent, node, parentNode, parentContext) {
    let id = this.id
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

let destroyVstatelessComponent = function(node) {
    let id = this.id
    let vtree = node.cache[id]
    delete node.cache[id]
    vtree.destroy(node)
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
    refs: refs,
    init: initVcomponent,
    update: updateVcomponent,
    destroy: destroyVcomponent
})

let initVcomponent = function(parentNode, parentContext) {
    let { type: Component, props, id } = this
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
    let node = vtree.init(parentNode, vtree.context)
    node.cache = node.cache || {}
    node.cache[id] = component
    cache.vtree = vtree
    cache.node = node
    cache.isMounted = true
    pendingComponents.push(component)
    attachRef(this, component)
    return node
}

let updateVcomponent = function(newVcomponent, node, parentNode, parentContext) {
    let id = this.id
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
    updateRef(this, newVcomponent, component)
    return cache.node
}

let destroyVcomponent = function(node) {
    let id = this.id
    let component = node.cache[id]
    let cache = component.$cache
    delete node.cache[id]
    detachRef(this)
    component.setState = component.forceUpdate = noop
    if (component.componentWillUnmount) {
        component.componentWillUnmount()
    }
    cache.vtree.destroy(node)
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
    let diffType = diff(vtree, newVtree)

    if (diffType === DIFF_TYPE.UPDATE) {
        newNode = vtree.update(newVtree, node, parentNode, parentContext)
    } else if (diffType === DIFF_TYPE.REMOVE) {
        vtree.destroy(node)
    } else if (diffType === DIFF_TYPE.REPLACE) {
        let $removeNode = removeNode
        removeNode = noop
        vtree.destroy(node)
        removeNode = $removeNode
        newNode = newVtree.init(
            nextNode => parentNode.replaceChild(nextNode, node),
            parentContext
        )
    } else if (diffType === DIFF_TYPE.CREATE) {
        newNode = newVtree.init(parentNode, parentContext)
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