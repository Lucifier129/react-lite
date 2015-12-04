import { createStore, types, constants, mapValues } from 'refer'
import { diff, patch, create } from './virtual-dom'
import { getId, createCallbackStore, wrapNative, pipe, info, ATTR_ID } from './util'

let { isFn, isThenable, isArr, isObj, isStr, isNum } = types
let {
	GET_TABLE,
	DISPATCH,
	SHOULD_DISPATCH,
	WILL_UPDATE,
	SHOULD_UPDATE,
	DID_UPDATE,
	THROW_ERROR,
	ASYNC_START,
	ASYNC_END,
	SYNC
} = constants

let didMounts = info.didMounts = createCallbackStore('didMounts')
export let clearDidMounts = didMounts.clear

let unmounts = info.unmounts = {}
let callUnmount = node => {
	let id = node.getAttribute(ATTR_ID)
	if (id && isFn(unmounts[id])) {
		unmounts[id]()
		delete unmounts[id]
	}
}
export let callUnmounts = (nextNode, node) => {
	//if node is undefined, it would be call by removeChild
	if (!node) {
		node = nextNode
	}
	if (node.nodeType === 3) {
		return
	}
	let attr = node && node.getAttribute(ATTR_ID)
	if (!attr) {
		return
	}
	//if nextNode exist，it must be calling by replaceChild method 
	if (nextNode && nextNode.nodeName) {
		nextNode.setAttribute(ATTR_ID, attr)
		node.nextNode = nextNode
	} else {
		callUnmount(node)
	}
	let widgets = node.querySelectorAll(`[${ ATTR_ID }]`)
	Array.prototype.slice.call(widgets).forEach(callUnmount)
}
let checkUnmounts = patch => {
	let NodeProto = Node.prototype
	let resetRemove = wrapNative(NodeProto, 'removeChild', callUnmounts)
	let resetReplace = wrapNative(NodeProto, 'replaceChild', callUnmounts)
	patch()
	resetRemove()
	resetReplace()
}

export let richPatch = (node, patches) => {
	checkUnmounts(() => patch(node, patches))
	clearDidMounts()
}

let refsStore = info.refsStore = {}
let clearRefs = id => {
	if (id in refsStore) {
		delete refsStore[id]
	}
}
let getDOMNode = (refs, refKey, refValue) => {
	let selector = `[data-refid="${ refValue }"]`
	Object.defineProperty(refs, refKey, {
		get() {
			let node = document.body.querySelector(selector)
			if (node) {
				node.getDOMNode = () => node
			}
			return node
		}
	})
}

let compId
let oldCompId
let setCompId = newCompId => {
	oldCompId = compId
	compId = newCompId
}
let resetCompId = () => compId = oldCompId
export let collectRef = (refKey, refValue) => {
	if (compId == null || !refValue) {
		return
	}
	let refs = refsStore[compId] = refsStore[compId] || {}
	if (isStr(refValue)) {
		let refid = `${compId}-${refValue}`
		getDOMNode(refs, refKey, refid)
		return refid
	}
	refs[refKey] = refValue
}
let getRefs = id => refsStore[id] || {}
export let findDOMNode = node => node || node.getDOMNode()

export class Widget {
	constructor(Component, props) {
		this.type = 'Widget'
		this.Component = Component
		this.props = props
	}
	init() {
		let { props, Component } = this
		let component = this.component = new Component(props || Component.defaultProps)
		if (isStr(props.ref)) {
			collectRef(props.ref, component)
		}
		let id = component.$id = getId()
		setCompId(id)
		let vnode = component.vnode = component.render()
		let node = component.node = create(vnode)
		node.setAttribute(ATTR_ID, id)
		resetCompId()
		component.componentWillMount()
		component.refs = getRefs(id)
		info.component.amount += 1
		let willUnmount = () => {
			info.component.mounts -= 1
			info.component.unmounts += 1
			clearRefs(id)
			component.componentWillUnmount()
		}
		let didMount = () => {
			info.component.mounts += 1
			component.componentDidMount()
			if (isFn(unmounts[id])) {
				unmounts[id] = pipe(willUnmount, unmounts[id])
			} else {
				unmounts[id] = willUnmount
			}
		}
		didMounts.push(didMount)
		return node
	}
	update(previous) {
		let component = this.component = previous.component
		let { props } = this
		let { $cache } = component
		if (isStr(props.ref)) {
			collectRef(props.ref, component)
		}
		$cache.keepSilent = true
		component.componentWillReceiveProps(props)
		$cache.keepSilent = false
		let shouldUpdate = component.shouldComponentUpdate(props, component.state)
		if (!shouldUpdate) {
			return
		}
		$cache.props = props
		$cache.state = component.state
		component.forceUpdate()
	}
}

