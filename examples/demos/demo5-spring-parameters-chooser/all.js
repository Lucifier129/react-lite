/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/demos/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Demo = __webpack_require__(26);
	
	var _Demo2 = _interopRequireDefault(_Demo);
	
	_react2['default'].render(_react2['default'].createElement(_Demo2['default'], null), document.querySelector('#content'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	(function webpackUniversalModuleDefinition(root, factory) {
		if (true) module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else if (typeof exports === 'object') exports["React"] = factory();else root["React"] = factory();
	})(undefined, function () {
		return (/******/(function (modules) {
				// webpackBootstrap
				/******/ // The module cache
				/******/var installedModules = {};
	
				/******/ // The require function
				/******/function __webpack_require__(moduleId) {
	
					/******/ // Check if module is in cache
					/******/if (installedModules[moduleId])
						/******/return installedModules[moduleId].exports;
	
					/******/ // Create a new module (and put it into the cache)
					/******/var module = installedModules[moduleId] = {
						/******/exports: {},
						/******/id: moduleId,
						/******/loaded: false
						/******/ };
	
					/******/ // Execute the module function
					/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	
					/******/ // Flag the module as loaded
					/******/module.loaded = true;
	
					/******/ // Return the exports of the module
					/******/return module.exports;
					/******/
				}
	
				/******/ // expose the modules object (__webpack_modules__)
				/******/__webpack_require__.m = modules;
	
				/******/ // expose the module cache
				/******/__webpack_require__.c = installedModules;
	
				/******/ // __webpack_public_path__
				/******/__webpack_require__.p = "";
	
				/******/ // Load entry module and return exports
				/******/return __webpack_require__(0);
				/******/
			})(
			/************************************************************************/
			/******/[
			/* 0 */
			function (module, exports, __webpack_require__) {
	
				'use strict';
	
				exports.__esModule = true;
	
				function _interopRequireDefault(obj) {
					return obj && obj.__esModule ? obj : { 'default': obj };
				}
	
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
	
				/***/
			},
			/* 1 */
			function (module, exports) {
	
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
				var PROPS = 'PROPS';
				exports.PROPS = PROPS;
				var UPDATE = 'UPDATE';
				exports.UPDATE = UPDATE;
				var DID_MOUNT = 'DID_MOUNT';
				exports.DID_MOUNT = DID_MOUNT;
				var WILL_UNMOUNT = 'WILL_UNMOUNT';
				exports.WILL_UNMOUNT = WILL_UNMOUNT;
				var COMPONENT_ID = 'data-esnextid';
				exports.COMPONENT_ID = COMPONENT_ID;
	
				/***/
			},
			/* 2 */
			function (module, exports, __webpack_require__) {
	
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
				var isComponent = function isComponent(obj) {
					return isFn(obj);
				};
				exports.isComponent = isComponent;
				var isComponentClass = function isComponentClass(obj) {
					return isFn(obj) && isFn(obj.prototype.render);
				};
				exports.isComponentClass = isComponentClass;
				var isUndefined = function isUndefined(obj) {
					return obj === void 0;
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
				var toArray = Array.from || function (obj) {
					return Array.prototype.slice.call(obj);
				};
				exports.toArray = toArray;
				var nextFrame = isFn(window.requestAnimationFrame) ? function (fn) {
					return requestAnimationFrame(fn);
				} : function (fn) {
					return setTimeout(fn, 100 / 6);
				};
	
				exports.nextFrame = nextFrame;
				var getUid = function getUid() {
					return Math.random().toString(36).substr(2);
				};
	
				exports.getUid = getUid;
				var mergeProps = function mergeProps(props, children) {
					if (props && children && children.length > 0) {
						props.children = children.length === 1 ? children[0] : children;
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
					var events = $events[name] = $events[name] || [];
					events.push(callback);
				};
	
				exports.$on = $on;
				// export let $off = (name, callback) => {
				// 	if (!isFn(callback)) {
				// 		$events[name] = []
				// 		return
				// 	}
				// 	let index = $events[name].indexOf(callback)
				// 	if (index !== -1) {
				// 		$events[name].splice(index, 1)
				// 	}
				// }
	
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
					delete refsStore[id];
					return refs;
				};
				exports.getRefs = getRefs;
				var collectRef = function collectRef(key, value) {
					if (!componentId) {
						return;
					}
					var refs = refsStore[componentId];
					if (!refs) {
						refs = refsStore[componentId] = {};
					}
					if (value.nodeName) {
						value.getDOMNode = getDOMNode;
					}
					refs[key] = value;
				};
	
				exports.collectRef = collectRef;
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
					if (key === 'key' || key === 'ref') {
						if (key === 'ref' && value) {
							collectRef(value, elem);
						}
						return;
					}
					switch (true) {
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
	
				/***/
			},
			/* 3 */
			function (module, exports, __webpack_require__) {
	
				'use strict';
	
				exports.__esModule = true;
	
				var _extends = Object.assign || function (target) {
					for (var i = 1; i < arguments.length; i++) {
						var source = arguments[i];for (var key in source) {
							if (Object.prototype.hasOwnProperty.call(source, key)) {
								target[key] = source[key];
							}
						}
					}return target;
				};
	
				exports.Component = Component;
	
				function _interopRequireDefault(obj) {
					return obj && obj.__esModule ? obj : { 'default': obj };
				}
	
				var _util = __webpack_require__(2);
	
				var _constant = __webpack_require__(1);
	
				var _create = __webpack_require__(4);
	
				var _create2 = _interopRequireDefault(_create);
	
				var _diff = __webpack_require__(5);
	
				var _diff2 = _interopRequireDefault(_diff);
	
				var _patch = __webpack_require__(6);
	
				var _patch2 = _interopRequireDefault(_patch);
	
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
						var _this = this;
	
						var $cache = this.$cache;
						var state = this.state;
						var props = this.props;
						var node = this.node;
	
						if (_util.isFn(nextState)) {
							nextState = nextState(state, props);
						}
						if (!node) {
							$cache.nextState = _extends({}, this.state, nextState);
							return;
						}
						var keepSilent = $cache.keepSilent;
	
						var updateView = function updateView() {
							var shouldUpdate = false;
							if (!keepSilent) {
								shouldUpdate = _this.shouldComponentUpdate(nextState, props);
							}
							_this.state = _extends({}, _this.state, nextState);
							if (shouldUpdate === false) {
								return;
							}
							_this.forceUpdate(callback);
						};
						_util.nextFrame(updateView);
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
						var nextProps = _util.isObj($cache.props) ? $cache.props : props;
						var nextState = _util.isObj($cache.state) ? $cache.state : state;
						$cache.props = $cache.state = null;
						this.componentWillUpdate(nextProps, nextState);
						this.props = nextProps;
						this.state = nextState;
						_util.setComponentId(id);
						var nextVnode = this.render();
						var patches = _diff2['default'](vnode, nextVnode);
						var newNode = _patch2['default'](node, patches);
						_util.resetComponentId();
						this.refs = _util.getRefs(id);
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
					var id = component.$id = _util.getUid();
					var $cache = component.$cache;
	
					if (props.ref) {
						_util.collectRef(props.ref, component);
					}
					component.componentWillMount();
					component.state = $cache.nextState || component.state;
					$cache.nextState = null;
					var vnode = component.vnode = component.render();
					_util.setComponentId(id);
					var node = component.node = _create2['default'](vnode);
					_util.resetComponentId();
					component.refs = _util.getRefs(id);
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
						component.componentDidMount();
					});
					return { component: component, node: node };
				};
	
				exports.initComponent = initComponent;
				var updateComponent = function updateComponent(component, props) {
					props = _extends({}, props, component.constructor.defaultProps);
					if (props.ref) {
						_util.collectRef(props.ref, component);
					}
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
				exports.updateComponent = updateComponent;
	
				/***/
			},
			/* 4 */
			function (module, exports, __webpack_require__) {
	
				'use strict';
	
				exports.__esModule = true;
	
				var _util = __webpack_require__(2);
	
				var _constant = __webpack_require__(1);
	
				var _component = __webpack_require__(3);
	
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
	
				/***/
			},
			/* 5 */
			function (module, exports, __webpack_require__) {
	
				'use strict';
	
				exports.__esModule = true;
	
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
	
				/***/
			},
			/* 6 */
			function (module, exports, __webpack_require__) {
	
				'use strict';
	
				exports.__esModule = true;
	
				var _extends = Object.assign || function (target) {
					for (var i = 1; i < arguments.length; i++) {
						var source = arguments[i];for (var key in source) {
							if (Object.prototype.hasOwnProperty.call(source, key)) {
								target[key] = source[key];
							}
						}
					}return target;
				};
	
				function _interopRequireDefault(obj) {
					return obj && obj.__esModule ? obj : { 'default': obj };
				}
	
				var _util = __webpack_require__(2);
	
				var _constant = __webpack_require__(1);
	
				var _create = __webpack_require__(4);
	
				var _create2 = _interopRequireDefault(_create);
	
				var _component = __webpack_require__(3);
	
				var _diff = __webpack_require__(5);
	
				var _diff2 = _interopRequireDefault(_diff);
	
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
							patchProps(node, vnode.props, newVnode.props);
							break;
						case _constant.UPDATE:
							_component.updateComponent(vnode.component, _util.mergeProps(newVnode.props, newVnode.children));
							newVnode.component = vnode.component;
							break;
					}
	
					switch (childrenType) {
						case _constant.REMOVE:
							while (node.childNodes.length) {
								_util.removeChild(node, node.firstChild);
							}
							break;
						case _constant.CREATE:
							newVnode.children = _util.mapChildren(patches.newChildren, function (child) {
								return _create.addChild(node, child);
							});
							break;
						case _constant.REPLACE:
							var childNodes = _util.toArray(node.childNodes);
							newVnode.children = _util.mapChildren(newVnode.children, function (newChild, i) {
								var patches = _diff2['default'](vnode.children[i], newChild);
								patch(childNodes[i], patches, node);
							});
							while (node.childNodes.length > newVnode.children.length) {
								_util.removeChild(node, node.lastChild);
							}
							break;
					}
	
					return newNode || node;
				};
	
				exports['default'] = patch;
	
				var patchProps = function patchProps(node, props, newProps) {
					if (props == null && newProps) {
						return _util.setProps(node, newProps);
					} else if (newProps == null && props) {
						return Object.keys(props).each(function (key) {
							return _util.removeProp(node, key);
						});
					}
	
					for (var key in newProps) {
						if (!newProps.hasOwnProperty(key)) {
							continue;
						}
						var _newValue = newProps[key];
						if (_util.isUndefined(_newValue)) {
							_util.removeProp(node, key);
						} else if (_newValue !== props[key]) {
							_util.setProp(node, key, _newValue);
						} else if (key === 'ref' && _newValue) {
							_util.collectRef(_newValue, node);
						}
						delete props[key];
					}
	
					for (var key in props) {
						if (!props.hasOwnProperty(key)) {
							continue;
						}
						if (_util.isUndefined(newValue[key])) {
							_util.removeProp(node, key);
						}
					}
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
	
				/***/
			},
			/* 7 */
			function (module, exports) {
	
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
	
				/***/
			},
			/* 8 */
			function (module, exports, __webpack_require__) {
	
				'use strict';
	
				exports.__esModule = true;
	
				function _interopRequireDefault(obj) {
					return obj && obj.__esModule ? obj : { 'default': obj };
				}
	
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
					if (id) {
						var patches = _diff2['default'](store[id], vnode);
						_patch2['default'](container.firstChild, patches);
						store[id] = vnode;
					} else {
						var node = _create2['default'](vnode);
						_util.setAttr(container, _constant.COMPONENT_ID, id = _util.getUid());
						store[id] = vnode;
						container.innerHTML = '';
						_util.appendChild(container, node);
					}
					_util.$triggerOnce(_constant.DID_MOUNT);
					if (_util.isFn(callback)) {
						callback();
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
					}
				};
				exports.unmount = unmount;
	
				/***/
			}
			/******/])
		);
	});
	;
	/***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/

/***/ },
/* 2 */
/***/ function(module, exports) {

	
	// [stiffness, damping]
	"use strict";
	
	exports.__esModule = true;
	exports["default"] = {
	  noWobble: [170, 26], // the default
	  gentle: [120, 14],
	  wobbly: [180, 12],
	  stiff: [210, 20]
	};
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = spring;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _presets = __webpack_require__(2);
	
	var _presets2 = _interopRequireDefault(_presets);
	
	function spring(val) {
	  var config = arguments.length <= 1 || arguments[1] === undefined ? _presets2['default'].noWobble : arguments[1];
	
	  return { val: val, config: config };
	}
	
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.7.1
	(function() {
	  var getNanoSeconds, hrtime, loadTime;
	
	  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
	    module.exports = function() {
	      return performance.now();
	    };
	  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
	    module.exports = function() {
	      return (getNanoSeconds() - loadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    loadTime = getNanoSeconds();
	  } else if (Date.now) {
	    module.exports = function() {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function() {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }
	
	}).call(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = configAnimation;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _performanceNow = __webpack_require__(4);
	
	var _performanceNow2 = _interopRequireDefault(_performanceNow);
	
	var _raf = __webpack_require__(17);
	
	var _raf2 = _interopRequireDefault(_raf);
	
	function configAnimation() {
	  var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var _config$timeStep = config.timeStep;
	  var timeStep = _config$timeStep === undefined ? 1 / 60 * 1000 : _config$timeStep;
	  var _config$timeScale = config.timeScale;
	  var timeScale = _config$timeScale === undefined ? 1 : _config$timeScale;
	  var _config$maxSteps = config.maxSteps;
	  var maxSteps = _config$maxSteps === undefined ? 10 : _config$maxSteps;
	  var _config$raf = config.raf;
	  var raf = _config$raf === undefined ? _raf2['default'] : _config$raf;
	  var _config$now = config.now;
	  var now = _config$now === undefined ? _performanceNow2['default'] : _config$now;
	
	  var animRunning = [];
	  var running = false;
	  var prevTime = 0;
	  var accumulatedTime = 0;
	
	  function loop() {
	    var currentTime = now();
	    var frameTime = currentTime - prevTime; // delta
	
	    prevTime = currentTime;
	    accumulatedTime += frameTime * timeScale;
	
	    if (accumulatedTime > timeStep * maxSteps) {
	      accumulatedTime = 0;
	    }
	
	    var frameNumber = Math.ceil(accumulatedTime / timeStep);
	    for (var i = 0; i < animRunning.length; i++) {
	      var _animRunning$i = animRunning[i];
	      var active = _animRunning$i.active;
	      var animationStep = _animRunning$i.animationStep;
	      var prevPrevState = _animRunning$i.prevState;
	      var prevNextState = animRunning[i].nextState;
	
	      if (!active) {
	        continue;
	      }
	
	      // Seems like because the TS sets destVals as enterVals for the first
	      // tick, we might render that value twice. We render it once, currValue is
	      // enterVal and destVal is enterVal. The next tick is faster than 16ms,
	      // so accumulatedTime (which would be about -16ms from the previous tick)
	      // is negative (-16ms + any number less than 16ms < 0). So we just render
	      // part ways towards the nextState, but that's enterVal still. We render
	      // say 75% between currValue (=== enterVal) and destValue (=== enterVal).
	      // So we render the same value a second time.
	      // The solution below is to recalculate the destination state even when
	      // you're moving partially towards it.
	      if (accumulatedTime <= 0) {
	        animRunning[i].nextState = animationStep(timeStep / 1000, prevPrevState);
	      } else {
	        for (var j = 0; j < frameNumber; j++) {
	          animRunning[i].nextState = animationStep(timeStep / 1000, prevNextState);
	          var _ref = [prevNextState, animRunning[i].nextState];
	          animRunning[i].prevState = _ref[0];
	          prevNextState = _ref[1];
	        }
	      }
	    }
	
	    accumulatedTime = accumulatedTime - frameNumber * timeStep;
	
	    // Render and filter in one iteration.
	    var alpha = 1 + accumulatedTime / timeStep;
	    for (var i = 0; i < animRunning.length; i++) {
	      var _animRunning$i2 = animRunning[i];
	      var animationRender = _animRunning$i2.animationRender;
	      var nextState = _animRunning$i2.nextState;
	      var prevState = _animRunning$i2.prevState;
	
	      // Might mutate animRunning........
	      animationRender(alpha, nextState, prevState);
	    }
	
	    animRunning = animRunning.filter(function (_ref2) {
	      var active = _ref2.active;
	      return active;
	    });
	
	    if (animRunning.length === 0) {
	      running = false;
	    } else {
	      raf(loop);
	    }
	  }
	
	  function start() {
	    if (!running) {
	      running = true;
	      prevTime = now();
	      accumulatedTime = 0;
	      raf(loop);
	    }
	  }
	
	  return function startAnimation(state, animationStep, animationRender) {
	    for (var i = 0; i < animRunning.length; i++) {
	      var val = animRunning[i];
	      if (val.animationStep === animationStep) {
	        val.active = true;
	        val.prevState = state;
	        start();
	        return val.stop;
	      }
	    }
	
	    var newAnim = {
	      animationStep: animationStep,
	      animationRender: animationRender,
	      prevState: state,
	      nextState: state,
	      active: true
	    };
	
	    newAnim.stop = function () {
	      return newAnim.active = false;
	    };
	    animRunning.push(newAnim);
	
	    start();
	
	    return newAnim.stop;
	  };
	}
	
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports['default'] = components;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _noVelocity = __webpack_require__(10);
	
	var _noVelocity2 = _interopRequireDefault(_noVelocity);
	
	var _hasReachedStyle = __webpack_require__(8);
	
	var _hasReachedStyle2 = _interopRequireDefault(_hasReachedStyle);
	
	var _mergeDiff = __webpack_require__(9);
	
	var _mergeDiff2 = _interopRequireDefault(_mergeDiff);
	
	var _animationLoop = __webpack_require__(5);
	
	var _animationLoop2 = _interopRequireDefault(_animationLoop);
	
	var _zero = __webpack_require__(16);
	
	var _zero2 = _interopRequireDefault(_zero);
	
	var _updateTree = __webpack_require__(15);
	
	var _deprecatedSprings2 = __webpack_require__(7);
	
	var _deprecatedSprings3 = _interopRequireDefault(_deprecatedSprings2);
	
	var _stripStyle = __webpack_require__(14);
	
	var _stripStyle2 = _interopRequireDefault(_stripStyle);
	
	var startAnimation = _animationLoop2['default']();
	
	function mapObject(f, obj) {
	  var ret = {};
	  for (var key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = f(obj[key], key);
	  }
	  return ret;
	}
	
	function everyObj(f, obj) {
	  for (var key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    if (!f(obj[key], key)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	function components(React) {
	  var PropTypes = React.PropTypes;
	
	  var Motion = React.createClass({
	    displayName: 'Motion',
	
	    propTypes: {
	      // TOOD: warn against putting a config in here
	      defaultValue: function defaultValue(prop, propName) {
	        if (prop[propName]) {
	          return new Error('Spring\'s `defaultValue` has been changed to `defaultStyle`. ' + 'Its format received a few (easy to update!) changes as well.');
	        }
	      },
	      endValue: function endValue(prop, propName) {
	        if (prop[propName]) {
	          return new Error('Spring\'s `endValue` has been changed to `style`. Its format ' + 'received a few (easy to update!) changes as well.');
	        }
	      },
	      defaultStyle: PropTypes.object,
	      style: PropTypes.object.isRequired,
	      children: PropTypes.func.isRequired
	    },
	
	    getInitialState: function getInitialState() {
	      var _props = this.props;
	      var defaultStyle = _props.defaultStyle;
	      var style = _props.style;
	
	      var currentStyle = defaultStyle || style;
	      return {
	        currentStyle: currentStyle,
	        currentVelocity: mapObject(_zero2['default'], currentStyle)
	      };
	    },
	
	    componentDidMount: function componentDidMount() {
	      this.startAnimating();
	    },
	
	    componentWillReceiveProps: function componentWillReceiveProps() {
	      this.startAnimating();
	    },
	
	    animationStep: function animationStep(timestep, state) {
	      var currentStyle = state.currentStyle;
	      var currentVelocity = state.currentVelocity;
	      var style = this.props.style;
	
	      var newCurrentStyle = _updateTree.updateCurrentStyle(timestep, currentStyle, currentVelocity, style);
	      var newCurrentVelocity = _updateTree.updateCurrentVelocity(timestep, currentStyle, currentVelocity, style);
	
	      // TOOD: this isn't necessary anymore. It was used only against endValue func
	      if (_noVelocity2['default'](currentVelocity, newCurrentStyle) && _noVelocity2['default'](newCurrentVelocity, newCurrentStyle)) {
	        // check explanation in `Motion.animationRender`
	        this.stopAnimation(); // Nasty side effects....
	      }
	
	      return {
	        currentStyle: newCurrentStyle,
	        currentVelocity: newCurrentVelocity
	      };
	    },
	
	    stopAnimation: null,
	
	    // used in animationRender
	    hasUnmounted: false,
	
	    componentWillUnmount: function componentWillUnmount() {
	      this.stopAnimation();
	      this.hasUnmounted = true;
	    },
	
	    startAnimating: function startAnimating() {
	      // Is smart enough to not start it twice
	      this.stopAnimation = startAnimation(this.state, this.animationStep, this.animationRender);
	    },
	
	    animationRender: function animationRender(alpha, nextState, prevState) {
	      // `this.hasUnmounted` might be true in the following condition:
	      // user does some checks in `style` and calls an owner handler
	      // owner sets state in the callback, triggering a re-render
	      // unmounts Motion
	      if (!this.hasUnmounted) {
	        this.setState({
	          currentStyle: _updateTree.interpolateValue(alpha, nextState.currentStyle, prevState.currentStyle),
	          currentVelocity: nextState.currentVelocity
	        });
	      }
	    },
	
	    render: function render() {
	      var strippedStyle = _stripStyle2['default'](this.state.currentStyle);
	      var renderedChildren = this.props.children(strippedStyle);
	      return renderedChildren && React.Children.only(renderedChildren);
	    }
	  });
	
	  var StaggeredMotion = React.createClass({
	    displayName: 'StaggeredMotion',
	
	    propTypes: {
	      defaultStyle: function defaultStyle(prop, propName) {
	        if (prop[propName]) {
	          return new Error('You forgot the "s" for `StaggeredMotion`\'s `defaultStyles`.');
	        }
	      },
	      style: function style(prop, propName) {
	        if (prop[propName]) {
	          return new Error('You forgot the "s" for `StaggeredMotion`\'s `styles`.');
	        }
	      },
	      // TOOD: warn against putting configs in here
	      defaultStyles: PropTypes.arrayOf(PropTypes.object),
	      styles: PropTypes.func.isRequired,
	      children: PropTypes.func.isRequired
	    },
	
	    getInitialState: function getInitialState() {
	      var _props2 = this.props;
	      var styles = _props2.styles;
	      var defaultStyles = _props2.defaultStyles;
	
	      var currentStyles = defaultStyles ? defaultStyles : styles();
	      return {
	        currentStyles: currentStyles,
	        currentVelocities: currentStyles.map(function (s) {
	          return mapObject(_zero2['default'], s);
	        })
	      };
	    },
	
	    componentDidMount: function componentDidMount() {
	      this.startAnimating();
	    },
	
	    componentWillReceiveProps: function componentWillReceiveProps() {
	      this.startAnimating();
	    },
	
	    animationStep: function animationStep(timestep, state) {
	      var currentStyles = state.currentStyles;
	      var currentVelocities = state.currentVelocities;
	
	      var styles = this.props.styles(currentStyles.map(_stripStyle2['default']));
	
	      var newCurrentStyles = currentStyles.map(function (currentStyle, i) {
	        return _updateTree.updateCurrentStyle(timestep, currentStyle, currentVelocities[i], styles[i]);
	      });
	      var newCurrentVelocities = currentStyles.map(function (currentStyle, i) {
	        return _updateTree.updateCurrentVelocity(timestep, currentStyle, currentVelocities[i], styles[i]);
	      });
	
	      // TODO: is this right?
	      if (currentVelocities.every(function (v, k) {
	        return _noVelocity2['default'](v, currentStyles[k]);
	      }) && newCurrentVelocities.every(function (v, k) {
	        return _noVelocity2['default'](v, newCurrentStyles[k]);
	      })) {
	        this.stopAnimation();
	      }
	
	      return {
	        currentStyles: newCurrentStyles,
	        currentVelocities: newCurrentVelocities
	      };
	    },
	
	    stopAnimation: null,
	
	    // used in animationRender
	    hasUnmounted: false,
	
	    componentWillUnmount: function componentWillUnmount() {
	      this.stopAnimation();
	      this.hasUnmounted = true;
	    },
	
	    startAnimating: function startAnimating() {
	      this.stopAnimation = startAnimation(this.state, this.animationStep, this.animationRender);
	    },
	
	    animationRender: function animationRender(alpha, nextState, prevState) {
	      // See comment in Motion.
	      if (!this.hasUnmounted) {
	        var currentStyles = nextState.currentStyles.map(function (style, i) {
	          return _updateTree.interpolateValue(alpha, style, prevState.currentStyles[i]);
	        });
	        this.setState({
	          currentStyles: currentStyles,
	          currentVelocities: nextState.currentVelocities
	        });
	      }
	    },
	
	    render: function render() {
	      var strippedStyle = this.state.currentStyles.map(_stripStyle2['default']);
	      var renderedChildren = this.props.children(strippedStyle);
	      return renderedChildren && React.Children.only(renderedChildren);
	    }
	  });
	
	  var TransitionMotion = React.createClass({
	    displayName: 'TransitionMotion',
	
	    propTypes: {
	      defaultValue: function defaultValue(prop, propName) {
	        if (prop[propName]) {
	          return new Error('TransitionSpring\'s `defaultValue` has been changed to ' + '`defaultStyles`. Its format received a few (easy to update!) ' + 'changes as well.');
	        }
	      },
	      endValue: function endValue(prop, propName) {
	        if (prop[propName]) {
	          return new Error('TransitionSpring\'s `endValue` has been changed to `styles`. ' + 'Its format received a few (easy to update!) changes as well.');
	        }
	      },
	      defaultStyle: function defaultStyle(prop, propName) {
	        if (prop[propName]) {
	          return new Error('You forgot the "s" for `TransitionMotion`\'s `defaultStyles`.');
	        }
	      },
	      style: function style(prop, propName) {
	        if (prop[propName]) {
	          return new Error('You forgot the "s" for `TransitionMotion`\'s `styles`.');
	        }
	      },
	      // TOOD: warn against putting configs in here
	      defaultStyles: PropTypes.objectOf(PropTypes.any),
	      styles: PropTypes.oneOfType([PropTypes.func, PropTypes.objectOf(PropTypes.any.isRequired)]).isRequired,
	      willLeave: PropTypes.oneOfType([PropTypes.func]),
	      // TOOD: warn against putting configs in here
	      willEnter: PropTypes.oneOfType([PropTypes.func]),
	      children: PropTypes.func.isRequired
	    },
	
	    getDefaultProps: function getDefaultProps() {
	      return {
	        willEnter: function willEnter(key, value) {
	          return value;
	        },
	        willLeave: function willLeave() {
	          return null;
	        }
	      };
	    },
	
	    getInitialState: function getInitialState() {
	      var _props3 = this.props;
	      var styles = _props3.styles;
	      var defaultStyles = _props3.defaultStyles;
	
	      var currentStyles = undefined;
	      if (defaultStyles == null) {
	        if (typeof styles === 'function') {
	          currentStyles = styles();
	        } else {
	          currentStyles = styles;
	        }
	      } else {
	        currentStyles = defaultStyles;
	      }
	      return {
	        currentStyles: currentStyles,
	        currentVelocities: mapObject(function (s) {
	          return mapObject(_zero2['default'], s);
	        }, currentStyles)
	      };
	    },
	
	    componentDidMount: function componentDidMount() {
	      this.startAnimating();
	    },
	
	    componentWillReceiveProps: function componentWillReceiveProps() {
	      this.startAnimating();
	    },
	
	    animationStep: function animationStep(timestep, state) {
	      var currentStyles = state.currentStyles;
	      var currentVelocities = state.currentVelocities;
	      var _props4 = this.props;
	      var styles = _props4.styles;
	      var willEnter = _props4.willEnter;
	      var willLeave = _props4.willLeave;
	
	      if (typeof styles === 'function') {
	        styles = styles(currentStyles);
	      }
	
	      // TODO: huh?
	      var mergedStyles = styles; // set mergedStyles to styles as the default
	      var hasNewKey = false;
	
	      mergedStyles = _mergeDiff2['default'](currentStyles, styles,
	      // TODO: stop allocating like crazy in this whole code path
	      function (key) {
	        var res = willLeave(key, currentStyles[key], styles, currentStyles, currentVelocities);
	        if (res == null) {
	          // For legacy reason. We won't allow returning null soon
	          // TODO: remove, after next release
	          return null;
	        }
	
	        if (_noVelocity2['default'](currentVelocities[key], currentStyles[key]) && _hasReachedStyle2['default'](currentStyles[key], res)) {
	          return null;
	        }
	        return res;
	      });
	
	      Object.keys(mergedStyles).filter(function (key) {
	        return !currentStyles.hasOwnProperty(key);
	      }).forEach(function (key) {
	        var _extends2, _extends3;
	
	        hasNewKey = true;
	        var enterStyle = willEnter(key, mergedStyles[key], styles, currentStyles, currentVelocities);
	
	        // We can mutate this here because mergeDiff returns a new Obj
	        mergedStyles[key] = enterStyle;
	
	        currentStyles = _extends({}, currentStyles, (_extends2 = {}, _extends2[key] = enterStyle, _extends2));
	        currentVelocities = _extends({}, currentVelocities, (_extends3 = {}, _extends3[key] = mapObject(_zero2['default'], enterStyle), _extends3));
	      });
	
	      var newCurrentStyles = mapObject(function (mergedStyle, key) {
	        return _updateTree.updateCurrentStyle(timestep, currentStyles[key], currentVelocities[key], mergedStyle);
	      }, mergedStyles);
	      var newCurrentVelocities = mapObject(function (mergedStyle, key) {
	        return _updateTree.updateCurrentVelocity(timestep, currentStyles[key], currentVelocities[key], mergedStyle);
	      }, mergedStyles);
	
	      if (!hasNewKey && everyObj(function (v, k) {
	        return _noVelocity2['default'](v, currentStyles[k]);
	      }, currentVelocities) && everyObj(function (v, k) {
	        return _noVelocity2['default'](v, newCurrentStyles[k]);
	      }, newCurrentVelocities)) {
	        // check explanation in `Motion.animationRender`
	        this.stopAnimation(); // Nasty side effects....
	      }
	
	      return {
	        currentStyles: newCurrentStyles,
	        currentVelocities: newCurrentVelocities
	      };
	    },
	
	    stopAnimation: null,
	
	    // used in animationRender
	    hasUnmounted: false,
	
	    componentWillUnmount: function componentWillUnmount() {
	      this.stopAnimation();
	      this.hasUnmounted = true;
	    },
	
	    startAnimating: function startAnimating() {
	      this.stopAnimation = startAnimation(this.state, this.animationStep, this.animationRender);
	    },
	
	    animationRender: function animationRender(alpha, nextState, prevState) {
	      // See comment in Motion.
	      if (!this.hasUnmounted) {
	        var currentStyles = mapObject(function (style, key) {
	          return _updateTree.interpolateValue(alpha, style, prevState.currentStyles[key]);
	        }, nextState.currentStyles);
	        this.setState({
	          currentStyles: currentStyles,
	          currentVelocities: nextState.currentVelocities
	        });
	      }
	    },
	
	    render: function render() {
	      var strippedStyle = mapObject(_stripStyle2['default'], this.state.currentStyles);
	      var renderedChildren = this.props.children(strippedStyle);
	      return renderedChildren && React.Children.only(renderedChildren);
	    }
	  });
	
	  var _deprecatedSprings = _deprecatedSprings3['default'](React);
	
	  var Spring = _deprecatedSprings.Spring;
	  var TransitionSpring = _deprecatedSprings.TransitionSpring;
	
	  return { Spring: Spring, TransitionSpring: TransitionSpring, Motion: Motion, StaggeredMotion: StaggeredMotion, TransitionMotion: TransitionMotion };
	}
	
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = deprecatedSprings;
	var hasWarnedForSpring = {};
	var hasWarnedForTransitionSpring = {};
	
	function deprecatedSprings(React) {
	  var Spring = React.createClass({
	    displayName: 'Spring',
	
	    componentWillMount: function componentWillMount() {
	      if (false) {
	        var ownerName = this._reactInternalInstance._currentElement._owner && this._reactInternalInstance._currentElement._owner.getName();
	        if (!hasWarnedForSpring[ownerName]) {
	          hasWarnedForSpring[ownerName] = true;
	          console.error('Spring (used in %srender) has now been renamed to Motion. ' + 'Please see the release note for the upgrade path. Thank you!', ownerName ? ownerName + '\'s ' : 'React.');
	        }
	      }
	    },
	
	    render: function render() {
	      return null;
	    }
	  });
	
	  var TransitionSpring = React.createClass({
	    displayName: 'TransitionSpring',
	
	    componentWillMount: function componentWillMount() {
	      if (false) {
	        var ownerName = this._reactInternalInstance._currentElement._owner && this._reactInternalInstance._currentElement._owner.getName();
	        if (!hasWarnedForTransitionSpring[ownerName]) {
	          hasWarnedForTransitionSpring[ownerName] = true;
	          console.error('TransitionSpring (used in %srender) has now been renamed to ' + 'TransitionMotion. Please see the release note for the upgrade ' + 'path. Thank you!', ownerName ? ownerName + '\'s ' : 'React.');
	        }
	      }
	    },
	
	    render: function render() {
	      return null;
	    }
	  });
	
	  return { Spring: Spring, TransitionSpring: TransitionSpring };
	}
	
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = hasReachedStyle;
	
	function hasReachedStyle(currentStyle, style) {
	  for (var key in style) {
	    if (!style.hasOwnProperty(key)) {
	      continue;
	    }
	    var currentValue = currentStyle[key];
	    var destValue = style[key];
	    if (destValue == null || !destValue.config) {
	      // not a spring config
	      continue;
	    }
	    if (currentValue.config && currentValue.val !== destValue.val) {
	      return false;
	    }
	    if (!currentValue.config && currentValue !== destValue.val) {
	      return false;
	    }
	  }
	
	  return true;
	}
	
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	
	
	// this function is allocation-less thanks to babel, which transforms the tail
	// calls into loops
	'use strict';
	
	exports.__esModule = true;
	exports['default'] = mergeDiff;
	function mergeDiffArr(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
	  var _again = true;
	
	  _function: while (_again) {
	    var arrA = _x,
	        arrB = _x2,
	        collB = _x3,
	        indexA = _x4,
	        indexB = _x5,
	        onRemove = _x6,
	        accum = _x7;
	    _again = false;
	
	    var endA = indexA === arrA.length;
	    var endB = indexB === arrB.length;
	    var keyA = arrA[indexA];
	    var keyB = arrB[indexB];
	    if (endA && endB) {
	      // returning null here, otherwise lint complains that we're not expecting
	      // a return value in subsequent calls. We know what we're doing.
	      return null;
	    }
	
	    if (endA) {
	      accum[keyB] = collB[keyB];
	      _x = arrA;
	      _x2 = arrB;
	      _x3 = collB;
	      _x4 = indexA;
	      _x5 = indexB + 1;
	      _x6 = onRemove;
	      _x7 = accum;
	      _again = true;
	      endA = endB = keyA = keyB = undefined;
	      continue _function;
	    }
	
	    if (endB) {
	      var fill = onRemove(keyA);
	      if (fill != null) {
	        accum[keyA] = fill;
	      }
	      _x = arrA;
	      _x2 = arrB;
	      _x3 = collB;
	      _x4 = indexA + 1;
	      _x5 = indexB;
	      _x6 = onRemove;
	      _x7 = accum;
	      _again = true;
	      endA = endB = keyA = keyB = fill = undefined;
	      continue _function;
	    }
	
	    if (keyA === keyB) {
	      accum[keyA] = collB[keyA];
	      _x = arrA;
	      _x2 = arrB;
	      _x3 = collB;
	      _x4 = indexA + 1;
	      _x5 = indexB + 1;
	      _x6 = onRemove;
	      _x7 = accum;
	      _again = true;
	      endA = endB = keyA = keyB = fill = undefined;
	      continue _function;
	    }
	
	    if (!collB.hasOwnProperty(keyA)) {
	      var fill = onRemove(keyA);
	      if (fill != null) {
	        accum[keyA] = fill;
	      }
	      _x = arrA;
	      _x2 = arrB;
	      _x3 = collB;
	      _x4 = indexA + 1;
	      _x5 = indexB;
	      _x6 = onRemove;
	      _x7 = accum;
	      _again = true;
	      endA = endB = keyA = keyB = fill = fill = undefined;
	      continue _function;
	    }
	
	    _x = arrA;
	    _x2 = arrB;
	    _x3 = collB;
	    _x4 = indexA + 1;
	    _x5 = indexB;
	    _x6 = onRemove;
	    _x7 = accum;
	    _again = true;
	    endA = endB = keyA = keyB = fill = fill = undefined;
	    continue _function;
	  }
	}
	
	function mergeDiff(a, b, onRemove) {
	  var ret = {};
	  // if anyone can make this work without allocating the arrays here, we'll
	  // give you a medal
	  mergeDiffArr(Object.keys(a), Object.keys(b), b, 0, 0, onRemove, ret);
	  return ret;
	}
	
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	
	// currentStyle keeps the info about whether a prop is configured as a spring
	// or if it's just a random prop that happens to be present on the style
	
	'use strict';
	
	exports.__esModule = true;
	exports['default'] = noVelocity;
	
	function noVelocity(currentVelocity, currentStyle) {
	  for (var key in currentVelocity) {
	    if (!currentVelocity.hasOwnProperty(key)) {
	      continue;
	    }
	    if (currentStyle[key] != null && currentStyle[key].config && currentVelocity[key] !== 0) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _components2 = __webpack_require__(6);
	
	var _components3 = _interopRequireDefault(_components2);
	
	var _reorderKeys = __webpack_require__(12);
	
	var _reorderKeys2 = _interopRequireDefault(_reorderKeys);
	
	var _components = _components3['default'](_react2['default']);
	
	var Spring = _components.Spring;
	var TransitionSpring = _components.TransitionSpring;
	var Motion = _components.Motion;
	var StaggeredMotion = _components.StaggeredMotion;
	var TransitionMotion = _components.TransitionMotion;
	exports.Spring = Spring;
	exports.TransitionSpring = TransitionSpring;
	exports.Motion = Motion;
	exports.StaggeredMotion = StaggeredMotion;
	exports.TransitionMotion = TransitionMotion;
	
	var _spring2 = __webpack_require__(3);
	
	var _spring3 = _interopRequireDefault(_spring2);
	
	exports.spring = _spring3['default'];
	
	var _presets2 = __webpack_require__(2);
	
	var _presets3 = _interopRequireDefault(_presets2);
	
	exports.presets = _presets3['default'];
	var utils = {
	  reorderKeys: _reorderKeys2['default']
	};
	exports.utils = utils;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = reorderKeys;
	
	function reorderKeys(obj, f) {
	  var newKeys = f(Object.keys(obj));
	  var ret = {};
	  for (var i = 0; i < newKeys.length; i++) {
	    var key = newKeys[i];
	    ret[key] = obj[key];
	  }
	
	  return ret;
	}
	
	module.exports = exports["default"];

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = stepper;
	
	var errorMargin = 0.0001;
	
	function stepper(frameRate, x, v, destX, k, b) {
	  // Spring stiffness, in kg / s^2
	
	  // for animations, destX is really spring length (spring at rest). initial
	  // position is considered as the stretched/compressed position of a spring
	  var Fspring = -k * (x - destX);
	
	  // Damping, in kg / s
	  var Fdamper = -b * v;
	
	  // usually we put mass here, but for animation purposes, specifying mass is a
	  // bit redundant. you could simply adjust k and b accordingly
	  // let a = (Fspring + Fdamper) / mass;
	  var a = Fspring + Fdamper;
	
	  var newV = v + a * frameRate;
	  var newX = x + newV * frameRate;
	
	  if (Math.abs(newV - v) < errorMargin && Math.abs(newX - x) < errorMargin) {
	    return [destX, 0];
	  }
	
	  return [newX, newV];
	}
	
	module.exports = exports["default"];

/***/ },
/* 14 */
/***/ function(module, exports) {

	
	// turn {x: {val: 1, config: [1, 2]}, y: 2} generated by
	// `{x: spring(1, [1, 2]), y: 2}` into {x: 1, y: 2}
	
	'use strict';
	
	exports.__esModule = true;
	exports['default'] = stripStyle;
	
	function stripStyle(style) {
	  var ret = {};
	  for (var key in style) {
	    if (!style.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = style[key] == null || style[key].val == null ? style[key] : style[key].val;
	  }
	  return ret;
	}
	
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.interpolateValue = interpolateValue;
	exports.updateCurrentStyle = updateCurrentStyle;
	exports.updateCurrentVelocity = updateCurrentVelocity;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _stepper = __webpack_require__(13);
	
	var _stepper2 = _interopRequireDefault(_stepper);
	
	var _spring = __webpack_require__(3);
	
	var _spring2 = _interopRequireDefault(_spring);
	
	// TODO: refactor common logic with updateCurrValue and updateCurrVelocity
	
	function interpolateValue(alpha, nextStyle, prevStyle) {
	  // might be used by a TransitionMotion, where prevStyle might not exist anymore
	  if (!prevStyle) {
	    return nextStyle;
	  }
	
	  var ret = {};
	  for (var key in nextStyle) {
	    if (!nextStyle.hasOwnProperty(key)) {
	      continue;
	    }
	
	    if (nextStyle[key] == null || !nextStyle[key].config) {
	      ret[key] = nextStyle[key];
	      // not a spring config, not something we want to interpolate
	      continue;
	    }
	    var prevValue = prevStyle[key].config ? prevStyle[key].val : prevStyle[key];
	    ret[key] = _spring2['default'](nextStyle[key].val * alpha + prevValue * (1 - alpha), nextStyle[key].config);
	  }
	
	  return ret;
	}
	
	// TODO: refactor common logic with updateCurrentVelocity
	
	function updateCurrentStyle(frameRate, currentStyle, currentVelocity, style) {
	  var ret = {};
	  for (var key in style) {
	    if (!style.hasOwnProperty(key)) {
	      continue;
	    }
	    if (style[key] == null || !style[key].config) {
	      ret[key] = style[key];
	      // not a spring config, not something we want to interpolate
	      continue;
	    }
	    var _style$key$config = style[key].config;
	    var k = _style$key$config[0];
	    var b = _style$key$config[1];
	
	    var val = _stepper2['default'](frameRate,
	    // might have been a non-springed prop that just became one
	    currentStyle[key].val == null ? currentStyle[key] : currentStyle[key].val, currentVelocity[key], style[key].val, k, b)[0];
	    ret[key] = _spring2['default'](val, style[key].config);
	  }
	  return ret;
	}
	
	function updateCurrentVelocity(frameRate, currentStyle, currentVelocity, style) {
	  var ret = {};
	  for (var key in style) {
	    if (!style.hasOwnProperty(key)) {
	      continue;
	    }
	    if (style[key] == null || !style[key].config) {
	      // not a spring config, not something we want to interpolate
	      ret[key] = 0;
	      continue;
	    }
	    var _style$key$config2 = style[key].config;
	    var k = _style$key$config2[0];
	    var b = _style$key$config2[1];
	
	    var val = _stepper2['default'](frameRate,
	    // might have been a non-springed prop that just became one
	    currentStyle[key].val == null ? currentStyle[key] : currentStyle[key].val, currentVelocity[key], style[key].val, k, b)[1];
	    ret[key] = val;
	  }
	  return ret;
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	
	// used by the tree-walking updates and springs. Avoids some allocations
	"use strict";
	
	exports.__esModule = true;
	exports["default"] = zero;
	
	function zero() {
	  return 0;
	}
	
	module.exports = exports["default"];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var now = __webpack_require__(4)
	  , global = typeof window === 'undefined' ? {} : window
	  , vendors = ['moz', 'webkit']
	  , suffix = 'AnimationFrame'
	  , raf = global['request' + suffix]
	  , caf = global['cancel' + suffix] || global['cancelRequest' + suffix]
	
	for(var i = 0; i < vendors.length && !raf; i++) {
	  raf = global[vendors[i] + 'Request' + suffix]
	  caf = global[vendors[i] + 'Cancel' + suffix]
	      || global[vendors[i] + 'CancelRequest' + suffix]
	}
	
	// Some versions of FF have rAF but not cAF
	if(!raf || !caf) {
	  var last = 0
	    , id = 0
	    , queue = []
	    , frameDuration = 1000 / 60
	
	  raf = function(callback) {
	    if(queue.length === 0) {
	      var _now = now()
	        , next = Math.max(0, frameDuration - (_now - last))
	      last = next + _now
	      setTimeout(function() {
	        var cp = queue.slice(0)
	        // Clear queue here to prevent
	        // callbacks from appending listeners
	        // to the current frame's queue
	        queue.length = 0
	        for(var i = 0; i < cp.length; i++) {
	          if(!cp[i].cancelled) {
	            try{
	              cp[i].callback(last)
	            } catch(e) {
	              setTimeout(function() { throw e }, 0)
	            }
	          }
	        }
	      }, Math.round(next))
	    }
	    queue.push({
	      handle: ++id,
	      callback: callback,
	      cancelled: false
	    })
	    return id
	  }
	
	  caf = function(handle) {
	    for(var i = 0; i < queue.length; i++) {
	      if(queue[i].handle === handle) {
	        queue[i].cancelled = true
	      }
	    }
	  }
	}
	
	module.exports = function(fn) {
	  // Wrap in a new function to prevent
	  // `cancel` potentially being assigned
	  // to the native rAF function
	  return raf.call(global, fn)
	}
	module.exports.cancel = function() {
	  caf.apply(global, arguments)
	}


/***/ },
/* 18 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var isIterateeCall = __webpack_require__(20);
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeCeil = Math.ceil,
	    nativeMax = Math.max;
	
	/**
	 * Creates an array of numbers (positive and/or negative) progressing from
	 * `start` up to, but not including, `end`. If `end` is not specified it is
	 * set to `start` with `start` then set to `0`. If `end` is less than `start`
	 * a zero-length range is created unless a negative `step` is specified.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {number} [start=0] The start of the range.
	 * @param {number} end The end of the range.
	 * @param {number} [step=1] The value to increment or decrement by.
	 * @returns {Array} Returns the new array of numbers.
	 * @example
	 *
	 * _.range(4);
	 * // => [0, 1, 2, 3]
	 *
	 * _.range(1, 5);
	 * // => [1, 2, 3, 4]
	 *
	 * _.range(0, 20, 5);
	 * // => [0, 5, 10, 15]
	 *
	 * _.range(0, -4, -1);
	 * // => [0, -1, -2, -3]
	 *
	 * _.range(1, 4, 0);
	 * // => [1, 1, 1]
	 *
	 * _.range(0);
	 * // => []
	 */
	function range(start, end, step) {
	  if (step && isIterateeCall(start, end, step)) {
	    end = step = undefined;
	  }
	  start = +start || 0;
	  step = step == null ? 1 : (+step || 0);
	
	  if (end == null) {
	    end = start;
	    start = 0;
	  } else {
	    end = +end || 0;
	  }
	  // Use `Array(length)` so engines like Chakra and V8 avoid slower modes.
	  // See https://youtu.be/XAqIpGU8ZZk#t=17m25s for more details.
	  var index = -1,
	      length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = start;
	    start += step;
	  }
	  return result;
	}
	
	module.exports = range;


/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.9 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;
	
	/**
	 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    var other = object[index];
	    return value === value ? (value === other) : (other !== other);
	  }
	  return false;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isIterateeCall;


/***/ },
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _srcReactMotion = __webpack_require__(11);
	
	var _lodashRange = __webpack_require__(19);
	
	var _lodashRange2 = _interopRequireDefault(_lodashRange);
	
	var gridWidth = 150;
	var gridHeight = 150;
	var grid = _lodashRange2['default'](4).map(function () {
	  return _lodashRange2['default'](6);
	});
	
	var Demo = _react2['default'].createClass({
	  displayName: 'Demo',
	
	  getInitialState: function getInitialState() {
	    return {
	      delta: [0, 0],
	      mouse: [0, 0],
	      isPressed: false,
	      firstConfig: [60, 5],
	      slider: { dragged: null, num: 0 },
	      lastPressed: [0, 0]
	    };
	  },
	
	  componentDidMount: function componentDidMount() {
	    window.addEventListener('mousemove', this.handleMouseMove);
	    window.addEventListener('touchmove', this.handleTouchMove);
	    window.addEventListener('mouseup', this.handleMouseUp);
	    window.addEventListener('touchend', this.handleMouseUp);
	  },
	
	  handleTouchStart: function handleTouchStart(pos, press, e) {
	    this.handleMouseDown(pos, press, e.touches[0]);
	  },
	
	  handleMouseDown: function handleMouseDown(pos, _ref, _ref2) {
	    var pressX = _ref[0];
	    var pressY = _ref[1];
	    var pageX = _ref2.pageX;
	    var pageY = _ref2.pageY;
	
	    this.setState({
	      delta: [pageX - pressX, pageY - pressY],
	      mouse: [pressX, pressY],
	      isPressed: true,
	      lastPressed: pos
	    });
	  },
	
	  handleTouchMove: function handleTouchMove(e) {
	    if (this.state.isPressed) {
	      e.preventDefault();
	    }
	    this.handleMouseMove(e.touches[0]);
	  },
	
	  handleMouseMove: function handleMouseMove(_ref3) {
	    var pageX = _ref3.pageX;
	    var pageY = _ref3.pageY;
	    var _state = this.state;
	    var isPressed = _state.isPressed;
	    var _state$delta = _state.delta;
	    var dx = _state$delta[0];
	    var dy = _state$delta[1];
	
	    if (isPressed) {
	      this.setState({ mouse: [pageX - dx, pageY - dy] });
	    }
	  },
	
	  handleMouseUp: function handleMouseUp() {
	    this.setState({
	      isPressed: false,
	      delta: [0, 0],
	      slider: { dragged: null, num: 0 }
	    });
	  },
	
	  handleChange: function handleChange(constant, num, _ref4) {
	    var target = _ref4.target;
	    var _state$firstConfig = this.state.firstConfig;
	    var s = _state$firstConfig[0];
	    var d = _state$firstConfig[1];
	
	    if (constant === 'stiffness') {
	      this.setState({
	        firstConfig: [target.value - num * 30, d]
	      });
	    } else {
	      this.setState({
	        firstConfig: [s, target.value - num * 2]
	      });
	    }
	  },
	
	  handleMouseDownInput: function handleMouseDownInput(constant, num) {
	    this.setState({
	      slider: { dragged: constant, num: num }
	    });
	  },
	
	  render: function render() {
	    var _this = this;
	
	    var _state2 = this.state;
	    var mouse = _state2.mouse;
	    var isPressed = _state2.isPressed;
	    var lastPressed = _state2.lastPressed;
	    var _state2$firstConfig = _state2.firstConfig;
	    var s0 = _state2$firstConfig[0];
	    var d0 = _state2$firstConfig[1];
	    var _state2$slider = _state2.slider;
	    var dragged = _state2$slider.dragged;
	    var num = _state2$slider.num;
	
	    return _react2['default'].createElement(
	      'div',
	      { className: 'demo5' },
	      grid.map(function (row, i) {
	        return row.map(function (cell, j) {
	          var cellStyle = {
	            top: gridHeight * i,
	            left: gridWidth * j,
	            width: gridWidth,
	            height: gridHeight
	          };
	          var stiffness = s0 + i * 30;
	          var damping = d0 + j * 2;
	          var motionStyle = isPressed ? { x: mouse[0], y: mouse[1] } : {
	            x: _srcReactMotion.spring(gridWidth / 2 - 25, [stiffness, damping]),
	            y: _srcReactMotion.spring(gridHeight / 2 - 25, [stiffness, damping])
	          };
	
	          return _react2['default'].createElement(
	            'div',
	            { style: cellStyle, className: 'demo5-cell' },
	            _react2['default'].createElement('input', {
	              type: 'range',
	              min: 0,
	              max: 300,
	              value: stiffness,
	              onMouseDown: _this.handleMouseDownInput.bind(null, 'stiffness', i),
	              onChange: _this.handleChange.bind(null, 'stiffness', i) }),
	            _react2['default'].createElement('input', {
	              type: 'range',
	              min: 0,
	              max: 40,
	              value: damping,
	              onMouseDown: _this.handleMouseDownInput.bind(null, 'damping', j),
	              onChange: _this.handleChange.bind(null, 'damping', j) }),
	            _react2['default'].createElement(
	              _srcReactMotion.Motion,
	              { style: motionStyle },
	              function (_ref5) {
	                var x = _ref5.x;
	                var y = _ref5.y;
	
	                var thing = undefined;
	                if (dragged === 'stiffness') {
	                  thing = i < num ? _react2['default'].createElement(
	                    'div',
	                    { className: 'demo5-minus' },
	                    '-',
	                    (num - i) * 30
	                  ) : i > num ? _react2['default'].createElement(
	                    'div',
	                    { className: 'demo5-plus' },
	                    '+',
	                    (i - num) * 30
	                  ) : _react2['default'].createElement(
	                    'div',
	                    { className: 'demo5-plus' },
	                    '0'
	                  );
	                } else {
	                  thing = j < num ? _react2['default'].createElement(
	                    'div',
	                    { className: 'demo5-minus' },
	                    '-',
	                    (num - j) * 2
	                  ) : j > num ? _react2['default'].createElement(
	                    'div',
	                    { className: 'demo5-plus' },
	                    '+',
	                    (j - num) * 2
	                  ) : _react2['default'].createElement(
	                    'div',
	                    { className: 'demo5-plus' },
	                    '0'
	                  );
	                }
	                var active = lastPressed[0] === i && lastPressed[1] === j ? 'demo5-ball-active' : '';
	                return _react2['default'].createElement(
	                  'div',
	                  {
	                    style: {
	                      transform: 'translate3d(' + x + 'px, ' + y + 'px, 0)',
	                      WebkitTransform: 'translate3d(' + x + 'px, ' + y + 'px, 0)'
	                    },
	                    className: 'demo5-ball ' + active,
	                    onMouseDown: _this.handleMouseDown.bind(null, [i, j], [x, y]),
	                    onTouchStart: _this.handleTouchStart.bind(null, [i, j], [x, y]) },
	                  _react2['default'].createElement(
	                    'div',
	                    { className: 'demo5-preset' },
	                    stiffness,
	                    dragged === 'stiffness' && thing
	                  ),
	                  _react2['default'].createElement(
	                    'div',
	                    { className: 'demo5-preset' },
	                    damping,
	                    dragged === 'damping' && thing
	                  )
	                );
	              }
	            )
	          );
	        });
	      })
	    );
	  }
	});
	
	exports['default'] = Demo;
	module.exports = exports['default'];

/***/ }
/******/ ]);
//# sourceMappingURL=all.js.map