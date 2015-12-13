import create from './create'
import diff from './diff'
import patch from './patch'
import {
	COMPONENT_ID,
	DID_MOUNT,
	WILL_UNMOUNT
} from './constant'
import {
	getUid,
	isFn,
	isArr,
	isObj,
	isStr,
	toArray,
	isUndefined,
	pipe,
	$on,
	$triggerOnce,
	nextFrame,
	setAttr,
	getAttr,
	querySelectorAll,
	setComponentId,
	resetComponentId,
	getRefs,
	collectRef
} from 'util'

export function Component(props) {
	this.$cache = {
		keepSilent: false
	}
	this.props = props
	this.state = {}
	this.refs = {}
}

Component.prototype = {
	constructor: Component,
	getDOMNode() {
		return this.node
	},
	setState(nextState, callback) {
		let { $cache, state, props, node } = this
		if (isFn(nextState)) {
			nextState = nextState(state, props)
		}
		let { keepSilent } = $cache
		nextState = { ...this.state, ...nextState }
		if (keepSilent) {
			$cache.nextState = nextState
			return
		}
		let shouldUpdate = this.shouldComponentUpdate(nextState, props)
		this.state = nextState
		if (shouldUpdate === false) {
			return
		}
		this.forceUpdate(callback)
	},
	shouldComponentUpdate(nextProps, nextState) {
		return true
	},
	componentWillUpdate(nextProps, nextState) {},
	componentDidUpdate(prevProps, prevState) {},
	componentWillReceiveProps(nextProps) {},
	componentWillMount() {},
	componentDidMount() {},
	componentWillUnmount() {},
	forceUpdate(callback) {
		let { vnode, node, $cache, state, props, $id : id } = this
		if (!node) {
			return
		}
		let nextProps = $cache.props || props
		let nextState = $cache.state || state
		$cache.props = $cache.state = null
		this.componentWillUpdate(nextProps, nextState)
		this.props = nextProps
		this.state = nextState
		setComponentId(id)
		let nextVnode = this.render()
		let patches = diff(vnode, nextVnode)
		let newNode = patch(node, patches)
		resetComponentId()
		this.refs = getRefs(id)
		// update this.node, if component render new element
		if (newNode !== node) {
			setAttr(newNode, COMPONENT_ID, id)
			this.node = newNode
		}
		this.vnode = nextVnode
		$triggerOnce(DID_MOUNT)
		this.componentDidUpdate(props, state)
		if (isFn(callback)) {
			callback()
		}
	}
}
export let findDOMNode = node => node.nodeName ? node : node.getDOMNode()

let combineMixin = (proto, mixin) => {
	Object.keys(mixin).forEach(key => {
		let source = mixin[key]
		let currentValue = proto[key]
		if (isUndefined(currentValue)) {
			proto[key] = source
		} else if (isFn(currentValue) && isFn(source)) {
			proto[key] = pipe(currentValue, source)
		}
	})
}
let combineMixins = (proto, mixins) => {
	mixins.forEach(mixin => combineMixin(proto, mixin))
}

let bindContext = (obj, source) => {
	Object.keys(source).forEach(key => {
		if (isFn(source[key])) {
			obj[key] = source[key].bind(obj)
		}
	})
}

export let createClass = options => {
	let mixins = options.mixins || []
	let defaultProps = isFn(options.getDefaultProps) ? options.getDefaultProps() : null
	let mixinsForDefaultProps
	if (isObj(defaultProps)) {
		mixinsForDefaultProps = {
			componentWillReceiveProps(nextProps) {
				Object.keys(defaultProps).forEach(key => {
					if (isUndefined(nextProps[key])) {
						nextProps[key] = defaultProps[key]
					}
				})
			}
		}
		mixins = mixins.concat(mixinsForDefaultProps)
	}
	function Klass(props) {
		Component.call(this, props)
		bindContext(this, Klass.prototype)
		if (isObj(defaultProps)) {
			mixinsForDefaultProps.componentWillReceiveProps(props)
		}
		if (isFn(this.getInitialState)) {
			this.state = this.getInitialState()
		}
	}
	Klass.prototype = Object.create(Component.prototype)
	combineMixins(Klass.prototype, mixins.concat(options))
	
	if (isObj(options.statics)) {
		Object.keys(options.statics).forEach(key => {
			Klass[key] = options.statics[key]
		})
	}
	return Klass
}

let components = {}
let removeComponent = id => {
	let component = components[id]
	if (!component) {
		return
	}
	if (isArr(component)) {
		return component.forEach(item => {
			item.componentWillUnmount()
			delete components[item.$id]
		})
	}
	component.componentWillUnmount()
	delete components[id]
}
let checkUnmount = (node, newNode) => {
	if (!node || node.nodeType === 3) {
		return
	}
	let id = getAttr(node, COMPONENT_ID)
	// if newNode is existed, it must be calling replaceChild function
	if (id && !newNode) {
		removeComponent(id)
	}
	let componentNodes = querySelectorAll(node, `[${ COMPONENT_ID }]`)
	toArray(componentNodes).forEach(child => checkUnmount(child))
}

$on(WILL_UNMOUNT, checkUnmount)

export let initComponent = (Component, props) => {
	props = { ...props, ...Component.defaultProps }
	let component = new Component(props)
	let id = component.$id = getUid()
	let { $cache } = component
	if (props.ref) {
		collectRef(props.ref, component)
	}
	$cache.keepSilent = true
	component.componentWillMount()
	$cache.keepSilent = false
	component.state = $cache.nextState || component.state
	$cache.nextState = null
	let vnode = component.vnode = component.render()
	setComponentId(id)
	let node = component.node = create(vnode)
	resetComponentId()
	component.refs = getRefs(id)
	let attr = getAttr(node, COMPONENT_ID)
	if (!attr) {
		setAttr(node, COMPONENT_ID, attr = id)
	}
	if (components[attr]) {
		if (!isArr(components[attr])) {
			components[attr] = [components[attr]]
		}
		components[attr].splice(0, 0, component)
	} else {
		components[attr] = component
	}
	$on(DID_MOUNT, () => {
		$cache.keepSilent = true
		component.componentDidMount()
		$cache.keepSilent = false
		if ($cache.nextState) {
			let nextState = $cache.nextState
			$cache.nextState = null
			nextFrame(() => {
				component.state = nextState
				component.forceUpdate()
			})
		}
	})
	return { component, node }
}

export let updateComponent = (component, props) => {
	props = { ...props, ...component.constructor.defaultProps }
	if (props.ref) {
		collectRef(props.ref, component)
	}
	let { $cache } = component
	$cache.keepSilent = true
	component.componentWillReceiveProps(props)
	$cache.keepSilent = false
	if ($cache.nextState) {
		component.state = $cache.nextState
		$cache.nextState = null
	}
	let shouldUpdate = component.shouldComponentUpdate(props, component.state)
	if (!shouldUpdate) {
		return
	}
	$cache.props = props
	$cache.state = component.state
	component.forceUpdate()
}