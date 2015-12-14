(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["React"] = factory();
	else
		root["React"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createElement = __webpack_require__(7);

	var _createElement2 = _interopRequireDefault(_createElement);

	var _render = __webpack_require__(8);

	var _component = __webpack_require__(3);

	var check = function check() {
	  return check;
	};
	check.isRequired = check;
	var PropTypes = {
	  "array": check,
	  "bool": check,
	  "func": check,
	  "number": check,
	  "object": check,
	  "string": check,
	  "any": check,
	  "arrayOf": check,
	  "element": check,
	  "instanceOf": check,
	  "node": check,
	  "objectOf": check,
	  "oneOf": check,
	  "oneOfType": check,
	  "shape": check
	};

	var Children = {
	  only: function only(children) {
	    return children;
	  }
	};

	exports['default'] = {
	  Component: _component.Component,
	  createClass: _component.createClass,
	  Children: Children,
	  render: _render.render,
	  findDOMNode: _component.findDOMNode,
	  PropTypes: PropTypes,
	  unmountComponentAtNode: _render.unmount,
	  createElement: _createElement2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	* 常量
	*/
	'use strict';

	exports.__esModule = true;
	exports['default'] = {
		CREATE: 1,
		REMOVE: 2,
		REORDER: 3,
		REPLACE: 4,
		PROPS: 5,
		UPDATE: 6,
		DID_MOUNT: 7,
		WILL_UNMOUNT: 8,
		REF_CALLBACK: 9,
		COMPONENT_ID: 'data-liteid'
	};
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _constant = __webpack_require__(1);

	var setAttr = function setAttr(elem, key, value) {
		elem.setAttribute(key, value);
	};

	exports.setAttr = setAttr;
	var getAttr = function getAttr(elem, key) {
		return elem.getAttribute(key);
	};

	exports.getAttr = getAttr;
	var removeAttr = function removeAttr(elem, key) {
		elem.removeAttribute(key);
	};

	exports.removeAttr = removeAttr;
	var querySelectorAll = function querySelectorAll(elem, selector) {
		return elem.querySelectorAll(selector);
	};

	exports.querySelectorAll = querySelectorAll;
	var setEvent = function setEvent(elem, key, value) {
		key = key.toLowerCase();
		elem[key] = value;
		if (key === 'onchange') {
			elem.oninput = value;
			value.oninput = true;
		}
	};

	exports.setEvent = setEvent;
	var removeEvent = function removeEvent(elem, key) {
		key = key.toLowerCase();
		elem[key] = null;
		if (key === 'onchange') {
			elem.oninput = null;
		}
	};

	exports.removeEvent = removeEvent;
	var toArray = Array.from || function (obj) {
		return Array.prototype.slice.call(obj);
	};

	exports.toArray = toArray;
	//types.js
	var isType = function isType(type) {
		return function (obj) {
			return obj != null && Object.prototype.toString.call(obj) === '[object ' + type + ']';
		};
	};
	exports.isType = isType;
	var isObj = isType('Object');
	exports.isObj = isObj;
	var isStr = isType('String');
	exports.isStr = isStr;
	var isNum = isType('Number');
	exports.isNum = isNum;
	var isFn = isType('Function');
	exports.isFn = isFn;
	var isBln = isType('Boolean');
	exports.isBln = isBln;
	var isArr = Array.isArray || isType('Array');
	exports.isArr = isArr;
	var isComponent = function isComponent(obj) {
		return isFn(obj);
	};
	exports.isComponent = isComponent;
	var isComponentClass = function isComponentClass(obj) {
		return isFn(obj) && 'forceUpdate' in obj.prototype;
	};
	exports.isComponentClass = isComponentClass;
	var isUndefined = function isUndefined(obj) {
		return obj === undefined;
	};
	exports.isUndefined = isUndefined;
	var pipe = function pipe(fn1, fn2) {
		return function () {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			fn1.apply(this, args);
			return fn2.apply(this, args);
		};
	};

	exports.pipe = pipe;
	var getUid = function getUid() {
		return Math.random().toString(36).substr(2);
	};

	exports.getUid = getUid;
	var mergeProps = function mergeProps(props, children) {
		if (children && children.length) {
			children = children.length === 1 ? children[0] : children;
			if (props) {
				props.children = children;
			} else {
				props = { children: children };
			}
		}
		return props;
	};

	exports.mergeProps = mergeProps;
	var mapChildren = function mapChildren(children, callback) {
		var record = arguments.length <= 2 || arguments[2] === undefined ? { index: 0, store: [] } : arguments[2];
		var store = record.store;

		children.forEach(function (child) {
			if (isArr(child)) {
				mapChildren(child, callback, record);
			} else if (!isBln(child)) {
				store.push(child);
				callback(child, record.index);
				record.index += 1;
			}
		});
		return store;
	};

	exports.mapChildren = mapChildren;
	var hasKey = function hasKey(obj) {
		return obj && obj.props && obj.props.key;
	};

	exports.hasKey = hasKey;
	var $events = {};

	var $on = function $on(name, callback) {
		var method = arguments.length <= 2 || arguments[2] === undefined ? 'push' : arguments[2];

		var events = $events[name] = $events[name] || [];
		events[method](callback);
	};

	exports.$on = $on;
	var $trigger = function $trigger(name) {
		for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
			args[_key2 - 1] = arguments[_key2];
		}

		if (isArr($events[name])) {
			$events[name].forEach(function (callback) {
				return callback.apply(undefined, args);
			});
		}
	};

	exports.$trigger = $trigger;
	var $triggerOnce = function $triggerOnce(name) {
		for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
			args[_key3 - 1] = arguments[_key3];
		}

		var events = $events[name];
		$events[name] = [];
		if (isArr(events)) {
			events.forEach(function (callback) {
				return callback.apply(undefined, args);
			});
		}
	};

	exports.$triggerOnce = $triggerOnce;
	var componentId = undefined;
	var $componentId = undefined;
	var setComponentId = function setComponentId(id) {
		$componentId = componentId;
		componentId = id;
	};
	exports.setComponentId = setComponentId;
	var resetComponentId = function resetComponentId() {
		componentId = $componentId;
	};

	exports.resetComponentId = resetComponentId;
	var refsStore = {};
	var getDOMNode = function getDOMNode() {
		return this;
	};
	var getRefs = function getRefs(id) {
		var refs = refsStore[id] || {};
		refsStore[id] = {};
		return refs;
	};
	exports.getRefs = getRefs;
	var collectRef = function collectRef(key, value, oldKey) {
		if (!componentId) {
			return;
		}
		var refs = refsStore[componentId];
		if (!refs) {
			refs = refsStore[componentId] = {};
		}
		if (isFn(key)) {
			if (!refs.$$fn) {
				refs.$$fn = [];
			}
			refs.$$fn.push(key);
			if (key !== oldKey) {
				$on(_constant.REF_CALLBACK, function () {
					return key(value);
				});
			}
		}
		if (value.nodeName) {
			value.getDOMNode = getDOMNode;
		}
		refs[key] = value;
	};

	exports.collectRef = collectRef;
	var patchRefs = function patchRefs(refs, newRefs) {
		if (!refs || !refs.$$fn) {
			return;
		}
		refs.$$fn.forEach(function (fn) {
			if (!newRefs || !newRefs.$$fn || newRefs.$$fn.indexOf(fn) === -1) {
				fn(null);
			}
		});
	};

	exports.patchRefs = patchRefs;
	var appendChild = function appendChild(node, child) {
		node.appendChild(child);
	};

	exports.appendChild = appendChild;
	var removeChild = function removeChild(node, child) {
		$trigger(_constant.WILL_UNMOUNT, child);
		node.removeChild(child);
	};

	exports.removeChild = removeChild;
	var replaceChild = function replaceChild(node, newChild, child) {
		$trigger(_constant.WILL_UNMOUNT, child);
		node.replaceChild(newChild, child);
	};

	exports.replaceChild = replaceChild;
	var setProp = function setProp(elem, key, value) {
		switch (true) {
			case key === 'key':
				break;
			case key === 'ref':
				if (value) {
					collectRef(value, elem);
				}
				break;
			case key === 'style':
				setStyle(elem, value);
				break;
			case isEventKey(key):
				setEvent(elem, key, value);
				break;
			case key in elem:
				elem[key] = value;
				break;
			case key === 'dangerouslySetInnerHTML':
				if (elem.innerHTML !== value.__html) {
					elem.innerHTML = value.__html;
				}
				break;
			default:
				elem.setAttribute(key, value);
		}
	};

	exports.setProp = setProp;
	var setProps = function setProps(elem, props) {
		Object.keys(props).forEach(function (key) {
			return setProp(elem, key, props[key]);
		});
	};

	exports.setProps = setProps;
	var isEventKey = function isEventKey(key) {
		return (/^on/.test(key)
		);
	};

	exports.isEventKey = isEventKey;
	var removeProp = function removeProp(elem, key) {
		switch (true) {
			case isEventKey(key):
				removeEvent(elem, key);
				break;
			case !(key in elem):
				removeAttr(elem, key);
				break;
			case isFn(elem[key]):
				elem[key] = null;
				break;
			case isStr(elem[key]):
				elem[key] = '';
				break;
			case isBln(elem[key]):
				elem[key] = false;
				break;
			default:
				try {
					elem[key] = null;
				} catch (e) {
					//pass
				}
		}
	};

	exports.removeProp = removeProp;
	var patchProps = function patchProps(node, props, newProps) {
		if (!props && newProps) {
			return setProps(node, newProps);
		} else if (!newProps && props) {
			return Object.keys(props).each(function (key) {
				if (key === 'style') {
					removeStyle(node, props[key]);
				} else {
					removeProp(node, key);
				}
			});
		}

		for (var key in newProps) {
			if (!newProps.hasOwnProperty(key)) {
				continue;
			}
			var _newValue = newProps[key];
			if (key === 'style') {
				patchStyle(node, props.style, newProps.style);
			} else if (isUndefined(_newValue)) {
				removeProp(node, key);
			} else if (_newValue !== props[key]) {
				setProp(node, key, _newValue);
			} else if (key === 'ref') {
				collectRef(_newValue, node, props[key]);
			}
			delete props[key];
		}

		for (var key in props) {
			if (!props.hasOwnProperty(key)) {
				continue;
			}
			if (isUndefined(newValue[key])) {
				removeProp(node, key);
			}
		}
	};

	exports.patchProps = patchProps;
	var removeStyle = function removeStyle(elem, style) {
		if (!isObj(style)) {
			return;
		}
		Object.keys(style).forEach(function (key) {
			return elem.style[key] = '';
		});
	};

	exports.removeStyle = removeStyle;
	var setStyle = function setStyle(elem, style) {
		if (!isObj(style)) {
			return;
		}
		Object.keys(style).forEach(function (key) {
			setStyleValue(elem.style, key, style[key]);
		});
	};

	exports.setStyle = setStyle;
	var patchStyle = function patchStyle(elem, style, newStyle) {
		if (!newStyle && style) {
			removeStyle(elem, style);
		} else if (newStyle && !style) {
			setStyle(elem, newStyle);
		} else {
			(function () {
				var domStyle = elem.style;
				Object.keys(_extends({}, style, newStyle)).forEach(function (key) {
					var value = newStyle[key];
					if (isUndefined(value)) {
						domStyle[key] = '';
					} else if (value !== style[key]) {
						setStyleValue(domStyle, key, value);
					}
				});
			})();
		}
	};

	exports.patchStyle = patchStyle;
	var isUnitlessNumber = {
		animationIterationCount: true,
		boxFlex: true,
		boxFlexGroup: true,
		boxOrdinalGroup: true,
		columnCount: true,
		flex: true,
		flexGrow: true,
		flexPositive: true,
		flexShrink: true,
		flexNegative: true,
		flexOrder: true,
		fontWeight: true,
		lineClamp: true,
		lineHeight: true,
		opacity: true,
		order: true,
		orphans: true,
		tabSize: true,
		widows: true,
		zIndex: true,
		zoom: true,

		// SVG-related properties
		fillOpacity: true,
		stopOpacity: true,
		strokeDashoffset: true,
		strokeOpacity: true,
		strokeWidth: true
	};

	/**
	 * @param {string} prefix vendor-specific prefix, eg: Webkit
	 * @param {string} key style name, eg: transitionDuration
	 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
	 * WebkitTransitionDuration
	 */
	var prefixKey = function prefixKey(prefix, key) {
		return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	};

	/**
	 * Support style names that may come passed in prefixed by adding permutations
	 * of vendor prefixes.
	 */
	var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

	// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
	// infinite loop, because it iterates over the newly added props too.
	Object.keys(isUnitlessNumber).forEach(function (prop) {
		return prefixes.forEach(function (prefix) {
			return isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
		});
	});

	var RE_NUMBER = /^-?\d+(\.\d+)?$/;
	var setStyleValue = function setStyleValue(style, key, value) {
		if (RE_NUMBER.test(value) && !isUnitlessNumber[key]) {
			style[key] = value + 'px';
		} else {
			style[key] = value;
		}
	};
	exports.setStyleValue = setStyleValue;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.Component = Component;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _create = __webpack_require__(4);

	var _create2 = _interopRequireDefault(_create);

	var _diff = __webpack_require__(5);

	var _diff2 = _interopRequireDefault(_diff);

	var _patch = __webpack_require__(6);

	var _patch2 = _interopRequireDefault(_patch);

	var _constant = __webpack_require__(1);

	var _util = __webpack_require__(2);

	function Component(props) {
		this.$cache = {
			keepSilent: false
		};
		this.props = props;
		this.state = {};
		this.refs = {};
	}

	Component.prototype = {
		constructor: Component,
		getDOMNode: function getDOMNode() {
			return this.node;
		},
		setState: function setState(nextState, callback) {
			var $cache = this.$cache;
			var state = this.state;
			var props = this.props;
			var node = this.node;

			if (_util.isFn(nextState)) {
				nextState = nextState(state, props);
			}
			var keepSilent = $cache.keepSilent;

			nextState = _extends({}, this.state, nextState);
			if (keepSilent) {
				$cache.nextState = nextState;
				return;
			}
			var shouldUpdate = this.shouldComponentUpdate(nextState, props);
			this.state = nextState;
			if (shouldUpdate === false) {
				return;
			}
			this.forceUpdate(callback);
		},
		shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
			return true;
		},
		componentWillUpdate: function componentWillUpdate(nextProps, nextState) {},
		componentDidUpdate: function componentDidUpdate(prevProps, prevState) {},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {},
		componentWillMount: function componentWillMount() {},
		componentDidMount: function componentDidMount() {},
		componentWillUnmount: function componentWillUnmount() {},
		forceUpdate: function forceUpdate(callback) {
			var vnode = this.vnode;
			var node = this.node;
			var $cache = this.$cache;
			var state = this.state;
			var props = this.props;
			var id = this.$id;

			if (!node) {
				return;
			}
			var nextProps = $cache.props || props;
			var nextState = $cache.state || state;
			$cache.props = $cache.state = null;
			this.componentWillUpdate(nextProps, nextState);
			this.props = nextProps;
			this.state = nextState;
			_util.setComponentId(id);
			var nextVnode = this.render();
			var patches = _diff2['default'](vnode, nextVnode);
			var newNode = _patch2['default'](node, patches);
			_util.resetComponentId();
			var refs = this.refs;
			this.refs = _util.getRefs(id);
			_util.patchRefs(refs, this.refs);
			_util.$triggerOnce(_constant.REF_CALLBACK);
			// update this.node, if component render new element
			if (newNode !== node) {
				_util.setAttr(newNode, _constant.COMPONENT_ID, id);
				this.node = newNode;
			}
			this.vnode = nextVnode;
			_util.$triggerOnce(_constant.DID_MOUNT);
			this.componentDidUpdate(props, state);
			if (_util.isFn(callback)) {
				callback();
			}
		}
	};
	var findDOMNode = function findDOMNode(node) {
		return node.nodeName ? node : node.getDOMNode();
	};

	exports.findDOMNode = findDOMNode;
	var combineMixin = function combineMixin(proto, mixin) {
		Object.keys(mixin).forEach(function (key) {
			var source = mixin[key];
			var currentValue = proto[key];
			if (_util.isUndefined(currentValue)) {
				proto[key] = source;
			} else if (_util.isFn(currentValue) && _util.isFn(source)) {
				proto[key] = _util.pipe(currentValue, source);
			}
		});
	};
	var combineMixins = function combineMixins(proto, mixins) {
		mixins.forEach(function (mixin) {
			return combineMixin(proto, mixin);
		});
	};

	var bindContext = function bindContext(obj, source) {
		Object.keys(source).forEach(function (key) {
			if (_util.isFn(source[key])) {
				obj[key] = source[key].bind(obj);
			}
		});
	};

	var createClass = function createClass(options) {
		var mixins = options.mixins || [];
		var defaultProps = _util.isFn(options.getDefaultProps) ? options.getDefaultProps() : null;
		var mixinsForDefaultProps = undefined;
		if (_util.isObj(defaultProps)) {
			mixinsForDefaultProps = {
				componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
					Object.keys(defaultProps).forEach(function (key) {
						if (_util.isUndefined(nextProps[key])) {
							nextProps[key] = defaultProps[key];
						}
					});
				}
			};
			mixins = mixins.concat(mixinsForDefaultProps);
		}
		function Klass(props) {
			Component.call(this, props);
			bindContext(this, Klass.prototype);
			if (_util.isObj(defaultProps)) {
				mixinsForDefaultProps.componentWillReceiveProps(props);
			}
			if (_util.isFn(this.getInitialState)) {
				this.state = this.getInitialState();
			}
		}
		Klass.prototype = Object.create(Component.prototype);
		combineMixins(Klass.prototype, mixins.concat(options));

		if (_util.isObj(options.statics)) {
			Object.keys(options.statics).forEach(function (key) {
				Klass[key] = options.statics[key];
			});
		}
		return Klass;
	};

	exports.createClass = createClass;
	var components = {};
	var removeComponent = function removeComponent(id) {
		var component = components[id];
		if (!component) {
			return;
		}
		if (_util.isArr(component)) {
			return component.forEach(function (item) {
				item.componentWillUnmount();
				delete components[item.$id];
			});
		}
		component.componentWillUnmount();
		delete components[id];
	};
	var checkUnmount = function checkUnmount(node, newNode) {
		if (!node || node.nodeType === 3) {
			return;
		}
		var id = _util.getAttr(node, _constant.COMPONENT_ID);
		// if newNode is existed, it must be calling replaceChild function
		if (id && !newNode) {
			removeComponent(id);
		}
		var componentNodes = _util.querySelectorAll(node, '[' + _constant.COMPONENT_ID + ']');
		_util.toArray(componentNodes).forEach(function (child) {
			return checkUnmount(child);
		});
	};

	_util.$on(_constant.WILL_UNMOUNT, checkUnmount);

	var initComponent = function initComponent(Component, props) {
		props = _extends({}, props, Component.defaultProps);
		var component = new Component(props);
		if (!component.props) {
			component.props = props;
		}
		var id = component.$id = _util.getUid();
		var $cache = component.$cache;

		if (props.ref) {
			_util.collectRef(props.ref, component);
		}
		$cache.keepSilent = true;
		component.componentWillMount();
		$cache.keepSilent = false;
		component.state = $cache.nextState || component.state;
		$cache.nextState = null;
		var vnode = component.vnode = component.render();
		_util.setComponentId(id);
		var node = component.node = _create2['default'](vnode);
		_util.resetComponentId();
		component.refs = _util.getRefs(id);
		_util.$triggerOnce(_constant.REF_CALLBACK);
		var attr = _util.getAttr(node, _constant.COMPONENT_ID);
		if (!attr) {
			_util.setAttr(node, _constant.COMPONENT_ID, attr = id);
		}
		if (components[attr]) {
			if (!_util.isArr(components[attr])) {
				components[attr] = [components[attr]];
			}
			components[attr].splice(0, 0, component);
		} else {
			components[attr] = component;
		}
		_util.$on(_constant.DID_MOUNT, function () {
			$cache.keepSilent = true;
			component.componentDidMount();
			$cache.keepSilent = false;
			if ($cache.nextState) {
				component.state = $cache.nextState;
				$cache.nextState = null;
				var shouldUpdate = component.shouldComponentUpdate(props, component.state);
				if (!shouldUpdate) {
					return;
				}
				component.forceUpdate();
			}
		});
		return { component: component, node: node };
	};

	exports.initComponent = initComponent;
	var updateComponent = function updateComponent(component, props) {
		props = _extends({}, props, component.constructor.defaultProps);
		if (props.ref) {
			_util.collectRef(props.ref, component, component.props.ref);
		}
		var $cache = component.$cache;

		$cache.keepSilent = true;
		component.componentWillReceiveProps(props);
		$cache.keepSilent = false;
		if ($cache.nextState) {
			component.state = $cache.nextState;
			$cache.nextState = null;
		}
		var shouldUpdate = component.shouldComponentUpdate(props, component.state);
		if (!shouldUpdate) {
			return;
		}
		$cache.props = props;
		$cache.state = component.state;
		component.forceUpdate();
	};
	exports.updateComponent = updateComponent;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _component = __webpack_require__(3);

	var _util = __webpack_require__(2);

	/**
	* 根据 tagName props attrs 创建 real-dom
	*/
	var create = function create(_x) {
		var _again = true;

		_function: while (_again) {
			var vnode = _x;
			_again = false;

			if (vnode === null) {
				return document.createElement('noscript');
			}
			if (!_util.isObj(vnode)) {
				return document.createTextNode(vnode);
			}

			var tagName = vnode.tagName;
			var props = vnode.props;
			var children = vnode.children;

			if (_util.isComponent(tagName)) {
				var Component = tagName;
				props = _util.mergeProps(props, children);
				if (_util.isComponentClass(Component)) {
					var _initComponent = _component.initComponent(Component, props);

					var node = _initComponent.node;
					var component = _initComponent.component;

					vnode.component = component;
					return node;
				}
				_x = Component(props);
				_again = true;
				tagName = props = children = Component = _initComponent = node = component = undefined;
				continue _function;
			}

			var elem = document.createElement(tagName);
			if (props) {
				_util.setProps(elem, props);
			}
			if (children && children.length > 0) {
				vnode.children = _util.mapChildren(children, function (child) {
					return addChild(elem, child);
				});
			}
			return elem;
		}
	};

	exports['default'] = create;
	var addChild = function addChild(elem, child) {
		_util.appendChild(elem, create(child));
	};
	exports.addChild = addChild;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _constant = __webpack_require__(1);

	var _util = __webpack_require__(2);

	/**
	* diff vnode and newVnode
	*/
	var diff = function diff(vnode, newVnode) {
		var children = undefined;
		var type = undefined;
		switch (true) {
			case vnode === newVnode:
				return null;
			case _util.isUndefined(newVnode):
				type = _constant.REMOVE;
				break;
			case _util.isUndefined(vnode):
				type = _constant.CREATE;
				break;
			case vnode === null || newVnode === null || vnode.tagName !== newVnode.tagName:
				type = _constant.REPLACE;
				break;
			case _util.isComponentClass(vnode.tagName):
				type = _constant.UPDATE;
				break;
			case !!(vnode.props || newVnode.props):
				if (_util.hasKey(newVnode) && newVnode.props.key !== vnode.props.key) {
					type = _constant.REPLACE;
				} else {
					type = _constant.PROPS;
				}
				break;
			case !_util.isObj(vnode) && !_util.isObj(newVnode) && vnode != newVnode:
				type = _constant.REPLACE;
				break;
		}
		if (!type || type === _constant.PROPS) {
			if (vnode.props && vnode.props.dangerouslySetInnerHTML || newVnode.props && newVnode.props.dangerouslySetInnerHTML) {
				//pass
			} else {
					var childrenType = diffChildren(vnode.children, newVnode.children);
					return { type: type, vnode: vnode, newVnode: newVnode, childrenType: childrenType };
				}
		}
		return type ? { type: type, vnode: vnode, newVnode: newVnode } : null;
	};

	exports['default'] = diff;

	var diffChildren = function diffChildren(children, newChildren) {
		var childrenType = undefined;
		if (!newChildren) {
			childrenType = _constant.REMOVE;
		} else if (!children) {
			childrenType = _constant.CREATE;
		} else {
			childrenType = _constant.REPLACE;
		}
		return childrenType;
	};
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _constant = __webpack_require__(1);

	var _create = __webpack_require__(4);

	var _create2 = _interopRequireDefault(_create);

	var _component = __webpack_require__(3);

	var _diff = __webpack_require__(5);

	var _diff2 = _interopRequireDefault(_diff);

	var _util = __webpack_require__(2);

	/**
	* patch dom
	*/
	var patch = function patch(node, patches, parent) {
		if (!patches) {
			return node;
		}
		var vnode = patches.vnode;
		var newVnode = patches.newVnode;
		var type = patches.type;
		var childrenType = patches.childrenType;

		var newNode = undefined;
		parent = node ? node.parentNode : parent;
		switch (type) {
			case _constant.CREATE:
				newNode = _create2['default'](newVnode);
				_util.appendChild(parent, newNode);
				break;
			case _constant.REMOVE:
				_util.removeChild(parent, node);
				break;
			case _constant.REPLACE:
				newNode = _create2['default'](newVnode);
				_util.replaceChild(parent, newNode, node);
				break;
			case _constant.PROPS:
				_util.patchProps(node, vnode.props, newVnode.props);
				break;
			case _constant.UPDATE:
				_component.updateComponent(vnode.component, _util.mergeProps(newVnode.props, newVnode.children));
				newVnode.component = vnode.component;
				break;
		}

		switch (childrenType) {
			case _constant.REMOVE:
				while (node.firstChild) {
					_util.removeChild(node, node.firstChild);
				}
				break;
			case _constant.CREATE:
				newVnode.children = _util.mapChildren(patches.newChildren, function (child) {
					return _create.addChild(node, child);
				});
				break;
			case _constant.REPLACE:
				newVnode.children = _util.mapChildren(newVnode.children, function (newChild, i) {
					var patches = _diff2['default'](vnode.children[i], newChild);
					patch(node.childNodes[i], patches, node);
				});
				while (node.childNodes.length > newVnode.children.length) {
					_util.removeChild(node, node.lastChild);
				}
				break;
		}

		return newNode || node;
	};

	exports['default'] = patch;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	var createElement = function createElement(tagName, props) {
		for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			children[_key - 2] = arguments[_key];
		}

		var vnode = { tagName: tagName, props: props };
		if (children.length) {
			vnode.children = children;
		}
		return vnode;
	};

	exports["default"] = createElement;
	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _create = __webpack_require__(4);

	var _create2 = _interopRequireDefault(_create);

	var _diff = __webpack_require__(5);

	var _diff2 = _interopRequireDefault(_diff);

	var _patch = __webpack_require__(6);

	var _patch2 = _interopRequireDefault(_patch);

	var _util = __webpack_require__(2);

	var _constant = __webpack_require__(1);

	var store = {};
	var render = function render(vnode, container, callback) {
		var id = _util.getAttr(container, _constant.COMPONENT_ID);
		if (store.hasOwnProperty(id)) {
			var patches = _diff2['default'](store[id], vnode);
			_patch2['default'](container.firstChild, patches, container);
			store[id] = vnode;
		} else {
			var node = _create2['default'](vnode);
			_util.setAttr(container, _constant.COMPONENT_ID, id = _util.getUid());
			store[id] = vnode;
			container.innerHTML = '';
			_util.appendChild(container, node);
		}
		_util.$triggerOnce(_constant.REF_CALLBACK);
		_util.$triggerOnce(_constant.DID_MOUNT);
		if (_util.isFn(callback)) {
			callback();
		}

		if (!vnode) {
			return;
		}

		if (_util.isComponentClass(vnode.tagName)) {
			return vnode.component;
		} else if (vnode && _util.isStr(vnode.tagName)) {
			return container.firstChild;
		} else {
			return null;
		}
	};

	exports.render = render;
	var unmount = function unmount(container) {
		var id = _util.getAttr(container, _constant.COMPONENT_ID);
		if (store.hasOwnProperty(id)) {
			var firstChild = container.firstChild;
			if (firstChild) {
				_util.removeChild(container, firstChild);
			}
			delete store[id];
			return true;
		}
		return false;
	};
	exports.unmount = unmount;

/***/ }
/******/ ])
});
;