import * as _ from './util'
import { getVnode } from './virtual-dom'

export function Component(props) {
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
		let { $cache, props, state } = this
		let nextProps = $cache.props || props
		let nextState = $cache.state || state
		$cache.props = $cache.state = null
		this.componentWillUpdate(nextProps, nextState)
		this.props = nextProps
		this.state = nextState
		let nextVtree = getVnode(this.render())
		this.vtree.updateTree(nextVtree, null, this)
		this.vtree = nextVtree
		this.componentDidUpdate(props, state)
		if (_.isFn(callback)) {
			callback.call(this)
		}
	},
	setState(nextState, callback) {
		let { props, state } = this
		if (_.isFn(nextState)) {
			nextState = nextState.call(this, state, props)
		}
		nextState = _.extend(state, nextState)
		shouldUpdate(this, props, nextState, callback)
	},
	getDOMNode() {
		let node = this.vtree.node
		return node.tagName === 'NOSCRIPT' ? null : node
	},
	replaceState(nextState, callback) {
		if (!_.isObj(nextState)) {
			return
		}
		shouldUpdate(this, this.props, nextState, callback)
	}
}

export let shouldUpdate = (component, nextProps, nextState, callback) => {
	let shouldUpdate = component.shouldComponentUpdate(nextProps, nextState)
	if (shouldUpdate === false) {
		component.props = nextProps
		component.state = nextState
		return
	}
	let { $cache } = component
	$cache.props = nextProps
	$cache.state = nextState
	component.forceUpdate(callback)
}
