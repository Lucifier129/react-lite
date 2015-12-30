'use strict';

exports.__esModule = true;
exports['default'] = Component;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _util = require('./util');

var _ = _interopRequireWildcard(_util);

var _virtualDom = require('./virtual-dom');

function Updater(instance) {
	this.instance = instance;
	this.pendingStates = [];
	this.pendingCallbacks = [];
	this.isPending = false;
}

Updater.prototype = {
	constructor: Updater,
	emitUpdate: function emitUpdate(nextProps) {
		var instance = this.instance;
		var pendingStates = this.pendingStates;
		var pendingCallbacks = this.pendingCallbacks;

		if (nextProps || pendingStates.length > 0) {
			var props = nextProps || instance.props;
			shouldUpdate(instance, props, this.getState(), this.clearCallbacks.bind(this));
		}
	},
	addState: function addState(nextState) {
		if (nextState) {
			this.pendingStates.push(nextState);
			if (!this.isPending) {
				this.emitUpdate();
			}
		}
	},
	replaceState: function replaceState(nextState) {
		var pendingStates = this.pendingStates;

		pendingStates.pop();
		pendingStates.push([nextState]);
	},
	getState: function getState() {
		var instance = this.instance;
		var pendingStates = this.pendingStates;
		var state = instance.state;
		var props = instance.props;

		var merge = function merge(_x) {
			var _again = true;

			_function: while (_again) {
				var nextState = _x;
				_again = false;

				// replace state
				if (_.isArr(nextState)) {
					state = null;
					_x = nextState[0];
					_again = true;
					continue _function;
				}
				if (_.isFn(nextState)) {
					nextState = nextState.call(instance, state, props);
				}
				state = _.extend({}, state, nextState);
			}
		};
		_.eachItem(pendingStates, merge);
		pendingStates.length = 0;
		return state;
	},
	clearCallbacks: function clearCallbacks() {
		var pendingCallbacks = this.pendingCallbacks;
		var instance = this.instance;

		if (pendingCallbacks.length > 0) {
			_.eachItem(pendingCallbacks, function (callback) {
				return callback.call(instance);
			});
			pendingCallbacks.length = 0;
		}
	},
	addCallback: function addCallback(callback) {
		if (_.isFn(callback)) {
			this.pendingCallbacks.push(callback);
		}
	}
};

function Component(props) {
	this.$updater = new Updater(this);
	this.$cache = { isMounted: false };
	this.props = props;
	this.state = {};
	this.refs = {};
}

Component.prototype = {
	constructor: Component,
	componentWillUpdate: function componentWillUpdate(nextProps, nextState) {},
	componentDidUpdate: function componentDidUpdate(prevProps, prevState) {},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {},
	componentWillMount: function componentWillMount() {},
	componentDidMount: function componentDidMount() {},
	componentWillUnmount: function componentWillUnmount() {},
	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		return true;
	},
	forceUpdate: function forceUpdate(callback) {
		var $cache = this.$cache;
		var props = this.props;
		var state = this.state;
		var vtree = this.vtree;
		var node = this.node;
		var refs = this.refs;

		var nextProps = $cache.props || props;
		var nextState = $cache.state || state;
		$cache.props = $cache.state = null;
		this.componentWillUpdate(nextProps, nextState);
		this.props = nextProps;
		this.state = nextState;
		var nextVtree = (0, _virtualDom.renderComponent)(this);
		vtree.updateTree(nextVtree, node && node.parentNode);
		this.vtree = nextVtree;
		this.node = nextVtree.node;
		this.componentDidUpdate(props, state);
		if (_.isFn(callback)) {
			callback.call(this);
		}
	},
	setState: function setState(nextState, callback) {
		var $updater = this.$updater;

		$updater.addCallback(callback);
		$updater.addState(nextState);
	},
	replaceState: function replaceState(nextState, callback) {
		var $updater = this.$updater;

		$updater.addCallback(callback);
		$updater.replaceState(nextState);
	},
	getDOMNode: function getDOMNode() {
		var node = this.vtree.node;
		return node.tagName === 'NOSCRIPT' ? null : node;
	},
	isMounted: function isMounted() {
		return this.$cache.isMounted;
	}
};

var updatePropsAndState = function updatePropsAndState(component, props, state) {
	component.state = state;
	component.props = props;
};

exports.updatePropsAndState = updatePropsAndState;
var shouldUpdate = function shouldUpdate(component, nextProps, nextState, callback) {
	var shouldUpdate = component.shouldComponentUpdate(nextProps, nextState);
	if (shouldUpdate === false) {
		updatePropsAndState(component, nextProps, nextState);
		return;
	}
	updatePropsAndState(component.$cache, nextProps, nextState);
	component.forceUpdate(callback);
};
exports.shouldUpdate = shouldUpdate;