import * as _ from './util'
import { getVnode, bindRefs } from './virtual-dom'


function Updater(instant) {
	this.instant = instant
	this.pendingState = null
	this.pendingCallback = null
	this.isPendingForceUpdate = false
}

Updater.prototype = {
	constructor: Updater,
	emitUpdate(nextProps) {
		let { instant, pendingState, pendingCallback } = this
		if (nextProps || pendingState) {
			let props = nextProps || instant.props
			let state = pendingState || instant.state
			shouldUpdate(instant, props, state, pendingCallback)
		}
		this.pendingState = null
		this.pendingCallback = null
	},
	addState(nextState) {
		if (nextState) {
			this.pendingState = nextState
			if (this.isPendingForceUpdate === false) {
				this.emitUpdate()
			}
		}
	},
	addCallback(callback) {
		if (_.isFn(callback)) {
			this.pendingCallback = callback
		}
	}
}

export default function Component(props) {
	this.$updater = new Updater(this)
	this.$cache = {}
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
		let nextVtree = getVnode(this.render())
		vtree.updateTree(nextVtree, node && node.parentNode)
		this.vtree = nextVtree
		this.componentDidUpdate(props, state)
		if (_.isFn(callback)) {
			callback.call(this)
		}
	},
	setState(nextState, callback) {
		let { props, state, $updater } = this
		if (_.isFn(nextState)) {
			nextState = nextState.call(this, state, props)
		}
		if (_.isObj(nextState)) {
			nextState = _.extend({}, state, nextState)
		}
		$updater.addCallback(callback)
		$updater.addState(nextState)
	},
	getDOMNode() {
		let node = this.vtree.node
		return node.tagName === 'NOSCRIPT' ? null : node
	},
	replaceState(nextState, callback) {
		if (!_.isObj(nextState)) {
			return
		}
		let { $updater } = this
		$updater.addCallback(callback)
		$updater.addState(nextState)
	}
}

export let updatePropsAndState = (component, props, state) => {
	component.state = state
	component.props = props
}

export let shouldUpdate = (component, nextProps, nextState, callback) => {
	let { $cache } = component
	let shouldUpdate = component.shouldComponentUpdate(nextProps, nextState)
	if (shouldUpdate === false) {
		updatePropsAndState(component, nextProps, nextState)
		return
	}
	updatePropsAndState(component.$cache, nextProps, nextState)
	component.forceUpdate(callback)
}
