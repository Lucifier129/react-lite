import * as _ from './util'
import { SVGNamespaceURI, notBubbleEvents } from './constant'
import { getEventName } from './event-system'

let noop = _.noop
let refs = null

export function Vtext(text) {
    this.text = text
}

let VtextPrototype = Vtext.prototype
VtextPrototype.isVdom = true
VtextPrototype.init = function(parentNode) {
    let textNode = document.createTextNode(this.text)
    parentNode.appendChild(textNode)
    return textNode
}
VtextPrototype.update = function(newVtext, textNode) {
    if (newVtext.text !== this.text) {
        textNode.replaceData(0, textNode.length, newVtext.text)
    }
    return textNode
}
VtextPrototype.destroy = function(textNode) {
    removeNode(textNode)
}

function Vcomment(comment) {
    this.comment = comment
}

let VcommentPrototype = Vcomment.prototype
VcommentPrototype.isVdom = true
VcommentPrototype.init = function(parentNode) {
    let commentNode = document.createComment(this.comment)
    parentNode.appendChild(commentNode)
    return commentNode
}
VcommentPrototype.update = function(newVcomment, commentNode) {
    return commentNode
}
VcommentPrototype.destroy = VtextPrototype.destroy

export function Velem(type, props) {
    this.type = type
    this.props = props
    this.refs = refs
}

let VelemPrototype = Velem.prototype
VelemPrototype.isVdom = true
VelemPrototype.init = function(parentNode, parentContext) {
    let { type, props } = this
    let node
    if (type === 'svg' || parentNode.namespaceURI === SVGNamespaceURI) {
        node = document.createElementNS(SVGNamespaceURI, type)
    } else {
        node = document.createElement(type)
    }
    let children = props.children

    if (!_.isArr(children) && children != null && !_.isBln(children)) {
        children = [children]
    }

    if (children) {
        $children = []
        _.flattenChildren(children, getVnode)
        children = props.children = $children
        $children = null
        var len = children.length
        var i = -1
        while (len--) {
            children[++i].init(node, parentContext)
        }
    }
    _.setProps(node, props)
    parentNode.appendChild(node)
    attachRef(this, node)
    return node
}
VelemPrototype.update = function(newVelem, node, parentNode, parentContext) {
    let { props } = this
    let newProps = newVelem.props
    let oldHtml = props.dangerouslySetInnerHTML && props.dangerouslySetInnerHTML.__html
    let children = props.children
    var newChildren = newProps.children

    if (!_.isArr(newChildren) && newChildren != null && !_.isBln(newChildren)) {
        newChildren = [newChildren]
    }

    if (oldHtml == null && children) {
        var childNodes = node.childNodes
        if (newChildren) {
            $children = []
            _.flattenChildren(newChildren, getVnode)
            newChildren = newProps.children = $children
            $children = null
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
            $children = []
            _.flattenChildren(newChildren, getVnode)
            newChildren = newProps.children = $children
            $children = null
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
VelemPrototype.destroy = function(node) {
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
    detachNode(node)
}

export function VstatelessComponent(type, props) {
    this.id = _.getUid()
    this.type = type
    this.props = props
}

let VstatelessComponentPrototype = VstatelessComponent.prototype
VstatelessComponentPrototype.isVdom = true
VstatelessComponentPrototype.init = function(parentNode, parentContext) {
    let vtree = renderVstatelessComponent(this, parentContext)
    let node = vtree.init(parentNode, parentContext)
    node.cache = node.cache || {}
    node.cache[this.id] = vtree
    return node
}
VstatelessComponentPrototype.update = function(newVstatelessComponent, node, parentNode, parentContext) {
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
VstatelessComponentPrototype.destroy = function(node) {
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
    if (vtree === null || vtree === false) {
        vtree = new Vcomment(`react-empty: ${_.getUid()}`)
    } else if (!vtree || !vtree.isVdom) {
        throw new Error(`@${factory.name}#render:You may have returned undefined, an array or some other invalid object`)
    }
    return vtree
}

export function Vcomponent(type, props) {
    this.id = _.getUid()
    this.type = type
    this.props = props
    this.refs = refs
}

let VcomponentPrototype = Vcomponent.prototype
VcomponentPrototype.isVdom = true
VcomponentPrototype.init = function(parentNode, parentContext) {
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
VcomponentPrototype.update = function(newVcomponent, node, parentNode, parentContext) {
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
VcomponentPrototype.destroy = function(node) {
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
	let vtree = component.render()

    if (vtree === null || vtree === false) {
        vtree = new Vcomment(`react-empty: ${_.getUid()}`)
    } else if (!vtree || !vtree.isVdom) {
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

    if (vtree === newVtree) { // equal
        return newNode
    } else if (newVtree === undefined) { // remove
        vtree.destroy(node)
    } else if (vtree === undefined) { // create
        newNode = newVtree.init(parentNode, parentContext)
    } else if (vtree.type !== newVtree.type || newVtree.key !== vtree.key) {  // replace
        // set removeNode to no-op, do not remove exist node, then replace it with new node
        let $removeNode = removeNode
        removeNode = noop
        vtree.destroy(node)
        removeNode = $removeNode
        syntheticParentNode.namespaceURI = parentNode.namespaceURI
        newNode = newVtree.init(syntheticParentNode, parentContext)
        parentNode.replaceChild(newNode, node)
    } else { 
        // same type and same key -> update
        newNode = vtree.update(newVtree, node, parentNode, parentContext) 
    }
    
    return newNode
}

let syntheticParentNode = {
    appendChild: noop
}

let removeNode = node => {
	if (node && node.parentNode) {
		node.parentNode.removeChild(node)
	}
}

let $children = null
let getVnode = vnode => {
    if (vnode != null && !_.isBln(vnode)) {
        $children.push(vnode.isVdom ? vnode : new Vtext('' + vnode))
    }
}

let detachNode = (node, props) => {
    node.eventStore = null
    for (let key in props) {
        if (props.hasOwnProperty(key) && _.EVENT_KEYS.test(key)) {
            key = getEventName(key)
            if (notBubbleEvents[key] === true) {
                node[key] = null
            }
        }
    }
}

let getDOMNode = function() { return this }

let attachRef = (vtree, refValue) => {
    let { ref: refKey, refs } = vtree
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
    if (vtree.ref !== newVtree.ref) {
        detachRef(vtree)
        attachRef(newVtree, refValue)
    }
}