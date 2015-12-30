'use strict';

exports.__esModule = true;
exports['default'] = Component;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _util = require('./util');

var _ = _interopRequireWildcard(_util);

var _virtualDom = require('./virtual-dom');

function Updater(instance) {
	var _this = this;

	this.instance = instance;
	this.pendingStates = [];
	this.pendingCallbacks = [];
	this.isPending = false;
	this.bindClear = function () {
		return _this.clearCallbacks();
	};
}

Updater.prototype = {
	constructor: Updater,
	emitUpdate: function emitUpdate(nextProps, nextContext) {
		var instance = this.instance;
		var pendingStates = this.pendingStates;
		var bindClear = this.bindClear;

		if (nextProps || pendingStates.length > 0) {
			var props = nextProps || instance.props;
			shouldUpdate(instance, props, this.getState(), nextContext, bindClear);
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

function Component(props, context) {
	this.$updater = new Updater(this);
	this.$cache = { isMounted: false };
	this.props = props;
	this.state = {};
	this.refs = {};
	this.context = context || {};
}

var noop = function noop() {};
Component.prototype = {
	constructor: Component,
	getChildContext: noop,
	componentWillUpdate: noop,
	componentDidUpdate: noop,
	componentWillReceiveProps: noop,
	componentWillMount: noop,
	componentDidMount: noop,
	componentWillUnmount: noop,
	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		return true;
	},
	forceUpdate: function forceUpdate(callback) {
		var $updater = this.$updater;
		var $cache = this.$cache;
		var props = this.props;
		var state = this.state;
		var context = this.context;
		var vtree = this.vtree;
		var node = this.node;

		var nextProps = $cache.props || props;
		var nextState = $cache.state || state;
		var nextContext = $cache.context || {};
		$cache.props = $cache.state = $cache.context = null;
		this.componentWillUpdate(nextProps, nextState, nextContext);
		this.props = nextProps;
		this.state = nextState;
		this.context = nextContext;
		$updater.isPending = true;
		var nextVtree = (0, _virtualDom.renderComponent)(this, $cache.$context);
		vtree.updateTree(nextVtree, node && node.parentNode);
		$updater.isPending = false;
		this.vtree = nextVtree;
		this.node = nextVtree.node;
		this.componentDidUpdate(props, state, context);
		if (_.isFn(callback)) {
			callback.call(this);
		}
		$updater.emitUpdate();
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

var updatePropsAndState = function updatePropsAndState(component, props, state, context) {
	component.state = state;
	component.props = props;
	component.context = context || {};
};

exports.updatePropsAndState = updatePropsAndState;
var shouldUpdate = function shouldUpdate(component, nextProps, nextState, nextContext, callback) {
	var shouldComponentUpdate = component.shouldComponentUpdate(nextProps, nextState, nextContext);
	if (shouldComponentUpdate === false) {
		updatePropsAndState(component, nextProps, nextState, nextContext);
		return;
	}
	updatePropsAndState(component.$cache, nextProps, nextState, nextContext);
	component.forceUpdate(callback);
};
exports.shouldUpdate = shouldUpdate;