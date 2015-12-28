import * as _ from './util'
import { renderComponent  } from './virtual-dom'


function Updater(instant) {
	this.instant = instant
	this.pendingStates = []
	this.pendingCallbacks = []
	this.isPending = false
}

Updater.prototype = {
	constructor: Updater,
	emitUpdate(nextProps) {
		let { instant, pendingStates, pendingCallbacks } = this
		if (nextProps || pendingStates.length > 0) {
			let props = nextProps || instant.props
			shouldUpdate(instant, props, this.getState(), this.clearCallbacks.bind(this))
		}
	},
	addState(nextState) {
		if (nextState) {
			this.pendingStates.push(nextState)
			if (!this.isPending) {
				this.emitUpdate()
			}
		}
	},
	replaceState(nextState) {
		let { pendingStates } = this
		pendingStates.pop()
		pendingStates.push([nextState])
	},
	getState() {
		let { instant, pendingStates } = this
		let { state, props } = instant
		let merge = nextState => {
			// replace state
			if (_.isArr(nextState)) {
				state = null
				return merge(nextState[0])
			}
			if (_.isFn(nextState)) {
				nextState = nextState.call(instant, state, props)
			}
			state = _.extend({}, state, nextState)
		}
		_.eachItem(pendingStates, merge)
		pendingStates.length = 0
		return state
	},
	clearCallbacks() {
		let { pendingCallbacks, instant } = this
		if (pendingCallbacks.length > 0) {
			_.eachItem(pendingCallbacks, callback => callback.call(instant))
			pendingCallbacks.length = 0
		}
	},
	addCallback(callback) {
		if (_.isFn(callback)) {
			this.pendingCallbacks.push(callback)
		}
	}
}

export default function Component(props) {
	this.$updater = new Updater(this)
	this.$cache = { isMounted: false }
	this.props = props
	this.state = {}
	this.refs = {}
}

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
		let { $cache, props, state, vtree, node, refs } = this
		let nextProps = $cache.props || props
		let nextState = $cache.state || state
		$cache.props = $cache.state = null
		this.componentWillUpdate(nextProps, nextState)
		this.props = nextProps
		this.state = nextState
		let nextVtree = renderComponent(this)
		vtree.updateTree(nextVtree, node && node.parentNode)
		this.vtree = nextVtree
		this.componentDidUpdate(props, state)
		if (_.isFn(callback)) {
			callback.call(this)
		}
	},
	setState(nextState, callback) {
		let { $updater } = this
		$updater.addCallback(callback)
		$updater.addState(nextState)
	},
	replaceState(nextState, callback) {
		let { $updater } = this
		$updater.addCallback(callback)
		$updater.replaceState(nextState)
	},
	getDOMNode() {
		let node = this.vtree.node
		return node.tagName === 'NOSCRIPT' ? null : node
	},
	isMounted() {
		return this.$cache.isMounted
	}
}

export let updatePropsAndState = (component, props, state) => {
	component.state = state
	component.props = props
}

export let shouldUpdate = (component, nextProps, nextState, callback) => {
	let shouldUpdate = component.shouldComponentUpdate(nextProps, nextState)
	if (shouldUpdate === false) {
		updatePropsAndState(component, nextProps, nextState)
		return
	}
	updatePropsAndState(component.$cache, nextProps, nextState)
	component.forceUpdate(callback)
}
