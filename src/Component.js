import * as _ from './util'
import { renderComponent, clearDidMount } from './virtual-dom'

export let updateQueue = {
	updaters: [],
	isPending: false,
	add(updater) {
		/*
		 event bubbles from bottom-level to top-level
		 reverse the updater order can merge some props and state and reduce the refresh times
		 see Updater.update method below to know why
		*/
		this.updaters.splice(0, 0, updater)
	},
	batchUpdate() {
		this.isPending = true
		/*
		  each updater.update may add new updater to updateQueue
		  clear them with a loop
		*/
		while (this.updaters.length) {
			let { updaters } = this
			this.updaters = []
			_.eachItem(updaters, triggerUpdate)
		}
		this.isPending = false
	}
}
let triggerUpdate = updater => updater.update()

function Updater(instance) {
	this.instance = instance
	this.pendingStates = []
	this.pendingCallbacks = []
	this.isPending = false
	this.nextProps = this.nextContext = null
	this.bindClear = () => {
		this.clearCallbacks()
	}
}

Updater.prototype = {
	emitUpdate(nextProps, nextContext) {
		this.nextProps = nextProps
		this.nextContext = nextContext
		updateQueue.isPending
		? updateQueue.add(this)
		: this.update()
	},
	update() {
		let { instance, pendingStates, nextProps, nextContext } = this
		if (nextProps || pendingStates.length > 0) {
			nextProps = nextProps || instance.props
			nextContext = nextContext || instance.context
			this.nextProps = this.nextContext = null
			// merge the nextProps and nextState and update by one time
			shouldUpdate(instance, nextProps, this.getState(), nextContext, this.bindClear)
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
		// push special params to point out replacing state
		pendingStates.push([nextState])
	},
	getState() {
		let { instance, pendingStates } = this
		let { state, props } = instance
		let merge = nextState => {
			// replace state
			if (_.isArr(nextState)) {
				state = null
				return merge(nextState[0])
			}
			if (_.isFn(nextState)) {
				nextState = nextState.call(instance, state, props)
			}
			state = _.extend({}, state, nextState)
		}
		if (pendingStates.length) {
			_.eachItem(pendingStates, merge)
			pendingStates.length = 0
		}
		return state
	},
	clearCallbacks() {
		let { pendingCallbacks, instance } = this
		if (pendingCallbacks.length > 0) {
			_.eachItem(pendingCallbacks, callback => callback.call(instance))
			pendingCallbacks.length = 0
		}
	},
	addCallback(callback) {
		if (_.isFn(callback)) {
			this.pendingCallbacks.push(callback)
		}
	}
}

export default function Component(props, context) {
	this.$updater = new Updater(this)
	this.$cache = { isMounted: false }
	this.props = props
	this.state = {}
	this.refs = {}
	this.context = context || {}
}

let noop = _.noop
Component.prototype = {
	constructor: Component,
	getChildContext: noop,
	componentWillUpdate: noop,
	componentDidUpdate: noop,
	componentWillReceiveProps: noop,
	componentWillMount: noop,
	componentDidMount: noop,
	componentWillUnmount: noop,
	shouldComponentUpdate(nextProps, nextState) {
		return true
	},
	forceUpdate(callback) {
		let { $updater, $cache, props, state, context, vtree, node } = this
		if ($updater.isPending) { return }
		let nextProps = $cache.props || props
		let nextState = $cache.state || state
		let nextContext = $cache.context || {}
		$cache.props = $cache.state = $cache.context = null
		this.componentWillUpdate(nextProps, nextState, nextContext)
		this.props = nextProps
		this.state = nextState
		this.context = nextContext
		$updater.isPending = true
		let nextVtree = renderComponent(this, $cache.$context)
		vtree.updateTree(nextVtree, node && node.parentNode)
		clearDidMount()
		$updater.isPending = false
		this.vtree = nextVtree
		this.node = nextVtree.node
		this.componentDidUpdate(props, state, context)
		if (_.isFn(callback)) {
			callback.call(this)
		}
		$updater.emitUpdate()
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
		return node && (node.tagName === 'NOSCRIPT') ? null : node
	},
	isMounted() {
		return this.$cache.isMounted
	}
}

export let updatePropsAndState = (component, props, state, context) => {
	component.state = state
	component.props = props
	component.context = context || {}
}

export let shouldUpdate = (component, nextProps, nextState, nextContext, callback) => {
	let shouldComponentUpdate = component.shouldComponentUpdate(nextProps, nextState, nextContext)
	if (shouldComponentUpdate === false) {
		updatePropsAndState(component, nextProps, nextState, nextContext)
		return
	}
	updatePropsAndState(component.$cache, nextProps, nextState, nextContext)
	component.forceUpdate(callback)
}
