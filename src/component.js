import * as _ from './util'
import create from './create'
import patch from './patch'

export function Component(props) {
	this.$id = _.getUid()
	this.$cache = {}
	this.props = props
	this.state = {}
	this.refs = {}
	this.updater = new Updater(this)
}


let stateUpdaterQueue = []

Component.prototype = {
	constructor: Component,
	componentWillUpdate(nextProps, nextState) {},
	componentDidUpdate(prevProps, prevState) {},
	componentWillReceiveProps(nextProps) {},
	componentWillMount() {},
	componentDidMount() {},
	componentWillUnmount() {},
	shouldComponentUpdate(nextProps, nextState) {
		return true
	},
	forceUpdate(callback) {
		let { $id, $cache, vnode, node, props, state } = this
		let nextProps = $cache.props || props
		let nextState = $cache.state || state
		$cache.props = $cache.state = null
		this.componentWillUpdate(nextProps, nextState)
		this.props = nextProps
		this.state = nextState
		let nextVnode = this.vnode = this.render()
		let newNode = this.node = patch(node, nextVnode, vnode)
		this.componentDidUpdate(props, state)
		if (_.isFn(callback)) {
			callback.call(this)
		}
	},
	setState(nextState, callback) {
		let { $id, props, state, updater } = this
		if (_.isFn(nextState)) {
			nextState = nextState.call(this, state, props)
		}
		nextState = _.extend(state, nextState)
		this.replaceState(nextState, callback)
	},
	getDOMNode() {
		return this.node
	},
	replaceState(nextState, callback) {
		let { updater } = this
		if (_.isObj(nextState)) {
			updater.addStateQueue(nextState)
			if (_.isFn(callback)) {
				updater.addCallbackQueue(callback)
			}
		}
	}
}

let isComponent = obj => _.isFn(obj) && _.isObj(obj.prototype) && ('forceUpdate' in obj.prototype)
let isStatelessComponent = obj => _.isObj(obj) && !isComponent(obj)

export getVtype = obj => {
	let vtype
	if (isComponent(obj)) {
		vtype = VNODE_TYPE.COMPONENT
	} else if (isStatelessComponent(obj)) {
		vtype = VNODE_TYPE.STATELESS_COMPONENT
	} else {
		vtype = VNODE_TYPE.ELEMENT
	}
	return vtype
}

export let mapVtree = (vnode, iteratee, parentVnode, vcontext) => {
	let { before, after } = iteratee
	if (!_.isObj(vnode)) {
		before(vnode, parentVnode, vcontext)
		after(vnode, parentVnode, vcontext)
		return
	}
	let nextVcontext = vcontext
	let vtype = vnode.vtype = getVtype(vnode.type)
	if (vtype === VNODE_TYPE.COMPONENT) {
		nextVcontext = vnode
		if (!vcontext) {
			vcontext = vnode
		}
	}
	before(vnode, parentVnode, vcontext)
	let children = []
	_.forEach([vnode.children], subVnode => {
		mapVtree(subVnode, iteratee, vnode, nextVcontext)
		children.push(subVnode)
	})
	vnode.children = children
	after(vnode, parentVnode, vcontext)
}

export let mapTwoVtree = (vnodes, iteratee, parentVnodes, vcontexts = []) => {
	let { before, after } = iteratee
	let result = before(vnodes, parentVnodes, vcontexts)
	if (result === false) {
		return
	}
	let vnode = vnodes[0]
	let newVnode = vnodes[1]
	let vtype = newVnode.vtype = getVtype(newVnode.type)
	if (vnode.vtype === VNODE_TYPE.COMPONENT) {

	}
	if (vtype === VNODE_TYPE.COMPONENT) {
		nextVcontexts = [vcontexts[0], newVnode]
	}
	let nextVcontexts = vcontexts
	let children = vnode.children
	let newChildren = []
	_.forEach([newVnode.children], (subNewVnode, index) => {
		let subVnodes = [children[index], subNewVnode]
		mapTwoVtree(subVnodes, iteratee, vnodes, nextVcontexts)
		newChildren.push(subNewVnode)
	})
	newVnode.children = newChildren
	_.forEach(children.slice(newChildren.length), subVnode => {
		mapTwoVtree([subVnode], iteratee, vnode, nextVcontexts)
	})
	after(vnodes, parentVnodes, vcontexts)
}

let createIteratee = obj => (...args) => {
	let type = obj.getType(...args)
	let fn = obj[type]
	if (_.isFn(fn)) {
		fn(...args)
	}
}

let getTypeByVnode = vnode => {
	return vnode.vtype || VNODE_TYPE.TEXT
}

let initBefore = {
	getType: getTypeByVnode,
	[VNODE_TYPE.ELEMENT]: initElement,
	[VNODE_TYPE.STATELESS_COMPONENT]: initStatelessComponent
	[VNODE_TYPE.COMPONENT]: initComponent
}

let initAfter = {
	getType: getTypeByVnode,
	[VNODE_TYPE.TEXT]: mountText,
	[VNODE_TYPE.ELEMENT]: mountElement,
	[VNODE_TYPE.STATELESS_COMPONENT]: mountStatelessComponent
	[VNODE_TYPE.COMPONENT]: mountComponent
}

let initIteratee = {
	before: createIteratee(initBefore),
	after: createIteratee(initAfter)
}

let initVtree = vtree => {
	mapVtree(vtree, initIteratee)
}

let unmountAfter = {
	getType: getTypeByVnode,
	[VNODE_TYPE.TEXT]: unmountText,
	[VNODE_TYPE.ELEMENT]: unmountElement,
	[VNODE_TYPE.STATELESS_COMPONENT]: unmountStatelessComponent
	[VNODE_TYPE.COMPONENT]: unmountComponent
}

let unmountIteratee = {
	before: createIteratee({}),
	after: createIteratee(unmountAfter)
}

let unmountVtree = vtree => {
	mapVtree(tree, unmountIteratee)
}

let unmountAfter = {
	[VNODE_TYPE.TEXT]: unmountText,
	[VNODE_TYPE.ELEMENT]: unmountElement,
	[VNODE_TYPE.STATELESS_COMPONENT]: unmountStatelessComponent
	[VNODE_TYPE.COMPONENT]: unmountComponent
}


let shouldPending = false

export let initComponent = vnode => {
	let { type: Component } = vnode
	let props = _.mergeProps(vnode.props, vnode.children, Component.defaultProps)
	let component = vnode.component = new Component(props)
	shouldPending = true
	component.componentWillMount()
	shouldPending = false
	component.vnode = component.render()
	let node = component.node = create(component.vnode)
	return node
}
export let mountComponent = (vnode, parent) => {
	let { component } = vnode
	let { node } = component
	let rootVnode = component.vnode
	parent.appendChild(node)
	rootVnode
}
export let updateComponent = (newVnode, vnode) => {
	let { component } = vnode
	newVnode.component = component

}