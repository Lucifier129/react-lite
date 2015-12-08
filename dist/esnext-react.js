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

	var _component = __webpack_require__(4);

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
	  unmount: _render.unmount,
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
	var CREATE = 'CREATE';
	exports.CREATE = CREATE;
	var REMOVE = 'REMOVE';
	exports.REMOVE = REMOVE;
	var REORDER = 'REORDER';
	exports.REORDER = REORDER;
	var REPLACE = 'REPLACE';
	exports.REPLACE = REPLACE;
	var INSERT = 'INSERT';
	exports.INSERT = INSERT;
	var PROPS = 'PROPS';
	exports.PROPS = PROPS;
	var WIDGET = 'WIDGET';
	exports.WIDGET = WIDGET;
	var DID_MOUNT = 'DID_MOUNT';
	exports.DID_MOUNT = DID_MOUNT;
	var WILL_UNMOUNT = 'WILL_UNMOUNT';
	exports.WILL_UNMOUNT = WILL_UNMOUNT;
	var COMPONENT_ID = 'data-esnextid';
	exports.COMPONENT_ID = COMPONENT_ID;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _constant = __webpack_require__(1);

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
	var isThenable = function isThenable(obj) {
		return obj != null && isFn(obj.then);
	};

	exports.isThenable = isThenable;
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
	var toArray = Array.from || function (obj) {
		return Array.prototype.slice.call(obj);
	};

	exports.toArray = toArray;
	var getUid = function getUid() {
		return Math.random().toString(36).substr(2);
	};

	exports.getUid = getUid;
	var $events = {};

	var $on = function $on(name, callback) {
		var events = $events[name] = $events[name] || [];
		events.push(callback);
	};

	exports.$on = $on;
	var $off = function $off(name, callback) {
		if (!isFn(callback)) {
			$events[name] = [];
			return;
		}
		var index = $events[name].indexOf(callback);
		if (index !== -1) {
			$events[name].splice(index, 1);
		}
	};

	exports.$off = $off;
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
		$trigger(_constant.WILL_MOUNT, child, newChild);
		if (newChild.nodeType === 3 && child.nodeType === 3) {
			return child.replaceData(0, child.length, newChild.textContent);
		}
		node.replaceChild(newChild, child);
	};

	exports.replaceChild = replaceChild;
	var setProp = function setProp(elem, key, value) {
		switch (true) {
			case key === 'style':
				setStyle(elem, value);
				break;
			case /^on/.test(key):
				setEvent(elem, key.toLowerCase(), value);
				break;
			case key in elem:
				elem[key] = value;
				break;
			default:
				if (key !== 'key') {
					elem.setAttribute(key, value);
				}
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
		var oldValue = elem[key];
		switch (true) {
			case isEventKey(key):
				removeEvent(elem, key);
				break;
			case isFn(oldValue):
				elem[key] = null;
				break;
			case isStr(oldValue):
				elem[key] = '';
				break;
			case isBln(oldValue):
				elem[key] = false;
				break;
			default:
				try {
					elem[key] = undefined;
					delete elem[key];
				} catch (e) {
					//pass
				}
		}
	};

	exports.removeProp = removeProp;
	var setEvent = function setEvent(elem, key, value) {
		key = key.toLowerCase();
		elem[key] = value;
		if (key === 'onchange' && !elem.oninput) {
			elem.oninput = value;
			value.oninput = true;
		}
	};

	exports.setEvent = setEvent;
	var removeEvent = function removeEvent(elem, key) {
		key = key.toLowerCase();
		if (isFn(elem[key]) && elem[key].oninput) {
			elem.oninput = null;
		}
		elem[key] = null;
	};

	exports.removeEvent = removeEvent;
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

	var _util = __webpack_require__(2);

	var _constant = __webpack_require__(1);

	var widgetElems = [];

	/**
	* 根据 tagName props attrs 创建 real-dom
	*/
	var create = function create(_x) {
		var _again = true;

		_function: while (_again) {
			var vnode = _x;
			_again = false;

			if (vnode == null) {
				return document.createElement('noscript');
			}

			if (_util.isStr(vnode) || _util.isNum(vnode)) {
				return document.createTextNode(vnode);
			}

			if (vnode.type === _constant.WIDGET) {
				return vnode.init();
			}

			var _vnode = vnode;
			var tagName = _vnode.tagName;
			var props = _vnode.props;
			var children = _vnode.children;

			if (_util.isFn(tagName)) {
				props.children = children;
				vnode = tagName(props);
				_x = vnode;
				_again = true;
				_vnode = tagName = props = children = undefined;
				continue _function;
			}

			if (tagName == null) {
				debugger;
			}
			var elem = document.createElement(tagName);
			if (_util.isObj(props)) {
				_util.setProps(elem, props);
			}
			if (children && children.length > 0) {
				children.forEach(function (child) {
					return addChild(elem, child);
				});
			}
			return elem;
		}
	};

	exports['default'] = create;
	var addChild = function addChild(elem, child) {
		if (_util.isArr(child)) {
			return child.forEach(function (item) {
				return addChild(elem, item);
			});
		}
		var childNode = create(child);
		if (childNode !== undefined) {
			_util.appendChild(elem, childNode);
		}
	};
	exports.addChild = addChild;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _util = __webpack_require__(2);

	var _constant = __webpack_require__(1);

	var _create = __webpack_require__(3);

	var _create2 = _interopRequireDefault(_create);

	var _diff = __webpack_require__(5);

	var _diff2 = _interopRequireDefault(_diff);

	var _patch = __webpack_require__(6);

	var _patch2 = _interopRequireDefault(_patch);

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
		var id = node.getAttribute(_constant.COMPONENT_ID);
		if (!id) {
			return;
		}
		var component = components[id];
		if (!component) {
			return;
		}
		// if newNode is existed, it must be calling replaceChild function
		if (!newNode) {
			removeComponent(id);
		}
		var componentNodes = node.querySelectorAll('[' + _constant.COMPONENT_ID + ']');
		_util.toArray(componentNodes).forEach(function (child) {
			return checkUnmount(child);
		});
	};

	_util.$on(_constant.WILL_UNMOUNT, checkUnmount);

	var Widget = (function () {
		function Widget(Component, props) {
			_classCallCheck(this, Widget);

			this.type = _constant.WIDGET;
			this.Component = Component;
			this.props = props;
		}

		Widget.prototype.init = function init() {
			var props = this.props;
			var Component = this.Component;

			props = _extends({}, props, Component.defaultProps);
			var component = this.component = new Component(props);
			var id = component.$id = _util.getUid();
			var vnode = component.vnode = component.render();
			var node = component.node = _create2['default'](vnode);
			var attr = node.getAttribute(_constant.COMPONENT_ID);
			if (!attr) {
				node.setAttribute(_constant.COMPONENT_ID, attr = id);
			}
			if (components[attr]) {
				if (!_util.isArr(components[attr])) {
					components[attr] = [components[attr]];
				}
				components[attr].splice(0, 0, component);
			} else {
				components[attr] = component;
			}
			component.componentWillMount();
			_util.$on(_constant.DID_MOUNT, function () {
				return component.componentDidMount();
			});
			return node;
		};

		Widget.prototype.update = function update(previous) {
			var component = this.component = previous.component;
			var props = this.props;
			var $cache = component.$cache;

			$cache.keepSilent = true;
			component.componentWillReceiveProps(props);
			$cache.keepSilent = false;
			var shouldUpdate = component.shouldComponentUpdate(props, component.state);
			if (!shouldUpdate) {
				return;
			}
			$cache.props = props;
			$cache.state = component.state;
			component.forceUpdate();
		};

		return Widget;
	})();

	exports.Widget = Widget;

	var Component = (function () {
		function Component(props) {
			_classCallCheck(this, Component);

			this.$cache = {
				keepSilent: false
			};
			this.props = props;
			this.state = {};
			this.refs = {};
		}

		Component.prototype.getDOMNode = function getDOMNode() {
			return this.node;
		};

		Component.prototype.setState = function setState(nextState, callback) {
			var _this = this;

			var $cache = this.$cache;
			var state = this.state;
			var props = this.props;

			if (_util.isFn(nextState)) {
				nextState = nextState(state, props);
			}
			this.state = _extends({}, this.state, nextState);
			var forceUpdate = function forceUpdate() {
				_this.forceUpdate();
				if (_util.isFn(callback)) {
					callback();
				}
			};
			if (!$cache.keepSilent) {
				if (_util.isFn(requestAnimationFrame)) {
					requestAnimationFrame(forceUpdate);
				} else {
					setTimeout(forceUpdate, 0);
				}
			}
		};

		Component.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
			return true;
		};

		Component.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {};

		Component.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {};

		Component.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {};

		Component.prototype.componentWillMount = function componentWillMount() {};

		Component.prototype.componentDidMount = function componentDidMount() {};

		Component.prototype.componentWillUnmount = function componentWillUnmount() {};

		Component.prototype.forceUpdate = function forceUpdate(callback) {
			var vnode = this.vnode;
			var node = this.node;
			var $cache = this.$cache;
			var state = this.state;
			var props = this.props;
			var id = this.$id;

			var nextProps = _util.isObj($cache.props) ? $cache.props : props;
			var nextState = _util.isObj($cache.state) ? $cache.state : state;
			$cache.props = $cache.state = null;
			this.componentWillUpdate(nextProps, nextState);
			this.props = nextProps;
			this.state = nextState;
			var nextVnode = this.render();
			var patches = _diff2['default'](vnode, nextVnode);
			var newNode = _patch2['default'](node, patches);
			//update this.node, if component render new element
			if (newNode !== node) {
				newNode.setAttribute(_constant.COMPONENT_ID, id);
				this.node = newNode;
			}
			_util.$trigger(_constant.DID_MOUNT);
			_util.$off(_constant.DID_MOUNT);
			this.vnode = nextVnode;
			this.componentDidUpdate(props, state);
			if (_util.isFn(callback)) {
				callback();
			}
		};

		return Component;
	})();

	exports.Component = Component;
	var findDOMNode = function findDOMNode(node) {
		return node.nodeName ? node : node.getDOMNode();
	};

	exports.findDOMNode = findDOMNode;
	var combineMixin = function combineMixin(proto, mixin) {
		for (var key in mixin) {
			if (!mixin.hasOwnProperty(key)) {
				continue;
			}
			var _source = mixin[key];
			var currentValue = proto[key];
			if (currentValue === undefined) {
				proto[key] = _source;
			} else if (_util.isFn(currentValue) && _util.isFn(_source)) {
				proto[key] = _util.pipe(currentValue, _source);
			}
		}
	};
	var combineMixins = function combineMixins(proto, mixins) {
		mixins.forEach(function (mixin) {
			return combineMixin(proto, mixin);
		});
	};

	var bindContext = function bindContext(obj, source) {
		for (var key in source) {
			if (source.hasOwnProperty(key) && _util.isFn(source[key])) {
				obj[key] = source[key].bind(obj);
			}
		}
	};

	var createClass = function createClass(options) {
		var mixins = options.mixins || [];
		var defaultProps = _util.isFn(options.getDefaultProps) ? options.getDefaultProps() : null;
		var mixinsForDefaultProps = undefined;
		if (_util.isObj(defaultProps)) {
			mixinsForDefaultProps = {
				componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
					for (var key in defaultProps) {
						if (!(key in nextProps)) {
							nextProps[key] = defaultProps[key];
						}
					}
				}
			};
			mixins = mixins.concat(mixinsForDefaultProps);
		}
		var Klass = (function (_Component) {
			_inherits(Klass, _Component);

			function Klass(props) {
				_classCallCheck(this, Klass);

				_Component.call(this, props);
				bindContext(this, Klass.prototype);
				if (_util.isObj(defaultProps)) {
					mixinsForDefaultProps.componentWillReceiveProps(props);
				}
				if (_util.isFn(this.getInitialState)) {
					this.state = this.getInitialState();
				}
			}

			return Klass;
		})(Component);
		combineMixins(Klass.prototype, mixins.concat(options));
		if (_util.isObj(options.statics)) {
			for (var key in options.statics) {
				if (options.statics.hasOwnProperty(key)) {
					Klass[key] = options.statics[key];
				}
			}
		}
		return Klass;
	};
	exports.createClass = createClass;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _util = __webpack_require__(2);

	var _constant = __webpack_require__(1);

	/**
	* diff vnode and newVnode
	*/
	var diff = function diff(vnode, newVnode) {
		var children = undefined;
		var type = undefined;
		switch (true) {
			case vnode === newVnode:
				return;
			case newVnode == null:
				type = _constant.REMOVE;
				break;
			case vnode == null:
				type = _constant.CREATE;
				break;
			case vnode.tagName !== newVnode.tagName:
				type = _constant.REPLACE;
				break;
			case vnode.type === _constant.WIDGET && newVnode.type === _constant.WIDGET:
				type = _constant.WIDGET;
				break;
			case vnode.type === _constant.WIDGET || newVnode.type === _constant.WIDGET:
				type = _constant.REPLACE;
				break;
			case !!(vnode.props || newVnode.props):
				if (newVnode.props && newVnode.props.key && newVnode.props.key !== vnode.props.key) {
					type = _constant.REPLACE;
				} else {
					type = _constant.PROPS;
				}
				break;
			case (_util.isStr(vnode) || _util.isNum(vnode) || _util.isStr(newVnode) || _util.isNum(newVnode)) && vnode != newVnode:
				type = _constant.REPLACE;
				break;
		}
		if (!type || type === _constant.PROPS) {
			children = diffChildren(vnode.children, newVnode.children);
			if (children) {
				return _extends({ type: type, vnode: vnode, newVnode: newVnode }, children);
			}
		}

		return type ? { type: type, vnode: vnode, newVnode: newVnode } : null;
	};

	exports['default'] = diff;

	var diffChildren = function diffChildren(children, newChildren) {
		children = getFlatChildren([], children);
		newChildren = getFlatChildren([], newChildren);
		var childrenType = undefined;
		var childrenPatches = undefined;
		if (children.length === 0) {
			if (newChildren.length > 0) {
				childrenType = _constant.CREATE;
			}
		} else if (newChildren.length === 0) {
			childrenType = _constant.REMOVE;
		} else {
			childrenPatches = [];
			var maxLen = Math.max(children.length, newChildren.length);
			for (var i = 0; i < maxLen; i++) {
				childrenPatches.push(diff(children[i], newChildren[i]));
			}
			childrenType = _constant.REPLACE;
			return { childrenType: childrenType, childrenPatches: childrenPatches };
		}

		if (childrenType) {
			return { childrenType: childrenType, newChildren: newChildren };
		}
	};

	var getFlatChildren = function getFlatChildren(store, children) {
		if (_util.isArr(children)) {
			children.forEach(function (item) {
				if (_util.isArr(item)) {
					return getFlatChildren(store, item);
				}
				store.push(item);
			});
		}
		return store;
	};
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _util = __webpack_require__(2);

	var _constant = __webpack_require__(1);

	var _create = __webpack_require__(3);

	var _create2 = _interopRequireDefault(_create);

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
				applyProps(node, vnode.props, newVnode.props);
				break;
			case _constant.WIDGET:
				newVnode.update(vnode, node);
				break;
		}

		switch (childrenType) {
			case _constant.REMOVE:
				_util.toArray(node.childNodes).forEach(function (child) {
					return _util.removeChild(node, child);
				});
				break;
			case _constant.CREATE:
				patches.newChildren.forEach(function (child) {
					return _create.addChild(node, child);
				});
				break;
			case _constant.REPLACE:
				var children = _util.toArray(node.childNodes);
				patches.childrenPatches.forEach(function (childPatches, index) {
					patch(children[index], childPatches, node);
				});
				break;
		}

		return newNode || node;
	};

	exports['default'] = patch;

	var applyProps = function applyProps(node, props, newProps) {
		if (props == null && _util.isObj(newProps)) {
			return _util.setProps(node, newProps);
		} else if (newProps == null && _util.isObj(props)) {
			return Object.keys(props).each(function (key) {
				return removeProp(node, key);
			});
		}
		Object.keys(_extends({}, props, newProps)).forEach(function (key) {
			var value = props[key];
			var newValue = newProps[key];
			switch (true) {
				case key === 'style':
					patchStyle(node, props.style, newProps.style);
					break;
				case _util.isEventKey(key):
					if (!_util.isFn(newValue)) {
						_util.removeEvent(node, key);
					} else if (newValue !== value) {
						_util.setEvent(node, key, newValue);
					}
					break;
				case key in node:
					if (newValue === undefined) {
						removeProp(node, key);
					} else if (newValue !== value) {
						node[key] = newValue;
					}
					break;
				default:
					if (newValue === undefined) {
						node.removeAttribute(key);
					} else if (key !== 'key') {
						node.setAttribute(key, newValue);
					}
			}
		});
	};

	var patchStyle = function patchStyle(node, style, newStyle) {
		var domStyle = node.style;
		Object.keys(_extends({}, style, newStyle)).forEach(function (key) {
			var value = newStyle[key];
			if (value === undefined) {
				domStyle[key] = '';
			} else if (value !== style[key]) {
				_util.setStyleValue(domStyle, key, value);
			}
		});
	};
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _component = __webpack_require__(4);

	var _util = __webpack_require__(2);

	var createElement = function createElement(tagName, props) {
		for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			children[_key - 2] = arguments[_key];
		}

		var isComponent = _util.isFn(tagName) && _util.isFn(tagName.prototype.render);
		children = children.filter(function (child) {
			return !_util.isBln(child);
		});
		if (isComponent) {
			return new _component.Widget(tagName, _extends({}, props, {
				children: children.length === 1 ? children[0] : children
			}));
		}
		return {
			tagName: tagName,
			props: props,
			children: children
		};
	};

	exports['default'] = createElement;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _create = __webpack_require__(3);

	var _create2 = _interopRequireDefault(_create);

	var _diff = __webpack_require__(5);

	var _diff2 = _interopRequireDefault(_diff);

	var _patch = __webpack_require__(6);

	var _patch2 = _interopRequireDefault(_patch);

	var _util = __webpack_require__(2);

	var _constant = __webpack_require__(1);

	var store = {};
	var render = function render(vnode, container, callback) {
		var id = container.getAttribute(_constant.COMPONENT_ID);
		if (id) {
			var patches = _diff2['default'](store[id], vnode);
			_patch2['default'](container.firstChild, patches);
			store[id] = vnode;
		} else {
			var node = _create2['default'](vnode);
			container.setAttribute(_constant.COMPONENT_ID, id = _util.getUid());
			store[id] = vnode;
			container.innerHTML = '';
			_util.appendChild(container, node);
			_util.$trigger(_constant.DID_MOUNT);
			_util.$off(_constant.DID_MOUNT);
		}
		if (_util.isFn(callback)) {
			callback();
		}
	};

	exports.render = render;
	var unmount = function unmount(container) {
		var id = container.getAttribute(_constant.COMPONENT_ID);
		if (store.hasOwnProperty(id)) {
			var firstChild = container.firstChild;
			if (firstChild) {
				_util.removeChild(container, firstChild);
			}
			delete store[id];
		}
	};
	exports.unmount = unmount;

/***/ }
/******/ ])
});
;