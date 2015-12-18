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

let getVnode = vnode => {
	if (vnode === null || vnode === false) {
		vnode = { type: 'noscript' }
	} else if (!_.isObj(vnode)) {
		vnode = { text: vnode }
	}
	return vnode
}

let eachVnode = (vnodes, iteratee) => 
	_.forEach((vnode, ...args) =>
		iteratee(getVnode(vnode), ...args))

export let setVtype = vnode => {
	let vtype
	if (isComponent(vnode)) {
		vtype = VNODE_TYPE.COMPONENT
	} else if (isStatelessComponent(vnode)) {
		vtype = VNODE_TYPE.STATELESS_COMPONENT
	} else if (isStr(vnode.type)) {
		vtype = VNODE_TYPE.ELEMENT
	} else {
		vtype = VNODE_TYPE.TEXT
	}
	vnode.vtype = vtype
	return vtype
}

export let mapVtree = (vnode, iteratee, parentVnode, vcontext) => {
	let { before, after } = iteratee
	let hasBefore = _.isFn(before)
	let hasAfter = _.isFn(after)
	let signal
	setVtype(vnode)
	if (hasBefore) {
		signal = before(vnode, parentVnode, vcontext)
	}
	if (signal === false) {
		hasAfter && after(vnode, parentVnode, vcontext)
		return
	}
	if (vnode.children && vnode.children.length > 0) {
		let children = []
		eachVnode(vnode.children, subVnode => {
			mapVtree(subVnode, iteratee, vnode, vcontext)
			children.push(subVnode)
		})
		vnode.children = children
	}
	hasAfter && after(vnode, parentVnode, vcontext)
}

export let mapTwoVtree = (vnodes, iteratee, parentVnodes, vcontext) => {
	let { before, after } = iteratee
	let hasBefore = _.isFn(before)
	let hasAfter = _.isFn(after)
	let [ vnode, newVnode ] = vnodes
	let result
	setVtype(newVnode)
	if (hasBefore) {
		result = before(vnodes, parentVnodes, vcontexts)
		if (result === false) {
			hasAfter && after(vnodes, parentVnodes, vcontexts)
			return
		}
	}
	let children = vnode.children || []
	let newChildren = []
	eachVnode(newVnode.children || [], (subNewVnode, index) => {
		let subVnodes = [children[index], subNewVnode]
		mapTwoVtree(subVnodes, iteratee, vnodes, vcontext)
		newChildren.push(subNewVnode)
	})
	newVnode.children = newChildren
	if (children.length > newChildren.length) {
		eachVnode(children.slice(newChildren.length), subVnode => {
			mapTwoVtree([subVnode], iteratee, vnode, vcontext)
		})
	}
	hasAfter && after(vnodes, parentVnodes, vcontexts)
}

let attachRef = (vnode, vcontext) => {
	let { props } = vnode
	if (vcontext && props && props.ref) {
		let refValue = vnode.vtype === VNODE_TYPE.COMPONENT ? vnode.component : vnode.node
		if (_.isFn(props.ref)) {
			props.ref(refValue)
		} else {
			let refs = vcontext.refs = vcontext.refs || {}
			refs[props.ref] = refValue
		}
	}
}

let detachRef = (vnode, vcontext) => {
	let { props } = vnode
	if (vcontext && props) {
		if (isFn(props.ref)) {
			props.ref(null)
		} else if (_.isObj(vcontext.refs)) {
			delete vcontext.refs[props.ref]
		}
	}
}

let mountText = (vnode, parentVnode) => {
	let node = vnode.node = create(vnode.text)
	if (parentVnode && parentVnode.node) {
		parentVnode.node.appendChild(node)
	}
}

let mountElement = (vnode, parentVnode, vcontext) => {
	let node = vnode.node = create(vnode)
	if (parentVnode && parentVnode.node) {
		parentVnode.node.appendChild(node)
	}
	attachRef(vnode, vcontext)
}

let mountStatelessComponent = (vnode, parentVnode, vcontext) => {
	let { type: StatelessComponent } = vnode
	let props = _.mergeProps(vnode.props, vnode.children, StatelessComponent.defaultProps)
	let content = vnode.content = StatelessComponent(props)
	initVtree(content, parentVnode)
	return false
}

let mountComponent = (vnode, parentVnode, vcontext) => {
	let { type: Component } = vnode
	let props = _.mergeProps(vnode.props, vnode.children, Component.defaultProps)
	let component = vnode.component = new Component(props)
	props = component.props = component.props || props
	component.componentWillMount()
	component.vnode = component.render()
	initVtree(component.vnode, parentVnode, component)
	component.componentDidMount()
	attachRef(vnode, vcontext)
	return false
}

let unmountElement = (vnode, _, vcontext) => {
	detachRef(vnode, vcontext)
}

let UnmountComponent = (vnode, parentVnode, vcontext) => {
	let { component } = vnode
	let nil = null
	unmountVtree(component.vnode, parentVnode, component)
	component.componentWillMount()
	detachRef(component, vcontext)
	component.refs = nil
	component.state = nil
	component.props = nil
	component.node = nil
	component.vnode = nil
	component.$cache = nil
}

let unmountStatelessComponent = (vnode, parentVnode) => {
	unmountVtree(vnode.content, parentVnode)
}