let getHook = component => {
	let { $cache } = component
	let shouldComponentUpdate = ({ nextState }) => {
		if ($cache.keepSilent) {
			return
		}
		let { props, state } = component
		let shouldUpdate = component.shouldComponentUpdate(props, nextState)
		if (!shouldUpdate) {
			return
		}
		$cache.props = props
		$cache.state = nextState
		component.forceUpdate()
	}
	return {
		[WILL_UPDATE]: shouldComponentUpdate
	}
}

let setState = nextState => state => Object.assign({}, state, nextState)

export class Component {
	constructor(props) {
		let $cache = this.$cache = {
			keepSilent: false
		}
		let handlers = [this.getHandlers(), { setState }, getHook(this)]
		let store = this.$store = createStore(handlers)
		this.dispatch = store.dispatch
		this.actions = store.actions
		this.props = props
		this.refs = {}
	}
	getDOMNode() {
		return this.node
	}
	getHandlers() {
		return {}
	}
	get state() {
		return this.$store.getState()
	}
	set state(nextState) {
		this.$store.replaceState(nextState, true)
	}
	setState(nextState, callback) {
		let { $store, state, props } = this
		if (isFn(nextState)) {
			nextState = nextState(state, props)
		}
		this.$store.dispatch('setState', nextState)
		if (isFn(callback)) {
			callback()
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		return true
	}
	componentWillUpdate(nextProps, nextState) {}
	componentDidUpdate(prevProps, prevState) {}
	componentWillReceiveProps(nextProps) {}
	componentWillMount() {}
	componentDidMount() {}
	componentWillUnmount() {}
	forceUpdate(callback) {
		let { vnode, node, $cache, state, props, $id : id } = this
		let nextProps = isObj($cache.props) ? $cache.props : props
		let nextState = isObj($cache.state) ? $cache.state : state
		$cache.props = $cache.state = null
		this.componentWillUpdate(nextProps, nextState)
		this.props = nextProps
		this.state = nextState
		setCompId(id)
		clearRefs(id)
		let nextVnode = this.render()
		let patches = diff(vnode, nextVnode)
		richPatch(node, patches)
		resetCompId()
		//update this.node, if component render new element
		if (node.nextNode) {
			this.node = node.nextNode
			node.innerHTML = ''
		}
		this.refs = getRefs(id)
		this.vnode = nextVnode
		this.componentDidUpdate(props, state)
		if (isFn(callback)) {
			callback()
		}
	}
}

let combineMixin = (proto, mixin) => {
	for (let key in mixin) {
		if (!mixin.hasOwnProperty(key)) {
			continue
		}
		let source = mixin[key]
		let currentValue = proto[key]
		if (currentValue === undefined) {
			proto[key] = source
		} else if (isFn(currentValue) && isFn(source)) {
			proto[key] = pipe(currentValue, source)
		}
	}
}
let combineMixins = (proto, mixins) => {
	mixins.forEach(mixin => combineMixin(proto, mixin))
}

let bindContext = (obj, source) => {
	for (let key in source) {
		if (source.hasOwnProperty(key) && isFn(source[key])) {
			obj[key] = source[key].bind(obj)
		}
	}
}

export let createClass = options => {
	let mixins = options.mixins || []
	let defaultProps = isFn(options.getDefaultProps) ? options.getDefaultProps() : null
	let mixinsForDefaultProps
	if (isObj(defaultProps)) {
		mixinsForDefaultProps = {
			componentWillReceiveProps(nextProps) {
				for (let key in defaultProps) {
					if (!(key in nextProps)) {
						nextProps[key] = defaultProps[key]
					}
				}
			}
		}
		mixins = mixins.concat(mixinsForDefaultProps)
	}
	let Klass = class extends Component {
		constructor(props, context) {
			super(props, context)
			bindContext(this, Klass.prototype)
			if (isObj(defaultProps)) {
				mixinsForDefaultProps.componentWillReceiveProps(props)
			}
			if (isFn(this.getInitialState)) {
				this.state = this.getInitialState()
			}
		}
	}
	combineMixins(Klass.prototype, mixins.concat(options))
	if (isObj(options.statics)) {
		Object.assign(Klass, options.statics)
	}
	return Klass
}


