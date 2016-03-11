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
VtextPrototype.init = function() {
    return document.createTextNode(this.text)
}
VtextPrototype.update = function(newVtext, textNode) {
    if (newVtext.text !== this.text) {
        textNode.replaceData(0, textNode.length, newVtext.text)
    }
    return textNode
}
VtextPrototype.destroy = function(textNode, remove) {
    if (remove) {
        remove(textNode)
    }
}

function Vcomment(comment) {
    this.comment = comment
}

let VcommentPrototype = Vcomment.prototype
VcommentPrototype.isVdom = true
VcommentPrototype.init = function() {
    return document.createComment(this.comment)
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
VelemPrototype.initChildren = function(node, parentContext, namespaceURI) {
    let { props } = this
    let children = props.children

    if (!_.isArr(children) && children != null && !_.isBln(children)) {
        children = [children]
    }

    if (children) {
        var $children = []
        _.flattenChildren(children, vchild => {
            if (vchild == null || _.isBln(vchild)) {
                return
            }
            vchild = vchild.isVdom ? vchild : new Vtext('' + vchild)
            let childNode = vchild.init(parentContext, namespaceURI)
            node.appendChild(childNode)
            $children.push(vchild)
        })
        props.children = $children
    }
}
VelemPrototype.init = function(parentContext, namespaceURI) {
    let { type, props } = this
    let node = null
    
    if (type === 'svg' || namespaceURI === SVGNamespaceURI) {
        node = document.createElementNS(SVGNamespaceURI, type)
        namespaceURI = SVGNamespaceURI
    } else {
        node = document.createElement(type)
    }

    this.initChildren(node, parentContext, namespaceURI)
    _.setProps(node, props)

    if (this.ref !== null) {
        attachRef(this.refs, this.ref, node)
    }

    return node
}

VelemPrototype.update = function(newVelem, node, parentContext) {
    let { props } = this
    let newProps = newVelem.props
    let oldHtml = props.dangerouslySetInnerHTML && props.dangerouslySetInnerHTML.__html
    let children = props.children
    var newChildren = newProps.children
    var namespaceURI = node.namespaceURI

    if (!_.isArr(newChildren) && newChildren != null && !_.isBln(newChildren)) {
        newChildren = [newChildren]
    }

    if (oldHtml == null && children) {
        var childNodes = node.childNodes
        if (newChildren) {
            var $newChildren = []
            _.flattenChildren(newChildren, newVchild => {
                if (newVchild == null || _.isBln(newVchild)) {
                    return
                }
                newVchild = newVchild.isVdom ? newVchild : new Vtext('' + newVchild)
                let i = $newChildren.length
                let vchild = children[i]
                if (vchild) {
                    compareTwoTrees(vchild, newVchild, childNodes[i], parentContext)
                } else {
                    var newChildNode = newVchild.init(parentContext, namespaceURI)
                    node.appendChild(newChildNode)
                }
                $newChildren.push(newVchild)
            })
            newChildren = newProps.children = $newChildren
        }
        var childrenLen = children.length
        var newChildrenLen = newChildren && newChildren.length || 0
        
        // destroy old children not in the newChildren
        while (childrenLen > newChildrenLen) {
            childrenLen -= 1
            children[childrenLen].destroy(childNodes[childrenLen], removeNode)
        }
        _.patchProps(node, props, newProps)
    } else {
        // should patch props first, make sure innerHTML was cleared 
        _.patchProps(node, props, newProps)
        newVelem.initChildren(node, parentContext, namespaceURI)
    }
    if (this.ref !== null) {
        if (newVelem.ref !== null) {
            attachRef(newVelem.refs, newVelem.ref, node)
        } else {
            detachRef(this.refs, this.ref)
        }
    } else {
        attachRef(newVelem.refs, newVelem.ref, node)
    }
    return node
}
VelemPrototype.destroy = function(node, remove) {
    let { props } = this
    let { children } = props
    if (children) {
        var childNodes = node.childNodes
        var len = children.length
        var i = -1
        while (len--) {
            children[++i].destroy(childNodes[i])
        }
    }
    if (this.ref !== null) {
        detachRef(this.refs, this.ref)
    }
    if (remove) {
        remove(node)
    }
    node.eventStore = null
    for (let key in props) {
        if (_.hasOwn(props, key) && _.EVENT_KEYS.test(key)) {
            key = getEventName(key)
            if (notBubbleEvents[key] === true) {
                node[key] = null
            }
        }
    }
}

export function VstatelessComponent(type, props) {
    this.id = _.getUid()
    this.type = type
    this.props = props
}

let VstatelessComponentPrototype = VstatelessComponent.prototype
VstatelessComponentPrototype.isVdom = true
VstatelessComponentPrototype.init = function(parentContext, namespaceURI) {
    let vtree = renderVstatelessComponent(this, parentContext)
    let node = vtree.init(parentContext, namespaceURI)
    node.cache = node.cache || {}
    node.cache[this.id] = vtree
    return node
}
VstatelessComponentPrototype.update = function(newVstatelessComponent, node, parentContext) {
    let id = this.id
    let vtree = node.cache[id]
    delete node.cache[id]
    let newVtree = renderVstatelessComponent(newVstatelessComponent, parentContext)
    let newNode = compareTwoTrees(vtree, newVtree, node, parentContext)
    newNode.cache = newNode.cache || {}
    newNode.cache[newVstatelessComponent.id] = newVtree
    if (newNode !== node) {
        _.extend(newNode.cache, node.cache)
    }
    return newNode
}
VstatelessComponentPrototype.destroy = function(node, remove) {
    let id = this.id
    let vtree = node.cache[id]
    delete node.cache[id]
    vtree.destroy(node, remove)
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
VcomponentPrototype.init = function(parentContext, namespaceURI) {
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
    let node = vtree.init(vtree.context, namespaceURI)
    node.cache = node.cache || {}
    node.cache[id] = component
    cache.vtree = vtree
    cache.node = node
    cache.isMounted = true
    pendingComponents.push(component)
    if (this.ref !== null) {
        attachRef(this.refs, this.ref, component)
    }
    return node
}
VcomponentPrototype.update = function(newVcomponent, node, parentContext) {
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
    if (this.ref !== null) {
        if (newVcomponent.ref !== null) {
            attachRef(newVcomponent.refs, newVcomponent.ref, component)
        } else {
            detachRef(this.refs, this.ref)
        }
    } else {
        attachRef(newVcomponent.refs, newVcomponent.ref, component)
    }
    return cache.node
}
VcomponentPrototype.destroy = function(node, remove) {
    let id = this.id
    let component = node.cache[id]
    let cache = component.$cache
    delete node.cache[id]
    detachRef(this)
    component.setState = component.forceUpdate = noop
    if (component.componentWillUnmount) {
        component.componentWillUnmount()
    }
    cache.vtree.destroy(node, remove)
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
		if (_.hasOwn(contextTypes, key)) {
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

export function compareTwoTrees(vtree, newVtree, node, parentContext) {
    let newNode = node

    if (vtree === newVtree) { // equal
        return newNode
    } else if (newVtree === undefined) { // remove
        vtree.destroy(node)
        node.parentNode.removeChild(node)
    } else if (vtree === undefined) { // create
        newNode = newVtree.init(parentContext, node.namespaceURI)
    } else if (vtree.type !== newVtree.type || newVtree.key !== vtree.key) {  // replace
        vtree.destroy(node)
        newNode = newVtree.init(parentContext, node.namespaceURI)
        node.parentNode.replaceChild(newNode, node)
    } else { 
        // same type and same key -> update
        newNode = vtree.update(newVtree, node, parentContext) 
    }
    
    return newNode
}

let removeNode = node => {
	node.parentNode.removeChild(node)
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