let updateText = (vnodes) => {
	let [vnode, newVnode] = vnodes
	deliverByType(vnode, newVnode)
	if (vnode.text === newVnode.text) {
		return
	}
	let textNode = vnode.node
	textNode.replaceData(0, textNode.length, newVnode.text)
}

let updateElement = (vnodes, parentVnodes, vcontext) => {
	let [vnode, newVnode] = vnodes
	deliverByType(vnode, newVnode)
	if (newVnode.props === vnode.props) {
		return
	}
	let node = vnode.node
	if (!vnode.props) {
		_.setProps(newVnode.props)
	} else if (!newVnode.props) {
		_.removeProps(vnode.props)
	} else {
		_.patchProps(vnode.props, newVnode.props)
	}
}

let deliverByType = (vnode, newVnode) => {
	if (!newVnode) {
		return
	}
	switch (vnode && vnode.vtype) {
		case VNODE_TYPE.ELEMENT:
		case VNODE_TYPE.TEXT:
			newVnode.node = vnode.node
			vnode.node = null
			break
		case VNODE_TYPE.STATELESS_COMPONENT:
			newVnode.content = vnode.content
			vnode.content = null
			break
		case VNODE_TYPE.COMPONENT:
			newVnode.component = vnode.component
			vnode.component = null
			break
	}
}

let willCreate = (vnodes, parentVnodes, vcontext) => {
	let newVnode = vnodes[1]
	let [parentVnode, newParentVnode] = parentVnodes
	deliverByType(parentVnode, newParentVnode)
	initVtree(newVnode, newParentVnode, vcontext)
}

let willRemove = (vnodes, parentVnodes, vcontext) => {
	let vnode = vnodes[0]
	let [parentVnode, newParentVnode] = parentVnodes
	deliverByType(parentVnode, newParentVnode)
	unmountVtree(vnode, parentVnode, vcontext)
	parentVnode.node.removeChild(vnode.node)
}

let willReplace = (vnodes, parentVnodes, vcontext) => {
	let [vnode, newVnode] = vnodes
	let [parentVnode, newParentVnode] = parentVnodes
	unmountVtree(vnode, parentVnode, vcontext)
	initVtree(newVnode, newParentVnode, vcontext)
	parentVnode.node.replaceChild(newVnode.node, vnode.node)
	deliverByType(parentVnode, newParentVnode)
}

let willUpdate = (vnodes, parentVnodes, vcontext) => {
	let [vnode, newVnode] = vnodes
	let [parentVnode, newParentVnode] = parentVnodes
	deliverByType(parentVnode, newParentVnode)

}


let createMatcher = source => (...args) => {
	let type = source.getType(...args)
	let fn = source[type]
	if (_.isFn(fn)) {
		return fn(...args)
	}
}

let getTypeByVnode = vnode => vnode.vtype || VNODE_TYPE.TEXT

let initBefore = {
	getType: getTypeByVnode,
	[VNODE_TYPE.TEXT]: mountText,
	[VNODE_TYPE.ELEMENT]: mountElement,
	[VNODE_TYPE.STATELESS_COMPONENT]: mountStatelessComponent,
	[VNODE_TYPE.COMPONENT]: mountComponent
}

let initIteratee = {
	before: createMatcher(initBefore)
}

let initVtree = (vtree, parentVnode, vcontext) => {
	mapVtree(vtree, initIteratee, parentVnode, vcontext)
}

let IGNORE_CHILDREN = () => false

let unmountBefore = {
	getType, getTypeByVnode,
	[VNODE_TYPE.STATELESS_COMPONENT]: IGNORE_CHILDREN
	[VNODE_TYPE.COMPONENT]: IGNORE_CHILDREN
}

let unmountAfter = {
	getType: getTypeByVnode,
	[VNODE_TYPE.ELEMENT]: unmountElement,
	[VNODE_TYPE.COMPONENT]: UnmountComponent,
	[VNODE_TYPE.STATELESS_COMPONENT]: unmountStatelessComponent
}

let unmountIteratee = {
	before: createMatcher(unmountBefore),
	after: createMatcher(unmountAfter)
}

let unmountVtree = (vtree, parentVnode, vcontext) => {
	mapVtree(vtree, unmountIteratee, parentVnode, vcontext)
}

let getTypeByVnodes = ([vnode, newVnode]) => diff(vnode, newVnode)

let updateBefore = {
	getType: getTypeByVnode,
	[DIFF_TYPE.CREATE]: willCreate,
	[DIFF_TYPE.REMOVE]: willRemove,
	[DIFF_TYPE.REPLACE]: willReplace
	[DIFF_TYPE.UPDATE]: willUpdate
}

let updateAfter = {
	getType: getTypeByVnode,
	[DIFF_TYPE.CREATE]: didCreate,
	[DIFF_TYPE.REMOVE]: didRemove,
	[DIFF_TYPE.REPLACE]: didReplace
	[DIFF_TYPE.UPDATE]: didUpdate
}

let updateIteratee = {
	before: createMatcher(updateBefore),
	after: createMatcher(updateAfter)
}

let updateVtree = (vtrees, parentVnodes, vcontext) => {
	mapTwoVtree(vtrees, updateIteratee, parentVnodes, vcontext)
}
