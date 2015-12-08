import {
	getUid,
	isFn,
	isArr,
	isObj,
	isStr,
	toArray,
	isNum,
	pipe,
	$on,
	$off,
	$trigger
} from './util'
import {
	WIDGET,
	COMPONENT_ID,
	WILL_MOUNT,
	DID_MOUNT,
	WILL_UNMOUNT
} from './constant'
import create from './create'
import diff from './diff'
import patch from './patch'

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
	let id = node.getAttribute(COMPONENT_ID)
	if (!id) {
		return
	}
	let component = components[id]
	if (!component) {
		return
	}
	// if newNode is existed, it must be calling replaceChild function
	if (!newNode) {
		removeComponent(id)
	}
	let componentNodes = node.querySelectorAll(`[${ COMPONENT_ID }]`)
	toArray(componentNodes).forEach(child => checkUnmount(child))
}

$on(WILL_UNMOUNT, checkUnmount)

export let initComponent = (Component, props) => {
	props = { ...props, ...Component.defaultProps }
	let component = new Component(props)
	let id = component.$id = getUid()
	let vnode = component.vnode = component.render()
	let node = component.node = create(vnode)
	let attr = node.getAttribute(COMPONENT_ID)
	if (!attr) {
		node.setAttribute(COMPONENT_ID, attr = id)
	}
	if (components[attr]) {
		if (!isArr(components[attr])) {
			components[attr] = [components[attr]]
		}
		components[attr].splice(0, 0, component)
	} else {
		components[attr] = component
	}
	component.componentWillMount()
	$on(DID_MOUNT, () => component.componentDidMount())
	return { component, node }
}

export let updateComponent = (component, props) => {
	props = { ...props, ...component.constructor.defaultProps }
	let { $cache } = component
	$cache.keepSilent = true
	console.log(props)
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

export class Component {
	constructor(props) {
		this.$cache = {
			keepSilent: false
		}
		this.props = props
		this.state = {}
		this.refs = {}
	}
	getDOMNode() {
		return this.node
	}
	setState(nextState, callback) {
		let { $cache, state, props } = this
		if (isFn(nextState)) {
			nextState = nextState(state, props)
		}
		this.state = { ...this.state, ...nextState }
		let forceUpdate = () => {
			this.forceUpdate()
			if (isFn(callback)) {
				callback()
			}
		}
		if (!$cache.keepSilent) {
			if (isFn(requestAnimationFrame)) {
				requestAnimationFrame(forceUpdate)
			} else {
				setTimeout(forceUpdate, 0)
			}
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
		let nextVnode = this.render()
		let patches = diff(vnode, nextVnode)
		let newNode = patch(node, patches)
		//update this.node, if component render new element
		if (newNode !== node) {
			newNode.setAttribute(COMPONENT_ID, id)
			this.node = newNode
		}
		$trigger(DID_MOUNT)
		$off(DID_MOUNT)
		this.vnode = nextVnode
		this.componentDidUpdate(props, state)
		if (isFn(callback)) {
			callback()
		}
	}
}

export let findDOMNode = node => node.nodeName ? node : node.getDOMNode()

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
		constructor(props) {
			super(props)
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
		for (let key in options.statics) {
			if (options.statics.hasOwnProperty(key)) {
				Klass[key] = options.statics[key]
			}
		}
	}
	return Klass
}
