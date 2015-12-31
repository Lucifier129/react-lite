/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		27:0
/******/ 	};
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/
/******/ 			script.src = __webpack_require__.p + "" + chunkId + ".chunk.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/__build__/";
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ function(module, exports) {

	/*!
	 * react-lite.js v0.0.5
	 * (c) 2015 Jade Gu
	 * Released under the MIT License.
	 */
	'use strict';
	
	var isType = function isType(type) {
		return function (obj) {
			return obj != null && Object.prototype.toString.call(obj) === '[object ' + type + ']';
		};
	};
	var isObj = isType('Object');
	var isStr = isType('String');
	var isNum = isType('Number');
	var isFn = isType('Function');
	var isBln = isType('Boolean');
	var isArr = Array.isArray || isType('Array');
	var isUndefined = function isUndefined(obj) {
		return obj === undefined;
	};
	var isComponent = function isComponent(obj) {
		return obj && obj.prototype && 'forceUpdate' in obj.prototype;
	};
	var isStatelessComponent = function isStatelessComponent(obj) {
		return obj && (!obj.prototype || !('forceUpdate' in obj.prototype));
	};
	
	var pipe = function pipe(fn1, fn2) {
		return function () {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			fn1.apply(this, args);
			return fn2.apply(this, args);
		};
	};
	
	var forEach$1 = function forEach(list, iteratee) {
		var record = arguments.length <= 2 || arguments[2] === undefined ? { index: 0 } : arguments[2];
	
		for (var i = 0, len = list.length; i < len; i += 1) {
			var item = list[i];
			if (isArr(item)) {
				forEach(item, iteratee, record);
			} else if (!isUndefined(item)) {
				iteratee(item, record.index);
				record.index += 1;
			}
		}
	};
	
	var eachItem = function eachItem(list, iteratee) {
		for (var i = 0, len = list.length; i < len; i += 1) {
			iteratee(list[i], i);
		}
	};
	
	var mapValue = function mapValue(obj, iteratee) {
		for (var key in obj) {
			if (!obj.hasOwnProperty(key)) {
				continue;
			}
			iteratee(obj[key], key);
		}
	};
	
	var mapKey = function mapKey(sources, iteratee) {
		var keyMap = {};
		var item = undefined;
		var key = undefined;
		for (var i = 0, len = sources.length; i < len; i += 1) {
			item = sources[i];
			for (key in item) {
				if (!item.hasOwnProperty(key) || keyMap[key]) {
					continue;
				}
				keyMap[key] = true;
				iteratee(key);
			}
		}
	};
	
	var extend = function extend(target) {
		for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
			args[_key2 - 1] = arguments[_key2];
		}
	
		var setProp = function setProp(value, key) {
			if (isUndefined(value)) {
				return;
			}
			target[key] = value;
		};
		eachItem(args, function (source) {
			if (source == null) {
				return;
			}
			mapValue(source, setProp);
		});
		return target;
	};
	
	var uid = 0;
	var getUid = function getUid() {
		return ++uid;
	};
	
	var getChildren = function getChildren(_x2) {
		var _again = true;
	
		_function: while (_again) {
			var children = _x2;
			_again = false;
	
			if (children && children.length > 0) {
				if (children.length === 1) {
					children = children[0];
					if (isArr(children)) {
						_x2 = children;
						_again = true;
						continue _function;
					}
				}
			} else {
				children = undefined;
			}
			return children;
		}
	};
	var mergeProps = function mergeProps(props, children, defaultProps) {
		var result = extend({}, defaultProps, props);
		children = getChildren(children);
		if (!isUndefined(children)) {
			result.children = children;
		}
		return result;
	};
	
	var setAttr = function setAttr(elem, key, value) {
		elem.setAttribute(key, value);
	};
	var getAttr = function getAttr(elem, key) {
		return elem.getAttribute(key);
	};
	var removeAttr = function removeAttr(elem, key) {
		elem.removeAttribute(key);
	};
	
	var eventNameAlias = {
		onDoubleClick: 'ondblclick'
	};
	var getEventName = function getEventName(key) {
		key = eventNameAlias[key] || key;
		return key.toLowerCase();
	};
	var setEvent = function setEvent(elem, key, value) {
		if (!isFn(value)) {
			return;
		}
		key = getEventName(key);
		elem[key] = value;
		if (key === 'onchange') {
			elem.oninput = value;
		}
	};
	var removeEvent = function removeEvent(elem, key) {
		key = getEventName(key);
		elem[key] = null;
		if (key === 'onchange') {
			elem.oninput = null;
		}
	};
	
	var ignoreKeys = {
		key: true,
		ref: true,
		children: true
	};
	var EVENT_KEYS = /^on/i;
	var isIgnoreKey = function isIgnoreKey(key) {
		return ignoreKeys[key];
	};
	var isEventKey = function isEventKey(key) {
		return EVENT_KEYS.test(key);
	};
	var isInnerHTMLKey = function isInnerHTMLKey(key) {
		return key === 'dangerouslySetInnerHTML';
	};
	var isStyleKey = function isStyleKey(key) {
		return key === 'style';
	};
	var setProp = function setProp(elem, key, value) {
		switch (true) {
			case isIgnoreKey(key):
				break;
			case isEventKey(key):
				setEvent(elem, key, value);
				break;
			case isStyleKey(key):
				setStyle(elem, value);
				break;
			case isInnerHTMLKey(key):
				value && isStr(value.__html) && (elem.innerHTML = value.__html);
				break;
			case key in elem:
				elem[key] = value;
				break;
			default:
				elem.setAttribute(key, value);
		}
	};
	var setProps = function setProps(elem, props) {
		mapValue(props, function (value, key) {
			setProp(elem, key, value);
		});
	};
	var removeProps = function removeProps(elem, oldProps) {
		mapValue(oldProps, function (oldValue, key) {
			removeProp(elem, key, oldValue);
		});
	};
	var removeProp = function removeProp(elem, key, oldValue) {
		switch (true) {
			case isIgnoreKey(key):
				break;
			case isEventKey(key):
				removeEvent(elem, key);
				break;
			case isStyleKey(key):
				removeStyle(elem, oldValue);
				break;
			case isInnerHTMLKey(key):
				elem.innerHTML = '';
				break;
			case !(key in elem):
				removeAttr(elem, key);
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
					elem[key] = null;
				} catch (e) {
					//pass
				}
		}
	};
	var patchProps = function patchProps(elem, props, newProps) {
		if (props === newProps) {
			return;
		}
		if (!props && newProps) {
			setProps(elem, newProps);
			return;
		} else if (!newProps && props) {
			removeProps(elem, props);
			return;
		}
	
		mapKey([props, newProps], function (key) {
			if (isIgnoreKey(key)) {
				return;
			}
			var value = newProps[key];
			var oldValue = key === 'value' ? elem.value : props[key];
			if (value === oldValue) {
				return;
			}
			if (isUndefined(value)) {
				removeProp(elem, key, oldValue);
				return;
			}
			if (isStyleKey(key)) {
				patchStyle(elem, oldValue, value);
			} else if (isInnerHTMLKey(key)) {
				var oldHtml = oldValue && oldValue.__html;
				var html = value && value.__html;
				if (!isStr(html)) {
					elem.innerHTML = '';
				} else if (html !== oldHtml) {
					elem.innerHTML = html;
				}
			} else {
				setProp(elem, key, value);
			}
		});
	};
	
	var removeStyle = function removeStyle(elem, style) {
		if (!isObj(style)) {
			return;
		}
		var elemStyle = elem.style;
		mapValue(style, function (_, key) {
			elemStyle[key] = '';
		});
	};
	var setStyle = function setStyle(elem, style) {
		if (!isObj(style)) {
			return;
		}
		var elemStyle = elem.style;
		mapValue(style, function (value, key) {
			setStyleValue(elemStyle, key, value);
		});
	};
	var patchStyle = function patchStyle(elem, style, newStyle) {
		if (style === newStyle) {
			return;
		}
		if (!newStyle && style) {
			removeStyle(elem, style);
		} else if (newStyle && !style) {
			setStyle(elem, newStyle);
		} else {
			var elemStyle = elem.style;
			mapKey([style, newStyle], function (key) {
				var value = newStyle[key];
				var oldValue = style[key];
				if (value !== oldValue) {
					setStyleValue(elemStyle, key, value);
				}
			});
		}
	};
	
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
	
	var isUnitlessNumberWithPrefix = {};
	var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
	var prefixKey = function prefixKey(prefix, key) {
		return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	};
	mapValue(isUnitlessNumber, function (_, prop) {
		eachItem(prefixes, function (prefix) {
			return isUnitlessNumberWithPrefix[prefixKey(prefix, prop)] = true;
		});
	});
	mapValue(isUnitlessNumberWithPrefix, function (value, key) {
		isUnitlessNumber[key] = value;
	});
	
	var RE_NUMBER = /^-?\d+(\.\d+)?$/;
	var setStyleValue = function setStyleValue(style, key, value) {
		if (isBln(value) || value == null) {
			value = '';
		}
		if (!isUnitlessNumber[key] && RE_NUMBER.test(value)) {
			style[key] = value + 'px';
		} else {
			style[key] = value;
		}
	};
	
	var VNODE_TYPE = {
		ELEMENT: 1,
		COMPONENT: 2,
		STATELESS_COMPONENT: 3,
		TEXT: 4
	};
	var DIFF_TYPE = {
		CREATE: 1,
		REMOVE: 2,
		REPLACE: 3,
		UPDATE: 4
	};
	
	var COMPONENT_ID = 'data-liteid';
	
	var store = {};
	var render = function render(vtree, container, callback) {
		if (!vtree) {
			throw new Error('cannot render ' + vtree + ' to container');
		}
		var id = getAttr(container, COMPONENT_ID);
		if (store.hasOwnProperty(id)) {
			store[id].updateTree(vtree, container);
		} else {
			setAttr(container, COMPONENT_ID, id = getUid());
			container.innerHTML = '';
			vtree.initTree(container);
		}
		store[id] = vtree;
	
		var result = null;
		switch (vtree.vtype) {
			case VNODE_TYPE.ELEMENT:
				result = container.firstChild;
				break;
			case VNODE_TYPE.COMPONENT:
				result = vtree.component;
				break;
		}
	
		if (isFn(callback)) {
			callback.call(result);
		}
	
		return result;
	};
	
	var unmountComponentAtNode = function unmountComponentAtNode(container) {
		var id = getAttr(container, COMPONENT_ID);
		if (store.hasOwnProperty(id)) {
			store[id].destroyTree();
			delete store[id];
			return true;
		}
		return false;
	};
	
	var findDOMNode = function findDOMNode(node) {
		if (node == null) {
			return null;
		}
		if (node.nodeName) {
			return node;
		}
		var component = node;
		// if component.node equal to false, component must be unmounted
		if (isFn(component.getDOMNode) && component.node) {
			return component.getDOMNode();
		}
		throw new Error('findDOMNode can not find Node');
	};
	
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
					if (isArr(nextState)) {
						state = null;
						_x = nextState[0];
						_again = true;
						continue _function;
					}
					if (isFn(nextState)) {
						nextState = nextState.call(instance, state, props);
					}
					state = extend({}, state, nextState);
				}
			};
			eachItem(pendingStates, merge);
			pendingStates.length = 0;
			return state;
		},
		clearCallbacks: function clearCallbacks() {
			var pendingCallbacks = this.pendingCallbacks;
			var instance = this.instance;
	
			if (pendingCallbacks.length > 0) {
				eachItem(pendingCallbacks, function (callback) {
					return callback.call(instance);
				});
				pendingCallbacks.length = 0;
			}
		},
		addCallback: function addCallback(callback) {
			if (isFn(callback)) {
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
			var nextVtree = renderComponent(this, $cache.$context);
			vtree.updateTree(nextVtree, node && node.parentNode);
			$updater.isPending = false;
			this.vtree = nextVtree;
			this.node = nextVtree.node;
			this.componentDidUpdate(props, state, context);
			if (isFn(callback)) {
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
			return node && node.tagName === 'NOSCRIPT' ? null : node;
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
	
	var shouldUpdate = function shouldUpdate(component, nextProps, nextState, nextContext, callback) {
		var shouldComponentUpdate = component.shouldComponentUpdate(nextProps, nextState, nextContext);
		if (shouldComponentUpdate === false) {
			updatePropsAndState(component, nextProps, nextState, nextContext);
			return;
		}
		updatePropsAndState(component.$cache, nextProps, nextState, nextContext);
		component.forceUpdate(callback);
	};
	
	var diff = function diff(vnode, newVnode) {
		var type = undefined;
		switch (true) {
			case vnode === newVnode:
				return null;
			case isUndefined(newVnode):
				type = DIFF_TYPE.REMOVE;
				break;
			case isUndefined(vnode):
				type = DIFF_TYPE.CREATE;
				break;
			case vnode.type !== newVnode.type:
				type = DIFF_TYPE.REPLACE;
				break;
			case newVnode.key !== null:
				if (vnode.key === null || newVnode.key !== vnode.key) {
					type = DIFF_TYPE.REPLACE;
				} else {
					type = DIFF_TYPE.UPDATE;
				}
				break;
			case vnode.key !== null:
				type = DIFF_TYPE.REPLACE;
				break;
			default:
				type = DIFF_TYPE.UPDATE;
		}
		return type;
	};
	
	function Vtree(properties) {
		extend(this, properties);
	}
	
	var noop$1 = function noop() {};
	var getDOMNode = function getDOMNode() {
		return this;
	};
	Vtree.prototype = {
		constructor: Vtree,
		mapTree: noop$1,
		attachRef: function attachRef() {
			var refKey = this.ref;
			var refs = this.refs;
			var vtype = this.vtype;
	
			if (!refs || refKey == null) {
				return;
			}
			var refValue = undefined;
			if (vtype === VNODE_TYPE.ELEMENT) {
				refValue = this.node;
				// support react v0.13 style: this.refs.myInput.getDOMNode()
				refValue.getDOMNode = getDOMNode;
			} else if (vtype === VNODE_TYPE.COMPONENT) {
				refValue = this.component;
			}
			if (refValue) {
				if (isFn(refKey)) {
					refKey(refValue);
				} else if (isStr(refKey)) {
					refs[refKey] = refValue;
				}
			}
		},
		detachRef: function detachRef() {
			var refKey = this.ref;
			var refs = this.refs;
	
			if (!refs || refKey == null) {
				return;
			}
			if (isFn(refKey)) {
				refKey(null);
			} else {
				delete refs[refKey];
			}
		},
		updateRef: function updateRef(newVtree) {
			if (!this.refs) {
				newVtree.attachRef();
				return;
			}
			if (!newVtree.refs) {
				this.detachRef();
				return;
			}
			if (this.refs !== newVtree.refs) {
				this.detachRef();
				newVtree.attachRef();
				return;
			}
			var oldRef = this.ref;
			var newRef = newVtree.ref;
			if (newRef == null) {
				this.detachRef();
			} else if (oldRef !== newRef) {
				this.detachRef();
				newVtree.attachRef();
			}
		},
		updateTree: function updateTree(nextVtree, parentNode) {
			compareTwoTree(this, nextVtree, parentNode);
		}
	};
	
	function Vtext(text) {
		this.text = text;
	}
	
	Vtext.prototype = new Vtree({
		constructor: Vtext,
		vtype: VNODE_TYPE.TEXT,
		update: function update(nextVtext) {
			var node = this.node;
			var text = this.text;
	
			if (nextVtext.text !== text) {
				node.replaceData(0, node.length, nextVtext.text);
			}
			// deliver node to the newTree for next updating
			nextVtext.node = this.node;
			return this;
		},
		initTree: function initTree(parentNode) {
			this.node = createTextNode(this.text);
			appendNode(parentNode, this.node);
		},
		destroyTree: function destroyTree() {
			removeNode(this.node);
		}
	});
	
	function Velem(type, props) {
		this.type = type;
		this.props = props;
	}
	
	var unmountTree = function unmountTree(vtree) {
		var method = isValidComponent(vtree) ? 'destroyTree' : 'detachRef';
		vtree[method]();
	};
	Velem.prototype = new Vtree({
		constructor: Velem,
		vtype: VNODE_TYPE.ELEMENT,
		eachChildren: function eachChildren(iteratee) {
			var children = this.props.children;
			var sorted = this.sorted;
	
			if (sorted) {
				eachItem(children, iteratee);
				return;
			}
			// the default children often be nesting array, so then here make it flat
			if (isArr(children)) {
				var newChildren = [];
				forEach$1(children, function (vchild, index) {
					vchild = getVnode(vchild);
					iteratee(vchild, index);
					newChildren.push(vchild);
				});
				this.props.children = newChildren;
				this.sorted = true;
			} else if (!isUndefined(children)) {
				children = this.props.children = getVnode(children);
				iteratee(children, 0);
			}
		},
		mapTree: function mapTree(iteratee) {
			iteratee(this);
			this.eachChildren(function (vchild) {
				return vchild.mapTree(iteratee);
			});
		},
		initTree: function initTree(parentNode) {
			var type = this.type;
			var props = this.props;
	
			var node = this.node = createElement$1(type, props);
			this.eachChildren(function (vchild) {
				vchild.initTree(node);
			});
			appendNode(parentNode, node);
			this.attachRef();
		},
		destroyTree: function destroyTree() {
			this.mapTree(unmountTree);
			removeNode(this.node);
		},
		update: function update(newVelem) {
			var node = this.node;
			var props = this.props;
	
			var children = !isUndefined(props.children) ? props.children : [];
			var count = 0;
			if (!isArr(children)) {
				children = [children];
			}
			patchProps(node, props, newVelem.props);
			newVelem.node = node;
			newVelem.eachChildren(function (newVchild, index) {
				var vchild = children[index];
				if (vchild) {
					vchild.updateTree(newVchild, node);
				} else {
					newVchild.initTree(node);
				}
				count += 1;
			});
			// destroy old children not in the newChildren
			while (children.length > count) {
				children[count].destroyTree();
				count += 1;
			}
			this.updateRef(newVelem);
		}
	});
	
	function VstatelessComponent(type, props) {
		this.type = type;
		this.props = props;
	}
	
	VstatelessComponent.prototype = new Vtree({
		constructor: VstatelessComponent,
		vtype: VNODE_TYPE.STATELESS_COMPONENT,
		mapTree: function mapTree(iteratee) {
			iteratee(this);
		},
		renderTree: function renderTree() {
			var factory = this.type;
			var props = this.props;
			var context = this.context;
	
			var vtree = factory(props, getContextByTypes(context, factory.contextTypes));
			if (vtree && isFn(vtree.render)) {
				vtree = vtree.render();
			}
			this.vtree = getVnode(vtree);
			setContext(context, this.vtree);
		},
		initTree: function initTree(parentNode) {
			this.renderTree();
			this.vtree.initTree(parentNode);
			this.node = this.vtree.node;
		},
		destroyTree: function destroyTree() {
			this.vtree.destroyTree();
			this.node = this.vtree = null;
		},
		update: function update(newVtree, parentNode) {
			newVtree.renderTree();
			this.vtree.updateTree(newVtree.vtree, parentNode);
			newVtree.node = newVtree.vtree.node;
		}
	});
	
	var setRefs = noop$1;
	var handleVnodeWithRef = function handleVnodeWithRef(vnode) {
		setRefs(vnode);
	};
	var getContextByTypes = function getContextByTypes(curContext, contextTypes) {
		var context = {};
		if (!isObj(contextTypes) || !isObj(curContext)) {
			return context;
		}
		mapValue(contextTypes, function (_, key) {
			context[key] = curContext[key];
		});
		return context;
	};
	var setContext = function setContext(context, vtree) {
		return vtree.mapTree(function (item) {
			if (isValidComponent(item)) {
				item.context = context;
			}
		});
	};
	var bindRefs = function bindRefs(refs) {
		return function (vnode) {
			if (!vnode.refs) {
				vnode.refs = refs;
			}
		};
	};
	
	var renderComponent = function renderComponent(component, context) {
		var curContext = component.getChildContext();
		curContext = curContext || context;
		setRefs = bindRefs(component.refs);
		var vtree = checkVtree(component.render());
		setRefs = noop$1;
		setContext(curContext, vtree);
		return vtree;
	};
	var neverUpdate = function neverUpdate() {
		return false;
	};
	
	function Vcomponent(type, props) {
		this.type = type;
		this.props = props;
	}
	
	Vcomponent.prototype = new Vtree({
		constructor: Vcomponent,
		vtype: VNODE_TYPE.COMPONENT,
		mapTree: function mapTree(iteratee) {
			iteratee(this);
		},
		initTree: function initTree(parentNode) {
			var Component = this.type;
			var props = this.props;
			var context = this.context;
	
			var component = this.component = new Component(props, getContextByTypes(context, Component.contextTypes));
			var updater = component.$updater;
			var cache = component.$cache;
	
			cache.$context = context;
			updater.isPending = true;
			component.props = component.props || props;
			component.componentWillMount();
			updatePropsAndState(component, component.props, updater.getState(), component.context);
			var vtree = component.vtree = renderComponent(component, context);
			vtree.initTree(parentNode);
			cache.isMounted = true;
			component.node = this.node = vtree.node;
			component.componentDidMount();
			updater.isPending = false;
			this.attachRef();
			updater.emitUpdate();
		},
		destroyTree: function destroyTree() {
			var component = this.component;
	
			if (!component) {
				return;
			}
			component.shouldComponentUpdate = neverUpdate;
			component.forceUpdate = component.setState = noop$1;
			this.detachRef();
			component.componentWillUnmount();
			component.vtree.destroyTree();
			component.$cache.isMounted = false;
			this.component = this.node = component.node = component.refs = component.context = null;
		},
		update: function update(newVtree, parentNode) {
			var component = this.component;
	
			if (!component) {
				return;
			}
			var Component = newVtree.type;
			var nextProps = newVtree.props;
			var nextContext = newVtree.context;
			var updater = component.$updater;
			var $cache = component.$cache;
	
			var context = getContextByTypes(nextContext, Component.contextTypes);
			$cache.$context = nextContext;
			updater.isPending = true;
			component.componentWillReceiveProps(nextProps, context);
			updater.isPending = false;
			updater.emitUpdate(nextProps, context);
			newVtree.component = component;
			newVtree.node = component.node;
			this.updateRef(newVtree);
		}
	});
	
	var compareTwoTree = function compareTwoTree(vtree, newVtree, parentNode) {
		var diffType = diff(vtree, newVtree);
		var $removeNode = undefined;
		var node = undefined;
		switch (diffType) {
			case DIFF_TYPE.CREATE:
				newVtree.initTree(parentNode);
				break;
			case DIFF_TYPE.REMOVE:
				vtree.destroyTree();
				break;
			case DIFF_TYPE.REPLACE:
				node = vtree.node;
				// don't remove the existNode for replacing
				$removeNode = removeNode;
				removeNode = noop$1;
				vtree.destroyTree();
				removeNode = $removeNode;
				newVtree.initTree(function (newNode) {
					replaceNode(parentNode, newNode, node);
				});
				break;
			case DIFF_TYPE.UPDATE:
				vtree.update(newVtree, parentNode);
				break;
		}
	};
	
	var removeNode = function removeNode(node) {
		if (node && node.parentNode) {
			node.parentNode.removeChild(node);
		}
	};
	var appendNode = function appendNode(parentNode, node) {
		if (parentNode && node) {
			// for replace node
			if (isFn(parentNode)) {
				parentNode(node);
			} else {
				parentNode.appendChild(node);
			}
		}
	};
	var replaceNode = function replaceNode(parentNode, newNode, existNode) {
		if (newNode && existNode) {
			parentNode = parentNode || existNode.parentNode;
			parentNode.replaceChild(newNode, existNode);
		}
	};
	
	var createTextNode = function createTextNode(text) {
		return document.createTextNode(text);
	};
	var createElement$1 = function createElement(tagName, props) {
		var node = document.createElement(tagName);
		setProps(node, props);
		return node;
	};
	
	var getVnode = function getVnode(vnode) {
		if (vnode === null || vnode === false) {
			vnode = new Velem('noscript', {});
		} else if (!isObj(vnode)) {
			vnode = new Vtext(vnode);
		}
		return vnode;
	};
	
	var checkVtree = function checkVtree(vtree) {
		if (isUndefined(vtree)) {
			throw new Error('component can not render undefined');
		}
		return getVnode(vtree);
	};
	
	var isValidComponent = function isValidComponent(obj) {
		if (obj == null) {
			return false;
		}
		var vtype = obj.vtype;
		if (vtype === VNODE_TYPE.COMPONENT || vtype === VNODE_TYPE.STATELESS_COMPONENT) {
			return true;
		}
		return false;
	};
	
	var isValidElement = function isValidElement(obj) {
		if (obj == null) {
			return false;
		}
		if (obj.vtype === VNODE_TYPE.ELEMENT || obj.vtype === VNODE_TYPE.COMPONENT) {
			return true;
		}
		return false;
	};
	
	var cloneElement = function cloneElement(originElem, props) {
		for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			children[_key - 2] = arguments[_key];
		}
	
		var type = originElem.type;
		props = extend({}, originElem.props, props);
		var vnode = createElement.apply(undefined, [type, props].concat(children));
		if (vnode.ref === originElem.ref) {
			vnode.refs = originElem.refs;
		}
		return vnode;
	};
	
	var createFactory = function createFactory(type) {
		var factory = function factory() {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}
	
			return createElement.apply(undefined, [type].concat(args));
		};
		factory.type = type;
		return factory;
	};
	
	var createElement = function createElement(type, props) {
		for (var _len3 = arguments.length, children = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
			children[_key3 - 2] = arguments[_key3];
		}
	
		var Vnode = undefined;
		switch (true) {
			case isStr(type):
				Vnode = Velem;
				break;
			case isComponent(type):
				Vnode = Vcomponent;
				break;
			case isStatelessComponent(type):
				Vnode = VstatelessComponent;
				break;
			default:
				throw new Error('React.createElement: unexpect type [ ' + type + ' ]');
		}
		var vnode = new Vnode(type, mergeProps(props, children, type.defaultProps));
		var key = null;
		var ref = null;
		var hasRef = false;
		if (props != null) {
			if (!isUndefined(props.key)) {
				key = '' + props.key;
			}
			if (!isUndefined(props.ref)) {
				ref = props.ref;
				hasRef = true;
			}
		}
		vnode.key = key;
		vnode.ref = ref;
		if (hasRef && Vnode !== VstatelessComponent) {
			handleVnodeWithRef(vnode);
		}
		return vnode;
	};
	
	var only = function only(children) {
		if (children != null && !isArr(children)) {
			return children;
		}
		throw new Error('expect only one child');
	};
	
	var forEach = function forEach(children, iteratee, context) {
		if (children == null) {
			return children;
		}
		if (isArr(children)) {
			forEach$1(children, function (child, index) {
				iteratee.call(context, child, index);
			});
		} else {
			iteratee.call(context, children, 0);
		}
	};
	
	var map = function map(children, iteratee, context) {
		if (children == null) {
			return children;
		}
		var store = [];
		var keyMap = {};
		forEach(children, function (child, index) {
			var data = {};
			data.child = iteratee.call(context, child, index) || child;
			data.isEqual = data.child === child;
			var key = data.key = getKey(child, index);
			if (keyMap.hasOwnProperty(key)) {
				keyMap[key] = keyMap[key] + 1;
			} else {
				keyMap[key] = 0;
			}
			data.index = keyMap[key];
			store.push(data);
		});
		var result = [];
		eachItem(store, function (_ref) {
			var child = _ref.child;
			var key = _ref.key;
			var index = _ref.index;
			var isEqual = _ref.isEqual;
	
			if (child == null || isBln(child)) {
				return;
			}
			if (!isValidElement(child) || key == null) {
				result.push(child);
				return;
			}
			if (keyMap[key] !== 0) {
				key += ':' + index;
			}
			if (!isEqual) {
				key = escapeUserProvidedKey(child.key || '') + '/' + key;
			}
			child = cloneElement(child, { key: key });
			result.push(child);
		});
		return result;
	};
	
	var count = function count(children) {
		var count = 0;
		forEach(children, function () {
			count++;
		});
		return count;
	};
	
	var identity = function identity(obj) {
		return obj;
	};
	var toArray = function toArray(children) {
		return map(children, identity) || [];
	};
	
	var getKey = function getKey(child, index) {
		var key = undefined;
		if (isValidElement(child) && isStr(child.key)) {
			key = '.$' + child.key;
		} else {
			key = '.' + index.toString(36);
		}
		return key;
	};
	
	var userProvidedKeyEscapeRegex = /\/(?!\/)/g;
	var escapeUserProvidedKey = function escapeUserProvidedKey(text) {
		return ('' + text).replace(userProvidedKeyEscapeRegex, '//');
	};
	
	var eachMixin = function eachMixin(mixins, iteratee) {
		eachItem(mixins, function (mixin) {
			if (isArr(mixin.mixins)) {
				eachMixin(mixin.mixins, iteratee);
			}
			iteratee(mixin);
		});
	};
	
	var combineMixinToProto = function combineMixinToProto(proto, mixin) {
		mapValue(mixin, function (value, key) {
			if (key === 'getInitialState') {
				proto.$getInitialStates.push(value);
				return;
			}
			var curValue = proto[key];
			if (isFn(curValue) && isFn(value)) {
				proto[key] = pipe(curValue, value);
			} else {
				proto[key] = value;
			}
		});
	};
	
	var combineMixinToClass = function combineMixinToClass(Component, mixin) {
		if (isObj(mixin.propTypes)) {
			extend(Component.propTypes, mixin.propTypes);
		}
		if (isObj(mixin.contextTypes)) {
			extend(Component.contextTypes, mixin.contextTypes);
		}
		if (isFn(mixin.getDefaultProps)) {
			extend(Component.defaultProps, mixin.getDefaultProps());
		}
		if (isObj(mixin.statics)) {
			extend(Component, mixin.statics);
		}
	};
	
	var bindContext = function bindContext(obj, source) {
		mapValue(source, function (value, key) {
			if (isFn(value)) {
				obj[key] = value.bind(obj);
			}
		});
	};
	
	var Facade = function Facade() {};
	Facade.prototype = Component.prototype;
	
	var getInitialState = function getInitialState() {
		var _this = this;
	
		var state = {};
		var setState = this.setState;
		this.setState = Facade;
		eachItem(this.$getInitialStates, function (getInitialState) {
			if (isFn(getInitialState)) {
				extend(state, getInitialState.call(_this));
			}
		});
		this.setState = setState;
		return state;
	};
	
	var createClass = function createClass(spec) {
		if (!isFn(spec.render)) {
			throw new Error('createClass: spec.render is not function');
		}
		var specMixins = spec.mixins || [];
		var mixins = specMixins.concat(spec);
		spec.mixins = null;
		function Klass(props, context) {
			Component.call(this, props, context);
			this.constructor = Klass;
			spec.autobind !== false && bindContext(this, Klass.prototype);
			this.state = this.getInitialState() || this.state;
		}
		Klass.displayName = spec.displayName;
		Klass.contextTypes = {};
		Klass.propTypes = {};
		Klass.defaultProps = {};
		var proto = Klass.prototype = new Facade();
		proto.$getInitialStates = [];
		eachMixin(mixins, function (mixin) {
			combineMixinToProto(proto, mixin);
			combineMixinToClass(Klass, mixin);
		});
		proto.getInitialState = getInitialState;
		spec.mixins = specMixins;
		return Klass;
	};
	
	var React = {
		cloneElement: cloneElement,
		isValidElement: isValidElement,
		createElement: createElement,
		createFactory: createFactory,
		Component: Component,
		createClass: createClass,
		Children: { only: only, forEach: forEach, map: map, count: count, toArray: toArray },
		PropTypes: PropTypes,
		render: render,
		findDOMNode: findDOMNode,
		unmountComponentAtNode: unmountComponentAtNode
	};
	
	React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
		render: render,
		findDOMNode: findDOMNode,
		unmountComponentAtNode: unmountComponentAtNode
	};
	
	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* components */
	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _Router2 = __webpack_require__(3);
	
	var _Router3 = _interopRequireDefault(_Router2);
	
	exports.Router = _Router3['default'];
	
	var _Link2 = __webpack_require__(37);
	
	var _Link3 = _interopRequireDefault(_Link2);
	
	exports.Link = _Link3['default'];
	
	var _IndexLink2 = __webpack_require__(38);
	
	var _IndexLink3 = _interopRequireDefault(_IndexLink2);
	
	exports.IndexLink = _IndexLink3['default'];
	
	/* components (configuration) */
	
	var _IndexRedirect2 = __webpack_require__(39);
	
	var _IndexRedirect3 = _interopRequireDefault(_IndexRedirect2);
	
	exports.IndexRedirect = _IndexRedirect3['default'];
	
	var _IndexRoute2 = __webpack_require__(41);
	
	var _IndexRoute3 = _interopRequireDefault(_IndexRoute2);
	
	exports.IndexRoute = _IndexRoute3['default'];
	
	var _Redirect2 = __webpack_require__(40);
	
	var _Redirect3 = _interopRequireDefault(_Redirect2);
	
	exports.Redirect = _Redirect3['default'];
	
	var _Route2 = __webpack_require__(42);
	
	var _Route3 = _interopRequireDefault(_Route2);
	
	exports.Route = _Route3['default'];
	
	/* mixins */
	
	var _History2 = __webpack_require__(43);
	
	var _History3 = _interopRequireDefault(_History2);
	
	exports.History = _History3['default'];
	
	var _Lifecycle2 = __webpack_require__(44);
	
	var _Lifecycle3 = _interopRequireDefault(_Lifecycle2);
	
	exports.Lifecycle = _Lifecycle3['default'];
	
	var _RouteContext2 = __webpack_require__(45);
	
	var _RouteContext3 = _interopRequireDefault(_RouteContext2);
	
	exports.RouteContext = _RouteContext3['default'];
	
	/* utils */
	
	var _useRoutes2 = __webpack_require__(26);
	
	var _useRoutes3 = _interopRequireDefault(_useRoutes2);
	
	exports.useRoutes = _useRoutes3['default'];
	
	var _RouteUtils = __webpack_require__(6);
	
	exports.createRoutes = _RouteUtils.createRoutes;
	
	var _RoutingContext2 = __webpack_require__(4);
	
	var _RoutingContext3 = _interopRequireDefault(_RoutingContext2);
	
	exports.RoutingContext = _RoutingContext3['default'];
	
	var _PropTypes2 = __webpack_require__(36);
	
	var _PropTypes3 = _interopRequireDefault(_PropTypes2);
	
	exports.PropTypes = _PropTypes3['default'];
	
	var _match2 = __webpack_require__(46);
	
	var _match3 = _interopRequireDefault(_match2);
	
	exports.match = _match3['default'];
	
	var _Router4 = _interopRequireDefault(_Router2);

	exports['default'] = _Router4['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _warning = __webpack_require__(7);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _historyLibCreateHashHistory = __webpack_require__(10);
	
	var _historyLibCreateHashHistory2 = _interopRequireDefault(_historyLibCreateHashHistory);
	
	var _RouteUtils = __webpack_require__(6);
	
	var _RoutingContext = __webpack_require__(4);
	
	var _RoutingContext2 = _interopRequireDefault(_RoutingContext);
	
	var _useRoutes = __webpack_require__(26);
	
	var _useRoutes2 = _interopRequireDefault(_useRoutes);
	
	var _PropTypes = __webpack_require__(36);
	
	var _React$PropTypes = _react2['default'].PropTypes;
	var func = _React$PropTypes.func;
	var object = _React$PropTypes.object;
	
	/**
	 * A <Router> is a high-level API for automatically setting up
	 * a router that renders a <RoutingContext> with all the props
	 * it needs each time the URL changes.
	 */
	
	var Router = (function (_Component) {
	  _inherits(Router, _Component);
	
	  function Router(props, context) {
	    _classCallCheck(this, Router);
	
	    _Component.call(this, props, context);
	
	    this.state = {
	      location: null,
	      routes: null,
	      params: null,
	      components: null
	    };
	  }
	
	  Router.prototype.handleError = function handleError(error) {
	    if (this.props.onError) {
	      this.props.onError.call(this, error);
	    } else {
	      // Throw errors by default so we don't silently swallow them!
	      throw error; // This error probably occurred in getChildRoutes or getComponents.
	    }
	  };
	
	  Router.prototype.componentWillMount = function componentWillMount() {
	    var _this = this;
	
	    var _props = this.props;
	    var history = _props.history;
	    var children = _props.children;
	    var routes = _props.routes;
	    var parseQueryString = _props.parseQueryString;
	    var stringifyQuery = _props.stringifyQuery;
	
	    var createHistory = history ? function () {
	      return history;
	    } : _historyLibCreateHashHistory2['default'];
	
	    this.history = _useRoutes2['default'](createHistory)({
	      routes: _RouteUtils.createRoutes(routes || children),
	      parseQueryString: parseQueryString,
	      stringifyQuery: stringifyQuery
	    });
	
	    this._unlisten = this.history.listen(function (error, state) {
	      if (error) {
	        _this.handleError(error);
	      } else {
	        _this.setState(state, _this.props.onUpdate);
	      }
	    });
	  };
	
	  /* istanbul ignore next: sanity check */
	
	  Router.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    true ? _warning2['default'](nextProps.history === this.props.history, 'You cannot change <Router history>; it will be ignored') : undefined;
	
	    true ? _warning2['default']((nextProps.routes || nextProps.children) === (this.props.routes || this.props.children), 'You cannot change <Router routes>; it will be ignored') : undefined;
	  };
	
	  Router.prototype.componentWillUnmount = function componentWillUnmount() {
	    if (this._unlisten) this._unlisten();
	  };
	
	  Router.prototype.render = function render() {
	    var _state = this.state;
	    var location = _state.location;
	    var routes = _state.routes;
	    var params = _state.params;
	    var components = _state.components;
	    var _props2 = this.props;
	    var RoutingContext = _props2.RoutingContext;
	    var createElement = _props2.createElement;
	
	    var props = _objectWithoutProperties(_props2, ['RoutingContext', 'createElement']);
	
	    if (location == null) return null; // Async match
	
	    // Only forward non-Router-specific props to routing context, as those are
	    // the only ones that might be custom routing context props.
	    Object.keys(Router.propTypes).forEach(function (propType) {
	      return delete props[propType];
	    });
	
	    return _react2['default'].createElement(RoutingContext, _extends({}, props, {
	      history: this.history,
	      createElement: createElement,
	      location: location,
	      routes: routes,
	      params: params,
	      components: components
	    }));
	  };
	
	  return Router;
	})(_react.Component);
	
	Router.propTypes = {
	  history: object,
	  children: _PropTypes.routes,
	  routes: _PropTypes.routes, // alias for children
	  RoutingContext: func.isRequired,
	  createElement: func,
	  onError: func,
	  onUpdate: func,
	  parseQueryString: func,
	  stringifyQuery: func
	};
	
	Router.defaultProps = {
	  RoutingContext: _RoutingContext2['default']
	};
	
	exports['default'] = Router;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _invariant = __webpack_require__(5);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _RouteUtils = __webpack_require__(6);
	
	var _getRouteParams = __webpack_require__(8);
	
	var _getRouteParams2 = _interopRequireDefault(_getRouteParams);
	
	var _React$PropTypes = _react2['default'].PropTypes;
	var array = _React$PropTypes.array;
	var func = _React$PropTypes.func;
	var object = _React$PropTypes.object;
	
	/**
	 * A <RoutingContext> renders the component tree for a given router state
	 * and sets the history object and the current location in context.
	 */
	
	var RoutingContext = (function (_Component) {
	  _inherits(RoutingContext, _Component);
	
	  function RoutingContext() {
	    _classCallCheck(this, RoutingContext);
	
	    _Component.apply(this, arguments);
	  }
	
	  RoutingContext.prototype.getChildContext = function getChildContext() {
	    var _props = this.props;
	    var history = _props.history;
	    var location = _props.location;
	
	    return { history: history, location: location };
	  };
	
	  RoutingContext.prototype.createElement = function createElement(component, props) {
	    return component == null ? null : this.props.createElement(component, props);
	  };
	
	  RoutingContext.prototype.render = function render() {
	    var _this = this;
	
	    var _props2 = this.props;
	    var history = _props2.history;
	    var location = _props2.location;
	    var routes = _props2.routes;
	    var params = _props2.params;
	    var components = _props2.components;
	
	    var element = null;
	
	    if (components) {
	      element = components.reduceRight(function (element, components, index) {
	        if (components == null) return element; // Don't create new children; use the grandchildren.
	
	        var route = routes[index];
	        var routeParams = _getRouteParams2['default'](route, params);
	        var props = {
	          history: history,
	          location: location,
	          params: params,
	          route: route,
	          routeParams: routeParams,
	          routes: routes
	        };
	
	        if (_RouteUtils.isReactChildren(element)) {
	          props.children = element;
	        } else if (element) {
	          for (var prop in element) {
	            if (element.hasOwnProperty(prop)) props[prop] = element[prop];
	          }
	        }
	
	        if (typeof components === 'object') {
	          var elements = {};
	
	          for (var key in components) {
	            if (components.hasOwnProperty(key)) {
	              // Pass through the key as a prop to createElement to allow
	              // custom createElement functions to know which named component
	              // they're rendering, for e.g. matching up to fetched data.
	              elements[key] = _this.createElement(components[key], _extends({
	                key: key }, props));
	            }
	          }
	
	          return elements;
	        }
	
	        return _this.createElement(components, props);
	      }, element);
	    }
	
	    !(element === null || element === false || _react2['default'].isValidElement(element)) ? true ? _invariant2['default'](false, 'The root route must render a single element') : _invariant2['default'](false) : undefined;
	
	    return element;
	  };
	
	  return RoutingContext;
	})(_react.Component);
	
	RoutingContext.propTypes = {
	  history: object.isRequired,
	  createElement: func.isRequired,
	  location: object.isRequired,
	  routes: array.isRequired,
	  params: object.isRequired,
	  components: array.isRequired
	};
	
	RoutingContext.defaultProps = {
	  createElement: _react2['default'].createElement
	};
	
	RoutingContext.childContextTypes = {
	  history: object.isRequired,
	  location: object.isRequired
	};
	
	exports['default'] = RoutingContext;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (true) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.isReactChildren = isReactChildren;
	exports.createRouteFromReactElement = createRouteFromReactElement;
	exports.createRoutesFromReactChildren = createRoutesFromReactChildren;
	exports.createRoutes = createRoutes;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _warning = __webpack_require__(7);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function isValidChild(object) {
	  return object == null || _react2['default'].isValidElement(object);
	}
	
	function isReactChildren(object) {
	  return isValidChild(object) || Array.isArray(object) && object.every(isValidChild);
	}
	
	function checkPropTypes(componentName, propTypes, props) {
	  componentName = componentName || 'UnknownComponent';
	
	  for (var propName in propTypes) {
	    if (propTypes.hasOwnProperty(propName)) {
	      var error = propTypes[propName](props, propName, componentName);
	
	      /* istanbul ignore if: error logging */
	      if (error instanceof Error) true ? _warning2['default'](false, error.message) : undefined;
	    }
	  }
	}
	
	function createRoute(defaultProps, props) {
	  return _extends({}, defaultProps, props);
	}
	
	function createRouteFromReactElement(element) {
	  var type = element.type;
	  var route = createRoute(type.defaultProps, element.props);
	
	  if (type.propTypes) checkPropTypes(type.displayName || type.name, type.propTypes, route);
	
	  if (route.children) {
	    var childRoutes = createRoutesFromReactChildren(route.children, route);
	
	    if (childRoutes.length) route.childRoutes = childRoutes;
	
	    delete route.children;
	  }
	
	  return route;
	}
	
	/**
	 * Creates and returns a routes object from the given ReactChildren. JSX
	 * provides a convenient way to visualize how routes in the hierarchy are
	 * nested.
	 *
	 *   import { Route, createRoutesFromReactChildren } from 'react-router'
	 *   
	 *   const routes = createRoutesFromReactChildren(
	 *     <Route component={App}>
	 *       <Route path="home" component={Dashboard}/>
	 *       <Route path="news" component={NewsFeed}/>
	 *     </Route>
	 *   )
	 *
	 * Note: This method is automatically used when you provide <Route> children
	 * to a <Router> component.
	 */
	
	function createRoutesFromReactChildren(children, parentRoute) {
	  var routes = [];
	
	  _react2['default'].Children.forEach(children, function (element) {
	    if (_react2['default'].isValidElement(element)) {
	      // Component classes may have a static create* method.
	      if (element.type.createRouteFromReactElement) {
	        var route = element.type.createRouteFromReactElement(element, parentRoute);
	
	        if (route) routes.push(route);
	      } else {
	        routes.push(createRouteFromReactElement(element));
	      }
	    }
	  });
	
	  return routes;
	}
	
	/**
	 * Creates and returns an array of routes from the given object which
	 * may be a JSX route, a plain object route, or an array of either.
	 */
	
	function createRoutes(routes) {
	  if (isReactChildren(routes)) {
	    routes = createRoutesFromReactChildren(routes);
	  } else if (routes && !Array.isArray(routes)) {
	    routes = [routes];
	  }
	
	  return routes;
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = function() {};
	
	if (true) {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }
	
	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }
	
	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}
	
	module.exports = warning;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _PatternUtils = __webpack_require__(9);
	
	/**
	 * Extracts an object of params the given route cares about from
	 * the given params object.
	 */
	function getRouteParams(route, params) {
	  var routeParams = {};
	
	  if (!route.path) return routeParams;
	
	  var paramNames = _PatternUtils.getParamNames(route.path);
	
	  for (var p in params) {
	    if (params.hasOwnProperty(p) && paramNames.indexOf(p) !== -1) routeParams[p] = params[p];
	  }return routeParams;
	}
	
	exports['default'] = getRouteParams;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.compilePattern = compilePattern;
	exports.matchPattern = matchPattern;
	exports.getParamNames = getParamNames;
	exports.getParams = getParams;
	exports.formatPattern = formatPattern;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _invariant = __webpack_require__(5);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	function escapeRegExp(string) {
	  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}
	
	function escapeSource(string) {
	  return escapeRegExp(string).replace(/\/+/g, '/+');
	}
	
	function _compilePattern(pattern) {
	  var regexpSource = '';
	  var paramNames = [];
	  var tokens = [];
	
	  var match = undefined,
	      lastIndex = 0,
	      matcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|\*\*|\*|\(|\)/g;
	  while (match = matcher.exec(pattern)) {
	    if (match.index !== lastIndex) {
	      tokens.push(pattern.slice(lastIndex, match.index));
	      regexpSource += escapeSource(pattern.slice(lastIndex, match.index));
	    }
	
	    if (match[1]) {
	      regexpSource += '([^/?#]+)';
	      paramNames.push(match[1]);
	    } else if (match[0] === '**') {
	      regexpSource += '([\\s\\S]*)';
	      paramNames.push('splat');
	    } else if (match[0] === '*') {
	      regexpSource += '([\\s\\S]*?)';
	      paramNames.push('splat');
	    } else if (match[0] === '(') {
	      regexpSource += '(?:';
	    } else if (match[0] === ')') {
	      regexpSource += ')?';
	    }
	
	    tokens.push(match[0]);
	
	    lastIndex = matcher.lastIndex;
	  }
	
	  if (lastIndex !== pattern.length) {
	    tokens.push(pattern.slice(lastIndex, pattern.length));
	    regexpSource += escapeSource(pattern.slice(lastIndex, pattern.length));
	  }
	
	  return {
	    pattern: pattern,
	    regexpSource: regexpSource,
	    paramNames: paramNames,
	    tokens: tokens
	  };
	}
	
	var CompiledPatternsCache = {};
	
	function compilePattern(pattern) {
	  if (!(pattern in CompiledPatternsCache)) CompiledPatternsCache[pattern] = _compilePattern(pattern);
	
	  return CompiledPatternsCache[pattern];
	}
	
	/**
	 * Attempts to match a pattern on the given pathname. Patterns may use
	 * the following special characters:
	 *
	 * - :paramName     Matches a URL segment up to the next /, ?, or #. The
	 *                  captured string is considered a "param"
	 * - ()             Wraps a segment of the URL that is optional
	 * - *              Consumes (non-greedy) all characters up to the next
	 *                  character in the pattern, or to the end of the URL if
	 *                  there is none
	 * - **             Consumes (greedy) all characters up to the next character
	 *                  in the pattern, or to the end of the URL if there is none
	 *
	 * The return value is an object with the following properties:
	 *
	 * - remainingPathname
	 * - paramNames
	 * - paramValues
	 */
	
	function matchPattern(pattern, pathname) {
	  // Make leading slashes consistent between pattern and pathname.
	  if (pattern.charAt(0) !== '/') {
	    pattern = '/' + pattern;
	  }
	  if (pathname.charAt(0) !== '/') {
	    pathname = '/' + pathname;
	  }
	
	  var _compilePattern2 = compilePattern(pattern);
	
	  var regexpSource = _compilePattern2.regexpSource;
	  var paramNames = _compilePattern2.paramNames;
	  var tokens = _compilePattern2.tokens;
	
	  regexpSource += '/*'; // Capture path separators
	
	  // Special-case patterns like '*' for catch-all routes.
	  var captureRemaining = tokens[tokens.length - 1] !== '*';
	
	  if (captureRemaining) {
	    // This will match newlines in the remaining path.
	    regexpSource += '([\\s\\S]*?)';
	  }
	
	  var match = pathname.match(new RegExp('^' + regexpSource + '$', 'i'));
	
	  var remainingPathname = undefined,
	      paramValues = undefined;
	  if (match != null) {
	    if (captureRemaining) {
	      remainingPathname = match.pop();
	      var matchedPath = match[0].substr(0, match[0].length - remainingPathname.length);
	
	      // If we didn't match the entire pathname, then make sure that the match
	      // we did get ends at a path separator (potentially the one we added
	      // above at the beginning of the path, if the actual match was empty).
	      if (remainingPathname && matchedPath.charAt(matchedPath.length - 1) !== '/') {
	        return {
	          remainingPathname: null,
	          paramNames: paramNames,
	          paramValues: null
	        };
	      }
	    } else {
	      // If this matched at all, then the match was the entire pathname.
	      remainingPathname = '';
	    }
	
	    paramValues = match.slice(1).map(function (v) {
	      return v != null ? decodeURIComponent(v) : v;
	    });
	  } else {
	    remainingPathname = paramValues = null;
	  }
	
	  return {
	    remainingPathname: remainingPathname,
	    paramNames: paramNames,
	    paramValues: paramValues
	  };
	}
	
	function getParamNames(pattern) {
	  return compilePattern(pattern).paramNames;
	}
	
	function getParams(pattern, pathname) {
	  var _matchPattern = matchPattern(pattern, pathname);
	
	  var paramNames = _matchPattern.paramNames;
	  var paramValues = _matchPattern.paramValues;
	
	  if (paramValues != null) {
	    return paramNames.reduce(function (memo, paramName, index) {
	      memo[paramName] = paramValues[index];
	      return memo;
	    }, {});
	  }
	
	  return null;
	}
	
	/**
	 * Returns a version of the given pattern with params interpolated. Throws
	 * if there is a dynamic segment of the pattern for which there is no param.
	 */
	
	function formatPattern(pattern, params) {
	  params = params || {};
	
	  var _compilePattern3 = compilePattern(pattern);
	
	  var tokens = _compilePattern3.tokens;
	
	  var parenCount = 0,
	      pathname = '',
	      splatIndex = 0;
	
	  var token = undefined,
	      paramName = undefined,
	      paramValue = undefined;
	  for (var i = 0, len = tokens.length; i < len; ++i) {
	    token = tokens[i];
	
	    if (token === '*' || token === '**') {
	      paramValue = Array.isArray(params.splat) ? params.splat[splatIndex++] : params.splat;
	
	      !(paramValue != null || parenCount > 0) ? true ? _invariant2['default'](false, 'Missing splat #%s for path "%s"', splatIndex, pattern) : _invariant2['default'](false) : undefined;
	
	      if (paramValue != null) pathname += encodeURI(paramValue);
	    } else if (token === '(') {
	      parenCount += 1;
	    } else if (token === ')') {
	      parenCount -= 1;
	    } else if (token.charAt(0) === ':') {
	      paramName = token.substring(1);
	      paramValue = params[paramName];
	
	      !(paramValue != null || parenCount > 0) ? true ? _invariant2['default'](false, 'Missing "%s" parameter for path "%s"', paramName, pattern) : _invariant2['default'](false) : undefined;
	
	      if (paramValue != null) pathname += encodeURIComponent(paramValue);
	    } else {
	      pathname += token;
	    }
	  }
	
	  return pathname.replace(/\/+/g, '/');
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(7);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(5);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _Actions = __webpack_require__(11);
	
	var _ExecutionEnvironment = __webpack_require__(12);
	
	var _DOMUtils = __webpack_require__(13);
	
	var _DOMStateStorage = __webpack_require__(14);
	
	var _createDOMHistory = __webpack_require__(15);
	
	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);
	
	var _parsePath = __webpack_require__(22);
	
	var _parsePath2 = _interopRequireDefault(_parsePath);
	
	function isAbsolutePath(path) {
	  return typeof path === 'string' && path.charAt(0) === '/';
	}
	
	function ensureSlash() {
	  var path = _DOMUtils.getHashPath();
	
	  if (isAbsolutePath(path)) return true;
	
	  _DOMUtils.replaceHashPath('/' + path);
	
	  return false;
	}
	
	function addQueryStringValueToPath(path, key, value) {
	  return path + (path.indexOf('?') === -1 ? '?' : '&') + (key + '=' + value);
	}
	
	function stripQueryStringValueFromPath(path, key) {
	  return path.replace(new RegExp('[?&]?' + key + '=[a-zA-Z0-9]+'), '');
	}
	
	function getQueryStringValueFromPath(path, key) {
	  var match = path.match(new RegExp('\\?.*?\\b' + key + '=(.+?)\\b'));
	  return match && match[1];
	}
	
	var DefaultQueryKey = '_k';
	
	function createHashHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  !_ExecutionEnvironment.canUseDOM ? true ? _invariant2['default'](false, 'Hash history needs a DOM') : _invariant2['default'](false) : undefined;
	
	  var queryKey = options.queryKey;
	
	  if (queryKey === undefined || !!queryKey) queryKey = typeof queryKey === 'string' ? queryKey : DefaultQueryKey;
	
	  function getCurrentLocation() {
	    var path = _DOMUtils.getHashPath();
	
	    var key = undefined,
	        state = undefined;
	    if (queryKey) {
	      key = getQueryStringValueFromPath(path, queryKey);
	      path = stripQueryStringValueFromPath(path, queryKey);
	
	      if (key) {
	        state = _DOMStateStorage.readState(key);
	      } else {
	        state = null;
	        key = history.createKey();
	        _DOMUtils.replaceHashPath(addQueryStringValueToPath(path, queryKey, key));
	      }
	    } else {
	      key = state = null;
	    }
	
	    var location = _parsePath2['default'](path);
	
	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }
	
	  function startHashChangeListener(_ref) {
	    var transitionTo = _ref.transitionTo;
	
	    function hashChangeListener() {
	      if (!ensureSlash()) return; // Always make sure hashes are preceeded with a /.
	
	      transitionTo(getCurrentLocation());
	    }
	
	    ensureSlash();
	    _DOMUtils.addEventListener(window, 'hashchange', hashChangeListener);
	
	    return function () {
	      _DOMUtils.removeEventListener(window, 'hashchange', hashChangeListener);
	    };
	  }
	
	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;
	
	    if (action === _Actions.POP) return; // Nothing to do.
	
	    var path = (basename || '') + pathname + search;
	
	    if (queryKey) {
	      path = addQueryStringValueToPath(path, queryKey, key);
	      _DOMStateStorage.saveState(key, state);
	    } else {
	      // Drop key and state.
	      location.key = location.state = null;
	    }
	
	    var currentHash = _DOMUtils.getHashPath();
	
	    if (action === _Actions.PUSH) {
	      if (currentHash !== path) {
	        window.location.hash = path;
	      } else {
	        true ? _warning2['default'](false, 'You cannot PUSH the same path using hash history') : undefined;
	      }
	    } else if (currentHash !== path) {
	      // REPLACE
	      _DOMUtils.replaceHashPath(path);
	    }
	  }
	
	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));
	
	  var listenerCount = 0,
	      stopHashChangeListener = undefined;
	
	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);
	
	    var unlisten = history.listenBefore(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }
	
	  function listen(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);
	
	    var unlisten = history.listen(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }
	
	  function push(location) {
	    true ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.push(location);
	  }
	
	  function replace(location) {
	    true ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.replace(location);
	  }
	
	  var goIsSupportedWithoutReload = _DOMUtils.supportsGoWithoutReloadUsingHash();
	
	  function go(n) {
	    true ? _warning2['default'](goIsSupportedWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : undefined;
	
	    history.go(n);
	  }
	
	  function createHref(path) {
	    return '#' + history.createHref(path);
	  }
	
	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);
	
	    history.registerTransitionHook(hook);
	  }
	
	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);
	
	    if (--listenerCount === 0) stopHashChangeListener();
	  }
	
	  // deprecated
	  function pushState(state, path) {
	    true ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.pushState(state, path);
	  }
	
	  // deprecated
	  function replaceState(state, path) {
	    true ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.replaceState(state, path);
	  }
	
	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    push: push,
	    replace: replace,
	    go: go,
	    createHref: createHref,
	
	    registerTransitionHook: registerTransitionHook, // deprecated - warning is in createHistory
	    unregisterTransitionHook: unregisterTransitionHook, // deprecated - warning is in createHistory
	    pushState: pushState, // deprecated - warning is in createHistory
	    replaceState: replaceState // deprecated - warning is in createHistory
	  });
	}
	
	exports['default'] = createHashHistory;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Indicates that navigation was caused by a call to history.push.
	 */
	'use strict';
	
	exports.__esModule = true;
	var PUSH = 'PUSH';
	
	exports.PUSH = PUSH;
	/**
	 * Indicates that navigation was caused by a call to history.replace.
	 */
	var REPLACE = 'REPLACE';
	
	exports.REPLACE = REPLACE;
	/**
	 * Indicates that navigation was caused by some other action such
	 * as using a browser's back/forward buttons and/or manually manipulating
	 * the URL in a browser's location bar. This is the default.
	 *
	 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
	 * for more information.
	 */
	var POP = 'POP';
	
	exports.POP = POP;
	exports['default'] = {
	  PUSH: PUSH,
	  REPLACE: REPLACE,
	  POP: POP
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	exports.canUseDOM = canUseDOM;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.addEventListener = addEventListener;
	exports.removeEventListener = removeEventListener;
	exports.getHashPath = getHashPath;
	exports.replaceHashPath = replaceHashPath;
	exports.getWindowPath = getWindowPath;
	exports.go = go;
	exports.getUserConfirmation = getUserConfirmation;
	exports.supportsHistory = supportsHistory;
	exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;
	
	function addEventListener(node, event, listener) {
	  if (node.addEventListener) {
	    node.addEventListener(event, listener, false);
	  } else {
	    node.attachEvent('on' + event, listener);
	  }
	}
	
	function removeEventListener(node, event, listener) {
	  if (node.removeEventListener) {
	    node.removeEventListener(event, listener, false);
	  } else {
	    node.detachEvent('on' + event, listener);
	  }
	}
	
	function getHashPath() {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  return window.location.href.split('#')[1] || '';
	}
	
	function replaceHashPath(path) {
	  window.location.replace(window.location.pathname + window.location.search + '#' + path);
	}
	
	function getWindowPath() {
	  return window.location.pathname + window.location.search + window.location.hash;
	}
	
	function go(n) {
	  if (n) window.history.go(n);
	}
	
	function getUserConfirmation(message, callback) {
	  callback(window.confirm(message));
	}
	
	/**
	 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
	 *
	 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
	 */
	
	function supportsHistory() {
	  var ua = navigator.userAgent;
	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
	    return false;
	  }
	  // FIXME: Work around our browser history not working correctly on Chrome
	  // iOS: https://github.com/rackt/react-router/issues/2565
	  if (ua.indexOf('CriOS') !== -1) {
	    return false;
	  }
	  return window.history && 'pushState' in window.history;
	}
	
	/**
	 * Returns false if using go(n) with hash history causes a full page reload.
	 */
	
	function supportsGoWithoutReloadUsingHash() {
	  var ua = navigator.userAgent;
	  return ua.indexOf('Firefox') === -1;
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*eslint-disable no-empty */
	'use strict';
	
	exports.__esModule = true;
	exports.saveState = saveState;
	exports.readState = readState;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(7);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var KeyPrefix = '@@History/';
	var QuotaExceededError = 'QuotaExceededError';
	var SecurityError = 'SecurityError';
	
	function createKey(key) {
	  return KeyPrefix + key;
	}
	
	function saveState(key, state) {
	  try {
	    window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      true ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;
	
	      return;
	    }
	
	    if (error.name === QuotaExceededError && window.sessionStorage.length === 0) {
	      // Safari "private mode" throws QuotaExceededError.
	      true ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;
	
	      return;
	    }
	
	    throw error;
	  }
	}
	
	function readState(key) {
	  var json = undefined;
	  try {
	    json = window.sessionStorage.getItem(createKey(key));
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      true ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;
	
	      return null;
	    }
	  }
	
	  if (json) {
	    try {
	      return JSON.parse(json);
	    } catch (error) {
	      // Ignore invalid JSON.
	    }
	  }
	
	  return null;
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _invariant = __webpack_require__(5);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _ExecutionEnvironment = __webpack_require__(12);
	
	var _DOMUtils = __webpack_require__(13);
	
	var _createHistory = __webpack_require__(16);
	
	var _createHistory2 = _interopRequireDefault(_createHistory);
	
	function createDOMHistory(options) {
	  var history = _createHistory2['default'](_extends({
	    getUserConfirmation: _DOMUtils.getUserConfirmation
	  }, options, {
	    go: _DOMUtils.go
	  }));
	
	  function listen(listener) {
	    !_ExecutionEnvironment.canUseDOM ? true ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;
	
	    return history.listen(listener);
	  }
	
	  return _extends({}, history, {
	    listen: listen
	  });
	}
	
	exports['default'] = createDOMHistory;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	//import warning from 'warning'
	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _deepEqual = __webpack_require__(17);
	
	var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
	var _AsyncUtils = __webpack_require__(20);
	
	var _Actions = __webpack_require__(11);
	
	var _createLocation2 = __webpack_require__(21);
	
	var _createLocation3 = _interopRequireDefault(_createLocation2);
	
	var _runTransitionHook = __webpack_require__(24);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _parsePath = __webpack_require__(22);
	
	var _parsePath2 = _interopRequireDefault(_parsePath);
	
	var _deprecate = __webpack_require__(25);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	function createRandomKey(length) {
	  return Math.random().toString(36).substr(2, length);
	}
	
	function locationsAreEqual(a, b) {
	  return a.pathname === b.pathname && a.search === b.search &&
	  //a.action === b.action && // Different action !== location change.
	  a.key === b.key && _deepEqual2['default'](a.state, b.state);
	}
	
	var DefaultKeyLength = 6;
	
	function createHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var getCurrentLocation = options.getCurrentLocation;
	  var finishTransition = options.finishTransition;
	  var saveState = options.saveState;
	  var go = options.go;
	  var keyLength = options.keyLength;
	  var getUserConfirmation = options.getUserConfirmation;
	
	  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;
	
	  var transitionHooks = [];
	
	  function listenBefore(hook) {
	    transitionHooks.push(hook);
	
	    return function () {
	      transitionHooks = transitionHooks.filter(function (item) {
	        return item !== hook;
	      });
	    };
	  }
	
	  var allKeys = [];
	  var changeListeners = [];
	  var location = undefined;
	
	  function getCurrent() {
	    if (pendingLocation && pendingLocation.action === _Actions.POP) {
	      return allKeys.indexOf(pendingLocation.key);
	    } else if (location) {
	      return allKeys.indexOf(location.key);
	    } else {
	      return -1;
	    }
	  }
	
	  function updateLocation(newLocation) {
	    var current = getCurrent();
	
	    location = newLocation;
	
	    if (location.action === _Actions.PUSH) {
	      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
	    } else if (location.action === _Actions.REPLACE) {
	      allKeys[current] = location.key;
	    }
	
	    changeListeners.forEach(function (listener) {
	      listener(location);
	    });
	  }
	
	  function listen(listener) {
	    changeListeners.push(listener);
	
	    if (location) {
	      listener(location);
	    } else {
	      var _location = getCurrentLocation();
	      allKeys = [_location.key];
	      updateLocation(_location);
	    }
	
	    return function () {
	      changeListeners = changeListeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  }
	
	  function confirmTransitionTo(location, callback) {
	    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
	      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
	        if (result != null) {
	          done(result);
	        } else {
	          next();
	        }
	      });
	    }, function (message) {
	      if (getUserConfirmation && typeof message === 'string') {
	        getUserConfirmation(message, function (ok) {
	          callback(ok !== false);
	        });
	      } else {
	        callback(message !== false);
	      }
	    });
	  }
	
	  var pendingLocation = undefined;
	
	  function transitionTo(nextLocation) {
	    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.
	
	    pendingLocation = nextLocation;
	
	    confirmTransitionTo(nextLocation, function (ok) {
	      if (pendingLocation !== nextLocation) return; // Transition was interrupted.
	
	      if (ok) {
	        // treat PUSH to current path like REPLACE to be consistent with browsers
	        if (nextLocation.action === _Actions.PUSH) {
	          var prevPath = createPath(location);
	          var nextPath = createPath(nextLocation);
	
	          if (nextPath === prevPath) nextLocation.action = _Actions.REPLACE;
	        }
	
	        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
	      } else if (location && nextLocation.action === _Actions.POP) {
	        var prevIndex = allKeys.indexOf(location.key);
	        var nextIndex = allKeys.indexOf(nextLocation.key);
	
	        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
	      }
	    });
	  }
	
	  function push(location) {
	    transitionTo(createLocation(location, _Actions.PUSH, createKey()));
	  }
	
	  function replace(location) {
	    transitionTo(createLocation(location, _Actions.REPLACE, createKey()));
	  }
	
	  function goBack() {
	    go(-1);
	  }
	
	  function goForward() {
	    go(1);
	  }
	
	  function createKey() {
	    return createRandomKey(keyLength);
	  }
	
	  function createPath(location) {
	    if (location == null || typeof location === 'string') return location;
	
	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;
	
	    var result = pathname;
	
	    if (search) result += search;
	
	    if (hash) result += hash;
	
	    return result;
	  }
	
	  function createHref(location) {
	    return createPath(location);
	  }
	
	  function createLocation(location, action) {
	    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];
	
	    if (typeof action === 'object') {
	      //warning(
	      //  false,
	      //  'The state (2nd) argument to history.createLocation is deprecated; use a ' +
	      //  'location descriptor instead'
	      //)
	
	      if (typeof location === 'string') location = _parsePath2['default'](location);
	
	      location = _extends({}, location, { state: action });
	
	      action = key;
	      key = arguments[3] || createKey();
	    }
	
	    return _createLocation3['default'](location, action, key);
	  }
	
	  // deprecated
	  function setState(state) {
	    if (location) {
	      updateLocationState(location, state);
	      updateLocation(location);
	    } else {
	      updateLocationState(getCurrentLocation(), state);
	    }
	  }
	
	  function updateLocationState(location, state) {
	    location.state = _extends({}, location.state, state);
	    saveState(location.key, location.state);
	  }
	
	  // deprecated
	  function registerTransitionHook(hook) {
	    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
	  }
	
	  // deprecated
	  function unregisterTransitionHook(hook) {
	    transitionHooks = transitionHooks.filter(function (item) {
	      return item !== hook;
	    });
	  }
	
	  // deprecated
	  function pushState(state, path) {
	    if (typeof path === 'string') path = _parsePath2['default'](path);
	
	    push(_extends({ state: state }, path));
	  }
	
	  // deprecated
	  function replaceState(state, path) {
	    if (typeof path === 'string') path = _parsePath2['default'](path);
	
	    replace(_extends({ state: state }, path));
	  }
	
	  return {
	    listenBefore: listenBefore,
	    listen: listen,
	    transitionTo: transitionTo,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    createKey: createKey,
	    createPath: createPath,
	    createHref: createHref,
	    createLocation: createLocation,
	
	    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
	    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
	    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead'),
	    pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	    replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	  };
	}
	
	exports['default'] = createHistory;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(18);
	var isArguments = __webpack_require__(19);
	
	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	
	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();
	
	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;
	
	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}
	
	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}
	
	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}
	
	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ },
/* 18 */
/***/ function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;
	
	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ },
/* 19 */
/***/ function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';
	
	exports = module.exports = supportsArgumentsClass ? supported : unsupported;
	
	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};
	
	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports.loopAsync = loopAsync;
	
	function loopAsync(turns, work, callback) {
	  var currentTurn = 0;
	  var isDone = false;
	
	  function done() {
	    isDone = true;
	    callback.apply(this, arguments);
	  }
	
	  function next() {
	    if (isDone) return;
	
	    if (currentTurn < turns) {
	      work.call(this, currentTurn++, next, done);
	    } else {
	      done.apply(this, arguments);
	    }
	  }
	
	  next();
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	//import warning from 'warning'
	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _Actions = __webpack_require__(11);
	
	var _parsePath = __webpack_require__(22);
	
	var _parsePath2 = _interopRequireDefault(_parsePath);
	
	function createLocation() {
	  var location = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
	  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	  var _fourthArg = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
	
	  if (typeof location === 'string') location = _parsePath2['default'](location);
	
	  if (typeof action === 'object') {
	    //warning(
	    //  false,
	    //  'The state (2nd) argument to createLocation is deprecated; use a ' +
	    //  'location descriptor instead'
	    //)
	
	    location = _extends({}, location, { state: action });
	
	    action = key || _Actions.POP;
	    key = _fourthArg;
	  }
	
	  var pathname = location.pathname || '/';
	  var search = location.search || '';
	  var hash = location.hash || '';
	  var state = location.state || null;
	
	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash,
	    state: state,
	    action: action,
	    key: key
	  };
	}
	
	exports['default'] = createLocation;
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(7);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _extractPath = __webpack_require__(23);
	
	var _extractPath2 = _interopRequireDefault(_extractPath);
	
	function parsePath(path) {
	  var pathname = _extractPath2['default'](path);
	  var search = '';
	  var hash = '';
	
	  true ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;
	
	  var hashIndex = pathname.indexOf('#');
	  if (hashIndex !== -1) {
	    hash = pathname.substring(hashIndex);
	    pathname = pathname.substring(0, hashIndex);
	  }
	
	  var searchIndex = pathname.indexOf('?');
	  if (searchIndex !== -1) {
	    search = pathname.substring(searchIndex);
	    pathname = pathname.substring(0, searchIndex);
	  }
	
	  if (pathname === '') pathname = '/';
	
	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash
	  };
	}
	
	exports['default'] = parsePath;
	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	function extractPath(string) {
	  var match = string.match(/^https?:\/\/[^\/]*/);
	
	  if (match == null) return string;
	
	  return string.substring(match[0].length);
	}
	
	exports["default"] = extractPath;
	module.exports = exports["default"];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(7);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function runTransitionHook(hook, location, callback) {
	  var result = hook(location, callback);
	
	  if (hook.length < 2) {
	    // Assume the hook runs synchronously and automatically
	    // call the callback with the return value.
	    callback(result);
	  } else {
	    true ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
	  }
	}
	
	exports['default'] = runTransitionHook;
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports) {

	//import warning from 'warning'
	
	"use strict";
	
	exports.__esModule = true;
	function deprecate(fn) {
	  return fn;
	  //return function () {
	  //  warning(false, '[history] ' + message)
	  //  return fn.apply(this, arguments)
	  //}
	}
	
	exports["default"] = deprecate;
	module.exports = exports["default"];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var _warning = __webpack_require__(7);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _historyLibActions = __webpack_require__(11);
	
	var _historyLibUseQueries = __webpack_require__(29);
	
	var _historyLibUseQueries2 = _interopRequireDefault(_historyLibUseQueries);
	
	var _computeChangedRoutes2 = __webpack_require__(32);
	
	var _computeChangedRoutes3 = _interopRequireDefault(_computeChangedRoutes2);
	
	var _TransitionUtils = __webpack_require__(27);
	
	var _isActive2 = __webpack_require__(33);
	
	var _isActive3 = _interopRequireDefault(_isActive2);
	
	var _getComponents = __webpack_require__(34);
	
	var _getComponents2 = _interopRequireDefault(_getComponents);
	
	var _matchRoutes = __webpack_require__(35);
	
	var _matchRoutes2 = _interopRequireDefault(_matchRoutes);
	
	function hasAnyProperties(object) {
	  for (var p in object) {
	    if (object.hasOwnProperty(p)) return true;
	  }return false;
	}
	
	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know about routing.
	 *
	 * Enhances history objects with the following methods:
	 *
	 * - listen((error, nextState) => {})
	 * - listenBeforeLeavingRoute(route, (nextLocation) => {})
	 * - match(location, (error, redirectLocation, nextState) => {})
	 * - isActive(pathname, query, indexOnly=false)
	 */
	function useRoutes(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var routes = options.routes;
	
	    var historyOptions = _objectWithoutProperties(options, ['routes']);
	
	    var history = _historyLibUseQueries2['default'](createHistory)(historyOptions);
	    var state = {};
	
	    function isActive(pathname, query) {
	      var indexOnly = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	
	      return _isActive3['default'](pathname, query, indexOnly, state.location, state.routes, state.params);
	    }
	
	    function createLocationFromRedirectInfo(_ref) {
	      var pathname = _ref.pathname;
	      var query = _ref.query;
	      var state = _ref.state;
	
	      return history.createLocation(history.createPath(pathname, query), state, _historyLibActions.REPLACE);
	    }
	
	    var partialNextState = undefined;
	
	    function match(location, callback) {
	      if (partialNextState && partialNextState.location === location) {
	        // Continue from where we left off.
	        finishMatch(partialNextState, callback);
	      } else {
	        _matchRoutes2['default'](routes, location, function (error, nextState) {
	          if (error) {
	            callback(error);
	          } else if (nextState) {
	            finishMatch(_extends({}, nextState, { location: location }), callback);
	          } else {
	            callback();
	          }
	        });
	      }
	    }
	
	    function finishMatch(nextState, callback) {
	      var _computeChangedRoutes = _computeChangedRoutes3['default'](state, nextState);
	
	      var leaveRoutes = _computeChangedRoutes.leaveRoutes;
	      var enterRoutes = _computeChangedRoutes.enterRoutes;
	
	      _TransitionUtils.runLeaveHooks(leaveRoutes);
	
	      _TransitionUtils.runEnterHooks(enterRoutes, nextState, function (error, redirectInfo) {
	        if (error) {
	          callback(error);
	        } else if (redirectInfo) {
	          callback(null, createLocationFromRedirectInfo(redirectInfo));
	        } else {
	          // TODO: Fetch components after state is updated.
	          _getComponents2['default'](nextState, function (error, components) {
	            if (error) {
	              callback(error);
	            } else {
	              // TODO: Make match a pure function and have some other API
	              // for "match and update state".
	              callback(null, null, state = _extends({}, nextState, { components: components }));
	            }
	          });
	        }
	      });
	    }
	
	    var RouteGuid = 1;
	
	    function getRouteID(route) {
	      return route.__id__ || (route.__id__ = RouteGuid++);
	    }
	
	    var RouteHooks = {};
	
	    function getRouteHooksForRoutes(routes) {
	      return routes.reduce(function (hooks, route) {
	        hooks.push.apply(hooks, RouteHooks[getRouteID(route)]);
	        return hooks;
	      }, []);
	    }
	
	    function transitionHook(location, callback) {
	      _matchRoutes2['default'](routes, location, function (error, nextState) {
	        if (nextState == null) {
	          // TODO: We didn't actually match anything, but hang
	          // onto error/nextState so we don't have to matchRoutes
	          // again in the listen callback.
	          callback();
	          return;
	        }
	
	        // Cache some state here so we don't have to
	        // matchRoutes() again in the listen callback.
	        partialNextState = _extends({}, nextState, { location: location });
	
	        var hooks = getRouteHooksForRoutes(_computeChangedRoutes3['default'](state, partialNextState).leaveRoutes);
	
	        var result = undefined;
	        for (var i = 0, len = hooks.length; result == null && i < len; ++i) {
	          // Passing the location arg here indicates to
	          // the user that this is a transition hook.
	          result = hooks[i](location);
	        }
	
	        callback(result);
	      });
	    }
	
	    function beforeUnloadHook() {
	      // Synchronously check to see if any route hooks want
	      // to prevent the current window/tab from closing.
	      if (state.routes) {
	        var hooks = getRouteHooksForRoutes(state.routes);
	
	        var message = undefined;
	        for (var i = 0, len = hooks.length; typeof message !== 'string' && i < len; ++i) {
	          // Passing no args indicates to the user that this is a
	          // beforeunload hook. We don't know the next location.
	          message = hooks[i]();
	        }
	
	        return message;
	      }
	    }
	
	    var unlistenBefore = undefined,
	        unlistenBeforeUnload = undefined;
	
	    /**
	     * Registers the given hook function to run before leaving the given route.
	     *
	     * During a normal transition, the hook function receives the next location
	     * as its only argument and must return either a) a prompt message to show
	     * the user, to make sure they want to leave the page or b) false, to prevent
	     * the transition.
	     *
	     * During the beforeunload event (in browsers) the hook receives no arguments.
	     * In this case it must return a prompt message to prevent the transition.
	     *
	     * Returns a function that may be used to unbind the listener.
	     */
	    function listenBeforeLeavingRoute(route, hook) {
	      // TODO: Warn if they register for a route that isn't currently
	      // active. They're probably doing something wrong, like re-creating
	      // route objects on every location change.
	      var routeID = getRouteID(route);
	      var hooks = RouteHooks[routeID];
	
	      if (hooks == null) {
	        var thereWereNoRouteHooks = !hasAnyProperties(RouteHooks);
	
	        hooks = RouteHooks[routeID] = [hook];
	
	        if (thereWereNoRouteHooks) {
	          // setup transition & beforeunload hooks
	          unlistenBefore = history.listenBefore(transitionHook);
	
	          if (history.listenBeforeUnload) unlistenBeforeUnload = history.listenBeforeUnload(beforeUnloadHook);
	        }
	      } else if (hooks.indexOf(hook) === -1) {
	        hooks.push(hook);
	      }
	
	      return function () {
	        var hooks = RouteHooks[routeID];
	
	        if (hooks != null) {
	          var newHooks = hooks.filter(function (item) {
	            return item !== hook;
	          });
	
	          if (newHooks.length === 0) {
	            delete RouteHooks[routeID];
	
	            if (!hasAnyProperties(RouteHooks)) {
	              // teardown transition & beforeunload hooks
	              if (unlistenBefore) {
	                unlistenBefore();
	                unlistenBefore = null;
	              }
	
	              if (unlistenBeforeUnload) {
	                unlistenBeforeUnload();
	                unlistenBeforeUnload = null;
	              }
	            }
	          } else {
	            RouteHooks[routeID] = newHooks;
	          }
	        }
	      };
	    }
	
	    /**
	     * This is the API for stateful environments. As the location
	     * changes, we update state and call the listener. We can also
	     * gracefully handle errors and redirects.
	     */
	    function listen(listener) {
	      // TODO: Only use a single history listener. Otherwise we'll
	      // end up with multiple concurrent calls to match.
	      return history.listen(function (location) {
	        if (state.location === location) {
	          listener(null, state);
	        } else {
	          match(location, function (error, redirectLocation, nextState) {
	            if (error) {
	              listener(error);
	            } else if (redirectLocation) {
	              history.transitionTo(redirectLocation);
	            } else if (nextState) {
	              listener(null, nextState);
	            } else {
	              true ? _warning2['default'](false, 'Location "%s" did not match any routes', location.pathname + location.search + location.hash) : undefined;
	            }
	          });
	        }
	      });
	    }
	
	    return _extends({}, history, {
	      isActive: isActive,
	      match: match,
	      listenBeforeLeavingRoute: listenBeforeLeavingRoute,
	      listen: listen
	    });
	  };
	}
	
	exports['default'] = useRoutes;
	module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.runEnterHooks = runEnterHooks;
	exports.runLeaveHooks = runLeaveHooks;
	
	var _AsyncUtils = __webpack_require__(28);
	
	function createEnterHook(hook, route) {
	  return function (a, b, callback) {
	    hook.apply(route, arguments);
	
	    if (hook.length < 3) {
	      // Assume hook executes synchronously and
	      // automatically call the callback.
	      callback();
	    }
	  };
	}
	
	function getEnterHooks(routes) {
	  return routes.reduce(function (hooks, route) {
	    if (route.onEnter) hooks.push(createEnterHook(route.onEnter, route));
	
	    return hooks;
	  }, []);
	}
	
	/**
	 * Runs all onEnter hooks in the given array of routes in order
	 * with onEnter(nextState, replaceState, callback) and calls
	 * callback(error, redirectInfo) when finished. The first hook
	 * to use replaceState short-circuits the loop.
	 *
	 * If a hook needs to run asynchronously, it may use the callback
	 * function. However, doing so will cause the transition to pause,
	 * which could lead to a non-responsive UI if the hook is slow.
	 */
	
	function runEnterHooks(routes, nextState, callback) {
	  var hooks = getEnterHooks(routes);
	
	  if (!hooks.length) {
	    callback();
	    return;
	  }
	
	  var redirectInfo = undefined;
	  function replaceState(state, pathname, query) {
	    redirectInfo = { pathname: pathname, query: query, state: state };
	  }
	
	  _AsyncUtils.loopAsync(hooks.length, function (index, next, done) {
	    hooks[index](nextState, replaceState, function (error) {
	      if (error || redirectInfo) {
	        done(error, redirectInfo); // No need to continue.
	      } else {
	          next();
	        }
	    });
	  }, callback);
	}
	
	/**
	 * Runs all onLeave hooks in the given array of routes in order.
	 */
	
	function runLeaveHooks(routes) {
	  for (var i = 0, len = routes.length; i < len; ++i) {
	    if (routes[i].onLeave) routes[i].onLeave.call(routes[i]);
	  }
	}

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports.loopAsync = loopAsync;
	exports.mapAsync = mapAsync;
	
	function loopAsync(turns, work, callback) {
	  var currentTurn = 0,
	      isDone = false;
	
	  function done() {
	    isDone = true;
	    callback.apply(this, arguments);
	  }
	
	  function next() {
	    if (isDone) return;
	
	    if (currentTurn < turns) {
	      work.call(this, currentTurn++, next, done);
	    } else {
	      done.apply(this, arguments);
	    }
	  }
	
	  next();
	}
	
	function mapAsync(array, work, callback) {
	  var length = array.length;
	  var values = [];
	
	  if (length === 0) return callback(null, values);
	
	  var isDone = false,
	      doneCount = 0;
	
	  function done(index, error, value) {
	    if (isDone) return;
	
	    if (error) {
	      isDone = true;
	      callback(error);
	    } else {
	      values[index] = value;
	
	      isDone = ++doneCount === length;
	
	      if (isDone) callback(null, values);
	    }
	  }
	
	  array.forEach(function (item, index) {
	    work(item, index, function (error, value) {
	      done(index, error, value);
	    });
	  });
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var _warning = __webpack_require__(7);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _queryString = __webpack_require__(30);
	
	var _runTransitionHook = __webpack_require__(24);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _parsePath = __webpack_require__(22);
	
	var _parsePath2 = _interopRequireDefault(_parsePath);
	
	var _deprecate = __webpack_require__(25);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	var SEARCH_BASE_KEY = '$searchBase';
	
	function defaultStringifyQuery(query) {
	  return _queryString.stringify(query).replace(/%20/g, '+');
	}
	
	var defaultParseQueryString = _queryString.parse;
	
	function isNestedObject(object) {
	  for (var p in object) {
	    if (object.hasOwnProperty(p) && typeof object[p] === 'object' && !Array.isArray(object[p]) && object[p] !== null) return true;
	  }return false;
	}
	
	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know how to handle URL queries.
	 */
	function useQueries(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var stringifyQuery = options.stringifyQuery;
	    var parseQueryString = options.parseQueryString;
	
	    var historyOptions = _objectWithoutProperties(options, ['stringifyQuery', 'parseQueryString']);
	
	    var history = createHistory(historyOptions);
	
	    if (typeof stringifyQuery !== 'function') stringifyQuery = defaultStringifyQuery;
	
	    if (typeof parseQueryString !== 'function') parseQueryString = defaultParseQueryString;
	
	    function addQuery(location) {
	      if (location.query == null) {
	        var search = location.search;
	
	        location.query = parseQueryString(search.substring(1));
	        location[SEARCH_BASE_KEY] = { search: search, searchBase: '' };
	      }
	
	      // TODO: Instead of all the book-keeping here, this should just strip the
	      // stringified query from the search.
	
	      return location;
	    }
	
	    function appendQuery(location, query) {
	      var _extends2;
	
	      var queryString = undefined;
	      if (!query || (queryString = stringifyQuery(query)) === '') return location;
	
	      true ? _warning2['default'](stringifyQuery !== defaultStringifyQuery || !isNestedObject(query), 'useQueries does not stringify nested query objects by default; ' + 'use a custom stringifyQuery function') : undefined;
	
	      if (typeof location === 'string') location = _parsePath2['default'](location);
	
	      var searchBaseSpec = location[SEARCH_BASE_KEY];
	      var searchBase = undefined;
	      if (searchBaseSpec && location.search === searchBaseSpec.search) {
	        searchBase = searchBaseSpec.searchBase;
	      } else {
	        searchBase = location.search || '';
	      }
	
	      var search = searchBase + (searchBase ? '&' : '?') + queryString;
	
	      return _extends({}, location, (_extends2 = {
	        search: search
	      }, _extends2[SEARCH_BASE_KEY] = { search: search, searchBase: searchBase }, _extends2));
	    }
	
	    // Override all read methods with query-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addQuery(location), callback);
	      });
	    }
	
	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addQuery(location));
	      });
	    }
	
	    // Override all write methods with query-aware versions.
	    function push(location) {
	      history.push(appendQuery(location, location.query));
	    }
	
	    function replace(location) {
	      history.replace(appendQuery(location, location.query));
	    }
	
	    function createPath(location, query) {
	      //warning(
	      //  !query,
	      //  'the query argument to createPath is deprecated; use a location descriptor instead'
	      //)
	      return history.createPath(appendQuery(location, query || location.query));
	    }
	
	    function createHref(location, query) {
	      //warning(
	      //  !query,
	      //  'the query argument to createHref is deprecated; use a location descriptor instead'
	      //)
	      return history.createHref(appendQuery(location, query || location.query));
	    }
	
	    function createLocation() {
	      return addQuery(history.createLocation.apply(history, arguments));
	    }
	
	    // deprecated
	    function pushState(state, path, query) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);
	
	      push(_extends({ state: state }, path, { query: query }));
	    }
	
	    // deprecated
	    function replaceState(state, path, query) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);
	
	      replace(_extends({ state: state }, path, { query: query }));
	    }
	
	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,
	
	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}
	
	exports['default'] = useQueries;
	module.exports = exports['default'];

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(31);
	
	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};
	
	exports.parse = function (str) {
		if (typeof str !== 'string') {
			return {};
		}
	
		str = str.trim().replace(/^(\?|#|&)/, '');
	
		if (!str) {
			return {};
		}
	
		return str.split('&').reduce(function (ret, param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;
	
			key = decodeURIComponent(key);
	
			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);
	
			if (!ret.hasOwnProperty(key)) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}
	
			return ret;
		}, {});
	};
	
	exports.stringify = function (obj) {
		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];
	
			if (val === undefined) {
				return '';
			}
	
			if (val === null) {
				return key;
			}
	
			if (Array.isArray(val)) {
				return val.sort().map(function (val2) {
					return strictUriEncode(key) + '=' + strictUriEncode(val2);
				}).join('&');
			}
	
			return strictUriEncode(key) + '=' + strictUriEncode(val);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16);
		});
	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _PatternUtils = __webpack_require__(9);
	
	function routeParamsChanged(route, prevState, nextState) {
	  if (!route.path) return false;
	
	  var paramNames = _PatternUtils.getParamNames(route.path);
	
	  return paramNames.some(function (paramName) {
	    return prevState.params[paramName] !== nextState.params[paramName];
	  });
	}
	
	/**
	 * Returns an object of { leaveRoutes, enterRoutes } determined by
	 * the change from prevState to nextState. We leave routes if either
	 * 1) they are not in the next state or 2) they are in the next state
	 * but their params have changed (i.e. /users/123 => /users/456).
	 *
	 * leaveRoutes are ordered starting at the leaf route of the tree
	 * we're leaving up to the common parent route. enterRoutes are ordered
	 * from the top of the tree we're entering down to the leaf route.
	 */
	function computeChangedRoutes(prevState, nextState) {
	  var prevRoutes = prevState && prevState.routes;
	  var nextRoutes = nextState.routes;
	
	  var leaveRoutes = undefined,
	      enterRoutes = undefined;
	  if (prevRoutes) {
	    leaveRoutes = prevRoutes.filter(function (route) {
	      return nextRoutes.indexOf(route) === -1 || routeParamsChanged(route, prevState, nextState);
	    });
	
	    // onLeave hooks start at the leaf route.
	    leaveRoutes.reverse();
	
	    enterRoutes = nextRoutes.filter(function (route) {
	      return prevRoutes.indexOf(route) === -1 || leaveRoutes.indexOf(route) !== -1;
	    });
	  } else {
	    leaveRoutes = [];
	    enterRoutes = nextRoutes;
	  }
	
	  return {
	    leaveRoutes: leaveRoutes,
	    enterRoutes: enterRoutes
	  };
	}
	
	exports['default'] = computeChangedRoutes;
	module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _PatternUtils = __webpack_require__(9);
	
	function deepEqual(a, b) {
	  if (a == b) return true;
	
	  if (a == null || b == null) return false;
	
	  if (Array.isArray(a)) {
	    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
	      return deepEqual(item, b[index]);
	    });
	  }
	
	  if (typeof a === 'object') {
	    for (var p in a) {
	      if (!a.hasOwnProperty(p)) {
	        continue;
	      }
	
	      if (a[p] === undefined) {
	        if (b[p] !== undefined) {
	          return false;
	        }
	      } else if (!b.hasOwnProperty(p)) {
	        return false;
	      } else if (!deepEqual(a[p], b[p])) {
	        return false;
	      }
	    }
	
	    return true;
	  }
	
	  return String(a) === String(b);
	}
	
	function paramsAreActive(paramNames, paramValues, activeParams) {
	  // FIXME: This doesn't work on repeated params in activeParams.
	  return paramNames.every(function (paramName, index) {
	    return String(paramValues[index]) === String(activeParams[paramName]);
	  });
	}
	
	function getMatchingRouteIndex(pathname, activeRoutes, activeParams) {
	  var remainingPathname = pathname,
	      paramNames = [],
	      paramValues = [];
	
	  for (var i = 0, len = activeRoutes.length; i < len; ++i) {
	    var route = activeRoutes[i];
	    var pattern = route.path || '';
	
	    if (pattern.charAt(0) === '/') {
	      remainingPathname = pathname;
	      paramNames = [];
	      paramValues = [];
	    }
	
	    if (remainingPathname !== null) {
	      var matched = _PatternUtils.matchPattern(pattern, remainingPathname);
	      remainingPathname = matched.remainingPathname;
	      paramNames = [].concat(paramNames, matched.paramNames);
	      paramValues = [].concat(paramValues, matched.paramValues);
	    }
	
	    if (remainingPathname === '' && route.path && paramsAreActive(paramNames, paramValues, activeParams)) return i;
	  }
	
	  return null;
	}
	
	/**
	 * Returns true if the given pathname matches the active routes
	 * and params.
	 */
	function routeIsActive(pathname, routes, params, indexOnly) {
	  var i = getMatchingRouteIndex(pathname, routes, params);
	
	  if (i === null) {
	    // No match.
	    return false;
	  } else if (!indexOnly) {
	    // Any match is good enough.
	    return true;
	  }
	
	  // If any remaining routes past the match index have paths, then we can't
	  // be on the index route.
	  return routes.slice(i + 1).every(function (route) {
	    return !route.path;
	  });
	}
	
	/**
	 * Returns true if all key/value pairs in the given query are
	 * currently active.
	 */
	function queryIsActive(query, activeQuery) {
	  if (activeQuery == null) return query == null;
	
	  if (query == null) return true;
	
	  return deepEqual(query, activeQuery);
	}
	
	/**
	 * Returns true if a <Link> to the given pathname/query combination is
	 * currently active.
	 */
	function isActive(pathname, query, indexOnly, location, routes, params) {
	  if (location == null) return false;
	
	  if (!routeIsActive(pathname, routes, params, indexOnly)) return false;
	
	  return queryIsActive(query, location.query);
	}
	
	exports['default'] = isActive;
	module.exports = exports['default'];

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _AsyncUtils = __webpack_require__(28);
	
	function getComponentsForRoute(location, route, callback) {
	  if (route.component || route.components) {
	    callback(null, route.component || route.components);
	  } else if (route.getComponent) {
	    route.getComponent(location, callback);
	  } else if (route.getComponents) {
	    route.getComponents(location, callback);
	  } else {
	    callback();
	  }
	}
	
	/**
	 * Asynchronously fetches all components needed for the given router
	 * state and calls callback(error, components) when finished.
	 *
	 * Note: This operation may finish synchronously if no routes have an
	 * asynchronous getComponents method.
	 */
	function getComponents(nextState, callback) {
	  _AsyncUtils.mapAsync(nextState.routes, function (route, index, callback) {
	    getComponentsForRoute(nextState.location, route, callback);
	  }, callback);
	}
	
	exports['default'] = getComponents;
	module.exports = exports['default'];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(7);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _AsyncUtils = __webpack_require__(28);
	
	var _PatternUtils = __webpack_require__(9);
	
	var _RouteUtils = __webpack_require__(6);
	
	function getChildRoutes(route, location, callback) {
	  if (route.childRoutes) {
	    callback(null, route.childRoutes);
	  } else if (route.getChildRoutes) {
	    route.getChildRoutes(location, function (error, childRoutes) {
	      callback(error, !error && _RouteUtils.createRoutes(childRoutes));
	    });
	  } else {
	    callback();
	  }
	}
	
	function getIndexRoute(route, location, callback) {
	  if (route.indexRoute) {
	    callback(null, route.indexRoute);
	  } else if (route.getIndexRoute) {
	    route.getIndexRoute(location, function (error, indexRoute) {
	      callback(error, !error && _RouteUtils.createRoutes(indexRoute)[0]);
	    });
	  } else if (route.childRoutes) {
	    (function () {
	      var pathless = route.childRoutes.filter(function (obj) {
	        return !obj.hasOwnProperty('path');
	      });
	
	      _AsyncUtils.loopAsync(pathless.length, function (index, next, done) {
	        getIndexRoute(pathless[index], location, function (error, indexRoute) {
	          if (error || indexRoute) {
	            var routes = [pathless[index]].concat(Array.isArray(indexRoute) ? indexRoute : [indexRoute]);
	            done(error, routes);
	          } else {
	            next();
	          }
	        });
	      }, function (err, routes) {
	        callback(null, routes);
	      });
	    })();
	  } else {
	    callback();
	  }
	}
	
	function assignParams(params, paramNames, paramValues) {
	  return paramNames.reduce(function (params, paramName, index) {
	    var paramValue = paramValues && paramValues[index];
	
	    if (Array.isArray(params[paramName])) {
	      params[paramName].push(paramValue);
	    } else if (paramName in params) {
	      params[paramName] = [params[paramName], paramValue];
	    } else {
	      params[paramName] = paramValue;
	    }
	
	    return params;
	  }, params);
	}
	
	function createParams(paramNames, paramValues) {
	  return assignParams({}, paramNames, paramValues);
	}
	
	function matchRouteDeep(route, location, remainingPathname, paramNames, paramValues, callback) {
	  var pattern = route.path || '';
	
	  if (pattern.charAt(0) === '/') {
	    remainingPathname = location.pathname;
	    paramNames = [];
	    paramValues = [];
	  }
	
	  if (remainingPathname !== null) {
	    var matched = _PatternUtils.matchPattern(pattern, remainingPathname);
	    remainingPathname = matched.remainingPathname;
	    paramNames = [].concat(paramNames, matched.paramNames);
	    paramValues = [].concat(paramValues, matched.paramValues);
	
	    if (remainingPathname === '' && route.path) {
	      var _ret2 = (function () {
	        var match = {
	          routes: [route],
	          params: createParams(paramNames, paramValues)
	        };
	
	        getIndexRoute(route, location, function (error, indexRoute) {
	          if (error) {
	            callback(error);
	          } else {
	            if (Array.isArray(indexRoute)) {
	              var _match$routes;
	
	              true ? _warning2['default'](indexRoute.every(function (route) {
	                return !route.path;
	              }), 'Index routes should not have paths') : undefined;
	              (_match$routes = match.routes).push.apply(_match$routes, indexRoute);
	            } else if (indexRoute) {
	              true ? _warning2['default'](!indexRoute.path, 'Index routes should not have paths') : undefined;
	              match.routes.push(indexRoute);
	            }
	
	            callback(null, match);
	          }
	        });
	        return {
	          v: undefined
	        };
	      })();
	
	      if (typeof _ret2 === 'object') return _ret2.v;
	    }
	  }
	
	  if (remainingPathname != null || route.childRoutes) {
	    // Either a) this route matched at least some of the path or b)
	    // we don't have to load this route's children asynchronously. In
	    // either case continue checking for matches in the subtree.
	    getChildRoutes(route, location, function (error, childRoutes) {
	      if (error) {
	        callback(error);
	      } else if (childRoutes) {
	        // Check the child routes to see if any of them match.
	        matchRoutes(childRoutes, location, function (error, match) {
	          if (error) {
	            callback(error);
	          } else if (match) {
	            // A child route matched! Augment the match and pass it up the stack.
	            match.routes.unshift(route);
	            callback(null, match);
	          } else {
	            callback();
	          }
	        }, remainingPathname, paramNames, paramValues);
	      } else {
	        callback();
	      }
	    });
	  } else {
	    callback();
	  }
	}
	
	/**
	 * Asynchronously matches the given location to a set of routes and calls
	 * callback(error, state) when finished. The state object will have the
	 * following properties:
	 *
	 * - routes       An array of routes that matched, in hierarchical order
	 * - params       An object of URL parameters
	 *
	 * Note: This operation may finish synchronously if no routes have an
	 * asynchronous getChildRoutes method.
	 */
	function matchRoutes(routes, location, callback) {
	  var remainingPathname = arguments.length <= 3 || arguments[3] === undefined ? location.pathname : arguments[3];
	  var paramNames = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
	  var paramValues = arguments.length <= 5 || arguments[5] === undefined ? [] : arguments[5];
	  return (function () {
	    _AsyncUtils.loopAsync(routes.length, function (index, next, done) {
	      matchRouteDeep(routes[index], location, remainingPathname, paramNames, paramValues, function (error, match) {
	        if (error || match) {
	          done(error, match);
	        } else {
	          next();
	        }
	      });
	    }, callback);
	  })();
	}
	
	exports['default'] = matchRoutes;
	module.exports = exports['default'];

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.falsy = falsy;
	
	var _react = __webpack_require__(1);
	
	var func = _react.PropTypes.func;
	var object = _react.PropTypes.object;
	var arrayOf = _react.PropTypes.arrayOf;
	var oneOfType = _react.PropTypes.oneOfType;
	var element = _react.PropTypes.element;
	var shape = _react.PropTypes.shape;
	var string = _react.PropTypes.string;
	
	function falsy(props, propName, componentName) {
	  if (props[propName]) return new Error('<' + componentName + '> should not have a "' + propName + '" prop');
	}
	
	var history = shape({
	  listen: func.isRequired,
	  pushState: func.isRequired,
	  replaceState: func.isRequired,
	  go: func.isRequired
	});
	
	exports.history = history;
	var location = shape({
	  pathname: string.isRequired,
	  search: string.isRequired,
	  state: object,
	  action: string.isRequired,
	  key: string
	});
	
	exports.location = location;
	var component = oneOfType([func, string]);
	exports.component = component;
	var components = oneOfType([component, object]);
	exports.components = components;
	var route = oneOfType([object, element]);
	exports.route = route;
	var routes = oneOfType([route, arrayOf(route)]);
	
	exports.routes = routes;
	exports['default'] = {
	  falsy: falsy,
	  history: history,
	  location: location,
	  component: component,
	  components: components,
	  route: route
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _React$PropTypes = _react2['default'].PropTypes;
	var bool = _React$PropTypes.bool;
	var object = _React$PropTypes.object;
	var string = _React$PropTypes.string;
	var func = _React$PropTypes.func;
	
	function isLeftClickEvent(event) {
	  return event.button === 0;
	}
	
	function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}
	
	function isEmptyObject(object) {
	  for (var p in object) {
	    if (object.hasOwnProperty(p)) return false;
	  }return true;
	}
	
	/**
	 * A <Link> is used to create an <a> element that links to a route.
	 * When that route is active, the link gets the value of its
	 * `activeClassName` prop
	 *
	 * For example, assuming you have the following route:
	 *
	 *   <Route path="/posts/:postID" component={Post} />
	 *
	 * You could use the following component to link to that route:
	 *
	 *   <Link to={`/posts/${post.id}`} />
	 *
	 * Links may pass along location state and/or query string parameters
	 * in the state/query props, respectively.
	 *
	 *   <Link ... query={{ show: true }} state={{ the: 'state' }} />
	 */
	
	var Link = (function (_Component) {
	  _inherits(Link, _Component);
	
	  function Link() {
	    _classCallCheck(this, Link);
	
	    _Component.apply(this, arguments);
	  }
	
	  Link.prototype.handleClick = function handleClick(event) {
	    var allowTransition = true;
	
	    if (this.props.onClick) this.props.onClick(event);
	
	    if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;
	
	    if (event.defaultPrevented === true) allowTransition = false;
	
	    // If target prop is set (e.g. to "_blank") let browser handle link.
	    /* istanbul ignore if: untestable with Karma */
	    if (this.props.target) {
	      if (!allowTransition) event.preventDefault();
	
	      return;
	    }
	
	    event.preventDefault();
	
	    if (allowTransition) {
	      var _props = this.props;
	      var state = _props.state;
	      var to = _props.to;
	      var query = _props.query;
	      var hash = _props.hash;
	
	      if (hash) to += hash;
	
	      this.context.history.pushState(state, to, query);
	    }
	  };
	
	  Link.prototype.render = function render() {
	    var _this = this;
	
	    var _props2 = this.props;
	    var to = _props2.to;
	    var query = _props2.query;
	    var hash = _props2.hash;
	    var state = _props2.state;
	    var activeClassName = _props2.activeClassName;
	    var activeStyle = _props2.activeStyle;
	    var onlyActiveOnIndex = _props2.onlyActiveOnIndex;
	
	    var props = _objectWithoutProperties(_props2, ['to', 'query', 'hash', 'state', 'activeClassName', 'activeStyle', 'onlyActiveOnIndex']);
	
	    // Manually override onClick.
	    props.onClick = function (e) {
	      return _this.handleClick(e);
	    };
	
	    // Ignore if rendered outside the context of history, simplifies unit testing.
	    var history = this.context.history;
	
	    if (history) {
	      props.href = history.createHref(to, query);
	
	      if (hash) props.href += hash;
	
	      if (activeClassName || activeStyle != null && !isEmptyObject(activeStyle)) {
	        if (history.isActive(to, query, onlyActiveOnIndex)) {
	          if (activeClassName) props.className += props.className === '' ? activeClassName : ' ' + activeClassName;
	
	          if (activeStyle) props.style = _extends({}, props.style, activeStyle);
	        }
	      }
	    }
	
	    return _react2['default'].createElement('a', props);
	  };
	
	  return Link;
	})(_react.Component);
	
	Link.contextTypes = {
	  history: object
	};
	
	Link.propTypes = {
	  to: string.isRequired,
	  query: object,
	  hash: string,
	  state: object,
	  activeStyle: object,
	  activeClassName: string,
	  onlyActiveOnIndex: bool.isRequired,
	  onClick: func
	};
	
	Link.defaultProps = {
	  onlyActiveOnIndex: false,
	  className: '',
	  style: {}
	};
	
	exports['default'] = Link;
	module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Link = __webpack_require__(37);
	
	var _Link2 = _interopRequireDefault(_Link);
	
	/**
	 * An <IndexLink> is used to link to an <IndexRoute>.
	 */
	
	var IndexLink = (function (_Component) {
	  _inherits(IndexLink, _Component);
	
	  function IndexLink() {
	    _classCallCheck(this, IndexLink);
	
	    _Component.apply(this, arguments);
	  }
	
	  IndexLink.prototype.render = function render() {
	    return _react2['default'].createElement(_Link2['default'], _extends({}, this.props, { onlyActiveOnIndex: true }));
	  };
	
	  return IndexLink;
	})(_react.Component);
	
	exports['default'] = IndexLink;
	module.exports = exports['default'];

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _warning = __webpack_require__(7);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(5);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Redirect = __webpack_require__(40);
	
	var _Redirect2 = _interopRequireDefault(_Redirect);
	
	var _PropTypes = __webpack_require__(36);
	
	var _React$PropTypes = _react2['default'].PropTypes;
	var string = _React$PropTypes.string;
	var object = _React$PropTypes.object;
	
	/**
	 * An <IndexRedirect> is used to redirect from an indexRoute.
	 */
	
	var IndexRedirect = (function (_Component) {
	  _inherits(IndexRedirect, _Component);
	
	  function IndexRedirect() {
	    _classCallCheck(this, IndexRedirect);
	
	    _Component.apply(this, arguments);
	  }
	
	  /* istanbul ignore next: sanity check */
	
	  IndexRedirect.prototype.render = function render() {
	    true ? true ? _invariant2['default'](false, '<IndexRedirect> elements are for router configuration only and should not be rendered') : _invariant2['default'](false) : undefined;
	  };
	
	  return IndexRedirect;
	})(_react.Component);
	
	IndexRedirect.propTypes = {
	  to: string.isRequired,
	  query: object,
	  state: object,
	  onEnter: _PropTypes.falsy,
	  children: _PropTypes.falsy
	};
	
	IndexRedirect.createRouteFromReactElement = function (element, parentRoute) {
	  /* istanbul ignore else: sanity check */
	  if (parentRoute) {
	    parentRoute.indexRoute = _Redirect2['default'].createRouteFromReactElement(element);
	  } else {
	    true ? _warning2['default'](false, 'An <IndexRedirect> does not make sense at the root of your route config') : undefined;
	  }
	};
	
	exports['default'] = IndexRedirect;
	module.exports = exports['default'];

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _invariant = __webpack_require__(5);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _RouteUtils = __webpack_require__(6);
	
	var _PatternUtils = __webpack_require__(9);
	
	var _PropTypes = __webpack_require__(36);
	
	var _React$PropTypes = _react2['default'].PropTypes;
	var string = _React$PropTypes.string;
	var object = _React$PropTypes.object;
	
	/**
	 * A <Redirect> is used to declare another URL path a client should
	 * be sent to when they request a given URL.
	 *
	 * Redirects are placed alongside routes in the route configuration
	 * and are traversed in the same manner.
	 */
	
	var Redirect = (function (_Component) {
	  _inherits(Redirect, _Component);
	
	  function Redirect() {
	    _classCallCheck(this, Redirect);
	
	    _Component.apply(this, arguments);
	  }
	
	  /* istanbul ignore next: sanity check */
	
	  Redirect.prototype.render = function render() {
	    true ? true ? _invariant2['default'](false, '<Redirect> elements are for router configuration only and should not be rendered') : _invariant2['default'](false) : undefined;
	  };
	
	  return Redirect;
	})(_react.Component);
	
	Redirect.createRouteFromReactElement = function (element) {
	  var route = _RouteUtils.createRouteFromReactElement(element);
	
	  if (route.from) route.path = route.from;
	
	  route.onEnter = function (nextState, replaceState) {
	    var location = nextState.location;
	    var params = nextState.params;
	
	    var pathname = undefined;
	    if (route.to.charAt(0) === '/') {
	      pathname = _PatternUtils.formatPattern(route.to, params);
	    } else if (!route.to) {
	      pathname = location.pathname;
	    } else {
	      var routeIndex = nextState.routes.indexOf(route);
	      var parentPattern = Redirect.getRoutePattern(nextState.routes, routeIndex - 1);
	      var pattern = parentPattern.replace(/\/*$/, '/') + route.to;
	      pathname = _PatternUtils.formatPattern(pattern, params);
	    }
	
	    replaceState(route.state || location.state, pathname, route.query || location.query);
	  };
	
	  return route;
	};
	
	Redirect.getRoutePattern = function (routes, routeIndex) {
	  var parentPattern = '';
	
	  for (var i = routeIndex; i >= 0; i--) {
	    var route = routes[i];
	    var pattern = route.path || '';
	    parentPattern = pattern.replace(/\/*$/, '/') + parentPattern;
	
	    if (pattern.indexOf('/') === 0) break;
	  }
	
	  return '/' + parentPattern;
	};
	
	Redirect.propTypes = {
	  path: string,
	  from: string, // Alias for path
	  to: string.isRequired,
	  query: object,
	  state: object,
	  onEnter: _PropTypes.falsy,
	  children: _PropTypes.falsy
	};
	
	exports['default'] = Redirect;
	module.exports = exports['default'];

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _warning = __webpack_require__(7);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(5);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _RouteUtils = __webpack_require__(6);
	
	var _PropTypes = __webpack_require__(36);
	
	var func = _react2['default'].PropTypes.func;
	
	/**
	 * An <IndexRoute> is used to specify its parent's <Route indexRoute> in
	 * a JSX route config.
	 */
	
	var IndexRoute = (function (_Component) {
	  _inherits(IndexRoute, _Component);
	
	  function IndexRoute() {
	    _classCallCheck(this, IndexRoute);
	
	    _Component.apply(this, arguments);
	  }
	
	  /* istanbul ignore next: sanity check */
	
	  IndexRoute.prototype.render = function render() {
	    true ? true ? _invariant2['default'](false, '<IndexRoute> elements are for router configuration only and should not be rendered') : _invariant2['default'](false) : undefined;
	  };
	
	  return IndexRoute;
	})(_react.Component);
	
	IndexRoute.propTypes = {
	  path: _PropTypes.falsy,
	  component: _PropTypes.component,
	  components: _PropTypes.components,
	  getComponent: func,
	  getComponents: func
	};
	
	IndexRoute.createRouteFromReactElement = function (element, parentRoute) {
	  /* istanbul ignore else: sanity check */
	  if (parentRoute) {
	    parentRoute.indexRoute = _RouteUtils.createRouteFromReactElement(element);
	  } else {
	    true ? _warning2['default'](false, 'An <IndexRoute> does not make sense at the root of your route config') : undefined;
	  }
	};
	
	exports['default'] = IndexRoute;
	module.exports = exports['default'];

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _invariant = __webpack_require__(5);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _RouteUtils = __webpack_require__(6);
	
	var _PropTypes = __webpack_require__(36);
	
	var _React$PropTypes = _react2['default'].PropTypes;
	var string = _React$PropTypes.string;
	var func = _React$PropTypes.func;
	
	/**
	 * A <Route> is used to declare which components are rendered to the
	 * page when the URL matches a given pattern.
	 *
	 * Routes are arranged in a nested tree structure. When a new URL is
	 * requested, the tree is searched depth-first to find a route whose
	 * path matches the URL.  When one is found, all routes in the tree
	 * that lead to it are considered "active" and their components are
	 * rendered into the DOM, nested in the same order as in the tree.
	 */
	
	var Route = (function (_Component) {
	  _inherits(Route, _Component);
	
	  function Route() {
	    _classCallCheck(this, Route);
	
	    _Component.apply(this, arguments);
	  }
	
	  /* istanbul ignore next: sanity check */
	
	  Route.prototype.render = function render() {
	    true ? true ? _invariant2['default'](false, '<Route> elements are for router configuration only and should not be rendered') : _invariant2['default'](false) : undefined;
	  };
	
	  return Route;
	})(_react.Component);
	
	Route.createRouteFromReactElement = _RouteUtils.createRouteFromReactElement;
	
	Route.propTypes = {
	  path: string,
	  component: _PropTypes.component,
	  components: _PropTypes.components,
	  getComponent: func,
	  getComponents: func
	};
	
	exports['default'] = Route;
	module.exports = exports['default'];

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _PropTypes = __webpack_require__(36);
	
	/**
	 * A mixin that adds the "history" instance variable to components.
	 */
	var History = {
	
	  contextTypes: {
	    history: _PropTypes.history
	  },
	
	  componentWillMount: function componentWillMount() {
	    this.history = this.context.history;
	  }
	
	};
	
	exports['default'] = History;
	module.exports = exports['default'];

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(5);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var object = _react2['default'].PropTypes.object;
	
	/**
	 * The Lifecycle mixin adds the routerWillLeave lifecycle method to a
	 * component that may be used to cancel a transition or prompt the user
	 * for confirmation.
	 *
	 * On standard transitions, routerWillLeave receives a single argument: the
	 * location we're transitioning to. To cancel the transition, return false.
	 * To prompt the user for confirmation, return a prompt message (string).
	 *
	 * During the beforeunload event (assuming you're using the useBeforeUnload
	 * history enhancer), routerWillLeave does not receive a location object
	 * because it isn't possible for us to know the location we're transitioning
	 * to. In this case routerWillLeave must return a prompt message to prevent
	 * the user from closing the window/tab.
	 */
	var Lifecycle = {
	
	  contextTypes: {
	    history: object.isRequired,
	    // Nested children receive the route as context, either
	    // set by the route component using the RouteContext mixin
	    // or by some other ancestor.
	    route: object
	  },
	
	  propTypes: {
	    // Route components receive the route object as a prop.
	    route: object
	  },
	
	  componentDidMount: function componentDidMount() {
	    !this.routerWillLeave ? true ? _invariant2['default'](false, 'The Lifecycle mixin requires you to define a routerWillLeave method') : _invariant2['default'](false) : undefined;
	
	    var route = this.props.route || this.context.route;
	
	    !route ? true ? _invariant2['default'](false, 'The Lifecycle mixin must be used on either a) a <Route component> or ' + 'b) a descendant of a <Route component> that uses the RouteContext mixin') : _invariant2['default'](false) : undefined;
	
	    this._unlistenBeforeLeavingRoute = this.context.history.listenBeforeLeavingRoute(route, this.routerWillLeave);
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    if (this._unlistenBeforeLeavingRoute) this._unlistenBeforeLeavingRoute();
	  }
	
	};
	
	exports['default'] = Lifecycle;
	module.exports = exports['default'];

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var object = _react2['default'].PropTypes.object;
	
	/**
	 * The RouteContext mixin provides a convenient way for route
	 * components to set the route in context. This is needed for
	 * routes that render elements that want to use the Lifecycle
	 * mixin to prevent transitions.
	 */
	var RouteContext = {
	
	  propTypes: {
	    route: object.isRequired
	  },
	
	  childContextTypes: {
	    route: object.isRequired
	  },
	
	  getChildContext: function getChildContext() {
	    return {
	      route: this.props.route
	    };
	  }
	
	};
	
	exports['default'] = RouteContext;
	module.exports = exports['default'];

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _invariant = __webpack_require__(5);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _historyLibCreateMemoryHistory = __webpack_require__(47);
	
	var _historyLibCreateMemoryHistory2 = _interopRequireDefault(_historyLibCreateMemoryHistory);
	
	var _historyLibUseBasename = __webpack_require__(48);
	
	var _historyLibUseBasename2 = _interopRequireDefault(_historyLibUseBasename);
	
	var _RouteUtils = __webpack_require__(6);
	
	var _useRoutes = __webpack_require__(26);
	
	var _useRoutes2 = _interopRequireDefault(_useRoutes);
	
	var createHistory = _useRoutes2['default'](_historyLibUseBasename2['default'](_historyLibCreateMemoryHistory2['default']));
	
	/**
	 * A high-level API to be used for server-side rendering.
	 *
	 * This function matches a location to a set of routes and calls
	 * callback(error, redirectLocation, renderProps) when finished.
	 *
	 * Note: You probably don't want to use this in a browser. Use
	 * the history.listen API instead.
	 */
	function match(_ref, callback) {
	  var routes = _ref.routes;
	  var location = _ref.location;
	  var parseQueryString = _ref.parseQueryString;
	  var stringifyQuery = _ref.stringifyQuery;
	  var basename = _ref.basename;
	
	  !location ? true ? _invariant2['default'](false, 'match needs a location') : _invariant2['default'](false) : undefined;
	
	  var history = createHistory({
	    routes: _RouteUtils.createRoutes(routes),
	    parseQueryString: parseQueryString,
	    stringifyQuery: stringifyQuery,
	    basename: basename
	  });
	
	  // Allow match({ location: '/the/path', ... })
	  if (typeof location === 'string') location = history.createLocation(location);
	
	  history.match(location, function (error, redirectLocation, nextState) {
	    callback(error, redirectLocation, nextState && _extends({}, nextState, { history: history }));
	  });
	}
	
	exports['default'] = match;
	module.exports = exports['default'];

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(7);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(5);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _Actions = __webpack_require__(11);
	
	var _createHistory = __webpack_require__(16);
	
	var _createHistory2 = _interopRequireDefault(_createHistory);
	
	var _parsePath = __webpack_require__(22);
	
	var _parsePath2 = _interopRequireDefault(_parsePath);
	
	function createStateStorage(entries) {
	  return entries.filter(function (entry) {
	    return entry.state;
	  }).reduce(function (memo, entry) {
	    memo[entry.key] = entry.state;
	    return memo;
	  }, {});
	}
	
	function createMemoryHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  if (Array.isArray(options)) {
	    options = { entries: options };
	  } else if (typeof options === 'string') {
	    options = { entries: [options] };
	  }
	
	  var history = _createHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: saveState,
	    go: go
	  }));
	
	  var _options = options;
	  var entries = _options.entries;
	  var current = _options.current;
	
	  if (typeof entries === 'string') {
	    entries = [entries];
	  } else if (!Array.isArray(entries)) {
	    entries = ['/'];
	  }
	
	  entries = entries.map(function (entry) {
	    var key = history.createKey();
	
	    if (typeof entry === 'string') return { pathname: entry, key: key };
	
	    if (typeof entry === 'object' && entry) return _extends({}, entry, { key: key });
	
	    true ? true ? _invariant2['default'](false, 'Unable to create history entry from %s', entry) : _invariant2['default'](false) : undefined;
	  });
	
	  if (current == null) {
	    current = entries.length - 1;
	  } else {
	    !(current >= 0 && current < entries.length) ? true ? _invariant2['default'](false, 'Current index must be >= 0 and < %s, was %s', entries.length, current) : _invariant2['default'](false) : undefined;
	  }
	
	  var storage = createStateStorage(entries);
	
	  function saveState(key, state) {
	    storage[key] = state;
	  }
	
	  function readState(key) {
	    return storage[key];
	  }
	
	  function getCurrentLocation() {
	    var entry = entries[current];
	    var key = entry.key;
	    var basename = entry.basename;
	    var pathname = entry.pathname;
	    var search = entry.search;
	
	    var path = (basename || '') + pathname + (search || '');
	
	    var state = undefined;
	    if (key) {
	      state = readState(key);
	    } else {
	      state = null;
	      key = history.createKey();
	      entry.key = key;
	    }
	
	    var location = _parsePath2['default'](path);
	
	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }
	
	  function canGo(n) {
	    var index = current + n;
	    return index >= 0 && index < entries.length;
	  }
	
	  function go(n) {
	    if (n) {
	      if (!canGo(n)) {
	        true ? _warning2['default'](false, 'Cannot go(%s) there is not enough history', n) : undefined;
	        return;
	      }
	
	      current += n;
	
	      var currentLocation = getCurrentLocation();
	
	      // change action to POP
	      history.transitionTo(_extends({}, currentLocation, { action: _Actions.POP }));
	    }
	  }
	
	  function finishTransition(location) {
	    switch (location.action) {
	      case _Actions.PUSH:
	        current += 1;
	
	        // if we are not on the top of stack
	        // remove rest and push new
	        if (current < entries.length) entries.splice(current);
	
	        entries.push(location);
	        saveState(location.key, location.state);
	        break;
	      case _Actions.REPLACE:
	        entries[current] = location;
	        saveState(location.key, location.state);
	        break;
	    }
	  }
	
	  return history;
	}
	
	exports['default'] = createMemoryHistory;
	module.exports = exports['default'];

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var _ExecutionEnvironment = __webpack_require__(12);
	
	var _runTransitionHook = __webpack_require__(24);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _extractPath = __webpack_require__(23);
	
	var _extractPath2 = _interopRequireDefault(_extractPath);
	
	var _parsePath = __webpack_require__(22);
	
	var _parsePath2 = _interopRequireDefault(_parsePath);
	
	var _deprecate = __webpack_require__(25);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	function useBasename(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var basename = options.basename;
	
	    var historyOptions = _objectWithoutProperties(options, ['basename']);
	
	    var history = createHistory(historyOptions);
	
	    // Automatically use the value of <base href> in HTML
	    // documents as basename if it's not explicitly given.
	    if (basename == null && _ExecutionEnvironment.canUseDOM) {
	      var base = document.getElementsByTagName('base')[0];
	
	      if (base) basename = _extractPath2['default'](base.href);
	    }
	
	    function addBasename(location) {
	      if (basename && location.basename == null) {
	        if (location.pathname.indexOf(basename) === 0) {
	          location.pathname = location.pathname.substring(basename.length);
	          location.basename = basename;
	
	          if (location.pathname === '') location.pathname = '/';
	        } else {
	          location.basename = '';
	        }
	      }
	
	      return location;
	    }
	
	    function prependBasename(location) {
	      if (!basename) return location;
	
	      if (typeof location === 'string') location = _parsePath2['default'](location);
	
	      var pname = location.pathname;
	      var normalizedBasename = basename.slice(-1) === '/' ? basename : basename + '/';
	      var normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
	      var pathname = normalizedBasename + normalizedPathname;
	
	      return _extends({}, location, {
	        pathname: pathname
	      });
	    }
	
	    // Override all read methods with basename-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addBasename(location), callback);
	      });
	    }
	
	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addBasename(location));
	      });
	    }
	
	    // Override all write methods with basename-aware versions.
	    function push(location) {
	      history.push(prependBasename(location));
	    }
	
	    function replace(location) {
	      history.replace(prependBasename(location));
	    }
	
	    function createPath(location) {
	      return history.createPath(prependBasename(location));
	    }
	
	    function createHref(location) {
	      return history.createHref(prependBasename(location));
	    }
	
	    function createLocation() {
	      return addBasename(history.createLocation.apply(history, arguments));
	    }
	
	    // deprecated
	    function pushState(state, path) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);
	
	      push(_extends({ state: state }, path));
	    }
	
	    // deprecated
	    function replaceState(state, path) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);
	
	      replace(_extends({ state: state }, path));
	    }
	
	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,
	
	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}
	
	exports['default'] = useBasename;
	module.exports = exports['default'];

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _deprecate = __webpack_require__(25);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	var _createLocation2 = __webpack_require__(21);
	
	var _createLocation3 = _interopRequireDefault(_createLocation2);
	
	var _createBrowserHistory = __webpack_require__(50);
	
	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
	
	exports.createHistory = _createBrowserHistory2['default'];
	
	var _createHashHistory2 = __webpack_require__(10);
	
	var _createHashHistory3 = _interopRequireDefault(_createHashHistory2);
	
	exports.createHashHistory = _createHashHistory3['default'];
	
	var _createMemoryHistory2 = __webpack_require__(47);
	
	var _createMemoryHistory3 = _interopRequireDefault(_createMemoryHistory2);
	
	exports.createMemoryHistory = _createMemoryHistory3['default'];
	
	var _useBasename2 = __webpack_require__(48);
	
	var _useBasename3 = _interopRequireDefault(_useBasename2);
	
	exports.useBasename = _useBasename3['default'];
	
	var _useBeforeUnload2 = __webpack_require__(51);
	
	var _useBeforeUnload3 = _interopRequireDefault(_useBeforeUnload2);
	
	exports.useBeforeUnload = _useBeforeUnload3['default'];
	
	var _useQueries2 = __webpack_require__(29);
	
	var _useQueries3 = _interopRequireDefault(_useQueries2);
	
	exports.useQueries = _useQueries3['default'];
	
	var _Actions2 = __webpack_require__(11);
	
	var _Actions3 = _interopRequireDefault(_Actions2);
	
	exports.Actions = _Actions3['default'];
	
	// deprecated
	
	var _enableBeforeUnload2 = __webpack_require__(52);
	
	var _enableBeforeUnload3 = _interopRequireDefault(_enableBeforeUnload2);
	
	exports.enableBeforeUnload = _enableBeforeUnload3['default'];
	
	var _enableQueries2 = __webpack_require__(53);
	
	var _enableQueries3 = _interopRequireDefault(_enableQueries2);
	
	exports.enableQueries = _enableQueries3['default'];
	var createLocation = _deprecate2['default'](_createLocation3['default'], 'Using createLocation without a history instance is deprecated; please use history.createLocation instead');
	exports.createLocation = createLocation;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _invariant = __webpack_require__(5);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _Actions = __webpack_require__(11);
	
	var _ExecutionEnvironment = __webpack_require__(12);
	
	var _DOMUtils = __webpack_require__(13);
	
	var _DOMStateStorage = __webpack_require__(14);
	
	var _createDOMHistory = __webpack_require__(15);
	
	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);
	
	var _parsePath = __webpack_require__(22);
	
	var _parsePath2 = _interopRequireDefault(_parsePath);
	
	/**
	 * Creates and returns a history object that uses HTML5's history API
	 * (pushState, replaceState, and the popstate event) to manage history.
	 * This is the recommended method of managing history in browsers because
	 * it provides the cleanest URLs.
	 *
	 * Note: In browsers that do not support the HTML5 history API full
	 * page reloads will be used to preserve URLs.
	 */
	function createBrowserHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  !_ExecutionEnvironment.canUseDOM ? true ? _invariant2['default'](false, 'Browser history needs a DOM') : _invariant2['default'](false) : undefined;
	
	  var forceRefresh = options.forceRefresh;
	
	  var isSupported = _DOMUtils.supportsHistory();
	  var useRefresh = !isSupported || forceRefresh;
	
	  function getCurrentLocation(historyState) {
	    historyState = historyState || window.history.state || {};
	
	    var path = _DOMUtils.getWindowPath();
	    var _historyState = historyState;
	    var key = _historyState.key;
	
	    var state = undefined;
	    if (key) {
	      state = _DOMStateStorage.readState(key);
	    } else {
	      state = null;
	      key = history.createKey();
	
	      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null, path);
	    }
	
	    var location = _parsePath2['default'](path);
	
	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }
	
	  function startPopStateListener(_ref) {
	    var transitionTo = _ref.transitionTo;
	
	    function popStateListener(event) {
	      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.
	
	      transitionTo(getCurrentLocation(event.state));
	    }
	
	    _DOMUtils.addEventListener(window, 'popstate', popStateListener);
	
	    return function () {
	      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
	    };
	  }
	
	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;
	
	    if (action === _Actions.POP) return; // Nothing to do.
	
	    _DOMStateStorage.saveState(key, state);
	
	    var path = (basename || '') + pathname + search + hash;
	    var historyState = {
	      key: key
	    };
	
	    if (action === _Actions.PUSH) {
	      if (useRefresh) {
	        window.location.href = path;
	        return false; // Prevent location update.
	      } else {
	          window.history.pushState(historyState, null, path);
	        }
	    } else {
	      // REPLACE
	      if (useRefresh) {
	        window.location.replace(path);
	        return false; // Prevent location update.
	      } else {
	          window.history.replaceState(historyState, null, path);
	        }
	    }
	  }
	
	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));
	
	  var listenerCount = 0,
	      stopPopStateListener = undefined;
	
	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);
	
	    var unlisten = history.listenBefore(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }
	
	  function listen(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);
	
	    var unlisten = history.listen(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }
	
	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);
	
	    history.registerTransitionHook(hook);
	  }
	
	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);
	
	    if (--listenerCount === 0) stopPopStateListener();
	  }
	
	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    registerTransitionHook: registerTransitionHook,
	    unregisterTransitionHook: unregisterTransitionHook
	  });
	}
	
	exports['default'] = createBrowserHistory;
	module.exports = exports['default'];

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(7);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _ExecutionEnvironment = __webpack_require__(12);
	
	var _DOMUtils = __webpack_require__(13);
	
	var _deprecate = __webpack_require__(25);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	function startBeforeUnloadListener(getBeforeUnloadPromptMessage) {
	  function listener(event) {
	    var message = getBeforeUnloadPromptMessage();
	
	    if (typeof message === 'string') {
	      (event || window.event).returnValue = message;
	      return message;
	    }
	  }
	
	  _DOMUtils.addEventListener(window, 'beforeunload', listener);
	
	  return function () {
	    _DOMUtils.removeEventListener(window, 'beforeunload', listener);
	  };
	}
	
	/**
	 * Returns a new createHistory function that can be used to create
	 * history objects that know how to use the beforeunload event in web
	 * browsers to cancel navigation.
	 */
	function useBeforeUnload(createHistory) {
	  return function (options) {
	    var history = createHistory(options);
	
	    var stopBeforeUnloadListener = undefined;
	    var beforeUnloadHooks = [];
	
	    function getBeforeUnloadPromptMessage() {
	      var message = undefined;
	
	      for (var i = 0, len = beforeUnloadHooks.length; message == null && i < len; ++i) {
	        message = beforeUnloadHooks[i].call();
	      }return message;
	    }
	
	    function listenBeforeUnload(hook) {
	      beforeUnloadHooks.push(hook);
	
	      if (beforeUnloadHooks.length === 1) {
	        if (_ExecutionEnvironment.canUseDOM) {
	          stopBeforeUnloadListener = startBeforeUnloadListener(getBeforeUnloadPromptMessage);
	        } else {
	          true ? _warning2['default'](false, 'listenBeforeUnload only works in DOM environments') : undefined;
	        }
	      }
	
	      return function () {
	        beforeUnloadHooks = beforeUnloadHooks.filter(function (item) {
	          return item !== hook;
	        });
	
	        if (beforeUnloadHooks.length === 0 && stopBeforeUnloadListener) {
	          stopBeforeUnloadListener();
	          stopBeforeUnloadListener = null;
	        }
	      };
	    }
	
	    // deprecated
	    function registerBeforeUnloadHook(hook) {
	      if (_ExecutionEnvironment.canUseDOM && beforeUnloadHooks.indexOf(hook) === -1) {
	        beforeUnloadHooks.push(hook);
	
	        if (beforeUnloadHooks.length === 1) stopBeforeUnloadListener = startBeforeUnloadListener(getBeforeUnloadPromptMessage);
	      }
	    }
	
	    // deprecated
	    function unregisterBeforeUnloadHook(hook) {
	      if (beforeUnloadHooks.length > 0) {
	        beforeUnloadHooks = beforeUnloadHooks.filter(function (item) {
	          return item !== hook;
	        });
	
	        if (beforeUnloadHooks.length === 0) stopBeforeUnloadListener();
	      }
	    }
	
	    return _extends({}, history, {
	      listenBeforeUnload: listenBeforeUnload,
	
	      registerBeforeUnloadHook: _deprecate2['default'](registerBeforeUnloadHook, 'registerBeforeUnloadHook is deprecated; use listenBeforeUnload instead'),
	      unregisterBeforeUnloadHook: _deprecate2['default'](unregisterBeforeUnloadHook, 'unregisterBeforeUnloadHook is deprecated; use the callback returned from listenBeforeUnload instead')
	    });
	  };
	}
	
	exports['default'] = useBeforeUnload;
	module.exports = exports['default'];

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _deprecate = __webpack_require__(25);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	var _useBeforeUnload = __webpack_require__(51);
	
	var _useBeforeUnload2 = _interopRequireDefault(_useBeforeUnload);
	
	exports['default'] = _deprecate2['default'](_useBeforeUnload2['default'], 'enableBeforeUnload is deprecated, use useBeforeUnload instead');
	module.exports = exports['default'];

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _deprecate = __webpack_require__(25);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	var _useQueries = __webpack_require__(29);
	
	var _useQueries2 = _interopRequireDefault(_useQueries);
	
	exports['default'] = _deprecate2['default'](_useQueries2['default'], 'enableQueries is deprecated, use useQueries instead');
	module.exports = exports['default'];

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzVkMWVmOTI5NmJhNWM4OWUwMTkiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1saXRlL2Rpc3QvcmVhY3QtbGl0ZS5jb21tb24uanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvbW9kdWxlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9tb2R1bGVzL1JvdXRlci5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9tb2R1bGVzL1JvdXRpbmdDb250ZXh0LmpzIiwid2VicGFjazovLy8uLi9+L2ludmFyaWFudC9icm93c2VyLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL21vZHVsZXMvUm91dGVVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi4vfi93YXJuaW5nL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvbW9kdWxlcy9nZXRSb3V0ZVBhcmFtcy5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9tb2R1bGVzL1BhdHRlcm5VdGlscy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9oaXN0b3J5L2xpYi9jcmVhdGVIYXNoSGlzdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9oaXN0b3J5L2xpYi9BY3Rpb25zLmpzIiwid2VicGFjazovLy8uLi9+L2hpc3RvcnkvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50LmpzIiwid2VicGFjazovLy8uLi9+L2hpc3RvcnkvbGliL0RPTVV0aWxzLmpzIiwid2VicGFjazovLy8uLi9+L2hpc3RvcnkvbGliL0RPTVN0YXRlU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9oaXN0b3J5L2xpYi9jcmVhdGVET01IaXN0b3J5LmpzIiwid2VicGFjazovLy8uLi9+L2hpc3RvcnkvbGliL2NyZWF0ZUhpc3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4uL34vaGlzdG9yeS9+L2RlZXAtZXF1YWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL34vaGlzdG9yeS9+L2RlZXAtZXF1YWwvbGliL2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4uL34vaGlzdG9yeS9+L2RlZXAtZXF1YWwvbGliL2lzX2FyZ3VtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9oaXN0b3J5L2xpYi9Bc3luY1V0aWxzLmpzIiwid2VicGFjazovLy8uLi9+L2hpc3RvcnkvbGliL2NyZWF0ZUxvY2F0aW9uLmpzIiwid2VicGFjazovLy8uLi9+L2hpc3RvcnkvbGliL3BhcnNlUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9oaXN0b3J5L2xpYi9leHRyYWN0UGF0aC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9oaXN0b3J5L2xpYi9ydW5UcmFuc2l0aW9uSG9vay5qcyIsIndlYnBhY2s6Ly8vLi4vfi9oaXN0b3J5L2xpYi9kZXByZWNhdGUuanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvbW9kdWxlcy91c2VSb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvbW9kdWxlcy9UcmFuc2l0aW9uVXRpbHMuanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvbW9kdWxlcy9Bc3luY1V0aWxzLmpzIiwid2VicGFjazovLy8uLi9+L2hpc3RvcnkvbGliL3VzZVF1ZXJpZXMuanMiLCJ3ZWJwYWNrOi8vLy4uL34vaGlzdG9yeS9+L3F1ZXJ5LXN0cmluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9oaXN0b3J5L34vcXVlcnktc3RyaW5nL34vc3RyaWN0LXVyaS1lbmNvZGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvbW9kdWxlcy9jb21wdXRlQ2hhbmdlZFJvdXRlcy5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9tb2R1bGVzL2lzQWN0aXZlLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL21vZHVsZXMvZ2V0Q29tcG9uZW50cy5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9tb2R1bGVzL21hdGNoUm91dGVzLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL21vZHVsZXMvUHJvcFR5cGVzLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL21vZHVsZXMvTGluay5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9tb2R1bGVzL0luZGV4TGluay5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9tb2R1bGVzL0luZGV4UmVkaXJlY3QuanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvbW9kdWxlcy9SZWRpcmVjdC5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9tb2R1bGVzL0luZGV4Um91dGUuanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvbW9kdWxlcy9Sb3V0ZS5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9tb2R1bGVzL0hpc3RvcnkuanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvbW9kdWxlcy9MaWZlY3ljbGUuanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvbW9kdWxlcy9Sb3V0ZUNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvbW9kdWxlcy9tYXRjaC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9oaXN0b3J5L2xpYi9jcmVhdGVNZW1vcnlIaXN0b3J5LmpzIiwid2VicGFjazovLy8uLi9+L2hpc3RvcnkvbGliL3VzZUJhc2VuYW1lLmpzIiwid2VicGFjazovLy8uLi9+L2hpc3RvcnkvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9+L2hpc3RvcnkvbGliL2NyZWF0ZUJyb3dzZXJIaXN0b3J5LmpzIiwid2VicGFjazovLy8uLi9+L2hpc3RvcnkvbGliL3VzZUJlZm9yZVVubG9hZC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9oaXN0b3J5L2xpYi9lbmFibGVCZWZvcmVVbmxvYWQuanMiLCJ3ZWJwYWNrOi8vLy4uL34vaGlzdG9yeS9saWIvZW5hYmxlUXVlcmllcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNwRkEsYUFBWSxDQUFDOztBQUViLEtBQUksTUFBTSxHQUFHLFNBQVMsTUFBTSxDQUFDLElBQUksRUFBRTtBQUNsQyxTQUFPLFVBQVUsR0FBRyxFQUFFO0FBQ3JCLFVBQU8sR0FBRyxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMs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O0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxxQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0EscUM7Ozs7OztBQ3ZQQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQzlCQTs7QUFFQTtBQUNBO0FBQ0EsK0I7Ozs7OztBQ0pBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQy9FQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBc0MsdUNBQXVDLGtCQUFrQjs7QUFFL0Y7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBLHFDOzs7Ozs7QUNqTEE7O0FBRUE7O0FBRUEsb0RBQW1ELGdCQUFnQixzQkFBc0IsT0FBTywyQkFBMkIsMEJBQTBCLHlEQUF5RCwyQkFBMkIsRUFBRSxFQUFFLEVBQUUsZUFBZTs7QUFFOVAsdUNBQXNDLHVDQUF1QyxrQkFBa0I7O0FBRS9GOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHNEQUFxRCw0QkFBNEI7QUFDakY7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUEsdUJBQXNCO0FBQ3RCOztBQUVBLDBIQUF5SDtBQUN6SCxnSUFBK0g7QUFDL0gsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxxQzs7Ozs7O0FDOUdBOztBQUVBOztBQUVBLHVDQUFzQyx1Q0FBdUMsa0JBQWtCOztBQUUvRjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLHFDOzs7Ozs7QUNmQTs7QUFFQTs7QUFFQSx1Q0FBc0MsdUNBQXVDLGtCQUFrQjs7QUFFL0Y7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxxQyIsImZpbGUiOiJzaGFyZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gd2luZG93W1wid2VicGFja0pzb25wXCJdO1xuIFx0d2luZG93W1wid2VicGFja0pzb25wXCJdID0gZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soY2h1bmtJZHMsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgY2FsbGJhY2tzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSlcbiBcdFx0XHRcdGNhbGxiYWNrcy5wdXNoLmFwcGx5KGNhbGxiYWNrcywgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKTtcbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oY2h1bmtJZHMsIG1vcmVNb2R1bGVzKTtcbiBcdFx0d2hpbGUoY2FsbGJhY2tzLmxlbmd0aClcbiBcdFx0XHRjYWxsYmFja3Muc2hpZnQoKS5jYWxsKG51bGwsIF9fd2VicGFja19yZXF1aXJlX18pO1xuIFx0XHRpZihtb3JlTW9kdWxlc1swXSkge1xuIFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbMF0gPSAwO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gXCIwXCIgbWVhbnMgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHQvLyBBcnJheSBtZWFucyBcImxvYWRpbmdcIiwgYXJyYXkgY29udGFpbnMgY2FsbGJhY2tzXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHQyNzowXG4gXHR9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkLCBjYWxsYmFjaykge1xuIFx0XHQvLyBcIjBcIiBpcyB0aGUgc2lnbmFsIGZvciBcImFscmVhZHkgbG9hZGVkXCJcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKVxuIFx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKG51bGwsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIGFuIGFycmF5IG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdICE9PSB1bmRlZmluZWQpIHtcbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0ucHVzaChjYWxsYmFjayk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtjYWxsYmFja107XG4gXHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuIFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuIFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRzY3JpcHQuYXN5bmMgPSB0cnVlO1xuXG4gXHRcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuY2h1bmsuanNcIjtcbiBcdFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL19fYnVpbGRfXy9cIjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDM1ZDFlZjkyOTZiYTVjODllMDE5XG4gKiovIiwiLyohXG4gKiByZWFjdC1saXRlLmpzIHYwLjAuNVxuICogKGMpIDIwMTUgSmFkZSBHdVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc1R5cGUgPSBmdW5jdGlvbiBpc1R5cGUodHlwZSkge1xuXHRyZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuXHRcdHJldHVybiBvYmogIT0gbnVsbCAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgJyArIHR5cGUgKyAnXSc7XG5cdH07XG59O1xudmFyIGlzT2JqID0gaXNUeXBlKCdPYmplY3QnKTtcbnZhciBpc1N0ciA9IGlzVHlwZSgnU3RyaW5nJyk7XG52YXIgaXNOdW0gPSBpc1R5cGUoJ051bWJlcicpO1xudmFyIGlzRm4gPSBpc1R5cGUoJ0Z1bmN0aW9uJyk7XG52YXIgaXNCbG4gPSBpc1R5cGUoJ0Jvb2xlYW4nKTtcbnZhciBpc0FyciA9IEFycmF5LmlzQXJyYXkgfHwgaXNUeXBlKCdBcnJheScpO1xudmFyIGlzVW5kZWZpbmVkID0gZnVuY3Rpb24gaXNVbmRlZmluZWQob2JqKSB7XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZDtcbn07XG52YXIgaXNDb21wb25lbnQgPSBmdW5jdGlvbiBpc0NvbXBvbmVudChvYmopIHtcblx0cmV0dXJuIG9iaiAmJiBvYmoucHJvdG90eXBlICYmICdmb3JjZVVwZGF0ZScgaW4gb2JqLnByb3RvdHlwZTtcbn07XG52YXIgaXNTdGF0ZWxlc3NDb21wb25lbnQgPSBmdW5jdGlvbiBpc1N0YXRlbGVzc0NvbXBvbmVudChvYmopIHtcblx0cmV0dXJuIG9iaiAmJiAoIW9iai5wcm90b3R5cGUgfHwgISgnZm9yY2VVcGRhdGUnIGluIG9iai5wcm90b3R5cGUpKTtcbn07XG5cbnZhciBwaXBlID0gZnVuY3Rpb24gcGlwZShmbjEsIGZuMikge1xuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG5cdFx0XHRhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuXHRcdH1cblxuXHRcdGZuMS5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRyZXR1cm4gZm4yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHR9O1xufTtcblxudmFyIGZvckVhY2gkMSA9IGZ1bmN0aW9uIGZvckVhY2gobGlzdCwgaXRlcmF0ZWUpIHtcblx0dmFyIHJlY29yZCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IHsgaW5kZXg6IDAgfSA6IGFyZ3VtZW50c1syXTtcblxuXHRmb3IgKHZhciBpID0gMCwgbGVuID0gbGlzdC5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHRpZiAoaXNBcnIoaXRlbSkpIHtcblx0XHRcdGZvckVhY2goaXRlbSwgaXRlcmF0ZWUsIHJlY29yZCk7XG5cdFx0fSBlbHNlIGlmICghaXNVbmRlZmluZWQoaXRlbSkpIHtcblx0XHRcdGl0ZXJhdGVlKGl0ZW0sIHJlY29yZC5pbmRleCk7XG5cdFx0XHRyZWNvcmQuaW5kZXggKz0gMTtcblx0XHR9XG5cdH1cbn07XG5cbnZhciBlYWNoSXRlbSA9IGZ1bmN0aW9uIGVhY2hJdGVtKGxpc3QsIGl0ZXJhdGVlKSB7XG5cdGZvciAodmFyIGkgPSAwLCBsZW4gPSBsaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG5cdFx0aXRlcmF0ZWUobGlzdFtpXSwgaSk7XG5cdH1cbn07XG5cbnZhciBtYXBWYWx1ZSA9IGZ1bmN0aW9uIG1hcFZhbHVlKG9iaiwgaXRlcmF0ZWUpIHtcblx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblx0XHRpdGVyYXRlZShvYmpba2V5XSwga2V5KTtcblx0fVxufTtcblxudmFyIG1hcEtleSA9IGZ1bmN0aW9uIG1hcEtleShzb3VyY2VzLCBpdGVyYXRlZSkge1xuXHR2YXIga2V5TWFwID0ge307XG5cdHZhciBpdGVtID0gdW5kZWZpbmVkO1xuXHR2YXIga2V5ID0gdW5kZWZpbmVkO1xuXHRmb3IgKHZhciBpID0gMCwgbGVuID0gc291cmNlcy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuXHRcdGl0ZW0gPSBzb3VyY2VzW2ldO1xuXHRcdGZvciAoa2V5IGluIGl0ZW0pIHtcblx0XHRcdGlmICghaXRlbS5oYXNPd25Qcm9wZXJ0eShrZXkpIHx8IGtleU1hcFtrZXldKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXHRcdFx0a2V5TWFwW2tleV0gPSB0cnVlO1xuXHRcdFx0aXRlcmF0ZWUoa2V5KTtcblx0XHR9XG5cdH1cbn07XG5cbnZhciBleHRlbmQgPSBmdW5jdGlvbiBleHRlbmQodGFyZ2V0KSB7XG5cdGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMSA/IF9sZW4yIC0gMSA6IDApLCBfa2V5MiA9IDE7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcblx0XHRhcmdzW19rZXkyIC0gMV0gPSBhcmd1bWVudHNbX2tleTJdO1xuXHR9XG5cblx0dmFyIHNldFByb3AgPSBmdW5jdGlvbiBzZXRQcm9wKHZhbHVlLCBrZXkpIHtcblx0XHRpZiAoaXNVbmRlZmluZWQodmFsdWUpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRhcmdldFtrZXldID0gdmFsdWU7XG5cdH07XG5cdGVhY2hJdGVtKGFyZ3MsIGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRpZiAoc291cmNlID09IG51bGwpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0bWFwVmFsdWUoc291cmNlLCBzZXRQcm9wKTtcblx0fSk7XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG52YXIgdWlkID0gMDtcbnZhciBnZXRVaWQgPSBmdW5jdGlvbiBnZXRVaWQoKSB7XG5cdHJldHVybiArK3VpZDtcbn07XG5cbnZhciBnZXRDaGlsZHJlbiA9IGZ1bmN0aW9uIGdldENoaWxkcmVuKF94Mikge1xuXHR2YXIgX2FnYWluID0gdHJ1ZTtcblxuXHRfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHtcblx0XHR2YXIgY2hpbGRyZW4gPSBfeDI7XG5cdFx0X2FnYWluID0gZmFsc2U7XG5cblx0XHRpZiAoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuXHRcdFx0aWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRjaGlsZHJlbiA9IGNoaWxkcmVuWzBdO1xuXHRcdFx0XHRpZiAoaXNBcnIoY2hpbGRyZW4pKSB7XG5cdFx0XHRcdFx0X3gyID0gY2hpbGRyZW47XG5cdFx0XHRcdFx0X2FnYWluID0gdHJ1ZTtcblx0XHRcdFx0XHRjb250aW51ZSBfZnVuY3Rpb247XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2hpbGRyZW4gPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdHJldHVybiBjaGlsZHJlbjtcblx0fVxufTtcbnZhciBtZXJnZVByb3BzID0gZnVuY3Rpb24gbWVyZ2VQcm9wcyhwcm9wcywgY2hpbGRyZW4sIGRlZmF1bHRQcm9wcykge1xuXHR2YXIgcmVzdWx0ID0gZXh0ZW5kKHt9LCBkZWZhdWx0UHJvcHMsIHByb3BzKTtcblx0Y2hpbGRyZW4gPSBnZXRDaGlsZHJlbihjaGlsZHJlbik7XG5cdGlmICghaXNVbmRlZmluZWQoY2hpbGRyZW4pKSB7XG5cdFx0cmVzdWx0LmNoaWxkcmVuID0gY2hpbGRyZW47XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07XG5cbnZhciBzZXRBdHRyID0gZnVuY3Rpb24gc2V0QXR0cihlbGVtLCBrZXksIHZhbHVlKSB7XG5cdGVsZW0uc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xufTtcbnZhciBnZXRBdHRyID0gZnVuY3Rpb24gZ2V0QXR0cihlbGVtLCBrZXkpIHtcblx0cmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKGtleSk7XG59O1xudmFyIHJlbW92ZUF0dHIgPSBmdW5jdGlvbiByZW1vdmVBdHRyKGVsZW0sIGtleSkge1xuXHRlbGVtLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xufTtcblxudmFyIGV2ZW50TmFtZUFsaWFzID0ge1xuXHRvbkRvdWJsZUNsaWNrOiAnb25kYmxjbGljaydcbn07XG52YXIgZ2V0RXZlbnROYW1lID0gZnVuY3Rpb24gZ2V0RXZlbnROYW1lKGtleSkge1xuXHRrZXkgPSBldmVudE5hbWVBbGlhc1trZXldIHx8IGtleTtcblx0cmV0dXJuIGtleS50b0xvd2VyQ2FzZSgpO1xufTtcbnZhciBzZXRFdmVudCA9IGZ1bmN0aW9uIHNldEV2ZW50KGVsZW0sIGtleSwgdmFsdWUpIHtcblx0aWYgKCFpc0ZuKHZhbHVlKSkge1xuXHRcdHJldHVybjtcblx0fVxuXHRrZXkgPSBnZXRFdmVudE5hbWUoa2V5KTtcblx0ZWxlbVtrZXldID0gdmFsdWU7XG5cdGlmIChrZXkgPT09ICdvbmNoYW5nZScpIHtcblx0XHRlbGVtLm9uaW5wdXQgPSB2YWx1ZTtcblx0fVxufTtcbnZhciByZW1vdmVFdmVudCA9IGZ1bmN0aW9uIHJlbW92ZUV2ZW50KGVsZW0sIGtleSkge1xuXHRrZXkgPSBnZXRFdmVudE5hbWUoa2V5KTtcblx0ZWxlbVtrZXldID0gbnVsbDtcblx0aWYgKGtleSA9PT0gJ29uY2hhbmdlJykge1xuXHRcdGVsZW0ub25pbnB1dCA9IG51bGw7XG5cdH1cbn07XG5cbnZhciBpZ25vcmVLZXlzID0ge1xuXHRrZXk6IHRydWUsXG5cdHJlZjogdHJ1ZSxcblx0Y2hpbGRyZW46IHRydWVcbn07XG52YXIgRVZFTlRfS0VZUyA9IC9eb24vaTtcbnZhciBpc0lnbm9yZUtleSA9IGZ1bmN0aW9uIGlzSWdub3JlS2V5KGtleSkge1xuXHRyZXR1cm4gaWdub3JlS2V5c1trZXldO1xufTtcbnZhciBpc0V2ZW50S2V5ID0gZnVuY3Rpb24gaXNFdmVudEtleShrZXkpIHtcblx0cmV0dXJuIEVWRU5UX0tFWVMudGVzdChrZXkpO1xufTtcbnZhciBpc0lubmVySFRNTEtleSA9IGZ1bmN0aW9uIGlzSW5uZXJIVE1MS2V5KGtleSkge1xuXHRyZXR1cm4ga2V5ID09PSAnZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwnO1xufTtcbnZhciBpc1N0eWxlS2V5ID0gZnVuY3Rpb24gaXNTdHlsZUtleShrZXkpIHtcblx0cmV0dXJuIGtleSA9PT0gJ3N0eWxlJztcbn07XG52YXIgc2V0UHJvcCA9IGZ1bmN0aW9uIHNldFByb3AoZWxlbSwga2V5LCB2YWx1ZSkge1xuXHRzd2l0Y2ggKHRydWUpIHtcblx0XHRjYXNlIGlzSWdub3JlS2V5KGtleSk6XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIGlzRXZlbnRLZXkoa2V5KTpcblx0XHRcdHNldEV2ZW50KGVsZW0sIGtleSwgdmFsdWUpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBpc1N0eWxlS2V5KGtleSk6XG5cdFx0XHRzZXRTdHlsZShlbGVtLCB2YWx1ZSk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIGlzSW5uZXJIVE1MS2V5KGtleSk6XG5cdFx0XHR2YWx1ZSAmJiBpc1N0cih2YWx1ZS5fX2h0bWwpICYmIChlbGVtLmlubmVySFRNTCA9IHZhbHVlLl9faHRtbCk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIGtleSBpbiBlbGVtOlxuXHRcdFx0ZWxlbVtrZXldID0gdmFsdWU7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG5cdH1cbn07XG52YXIgc2V0UHJvcHMgPSBmdW5jdGlvbiBzZXRQcm9wcyhlbGVtLCBwcm9wcykge1xuXHRtYXBWYWx1ZShwcm9wcywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcblx0XHRzZXRQcm9wKGVsZW0sIGtleSwgdmFsdWUpO1xuXHR9KTtcbn07XG52YXIgcmVtb3ZlUHJvcHMgPSBmdW5jdGlvbiByZW1vdmVQcm9wcyhlbGVtLCBvbGRQcm9wcykge1xuXHRtYXBWYWx1ZShvbGRQcm9wcywgZnVuY3Rpb24gKG9sZFZhbHVlLCBrZXkpIHtcblx0XHRyZW1vdmVQcm9wKGVsZW0sIGtleSwgb2xkVmFsdWUpO1xuXHR9KTtcbn07XG52YXIgcmVtb3ZlUHJvcCA9IGZ1bmN0aW9uIHJlbW92ZVByb3AoZWxlbSwga2V5LCBvbGRWYWx1ZSkge1xuXHRzd2l0Y2ggKHRydWUpIHtcblx0XHRjYXNlIGlzSWdub3JlS2V5KGtleSk6XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIGlzRXZlbnRLZXkoa2V5KTpcblx0XHRcdHJlbW92ZUV2ZW50KGVsZW0sIGtleSk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIGlzU3R5bGVLZXkoa2V5KTpcblx0XHRcdHJlbW92ZVN0eWxlKGVsZW0sIG9sZFZhbHVlKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgaXNJbm5lckhUTUxLZXkoa2V5KTpcblx0XHRcdGVsZW0uaW5uZXJIVE1MID0gJyc7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICEoa2V5IGluIGVsZW0pOlxuXHRcdFx0cmVtb3ZlQXR0cihlbGVtLCBrZXkpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBpc0ZuKG9sZFZhbHVlKTpcblx0XHRcdGVsZW1ba2V5XSA9IG51bGw7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIGlzU3RyKG9sZFZhbHVlKTpcblx0XHRcdGVsZW1ba2V5XSA9ICcnO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBpc0JsbihvbGRWYWx1ZSk6XG5cdFx0XHRlbGVtW2tleV0gPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRlbGVtW2tleV0gPSBudWxsO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHQvL3Bhc3Ncblx0XHRcdH1cblx0fVxufTtcbnZhciBwYXRjaFByb3BzID0gZnVuY3Rpb24gcGF0Y2hQcm9wcyhlbGVtLCBwcm9wcywgbmV3UHJvcHMpIHtcblx0aWYgKHByb3BzID09PSBuZXdQcm9wcykge1xuXHRcdHJldHVybjtcblx0fVxuXHRpZiAoIXByb3BzICYmIG5ld1Byb3BzKSB7XG5cdFx0c2V0UHJvcHMoZWxlbSwgbmV3UHJvcHMpO1xuXHRcdHJldHVybjtcblx0fSBlbHNlIGlmICghbmV3UHJvcHMgJiYgcHJvcHMpIHtcblx0XHRyZW1vdmVQcm9wcyhlbGVtLCBwcm9wcyk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0bWFwS2V5KFtwcm9wcywgbmV3UHJvcHNdLCBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0aWYgKGlzSWdub3JlS2V5KGtleSkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dmFyIHZhbHVlID0gbmV3UHJvcHNba2V5XTtcblx0XHR2YXIgb2xkVmFsdWUgPSBrZXkgPT09ICd2YWx1ZScgPyBlbGVtLnZhbHVlIDogcHJvcHNba2V5XTtcblx0XHRpZiAodmFsdWUgPT09IG9sZFZhbHVlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpIHtcblx0XHRcdHJlbW92ZVByb3AoZWxlbSwga2V5LCBvbGRWYWx1ZSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmIChpc1N0eWxlS2V5KGtleSkpIHtcblx0XHRcdHBhdGNoU3R5bGUoZWxlbSwgb2xkVmFsdWUsIHZhbHVlKTtcblx0XHR9IGVsc2UgaWYgKGlzSW5uZXJIVE1MS2V5KGtleSkpIHtcblx0XHRcdHZhciBvbGRIdG1sID0gb2xkVmFsdWUgJiYgb2xkVmFsdWUuX19odG1sO1xuXHRcdFx0dmFyIGh0bWwgPSB2YWx1ZSAmJiB2YWx1ZS5fX2h0bWw7XG5cdFx0XHRpZiAoIWlzU3RyKGh0bWwpKSB7XG5cdFx0XHRcdGVsZW0uaW5uZXJIVE1MID0gJyc7XG5cdFx0XHR9IGVsc2UgaWYgKGh0bWwgIT09IG9sZEh0bWwpIHtcblx0XHRcdFx0ZWxlbS5pbm5lckhUTUwgPSBodG1sO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRzZXRQcm9wKGVsZW0sIGtleSwgdmFsdWUpO1xuXHRcdH1cblx0fSk7XG59O1xuXG52YXIgcmVtb3ZlU3R5bGUgPSBmdW5jdGlvbiByZW1vdmVTdHlsZShlbGVtLCBzdHlsZSkge1xuXHRpZiAoIWlzT2JqKHN0eWxlKSkge1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgZWxlbVN0eWxlID0gZWxlbS5zdHlsZTtcblx0bWFwVmFsdWUoc3R5bGUsIGZ1bmN0aW9uIChfLCBrZXkpIHtcblx0XHRlbGVtU3R5bGVba2V5XSA9ICcnO1xuXHR9KTtcbn07XG52YXIgc2V0U3R5bGUgPSBmdW5jdGlvbiBzZXRTdHlsZShlbGVtLCBzdHlsZSkge1xuXHRpZiAoIWlzT2JqKHN0eWxlKSkge1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgZWxlbVN0eWxlID0gZWxlbS5zdHlsZTtcblx0bWFwVmFsdWUoc3R5bGUsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG5cdFx0c2V0U3R5bGVWYWx1ZShlbGVtU3R5bGUsIGtleSwgdmFsdWUpO1xuXHR9KTtcbn07XG52YXIgcGF0Y2hTdHlsZSA9IGZ1bmN0aW9uIHBhdGNoU3R5bGUoZWxlbSwgc3R5bGUsIG5ld1N0eWxlKSB7XG5cdGlmIChzdHlsZSA9PT0gbmV3U3R5bGUpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0aWYgKCFuZXdTdHlsZSAmJiBzdHlsZSkge1xuXHRcdHJlbW92ZVN0eWxlKGVsZW0sIHN0eWxlKTtcblx0fSBlbHNlIGlmIChuZXdTdHlsZSAmJiAhc3R5bGUpIHtcblx0XHRzZXRTdHlsZShlbGVtLCBuZXdTdHlsZSk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGVsZW1TdHlsZSA9IGVsZW0uc3R5bGU7XG5cdFx0bWFwS2V5KFtzdHlsZSwgbmV3U3R5bGVdLCBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBuZXdTdHlsZVtrZXldO1xuXHRcdFx0dmFyIG9sZFZhbHVlID0gc3R5bGVba2V5XTtcblx0XHRcdGlmICh2YWx1ZSAhPT0gb2xkVmFsdWUpIHtcblx0XHRcdFx0c2V0U3R5bGVWYWx1ZShlbGVtU3R5bGUsIGtleSwgdmFsdWUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59O1xuXG52YXIgaXNVbml0bGVzc051bWJlciA9IHtcblx0YW5pbWF0aW9uSXRlcmF0aW9uQ291bnQ6IHRydWUsXG5cdGJveEZsZXg6IHRydWUsXG5cdGJveEZsZXhHcm91cDogdHJ1ZSxcblx0Ym94T3JkaW5hbEdyb3VwOiB0cnVlLFxuXHRjb2x1bW5Db3VudDogdHJ1ZSxcblx0ZmxleDogdHJ1ZSxcblx0ZmxleEdyb3c6IHRydWUsXG5cdGZsZXhQb3NpdGl2ZTogdHJ1ZSxcblx0ZmxleFNocmluazogdHJ1ZSxcblx0ZmxleE5lZ2F0aXZlOiB0cnVlLFxuXHRmbGV4T3JkZXI6IHRydWUsXG5cdGZvbnRXZWlnaHQ6IHRydWUsXG5cdGxpbmVDbGFtcDogdHJ1ZSxcblx0bGluZUhlaWdodDogdHJ1ZSxcblx0b3BhY2l0eTogdHJ1ZSxcblx0b3JkZXI6IHRydWUsXG5cdG9ycGhhbnM6IHRydWUsXG5cdHRhYlNpemU6IHRydWUsXG5cdHdpZG93czogdHJ1ZSxcblx0ekluZGV4OiB0cnVlLFxuXHR6b29tOiB0cnVlLFxuXG5cdC8vIFNWRy1yZWxhdGVkIHByb3BlcnRpZXNcblx0ZmlsbE9wYWNpdHk6IHRydWUsXG5cdHN0b3BPcGFjaXR5OiB0cnVlLFxuXHRzdHJva2VEYXNob2Zmc2V0OiB0cnVlLFxuXHRzdHJva2VPcGFjaXR5OiB0cnVlLFxuXHRzdHJva2VXaWR0aDogdHJ1ZVxufTtcblxudmFyIGlzVW5pdGxlc3NOdW1iZXJXaXRoUHJlZml4ID0ge307XG52YXIgcHJlZml4ZXMgPSBbJ1dlYmtpdCcsICdtcycsICdNb3onLCAnTyddO1xudmFyIHByZWZpeEtleSA9IGZ1bmN0aW9uIHByZWZpeEtleShwcmVmaXgsIGtleSkge1xuXHRyZXR1cm4gcHJlZml4ICsga2V5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsga2V5LnN1YnN0cmluZygxKTtcbn07XG5tYXBWYWx1ZShpc1VuaXRsZXNzTnVtYmVyLCBmdW5jdGlvbiAoXywgcHJvcCkge1xuXHRlYWNoSXRlbShwcmVmaXhlcywgZnVuY3Rpb24gKHByZWZpeCkge1xuXHRcdHJldHVybiBpc1VuaXRsZXNzTnVtYmVyV2l0aFByZWZpeFtwcmVmaXhLZXkocHJlZml4LCBwcm9wKV0gPSB0cnVlO1xuXHR9KTtcbn0pO1xubWFwVmFsdWUoaXNVbml0bGVzc051bWJlcldpdGhQcmVmaXgsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG5cdGlzVW5pdGxlc3NOdW1iZXJba2V5XSA9IHZhbHVlO1xufSk7XG5cbnZhciBSRV9OVU1CRVIgPSAvXi0/XFxkKyhcXC5cXGQrKT8kLztcbnZhciBzZXRTdHlsZVZhbHVlID0gZnVuY3Rpb24gc2V0U3R5bGVWYWx1ZShzdHlsZSwga2V5LCB2YWx1ZSkge1xuXHRpZiAoaXNCbG4odmFsdWUpIHx8IHZhbHVlID09IG51bGwpIHtcblx0XHR2YWx1ZSA9ICcnO1xuXHR9XG5cdGlmICghaXNVbml0bGVzc051bWJlcltrZXldICYmIFJFX05VTUJFUi50ZXN0KHZhbHVlKSkge1xuXHRcdHN0eWxlW2tleV0gPSB2YWx1ZSArICdweCc7XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGVba2V5XSA9IHZhbHVlO1xuXHR9XG59O1xuXG52YXIgVk5PREVfVFlQRSA9IHtcblx0RUxFTUVOVDogMSxcblx0Q09NUE9ORU5UOiAyLFxuXHRTVEFURUxFU1NfQ09NUE9ORU5UOiAzLFxuXHRURVhUOiA0XG59O1xudmFyIERJRkZfVFlQRSA9IHtcblx0Q1JFQVRFOiAxLFxuXHRSRU1PVkU6IDIsXG5cdFJFUExBQ0U6IDMsXG5cdFVQREFURTogNFxufTtcblxudmFyIENPTVBPTkVOVF9JRCA9ICdkYXRhLWxpdGVpZCc7XG5cbnZhciBzdG9yZSA9IHt9O1xudmFyIHJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcih2dHJlZSwgY29udGFpbmVyLCBjYWxsYmFjaykge1xuXHRpZiAoIXZ0cmVlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgcmVuZGVyICcgKyB2dHJlZSArICcgdG8gY29udGFpbmVyJyk7XG5cdH1cblx0dmFyIGlkID0gZ2V0QXR0cihjb250YWluZXIsIENPTVBPTkVOVF9JRCk7XG5cdGlmIChzdG9yZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcblx0XHRzdG9yZVtpZF0udXBkYXRlVHJlZSh2dHJlZSwgY29udGFpbmVyKTtcblx0fSBlbHNlIHtcblx0XHRzZXRBdHRyKGNvbnRhaW5lciwgQ09NUE9ORU5UX0lELCBpZCA9IGdldFVpZCgpKTtcblx0XHRjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG5cdFx0dnRyZWUuaW5pdFRyZWUoY29udGFpbmVyKTtcblx0fVxuXHRzdG9yZVtpZF0gPSB2dHJlZTtcblxuXHR2YXIgcmVzdWx0ID0gbnVsbDtcblx0c3dpdGNoICh2dHJlZS52dHlwZSkge1xuXHRcdGNhc2UgVk5PREVfVFlQRS5FTEVNRU5UOlxuXHRcdFx0cmVzdWx0ID0gY29udGFpbmVyLmZpcnN0Q2hpbGQ7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFZOT0RFX1RZUEUuQ09NUE9ORU5UOlxuXHRcdFx0cmVzdWx0ID0gdnRyZWUuY29tcG9uZW50O1xuXHRcdFx0YnJlYWs7XG5cdH1cblxuXHRpZiAoaXNGbihjYWxsYmFjaykpIHtcblx0XHRjYWxsYmFjay5jYWxsKHJlc3VsdCk7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcblxudmFyIHVubW91bnRDb21wb25lbnRBdE5vZGUgPSBmdW5jdGlvbiB1bm1vdW50Q29tcG9uZW50QXROb2RlKGNvbnRhaW5lcikge1xuXHR2YXIgaWQgPSBnZXRBdHRyKGNvbnRhaW5lciwgQ09NUE9ORU5UX0lEKTtcblx0aWYgKHN0b3JlLmhhc093blByb3BlcnR5KGlkKSkge1xuXHRcdHN0b3JlW2lkXS5kZXN0cm95VHJlZSgpO1xuXHRcdGRlbGV0ZSBzdG9yZVtpZF07XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufTtcblxudmFyIGZpbmRET01Ob2RlID0gZnVuY3Rpb24gZmluZERPTU5vZGUobm9kZSkge1xuXHRpZiAobm9kZSA9PSBudWxsKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0aWYgKG5vZGUubm9kZU5hbWUpIHtcblx0XHRyZXR1cm4gbm9kZTtcblx0fVxuXHR2YXIgY29tcG9uZW50ID0gbm9kZTtcblx0Ly8gaWYgY29tcG9uZW50Lm5vZGUgZXF1YWwgdG8gZmFsc2UsIGNvbXBvbmVudCBtdXN0IGJlIHVubW91bnRlZFxuXHRpZiAoaXNGbihjb21wb25lbnQuZ2V0RE9NTm9kZSkgJiYgY29tcG9uZW50Lm5vZGUpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50LmdldERPTU5vZGUoKTtcblx0fVxuXHR0aHJvdyBuZXcgRXJyb3IoJ2ZpbmRET01Ob2RlIGNhbiBub3QgZmluZCBOb2RlJyk7XG59O1xuXG52YXIgY2hlY2sgPSBmdW5jdGlvbiBjaGVjaygpIHtcbiAgICByZXR1cm4gY2hlY2s7XG59O1xuY2hlY2suaXNSZXF1aXJlZCA9IGNoZWNrO1xudmFyIFByb3BUeXBlcyA9IHtcbiAgICBcImFycmF5XCI6IGNoZWNrLFxuICAgIFwiYm9vbFwiOiBjaGVjayxcbiAgICBcImZ1bmNcIjogY2hlY2ssXG4gICAgXCJudW1iZXJcIjogY2hlY2ssXG4gICAgXCJvYmplY3RcIjogY2hlY2ssXG4gICAgXCJzdHJpbmdcIjogY2hlY2ssXG4gICAgXCJhbnlcIjogY2hlY2ssXG4gICAgXCJhcnJheU9mXCI6IGNoZWNrLFxuICAgIFwiZWxlbWVudFwiOiBjaGVjayxcbiAgICBcImluc3RhbmNlT2ZcIjogY2hlY2ssXG4gICAgXCJub2RlXCI6IGNoZWNrLFxuICAgIFwib2JqZWN0T2ZcIjogY2hlY2ssXG4gICAgXCJvbmVPZlwiOiBjaGVjayxcbiAgICBcIm9uZU9mVHlwZVwiOiBjaGVjayxcbiAgICBcInNoYXBlXCI6IGNoZWNrXG59O1xuXG5mdW5jdGlvbiBVcGRhdGVyKGluc3RhbmNlKSB7XG5cdHZhciBfdGhpcyA9IHRoaXM7XG5cblx0dGhpcy5pbnN0YW5jZSA9IGluc3RhbmNlO1xuXHR0aGlzLnBlbmRpbmdTdGF0ZXMgPSBbXTtcblx0dGhpcy5wZW5kaW5nQ2FsbGJhY2tzID0gW107XG5cdHRoaXMuaXNQZW5kaW5nID0gZmFsc2U7XG5cdHRoaXMuYmluZENsZWFyID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBfdGhpcy5jbGVhckNhbGxiYWNrcygpO1xuXHR9O1xufVxuXG5VcGRhdGVyLnByb3RvdHlwZSA9IHtcblx0Y29uc3RydWN0b3I6IFVwZGF0ZXIsXG5cdGVtaXRVcGRhdGU6IGZ1bmN0aW9uIGVtaXRVcGRhdGUobmV4dFByb3BzLCBuZXh0Q29udGV4dCkge1xuXHRcdHZhciBpbnN0YW5jZSA9IHRoaXMuaW5zdGFuY2U7XG5cdFx0dmFyIHBlbmRpbmdTdGF0ZXMgPSB0aGlzLnBlbmRpbmdTdGF0ZXM7XG5cdFx0dmFyIGJpbmRDbGVhciA9IHRoaXMuYmluZENsZWFyO1xuXG5cdFx0aWYgKG5leHRQcm9wcyB8fCBwZW5kaW5nU3RhdGVzLmxlbmd0aCA+IDApIHtcblx0XHRcdHZhciBwcm9wcyA9IG5leHRQcm9wcyB8fCBpbnN0YW5jZS5wcm9wcztcblx0XHRcdHNob3VsZFVwZGF0ZShpbnN0YW5jZSwgcHJvcHMsIHRoaXMuZ2V0U3RhdGUoKSwgbmV4dENvbnRleHQsIGJpbmRDbGVhcik7XG5cdFx0fVxuXHR9LFxuXHRhZGRTdGF0ZTogZnVuY3Rpb24gYWRkU3RhdGUobmV4dFN0YXRlKSB7XG5cdFx0aWYgKG5leHRTdGF0ZSkge1xuXHRcdFx0dGhpcy5wZW5kaW5nU3RhdGVzLnB1c2gobmV4dFN0YXRlKTtcblx0XHRcdGlmICghdGhpcy5pc1BlbmRpbmcpIHtcblx0XHRcdFx0dGhpcy5lbWl0VXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRyZXBsYWNlU3RhdGU6IGZ1bmN0aW9uIHJlcGxhY2VTdGF0ZShuZXh0U3RhdGUpIHtcblx0XHR2YXIgcGVuZGluZ1N0YXRlcyA9IHRoaXMucGVuZGluZ1N0YXRlcztcblxuXHRcdHBlbmRpbmdTdGF0ZXMucG9wKCk7XG5cdFx0cGVuZGluZ1N0YXRlcy5wdXNoKFtuZXh0U3RhdGVdKTtcblx0fSxcblx0Z2V0U3RhdGU6IGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuXHRcdHZhciBpbnN0YW5jZSA9IHRoaXMuaW5zdGFuY2U7XG5cdFx0dmFyIHBlbmRpbmdTdGF0ZXMgPSB0aGlzLnBlbmRpbmdTdGF0ZXM7XG5cdFx0dmFyIHN0YXRlID0gaW5zdGFuY2Uuc3RhdGU7XG5cdFx0dmFyIHByb3BzID0gaW5zdGFuY2UucHJvcHM7XG5cblx0XHR2YXIgbWVyZ2UgPSBmdW5jdGlvbiBtZXJnZShfeCkge1xuXHRcdFx0dmFyIF9hZ2FpbiA9IHRydWU7XG5cblx0XHRcdF9mdW5jdGlvbjogd2hpbGUgKF9hZ2Fpbikge1xuXHRcdFx0XHR2YXIgbmV4dFN0YXRlID0gX3g7XG5cdFx0XHRcdF9hZ2FpbiA9IGZhbHNlO1xuXG5cdFx0XHRcdC8vIHJlcGxhY2Ugc3RhdGVcblx0XHRcdFx0aWYgKGlzQXJyKG5leHRTdGF0ZSkpIHtcblx0XHRcdFx0XHRzdGF0ZSA9IG51bGw7XG5cdFx0XHRcdFx0X3ggPSBuZXh0U3RhdGVbMF07XG5cdFx0XHRcdFx0X2FnYWluID0gdHJ1ZTtcblx0XHRcdFx0XHRjb250aW51ZSBfZnVuY3Rpb247XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGlzRm4obmV4dFN0YXRlKSkge1xuXHRcdFx0XHRcdG5leHRTdGF0ZSA9IG5leHRTdGF0ZS5jYWxsKGluc3RhbmNlLCBzdGF0ZSwgcHJvcHMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHN0YXRlID0gZXh0ZW5kKHt9LCBzdGF0ZSwgbmV4dFN0YXRlKTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdGVhY2hJdGVtKHBlbmRpbmdTdGF0ZXMsIG1lcmdlKTtcblx0XHRwZW5kaW5nU3RhdGVzLmxlbmd0aCA9IDA7XG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9LFxuXHRjbGVhckNhbGxiYWNrczogZnVuY3Rpb24gY2xlYXJDYWxsYmFja3MoKSB7XG5cdFx0dmFyIHBlbmRpbmdDYWxsYmFja3MgPSB0aGlzLnBlbmRpbmdDYWxsYmFja3M7XG5cdFx0dmFyIGluc3RhbmNlID0gdGhpcy5pbnN0YW5jZTtcblxuXHRcdGlmIChwZW5kaW5nQ2FsbGJhY2tzLmxlbmd0aCA+IDApIHtcblx0XHRcdGVhY2hJdGVtKHBlbmRpbmdDYWxsYmFja3MsIGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0XHRyZXR1cm4gY2FsbGJhY2suY2FsbChpbnN0YW5jZSk7XG5cdFx0XHR9KTtcblx0XHRcdHBlbmRpbmdDYWxsYmFja3MubGVuZ3RoID0gMDtcblx0XHR9XG5cdH0sXG5cdGFkZENhbGxiYWNrOiBmdW5jdGlvbiBhZGRDYWxsYmFjayhjYWxsYmFjaykge1xuXHRcdGlmIChpc0ZuKGNhbGxiYWNrKSkge1xuXHRcdFx0dGhpcy5wZW5kaW5nQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuXHRcdH1cblx0fVxufTtcbmZ1bmN0aW9uIENvbXBvbmVudChwcm9wcywgY29udGV4dCkge1xuXHR0aGlzLiR1cGRhdGVyID0gbmV3IFVwZGF0ZXIodGhpcyk7XG5cdHRoaXMuJGNhY2hlID0geyBpc01vdW50ZWQ6IGZhbHNlIH07XG5cdHRoaXMucHJvcHMgPSBwcm9wcztcblx0dGhpcy5zdGF0ZSA9IHt9O1xuXHR0aGlzLnJlZnMgPSB7fTtcblx0dGhpcy5jb250ZXh0ID0gY29udGV4dCB8fCB7fTtcbn1cblxudmFyIG5vb3AgPSBmdW5jdGlvbiBub29wKCkge307XG5Db21wb25lbnQucHJvdG90eXBlID0ge1xuXHRjb25zdHJ1Y3RvcjogQ29tcG9uZW50LFxuXHRnZXRDaGlsZENvbnRleHQ6IG5vb3AsXG5cdGNvbXBvbmVudFdpbGxVcGRhdGU6IG5vb3AsXG5cdGNvbXBvbmVudERpZFVwZGF0ZTogbm9vcCxcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogbm9vcCxcblx0Y29tcG9uZW50V2lsbE1vdW50OiBub29wLFxuXHRjb21wb25lbnREaWRNb3VudDogbm9vcCxcblx0Y29tcG9uZW50V2lsbFVubW91bnQ6IG5vb3AsXG5cdHNob3VsZENvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGZvcmNlVXBkYXRlOiBmdW5jdGlvbiBmb3JjZVVwZGF0ZShjYWxsYmFjaykge1xuXHRcdHZhciAkdXBkYXRlciA9IHRoaXMuJHVwZGF0ZXI7XG5cdFx0dmFyICRjYWNoZSA9IHRoaXMuJGNhY2hlO1xuXHRcdHZhciBwcm9wcyA9IHRoaXMucHJvcHM7XG5cdFx0dmFyIHN0YXRlID0gdGhpcy5zdGF0ZTtcblx0XHR2YXIgY29udGV4dCA9IHRoaXMuY29udGV4dDtcblx0XHR2YXIgdnRyZWUgPSB0aGlzLnZ0cmVlO1xuXHRcdHZhciBub2RlID0gdGhpcy5ub2RlO1xuXG5cdFx0dmFyIG5leHRQcm9wcyA9ICRjYWNoZS5wcm9wcyB8fCBwcm9wcztcblx0XHR2YXIgbmV4dFN0YXRlID0gJGNhY2hlLnN0YXRlIHx8IHN0YXRlO1xuXHRcdHZhciBuZXh0Q29udGV4dCA9ICRjYWNoZS5jb250ZXh0IHx8IHt9O1xuXHRcdCRjYWNoZS5wcm9wcyA9ICRjYWNoZS5zdGF0ZSA9ICRjYWNoZS5jb250ZXh0ID0gbnVsbDtcblx0XHR0aGlzLmNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KTtcblx0XHR0aGlzLnByb3BzID0gbmV4dFByb3BzO1xuXHRcdHRoaXMuc3RhdGUgPSBuZXh0U3RhdGU7XG5cdFx0dGhpcy5jb250ZXh0ID0gbmV4dENvbnRleHQ7XG5cdFx0JHVwZGF0ZXIuaXNQZW5kaW5nID0gdHJ1ZTtcblx0XHR2YXIgbmV4dFZ0cmVlID0gcmVuZGVyQ29tcG9uZW50KHRoaXMsICRjYWNoZS4kY29udGV4dCk7XG5cdFx0dnRyZWUudXBkYXRlVHJlZShuZXh0VnRyZWUsIG5vZGUgJiYgbm9kZS5wYXJlbnROb2RlKTtcblx0XHQkdXBkYXRlci5pc1BlbmRpbmcgPSBmYWxzZTtcblx0XHR0aGlzLnZ0cmVlID0gbmV4dFZ0cmVlO1xuXHRcdHRoaXMubm9kZSA9IG5leHRWdHJlZS5ub2RlO1xuXHRcdHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKHByb3BzLCBzdGF0ZSwgY29udGV4dCk7XG5cdFx0aWYgKGlzRm4oY2FsbGJhY2spKSB7XG5cdFx0XHRjYWxsYmFjay5jYWxsKHRoaXMpO1xuXHRcdH1cblx0XHQkdXBkYXRlci5lbWl0VXBkYXRlKCk7XG5cdH0sXG5cdHNldFN0YXRlOiBmdW5jdGlvbiBzZXRTdGF0ZShuZXh0U3RhdGUsIGNhbGxiYWNrKSB7XG5cdFx0dmFyICR1cGRhdGVyID0gdGhpcy4kdXBkYXRlcjtcblxuXHRcdCR1cGRhdGVyLmFkZENhbGxiYWNrKGNhbGxiYWNrKTtcblx0XHQkdXBkYXRlci5hZGRTdGF0ZShuZXh0U3RhdGUpO1xuXHR9LFxuXHRyZXBsYWNlU3RhdGU6IGZ1bmN0aW9uIHJlcGxhY2VTdGF0ZShuZXh0U3RhdGUsIGNhbGxiYWNrKSB7XG5cdFx0dmFyICR1cGRhdGVyID0gdGhpcy4kdXBkYXRlcjtcblxuXHRcdCR1cGRhdGVyLmFkZENhbGxiYWNrKGNhbGxiYWNrKTtcblx0XHQkdXBkYXRlci5yZXBsYWNlU3RhdGUobmV4dFN0YXRlKTtcblx0fSxcblx0Z2V0RE9NTm9kZTogZnVuY3Rpb24gZ2V0RE9NTm9kZSgpIHtcblx0XHR2YXIgbm9kZSA9IHRoaXMudnRyZWUubm9kZTtcblx0XHRyZXR1cm4gbm9kZSAmJiBub2RlLnRhZ05hbWUgPT09ICdOT1NDUklQVCcgPyBudWxsIDogbm9kZTtcblx0fSxcblx0aXNNb3VudGVkOiBmdW5jdGlvbiBpc01vdW50ZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuJGNhY2hlLmlzTW91bnRlZDtcblx0fVxufTtcblxudmFyIHVwZGF0ZVByb3BzQW5kU3RhdGUgPSBmdW5jdGlvbiB1cGRhdGVQcm9wc0FuZFN0YXRlKGNvbXBvbmVudCwgcHJvcHMsIHN0YXRlLCBjb250ZXh0KSB7XG5cdGNvbXBvbmVudC5zdGF0ZSA9IHN0YXRlO1xuXHRjb21wb25lbnQucHJvcHMgPSBwcm9wcztcblx0Y29tcG9uZW50LmNvbnRleHQgPSBjb250ZXh0IHx8IHt9O1xufTtcblxudmFyIHNob3VsZFVwZGF0ZSA9IGZ1bmN0aW9uIHNob3VsZFVwZGF0ZShjb21wb25lbnQsIG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCwgY2FsbGJhY2spIHtcblx0dmFyIHNob3VsZENvbXBvbmVudFVwZGF0ZSA9IGNvbXBvbmVudC5zaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KTtcblx0aWYgKHNob3VsZENvbXBvbmVudFVwZGF0ZSA9PT0gZmFsc2UpIHtcblx0XHR1cGRhdGVQcm9wc0FuZFN0YXRlKGNvbXBvbmVudCwgbmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KTtcblx0XHRyZXR1cm47XG5cdH1cblx0dXBkYXRlUHJvcHNBbmRTdGF0ZShjb21wb25lbnQuJGNhY2hlLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQpO1xuXHRjb21wb25lbnQuZm9yY2VVcGRhdGUoY2FsbGJhY2spO1xufTtcblxudmFyIGRpZmYgPSBmdW5jdGlvbiBkaWZmKHZub2RlLCBuZXdWbm9kZSkge1xuXHR2YXIgdHlwZSA9IHVuZGVmaW5lZDtcblx0c3dpdGNoICh0cnVlKSB7XG5cdFx0Y2FzZSB2bm9kZSA9PT0gbmV3Vm5vZGU6XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRjYXNlIGlzVW5kZWZpbmVkKG5ld1Zub2RlKTpcblx0XHRcdHR5cGUgPSBESUZGX1RZUEUuUkVNT1ZFO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBpc1VuZGVmaW5lZCh2bm9kZSk6XG5cdFx0XHR0eXBlID0gRElGRl9UWVBFLkNSRUFURTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2Ugdm5vZGUudHlwZSAhPT0gbmV3Vm5vZGUudHlwZTpcblx0XHRcdHR5cGUgPSBESUZGX1RZUEUuUkVQTEFDRTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgbmV3Vm5vZGUua2V5ICE9PSBudWxsOlxuXHRcdFx0aWYgKHZub2RlLmtleSA9PT0gbnVsbCB8fCBuZXdWbm9kZS5rZXkgIT09IHZub2RlLmtleSkge1xuXHRcdFx0XHR0eXBlID0gRElGRl9UWVBFLlJFUExBQ0U7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0eXBlID0gRElGRl9UWVBFLlVQREFURTtcblx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXHRcdGNhc2Ugdm5vZGUua2V5ICE9PSBudWxsOlxuXHRcdFx0dHlwZSA9IERJRkZfVFlQRS5SRVBMQUNFO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHR5cGUgPSBESUZGX1RZUEUuVVBEQVRFO1xuXHR9XG5cdHJldHVybiB0eXBlO1xufTtcblxuZnVuY3Rpb24gVnRyZWUocHJvcGVydGllcykge1xuXHRleHRlbmQodGhpcywgcHJvcGVydGllcyk7XG59XG5cbnZhciBub29wJDEgPSBmdW5jdGlvbiBub29wKCkge307XG52YXIgZ2V0RE9NTm9kZSA9IGZ1bmN0aW9uIGdldERPTU5vZGUoKSB7XG5cdHJldHVybiB0aGlzO1xufTtcblZ0cmVlLnByb3RvdHlwZSA9IHtcblx0Y29uc3RydWN0b3I6IFZ0cmVlLFxuXHRtYXBUcmVlOiBub29wJDEsXG5cdGF0dGFjaFJlZjogZnVuY3Rpb24gYXR0YWNoUmVmKCkge1xuXHRcdHZhciByZWZLZXkgPSB0aGlzLnJlZjtcblx0XHR2YXIgcmVmcyA9IHRoaXMucmVmcztcblx0XHR2YXIgdnR5cGUgPSB0aGlzLnZ0eXBlO1xuXG5cdFx0aWYgKCFyZWZzIHx8IHJlZktleSA9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHZhciByZWZWYWx1ZSA9IHVuZGVmaW5lZDtcblx0XHRpZiAodnR5cGUgPT09IFZOT0RFX1RZUEUuRUxFTUVOVCkge1xuXHRcdFx0cmVmVmFsdWUgPSB0aGlzLm5vZGU7XG5cdFx0XHQvLyBzdXBwb3J0IHJlYWN0IHYwLjEzIHN0eWxlOiB0aGlzLnJlZnMubXlJbnB1dC5nZXRET01Ob2RlKClcblx0XHRcdHJlZlZhbHVlLmdldERPTU5vZGUgPSBnZXRET01Ob2RlO1xuXHRcdH0gZWxzZSBpZiAodnR5cGUgPT09IFZOT0RFX1RZUEUuQ09NUE9ORU5UKSB7XG5cdFx0XHRyZWZWYWx1ZSA9IHRoaXMuY29tcG9uZW50O1xuXHRcdH1cblx0XHRpZiAocmVmVmFsdWUpIHtcblx0XHRcdGlmIChpc0ZuKHJlZktleSkpIHtcblx0XHRcdFx0cmVmS2V5KHJlZlZhbHVlKTtcblx0XHRcdH0gZWxzZSBpZiAoaXNTdHIocmVmS2V5KSkge1xuXHRcdFx0XHRyZWZzW3JlZktleV0gPSByZWZWYWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGRldGFjaFJlZjogZnVuY3Rpb24gZGV0YWNoUmVmKCkge1xuXHRcdHZhciByZWZLZXkgPSB0aGlzLnJlZjtcblx0XHR2YXIgcmVmcyA9IHRoaXMucmVmcztcblxuXHRcdGlmICghcmVmcyB8fCByZWZLZXkgPT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAoaXNGbihyZWZLZXkpKSB7XG5cdFx0XHRyZWZLZXkobnVsbCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlbGV0ZSByZWZzW3JlZktleV07XG5cdFx0fVxuXHR9LFxuXHR1cGRhdGVSZWY6IGZ1bmN0aW9uIHVwZGF0ZVJlZihuZXdWdHJlZSkge1xuXHRcdGlmICghdGhpcy5yZWZzKSB7XG5cdFx0XHRuZXdWdHJlZS5hdHRhY2hSZWYoKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKCFuZXdWdHJlZS5yZWZzKSB7XG5cdFx0XHR0aGlzLmRldGFjaFJlZigpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAodGhpcy5yZWZzICE9PSBuZXdWdHJlZS5yZWZzKSB7XG5cdFx0XHR0aGlzLmRldGFjaFJlZigpO1xuXHRcdFx0bmV3VnRyZWUuYXR0YWNoUmVmKCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHZhciBvbGRSZWYgPSB0aGlzLnJlZjtcblx0XHR2YXIgbmV3UmVmID0gbmV3VnRyZWUucmVmO1xuXHRcdGlmIChuZXdSZWYgPT0gbnVsbCkge1xuXHRcdFx0dGhpcy5kZXRhY2hSZWYoKTtcblx0XHR9IGVsc2UgaWYgKG9sZFJlZiAhPT0gbmV3UmVmKSB7XG5cdFx0XHR0aGlzLmRldGFjaFJlZigpO1xuXHRcdFx0bmV3VnRyZWUuYXR0YWNoUmVmKCk7XG5cdFx0fVxuXHR9LFxuXHR1cGRhdGVUcmVlOiBmdW5jdGlvbiB1cGRhdGVUcmVlKG5leHRWdHJlZSwgcGFyZW50Tm9kZSkge1xuXHRcdGNvbXBhcmVUd29UcmVlKHRoaXMsIG5leHRWdHJlZSwgcGFyZW50Tm9kZSk7XG5cdH1cbn07XG5cbmZ1bmN0aW9uIFZ0ZXh0KHRleHQpIHtcblx0dGhpcy50ZXh0ID0gdGV4dDtcbn1cblxuVnRleHQucHJvdG90eXBlID0gbmV3IFZ0cmVlKHtcblx0Y29uc3RydWN0b3I6IFZ0ZXh0LFxuXHR2dHlwZTogVk5PREVfVFlQRS5URVhULFxuXHR1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShuZXh0VnRleHQpIHtcblx0XHR2YXIgbm9kZSA9IHRoaXMubm9kZTtcblx0XHR2YXIgdGV4dCA9IHRoaXMudGV4dDtcblxuXHRcdGlmIChuZXh0VnRleHQudGV4dCAhPT0gdGV4dCkge1xuXHRcdFx0bm9kZS5yZXBsYWNlRGF0YSgwLCBub2RlLmxlbmd0aCwgbmV4dFZ0ZXh0LnRleHQpO1xuXHRcdH1cblx0XHQvLyBkZWxpdmVyIG5vZGUgdG8gdGhlIG5ld1RyZWUgZm9yIG5leHQgdXBkYXRpbmdcblx0XHRuZXh0VnRleHQubm9kZSA9IHRoaXMubm9kZTtcblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblx0aW5pdFRyZWU6IGZ1bmN0aW9uIGluaXRUcmVlKHBhcmVudE5vZGUpIHtcblx0XHR0aGlzLm5vZGUgPSBjcmVhdGVUZXh0Tm9kZSh0aGlzLnRleHQpO1xuXHRcdGFwcGVuZE5vZGUocGFyZW50Tm9kZSwgdGhpcy5ub2RlKTtcblx0fSxcblx0ZGVzdHJveVRyZWU6IGZ1bmN0aW9uIGRlc3Ryb3lUcmVlKCkge1xuXHRcdHJlbW92ZU5vZGUodGhpcy5ub2RlKTtcblx0fVxufSk7XG5cbmZ1bmN0aW9uIFZlbGVtKHR5cGUsIHByb3BzKSB7XG5cdHRoaXMudHlwZSA9IHR5cGU7XG5cdHRoaXMucHJvcHMgPSBwcm9wcztcbn1cblxudmFyIHVubW91bnRUcmVlID0gZnVuY3Rpb24gdW5tb3VudFRyZWUodnRyZWUpIHtcblx0dmFyIG1ldGhvZCA9IGlzVmFsaWRDb21wb25lbnQodnRyZWUpID8gJ2Rlc3Ryb3lUcmVlJyA6ICdkZXRhY2hSZWYnO1xuXHR2dHJlZVttZXRob2RdKCk7XG59O1xuVmVsZW0ucHJvdG90eXBlID0gbmV3IFZ0cmVlKHtcblx0Y29uc3RydWN0b3I6IFZlbGVtLFxuXHR2dHlwZTogVk5PREVfVFlQRS5FTEVNRU5ULFxuXHRlYWNoQ2hpbGRyZW46IGZ1bmN0aW9uIGVhY2hDaGlsZHJlbihpdGVyYXRlZSkge1xuXHRcdHZhciBjaGlsZHJlbiA9IHRoaXMucHJvcHMuY2hpbGRyZW47XG5cdFx0dmFyIHNvcnRlZCA9IHRoaXMuc29ydGVkO1xuXG5cdFx0aWYgKHNvcnRlZCkge1xuXHRcdFx0ZWFjaEl0ZW0oY2hpbGRyZW4sIGl0ZXJhdGVlKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Ly8gdGhlIGRlZmF1bHQgY2hpbGRyZW4gb2Z0ZW4gYmUgbmVzdGluZyBhcnJheSwgc28gdGhlbiBoZXJlIG1ha2UgaXQgZmxhdFxuXHRcdGlmIChpc0FycihjaGlsZHJlbikpIHtcblx0XHRcdHZhciBuZXdDaGlsZHJlbiA9IFtdO1xuXHRcdFx0Zm9yRWFjaCQxKGNoaWxkcmVuLCBmdW5jdGlvbiAodmNoaWxkLCBpbmRleCkge1xuXHRcdFx0XHR2Y2hpbGQgPSBnZXRWbm9kZSh2Y2hpbGQpO1xuXHRcdFx0XHRpdGVyYXRlZSh2Y2hpbGQsIGluZGV4KTtcblx0XHRcdFx0bmV3Q2hpbGRyZW4ucHVzaCh2Y2hpbGQpO1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLnByb3BzLmNoaWxkcmVuID0gbmV3Q2hpbGRyZW47XG5cdFx0XHR0aGlzLnNvcnRlZCA9IHRydWU7XG5cdFx0fSBlbHNlIGlmICghaXNVbmRlZmluZWQoY2hpbGRyZW4pKSB7XG5cdFx0XHRjaGlsZHJlbiA9IHRoaXMucHJvcHMuY2hpbGRyZW4gPSBnZXRWbm9kZShjaGlsZHJlbik7XG5cdFx0XHRpdGVyYXRlZShjaGlsZHJlbiwgMCk7XG5cdFx0fVxuXHR9LFxuXHRtYXBUcmVlOiBmdW5jdGlvbiBtYXBUcmVlKGl0ZXJhdGVlKSB7XG5cdFx0aXRlcmF0ZWUodGhpcyk7XG5cdFx0dGhpcy5lYWNoQ2hpbGRyZW4oZnVuY3Rpb24gKHZjaGlsZCkge1xuXHRcdFx0cmV0dXJuIHZjaGlsZC5tYXBUcmVlKGl0ZXJhdGVlKTtcblx0XHR9KTtcblx0fSxcblx0aW5pdFRyZWU6IGZ1bmN0aW9uIGluaXRUcmVlKHBhcmVudE5vZGUpIHtcblx0XHR2YXIgdHlwZSA9IHRoaXMudHlwZTtcblx0XHR2YXIgcHJvcHMgPSB0aGlzLnByb3BzO1xuXG5cdFx0dmFyIG5vZGUgPSB0aGlzLm5vZGUgPSBjcmVhdGVFbGVtZW50JDEodHlwZSwgcHJvcHMpO1xuXHRcdHRoaXMuZWFjaENoaWxkcmVuKGZ1bmN0aW9uICh2Y2hpbGQpIHtcblx0XHRcdHZjaGlsZC5pbml0VHJlZShub2RlKTtcblx0XHR9KTtcblx0XHRhcHBlbmROb2RlKHBhcmVudE5vZGUsIG5vZGUpO1xuXHRcdHRoaXMuYXR0YWNoUmVmKCk7XG5cdH0sXG5cdGRlc3Ryb3lUcmVlOiBmdW5jdGlvbiBkZXN0cm95VHJlZSgpIHtcblx0XHR0aGlzLm1hcFRyZWUodW5tb3VudFRyZWUpO1xuXHRcdHJlbW92ZU5vZGUodGhpcy5ub2RlKTtcblx0fSxcblx0dXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUobmV3VmVsZW0pIHtcblx0XHR2YXIgbm9kZSA9IHRoaXMubm9kZTtcblx0XHR2YXIgcHJvcHMgPSB0aGlzLnByb3BzO1xuXG5cdFx0dmFyIGNoaWxkcmVuID0gIWlzVW5kZWZpbmVkKHByb3BzLmNoaWxkcmVuKSA/IHByb3BzLmNoaWxkcmVuIDogW107XG5cdFx0dmFyIGNvdW50ID0gMDtcblx0XHRpZiAoIWlzQXJyKGNoaWxkcmVuKSkge1xuXHRcdFx0Y2hpbGRyZW4gPSBbY2hpbGRyZW5dO1xuXHRcdH1cblx0XHRwYXRjaFByb3BzKG5vZGUsIHByb3BzLCBuZXdWZWxlbS5wcm9wcyk7XG5cdFx0bmV3VmVsZW0ubm9kZSA9IG5vZGU7XG5cdFx0bmV3VmVsZW0uZWFjaENoaWxkcmVuKGZ1bmN0aW9uIChuZXdWY2hpbGQsIGluZGV4KSB7XG5cdFx0XHR2YXIgdmNoaWxkID0gY2hpbGRyZW5baW5kZXhdO1xuXHRcdFx0aWYgKHZjaGlsZCkge1xuXHRcdFx0XHR2Y2hpbGQudXBkYXRlVHJlZShuZXdWY2hpbGQsIG5vZGUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bmV3VmNoaWxkLmluaXRUcmVlKG5vZGUpO1xuXHRcdFx0fVxuXHRcdFx0Y291bnQgKz0gMTtcblx0XHR9KTtcblx0XHQvLyBkZXN0cm95IG9sZCBjaGlsZHJlbiBub3QgaW4gdGhlIG5ld0NoaWxkcmVuXG5cdFx0d2hpbGUgKGNoaWxkcmVuLmxlbmd0aCA+IGNvdW50KSB7XG5cdFx0XHRjaGlsZHJlbltjb3VudF0uZGVzdHJveVRyZWUoKTtcblx0XHRcdGNvdW50ICs9IDE7XG5cdFx0fVxuXHRcdHRoaXMudXBkYXRlUmVmKG5ld1ZlbGVtKTtcblx0fVxufSk7XG5cbmZ1bmN0aW9uIFZzdGF0ZWxlc3NDb21wb25lbnQodHlwZSwgcHJvcHMpIHtcblx0dGhpcy50eXBlID0gdHlwZTtcblx0dGhpcy5wcm9wcyA9IHByb3BzO1xufVxuXG5Wc3RhdGVsZXNzQ29tcG9uZW50LnByb3RvdHlwZSA9IG5ldyBWdHJlZSh7XG5cdGNvbnN0cnVjdG9yOiBWc3RhdGVsZXNzQ29tcG9uZW50LFxuXHR2dHlwZTogVk5PREVfVFlQRS5TVEFURUxFU1NfQ09NUE9ORU5ULFxuXHRtYXBUcmVlOiBmdW5jdGlvbiBtYXBUcmVlKGl0ZXJhdGVlKSB7XG5cdFx0aXRlcmF0ZWUodGhpcyk7XG5cdH0sXG5cdHJlbmRlclRyZWU6IGZ1bmN0aW9uIHJlbmRlclRyZWUoKSB7XG5cdFx0dmFyIGZhY3RvcnkgPSB0aGlzLnR5cGU7XG5cdFx0dmFyIHByb3BzID0gdGhpcy5wcm9wcztcblx0XHR2YXIgY29udGV4dCA9IHRoaXMuY29udGV4dDtcblxuXHRcdHZhciB2dHJlZSA9IGZhY3RvcnkocHJvcHMsIGdldENvbnRleHRCeVR5cGVzKGNvbnRleHQsIGZhY3RvcnkuY29udGV4dFR5cGVzKSk7XG5cdFx0aWYgKHZ0cmVlICYmIGlzRm4odnRyZWUucmVuZGVyKSkge1xuXHRcdFx0dnRyZWUgPSB2dHJlZS5yZW5kZXIoKTtcblx0XHR9XG5cdFx0dGhpcy52dHJlZSA9IGdldFZub2RlKHZ0cmVlKTtcblx0XHRzZXRDb250ZXh0KGNvbnRleHQsIHRoaXMudnRyZWUpO1xuXHR9LFxuXHRpbml0VHJlZTogZnVuY3Rpb24gaW5pdFRyZWUocGFyZW50Tm9kZSkge1xuXHRcdHRoaXMucmVuZGVyVHJlZSgpO1xuXHRcdHRoaXMudnRyZWUuaW5pdFRyZWUocGFyZW50Tm9kZSk7XG5cdFx0dGhpcy5ub2RlID0gdGhpcy52dHJlZS5ub2RlO1xuXHR9LFxuXHRkZXN0cm95VHJlZTogZnVuY3Rpb24gZGVzdHJveVRyZWUoKSB7XG5cdFx0dGhpcy52dHJlZS5kZXN0cm95VHJlZSgpO1xuXHRcdHRoaXMubm9kZSA9IHRoaXMudnRyZWUgPSBudWxsO1xuXHR9LFxuXHR1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShuZXdWdHJlZSwgcGFyZW50Tm9kZSkge1xuXHRcdG5ld1Z0cmVlLnJlbmRlclRyZWUoKTtcblx0XHR0aGlzLnZ0cmVlLnVwZGF0ZVRyZWUobmV3VnRyZWUudnRyZWUsIHBhcmVudE5vZGUpO1xuXHRcdG5ld1Z0cmVlLm5vZGUgPSBuZXdWdHJlZS52dHJlZS5ub2RlO1xuXHR9XG59KTtcblxudmFyIHNldFJlZnMgPSBub29wJDE7XG52YXIgaGFuZGxlVm5vZGVXaXRoUmVmID0gZnVuY3Rpb24gaGFuZGxlVm5vZGVXaXRoUmVmKHZub2RlKSB7XG5cdHNldFJlZnModm5vZGUpO1xufTtcbnZhciBnZXRDb250ZXh0QnlUeXBlcyA9IGZ1bmN0aW9uIGdldENvbnRleHRCeVR5cGVzKGN1ckNvbnRleHQsIGNvbnRleHRUeXBlcykge1xuXHR2YXIgY29udGV4dCA9IHt9O1xuXHRpZiAoIWlzT2JqKGNvbnRleHRUeXBlcykgfHwgIWlzT2JqKGN1ckNvbnRleHQpKSB7XG5cdFx0cmV0dXJuIGNvbnRleHQ7XG5cdH1cblx0bWFwVmFsdWUoY29udGV4dFR5cGVzLCBmdW5jdGlvbiAoXywga2V5KSB7XG5cdFx0Y29udGV4dFtrZXldID0gY3VyQ29udGV4dFtrZXldO1xuXHR9KTtcblx0cmV0dXJuIGNvbnRleHQ7XG59O1xudmFyIHNldENvbnRleHQgPSBmdW5jdGlvbiBzZXRDb250ZXh0KGNvbnRleHQsIHZ0cmVlKSB7XG5cdHJldHVybiB2dHJlZS5tYXBUcmVlKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0aWYgKGlzVmFsaWRDb21wb25lbnQoaXRlbSkpIHtcblx0XHRcdGl0ZW0uY29udGV4dCA9IGNvbnRleHQ7XG5cdFx0fVxuXHR9KTtcbn07XG52YXIgYmluZFJlZnMgPSBmdW5jdGlvbiBiaW5kUmVmcyhyZWZzKSB7XG5cdHJldHVybiBmdW5jdGlvbiAodm5vZGUpIHtcblx0XHRpZiAoIXZub2RlLnJlZnMpIHtcblx0XHRcdHZub2RlLnJlZnMgPSByZWZzO1xuXHRcdH1cblx0fTtcbn07XG5cbnZhciByZW5kZXJDb21wb25lbnQgPSBmdW5jdGlvbiByZW5kZXJDb21wb25lbnQoY29tcG9uZW50LCBjb250ZXh0KSB7XG5cdHZhciBjdXJDb250ZXh0ID0gY29tcG9uZW50LmdldENoaWxkQ29udGV4dCgpO1xuXHRjdXJDb250ZXh0ID0gY3VyQ29udGV4dCB8fCBjb250ZXh0O1xuXHRzZXRSZWZzID0gYmluZFJlZnMoY29tcG9uZW50LnJlZnMpO1xuXHR2YXIgdnRyZWUgPSBjaGVja1Z0cmVlKGNvbXBvbmVudC5yZW5kZXIoKSk7XG5cdHNldFJlZnMgPSBub29wJDE7XG5cdHNldENvbnRleHQoY3VyQ29udGV4dCwgdnRyZWUpO1xuXHRyZXR1cm4gdnRyZWU7XG59O1xudmFyIG5ldmVyVXBkYXRlID0gZnVuY3Rpb24gbmV2ZXJVcGRhdGUoKSB7XG5cdHJldHVybiBmYWxzZTtcbn07XG5cbmZ1bmN0aW9uIFZjb21wb25lbnQodHlwZSwgcHJvcHMpIHtcblx0dGhpcy50eXBlID0gdHlwZTtcblx0dGhpcy5wcm9wcyA9IHByb3BzO1xufVxuXG5WY29tcG9uZW50LnByb3RvdHlwZSA9IG5ldyBWdHJlZSh7XG5cdGNvbnN0cnVjdG9yOiBWY29tcG9uZW50LFxuXHR2dHlwZTogVk5PREVfVFlQRS5DT01QT05FTlQsXG5cdG1hcFRyZWU6IGZ1bmN0aW9uIG1hcFRyZWUoaXRlcmF0ZWUpIHtcblx0XHRpdGVyYXRlZSh0aGlzKTtcblx0fSxcblx0aW5pdFRyZWU6IGZ1bmN0aW9uIGluaXRUcmVlKHBhcmVudE5vZGUpIHtcblx0XHR2YXIgQ29tcG9uZW50ID0gdGhpcy50eXBlO1xuXHRcdHZhciBwcm9wcyA9IHRoaXMucHJvcHM7XG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzLmNvbnRleHQ7XG5cblx0XHR2YXIgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnQgPSBuZXcgQ29tcG9uZW50KHByb3BzLCBnZXRDb250ZXh0QnlUeXBlcyhjb250ZXh0LCBDb21wb25lbnQuY29udGV4dFR5cGVzKSk7XG5cdFx0dmFyIHVwZGF0ZXIgPSBjb21wb25lbnQuJHVwZGF0ZXI7XG5cdFx0dmFyIGNhY2hlID0gY29tcG9uZW50LiRjYWNoZTtcblxuXHRcdGNhY2hlLiRjb250ZXh0ID0gY29udGV4dDtcblx0XHR1cGRhdGVyLmlzUGVuZGluZyA9IHRydWU7XG5cdFx0Y29tcG9uZW50LnByb3BzID0gY29tcG9uZW50LnByb3BzIHx8IHByb3BzO1xuXHRcdGNvbXBvbmVudC5jb21wb25lbnRXaWxsTW91bnQoKTtcblx0XHR1cGRhdGVQcm9wc0FuZFN0YXRlKGNvbXBvbmVudCwgY29tcG9uZW50LnByb3BzLCB1cGRhdGVyLmdldFN0YXRlKCksIGNvbXBvbmVudC5jb250ZXh0KTtcblx0XHR2YXIgdnRyZWUgPSBjb21wb25lbnQudnRyZWUgPSByZW5kZXJDb21wb25lbnQoY29tcG9uZW50LCBjb250ZXh0KTtcblx0XHR2dHJlZS5pbml0VHJlZShwYXJlbnROb2RlKTtcblx0XHRjYWNoZS5pc01vdW50ZWQgPSB0cnVlO1xuXHRcdGNvbXBvbmVudC5ub2RlID0gdGhpcy5ub2RlID0gdnRyZWUubm9kZTtcblx0XHRjb21wb25lbnQuY29tcG9uZW50RGlkTW91bnQoKTtcblx0XHR1cGRhdGVyLmlzUGVuZGluZyA9IGZhbHNlO1xuXHRcdHRoaXMuYXR0YWNoUmVmKCk7XG5cdFx0dXBkYXRlci5lbWl0VXBkYXRlKCk7XG5cdH0sXG5cdGRlc3Ryb3lUcmVlOiBmdW5jdGlvbiBkZXN0cm95VHJlZSgpIHtcblx0XHR2YXIgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnQ7XG5cblx0XHRpZiAoIWNvbXBvbmVudCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb21wb25lbnQuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gbmV2ZXJVcGRhdGU7XG5cdFx0Y29tcG9uZW50LmZvcmNlVXBkYXRlID0gY29tcG9uZW50LnNldFN0YXRlID0gbm9vcCQxO1xuXHRcdHRoaXMuZGV0YWNoUmVmKCk7XG5cdFx0Y29tcG9uZW50LmNvbXBvbmVudFdpbGxVbm1vdW50KCk7XG5cdFx0Y29tcG9uZW50LnZ0cmVlLmRlc3Ryb3lUcmVlKCk7XG5cdFx0Y29tcG9uZW50LiRjYWNoZS5pc01vdW50ZWQgPSBmYWxzZTtcblx0XHR0aGlzLmNvbXBvbmVudCA9IHRoaXMubm9kZSA9IGNvbXBvbmVudC5ub2RlID0gY29tcG9uZW50LnJlZnMgPSBjb21wb25lbnQuY29udGV4dCA9IG51bGw7XG5cdH0sXG5cdHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG5ld1Z0cmVlLCBwYXJlbnROb2RlKSB7XG5cdFx0dmFyIGNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50O1xuXG5cdFx0aWYgKCFjb21wb25lbnQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dmFyIENvbXBvbmVudCA9IG5ld1Z0cmVlLnR5cGU7XG5cdFx0dmFyIG5leHRQcm9wcyA9IG5ld1Z0cmVlLnByb3BzO1xuXHRcdHZhciBuZXh0Q29udGV4dCA9IG5ld1Z0cmVlLmNvbnRleHQ7XG5cdFx0dmFyIHVwZGF0ZXIgPSBjb21wb25lbnQuJHVwZGF0ZXI7XG5cdFx0dmFyICRjYWNoZSA9IGNvbXBvbmVudC4kY2FjaGU7XG5cblx0XHR2YXIgY29udGV4dCA9IGdldENvbnRleHRCeVR5cGVzKG5leHRDb250ZXh0LCBDb21wb25lbnQuY29udGV4dFR5cGVzKTtcblx0XHQkY2FjaGUuJGNvbnRleHQgPSBuZXh0Q29udGV4dDtcblx0XHR1cGRhdGVyLmlzUGVuZGluZyA9IHRydWU7XG5cdFx0Y29tcG9uZW50LmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzLCBjb250ZXh0KTtcblx0XHR1cGRhdGVyLmlzUGVuZGluZyA9IGZhbHNlO1xuXHRcdHVwZGF0ZXIuZW1pdFVwZGF0ZShuZXh0UHJvcHMsIGNvbnRleHQpO1xuXHRcdG5ld1Z0cmVlLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcblx0XHRuZXdWdHJlZS5ub2RlID0gY29tcG9uZW50Lm5vZGU7XG5cdFx0dGhpcy51cGRhdGVSZWYobmV3VnRyZWUpO1xuXHR9XG59KTtcblxudmFyIGNvbXBhcmVUd29UcmVlID0gZnVuY3Rpb24gY29tcGFyZVR3b1RyZWUodnRyZWUsIG5ld1Z0cmVlLCBwYXJlbnROb2RlKSB7XG5cdHZhciBkaWZmVHlwZSA9IGRpZmYodnRyZWUsIG5ld1Z0cmVlKTtcblx0dmFyICRyZW1vdmVOb2RlID0gdW5kZWZpbmVkO1xuXHR2YXIgbm9kZSA9IHVuZGVmaW5lZDtcblx0c3dpdGNoIChkaWZmVHlwZSkge1xuXHRcdGNhc2UgRElGRl9UWVBFLkNSRUFURTpcblx0XHRcdG5ld1Z0cmVlLmluaXRUcmVlKHBhcmVudE5vZGUpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBESUZGX1RZUEUuUkVNT1ZFOlxuXHRcdFx0dnRyZWUuZGVzdHJveVRyZWUoKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgRElGRl9UWVBFLlJFUExBQ0U6XG5cdFx0XHRub2RlID0gdnRyZWUubm9kZTtcblx0XHRcdC8vIGRvbid0IHJlbW92ZSB0aGUgZXhpc3ROb2RlIGZvciByZXBsYWNpbmdcblx0XHRcdCRyZW1vdmVOb2RlID0gcmVtb3ZlTm9kZTtcblx0XHRcdHJlbW92ZU5vZGUgPSBub29wJDE7XG5cdFx0XHR2dHJlZS5kZXN0cm95VHJlZSgpO1xuXHRcdFx0cmVtb3ZlTm9kZSA9ICRyZW1vdmVOb2RlO1xuXHRcdFx0bmV3VnRyZWUuaW5pdFRyZWUoZnVuY3Rpb24gKG5ld05vZGUpIHtcblx0XHRcdFx0cmVwbGFjZU5vZGUocGFyZW50Tm9kZSwgbmV3Tm9kZSwgbm9kZSk7XG5cdFx0XHR9KTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgRElGRl9UWVBFLlVQREFURTpcblx0XHRcdHZ0cmVlLnVwZGF0ZShuZXdWdHJlZSwgcGFyZW50Tm9kZSk7XG5cdFx0XHRicmVhaztcblx0fVxufTtcblxudmFyIHJlbW92ZU5vZGUgPSBmdW5jdGlvbiByZW1vdmVOb2RlKG5vZGUpIHtcblx0aWYgKG5vZGUgJiYgbm9kZS5wYXJlbnROb2RlKSB7XG5cdFx0bm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuXHR9XG59O1xudmFyIGFwcGVuZE5vZGUgPSBmdW5jdGlvbiBhcHBlbmROb2RlKHBhcmVudE5vZGUsIG5vZGUpIHtcblx0aWYgKHBhcmVudE5vZGUgJiYgbm9kZSkge1xuXHRcdC8vIGZvciByZXBsYWNlIG5vZGVcblx0XHRpZiAoaXNGbihwYXJlbnROb2RlKSkge1xuXHRcdFx0cGFyZW50Tm9kZShub2RlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cGFyZW50Tm9kZS5hcHBlbmRDaGlsZChub2RlKTtcblx0XHR9XG5cdH1cbn07XG52YXIgcmVwbGFjZU5vZGUgPSBmdW5jdGlvbiByZXBsYWNlTm9kZShwYXJlbnROb2RlLCBuZXdOb2RlLCBleGlzdE5vZGUpIHtcblx0aWYgKG5ld05vZGUgJiYgZXhpc3ROb2RlKSB7XG5cdFx0cGFyZW50Tm9kZSA9IHBhcmVudE5vZGUgfHwgZXhpc3ROb2RlLnBhcmVudE5vZGU7XG5cdFx0cGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3Tm9kZSwgZXhpc3ROb2RlKTtcblx0fVxufTtcblxudmFyIGNyZWF0ZVRleHROb2RlID0gZnVuY3Rpb24gY3JlYXRlVGV4dE5vZGUodGV4dCkge1xuXHRyZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG59O1xudmFyIGNyZWF0ZUVsZW1lbnQkMSA9IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnTmFtZSwgcHJvcHMpIHtcblx0dmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuXHRzZXRQcm9wcyhub2RlLCBwcm9wcyk7XG5cdHJldHVybiBub2RlO1xufTtcblxudmFyIGdldFZub2RlID0gZnVuY3Rpb24gZ2V0Vm5vZGUodm5vZGUpIHtcblx0aWYgKHZub2RlID09PSBudWxsIHx8IHZub2RlID09PSBmYWxzZSkge1xuXHRcdHZub2RlID0gbmV3IFZlbGVtKCdub3NjcmlwdCcsIHt9KTtcblx0fSBlbHNlIGlmICghaXNPYmoodm5vZGUpKSB7XG5cdFx0dm5vZGUgPSBuZXcgVnRleHQodm5vZGUpO1xuXHR9XG5cdHJldHVybiB2bm9kZTtcbn07XG5cbnZhciBjaGVja1Z0cmVlID0gZnVuY3Rpb24gY2hlY2tWdHJlZSh2dHJlZSkge1xuXHRpZiAoaXNVbmRlZmluZWQodnRyZWUpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdjb21wb25lbnQgY2FuIG5vdCByZW5kZXIgdW5kZWZpbmVkJyk7XG5cdH1cblx0cmV0dXJuIGdldFZub2RlKHZ0cmVlKTtcbn07XG5cbnZhciBpc1ZhbGlkQ29tcG9uZW50ID0gZnVuY3Rpb24gaXNWYWxpZENvbXBvbmVudChvYmopIHtcblx0aWYgKG9iaiA9PSBudWxsKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHZhciB2dHlwZSA9IG9iai52dHlwZTtcblx0aWYgKHZ0eXBlID09PSBWTk9ERV9UWVBFLkNPTVBPTkVOVCB8fCB2dHlwZSA9PT0gVk5PREVfVFlQRS5TVEFURUxFU1NfQ09NUE9ORU5UKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufTtcblxudmFyIGlzVmFsaWRFbGVtZW50ID0gZnVuY3Rpb24gaXNWYWxpZEVsZW1lbnQob2JqKSB7XG5cdGlmIChvYmogPT0gbnVsbCkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRpZiAob2JqLnZ0eXBlID09PSBWTk9ERV9UWVBFLkVMRU1FTlQgfHwgb2JqLnZ0eXBlID09PSBWTk9ERV9UWVBFLkNPTVBPTkVOVCkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn07XG5cbnZhciBjbG9uZUVsZW1lbnQgPSBmdW5jdGlvbiBjbG9uZUVsZW1lbnQob3JpZ2luRWxlbSwgcHJvcHMpIHtcblx0Zm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGNoaWxkcmVuID0gQXJyYXkoX2xlbiA+IDIgPyBfbGVuIC0gMiA6IDApLCBfa2V5ID0gMjsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuXHRcdGNoaWxkcmVuW19rZXkgLSAyXSA9IGFyZ3VtZW50c1tfa2V5XTtcblx0fVxuXG5cdHZhciB0eXBlID0gb3JpZ2luRWxlbS50eXBlO1xuXHRwcm9wcyA9IGV4dGVuZCh7fSwgb3JpZ2luRWxlbS5wcm9wcywgcHJvcHMpO1xuXHR2YXIgdm5vZGUgPSBjcmVhdGVFbGVtZW50LmFwcGx5KHVuZGVmaW5lZCwgW3R5cGUsIHByb3BzXS5jb25jYXQoY2hpbGRyZW4pKTtcblx0aWYgKHZub2RlLnJlZiA9PT0gb3JpZ2luRWxlbS5yZWYpIHtcblx0XHR2bm9kZS5yZWZzID0gb3JpZ2luRWxlbS5yZWZzO1xuXHR9XG5cdHJldHVybiB2bm9kZTtcbn07XG5cbnZhciBjcmVhdGVGYWN0b3J5ID0gZnVuY3Rpb24gY3JlYXRlRmFjdG9yeSh0eXBlKSB7XG5cdHZhciBmYWN0b3J5ID0gZnVuY3Rpb24gZmFjdG9yeSgpIHtcblx0XHRmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuXHRcdFx0YXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuXHRcdH1cblxuXHRcdHJldHVybiBjcmVhdGVFbGVtZW50LmFwcGx5KHVuZGVmaW5lZCwgW3R5cGVdLmNvbmNhdChhcmdzKSk7XG5cdH07XG5cdGZhY3RvcnkudHlwZSA9IHR5cGU7XG5cdHJldHVybiBmYWN0b3J5O1xufTtcblxudmFyIGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUsIHByb3BzKSB7XG5cdGZvciAodmFyIF9sZW4zID0gYXJndW1lbnRzLmxlbmd0aCwgY2hpbGRyZW4gPSBBcnJheShfbGVuMyA+IDIgPyBfbGVuMyAtIDIgOiAwKSwgX2tleTMgPSAyOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG5cdFx0Y2hpbGRyZW5bX2tleTMgLSAyXSA9IGFyZ3VtZW50c1tfa2V5M107XG5cdH1cblxuXHR2YXIgVm5vZGUgPSB1bmRlZmluZWQ7XG5cdHN3aXRjaCAodHJ1ZSkge1xuXHRcdGNhc2UgaXNTdHIodHlwZSk6XG5cdFx0XHRWbm9kZSA9IFZlbGVtO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBpc0NvbXBvbmVudCh0eXBlKTpcblx0XHRcdFZub2RlID0gVmNvbXBvbmVudDtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgaXNTdGF0ZWxlc3NDb21wb25lbnQodHlwZSk6XG5cdFx0XHRWbm9kZSA9IFZzdGF0ZWxlc3NDb21wb25lbnQ7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdSZWFjdC5jcmVhdGVFbGVtZW50OiB1bmV4cGVjdCB0eXBlIFsgJyArIHR5cGUgKyAnIF0nKTtcblx0fVxuXHR2YXIgdm5vZGUgPSBuZXcgVm5vZGUodHlwZSwgbWVyZ2VQcm9wcyhwcm9wcywgY2hpbGRyZW4sIHR5cGUuZGVmYXVsdFByb3BzKSk7XG5cdHZhciBrZXkgPSBudWxsO1xuXHR2YXIgcmVmID0gbnVsbDtcblx0dmFyIGhhc1JlZiA9IGZhbHNlO1xuXHRpZiAocHJvcHMgIT0gbnVsbCkge1xuXHRcdGlmICghaXNVbmRlZmluZWQocHJvcHMua2V5KSkge1xuXHRcdFx0a2V5ID0gJycgKyBwcm9wcy5rZXk7XG5cdFx0fVxuXHRcdGlmICghaXNVbmRlZmluZWQocHJvcHMucmVmKSkge1xuXHRcdFx0cmVmID0gcHJvcHMucmVmO1xuXHRcdFx0aGFzUmVmID0gdHJ1ZTtcblx0XHR9XG5cdH1cblx0dm5vZGUua2V5ID0ga2V5O1xuXHR2bm9kZS5yZWYgPSByZWY7XG5cdGlmIChoYXNSZWYgJiYgVm5vZGUgIT09IFZzdGF0ZWxlc3NDb21wb25lbnQpIHtcblx0XHRoYW5kbGVWbm9kZVdpdGhSZWYodm5vZGUpO1xuXHR9XG5cdHJldHVybiB2bm9kZTtcbn07XG5cbnZhciBvbmx5ID0gZnVuY3Rpb24gb25seShjaGlsZHJlbikge1xuXHRpZiAoY2hpbGRyZW4gIT0gbnVsbCAmJiAhaXNBcnIoY2hpbGRyZW4pKSB7XG5cdFx0cmV0dXJuIGNoaWxkcmVuO1xuXHR9XG5cdHRocm93IG5ldyBFcnJvcignZXhwZWN0IG9ubHkgb25lIGNoaWxkJyk7XG59O1xuXG52YXIgZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goY2hpbGRyZW4sIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG5cdGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG5cdFx0cmV0dXJuIGNoaWxkcmVuO1xuXHR9XG5cdGlmIChpc0FycihjaGlsZHJlbikpIHtcblx0XHRmb3JFYWNoJDEoY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCwgaW5kZXgpIHtcblx0XHRcdGl0ZXJhdGVlLmNhbGwoY29udGV4dCwgY2hpbGQsIGluZGV4KTtcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHRpdGVyYXRlZS5jYWxsKGNvbnRleHQsIGNoaWxkcmVuLCAwKTtcblx0fVxufTtcblxudmFyIG1hcCA9IGZ1bmN0aW9uIG1hcChjaGlsZHJlbiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcblx0aWYgKGNoaWxkcmVuID09IG51bGwpIHtcblx0XHRyZXR1cm4gY2hpbGRyZW47XG5cdH1cblx0dmFyIHN0b3JlID0gW107XG5cdHZhciBrZXlNYXAgPSB7fTtcblx0Zm9yRWFjaChjaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkLCBpbmRleCkge1xuXHRcdHZhciBkYXRhID0ge307XG5cdFx0ZGF0YS5jaGlsZCA9IGl0ZXJhdGVlLmNhbGwoY29udGV4dCwgY2hpbGQsIGluZGV4KSB8fCBjaGlsZDtcblx0XHRkYXRhLmlzRXF1YWwgPSBkYXRhLmNoaWxkID09PSBjaGlsZDtcblx0XHR2YXIga2V5ID0gZGF0YS5rZXkgPSBnZXRLZXkoY2hpbGQsIGluZGV4KTtcblx0XHRpZiAoa2V5TWFwLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdGtleU1hcFtrZXldID0ga2V5TWFwW2tleV0gKyAxO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRrZXlNYXBba2V5XSA9IDA7XG5cdFx0fVxuXHRcdGRhdGEuaW5kZXggPSBrZXlNYXBba2V5XTtcblx0XHRzdG9yZS5wdXNoKGRhdGEpO1xuXHR9KTtcblx0dmFyIHJlc3VsdCA9IFtdO1xuXHRlYWNoSXRlbShzdG9yZSwgZnVuY3Rpb24gKF9yZWYpIHtcblx0XHR2YXIgY2hpbGQgPSBfcmVmLmNoaWxkO1xuXHRcdHZhciBrZXkgPSBfcmVmLmtleTtcblx0XHR2YXIgaW5kZXggPSBfcmVmLmluZGV4O1xuXHRcdHZhciBpc0VxdWFsID0gX3JlZi5pc0VxdWFsO1xuXG5cdFx0aWYgKGNoaWxkID09IG51bGwgfHwgaXNCbG4oY2hpbGQpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmICghaXNWYWxpZEVsZW1lbnQoY2hpbGQpIHx8IGtleSA9PSBudWxsKSB7XG5cdFx0XHRyZXN1bHQucHVzaChjaGlsZCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmIChrZXlNYXBba2V5XSAhPT0gMCkge1xuXHRcdFx0a2V5ICs9ICc6JyArIGluZGV4O1xuXHRcdH1cblx0XHRpZiAoIWlzRXF1YWwpIHtcblx0XHRcdGtleSA9IGVzY2FwZVVzZXJQcm92aWRlZEtleShjaGlsZC5rZXkgfHwgJycpICsgJy8nICsga2V5O1xuXHRcdH1cblx0XHRjaGlsZCA9IGNsb25lRWxlbWVudChjaGlsZCwgeyBrZXk6IGtleSB9KTtcblx0XHRyZXN1bHQucHVzaChjaGlsZCk7XG5cdH0pO1xuXHRyZXR1cm4gcmVzdWx0O1xufTtcblxudmFyIGNvdW50ID0gZnVuY3Rpb24gY291bnQoY2hpbGRyZW4pIHtcblx0dmFyIGNvdW50ID0gMDtcblx0Zm9yRWFjaChjaGlsZHJlbiwgZnVuY3Rpb24gKCkge1xuXHRcdGNvdW50Kys7XG5cdH0pO1xuXHRyZXR1cm4gY291bnQ7XG59O1xuXG52YXIgaWRlbnRpdHkgPSBmdW5jdGlvbiBpZGVudGl0eShvYmopIHtcblx0cmV0dXJuIG9iajtcbn07XG52YXIgdG9BcnJheSA9IGZ1bmN0aW9uIHRvQXJyYXkoY2hpbGRyZW4pIHtcblx0cmV0dXJuIG1hcChjaGlsZHJlbiwgaWRlbnRpdHkpIHx8IFtdO1xufTtcblxudmFyIGdldEtleSA9IGZ1bmN0aW9uIGdldEtleShjaGlsZCwgaW5kZXgpIHtcblx0dmFyIGtleSA9IHVuZGVmaW5lZDtcblx0aWYgKGlzVmFsaWRFbGVtZW50KGNoaWxkKSAmJiBpc1N0cihjaGlsZC5rZXkpKSB7XG5cdFx0a2V5ID0gJy4kJyArIGNoaWxkLmtleTtcblx0fSBlbHNlIHtcblx0XHRrZXkgPSAnLicgKyBpbmRleC50b1N0cmluZygzNik7XG5cdH1cblx0cmV0dXJuIGtleTtcbn07XG5cbnZhciB1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCA9IC9cXC8oPyFcXC8pL2c7XG52YXIgZXNjYXBlVXNlclByb3ZpZGVkS2V5ID0gZnVuY3Rpb24gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHRleHQpIHtcblx0cmV0dXJuICgnJyArIHRleHQpLnJlcGxhY2UodXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXgsICcvLycpO1xufTtcblxudmFyIGVhY2hNaXhpbiA9IGZ1bmN0aW9uIGVhY2hNaXhpbihtaXhpbnMsIGl0ZXJhdGVlKSB7XG5cdGVhY2hJdGVtKG1peGlucywgZnVuY3Rpb24gKG1peGluKSB7XG5cdFx0aWYgKGlzQXJyKG1peGluLm1peGlucykpIHtcblx0XHRcdGVhY2hNaXhpbihtaXhpbi5taXhpbnMsIGl0ZXJhdGVlKTtcblx0XHR9XG5cdFx0aXRlcmF0ZWUobWl4aW4pO1xuXHR9KTtcbn07XG5cbnZhciBjb21iaW5lTWl4aW5Ub1Byb3RvID0gZnVuY3Rpb24gY29tYmluZU1peGluVG9Qcm90byhwcm90bywgbWl4aW4pIHtcblx0bWFwVmFsdWUobWl4aW4sIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG5cdFx0aWYgKGtleSA9PT0gJ2dldEluaXRpYWxTdGF0ZScpIHtcblx0XHRcdHByb3RvLiRnZXRJbml0aWFsU3RhdGVzLnB1c2godmFsdWUpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR2YXIgY3VyVmFsdWUgPSBwcm90b1trZXldO1xuXHRcdGlmIChpc0ZuKGN1clZhbHVlKSAmJiBpc0ZuKHZhbHVlKSkge1xuXHRcdFx0cHJvdG9ba2V5XSA9IHBpcGUoY3VyVmFsdWUsIHZhbHVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cHJvdG9ba2V5XSA9IHZhbHVlO1xuXHRcdH1cblx0fSk7XG59O1xuXG52YXIgY29tYmluZU1peGluVG9DbGFzcyA9IGZ1bmN0aW9uIGNvbWJpbmVNaXhpblRvQ2xhc3MoQ29tcG9uZW50LCBtaXhpbikge1xuXHRpZiAoaXNPYmoobWl4aW4ucHJvcFR5cGVzKSkge1xuXHRcdGV4dGVuZChDb21wb25lbnQucHJvcFR5cGVzLCBtaXhpbi5wcm9wVHlwZXMpO1xuXHR9XG5cdGlmIChpc09iaihtaXhpbi5jb250ZXh0VHlwZXMpKSB7XG5cdFx0ZXh0ZW5kKENvbXBvbmVudC5jb250ZXh0VHlwZXMsIG1peGluLmNvbnRleHRUeXBlcyk7XG5cdH1cblx0aWYgKGlzRm4obWl4aW4uZ2V0RGVmYXVsdFByb3BzKSkge1xuXHRcdGV4dGVuZChDb21wb25lbnQuZGVmYXVsdFByb3BzLCBtaXhpbi5nZXREZWZhdWx0UHJvcHMoKSk7XG5cdH1cblx0aWYgKGlzT2JqKG1peGluLnN0YXRpY3MpKSB7XG5cdFx0ZXh0ZW5kKENvbXBvbmVudCwgbWl4aW4uc3RhdGljcyk7XG5cdH1cbn07XG5cbnZhciBiaW5kQ29udGV4dCA9IGZ1bmN0aW9uIGJpbmRDb250ZXh0KG9iaiwgc291cmNlKSB7XG5cdG1hcFZhbHVlKHNvdXJjZSwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcblx0XHRpZiAoaXNGbih2YWx1ZSkpIHtcblx0XHRcdG9ialtrZXldID0gdmFsdWUuYmluZChvYmopO1xuXHRcdH1cblx0fSk7XG59O1xuXG52YXIgRmFjYWRlID0gZnVuY3Rpb24gRmFjYWRlKCkge307XG5GYWNhZGUucHJvdG90eXBlID0gQ29tcG9uZW50LnByb3RvdHlwZTtcblxudmFyIGdldEluaXRpYWxTdGF0ZSA9IGZ1bmN0aW9uIGdldEluaXRpYWxTdGF0ZSgpIHtcblx0dmFyIF90aGlzID0gdGhpcztcblxuXHR2YXIgc3RhdGUgPSB7fTtcblx0dmFyIHNldFN0YXRlID0gdGhpcy5zZXRTdGF0ZTtcblx0dGhpcy5zZXRTdGF0ZSA9IEZhY2FkZTtcblx0ZWFjaEl0ZW0odGhpcy4kZ2V0SW5pdGlhbFN0YXRlcywgZnVuY3Rpb24gKGdldEluaXRpYWxTdGF0ZSkge1xuXHRcdGlmIChpc0ZuKGdldEluaXRpYWxTdGF0ZSkpIHtcblx0XHRcdGV4dGVuZChzdGF0ZSwgZ2V0SW5pdGlhbFN0YXRlLmNhbGwoX3RoaXMpKTtcblx0XHR9XG5cdH0pO1xuXHR0aGlzLnNldFN0YXRlID0gc2V0U3RhdGU7XG5cdHJldHVybiBzdGF0ZTtcbn07XG5cbnZhciBjcmVhdGVDbGFzcyA9IGZ1bmN0aW9uIGNyZWF0ZUNsYXNzKHNwZWMpIHtcblx0aWYgKCFpc0ZuKHNwZWMucmVuZGVyKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignY3JlYXRlQ2xhc3M6IHNwZWMucmVuZGVyIGlzIG5vdCBmdW5jdGlvbicpO1xuXHR9XG5cdHZhciBzcGVjTWl4aW5zID0gc3BlYy5taXhpbnMgfHwgW107XG5cdHZhciBtaXhpbnMgPSBzcGVjTWl4aW5zLmNvbmNhdChzcGVjKTtcblx0c3BlYy5taXhpbnMgPSBudWxsO1xuXHRmdW5jdGlvbiBLbGFzcyhwcm9wcywgY29udGV4dCkge1xuXHRcdENvbXBvbmVudC5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KTtcblx0XHR0aGlzLmNvbnN0cnVjdG9yID0gS2xhc3M7XG5cdFx0c3BlYy5hdXRvYmluZCAhPT0gZmFsc2UgJiYgYmluZENvbnRleHQodGhpcywgS2xhc3MucHJvdG90eXBlKTtcblx0XHR0aGlzLnN0YXRlID0gdGhpcy5nZXRJbml0aWFsU3RhdGUoKSB8fCB0aGlzLnN0YXRlO1xuXHR9XG5cdEtsYXNzLmRpc3BsYXlOYW1lID0gc3BlYy5kaXNwbGF5TmFtZTtcblx0S2xhc3MuY29udGV4dFR5cGVzID0ge307XG5cdEtsYXNzLnByb3BUeXBlcyA9IHt9O1xuXHRLbGFzcy5kZWZhdWx0UHJvcHMgPSB7fTtcblx0dmFyIHByb3RvID0gS2xhc3MucHJvdG90eXBlID0gbmV3IEZhY2FkZSgpO1xuXHRwcm90by4kZ2V0SW5pdGlhbFN0YXRlcyA9IFtdO1xuXHRlYWNoTWl4aW4obWl4aW5zLCBmdW5jdGlvbiAobWl4aW4pIHtcblx0XHRjb21iaW5lTWl4aW5Ub1Byb3RvKHByb3RvLCBtaXhpbik7XG5cdFx0Y29tYmluZU1peGluVG9DbGFzcyhLbGFzcywgbWl4aW4pO1xuXHR9KTtcblx0cHJvdG8uZ2V0SW5pdGlhbFN0YXRlID0gZ2V0SW5pdGlhbFN0YXRlO1xuXHRzcGVjLm1peGlucyA9IHNwZWNNaXhpbnM7XG5cdHJldHVybiBLbGFzcztcbn07XG5cbnZhciBSZWFjdCA9IHtcbiAgICBjbG9uZUVsZW1lbnQ6IGNsb25lRWxlbWVudCxcbiAgICBpc1ZhbGlkRWxlbWVudDogaXNWYWxpZEVsZW1lbnQsXG4gICAgY3JlYXRlRWxlbWVudDogY3JlYXRlRWxlbWVudCxcbiAgICBjcmVhdGVGYWN0b3J5OiBjcmVhdGVGYWN0b3J5LFxuICAgIENvbXBvbmVudDogQ29tcG9uZW50LFxuICAgIGNyZWF0ZUNsYXNzOiBjcmVhdGVDbGFzcyxcbiAgICBDaGlsZHJlbjogeyBvbmx5OiBvbmx5LCBmb3JFYWNoOiBmb3JFYWNoLCBtYXA6IG1hcCwgY291bnQ6IGNvdW50LCB0b0FycmF5OiB0b0FycmF5IH0sXG4gICAgUHJvcFR5cGVzOiBQcm9wVHlwZXMsXG4gICAgcmVuZGVyOiByZW5kZXIsXG4gICAgZmluZERPTU5vZGU6IGZpbmRET01Ob2RlLFxuICAgIHVubW91bnRDb21wb25lbnRBdE5vZGU6IHVubW91bnRDb21wb25lbnRBdE5vZGVcbn07XG5cblJlYWN0Ll9fU0VDUkVUX0RPTV9ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEID0ge1xuICAgIHJlbmRlcjogcmVuZGVyLFxuICAgIGZpbmRET01Ob2RlOiBmaW5kRE9NTm9kZSxcbiAgICB1bm1vdW50Q29tcG9uZW50QXROb2RlOiB1bm1vdW50Q29tcG9uZW50QXROb2RlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1saXRlL2Rpc3QvcmVhY3QtbGl0ZS5jb21tb24uanNcbiAqKi8iLCIvKiBjb21wb25lbnRzICovXG5leHBvcnQgUm91dGVyIGZyb20gJy4vUm91dGVyJ1xuZXhwb3J0IExpbmsgZnJvbSAnLi9MaW5rJ1xuZXhwb3J0IEluZGV4TGluayBmcm9tICcuL0luZGV4TGluaydcblxuLyogY29tcG9uZW50cyAoY29uZmlndXJhdGlvbikgKi9cbmV4cG9ydCBJbmRleFJlZGlyZWN0IGZyb20gJy4vSW5kZXhSZWRpcmVjdCdcbmV4cG9ydCBJbmRleFJvdXRlIGZyb20gJy4vSW5kZXhSb3V0ZSdcbmV4cG9ydCBSZWRpcmVjdCBmcm9tICcuL1JlZGlyZWN0J1xuZXhwb3J0IFJvdXRlIGZyb20gJy4vUm91dGUnXG5cbi8qIG1peGlucyAqL1xuZXhwb3J0IEhpc3RvcnkgZnJvbSAnLi9IaXN0b3J5J1xuZXhwb3J0IExpZmVjeWNsZSBmcm9tICcuL0xpZmVjeWNsZSdcbmV4cG9ydCBSb3V0ZUNvbnRleHQgZnJvbSAnLi9Sb3V0ZUNvbnRleHQnXG5cbi8qIHV0aWxzICovXG5leHBvcnQgdXNlUm91dGVzIGZyb20gJy4vdXNlUm91dGVzJ1xuZXhwb3J0IHsgY3JlYXRlUm91dGVzIH0gZnJvbSAnLi9Sb3V0ZVV0aWxzJ1xuZXhwb3J0IFJvdXRpbmdDb250ZXh0IGZyb20gJy4vUm91dGluZ0NvbnRleHQnXG5leHBvcnQgUHJvcFR5cGVzIGZyb20gJy4vUHJvcFR5cGVzJ1xuZXhwb3J0IG1hdGNoIGZyb20gJy4vbWF0Y2gnXG5cbmV4cG9ydCBkZWZhdWx0IGZyb20gJy4vUm91dGVyJ1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9tb2R1bGVzL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZydcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBjcmVhdGVIYXNoSGlzdG9yeSBmcm9tICdoaXN0b3J5L2xpYi9jcmVhdGVIYXNoSGlzdG9yeSdcbmltcG9ydCB7IGNyZWF0ZVJvdXRlcyB9IGZyb20gJy4vUm91dGVVdGlscydcbmltcG9ydCBSb3V0aW5nQ29udGV4dCBmcm9tICcuL1JvdXRpbmdDb250ZXh0J1xuaW1wb3J0IHVzZVJvdXRlcyBmcm9tICcuL3VzZVJvdXRlcydcbmltcG9ydCB7IHJvdXRlcyB9IGZyb20gJy4vUHJvcFR5cGVzJ1xuXG5jb25zdCB7IGZ1bmMsIG9iamVjdCB9ID0gUmVhY3QuUHJvcFR5cGVzXG5cbi8qKlxuICogQSA8Um91dGVyPiBpcyBhIGhpZ2gtbGV2ZWwgQVBJIGZvciBhdXRvbWF0aWNhbGx5IHNldHRpbmcgdXBcbiAqIGEgcm91dGVyIHRoYXQgcmVuZGVycyBhIDxSb3V0aW5nQ29udGV4dD4gd2l0aCBhbGwgdGhlIHByb3BzXG4gKiBpdCBuZWVkcyBlYWNoIHRpbWUgdGhlIFVSTCBjaGFuZ2VzLlxuICovXG5jbGFzcyBSb3V0ZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgc3VwZXIocHJvcHMsIGNvbnRleHQpXG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbG9jYXRpb246IG51bGwsXG4gICAgICByb3V0ZXM6IG51bGwsXG4gICAgICBwYXJhbXM6IG51bGwsXG4gICAgICBjb21wb25lbnRzOiBudWxsXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkVycm9yKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRXJyb3IuY2FsbCh0aGlzLCBlcnJvcilcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVGhyb3cgZXJyb3JzIGJ5IGRlZmF1bHQgc28gd2UgZG9uJ3Qgc2lsZW50bHkgc3dhbGxvdyB0aGVtIVxuICAgICAgdGhyb3cgZXJyb3IgLy8gVGhpcyBlcnJvciBwcm9iYWJseSBvY2N1cnJlZCBpbiBnZXRDaGlsZFJvdXRlcyBvciBnZXRDb21wb25lbnRzLlxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICBsZXQgeyBoaXN0b3J5LCBjaGlsZHJlbiwgcm91dGVzLCBwYXJzZVF1ZXJ5U3RyaW5nLCBzdHJpbmdpZnlRdWVyeSB9ID0gdGhpcy5wcm9wc1xuICAgIGxldCBjcmVhdGVIaXN0b3J5ID0gaGlzdG9yeSA/ICgpID0+IGhpc3RvcnkgOiBjcmVhdGVIYXNoSGlzdG9yeVxuXG4gICAgdGhpcy5oaXN0b3J5ID0gdXNlUm91dGVzKGNyZWF0ZUhpc3RvcnkpKHtcbiAgICAgIHJvdXRlczogY3JlYXRlUm91dGVzKHJvdXRlcyB8fCBjaGlsZHJlbiksXG4gICAgICBwYXJzZVF1ZXJ5U3RyaW5nLFxuICAgICAgc3RyaW5naWZ5UXVlcnlcbiAgICB9KVxuXG4gICAgdGhpcy5fdW5saXN0ZW4gPSB0aGlzLmhpc3RvcnkubGlzdGVuKChlcnJvciwgc3RhdGUpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGVycm9yKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSwgdGhpcy5wcm9wcy5vblVwZGF0ZSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IHNhbml0eSBjaGVjayAqL1xuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIHdhcm5pbmcoXG4gICAgICBuZXh0UHJvcHMuaGlzdG9yeSA9PT0gdGhpcy5wcm9wcy5oaXN0b3J5LFxuICAgICAgJ1lvdSBjYW5ub3QgY2hhbmdlIDxSb3V0ZXIgaGlzdG9yeT47IGl0IHdpbGwgYmUgaWdub3JlZCdcbiAgICApXG5cbiAgICB3YXJuaW5nKFxuICAgICAgKG5leHRQcm9wcy5yb3V0ZXMgfHwgbmV4dFByb3BzLmNoaWxkcmVuKSA9PT1cbiAgICAgICAgKHRoaXMucHJvcHMucm91dGVzIHx8IHRoaXMucHJvcHMuY2hpbGRyZW4pLFxuICAgICAgJ1lvdSBjYW5ub3QgY2hhbmdlIDxSb3V0ZXIgcm91dGVzPjsgaXQgd2lsbCBiZSBpZ25vcmVkJ1xuICAgIClcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGlmICh0aGlzLl91bmxpc3RlbilcbiAgICAgIHRoaXMuX3VubGlzdGVuKClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgeyBsb2NhdGlvbiwgcm91dGVzLCBwYXJhbXMsIGNvbXBvbmVudHMgfSA9IHRoaXMuc3RhdGVcbiAgICBsZXQgeyBSb3V0aW5nQ29udGV4dCwgY3JlYXRlRWxlbWVudCwgLi4ucHJvcHMgfSA9IHRoaXMucHJvcHNcblxuICAgIGlmIChsb2NhdGlvbiA9PSBudWxsKVxuICAgICAgcmV0dXJuIG51bGwgLy8gQXN5bmMgbWF0Y2hcblxuICAgIC8vIE9ubHkgZm9yd2FyZCBub24tUm91dGVyLXNwZWNpZmljIHByb3BzIHRvIHJvdXRpbmcgY29udGV4dCwgYXMgdGhvc2UgYXJlXG4gICAgLy8gdGhlIG9ubHkgb25lcyB0aGF0IG1pZ2h0IGJlIGN1c3RvbSByb3V0aW5nIGNvbnRleHQgcHJvcHMuXG4gICAgT2JqZWN0LmtleXMoUm91dGVyLnByb3BUeXBlcykuZm9yRWFjaChwcm9wVHlwZSA9PiBkZWxldGUgcHJvcHNbcHJvcFR5cGVdKVxuXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGluZ0NvbnRleHQsIHtcbiAgICAgIC4uLnByb3BzLFxuICAgICAgaGlzdG9yeTogdGhpcy5oaXN0b3J5LFxuICAgICAgY3JlYXRlRWxlbWVudCxcbiAgICAgIGxvY2F0aW9uLFxuICAgICAgcm91dGVzLFxuICAgICAgcGFyYW1zLFxuICAgICAgY29tcG9uZW50c1xuICAgIH0pXG4gIH1cblxufVxuXG5Sb3V0ZXIucHJvcFR5cGVzID0ge1xuICBoaXN0b3J5OiBvYmplY3QsXG4gIGNoaWxkcmVuOiByb3V0ZXMsXG4gIHJvdXRlcywgLy8gYWxpYXMgZm9yIGNoaWxkcmVuXG4gIFJvdXRpbmdDb250ZXh0OiBmdW5jLmlzUmVxdWlyZWQsXG4gIGNyZWF0ZUVsZW1lbnQ6IGZ1bmMsXG4gIG9uRXJyb3I6IGZ1bmMsXG4gIG9uVXBkYXRlOiBmdW5jLFxuICBwYXJzZVF1ZXJ5U3RyaW5nOiBmdW5jLFxuICBzdHJpbmdpZnlRdWVyeTogZnVuY1xufVxuXG5Sb3V0ZXIuZGVmYXVsdFByb3BzID0ge1xuICBSb3V0aW5nQ29udGV4dFxufVxuXG5leHBvcnQgZGVmYXVsdCBSb3V0ZXJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvbW9kdWxlcy9Sb3V0ZXIuanNcbiAqKi8iLCJpbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCdcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGlzUmVhY3RDaGlsZHJlbiB9IGZyb20gJy4vUm91dGVVdGlscydcbmltcG9ydCBnZXRSb3V0ZVBhcmFtcyBmcm9tICcuL2dldFJvdXRlUGFyYW1zJ1xuXG5jb25zdCB7IGFycmF5LCBmdW5jLCBvYmplY3QgfSA9IFJlYWN0LlByb3BUeXBlc1xuXG4vKipcbiAqIEEgPFJvdXRpbmdDb250ZXh0PiByZW5kZXJzIHRoZSBjb21wb25lbnQgdHJlZSBmb3IgYSBnaXZlbiByb3V0ZXIgc3RhdGVcbiAqIGFuZCBzZXRzIHRoZSBoaXN0b3J5IG9iamVjdCBhbmQgdGhlIGN1cnJlbnQgbG9jYXRpb24gaW4gY29udGV4dC5cbiAqL1xuY2xhc3MgUm91dGluZ0NvbnRleHQgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICBjb25zdCB7IGhpc3RvcnksIGxvY2F0aW9uIH0gPSB0aGlzLnByb3BzXG4gICAgcmV0dXJuIHsgaGlzdG9yeSwgbG9jYXRpb24gfVxuICB9XG5cbiAgY3JlYXRlRWxlbWVudChjb21wb25lbnQsIHByb3BzKSB7XG4gICAgcmV0dXJuIGNvbXBvbmVudCA9PSBudWxsID8gbnVsbCA6IHRoaXMucHJvcHMuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIHByb3BzKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaGlzdG9yeSwgbG9jYXRpb24sIHJvdXRlcywgcGFyYW1zLCBjb21wb25lbnRzIH0gPSB0aGlzLnByb3BzXG4gICAgbGV0IGVsZW1lbnQgPSBudWxsXG5cbiAgICBpZiAoY29tcG9uZW50cykge1xuICAgICAgZWxlbWVudCA9IGNvbXBvbmVudHMucmVkdWNlUmlnaHQoKGVsZW1lbnQsIGNvbXBvbmVudHMsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChjb21wb25lbnRzID09IG51bGwpXG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnQgLy8gRG9uJ3QgY3JlYXRlIG5ldyBjaGlsZHJlbjsgdXNlIHRoZSBncmFuZGNoaWxkcmVuLlxuXG4gICAgICAgIGNvbnN0IHJvdXRlID0gcm91dGVzW2luZGV4XVxuICAgICAgICBjb25zdCByb3V0ZVBhcmFtcyA9IGdldFJvdXRlUGFyYW1zKHJvdXRlLCBwYXJhbXMpXG4gICAgICAgIGNvbnN0IHByb3BzID0ge1xuICAgICAgICAgIGhpc3RvcnksXG4gICAgICAgICAgbG9jYXRpb24sXG4gICAgICAgICAgcGFyYW1zLFxuICAgICAgICAgIHJvdXRlLFxuICAgICAgICAgIHJvdXRlUGFyYW1zLFxuICAgICAgICAgIHJvdXRlc1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzUmVhY3RDaGlsZHJlbihlbGVtZW50KSkge1xuICAgICAgICAgIHByb3BzLmNoaWxkcmVuID0gZWxlbWVudFxuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIGVsZW1lbnQpXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNPd25Qcm9wZXJ0eShwcm9wKSlcbiAgICAgICAgICAgICAgcHJvcHNbcHJvcF0gPSBlbGVtZW50W3Byb3BdXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbXBvbmVudHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgY29uc3QgZWxlbWVudHMgPSB7fVxuXG4gICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gY29tcG9uZW50cykge1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAvLyBQYXNzIHRocm91Z2ggdGhlIGtleSBhcyBhIHByb3AgdG8gY3JlYXRlRWxlbWVudCB0byBhbGxvd1xuICAgICAgICAgICAgICAvLyBjdXN0b20gY3JlYXRlRWxlbWVudCBmdW5jdGlvbnMgdG8ga25vdyB3aGljaCBuYW1lZCBjb21wb25lbnRcbiAgICAgICAgICAgICAgLy8gdGhleSdyZSByZW5kZXJpbmcsIGZvciBlLmcuIG1hdGNoaW5nIHVwIHRvIGZldGNoZWQgZGF0YS5cbiAgICAgICAgICAgICAgZWxlbWVudHNba2V5XSA9IHRoaXMuY3JlYXRlRWxlbWVudChjb21wb25lbnRzW2tleV0sIHtcbiAgICAgICAgICAgICAgICBrZXksIC4uLnByb3BzXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnRzXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVFbGVtZW50KGNvbXBvbmVudHMsIHByb3BzKVxuICAgICAgfSwgZWxlbWVudClcbiAgICB9XG5cbiAgICBpbnZhcmlhbnQoXG4gICAgICBlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IGZhbHNlIHx8IFJlYWN0LmlzVmFsaWRFbGVtZW50KGVsZW1lbnQpLFxuICAgICAgJ1RoZSByb290IHJvdXRlIG11c3QgcmVuZGVyIGEgc2luZ2xlIGVsZW1lbnQnXG4gICAgKVxuXG4gICAgcmV0dXJuIGVsZW1lbnRcbiAgfVxuXG59XG5cblJvdXRpbmdDb250ZXh0LnByb3BUeXBlcyA9IHtcbiAgaGlzdG9yeTogb2JqZWN0LmlzUmVxdWlyZWQsXG4gIGNyZWF0ZUVsZW1lbnQ6IGZ1bmMuaXNSZXF1aXJlZCxcbiAgbG9jYXRpb246IG9iamVjdC5pc1JlcXVpcmVkLFxuICByb3V0ZXM6IGFycmF5LmlzUmVxdWlyZWQsXG4gIHBhcmFtczogb2JqZWN0LmlzUmVxdWlyZWQsXG4gIGNvbXBvbmVudHM6IGFycmF5LmlzUmVxdWlyZWRcbn1cblxuUm91dGluZ0NvbnRleHQuZGVmYXVsdFByb3BzID0ge1xuICBjcmVhdGVFbGVtZW50OiBSZWFjdC5jcmVhdGVFbGVtZW50XG59XG5cblJvdXRpbmdDb250ZXh0LmNoaWxkQ29udGV4dFR5cGVzID0ge1xuICBoaXN0b3J5OiBvYmplY3QuaXNSZXF1aXJlZCxcbiAgbG9jYXRpb246IG9iamVjdC5pc1JlcXVpcmVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJvdXRpbmdDb250ZXh0XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL21vZHVsZXMvUm91dGluZ0NvbnRleHQuanNcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciBpbnZhcmlhbnQgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICtcbiAgICAgICAgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107IH0pXG4gICAgICApO1xuICAgICAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2ludmFyaWFudC9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAyN1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnXG5cbmZ1bmN0aW9uIGlzVmFsaWRDaGlsZChvYmplY3QpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsIHx8IFJlYWN0LmlzVmFsaWRFbGVtZW50KG9iamVjdClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmVhY3RDaGlsZHJlbihvYmplY3QpIHtcbiAgcmV0dXJuIGlzVmFsaWRDaGlsZChvYmplY3QpIHx8IChBcnJheS5pc0FycmF5KG9iamVjdCkgJiYgb2JqZWN0LmV2ZXJ5KGlzVmFsaWRDaGlsZCkpXG59XG5cbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKGNvbXBvbmVudE5hbWUsIHByb3BUeXBlcywgcHJvcHMpIHtcbiAgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUgfHwgJ1Vua25vd25Db21wb25lbnQnXG5cbiAgZm9yIChjb25zdCBwcm9wTmFtZSBpbiBwcm9wVHlwZXMpIHtcbiAgICBpZiAocHJvcFR5cGVzLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgY29uc3QgZXJyb3IgPSBwcm9wVHlwZXNbcHJvcE5hbWVdKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSlcblxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmOiBlcnJvciBsb2dnaW5nICovXG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcilcbiAgICAgICAgd2FybmluZyhmYWxzZSwgZXJyb3IubWVzc2FnZSlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlUm91dGUoZGVmYXVsdFByb3BzLCBwcm9wcykge1xuICByZXR1cm4geyAuLi5kZWZhdWx0UHJvcHMsIC4uLnByb3BzIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJvdXRlRnJvbVJlYWN0RWxlbWVudChlbGVtZW50KSB7XG4gIGNvbnN0IHR5cGUgPSBlbGVtZW50LnR5cGVcbiAgY29uc3Qgcm91dGUgPSBjcmVhdGVSb3V0ZSh0eXBlLmRlZmF1bHRQcm9wcywgZWxlbWVudC5wcm9wcylcblxuICBpZiAodHlwZS5wcm9wVHlwZXMpXG4gICAgY2hlY2tQcm9wVHlwZXModHlwZS5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWUsIHR5cGUucHJvcFR5cGVzLCByb3V0ZSlcblxuICBpZiAocm91dGUuY2hpbGRyZW4pIHtcbiAgICBjb25zdCBjaGlsZFJvdXRlcyA9IGNyZWF0ZVJvdXRlc0Zyb21SZWFjdENoaWxkcmVuKHJvdXRlLmNoaWxkcmVuLCByb3V0ZSlcblxuICAgIGlmIChjaGlsZFJvdXRlcy5sZW5ndGgpXG4gICAgICByb3V0ZS5jaGlsZFJvdXRlcyA9IGNoaWxkUm91dGVzXG5cbiAgICBkZWxldGUgcm91dGUuY2hpbGRyZW5cbiAgfVxuXG4gIHJldHVybiByb3V0ZVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSByb3V0ZXMgb2JqZWN0IGZyb20gdGhlIGdpdmVuIFJlYWN0Q2hpbGRyZW4uIEpTWFxuICogcHJvdmlkZXMgYSBjb252ZW5pZW50IHdheSB0byB2aXN1YWxpemUgaG93IHJvdXRlcyBpbiB0aGUgaGllcmFyY2h5IGFyZVxuICogbmVzdGVkLlxuICpcbiAqICAgaW1wb3J0IHsgUm91dGUsIGNyZWF0ZVJvdXRlc0Zyb21SZWFjdENoaWxkcmVuIH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xuICogICBcbiAqICAgY29uc3Qgcm91dGVzID0gY3JlYXRlUm91dGVzRnJvbVJlYWN0Q2hpbGRyZW4oXG4gKiAgICAgPFJvdXRlIGNvbXBvbmVudD17QXBwfT5cbiAqICAgICAgIDxSb3V0ZSBwYXRoPVwiaG9tZVwiIGNvbXBvbmVudD17RGFzaGJvYXJkfS8+XG4gKiAgICAgICA8Um91dGUgcGF0aD1cIm5ld3NcIiBjb21wb25lbnQ9e05ld3NGZWVkfS8+XG4gKiAgICAgPC9Sb3V0ZT5cbiAqICAgKVxuICpcbiAqIE5vdGU6IFRoaXMgbWV0aG9kIGlzIGF1dG9tYXRpY2FsbHkgdXNlZCB3aGVuIHlvdSBwcm92aWRlIDxSb3V0ZT4gY2hpbGRyZW5cbiAqIHRvIGEgPFJvdXRlcj4gY29tcG9uZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUm91dGVzRnJvbVJlYWN0Q2hpbGRyZW4oY2hpbGRyZW4sIHBhcmVudFJvdXRlKSB7XG4gIGNvbnN0IHJvdXRlcyA9IFtdXG5cbiAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaChjaGlsZHJlbiwgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICBpZiAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAgIC8vIENvbXBvbmVudCBjbGFzc2VzIG1heSBoYXZlIGEgc3RhdGljIGNyZWF0ZSogbWV0aG9kLlxuICAgICAgaWYgKGVsZW1lbnQudHlwZS5jcmVhdGVSb3V0ZUZyb21SZWFjdEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgcm91dGUgPSBlbGVtZW50LnR5cGUuY3JlYXRlUm91dGVGcm9tUmVhY3RFbGVtZW50KGVsZW1lbnQsIHBhcmVudFJvdXRlKVxuXG4gICAgICAgIGlmIChyb3V0ZSlcbiAgICAgICAgICByb3V0ZXMucHVzaChyb3V0ZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvdXRlcy5wdXNoKGNyZWF0ZVJvdXRlRnJvbVJlYWN0RWxlbWVudChlbGVtZW50KSlcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIHJvdXRlc1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW5kIHJldHVybnMgYW4gYXJyYXkgb2Ygcm91dGVzIGZyb20gdGhlIGdpdmVuIG9iamVjdCB3aGljaFxuICogbWF5IGJlIGEgSlNYIHJvdXRlLCBhIHBsYWluIG9iamVjdCByb3V0ZSwgb3IgYW4gYXJyYXkgb2YgZWl0aGVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUm91dGVzKHJvdXRlcykge1xuICBpZiAoaXNSZWFjdENoaWxkcmVuKHJvdXRlcykpIHtcbiAgICByb3V0ZXMgPSBjcmVhdGVSb3V0ZXNGcm9tUmVhY3RDaGlsZHJlbihyb3V0ZXMpXG4gIH0gZWxzZSBpZiAocm91dGVzICYmICFBcnJheS5pc0FycmF5KHJvdXRlcykpIHtcbiAgICByb3V0ZXMgPSBbIHJvdXRlcyBdXG4gIH1cblxuICByZXR1cm4gcm91dGVzXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL21vZHVsZXMvUm91dGVVdGlscy5qc1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIHdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB3YXJuaW5nID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGFyZ3MpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiA+IDIgPyBsZW4gLSAyIDogMCk7XG4gICAgZm9yICh2YXIga2V5ID0gMjsga2V5IDwgbGVuOyBrZXkrKykge1xuICAgICAgYXJnc1trZXkgLSAyXSA9IGFyZ3VtZW50c1trZXldO1xuICAgIH1cbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgK1xuICAgICAgICAnbWVzc2FnZSBhcmd1bWVudCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdC5sZW5ndGggPCAxMCB8fCAoL15bc1xcV10qJC8pLnRlc3QoZm9ybWF0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnVGhlIHdhcm5pbmcgZm9ybWF0IHNob3VsZCBiZSBhYmxlIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IHRoaXMgJyArXG4gICAgICAgICd3YXJuaW5nLiBQbGVhc2UsIHVzZSBhIG1vcmUgZGVzY3JpcHRpdmUgZm9ybWF0IHRoYW46ICcgKyBmb3JtYXRcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICtcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgICB9KTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCh4KSB7fVxuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YXJuaW5nO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L3dhcm5pbmcvYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMjdcbiAqKi8iLCJpbXBvcnQgeyBnZXRQYXJhbU5hbWVzIH0gZnJvbSAnLi9QYXR0ZXJuVXRpbHMnXG5cbi8qKlxuICogRXh0cmFjdHMgYW4gb2JqZWN0IG9mIHBhcmFtcyB0aGUgZ2l2ZW4gcm91dGUgY2FyZXMgYWJvdXQgZnJvbVxuICogdGhlIGdpdmVuIHBhcmFtcyBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGdldFJvdXRlUGFyYW1zKHJvdXRlLCBwYXJhbXMpIHtcbiAgY29uc3Qgcm91dGVQYXJhbXMgPSB7fVxuXG4gIGlmICghcm91dGUucGF0aClcbiAgICByZXR1cm4gcm91dGVQYXJhbXNcblxuICBjb25zdCBwYXJhbU5hbWVzID0gZ2V0UGFyYW1OYW1lcyhyb3V0ZS5wYXRoKVxuXG4gIGZvciAoY29uc3QgcCBpbiBwYXJhbXMpXG4gICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShwKSAmJiBwYXJhbU5hbWVzLmluZGV4T2YocCkgIT09IC0xKVxuICAgICAgcm91dGVQYXJhbXNbcF0gPSBwYXJhbXNbcF1cblxuICByZXR1cm4gcm91dGVQYXJhbXNcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0Um91dGVQYXJhbXNcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvbW9kdWxlcy9nZXRSb3V0ZVBhcmFtcy5qc1xuICoqLyIsImltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50J1xuXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKVxufVxuXG5mdW5jdGlvbiBlc2NhcGVTb3VyY2Uoc3RyaW5nKSB7XG4gIHJldHVybiBlc2NhcGVSZWdFeHAoc3RyaW5nKS5yZXBsYWNlKC9cXC8rL2csICcvKycpXG59XG5cbmZ1bmN0aW9uIF9jb21waWxlUGF0dGVybihwYXR0ZXJuKSB7XG4gIGxldCByZWdleHBTb3VyY2UgPSAnJ1xuICBjb25zdCBwYXJhbU5hbWVzID0gW11cbiAgY29uc3QgdG9rZW5zID0gW11cblxuICBsZXQgbWF0Y2gsIGxhc3RJbmRleCA9IDAsIG1hdGNoZXIgPSAvOihbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopfFxcKlxcKnxcXCp8XFwofFxcKS9nXG4gIHdoaWxlICgobWF0Y2ggPSBtYXRjaGVyLmV4ZWMocGF0dGVybikpKSB7XG4gICAgaWYgKG1hdGNoLmluZGV4ICE9PSBsYXN0SW5kZXgpIHtcbiAgICAgIHRva2Vucy5wdXNoKHBhdHRlcm4uc2xpY2UobGFzdEluZGV4LCBtYXRjaC5pbmRleCkpXG4gICAgICByZWdleHBTb3VyY2UgKz0gZXNjYXBlU291cmNlKHBhdHRlcm4uc2xpY2UobGFzdEluZGV4LCBtYXRjaC5pbmRleCkpXG4gICAgfVxuXG4gICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICByZWdleHBTb3VyY2UgKz0gJyhbXi8/I10rKSdcbiAgICAgIHBhcmFtTmFtZXMucHVzaChtYXRjaFsxXSlcbiAgICB9IGVsc2UgaWYgKG1hdGNoWzBdID09PSAnKionKSB7XG4gICAgICByZWdleHBTb3VyY2UgKz0gJyhbXFxcXHNcXFxcU10qKSdcbiAgICAgIHBhcmFtTmFtZXMucHVzaCgnc3BsYXQnKVxuICAgIH0gZWxzZSBpZiAobWF0Y2hbMF0gPT09ICcqJykge1xuICAgICAgcmVnZXhwU291cmNlICs9ICcoW1xcXFxzXFxcXFNdKj8pJ1xuICAgICAgcGFyYW1OYW1lcy5wdXNoKCdzcGxhdCcpXG4gICAgfSBlbHNlIGlmIChtYXRjaFswXSA9PT0gJygnKSB7XG4gICAgICByZWdleHBTb3VyY2UgKz0gJyg/OidcbiAgICB9IGVsc2UgaWYgKG1hdGNoWzBdID09PSAnKScpIHtcbiAgICAgIHJlZ2V4cFNvdXJjZSArPSAnKT8nXG4gICAgfVxuXG4gICAgdG9rZW5zLnB1c2gobWF0Y2hbMF0pXG5cbiAgICBsYXN0SW5kZXggPSBtYXRjaGVyLmxhc3RJbmRleFxuICB9XG5cbiAgaWYgKGxhc3RJbmRleCAhPT0gcGF0dGVybi5sZW5ndGgpIHtcbiAgICB0b2tlbnMucHVzaChwYXR0ZXJuLnNsaWNlKGxhc3RJbmRleCwgcGF0dGVybi5sZW5ndGgpKVxuICAgIHJlZ2V4cFNvdXJjZSArPSBlc2NhcGVTb3VyY2UocGF0dGVybi5zbGljZShsYXN0SW5kZXgsIHBhdHRlcm4ubGVuZ3RoKSlcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGF0dGVybixcbiAgICByZWdleHBTb3VyY2UsXG4gICAgcGFyYW1OYW1lcyxcbiAgICB0b2tlbnNcbiAgfVxufVxuXG5jb25zdCBDb21waWxlZFBhdHRlcm5zQ2FjaGUgPSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZVBhdHRlcm4ocGF0dGVybikge1xuICBpZiAoIShwYXR0ZXJuIGluIENvbXBpbGVkUGF0dGVybnNDYWNoZSkpXG4gICAgQ29tcGlsZWRQYXR0ZXJuc0NhY2hlW3BhdHRlcm5dID0gX2NvbXBpbGVQYXR0ZXJuKHBhdHRlcm4pXG5cbiAgcmV0dXJuIENvbXBpbGVkUGF0dGVybnNDYWNoZVtwYXR0ZXJuXVxufVxuXG4vKipcbiAqIEF0dGVtcHRzIHRvIG1hdGNoIGEgcGF0dGVybiBvbiB0aGUgZ2l2ZW4gcGF0aG5hbWUuIFBhdHRlcm5zIG1heSB1c2VcbiAqIHRoZSBmb2xsb3dpbmcgc3BlY2lhbCBjaGFyYWN0ZXJzOlxuICpcbiAqIC0gOnBhcmFtTmFtZSAgICAgTWF0Y2hlcyBhIFVSTCBzZWdtZW50IHVwIHRvIHRoZSBuZXh0IC8sID8sIG9yICMuIFRoZVxuICogICAgICAgICAgICAgICAgICBjYXB0dXJlZCBzdHJpbmcgaXMgY29uc2lkZXJlZCBhIFwicGFyYW1cIlxuICogLSAoKSAgICAgICAgICAgICBXcmFwcyBhIHNlZ21lbnQgb2YgdGhlIFVSTCB0aGF0IGlzIG9wdGlvbmFsXG4gKiAtICogICAgICAgICAgICAgIENvbnN1bWVzIChub24tZ3JlZWR5KSBhbGwgY2hhcmFjdGVycyB1cCB0byB0aGUgbmV4dFxuICogICAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgaW4gdGhlIHBhdHRlcm4sIG9yIHRvIHRoZSBlbmQgb2YgdGhlIFVSTCBpZlxuICogICAgICAgICAgICAgICAgICB0aGVyZSBpcyBub25lXG4gKiAtICoqICAgICAgICAgICAgIENvbnN1bWVzIChncmVlZHkpIGFsbCBjaGFyYWN0ZXJzIHVwIHRvIHRoZSBuZXh0IGNoYXJhY3RlclxuICogICAgICAgICAgICAgICAgICBpbiB0aGUgcGF0dGVybiwgb3IgdG8gdGhlIGVuZCBvZiB0aGUgVVJMIGlmIHRoZXJlIGlzIG5vbmVcbiAqXG4gKiBUaGUgcmV0dXJuIHZhbHVlIGlzIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqXG4gKiAtIHJlbWFpbmluZ1BhdGhuYW1lXG4gKiAtIHBhcmFtTmFtZXNcbiAqIC0gcGFyYW1WYWx1ZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoUGF0dGVybihwYXR0ZXJuLCBwYXRobmFtZSkge1xuICAvLyBNYWtlIGxlYWRpbmcgc2xhc2hlcyBjb25zaXN0ZW50IGJldHdlZW4gcGF0dGVybiBhbmQgcGF0aG5hbWUuXG4gIGlmIChwYXR0ZXJuLmNoYXJBdCgwKSAhPT0gJy8nKSB7XG4gICAgcGF0dGVybiA9IGAvJHtwYXR0ZXJufWBcbiAgfVxuICBpZiAocGF0aG5hbWUuY2hhckF0KDApICE9PSAnLycpIHtcbiAgICBwYXRobmFtZSA9IGAvJHtwYXRobmFtZX1gXG4gIH1cblxuICBsZXQgeyByZWdleHBTb3VyY2UsIHBhcmFtTmFtZXMsIHRva2VucyB9ID0gY29tcGlsZVBhdHRlcm4ocGF0dGVybilcblxuICByZWdleHBTb3VyY2UgKz0gJy8qJyAvLyBDYXB0dXJlIHBhdGggc2VwYXJhdG9yc1xuXG4gIC8vIFNwZWNpYWwtY2FzZSBwYXR0ZXJucyBsaWtlICcqJyBmb3IgY2F0Y2gtYWxsIHJvdXRlcy5cbiAgY29uc3QgY2FwdHVyZVJlbWFpbmluZyA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV0gIT09ICcqJ1xuXG4gIGlmIChjYXB0dXJlUmVtYWluaW5nKSB7XG4gICAgLy8gVGhpcyB3aWxsIG1hdGNoIG5ld2xpbmVzIGluIHRoZSByZW1haW5pbmcgcGF0aC5cbiAgICByZWdleHBTb3VyY2UgKz0gJyhbXFxcXHNcXFxcU10qPyknXG4gIH1cblxuICBjb25zdCBtYXRjaCA9IHBhdGhuYW1lLm1hdGNoKG5ldyBSZWdFeHAoJ14nICsgcmVnZXhwU291cmNlICsgJyQnLCAnaScpKVxuXG4gIGxldCByZW1haW5pbmdQYXRobmFtZSwgcGFyYW1WYWx1ZXNcbiAgaWYgKG1hdGNoICE9IG51bGwpIHtcbiAgICBpZiAoY2FwdHVyZVJlbWFpbmluZykge1xuICAgICAgcmVtYWluaW5nUGF0aG5hbWUgPSBtYXRjaC5wb3AoKVxuICAgICAgY29uc3QgbWF0Y2hlZFBhdGggPVxuICAgICAgICBtYXRjaFswXS5zdWJzdHIoMCwgbWF0Y2hbMF0ubGVuZ3RoIC0gcmVtYWluaW5nUGF0aG5hbWUubGVuZ3RoKVxuXG4gICAgICAvLyBJZiB3ZSBkaWRuJ3QgbWF0Y2ggdGhlIGVudGlyZSBwYXRobmFtZSwgdGhlbiBtYWtlIHN1cmUgdGhhdCB0aGUgbWF0Y2hcbiAgICAgIC8vIHdlIGRpZCBnZXQgZW5kcyBhdCBhIHBhdGggc2VwYXJhdG9yIChwb3RlbnRpYWxseSB0aGUgb25lIHdlIGFkZGVkXG4gICAgICAvLyBhYm92ZSBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBwYXRoLCBpZiB0aGUgYWN0dWFsIG1hdGNoIHdhcyBlbXB0eSkuXG4gICAgICBpZiAoXG4gICAgICAgIHJlbWFpbmluZ1BhdGhuYW1lICYmXG4gICAgICAgIG1hdGNoZWRQYXRoLmNoYXJBdChtYXRjaGVkUGF0aC5sZW5ndGggLSAxKSAhPT0gJy8nXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICByZW1haW5pbmdQYXRobmFtZTogbnVsbCxcbiAgICAgICAgICBwYXJhbU5hbWVzLFxuICAgICAgICAgIHBhcmFtVmFsdWVzOiBudWxsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSWYgdGhpcyBtYXRjaGVkIGF0IGFsbCwgdGhlbiB0aGUgbWF0Y2ggd2FzIHRoZSBlbnRpcmUgcGF0aG5hbWUuXG4gICAgICByZW1haW5pbmdQYXRobmFtZSA9ICcnXG4gICAgfVxuXG4gICAgcGFyYW1WYWx1ZXMgPSBtYXRjaC5zbGljZSgxKS5tYXAoXG4gICAgICB2ID0+IHYgIT0gbnVsbCA/IGRlY29kZVVSSUNvbXBvbmVudCh2KSA6IHZcbiAgICApXG4gIH0gZWxzZSB7XG4gICAgcmVtYWluaW5nUGF0aG5hbWUgPSBwYXJhbVZhbHVlcyA9IG51bGxcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVtYWluaW5nUGF0aG5hbWUsXG4gICAgcGFyYW1OYW1lcyxcbiAgICBwYXJhbVZhbHVlc1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJhbU5hbWVzKHBhdHRlcm4pIHtcbiAgcmV0dXJuIGNvbXBpbGVQYXR0ZXJuKHBhdHRlcm4pLnBhcmFtTmFtZXNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhcmFtcyhwYXR0ZXJuLCBwYXRobmFtZSkge1xuICBjb25zdCB7IHBhcmFtTmFtZXMsIHBhcmFtVmFsdWVzIH0gPSBtYXRjaFBhdHRlcm4ocGF0dGVybiwgcGF0aG5hbWUpXG5cbiAgaWYgKHBhcmFtVmFsdWVzICE9IG51bGwpIHtcbiAgICByZXR1cm4gcGFyYW1OYW1lcy5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIHBhcmFtTmFtZSwgaW5kZXgpIHtcbiAgICAgIG1lbW9bcGFyYW1OYW1lXSA9IHBhcmFtVmFsdWVzW2luZGV4XVxuICAgICAgcmV0dXJuIG1lbW9cbiAgICB9LCB7fSlcbiAgfVxuXG4gIHJldHVybiBudWxsXG59XG5cbi8qKlxuICogUmV0dXJucyBhIHZlcnNpb24gb2YgdGhlIGdpdmVuIHBhdHRlcm4gd2l0aCBwYXJhbXMgaW50ZXJwb2xhdGVkLiBUaHJvd3NcbiAqIGlmIHRoZXJlIGlzIGEgZHluYW1pYyBzZWdtZW50IG9mIHRoZSBwYXR0ZXJuIGZvciB3aGljaCB0aGVyZSBpcyBubyBwYXJhbS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFBhdHRlcm4ocGF0dGVybiwgcGFyYW1zKSB7XG4gIHBhcmFtcyA9IHBhcmFtcyB8fCB7fVxuXG4gIGNvbnN0IHsgdG9rZW5zIH0gPSBjb21waWxlUGF0dGVybihwYXR0ZXJuKVxuICBsZXQgcGFyZW5Db3VudCA9IDAsIHBhdGhuYW1lID0gJycsIHNwbGF0SW5kZXggPSAwXG5cbiAgbGV0IHRva2VuLCBwYXJhbU5hbWUsIHBhcmFtVmFsdWVcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRva2Vucy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIHRva2VuID0gdG9rZW5zW2ldXG5cbiAgICBpZiAodG9rZW4gPT09ICcqJyB8fCB0b2tlbiA9PT0gJyoqJykge1xuICAgICAgcGFyYW1WYWx1ZSA9IEFycmF5LmlzQXJyYXkocGFyYW1zLnNwbGF0KSA/IHBhcmFtcy5zcGxhdFtzcGxhdEluZGV4KytdIDogcGFyYW1zLnNwbGF0XG5cbiAgICAgIGludmFyaWFudChcbiAgICAgICAgcGFyYW1WYWx1ZSAhPSBudWxsIHx8IHBhcmVuQ291bnQgPiAwLFxuICAgICAgICAnTWlzc2luZyBzcGxhdCAjJXMgZm9yIHBhdGggXCIlc1wiJyxcbiAgICAgICAgc3BsYXRJbmRleCwgcGF0dGVyblxuICAgICAgKVxuXG4gICAgICBpZiAocGFyYW1WYWx1ZSAhPSBudWxsKVxuICAgICAgICBwYXRobmFtZSArPSBlbmNvZGVVUkkocGFyYW1WYWx1ZSlcbiAgICB9IGVsc2UgaWYgKHRva2VuID09PSAnKCcpIHtcbiAgICAgIHBhcmVuQ291bnQgKz0gMVxuICAgIH0gZWxzZSBpZiAodG9rZW4gPT09ICcpJykge1xuICAgICAgcGFyZW5Db3VudCAtPSAxXG4gICAgfSBlbHNlIGlmICh0b2tlbi5jaGFyQXQoMCkgPT09ICc6Jykge1xuICAgICAgcGFyYW1OYW1lID0gdG9rZW4uc3Vic3RyaW5nKDEpXG4gICAgICBwYXJhbVZhbHVlID0gcGFyYW1zW3BhcmFtTmFtZV1cblxuICAgICAgaW52YXJpYW50KFxuICAgICAgICBwYXJhbVZhbHVlICE9IG51bGwgfHwgcGFyZW5Db3VudCA+IDAsXG4gICAgICAgICdNaXNzaW5nIFwiJXNcIiBwYXJhbWV0ZXIgZm9yIHBhdGggXCIlc1wiJyxcbiAgICAgICAgcGFyYW1OYW1lLCBwYXR0ZXJuXG4gICAgICApXG5cbiAgICAgIGlmIChwYXJhbVZhbHVlICE9IG51bGwpXG4gICAgICAgIHBhdGhuYW1lICs9IGVuY29kZVVSSUNvbXBvbmVudChwYXJhbVZhbHVlKVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXRobmFtZSArPSB0b2tlblxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYXRobmFtZS5yZXBsYWNlKC9cXC8rL2csICcvJylcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvbW9kdWxlcy9QYXR0ZXJuVXRpbHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF93YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuXG52YXIgX3dhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2FybmluZyk7XG5cbnZhciBfaW52YXJpYW50ID0gcmVxdWlyZSgnaW52YXJpYW50Jyk7XG5cbnZhciBfaW52YXJpYW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ludmFyaWFudCk7XG5cbnZhciBfQWN0aW9ucyA9IHJlcXVpcmUoJy4vQWN0aW9ucycpO1xuXG52YXIgX0V4ZWN1dGlvbkVudmlyb25tZW50ID0gcmVxdWlyZSgnLi9FeGVjdXRpb25FbnZpcm9ubWVudCcpO1xuXG52YXIgX0RPTVV0aWxzID0gcmVxdWlyZSgnLi9ET01VdGlscycpO1xuXG52YXIgX0RPTVN0YXRlU3RvcmFnZSA9IHJlcXVpcmUoJy4vRE9NU3RhdGVTdG9yYWdlJyk7XG5cbnZhciBfY3JlYXRlRE9NSGlzdG9yeSA9IHJlcXVpcmUoJy4vY3JlYXRlRE9NSGlzdG9yeScpO1xuXG52YXIgX2NyZWF0ZURPTUhpc3RvcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlRE9NSGlzdG9yeSk7XG5cbnZhciBfcGFyc2VQYXRoID0gcmVxdWlyZSgnLi9wYXJzZVBhdGgnKTtcblxudmFyIF9wYXJzZVBhdGgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGFyc2VQYXRoKTtcblxuZnVuY3Rpb24gaXNBYnNvbHV0ZVBhdGgocGF0aCkge1xuICByZXR1cm4gdHlwZW9mIHBhdGggPT09ICdzdHJpbmcnICYmIHBhdGguY2hhckF0KDApID09PSAnLyc7XG59XG5cbmZ1bmN0aW9uIGVuc3VyZVNsYXNoKCkge1xuICB2YXIgcGF0aCA9IF9ET01VdGlscy5nZXRIYXNoUGF0aCgpO1xuXG4gIGlmIChpc0Fic29sdXRlUGF0aChwYXRoKSkgcmV0dXJuIHRydWU7XG5cbiAgX0RPTVV0aWxzLnJlcGxhY2VIYXNoUGF0aCgnLycgKyBwYXRoKTtcblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGFkZFF1ZXJ5U3RyaW5nVmFsdWVUb1BhdGgocGF0aCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gcGF0aCArIChwYXRoLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgKGtleSArICc9JyArIHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gc3RyaXBRdWVyeVN0cmluZ1ZhbHVlRnJvbVBhdGgocGF0aCwga2V5KSB7XG4gIHJldHVybiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cCgnWz8mXT8nICsga2V5ICsgJz1bYS16QS1aMC05XSsnKSwgJycpO1xufVxuXG5mdW5jdGlvbiBnZXRRdWVyeVN0cmluZ1ZhbHVlRnJvbVBhdGgocGF0aCwga2V5KSB7XG4gIHZhciBtYXRjaCA9IHBhdGgubWF0Y2gobmV3IFJlZ0V4cCgnXFxcXD8uKj9cXFxcYicgKyBrZXkgKyAnPSguKz8pXFxcXGInKSk7XG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaFsxXTtcbn1cblxudmFyIERlZmF1bHRRdWVyeUtleSA9ICdfayc7XG5cbmZ1bmN0aW9uIGNyZWF0ZUhhc2hIaXN0b3J5KCkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXG4gICFfRXhlY3V0aW9uRW52aXJvbm1lbnQuY2FuVXNlRE9NID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF9pbnZhcmlhbnQyWydkZWZhdWx0J10oZmFsc2UsICdIYXNoIGhpc3RvcnkgbmVlZHMgYSBET00nKSA6IF9pbnZhcmlhbnQyWydkZWZhdWx0J10oZmFsc2UpIDogdW5kZWZpbmVkO1xuXG4gIHZhciBxdWVyeUtleSA9IG9wdGlvbnMucXVlcnlLZXk7XG5cbiAgaWYgKHF1ZXJ5S2V5ID09PSB1bmRlZmluZWQgfHwgISFxdWVyeUtleSkgcXVlcnlLZXkgPSB0eXBlb2YgcXVlcnlLZXkgPT09ICdzdHJpbmcnID8gcXVlcnlLZXkgOiBEZWZhdWx0UXVlcnlLZXk7XG5cbiAgZnVuY3Rpb24gZ2V0Q3VycmVudExvY2F0aW9uKCkge1xuICAgIHZhciBwYXRoID0gX0RPTVV0aWxzLmdldEhhc2hQYXRoKCk7XG5cbiAgICB2YXIga2V5ID0gdW5kZWZpbmVkLFxuICAgICAgICBzdGF0ZSA9IHVuZGVmaW5lZDtcbiAgICBpZiAocXVlcnlLZXkpIHtcbiAgICAgIGtleSA9IGdldFF1ZXJ5U3RyaW5nVmFsdWVGcm9tUGF0aChwYXRoLCBxdWVyeUtleSk7XG4gICAgICBwYXRoID0gc3RyaXBRdWVyeVN0cmluZ1ZhbHVlRnJvbVBhdGgocGF0aCwgcXVlcnlLZXkpO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHN0YXRlID0gX0RPTVN0YXRlU3RvcmFnZS5yZWFkU3RhdGUoa2V5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlID0gbnVsbDtcbiAgICAgICAga2V5ID0gaGlzdG9yeS5jcmVhdGVLZXkoKTtcbiAgICAgICAgX0RPTVV0aWxzLnJlcGxhY2VIYXNoUGF0aChhZGRRdWVyeVN0cmluZ1ZhbHVlVG9QYXRoKHBhdGgsIHF1ZXJ5S2V5LCBrZXkpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAga2V5ID0gc3RhdGUgPSBudWxsO1xuICAgIH1cblxuICAgIHZhciBsb2NhdGlvbiA9IF9wYXJzZVBhdGgyWydkZWZhdWx0J10ocGF0aCk7XG5cbiAgICByZXR1cm4gaGlzdG9yeS5jcmVhdGVMb2NhdGlvbihfZXh0ZW5kcyh7fSwgbG9jYXRpb24sIHsgc3RhdGU6IHN0YXRlIH0pLCB1bmRlZmluZWQsIGtleSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydEhhc2hDaGFuZ2VMaXN0ZW5lcihfcmVmKSB7XG4gICAgdmFyIHRyYW5zaXRpb25UbyA9IF9yZWYudHJhbnNpdGlvblRvO1xuXG4gICAgZnVuY3Rpb24gaGFzaENoYW5nZUxpc3RlbmVyKCkge1xuICAgICAgaWYgKCFlbnN1cmVTbGFzaCgpKSByZXR1cm47IC8vIEFsd2F5cyBtYWtlIHN1cmUgaGFzaGVzIGFyZSBwcmVjZWVkZWQgd2l0aCBhIC8uXG5cbiAgICAgIHRyYW5zaXRpb25UbyhnZXRDdXJyZW50TG9jYXRpb24oKSk7XG4gICAgfVxuXG4gICAgZW5zdXJlU2xhc2goKTtcbiAgICBfRE9NVXRpbHMuYWRkRXZlbnRMaXN0ZW5lcih3aW5kb3csICdoYXNoY2hhbmdlJywgaGFzaENoYW5nZUxpc3RlbmVyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBfRE9NVXRpbHMucmVtb3ZlRXZlbnRMaXN0ZW5lcih3aW5kb3csICdoYXNoY2hhbmdlJywgaGFzaENoYW5nZUxpc3RlbmVyKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZmluaXNoVHJhbnNpdGlvbihsb2NhdGlvbikge1xuICAgIHZhciBiYXNlbmFtZSA9IGxvY2F0aW9uLmJhc2VuYW1lO1xuICAgIHZhciBwYXRobmFtZSA9IGxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIHZhciBzZWFyY2ggPSBsb2NhdGlvbi5zZWFyY2g7XG4gICAgdmFyIHN0YXRlID0gbG9jYXRpb24uc3RhdGU7XG4gICAgdmFyIGFjdGlvbiA9IGxvY2F0aW9uLmFjdGlvbjtcbiAgICB2YXIga2V5ID0gbG9jYXRpb24ua2V5O1xuXG4gICAgaWYgKGFjdGlvbiA9PT0gX0FjdGlvbnMuUE9QKSByZXR1cm47IC8vIE5vdGhpbmcgdG8gZG8uXG5cbiAgICB2YXIgcGF0aCA9IChiYXNlbmFtZSB8fCAnJykgKyBwYXRobmFtZSArIHNlYXJjaDtcblxuICAgIGlmIChxdWVyeUtleSkge1xuICAgICAgcGF0aCA9IGFkZFF1ZXJ5U3RyaW5nVmFsdWVUb1BhdGgocGF0aCwgcXVlcnlLZXksIGtleSk7XG4gICAgICBfRE9NU3RhdGVTdG9yYWdlLnNhdmVTdGF0ZShrZXksIHN0YXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRHJvcCBrZXkgYW5kIHN0YXRlLlxuICAgICAgbG9jYXRpb24ua2V5ID0gbG9jYXRpb24uc3RhdGUgPSBudWxsO1xuICAgIH1cblxuICAgIHZhciBjdXJyZW50SGFzaCA9IF9ET01VdGlscy5nZXRIYXNoUGF0aCgpO1xuXG4gICAgaWYgKGFjdGlvbiA9PT0gX0FjdGlvbnMuUFVTSCkge1xuICAgICAgaWYgKGN1cnJlbnRIYXNoICE9PSBwYXRoKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gcGF0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfd2FybmluZzJbJ2RlZmF1bHQnXShmYWxzZSwgJ1lvdSBjYW5ub3QgUFVTSCB0aGUgc2FtZSBwYXRoIHVzaW5nIGhhc2ggaGlzdG9yeScpIDogdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY3VycmVudEhhc2ggIT09IHBhdGgpIHtcbiAgICAgIC8vIFJFUExBQ0VcbiAgICAgIF9ET01VdGlscy5yZXBsYWNlSGFzaFBhdGgocGF0aCk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGhpc3RvcnkgPSBfY3JlYXRlRE9NSGlzdG9yeTJbJ2RlZmF1bHQnXShfZXh0ZW5kcyh7fSwgb3B0aW9ucywge1xuICAgIGdldEN1cnJlbnRMb2NhdGlvbjogZ2V0Q3VycmVudExvY2F0aW9uLFxuICAgIGZpbmlzaFRyYW5zaXRpb246IGZpbmlzaFRyYW5zaXRpb24sXG4gICAgc2F2ZVN0YXRlOiBfRE9NU3RhdGVTdG9yYWdlLnNhdmVTdGF0ZVxuICB9KSk7XG5cbiAgdmFyIGxpc3RlbmVyQ291bnQgPSAwLFxuICAgICAgc3RvcEhhc2hDaGFuZ2VMaXN0ZW5lciA9IHVuZGVmaW5lZDtcblxuICBmdW5jdGlvbiBsaXN0ZW5CZWZvcmUobGlzdGVuZXIpIHtcbiAgICBpZiAoKytsaXN0ZW5lckNvdW50ID09PSAxKSBzdG9wSGFzaENoYW5nZUxpc3RlbmVyID0gc3RhcnRIYXNoQ2hhbmdlTGlzdGVuZXIoaGlzdG9yeSk7XG5cbiAgICB2YXIgdW5saXN0ZW4gPSBoaXN0b3J5Lmxpc3RlbkJlZm9yZShsaXN0ZW5lcik7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdW5saXN0ZW4oKTtcblxuICAgICAgaWYgKC0tbGlzdGVuZXJDb3VudCA9PT0gMCkgc3RvcEhhc2hDaGFuZ2VMaXN0ZW5lcigpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICBpZiAoKytsaXN0ZW5lckNvdW50ID09PSAxKSBzdG9wSGFzaENoYW5nZUxpc3RlbmVyID0gc3RhcnRIYXNoQ2hhbmdlTGlzdGVuZXIoaGlzdG9yeSk7XG5cbiAgICB2YXIgdW5saXN0ZW4gPSBoaXN0b3J5Lmxpc3RlbihsaXN0ZW5lcik7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdW5saXN0ZW4oKTtcblxuICAgICAgaWYgKC0tbGlzdGVuZXJDb3VudCA9PT0gMCkgc3RvcEhhc2hDaGFuZ2VMaXN0ZW5lcigpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBwdXNoKGxvY2F0aW9uKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF93YXJuaW5nMlsnZGVmYXVsdCddKHF1ZXJ5S2V5IHx8IGxvY2F0aW9uLnN0YXRlID09IG51bGwsICdZb3UgY2Fubm90IHVzZSBzdGF0ZSB3aXRob3V0IGEgcXVlcnlLZXkgaXQgd2lsbCBiZSBkcm9wcGVkJykgOiB1bmRlZmluZWQ7XG5cbiAgICBoaXN0b3J5LnB1c2gobG9jYXRpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZShsb2NhdGlvbikge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfd2FybmluZzJbJ2RlZmF1bHQnXShxdWVyeUtleSB8fCBsb2NhdGlvbi5zdGF0ZSA9PSBudWxsLCAnWW91IGNhbm5vdCB1c2Ugc3RhdGUgd2l0aG91dCBhIHF1ZXJ5S2V5IGl0IHdpbGwgYmUgZHJvcHBlZCcpIDogdW5kZWZpbmVkO1xuXG4gICAgaGlzdG9yeS5yZXBsYWNlKGxvY2F0aW9uKTtcbiAgfVxuXG4gIHZhciBnb0lzU3VwcG9ydGVkV2l0aG91dFJlbG9hZCA9IF9ET01VdGlscy5zdXBwb3J0c0dvV2l0aG91dFJlbG9hZFVzaW5nSGFzaCgpO1xuXG4gIGZ1bmN0aW9uIGdvKG4pIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX3dhcm5pbmcyWydkZWZhdWx0J10oZ29Jc1N1cHBvcnRlZFdpdGhvdXRSZWxvYWQsICdIYXNoIGhpc3RvcnkgZ28obikgY2F1c2VzIGEgZnVsbCBwYWdlIHJlbG9hZCBpbiB0aGlzIGJyb3dzZXInKSA6IHVuZGVmaW5lZDtcblxuICAgIGhpc3RvcnkuZ28obik7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVIcmVmKHBhdGgpIHtcbiAgICByZXR1cm4gJyMnICsgaGlzdG9yeS5jcmVhdGVIcmVmKHBhdGgpO1xuICB9XG5cbiAgLy8gZGVwcmVjYXRlZFxuICBmdW5jdGlvbiByZWdpc3RlclRyYW5zaXRpb25Ib29rKGhvb2spIHtcbiAgICBpZiAoKytsaXN0ZW5lckNvdW50ID09PSAxKSBzdG9wSGFzaENoYW5nZUxpc3RlbmVyID0gc3RhcnRIYXNoQ2hhbmdlTGlzdGVuZXIoaGlzdG9yeSk7XG5cbiAgICBoaXN0b3J5LnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2soaG9vayk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHVucmVnaXN0ZXJUcmFuc2l0aW9uSG9vayhob29rKSB7XG4gICAgaGlzdG9yeS51bnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2soaG9vayk7XG5cbiAgICBpZiAoLS1saXN0ZW5lckNvdW50ID09PSAwKSBzdG9wSGFzaENoYW5nZUxpc3RlbmVyKCk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHB1c2hTdGF0ZShzdGF0ZSwgcGF0aCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfd2FybmluZzJbJ2RlZmF1bHQnXShxdWVyeUtleSB8fCBzdGF0ZSA9PSBudWxsLCAnWW91IGNhbm5vdCB1c2Ugc3RhdGUgd2l0aG91dCBhIHF1ZXJ5S2V5IGl0IHdpbGwgYmUgZHJvcHBlZCcpIDogdW5kZWZpbmVkO1xuXG4gICAgaGlzdG9yeS5wdXNoU3RhdGUoc3RhdGUsIHBhdGgpO1xuICB9XG5cbiAgLy8gZGVwcmVjYXRlZFxuICBmdW5jdGlvbiByZXBsYWNlU3RhdGUoc3RhdGUsIHBhdGgpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX3dhcm5pbmcyWydkZWZhdWx0J10ocXVlcnlLZXkgfHwgc3RhdGUgPT0gbnVsbCwgJ1lvdSBjYW5ub3QgdXNlIHN0YXRlIHdpdGhvdXQgYSBxdWVyeUtleSBpdCB3aWxsIGJlIGRyb3BwZWQnKSA6IHVuZGVmaW5lZDtcblxuICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKHN0YXRlLCBwYXRoKTtcbiAgfVxuXG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgaGlzdG9yeSwge1xuICAgIGxpc3RlbkJlZm9yZTogbGlzdGVuQmVmb3JlLFxuICAgIGxpc3RlbjogbGlzdGVuLFxuICAgIHB1c2g6IHB1c2gsXG4gICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICBnbzogZ28sXG4gICAgY3JlYXRlSHJlZjogY3JlYXRlSHJlZixcblxuICAgIHJlZ2lzdGVyVHJhbnNpdGlvbkhvb2s6IHJlZ2lzdGVyVHJhbnNpdGlvbkhvb2ssIC8vIGRlcHJlY2F0ZWQgLSB3YXJuaW5nIGlzIGluIGNyZWF0ZUhpc3RvcnlcbiAgICB1bnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2s6IHVucmVnaXN0ZXJUcmFuc2l0aW9uSG9vaywgLy8gZGVwcmVjYXRlZCAtIHdhcm5pbmcgaXMgaW4gY3JlYXRlSGlzdG9yeVxuICAgIHB1c2hTdGF0ZTogcHVzaFN0YXRlLCAvLyBkZXByZWNhdGVkIC0gd2FybmluZyBpcyBpbiBjcmVhdGVIaXN0b3J5XG4gICAgcmVwbGFjZVN0YXRlOiByZXBsYWNlU3RhdGUgLy8gZGVwcmVjYXRlZCAtIHdhcm5pbmcgaXMgaW4gY3JlYXRlSGlzdG9yeVxuICB9KTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gY3JlYXRlSGFzaEhpc3Rvcnk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vaGlzdG9yeS9saWIvY3JlYXRlSGFzaEhpc3RvcnkuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAyN1xuICoqLyIsIi8qKlxuICogSW5kaWNhdGVzIHRoYXQgbmF2aWdhdGlvbiB3YXMgY2F1c2VkIGJ5IGEgY2FsbCB0byBoaXN0b3J5LnB1c2guXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBQVVNIID0gJ1BVU0gnO1xuXG5leHBvcnRzLlBVU0ggPSBQVVNIO1xuLyoqXG4gKiBJbmRpY2F0ZXMgdGhhdCBuYXZpZ2F0aW9uIHdhcyBjYXVzZWQgYnkgYSBjYWxsIHRvIGhpc3RvcnkucmVwbGFjZS5cbiAqL1xudmFyIFJFUExBQ0UgPSAnUkVQTEFDRSc7XG5cbmV4cG9ydHMuUkVQTEFDRSA9IFJFUExBQ0U7XG4vKipcbiAqIEluZGljYXRlcyB0aGF0IG5hdmlnYXRpb24gd2FzIGNhdXNlZCBieSBzb21lIG90aGVyIGFjdGlvbiBzdWNoXG4gKiBhcyB1c2luZyBhIGJyb3dzZXIncyBiYWNrL2ZvcndhcmQgYnV0dG9ucyBhbmQvb3IgbWFudWFsbHkgbWFuaXB1bGF0aW5nXG4gKiB0aGUgVVJMIGluIGEgYnJvd3NlcidzIGxvY2F0aW9uIGJhci4gVGhpcyBpcyB0aGUgZGVmYXVsdC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvd0V2ZW50SGFuZGxlcnMvb25wb3BzdGF0ZVxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKi9cbnZhciBQT1AgPSAnUE9QJztcblxuZXhwb3J0cy5QT1AgPSBQT1A7XG5leHBvcnRzWydkZWZhdWx0J10gPSB7XG4gIFBVU0g6IFBVU0gsXG4gIFJFUExBQ0U6IFJFUExBQ0UsXG4gIFBPUDogUE9QXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9oaXN0b3J5L2xpYi9BY3Rpb25zLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMjdcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgY2FuVXNlRE9NID0gISEodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50ICYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbmV4cG9ydHMuY2FuVXNlRE9NID0gY2FuVXNlRE9NO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9oaXN0b3J5L2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDI3XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5hZGRFdmVudExpc3RlbmVyID0gYWRkRXZlbnRMaXN0ZW5lcjtcbmV4cG9ydHMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHJlbW92ZUV2ZW50TGlzdGVuZXI7XG5leHBvcnRzLmdldEhhc2hQYXRoID0gZ2V0SGFzaFBhdGg7XG5leHBvcnRzLnJlcGxhY2VIYXNoUGF0aCA9IHJlcGxhY2VIYXNoUGF0aDtcbmV4cG9ydHMuZ2V0V2luZG93UGF0aCA9IGdldFdpbmRvd1BhdGg7XG5leHBvcnRzLmdvID0gZ287XG5leHBvcnRzLmdldFVzZXJDb25maXJtYXRpb24gPSBnZXRVc2VyQ29uZmlybWF0aW9uO1xuZXhwb3J0cy5zdXBwb3J0c0hpc3RvcnkgPSBzdXBwb3J0c0hpc3Rvcnk7XG5leHBvcnRzLnN1cHBvcnRzR29XaXRob3V0UmVsb2FkVXNpbmdIYXNoID0gc3VwcG9ydHNHb1dpdGhvdXRSZWxvYWRVc2luZ0hhc2g7XG5cbmZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIobm9kZSwgZXZlbnQsIGxpc3RlbmVyKSB7XG4gIGlmIChub2RlLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyLCBmYWxzZSk7XG4gIH0gZWxzZSB7XG4gICAgbm9kZS5hdHRhY2hFdmVudCgnb24nICsgZXZlbnQsIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVyKG5vZGUsIGV2ZW50LCBsaXN0ZW5lcikge1xuICBpZiAobm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lciwgZmFsc2UpO1xuICB9IGVsc2Uge1xuICAgIG5vZGUuZGV0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBsaXN0ZW5lcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0SGFzaFBhdGgoKSB7XG4gIC8vIFdlIGNhbid0IHVzZSB3aW5kb3cubG9jYXRpb24uaGFzaCBoZXJlIGJlY2F1c2UgaXQncyBub3RcbiAgLy8gY29uc2lzdGVudCBhY3Jvc3MgYnJvd3NlcnMgLSBGaXJlZm94IHdpbGwgcHJlLWRlY29kZSBpdCFcbiAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCcjJylbMV0gfHwgJyc7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VIYXNoUGF0aChwYXRoKSB7XG4gIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggKyAnIycgKyBwYXRoKTtcbn1cblxuZnVuY3Rpb24gZ2V0V2luZG93UGF0aCgpIHtcbiAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggKyB3aW5kb3cubG9jYXRpb24uaGFzaDtcbn1cblxuZnVuY3Rpb24gZ28obikge1xuICBpZiAobikgd2luZG93Lmhpc3RvcnkuZ28obik7XG59XG5cbmZ1bmN0aW9uIGdldFVzZXJDb25maXJtYXRpb24obWVzc2FnZSwgY2FsbGJhY2spIHtcbiAgY2FsbGJhY2sod2luZG93LmNvbmZpcm0obWVzc2FnZSkpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgSFRNTDUgaGlzdG9yeSBBUEkgaXMgc3VwcG9ydGVkLiBUYWtlbiBmcm9tIE1vZGVybml6ci5cbiAqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvaGlzdG9yeS5qc1xuICogY2hhbmdlZCB0byBhdm9pZCBmYWxzZSBuZWdhdGl2ZXMgZm9yIFdpbmRvd3MgUGhvbmVzOiBodHRwczovL2dpdGh1Yi5jb20vcmFja3QvcmVhY3Qtcm91dGVyL2lzc3Vlcy81ODZcbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0hpc3RvcnkoKSB7XG4gIHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gIGlmICgodWEuaW5kZXhPZignQW5kcm9pZCAyLicpICE9PSAtMSB8fCB1YS5pbmRleE9mKCdBbmRyb2lkIDQuMCcpICE9PSAtMSkgJiYgdWEuaW5kZXhPZignTW9iaWxlIFNhZmFyaScpICE9PSAtMSAmJiB1YS5pbmRleE9mKCdDaHJvbWUnKSA9PT0gLTEgJiYgdWEuaW5kZXhPZignV2luZG93cyBQaG9uZScpID09PSAtMSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBGSVhNRTogV29yayBhcm91bmQgb3VyIGJyb3dzZXIgaGlzdG9yeSBub3Qgd29ya2luZyBjb3JyZWN0bHkgb24gQ2hyb21lXG4gIC8vIGlPUzogaHR0cHM6Ly9naXRodWIuY29tL3JhY2t0L3JlYWN0LXJvdXRlci9pc3N1ZXMvMjU2NVxuICBpZiAodWEuaW5kZXhPZignQ3JpT1MnKSAhPT0gLTEpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHdpbmRvdy5oaXN0b3J5ICYmICdwdXNoU3RhdGUnIGluIHdpbmRvdy5oaXN0b3J5O1xufVxuXG4vKipcbiAqIFJldHVybnMgZmFsc2UgaWYgdXNpbmcgZ28obikgd2l0aCBoYXNoIGhpc3RvcnkgY2F1c2VzIGEgZnVsbCBwYWdlIHJlbG9hZC5cbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0dvV2l0aG91dFJlbG9hZFVzaW5nSGFzaCgpIHtcbiAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgcmV0dXJuIHVhLmluZGV4T2YoJ0ZpcmVmb3gnKSA9PT0gLTE7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2hpc3RvcnkvbGliL0RPTVV0aWxzLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMjdcbiAqKi8iLCIvKmVzbGludC1kaXNhYmxlIG5vLWVtcHR5ICovXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLnNhdmVTdGF0ZSA9IHNhdmVTdGF0ZTtcbmV4cG9ydHMucmVhZFN0YXRlID0gcmVhZFN0YXRlO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJ3dhcm5pbmcnKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG52YXIgS2V5UHJlZml4ID0gJ0BASGlzdG9yeS8nO1xudmFyIFF1b3RhRXhjZWVkZWRFcnJvciA9ICdRdW90YUV4Y2VlZGVkRXJyb3InO1xudmFyIFNlY3VyaXR5RXJyb3IgPSAnU2VjdXJpdHlFcnJvcic7XG5cbmZ1bmN0aW9uIGNyZWF0ZUtleShrZXkpIHtcbiAgcmV0dXJuIEtleVByZWZpeCArIGtleTtcbn1cblxuZnVuY3Rpb24gc2F2ZVN0YXRlKGtleSwgc3RhdGUpIHtcbiAgdHJ5IHtcbiAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShjcmVhdGVLZXkoa2V5KSwgSlNPTi5zdHJpbmdpZnkoc3RhdGUpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoZXJyb3IubmFtZSA9PT0gU2VjdXJpdHlFcnJvcikge1xuICAgICAgLy8gQmxvY2tpbmcgY29va2llcyBpbiBDaHJvbWUvRmlyZWZveC9TYWZhcmkgdGhyb3dzIFNlY3VyaXR5RXJyb3Igb24gYW55XG4gICAgICAvLyBhdHRlbXB0IHRvIGFjY2VzcyB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuXG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX3dhcm5pbmcyWydkZWZhdWx0J10oZmFsc2UsICdbaGlzdG9yeV0gVW5hYmxlIHRvIHNhdmUgc3RhdGU7IHNlc3Npb25TdG9yYWdlIGlzIG5vdCBhdmFpbGFibGUgZHVlIHRvIHNlY3VyaXR5IHNldHRpbmdzJykgOiB1bmRlZmluZWQ7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZXJyb3IubmFtZSA9PT0gUXVvdGFFeGNlZWRlZEVycm9yICYmIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIFNhZmFyaSBcInByaXZhdGUgbW9kZVwiIHRocm93cyBRdW90YUV4Y2VlZGVkRXJyb3IuXG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX3dhcm5pbmcyWydkZWZhdWx0J10oZmFsc2UsICdbaGlzdG9yeV0gVW5hYmxlIHRvIHNhdmUgc3RhdGU7IHNlc3Npb25TdG9yYWdlIGlzIG5vdCBhdmFpbGFibGUgaW4gU2FmYXJpIHByaXZhdGUgbW9kZScpIDogdW5kZWZpbmVkO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVhZFN0YXRlKGtleSkge1xuICB2YXIganNvbiA9IHVuZGVmaW5lZDtcbiAgdHJ5IHtcbiAgICBqc29uID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oY3JlYXRlS2V5KGtleSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmIChlcnJvci5uYW1lID09PSBTZWN1cml0eUVycm9yKSB7XG4gICAgICAvLyBCbG9ja2luZyBjb29raWVzIGluIENocm9tZS9GaXJlZm94L1NhZmFyaSB0aHJvd3MgU2VjdXJpdHlFcnJvciBvbiBhbnlcbiAgICAgIC8vIGF0dGVtcHQgdG8gYWNjZXNzIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfd2FybmluZzJbJ2RlZmF1bHQnXShmYWxzZSwgJ1toaXN0b3J5XSBVbmFibGUgdG8gcmVhZCBzdGF0ZTsgc2Vzc2lvblN0b3JhZ2UgaXMgbm90IGF2YWlsYWJsZSBkdWUgdG8gc2VjdXJpdHkgc2V0dGluZ3MnKSA6IHVuZGVmaW5lZDtcblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgaWYgKGpzb24pIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoanNvbik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIElnbm9yZSBpbnZhbGlkIEpTT04uXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2hpc3RvcnkvbGliL0RPTVN0YXRlU3RvcmFnZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDI3XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfaW52YXJpYW50ID0gcmVxdWlyZSgnaW52YXJpYW50Jyk7XG5cbnZhciBfaW52YXJpYW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ludmFyaWFudCk7XG5cbnZhciBfRXhlY3V0aW9uRW52aXJvbm1lbnQgPSByZXF1aXJlKCcuL0V4ZWN1dGlvbkVudmlyb25tZW50Jyk7XG5cbnZhciBfRE9NVXRpbHMgPSByZXF1aXJlKCcuL0RPTVV0aWxzJyk7XG5cbnZhciBfY3JlYXRlSGlzdG9yeSA9IHJlcXVpcmUoJy4vY3JlYXRlSGlzdG9yeScpO1xuXG52YXIgX2NyZWF0ZUhpc3RvcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlSGlzdG9yeSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZURPTUhpc3Rvcnkob3B0aW9ucykge1xuICB2YXIgaGlzdG9yeSA9IF9jcmVhdGVIaXN0b3J5MlsnZGVmYXVsdCddKF9leHRlbmRzKHtcbiAgICBnZXRVc2VyQ29uZmlybWF0aW9uOiBfRE9NVXRpbHMuZ2V0VXNlckNvbmZpcm1hdGlvblxuICB9LCBvcHRpb25zLCB7XG4gICAgZ286IF9ET01VdGlscy5nb1xuICB9KSk7XG5cbiAgZnVuY3Rpb24gbGlzdGVuKGxpc3RlbmVyKSB7XG4gICAgIV9FeGVjdXRpb25FbnZpcm9ubWVudC5jYW5Vc2VET00gPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX2ludmFyaWFudDJbJ2RlZmF1bHQnXShmYWxzZSwgJ0RPTSBoaXN0b3J5IG5lZWRzIGEgRE9NJykgOiBfaW52YXJpYW50MlsnZGVmYXVsdCddKGZhbHNlKSA6IHVuZGVmaW5lZDtcblxuICAgIHJldHVybiBoaXN0b3J5Lmxpc3RlbihsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gX2V4dGVuZHMoe30sIGhpc3RvcnksIHtcbiAgICBsaXN0ZW46IGxpc3RlblxuICB9KTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gY3JlYXRlRE9NSGlzdG9yeTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9oaXN0b3J5L2xpYi9jcmVhdGVET01IaXN0b3J5LmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMjdcbiAqKi8iLCIvL2ltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9kZWVwRXF1YWwgPSByZXF1aXJlKCdkZWVwLWVxdWFsJyk7XG5cbnZhciBfZGVlcEVxdWFsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZXBFcXVhbCk7XG5cbnZhciBfQXN5bmNVdGlscyA9IHJlcXVpcmUoJy4vQXN5bmNVdGlscycpO1xuXG52YXIgX0FjdGlvbnMgPSByZXF1aXJlKCcuL0FjdGlvbnMnKTtcblxudmFyIF9jcmVhdGVMb2NhdGlvbjIgPSByZXF1aXJlKCcuL2NyZWF0ZUxvY2F0aW9uJyk7XG5cbnZhciBfY3JlYXRlTG9jYXRpb24zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlTG9jYXRpb24yKTtcblxudmFyIF9ydW5UcmFuc2l0aW9uSG9vayA9IHJlcXVpcmUoJy4vcnVuVHJhbnNpdGlvbkhvb2snKTtcblxudmFyIF9ydW5UcmFuc2l0aW9uSG9vazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ydW5UcmFuc2l0aW9uSG9vayk7XG5cbnZhciBfcGFyc2VQYXRoID0gcmVxdWlyZSgnLi9wYXJzZVBhdGgnKTtcblxudmFyIF9wYXJzZVBhdGgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGFyc2VQYXRoKTtcblxudmFyIF9kZXByZWNhdGUgPSByZXF1aXJlKCcuL2RlcHJlY2F0ZScpO1xuXG52YXIgX2RlcHJlY2F0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZXByZWNhdGUpO1xuXG5mdW5jdGlvbiBjcmVhdGVSYW5kb21LZXkobGVuZ3RoKSB7XG4gIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgbGVuZ3RoKTtcbn1cblxuZnVuY3Rpb24gbG9jYXRpb25zQXJlRXF1YWwoYSwgYikge1xuICByZXR1cm4gYS5wYXRobmFtZSA9PT0gYi5wYXRobmFtZSAmJiBhLnNlYXJjaCA9PT0gYi5zZWFyY2ggJiZcbiAgLy9hLmFjdGlvbiA9PT0gYi5hY3Rpb24gJiYgLy8gRGlmZmVyZW50IGFjdGlvbiAhPT0gbG9jYXRpb24gY2hhbmdlLlxuICBhLmtleSA9PT0gYi5rZXkgJiYgX2RlZXBFcXVhbDJbJ2RlZmF1bHQnXShhLnN0YXRlLCBiLnN0YXRlKTtcbn1cblxudmFyIERlZmF1bHRLZXlMZW5ndGggPSA2O1xuXG5mdW5jdGlvbiBjcmVhdGVIaXN0b3J5KCkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuICB2YXIgZ2V0Q3VycmVudExvY2F0aW9uID0gb3B0aW9ucy5nZXRDdXJyZW50TG9jYXRpb247XG4gIHZhciBmaW5pc2hUcmFuc2l0aW9uID0gb3B0aW9ucy5maW5pc2hUcmFuc2l0aW9uO1xuICB2YXIgc2F2ZVN0YXRlID0gb3B0aW9ucy5zYXZlU3RhdGU7XG4gIHZhciBnbyA9IG9wdGlvbnMuZ287XG4gIHZhciBrZXlMZW5ndGggPSBvcHRpb25zLmtleUxlbmd0aDtcbiAgdmFyIGdldFVzZXJDb25maXJtYXRpb24gPSBvcHRpb25zLmdldFVzZXJDb25maXJtYXRpb247XG5cbiAgaWYgKHR5cGVvZiBrZXlMZW5ndGggIT09ICdudW1iZXInKSBrZXlMZW5ndGggPSBEZWZhdWx0S2V5TGVuZ3RoO1xuXG4gIHZhciB0cmFuc2l0aW9uSG9va3MgPSBbXTtcblxuICBmdW5jdGlvbiBsaXN0ZW5CZWZvcmUoaG9vaykge1xuICAgIHRyYW5zaXRpb25Ib29rcy5wdXNoKGhvb2spO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRyYW5zaXRpb25Ib29rcyA9IHRyYW5zaXRpb25Ib29rcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0gIT09IGhvb2s7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGFsbEtleXMgPSBbXTtcbiAgdmFyIGNoYW5nZUxpc3RlbmVycyA9IFtdO1xuICB2YXIgbG9jYXRpb24gPSB1bmRlZmluZWQ7XG5cbiAgZnVuY3Rpb24gZ2V0Q3VycmVudCgpIHtcbiAgICBpZiAocGVuZGluZ0xvY2F0aW9uICYmIHBlbmRpbmdMb2NhdGlvbi5hY3Rpb24gPT09IF9BY3Rpb25zLlBPUCkge1xuICAgICAgcmV0dXJuIGFsbEtleXMuaW5kZXhPZihwZW5kaW5nTG9jYXRpb24ua2V5KTtcbiAgICB9IGVsc2UgaWYgKGxvY2F0aW9uKSB7XG4gICAgICByZXR1cm4gYWxsS2V5cy5pbmRleE9mKGxvY2F0aW9uLmtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVMb2NhdGlvbihuZXdMb2NhdGlvbikge1xuICAgIHZhciBjdXJyZW50ID0gZ2V0Q3VycmVudCgpO1xuXG4gICAgbG9jYXRpb24gPSBuZXdMb2NhdGlvbjtcblxuICAgIGlmIChsb2NhdGlvbi5hY3Rpb24gPT09IF9BY3Rpb25zLlBVU0gpIHtcbiAgICAgIGFsbEtleXMgPSBbXS5jb25jYXQoYWxsS2V5cy5zbGljZSgwLCBjdXJyZW50ICsgMSksIFtsb2NhdGlvbi5rZXldKTtcbiAgICB9IGVsc2UgaWYgKGxvY2F0aW9uLmFjdGlvbiA9PT0gX0FjdGlvbnMuUkVQTEFDRSkge1xuICAgICAgYWxsS2V5c1tjdXJyZW50XSA9IGxvY2F0aW9uLmtleTtcbiAgICB9XG5cbiAgICBjaGFuZ2VMaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgIGxpc3RlbmVyKGxvY2F0aW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgIGNoYW5nZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblxuICAgIGlmIChsb2NhdGlvbikge1xuICAgICAgbGlzdGVuZXIobG9jYXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgX2xvY2F0aW9uID0gZ2V0Q3VycmVudExvY2F0aW9uKCk7XG4gICAgICBhbGxLZXlzID0gW19sb2NhdGlvbi5rZXldO1xuICAgICAgdXBkYXRlTG9jYXRpb24oX2xvY2F0aW9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgY2hhbmdlTGlzdGVuZXJzID0gY2hhbmdlTGlzdGVuZXJzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gaXRlbSAhPT0gbGlzdGVuZXI7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgY2FsbGJhY2spIHtcbiAgICBfQXN5bmNVdGlscy5sb29wQXN5bmModHJhbnNpdGlvbkhvb2tzLmxlbmd0aCwgZnVuY3Rpb24gKGluZGV4LCBuZXh0LCBkb25lKSB7XG4gICAgICBfcnVuVHJhbnNpdGlvbkhvb2syWydkZWZhdWx0J10odHJhbnNpdGlvbkhvb2tzW2luZGV4XSwgbG9jYXRpb24sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICAgICAgZG9uZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgIGlmIChnZXRVc2VyQ29uZmlybWF0aW9uICYmIHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgICBnZXRVc2VyQ29uZmlybWF0aW9uKG1lc3NhZ2UsIGZ1bmN0aW9uIChvaykge1xuICAgICAgICAgIGNhbGxiYWNrKG9rICE9PSBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2sobWVzc2FnZSAhPT0gZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdmFyIHBlbmRpbmdMb2NhdGlvbiA9IHVuZGVmaW5lZDtcblxuICBmdW5jdGlvbiB0cmFuc2l0aW9uVG8obmV4dExvY2F0aW9uKSB7XG4gICAgaWYgKGxvY2F0aW9uICYmIGxvY2F0aW9uc0FyZUVxdWFsKGxvY2F0aW9uLCBuZXh0TG9jYXRpb24pKSByZXR1cm47IC8vIE5vdGhpbmcgdG8gZG8uXG5cbiAgICBwZW5kaW5nTG9jYXRpb24gPSBuZXh0TG9jYXRpb247XG5cbiAgICBjb25maXJtVHJhbnNpdGlvblRvKG5leHRMb2NhdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAocGVuZGluZ0xvY2F0aW9uICE9PSBuZXh0TG9jYXRpb24pIHJldHVybjsgLy8gVHJhbnNpdGlvbiB3YXMgaW50ZXJydXB0ZWQuXG5cbiAgICAgIGlmIChvaykge1xuICAgICAgICAvLyB0cmVhdCBQVVNIIHRvIGN1cnJlbnQgcGF0aCBsaWtlIFJFUExBQ0UgdG8gYmUgY29uc2lzdGVudCB3aXRoIGJyb3dzZXJzXG4gICAgICAgIGlmIChuZXh0TG9jYXRpb24uYWN0aW9uID09PSBfQWN0aW9ucy5QVVNIKSB7XG4gICAgICAgICAgdmFyIHByZXZQYXRoID0gY3JlYXRlUGF0aChsb2NhdGlvbik7XG4gICAgICAgICAgdmFyIG5leHRQYXRoID0gY3JlYXRlUGF0aChuZXh0TG9jYXRpb24pO1xuXG4gICAgICAgICAgaWYgKG5leHRQYXRoID09PSBwcmV2UGF0aCkgbmV4dExvY2F0aW9uLmFjdGlvbiA9IF9BY3Rpb25zLlJFUExBQ0U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmluaXNoVHJhbnNpdGlvbihuZXh0TG9jYXRpb24pICE9PSBmYWxzZSkgdXBkYXRlTG9jYXRpb24obmV4dExvY2F0aW9uKTtcbiAgICAgIH0gZWxzZSBpZiAobG9jYXRpb24gJiYgbmV4dExvY2F0aW9uLmFjdGlvbiA9PT0gX0FjdGlvbnMuUE9QKSB7XG4gICAgICAgIHZhciBwcmV2SW5kZXggPSBhbGxLZXlzLmluZGV4T2YobG9jYXRpb24ua2V5KTtcbiAgICAgICAgdmFyIG5leHRJbmRleCA9IGFsbEtleXMuaW5kZXhPZihuZXh0TG9jYXRpb24ua2V5KTtcblxuICAgICAgICBpZiAocHJldkluZGV4ICE9PSAtMSAmJiBuZXh0SW5kZXggIT09IC0xKSBnbyhwcmV2SW5kZXggLSBuZXh0SW5kZXgpOyAvLyBSZXN0b3JlIHRoZSBVUkwuXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwdXNoKGxvY2F0aW9uKSB7XG4gICAgdHJhbnNpdGlvblRvKGNyZWF0ZUxvY2F0aW9uKGxvY2F0aW9uLCBfQWN0aW9ucy5QVVNILCBjcmVhdGVLZXkoKSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZShsb2NhdGlvbikge1xuICAgIHRyYW5zaXRpb25UbyhjcmVhdGVMb2NhdGlvbihsb2NhdGlvbiwgX0FjdGlvbnMuUkVQTEFDRSwgY3JlYXRlS2V5KCkpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvQmFjaygpIHtcbiAgICBnbygtMSk7XG4gIH1cblxuICBmdW5jdGlvbiBnb0ZvcndhcmQoKSB7XG4gICAgZ28oMSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVLZXkoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZVJhbmRvbUtleShrZXlMZW5ndGgpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUGF0aChsb2NhdGlvbikge1xuICAgIGlmIChsb2NhdGlvbiA9PSBudWxsIHx8IHR5cGVvZiBsb2NhdGlvbiA9PT0gJ3N0cmluZycpIHJldHVybiBsb2NhdGlvbjtcblxuICAgIHZhciBwYXRobmFtZSA9IGxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIHZhciBzZWFyY2ggPSBsb2NhdGlvbi5zZWFyY2g7XG4gICAgdmFyIGhhc2ggPSBsb2NhdGlvbi5oYXNoO1xuXG4gICAgdmFyIHJlc3VsdCA9IHBhdGhuYW1lO1xuXG4gICAgaWYgKHNlYXJjaCkgcmVzdWx0ICs9IHNlYXJjaDtcblxuICAgIGlmIChoYXNoKSByZXN1bHQgKz0gaGFzaDtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVIcmVmKGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIGNyZWF0ZVBhdGgobG9jYXRpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlTG9jYXRpb24obG9jYXRpb24sIGFjdGlvbikge1xuICAgIHZhciBrZXkgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyBjcmVhdGVLZXkoKSA6IGFyZ3VtZW50c1syXTtcblxuICAgIGlmICh0eXBlb2YgYWN0aW9uID09PSAnb2JqZWN0Jykge1xuICAgICAgLy93YXJuaW5nKFxuICAgICAgLy8gIGZhbHNlLFxuICAgICAgLy8gICdUaGUgc3RhdGUgKDJuZCkgYXJndW1lbnQgdG8gaGlzdG9yeS5jcmVhdGVMb2NhdGlvbiBpcyBkZXByZWNhdGVkOyB1c2UgYSAnICtcbiAgICAgIC8vICAnbG9jYXRpb24gZGVzY3JpcHRvciBpbnN0ZWFkJ1xuICAgICAgLy8pXG5cbiAgICAgIGlmICh0eXBlb2YgbG9jYXRpb24gPT09ICdzdHJpbmcnKSBsb2NhdGlvbiA9IF9wYXJzZVBhdGgyWydkZWZhdWx0J10obG9jYXRpb24pO1xuXG4gICAgICBsb2NhdGlvbiA9IF9leHRlbmRzKHt9LCBsb2NhdGlvbiwgeyBzdGF0ZTogYWN0aW9uIH0pO1xuXG4gICAgICBhY3Rpb24gPSBrZXk7XG4gICAgICBrZXkgPSBhcmd1bWVudHNbM10gfHwgY3JlYXRlS2V5KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9jcmVhdGVMb2NhdGlvbjNbJ2RlZmF1bHQnXShsb2NhdGlvbiwgYWN0aW9uLCBrZXkpO1xuICB9XG5cbiAgLy8gZGVwcmVjYXRlZFxuICBmdW5jdGlvbiBzZXRTdGF0ZShzdGF0ZSkge1xuICAgIGlmIChsb2NhdGlvbikge1xuICAgICAgdXBkYXRlTG9jYXRpb25TdGF0ZShsb2NhdGlvbiwgc3RhdGUpO1xuICAgICAgdXBkYXRlTG9jYXRpb24obG9jYXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cGRhdGVMb2NhdGlvblN0YXRlKGdldEN1cnJlbnRMb2NhdGlvbigpLCBzdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTG9jYXRpb25TdGF0ZShsb2NhdGlvbiwgc3RhdGUpIHtcbiAgICBsb2NhdGlvbi5zdGF0ZSA9IF9leHRlbmRzKHt9LCBsb2NhdGlvbi5zdGF0ZSwgc3RhdGUpO1xuICAgIHNhdmVTdGF0ZShsb2NhdGlvbi5rZXksIGxvY2F0aW9uLnN0YXRlKTtcbiAgfVxuXG4gIC8vIGRlcHJlY2F0ZWRcbiAgZnVuY3Rpb24gcmVnaXN0ZXJUcmFuc2l0aW9uSG9vayhob29rKSB7XG4gICAgaWYgKHRyYW5zaXRpb25Ib29rcy5pbmRleE9mKGhvb2spID09PSAtMSkgdHJhbnNpdGlvbkhvb2tzLnB1c2goaG9vayk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHVucmVnaXN0ZXJUcmFuc2l0aW9uSG9vayhob29rKSB7XG4gICAgdHJhbnNpdGlvbkhvb2tzID0gdHJhbnNpdGlvbkhvb2tzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIGl0ZW0gIT09IGhvb2s7XG4gICAgfSk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHB1c2hTdGF0ZShzdGF0ZSwgcGF0aCkge1xuICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHBhdGggPSBfcGFyc2VQYXRoMlsnZGVmYXVsdCddKHBhdGgpO1xuXG4gICAgcHVzaChfZXh0ZW5kcyh7IHN0YXRlOiBzdGF0ZSB9LCBwYXRoKSk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHJlcGxhY2VTdGF0ZShzdGF0ZSwgcGF0aCkge1xuICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHBhdGggPSBfcGFyc2VQYXRoMlsnZGVmYXVsdCddKHBhdGgpO1xuXG4gICAgcmVwbGFjZShfZXh0ZW5kcyh7IHN0YXRlOiBzdGF0ZSB9LCBwYXRoKSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGxpc3RlbkJlZm9yZTogbGlzdGVuQmVmb3JlLFxuICAgIGxpc3RlbjogbGlzdGVuLFxuICAgIHRyYW5zaXRpb25UbzogdHJhbnNpdGlvblRvLFxuICAgIHB1c2g6IHB1c2gsXG4gICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICBnbzogZ28sXG4gICAgZ29CYWNrOiBnb0JhY2ssXG4gICAgZ29Gb3J3YXJkOiBnb0ZvcndhcmQsXG4gICAgY3JlYXRlS2V5OiBjcmVhdGVLZXksXG4gICAgY3JlYXRlUGF0aDogY3JlYXRlUGF0aCxcbiAgICBjcmVhdGVIcmVmOiBjcmVhdGVIcmVmLFxuICAgIGNyZWF0ZUxvY2F0aW9uOiBjcmVhdGVMb2NhdGlvbixcblxuICAgIHNldFN0YXRlOiBfZGVwcmVjYXRlMlsnZGVmYXVsdCddKHNldFN0YXRlLCAnc2V0U3RhdGUgaXMgZGVwcmVjYXRlZDsgdXNlIGxvY2F0aW9uLmtleSB0byBzYXZlIHN0YXRlIGluc3RlYWQnKSxcbiAgICByZWdpc3RlclRyYW5zaXRpb25Ib29rOiBfZGVwcmVjYXRlMlsnZGVmYXVsdCddKHJlZ2lzdGVyVHJhbnNpdGlvbkhvb2ssICdyZWdpc3RlclRyYW5zaXRpb25Ib29rIGlzIGRlcHJlY2F0ZWQ7IHVzZSBsaXN0ZW5CZWZvcmUgaW5zdGVhZCcpLFxuICAgIHVucmVnaXN0ZXJUcmFuc2l0aW9uSG9vazogX2RlcHJlY2F0ZTJbJ2RlZmF1bHQnXSh1bnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2ssICd1bnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2sgaXMgZGVwcmVjYXRlZDsgdXNlIHRoZSBjYWxsYmFjayByZXR1cm5lZCBmcm9tIGxpc3RlbkJlZm9yZSBpbnN0ZWFkJyksXG4gICAgcHVzaFN0YXRlOiBfZGVwcmVjYXRlMlsnZGVmYXVsdCddKHB1c2hTdGF0ZSwgJ3B1c2hTdGF0ZSBpcyBkZXByZWNhdGVkOyB1c2UgcHVzaCBpbnN0ZWFkJyksXG4gICAgcmVwbGFjZVN0YXRlOiBfZGVwcmVjYXRlMlsnZGVmYXVsdCddKHJlcGxhY2VTdGF0ZSwgJ3JlcGxhY2VTdGF0ZSBpcyBkZXByZWNhdGVkOyB1c2UgcmVwbGFjZSBpbnN0ZWFkJylcbiAgfTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gY3JlYXRlSGlzdG9yeTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9oaXN0b3J5L2xpYi9jcmVhdGVIaXN0b3J5LmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMjdcbiAqKi8iLCJ2YXIgcFNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuL2xpYi9rZXlzLmpzJyk7XG52YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL2xpYi9pc19hcmd1bWVudHMuanMnKTtcblxudmFyIGRlZXBFcXVhbCA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFjdHVhbCwgZXhwZWN0ZWQsIG9wdHMpIHtcbiAgaWYgKCFvcHRzKSBvcHRzID0ge307XG4gIC8vIDcuMS4gQWxsIGlkZW50aWNhbCB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGFzIGRldGVybWluZWQgYnkgPT09LlxuICBpZiAoYWN0dWFsID09PSBleHBlY3RlZCkge1xuICAgIHJldHVybiB0cnVlO1xuXG4gIH0gZWxzZSBpZiAoYWN0dWFsIGluc3RhbmNlb2YgRGF0ZSAmJiBleHBlY3RlZCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICByZXR1cm4gYWN0dWFsLmdldFRpbWUoKSA9PT0gZXhwZWN0ZWQuZ2V0VGltZSgpO1xuXG4gIC8vIDcuMy4gT3RoZXIgcGFpcnMgdGhhdCBkbyBub3QgYm90aCBwYXNzIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JyxcbiAgLy8gZXF1aXZhbGVuY2UgaXMgZGV0ZXJtaW5lZCBieSA9PS5cbiAgfSBlbHNlIGlmICghYWN0dWFsIHx8ICFleHBlY3RlZCB8fCB0eXBlb2YgYWN0dWFsICE9ICdvYmplY3QnICYmIHR5cGVvZiBleHBlY3RlZCAhPSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBvcHRzLnN0cmljdCA/IGFjdHVhbCA9PT0gZXhwZWN0ZWQgOiBhY3R1YWwgPT0gZXhwZWN0ZWQ7XG5cbiAgLy8gNy40LiBGb3IgYWxsIG90aGVyIE9iamVjdCBwYWlycywgaW5jbHVkaW5nIEFycmF5IG9iamVjdHMsIGVxdWl2YWxlbmNlIGlzXG4gIC8vIGRldGVybWluZWQgYnkgaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChhcyB2ZXJpZmllZFxuICAvLyB3aXRoIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCksIHRoZSBzYW1lIHNldCBvZiBrZXlzXG4gIC8vIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLCBlcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnlcbiAgLy8gY29ycmVzcG9uZGluZyBrZXksIGFuZCBhbiBpZGVudGljYWwgJ3Byb3RvdHlwZScgcHJvcGVydHkuIE5vdGU6IHRoaXNcbiAgLy8gYWNjb3VudHMgZm9yIGJvdGggbmFtZWQgYW5kIGluZGV4ZWQgcHJvcGVydGllcyBvbiBBcnJheXMuXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9iakVxdWl2KGFjdHVhbCwgZXhwZWN0ZWQsIG9wdHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkT3JOdWxsKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAoeCkge1xuICBpZiAoIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnIHx8IHR5cGVvZiB4Lmxlbmd0aCAhPT0gJ251bWJlcicpIHJldHVybiBmYWxzZTtcbiAgaWYgKHR5cGVvZiB4LmNvcHkgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIHguc2xpY2UgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHgubGVuZ3RoID4gMCAmJiB0eXBlb2YgeFswXSAhPT0gJ251bWJlcicpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIG9iakVxdWl2KGEsIGIsIG9wdHMpIHtcbiAgdmFyIGksIGtleTtcbiAgaWYgKGlzVW5kZWZpbmVkT3JOdWxsKGEpIHx8IGlzVW5kZWZpbmVkT3JOdWxsKGIpKVxuICAgIHJldHVybiBmYWxzZTtcbiAgLy8gYW4gaWRlbnRpY2FsICdwcm90b3R5cGUnIHByb3BlcnR5LlxuICBpZiAoYS5wcm90b3R5cGUgIT09IGIucHJvdG90eXBlKSByZXR1cm4gZmFsc2U7XG4gIC8vfn5+SSd2ZSBtYW5hZ2VkIHRvIGJyZWFrIE9iamVjdC5rZXlzIHRocm91Z2ggc2NyZXd5IGFyZ3VtZW50cyBwYXNzaW5nLlxuICAvLyAgIENvbnZlcnRpbmcgdG8gYXJyYXkgc29sdmVzIHRoZSBwcm9ibGVtLlxuICBpZiAoaXNBcmd1bWVudHMoYSkpIHtcbiAgICBpZiAoIWlzQXJndW1lbnRzKGIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGEgPSBwU2xpY2UuY2FsbChhKTtcbiAgICBiID0gcFNsaWNlLmNhbGwoYik7XG4gICAgcmV0dXJuIGRlZXBFcXVhbChhLCBiLCBvcHRzKTtcbiAgfVxuICBpZiAoaXNCdWZmZXIoYSkpIHtcbiAgICBpZiAoIWlzQnVmZmVyKGIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFbaV0gIT09IGJbaV0pIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdHJ5IHtcbiAgICB2YXIga2EgPSBvYmplY3RLZXlzKGEpLFxuICAgICAgICBrYiA9IG9iamVjdEtleXMoYik7XG4gIH0gY2F0Y2ggKGUpIHsvL2hhcHBlbnMgd2hlbiBvbmUgaXMgYSBzdHJpbmcgbGl0ZXJhbCBhbmQgdGhlIG90aGVyIGlzbid0XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoa2V5cyBpbmNvcnBvcmF0ZXNcbiAgLy8gaGFzT3duUHJvcGVydHkpXG4gIGlmIChrYS5sZW5ndGggIT0ga2IubGVuZ3RoKVxuICAgIHJldHVybiBmYWxzZTtcbiAgLy90aGUgc2FtZSBzZXQgb2Yga2V5cyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKSxcbiAga2Euc29ydCgpO1xuICBrYi5zb3J0KCk7XG4gIC8vfn5+Y2hlYXAga2V5IHRlc3RcbiAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoa2FbaV0gIT0ga2JbaV0pXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy9lcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnkgY29ycmVzcG9uZGluZyBrZXksIGFuZFxuICAvL35+fnBvc3NpYmx5IGV4cGVuc2l2ZSBkZWVwIHRlc3RcbiAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBrZXkgPSBrYVtpXTtcbiAgICBpZiAoIWRlZXBFcXVhbChhW2tleV0sIGJba2V5XSwgb3B0cykpIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHlwZW9mIGEgPT09IHR5cGVvZiBiO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2hpc3Rvcnkvfi9kZWVwLWVxdWFsL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMjdcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgT2JqZWN0LmtleXMgPT09ICdmdW5jdGlvbidcbiAgPyBPYmplY3Qua2V5cyA6IHNoaW07XG5cbmV4cG9ydHMuc2hpbSA9IHNoaW07XG5mdW5jdGlvbiBzaGltIChvYmopIHtcbiAgdmFyIGtleXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikga2V5cy5wdXNoKGtleSk7XG4gIHJldHVybiBrZXlzO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2hpc3Rvcnkvfi9kZWVwLWVxdWFsL2xpYi9rZXlzLmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMjdcbiAqKi8iLCJ2YXIgc3VwcG9ydHNBcmd1bWVudHNDbGFzcyA9IChmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50cylcbn0pKCkgPT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHN1cHBvcnRzQXJndW1lbnRzQ2xhc3MgPyBzdXBwb3J0ZWQgOiB1bnN1cHBvcnRlZDtcblxuZXhwb3J0cy5zdXBwb3J0ZWQgPSBzdXBwb3J0ZWQ7XG5mdW5jdGlvbiBzdXBwb3J0ZWQob2JqZWN0KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PSAnW29iamVjdCBBcmd1bWVudHNdJztcbn07XG5cbmV4cG9ydHMudW5zdXBwb3J0ZWQgPSB1bnN1cHBvcnRlZDtcbmZ1bmN0aW9uIHVuc3VwcG9ydGVkKG9iamVjdCl7XG4gIHJldHVybiBvYmplY3QgJiZcbiAgICB0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnICYmXG4gICAgdHlwZW9mIG9iamVjdC5sZW5ndGggPT0gJ251bWJlcicgJiZcbiAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnY2FsbGVlJykgJiZcbiAgICAhT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKG9iamVjdCwgJ2NhbGxlZScpIHx8XG4gICAgZmFsc2U7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2hpc3Rvcnkvfi9kZWVwLWVxdWFsL2xpYi9pc19hcmd1bWVudHMuanNcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAyN1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5sb29wQXN5bmMgPSBsb29wQXN5bmM7XG5cbmZ1bmN0aW9uIGxvb3BBc3luYyh0dXJucywgd29yaywgY2FsbGJhY2spIHtcbiAgdmFyIGN1cnJlbnRUdXJuID0gMDtcbiAgdmFyIGlzRG9uZSA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgaXNEb25lID0gdHJ1ZTtcbiAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICBpZiAoaXNEb25lKSByZXR1cm47XG5cbiAgICBpZiAoY3VycmVudFR1cm4gPCB0dXJucykge1xuICAgICAgd29yay5jYWxsKHRoaXMsIGN1cnJlbnRUdXJuKyssIG5leHQsIGRvbmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb25lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgbmV4dCgpO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9oaXN0b3J5L2xpYi9Bc3luY1V0aWxzLmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMjdcbiAqKi8iLCIvL2ltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9BY3Rpb25zID0gcmVxdWlyZSgnLi9BY3Rpb25zJyk7XG5cbnZhciBfcGFyc2VQYXRoID0gcmVxdWlyZSgnLi9wYXJzZVBhdGgnKTtcblxudmFyIF9wYXJzZVBhdGgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGFyc2VQYXRoKTtcblxuZnVuY3Rpb24gY3JlYXRlTG9jYXRpb24oKSB7XG4gIHZhciBsb2NhdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/ICcvJyA6IGFyZ3VtZW50c1swXTtcbiAgdmFyIGFjdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IF9BY3Rpb25zLlBPUCA6IGFyZ3VtZW50c1sxXTtcbiAgdmFyIGtleSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IG51bGwgOiBhcmd1bWVudHNbMl07XG5cbiAgdmFyIF9mb3VydGhBcmcgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDMgfHwgYXJndW1lbnRzWzNdID09PSB1bmRlZmluZWQgPyBudWxsIDogYXJndW1lbnRzWzNdO1xuXG4gIGlmICh0eXBlb2YgbG9jYXRpb24gPT09ICdzdHJpbmcnKSBsb2NhdGlvbiA9IF9wYXJzZVBhdGgyWydkZWZhdWx0J10obG9jYXRpb24pO1xuXG4gIGlmICh0eXBlb2YgYWN0aW9uID09PSAnb2JqZWN0Jykge1xuICAgIC8vd2FybmluZyhcbiAgICAvLyAgZmFsc2UsXG4gICAgLy8gICdUaGUgc3RhdGUgKDJuZCkgYXJndW1lbnQgdG8gY3JlYXRlTG9jYXRpb24gaXMgZGVwcmVjYXRlZDsgdXNlIGEgJyArXG4gICAgLy8gICdsb2NhdGlvbiBkZXNjcmlwdG9yIGluc3RlYWQnXG4gICAgLy8pXG5cbiAgICBsb2NhdGlvbiA9IF9leHRlbmRzKHt9LCBsb2NhdGlvbiwgeyBzdGF0ZTogYWN0aW9uIH0pO1xuXG4gICAgYWN0aW9uID0ga2V5IHx8IF9BY3Rpb25zLlBPUDtcbiAgICBrZXkgPSBfZm91cnRoQXJnO1xuICB9XG5cbiAgdmFyIHBhdGhuYW1lID0gbG9jYXRpb24ucGF0aG5hbWUgfHwgJy8nO1xuICB2YXIgc2VhcmNoID0gbG9jYXRpb24uc2VhcmNoIHx8ICcnO1xuICB2YXIgaGFzaCA9IGxvY2F0aW9uLmhhc2ggfHwgJyc7XG4gIHZhciBzdGF0ZSA9IGxvY2F0aW9uLnN0YXRlIHx8IG51bGw7XG5cbiAgcmV0dXJuIHtcbiAgICBwYXRobmFtZTogcGF0aG5hbWUsXG4gICAgc2VhcmNoOiBzZWFyY2gsXG4gICAgaGFzaDogaGFzaCxcbiAgICBzdGF0ZTogc3RhdGUsXG4gICAgYWN0aW9uOiBhY3Rpb24sXG4gICAga2V5OiBrZXlcbiAgfTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gY3JlYXRlTG9jYXRpb247XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vaGlzdG9yeS9saWIvY3JlYXRlTG9jYXRpb24uanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAyN1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX3dhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5cbnZhciBfd2FybmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93YXJuaW5nKTtcblxudmFyIF9leHRyYWN0UGF0aCA9IHJlcXVpcmUoJy4vZXh0cmFjdFBhdGgnKTtcblxudmFyIF9leHRyYWN0UGF0aDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leHRyYWN0UGF0aCk7XG5cbmZ1bmN0aW9uIHBhcnNlUGF0aChwYXRoKSB7XG4gIHZhciBwYXRobmFtZSA9IF9leHRyYWN0UGF0aDJbJ2RlZmF1bHQnXShwYXRoKTtcbiAgdmFyIHNlYXJjaCA9ICcnO1xuICB2YXIgaGFzaCA9ICcnO1xuXG4gIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfd2FybmluZzJbJ2RlZmF1bHQnXShwYXRoID09PSBwYXRobmFtZSwgJ0EgcGF0aCBtdXN0IGJlIHBhdGhuYW1lICsgc2VhcmNoICsgaGFzaCBvbmx5LCBub3QgYSBmdWxseSBxdWFsaWZpZWQgVVJMIGxpa2UgXCIlc1wiJywgcGF0aCkgOiB1bmRlZmluZWQ7XG5cbiAgdmFyIGhhc2hJbmRleCA9IHBhdGhuYW1lLmluZGV4T2YoJyMnKTtcbiAgaWYgKGhhc2hJbmRleCAhPT0gLTEpIHtcbiAgICBoYXNoID0gcGF0aG5hbWUuc3Vic3RyaW5nKGhhc2hJbmRleCk7XG4gICAgcGF0aG5hbWUgPSBwYXRobmFtZS5zdWJzdHJpbmcoMCwgaGFzaEluZGV4KTtcbiAgfVxuXG4gIHZhciBzZWFyY2hJbmRleCA9IHBhdGhuYW1lLmluZGV4T2YoJz8nKTtcbiAgaWYgKHNlYXJjaEluZGV4ICE9PSAtMSkge1xuICAgIHNlYXJjaCA9IHBhdGhuYW1lLnN1YnN0cmluZyhzZWFyY2hJbmRleCk7XG4gICAgcGF0aG5hbWUgPSBwYXRobmFtZS5zdWJzdHJpbmcoMCwgc2VhcmNoSW5kZXgpO1xuICB9XG5cbiAgaWYgKHBhdGhuYW1lID09PSAnJykgcGF0aG5hbWUgPSAnLyc7XG5cbiAgcmV0dXJuIHtcbiAgICBwYXRobmFtZTogcGF0aG5hbWUsXG4gICAgc2VhcmNoOiBzZWFyY2gsXG4gICAgaGFzaDogaGFzaFxuICB9O1xufVxuXG5leHBvcnRzWydkZWZhdWx0J10gPSBwYXJzZVBhdGg7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vaGlzdG9yeS9saWIvcGFyc2VQYXRoLmpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMjdcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmZ1bmN0aW9uIGV4dHJhY3RQYXRoKHN0cmluZykge1xuICB2YXIgbWF0Y2ggPSBzdHJpbmcubWF0Y2goL15odHRwcz86XFwvXFwvW15cXC9dKi8pO1xuXG4gIGlmIChtYXRjaCA9PSBudWxsKSByZXR1cm4gc3RyaW5nO1xuXG4gIHJldHVybiBzdHJpbmcuc3Vic3RyaW5nKG1hdGNoWzBdLmxlbmd0aCk7XG59XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZXh0cmFjdFBhdGg7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9oaXN0b3J5L2xpYi9leHRyYWN0UGF0aC5qc1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDI3XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJ3dhcm5pbmcnKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG5mdW5jdGlvbiBydW5UcmFuc2l0aW9uSG9vayhob29rLCBsb2NhdGlvbiwgY2FsbGJhY2spIHtcbiAgdmFyIHJlc3VsdCA9IGhvb2sobG9jYXRpb24sIGNhbGxiYWNrKTtcblxuICBpZiAoaG9vay5sZW5ndGggPCAyKSB7XG4gICAgLy8gQXNzdW1lIHRoZSBob29rIHJ1bnMgc3luY2hyb25vdXNseSBhbmQgYXV0b21hdGljYWxseVxuICAgIC8vIGNhbGwgdGhlIGNhbGxiYWNrIHdpdGggdGhlIHJldHVybiB2YWx1ZS5cbiAgICBjYWxsYmFjayhyZXN1bHQpO1xuICB9IGVsc2Uge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfd2FybmluZzJbJ2RlZmF1bHQnXShyZXN1bHQgPT09IHVuZGVmaW5lZCwgJ1lvdSBzaG91bGQgbm90IFwicmV0dXJuXCIgaW4gYSB0cmFuc2l0aW9uIGhvb2sgd2l0aCBhIGNhbGxiYWNrIGFyZ3VtZW50OyBjYWxsIHRoZSBjYWxsYmFjayBpbnN0ZWFkJykgOiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gcnVuVHJhbnNpdGlvbkhvb2s7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vaGlzdG9yeS9saWIvcnVuVHJhbnNpdGlvbkhvb2suanNcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAyN1xuICoqLyIsIi8vaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZydcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5mdW5jdGlvbiBkZXByZWNhdGUoZm4pIHtcbiAgcmV0dXJuIGZuO1xuICAvL3JldHVybiBmdW5jdGlvbiAoKSB7XG4gIC8vICB3YXJuaW5nKGZhbHNlLCAnW2hpc3RvcnldICcgKyBtZXNzYWdlKVxuICAvLyAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgLy99XG59XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZGVwcmVjYXRlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vaGlzdG9yeS9saWIvZGVwcmVjYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMjdcbiAqKi8iLCJpbXBvcnQgd2FybmluZyBmcm9tICd3YXJuaW5nJ1xuaW1wb3J0IHsgUkVQTEFDRSB9IGZyb20gJ2hpc3RvcnkvbGliL0FjdGlvbnMnXG5pbXBvcnQgdXNlUXVlcmllcyBmcm9tICdoaXN0b3J5L2xpYi91c2VRdWVyaWVzJ1xuaW1wb3J0IGNvbXB1dGVDaGFuZ2VkUm91dGVzIGZyb20gJy4vY29tcHV0ZUNoYW5nZWRSb3V0ZXMnXG5pbXBvcnQgeyBydW5FbnRlckhvb2tzLCBydW5MZWF2ZUhvb2tzIH0gZnJvbSAnLi9UcmFuc2l0aW9uVXRpbHMnXG5pbXBvcnQgeyBkZWZhdWx0IGFzIF9pc0FjdGl2ZSB9IGZyb20gJy4vaXNBY3RpdmUnXG5pbXBvcnQgZ2V0Q29tcG9uZW50cyBmcm9tICcuL2dldENvbXBvbmVudHMnXG5pbXBvcnQgbWF0Y2hSb3V0ZXMgZnJvbSAnLi9tYXRjaFJvdXRlcydcblxuZnVuY3Rpb24gaGFzQW55UHJvcGVydGllcyhvYmplY3QpIHtcbiAgZm9yIChjb25zdCBwIGluIG9iamVjdClcbiAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KHApKVxuICAgICAgcmV0dXJuIHRydWVcblxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGNyZWF0ZUhpc3RvcnkgZnVuY3Rpb24gdGhhdCBtYXkgYmUgdXNlZCB0byBjcmVhdGVcbiAqIGhpc3Rvcnkgb2JqZWN0cyB0aGF0IGtub3cgYWJvdXQgcm91dGluZy5cbiAqXG4gKiBFbmhhbmNlcyBoaXN0b3J5IG9iamVjdHMgd2l0aCB0aGUgZm9sbG93aW5nIG1ldGhvZHM6XG4gKlxuICogLSBsaXN0ZW4oKGVycm9yLCBuZXh0U3RhdGUpID0+IHt9KVxuICogLSBsaXN0ZW5CZWZvcmVMZWF2aW5nUm91dGUocm91dGUsIChuZXh0TG9jYXRpb24pID0+IHt9KVxuICogLSBtYXRjaChsb2NhdGlvbiwgKGVycm9yLCByZWRpcmVjdExvY2F0aW9uLCBuZXh0U3RhdGUpID0+IHt9KVxuICogLSBpc0FjdGl2ZShwYXRobmFtZSwgcXVlcnksIGluZGV4T25seT1mYWxzZSlcbiAqL1xuZnVuY3Rpb24gdXNlUm91dGVzKGNyZWF0ZUhpc3RvcnkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChvcHRpb25zPXt9KSB7XG4gICAgbGV0IHsgcm91dGVzLCAuLi5oaXN0b3J5T3B0aW9ucyB9ID0gb3B0aW9uc1xuICAgIGxldCBoaXN0b3J5ID0gdXNlUXVlcmllcyhjcmVhdGVIaXN0b3J5KShoaXN0b3J5T3B0aW9ucylcbiAgICBsZXQgc3RhdGUgPSB7fVxuXG4gICAgZnVuY3Rpb24gaXNBY3RpdmUocGF0aG5hbWUsIHF1ZXJ5LCBpbmRleE9ubHk9ZmFsc2UpIHtcbiAgICAgIHJldHVybiBfaXNBY3RpdmUocGF0aG5hbWUsIHF1ZXJ5LCBpbmRleE9ubHksIHN0YXRlLmxvY2F0aW9uLCBzdGF0ZS5yb3V0ZXMsIHN0YXRlLnBhcmFtcylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVMb2NhdGlvbkZyb21SZWRpcmVjdEluZm8oeyBwYXRobmFtZSwgcXVlcnksIHN0YXRlIH0pIHtcbiAgICAgIHJldHVybiBoaXN0b3J5LmNyZWF0ZUxvY2F0aW9uKFxuICAgICAgICBoaXN0b3J5LmNyZWF0ZVBhdGgocGF0aG5hbWUsIHF1ZXJ5KSwgc3RhdGUsIFJFUExBQ0VcbiAgICAgIClcbiAgICB9XG5cbiAgICBsZXQgcGFydGlhbE5leHRTdGF0ZVxuXG4gICAgZnVuY3Rpb24gbWF0Y2gobG9jYXRpb24sIGNhbGxiYWNrKSB7XG4gICAgICBpZiAocGFydGlhbE5leHRTdGF0ZSAmJiBwYXJ0aWFsTmV4dFN0YXRlLmxvY2F0aW9uID09PSBsb2NhdGlvbikge1xuICAgICAgICAvLyBDb250aW51ZSBmcm9tIHdoZXJlIHdlIGxlZnQgb2ZmLlxuICAgICAgICBmaW5pc2hNYXRjaChwYXJ0aWFsTmV4dFN0YXRlLCBjYWxsYmFjaylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hdGNoUm91dGVzKHJvdXRlcywgbG9jYXRpb24sIGZ1bmN0aW9uIChlcnJvciwgbmV4dFN0YXRlKSB7XG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnJvcilcbiAgICAgICAgICB9IGVsc2UgaWYgKG5leHRTdGF0ZSkge1xuICAgICAgICAgICAgZmluaXNoTWF0Y2goeyAuLi5uZXh0U3RhdGUsIGxvY2F0aW9uIH0sIGNhbGxiYWNrKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmlzaE1hdGNoKG5leHRTdGF0ZSwgY2FsbGJhY2spIHtcbiAgICAgIGxldCB7IGxlYXZlUm91dGVzLCBlbnRlclJvdXRlcyB9ID0gY29tcHV0ZUNoYW5nZWRSb3V0ZXMoc3RhdGUsIG5leHRTdGF0ZSlcblxuICAgICAgcnVuTGVhdmVIb29rcyhsZWF2ZVJvdXRlcylcblxuICAgICAgcnVuRW50ZXJIb29rcyhlbnRlclJvdXRlcywgbmV4dFN0YXRlLCBmdW5jdGlvbiAoZXJyb3IsIHJlZGlyZWN0SW5mbykge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBjYWxsYmFjayhlcnJvcilcbiAgICAgICAgfSBlbHNlIGlmIChyZWRpcmVjdEluZm8pIHtcbiAgICAgICAgICBjYWxsYmFjayhudWxsLCBjcmVhdGVMb2NhdGlvbkZyb21SZWRpcmVjdEluZm8ocmVkaXJlY3RJbmZvKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBUT0RPOiBGZXRjaCBjb21wb25lbnRzIGFmdGVyIHN0YXRlIGlzIHVwZGF0ZWQuXG4gICAgICAgICAgZ2V0Q29tcG9uZW50cyhuZXh0U3RhdGUsIGZ1bmN0aW9uIChlcnJvciwgY29tcG9uZW50cykge1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKGVycm9yKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gVE9ETzogTWFrZSBtYXRjaCBhIHB1cmUgZnVuY3Rpb24gYW5kIGhhdmUgc29tZSBvdGhlciBBUElcbiAgICAgICAgICAgICAgLy8gZm9yIFwibWF0Y2ggYW5kIHVwZGF0ZSBzdGF0ZVwiLlxuICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBudWxsLCAoc3RhdGUgPSB7IC4uLm5leHRTdGF0ZSwgY29tcG9uZW50cyB9KSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGxldCBSb3V0ZUd1aWQgPSAxXG5cbiAgICBmdW5jdGlvbiBnZXRSb3V0ZUlEKHJvdXRlKSB7XG4gICAgICByZXR1cm4gcm91dGUuX19pZF9fIHx8IChyb3V0ZS5fX2lkX18gPSBSb3V0ZUd1aWQrKylcbiAgICB9XG5cbiAgICBjb25zdCBSb3V0ZUhvb2tzID0ge31cblxuICAgIGZ1bmN0aW9uIGdldFJvdXRlSG9va3NGb3JSb3V0ZXMocm91dGVzKSB7XG4gICAgICByZXR1cm4gcm91dGVzLnJlZHVjZShmdW5jdGlvbiAoaG9va3MsIHJvdXRlKSB7XG4gICAgICAgIGhvb2tzLnB1c2guYXBwbHkoaG9va3MsIFJvdXRlSG9va3NbZ2V0Um91dGVJRChyb3V0ZSldKVxuICAgICAgICByZXR1cm4gaG9va3NcbiAgICAgIH0sIFtdKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zaXRpb25Ib29rKGxvY2F0aW9uLCBjYWxsYmFjaykge1xuICAgICAgbWF0Y2hSb3V0ZXMocm91dGVzLCBsb2NhdGlvbiwgZnVuY3Rpb24gKGVycm9yLCBuZXh0U3RhdGUpIHtcbiAgICAgICAgaWYgKG5leHRTdGF0ZSA9PSBudWxsKSB7XG4gICAgICAgICAgLy8gVE9ETzogV2UgZGlkbid0IGFjdHVhbGx5IG1hdGNoIGFueXRoaW5nLCBidXQgaGFuZ1xuICAgICAgICAgIC8vIG9udG8gZXJyb3IvbmV4dFN0YXRlIHNvIHdlIGRvbid0IGhhdmUgdG8gbWF0Y2hSb3V0ZXNcbiAgICAgICAgICAvLyBhZ2FpbiBpbiB0aGUgbGlzdGVuIGNhbGxiYWNrLlxuICAgICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENhY2hlIHNvbWUgc3RhdGUgaGVyZSBzbyB3ZSBkb24ndCBoYXZlIHRvXG4gICAgICAgIC8vIG1hdGNoUm91dGVzKCkgYWdhaW4gaW4gdGhlIGxpc3RlbiBjYWxsYmFjay5cbiAgICAgICAgcGFydGlhbE5leHRTdGF0ZSA9IHsgLi4ubmV4dFN0YXRlLCBsb2NhdGlvbiB9XG5cbiAgICAgICAgbGV0IGhvb2tzID0gZ2V0Um91dGVIb29rc0ZvclJvdXRlcyhcbiAgICAgICAgICBjb21wdXRlQ2hhbmdlZFJvdXRlcyhzdGF0ZSwgcGFydGlhbE5leHRTdGF0ZSkubGVhdmVSb3V0ZXNcbiAgICAgICAgKVxuXG4gICAgICAgIGxldCByZXN1bHRcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGhvb2tzLmxlbmd0aDsgcmVzdWx0ID09IG51bGwgJiYgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgLy8gUGFzc2luZyB0aGUgbG9jYXRpb24gYXJnIGhlcmUgaW5kaWNhdGVzIHRvXG4gICAgICAgICAgLy8gdGhlIHVzZXIgdGhhdCB0aGlzIGlzIGEgdHJhbnNpdGlvbiBob29rLlxuICAgICAgICAgIHJlc3VsdCA9IGhvb2tzW2ldKGxvY2F0aW9uKVxuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2socmVzdWx0KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBiZWZvcmVVbmxvYWRIb29rKCkge1xuICAgICAgLy8gU3luY2hyb25vdXNseSBjaGVjayB0byBzZWUgaWYgYW55IHJvdXRlIGhvb2tzIHdhbnRcbiAgICAgIC8vIHRvIHByZXZlbnQgdGhlIGN1cnJlbnQgd2luZG93L3RhYiBmcm9tIGNsb3NpbmcuXG4gICAgICBpZiAoc3RhdGUucm91dGVzKSB7XG4gICAgICAgIGxldCBob29rcyA9IGdldFJvdXRlSG9va3NGb3JSb3V0ZXMoc3RhdGUucm91dGVzKVxuXG4gICAgICAgIGxldCBtZXNzYWdlXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBob29rcy5sZW5ndGg7IHR5cGVvZiBtZXNzYWdlICE9PSAnc3RyaW5nJyAmJiBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAvLyBQYXNzaW5nIG5vIGFyZ3MgaW5kaWNhdGVzIHRvIHRoZSB1c2VyIHRoYXQgdGhpcyBpcyBhXG4gICAgICAgICAgLy8gYmVmb3JldW5sb2FkIGhvb2suIFdlIGRvbid0IGtub3cgdGhlIG5leHQgbG9jYXRpb24uXG4gICAgICAgICAgbWVzc2FnZSA9IGhvb2tzW2ldKClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtZXNzYWdlXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHVubGlzdGVuQmVmb3JlLCB1bmxpc3RlbkJlZm9yZVVubG9hZFxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIHRoZSBnaXZlbiBob29rIGZ1bmN0aW9uIHRvIHJ1biBiZWZvcmUgbGVhdmluZyB0aGUgZ2l2ZW4gcm91dGUuXG4gICAgICpcbiAgICAgKiBEdXJpbmcgYSBub3JtYWwgdHJhbnNpdGlvbiwgdGhlIGhvb2sgZnVuY3Rpb24gcmVjZWl2ZXMgdGhlIG5leHQgbG9jYXRpb25cbiAgICAgKiBhcyBpdHMgb25seSBhcmd1bWVudCBhbmQgbXVzdCByZXR1cm4gZWl0aGVyIGEpIGEgcHJvbXB0IG1lc3NhZ2UgdG8gc2hvd1xuICAgICAqIHRoZSB1c2VyLCB0byBtYWtlIHN1cmUgdGhleSB3YW50IHRvIGxlYXZlIHRoZSBwYWdlIG9yIGIpIGZhbHNlLCB0byBwcmV2ZW50XG4gICAgICogdGhlIHRyYW5zaXRpb24uXG4gICAgICpcbiAgICAgKiBEdXJpbmcgdGhlIGJlZm9yZXVubG9hZCBldmVudCAoaW4gYnJvd3NlcnMpIHRoZSBob29rIHJlY2VpdmVzIG5vIGFyZ3VtZW50cy5cbiAgICAgKiBJbiB0aGlzIGNhc2UgaXQgbXVzdCByZXR1cm4gYSBwcm9tcHQgbWVzc2FnZSB0byBwcmV2ZW50IHRoZSB0cmFuc2l0aW9uLlxuICAgICAqXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgbWF5IGJlIHVzZWQgdG8gdW5iaW5kIHRoZSBsaXN0ZW5lci5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBsaXN0ZW5CZWZvcmVMZWF2aW5nUm91dGUocm91dGUsIGhvb2spIHtcbiAgICAgIC8vIFRPRE86IFdhcm4gaWYgdGhleSByZWdpc3RlciBmb3IgYSByb3V0ZSB0aGF0IGlzbid0IGN1cnJlbnRseVxuICAgICAgLy8gYWN0aXZlLiBUaGV5J3JlIHByb2JhYmx5IGRvaW5nIHNvbWV0aGluZyB3cm9uZywgbGlrZSByZS1jcmVhdGluZ1xuICAgICAgLy8gcm91dGUgb2JqZWN0cyBvbiBldmVyeSBsb2NhdGlvbiBjaGFuZ2UuXG4gICAgICBsZXQgcm91dGVJRCA9IGdldFJvdXRlSUQocm91dGUpXG4gICAgICBsZXQgaG9va3MgPSBSb3V0ZUhvb2tzW3JvdXRlSURdXG5cbiAgICAgIGlmIChob29rcyA9PSBudWxsKSB7XG4gICAgICAgIGxldCB0aGVyZVdlcmVOb1JvdXRlSG9va3MgPSAhaGFzQW55UHJvcGVydGllcyhSb3V0ZUhvb2tzKVxuXG4gICAgICAgIGhvb2tzID0gUm91dGVIb29rc1tyb3V0ZUlEXSA9IFsgaG9vayBdXG5cbiAgICAgICAgaWYgKHRoZXJlV2VyZU5vUm91dGVIb29rcykge1xuICAgICAgICAgIC8vIHNldHVwIHRyYW5zaXRpb24gJiBiZWZvcmV1bmxvYWQgaG9va3NcbiAgICAgICAgICB1bmxpc3RlbkJlZm9yZSA9IGhpc3RvcnkubGlzdGVuQmVmb3JlKHRyYW5zaXRpb25Ib29rKVxuXG4gICAgICAgICAgaWYgKGhpc3RvcnkubGlzdGVuQmVmb3JlVW5sb2FkKVxuICAgICAgICAgICAgdW5saXN0ZW5CZWZvcmVVbmxvYWQgPSBoaXN0b3J5Lmxpc3RlbkJlZm9yZVVubG9hZChiZWZvcmVVbmxvYWRIb29rKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGhvb2tzLmluZGV4T2YoaG9vaykgPT09IC0xKSB7XG4gICAgICAgIGhvb2tzLnB1c2goaG9vaylcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGhvb2tzID0gUm91dGVIb29rc1tyb3V0ZUlEXVxuXG4gICAgICAgIGlmIChob29rcyAhPSBudWxsKSB7XG4gICAgICAgICAgbGV0IG5ld0hvb2tzID0gaG9va3MuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gaG9vaylcblxuICAgICAgICAgIGlmIChuZXdIb29rcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGRlbGV0ZSBSb3V0ZUhvb2tzW3JvdXRlSURdXG5cbiAgICAgICAgICAgIGlmICghaGFzQW55UHJvcGVydGllcyhSb3V0ZUhvb2tzKSkge1xuICAgICAgICAgICAgICAvLyB0ZWFyZG93biB0cmFuc2l0aW9uICYgYmVmb3JldW5sb2FkIGhvb2tzXG4gICAgICAgICAgICAgIGlmICh1bmxpc3RlbkJlZm9yZSkge1xuICAgICAgICAgICAgICAgIHVubGlzdGVuQmVmb3JlKClcbiAgICAgICAgICAgICAgICB1bmxpc3RlbkJlZm9yZSA9IG51bGxcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICh1bmxpc3RlbkJlZm9yZVVubG9hZCkge1xuICAgICAgICAgICAgICAgIHVubGlzdGVuQmVmb3JlVW5sb2FkKClcbiAgICAgICAgICAgICAgICB1bmxpc3RlbkJlZm9yZVVubG9hZCA9IG51bGxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBSb3V0ZUhvb2tzW3JvdXRlSURdID0gbmV3SG9va3NcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHRoZSBBUEkgZm9yIHN0YXRlZnVsIGVudmlyb25tZW50cy4gQXMgdGhlIGxvY2F0aW9uXG4gICAgICogY2hhbmdlcywgd2UgdXBkYXRlIHN0YXRlIGFuZCBjYWxsIHRoZSBsaXN0ZW5lci4gV2UgY2FuIGFsc29cbiAgICAgKiBncmFjZWZ1bGx5IGhhbmRsZSBlcnJvcnMgYW5kIHJlZGlyZWN0cy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICAgIC8vIFRPRE86IE9ubHkgdXNlIGEgc2luZ2xlIGhpc3RvcnkgbGlzdGVuZXIuIE90aGVyd2lzZSB3ZSdsbFxuICAgICAgLy8gZW5kIHVwIHdpdGggbXVsdGlwbGUgY29uY3VycmVudCBjYWxscyB0byBtYXRjaC5cbiAgICAgIHJldHVybiBoaXN0b3J5Lmxpc3RlbihmdW5jdGlvbiAobG9jYXRpb24pIHtcbiAgICAgICAgaWYgKHN0YXRlLmxvY2F0aW9uID09PSBsb2NhdGlvbikge1xuICAgICAgICAgIGxpc3RlbmVyKG51bGwsIHN0YXRlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1hdGNoKGxvY2F0aW9uLCBmdW5jdGlvbiAoZXJyb3IsIHJlZGlyZWN0TG9jYXRpb24sIG5leHRTdGF0ZSkge1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgIGxpc3RlbmVyKGVycm9yKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZWRpcmVjdExvY2F0aW9uKSB7XG4gICAgICAgICAgICAgIGhpc3RvcnkudHJhbnNpdGlvblRvKHJlZGlyZWN0TG9jYXRpb24pXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRTdGF0ZSkge1xuICAgICAgICAgICAgICBsaXN0ZW5lcihudWxsLCBuZXh0U3RhdGUpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB3YXJuaW5nKFxuICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAgICdMb2NhdGlvbiBcIiVzXCIgZGlkIG5vdCBtYXRjaCBhbnkgcm91dGVzJyxcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5wYXRobmFtZSArIGxvY2F0aW9uLnNlYXJjaCArIGxvY2F0aW9uLmhhc2hcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmhpc3RvcnksXG4gICAgICBpc0FjdGl2ZSxcbiAgICAgIG1hdGNoLFxuICAgICAgbGlzdGVuQmVmb3JlTGVhdmluZ1JvdXRlLFxuICAgICAgbGlzdGVuXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVzZVJvdXRlc1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9tb2R1bGVzL3VzZVJvdXRlcy5qc1xuICoqLyIsImltcG9ydCB7IGxvb3BBc3luYyB9IGZyb20gJy4vQXN5bmNVdGlscydcblxuZnVuY3Rpb24gY3JlYXRlRW50ZXJIb29rKGhvb2ssIHJvdXRlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoYSwgYiwgY2FsbGJhY2spIHtcbiAgICBob29rLmFwcGx5KHJvdXRlLCBhcmd1bWVudHMpXG5cbiAgICBpZiAoaG9vay5sZW5ndGggPCAzKSB7XG4gICAgICAvLyBBc3N1bWUgaG9vayBleGVjdXRlcyBzeW5jaHJvbm91c2x5IGFuZFxuICAgICAgLy8gYXV0b21hdGljYWxseSBjYWxsIHRoZSBjYWxsYmFjay5cbiAgICAgIGNhbGxiYWNrKClcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RW50ZXJIb29rcyhyb3V0ZXMpIHtcbiAgcmV0dXJuIHJvdXRlcy5yZWR1Y2UoZnVuY3Rpb24gKGhvb2tzLCByb3V0ZSkge1xuICAgIGlmIChyb3V0ZS5vbkVudGVyKVxuICAgICAgaG9va3MucHVzaChjcmVhdGVFbnRlckhvb2socm91dGUub25FbnRlciwgcm91dGUpKVxuXG4gICAgcmV0dXJuIGhvb2tzXG4gIH0sIFtdKVxufVxuXG4vKipcbiAqIFJ1bnMgYWxsIG9uRW50ZXIgaG9va3MgaW4gdGhlIGdpdmVuIGFycmF5IG9mIHJvdXRlcyBpbiBvcmRlclxuICogd2l0aCBvbkVudGVyKG5leHRTdGF0ZSwgcmVwbGFjZVN0YXRlLCBjYWxsYmFjaykgYW5kIGNhbGxzXG4gKiBjYWxsYmFjayhlcnJvciwgcmVkaXJlY3RJbmZvKSB3aGVuIGZpbmlzaGVkLiBUaGUgZmlyc3QgaG9va1xuICogdG8gdXNlIHJlcGxhY2VTdGF0ZSBzaG9ydC1jaXJjdWl0cyB0aGUgbG9vcC5cbiAqXG4gKiBJZiBhIGhvb2sgbmVlZHMgdG8gcnVuIGFzeW5jaHJvbm91c2x5LCBpdCBtYXkgdXNlIHRoZSBjYWxsYmFja1xuICogZnVuY3Rpb24uIEhvd2V2ZXIsIGRvaW5nIHNvIHdpbGwgY2F1c2UgdGhlIHRyYW5zaXRpb24gdG8gcGF1c2UsXG4gKiB3aGljaCBjb3VsZCBsZWFkIHRvIGEgbm9uLXJlc3BvbnNpdmUgVUkgaWYgdGhlIGhvb2sgaXMgc2xvdy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJ1bkVudGVySG9va3Mocm91dGVzLCBuZXh0U3RhdGUsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGhvb2tzID0gZ2V0RW50ZXJIb29rcyhyb3V0ZXMpXG5cbiAgaWYgKCFob29rcy5sZW5ndGgpIHtcbiAgICBjYWxsYmFjaygpXG4gICAgcmV0dXJuXG4gIH1cblxuICBsZXQgcmVkaXJlY3RJbmZvXG4gIGZ1bmN0aW9uIHJlcGxhY2VTdGF0ZShzdGF0ZSwgcGF0aG5hbWUsIHF1ZXJ5KSB7XG4gICAgcmVkaXJlY3RJbmZvID0geyBwYXRobmFtZSwgcXVlcnksIHN0YXRlIH1cbiAgfVxuXG4gIGxvb3BBc3luYyhob29rcy5sZW5ndGgsIGZ1bmN0aW9uIChpbmRleCwgbmV4dCwgZG9uZSkge1xuICAgIGhvb2tzW2luZGV4XShuZXh0U3RhdGUsIHJlcGxhY2VTdGF0ZSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3IgfHwgcmVkaXJlY3RJbmZvKSB7XG4gICAgICAgIGRvbmUoZXJyb3IsIHJlZGlyZWN0SW5mbykgLy8gTm8gbmVlZCB0byBjb250aW51ZS5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHQoKVxuICAgICAgfVxuICAgIH0pXG4gIH0sIGNhbGxiYWNrKVxufVxuXG4vKipcbiAqIFJ1bnMgYWxsIG9uTGVhdmUgaG9va3MgaW4gdGhlIGdpdmVuIGFycmF5IG9mIHJvdXRlcyBpbiBvcmRlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJ1bkxlYXZlSG9va3Mocm91dGVzKSB7XG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSByb3V0ZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpXG4gICAgaWYgKHJvdXRlc1tpXS5vbkxlYXZlKVxuICAgICAgcm91dGVzW2ldLm9uTGVhdmUuY2FsbChyb3V0ZXNbaV0pXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL21vZHVsZXMvVHJhbnNpdGlvblV0aWxzLmpzXG4gKiovIiwiZXhwb3J0IGZ1bmN0aW9uIGxvb3BBc3luYyh0dXJucywgd29yaywgY2FsbGJhY2spIHtcbiAgbGV0IGN1cnJlbnRUdXJuID0gMCwgaXNEb25lID0gZmFsc2VcblxuICBmdW5jdGlvbiBkb25lKCkge1xuICAgIGlzRG9uZSA9IHRydWVcbiAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gIH1cblxuICBmdW5jdGlvbiBuZXh0KCkge1xuICAgIGlmIChpc0RvbmUpXG4gICAgICByZXR1cm5cblxuICAgIGlmIChjdXJyZW50VHVybiA8IHR1cm5zKSB7XG4gICAgICB3b3JrLmNhbGwodGhpcywgY3VycmVudFR1cm4rKywgbmV4dCwgZG9uZSlcbiAgICB9IGVsc2Uge1xuICAgICAgZG9uZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgfVxuICB9XG5cbiAgbmV4dCgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXBBc3luYyhhcnJheSwgd29yaywgY2FsbGJhY2spIHtcbiAgY29uc3QgbGVuZ3RoID0gYXJyYXkubGVuZ3RoXG4gIGNvbnN0IHZhbHVlcyA9IFtdXG5cbiAgaWYgKGxlbmd0aCA9PT0gMClcbiAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgdmFsdWVzKVxuXG4gIGxldCBpc0RvbmUgPSBmYWxzZSwgZG9uZUNvdW50ID0gMFxuXG4gIGZ1bmN0aW9uIGRvbmUoaW5kZXgsIGVycm9yLCB2YWx1ZSkge1xuICAgIGlmIChpc0RvbmUpXG4gICAgICByZXR1cm5cblxuICAgIGlmIChlcnJvcikge1xuICAgICAgaXNEb25lID0gdHJ1ZVxuICAgICAgY2FsbGJhY2soZXJyb3IpXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlc1tpbmRleF0gPSB2YWx1ZVxuXG4gICAgICBpc0RvbmUgPSAoKytkb25lQ291bnQgPT09IGxlbmd0aClcblxuICAgICAgaWYgKGlzRG9uZSlcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgdmFsdWVzKVxuICAgIH1cbiAgfVxuXG4gIGFycmF5LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgd29yayhpdGVtLCBpbmRleCwgZnVuY3Rpb24gKGVycm9yLCB2YWx1ZSkge1xuICAgICAgZG9uZShpbmRleCwgZXJyb3IsIHZhbHVlKVxuICAgIH0pXG4gIH0pXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL21vZHVsZXMvQXN5bmNVdGlscy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJ3dhcm5pbmcnKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG52YXIgX3F1ZXJ5U3RyaW5nID0gcmVxdWlyZSgncXVlcnktc3RyaW5nJyk7XG5cbnZhciBfcnVuVHJhbnNpdGlvbkhvb2sgPSByZXF1aXJlKCcuL3J1blRyYW5zaXRpb25Ib29rJyk7XG5cbnZhciBfcnVuVHJhbnNpdGlvbkhvb2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcnVuVHJhbnNpdGlvbkhvb2spO1xuXG52YXIgX3BhcnNlUGF0aCA9IHJlcXVpcmUoJy4vcGFyc2VQYXRoJyk7XG5cbnZhciBfcGFyc2VQYXRoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BhcnNlUGF0aCk7XG5cbnZhciBfZGVwcmVjYXRlID0gcmVxdWlyZSgnLi9kZXByZWNhdGUnKTtcblxudmFyIF9kZXByZWNhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVwcmVjYXRlKTtcblxudmFyIFNFQVJDSF9CQVNFX0tFWSA9ICckc2VhcmNoQmFzZSc7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTdHJpbmdpZnlRdWVyeShxdWVyeSkge1xuICByZXR1cm4gX3F1ZXJ5U3RyaW5nLnN0cmluZ2lmeShxdWVyeSkucmVwbGFjZSgvJTIwL2csICcrJyk7XG59XG5cbnZhciBkZWZhdWx0UGFyc2VRdWVyeVN0cmluZyA9IF9xdWVyeVN0cmluZy5wYXJzZTtcblxuZnVuY3Rpb24gaXNOZXN0ZWRPYmplY3Qob2JqZWN0KSB7XG4gIGZvciAodmFyIHAgaW4gb2JqZWN0KSB7XG4gICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShwKSAmJiB0eXBlb2Ygb2JqZWN0W3BdID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShvYmplY3RbcF0pICYmIG9iamVjdFtwXSAhPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gIH1yZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBjcmVhdGVIaXN0b3J5IGZ1bmN0aW9uIHRoYXQgbWF5IGJlIHVzZWQgdG8gY3JlYXRlXG4gKiBoaXN0b3J5IG9iamVjdHMgdGhhdCBrbm93IGhvdyB0byBoYW5kbGUgVVJMIHF1ZXJpZXMuXG4gKi9cbmZ1bmN0aW9uIHVzZVF1ZXJpZXMoY3JlYXRlSGlzdG9yeSkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG4gICAgdmFyIHN0cmluZ2lmeVF1ZXJ5ID0gb3B0aW9ucy5zdHJpbmdpZnlRdWVyeTtcbiAgICB2YXIgcGFyc2VRdWVyeVN0cmluZyA9IG9wdGlvbnMucGFyc2VRdWVyeVN0cmluZztcblxuICAgIHZhciBoaXN0b3J5T3B0aW9ucyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvcHRpb25zLCBbJ3N0cmluZ2lmeVF1ZXJ5JywgJ3BhcnNlUXVlcnlTdHJpbmcnXSk7XG5cbiAgICB2YXIgaGlzdG9yeSA9IGNyZWF0ZUhpc3RvcnkoaGlzdG9yeU9wdGlvbnMpO1xuXG4gICAgaWYgKHR5cGVvZiBzdHJpbmdpZnlRdWVyeSAhPT0gJ2Z1bmN0aW9uJykgc3RyaW5naWZ5UXVlcnkgPSBkZWZhdWx0U3RyaW5naWZ5UXVlcnk7XG5cbiAgICBpZiAodHlwZW9mIHBhcnNlUXVlcnlTdHJpbmcgIT09ICdmdW5jdGlvbicpIHBhcnNlUXVlcnlTdHJpbmcgPSBkZWZhdWx0UGFyc2VRdWVyeVN0cmluZztcblxuICAgIGZ1bmN0aW9uIGFkZFF1ZXJ5KGxvY2F0aW9uKSB7XG4gICAgICBpZiAobG9jYXRpb24ucXVlcnkgPT0gbnVsbCkge1xuICAgICAgICB2YXIgc2VhcmNoID0gbG9jYXRpb24uc2VhcmNoO1xuXG4gICAgICAgIGxvY2F0aW9uLnF1ZXJ5ID0gcGFyc2VRdWVyeVN0cmluZyhzZWFyY2guc3Vic3RyaW5nKDEpKTtcbiAgICAgICAgbG9jYXRpb25bU0VBUkNIX0JBU0VfS0VZXSA9IHsgc2VhcmNoOiBzZWFyY2gsIHNlYXJjaEJhc2U6ICcnIH07XG4gICAgICB9XG5cbiAgICAgIC8vIFRPRE86IEluc3RlYWQgb2YgYWxsIHRoZSBib29rLWtlZXBpbmcgaGVyZSwgdGhpcyBzaG91bGQganVzdCBzdHJpcCB0aGVcbiAgICAgIC8vIHN0cmluZ2lmaWVkIHF1ZXJ5IGZyb20gdGhlIHNlYXJjaC5cblxuICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZFF1ZXJ5KGxvY2F0aW9uLCBxdWVyeSkge1xuICAgICAgdmFyIF9leHRlbmRzMjtcblxuICAgICAgdmFyIHF1ZXJ5U3RyaW5nID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKCFxdWVyeSB8fCAocXVlcnlTdHJpbmcgPSBzdHJpbmdpZnlRdWVyeShxdWVyeSkpID09PSAnJykgcmV0dXJuIGxvY2F0aW9uO1xuXG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX3dhcm5pbmcyWydkZWZhdWx0J10oc3RyaW5naWZ5UXVlcnkgIT09IGRlZmF1bHRTdHJpbmdpZnlRdWVyeSB8fCAhaXNOZXN0ZWRPYmplY3QocXVlcnkpLCAndXNlUXVlcmllcyBkb2VzIG5vdCBzdHJpbmdpZnkgbmVzdGVkIHF1ZXJ5IG9iamVjdHMgYnkgZGVmYXVsdDsgJyArICd1c2UgYSBjdXN0b20gc3RyaW5naWZ5UXVlcnkgZnVuY3Rpb24nKSA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHR5cGVvZiBsb2NhdGlvbiA9PT0gJ3N0cmluZycpIGxvY2F0aW9uID0gX3BhcnNlUGF0aDJbJ2RlZmF1bHQnXShsb2NhdGlvbik7XG5cbiAgICAgIHZhciBzZWFyY2hCYXNlU3BlYyA9IGxvY2F0aW9uW1NFQVJDSF9CQVNFX0tFWV07XG4gICAgICB2YXIgc2VhcmNoQmFzZSA9IHVuZGVmaW5lZDtcbiAgICAgIGlmIChzZWFyY2hCYXNlU3BlYyAmJiBsb2NhdGlvbi5zZWFyY2ggPT09IHNlYXJjaEJhc2VTcGVjLnNlYXJjaCkge1xuICAgICAgICBzZWFyY2hCYXNlID0gc2VhcmNoQmFzZVNwZWMuc2VhcmNoQmFzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlYXJjaEJhc2UgPSBsb2NhdGlvbi5zZWFyY2ggfHwgJyc7XG4gICAgICB9XG5cbiAgICAgIHZhciBzZWFyY2ggPSBzZWFyY2hCYXNlICsgKHNlYXJjaEJhc2UgPyAnJicgOiAnPycpICsgcXVlcnlTdHJpbmc7XG5cbiAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgbG9jYXRpb24sIChfZXh0ZW5kczIgPSB7XG4gICAgICAgIHNlYXJjaDogc2VhcmNoXG4gICAgICB9LCBfZXh0ZW5kczJbU0VBUkNIX0JBU0VfS0VZXSA9IHsgc2VhcmNoOiBzZWFyY2gsIHNlYXJjaEJhc2U6IHNlYXJjaEJhc2UgfSwgX2V4dGVuZHMyKSk7XG4gICAgfVxuXG4gICAgLy8gT3ZlcnJpZGUgYWxsIHJlYWQgbWV0aG9kcyB3aXRoIHF1ZXJ5LWF3YXJlIHZlcnNpb25zLlxuICAgIGZ1bmN0aW9uIGxpc3RlbkJlZm9yZShob29rKSB7XG4gICAgICByZXR1cm4gaGlzdG9yeS5saXN0ZW5CZWZvcmUoZnVuY3Rpb24gKGxvY2F0aW9uLCBjYWxsYmFjaykge1xuICAgICAgICBfcnVuVHJhbnNpdGlvbkhvb2syWydkZWZhdWx0J10oaG9vaywgYWRkUXVlcnkobG9jYXRpb24pLCBjYWxsYmFjayk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBoaXN0b3J5Lmxpc3RlbihmdW5jdGlvbiAobG9jYXRpb24pIHtcbiAgICAgICAgbGlzdGVuZXIoYWRkUXVlcnkobG9jYXRpb24pKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlIGFsbCB3cml0ZSBtZXRob2RzIHdpdGggcXVlcnktYXdhcmUgdmVyc2lvbnMuXG4gICAgZnVuY3Rpb24gcHVzaChsb2NhdGlvbikge1xuICAgICAgaGlzdG9yeS5wdXNoKGFwcGVuZFF1ZXJ5KGxvY2F0aW9uLCBsb2NhdGlvbi5xdWVyeSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlcGxhY2UobG9jYXRpb24pIHtcbiAgICAgIGhpc3RvcnkucmVwbGFjZShhcHBlbmRRdWVyeShsb2NhdGlvbiwgbG9jYXRpb24ucXVlcnkpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVQYXRoKGxvY2F0aW9uLCBxdWVyeSkge1xuICAgICAgLy93YXJuaW5nKFxuICAgICAgLy8gICFxdWVyeSxcbiAgICAgIC8vICAndGhlIHF1ZXJ5IGFyZ3VtZW50IHRvIGNyZWF0ZVBhdGggaXMgZGVwcmVjYXRlZDsgdXNlIGEgbG9jYXRpb24gZGVzY3JpcHRvciBpbnN0ZWFkJ1xuICAgICAgLy8pXG4gICAgICByZXR1cm4gaGlzdG9yeS5jcmVhdGVQYXRoKGFwcGVuZFF1ZXJ5KGxvY2F0aW9uLCBxdWVyeSB8fCBsb2NhdGlvbi5xdWVyeSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUhyZWYobG9jYXRpb24sIHF1ZXJ5KSB7XG4gICAgICAvL3dhcm5pbmcoXG4gICAgICAvLyAgIXF1ZXJ5LFxuICAgICAgLy8gICd0aGUgcXVlcnkgYXJndW1lbnQgdG8gY3JlYXRlSHJlZiBpcyBkZXByZWNhdGVkOyB1c2UgYSBsb2NhdGlvbiBkZXNjcmlwdG9yIGluc3RlYWQnXG4gICAgICAvLylcbiAgICAgIHJldHVybiBoaXN0b3J5LmNyZWF0ZUhyZWYoYXBwZW5kUXVlcnkobG9jYXRpb24sIHF1ZXJ5IHx8IGxvY2F0aW9uLnF1ZXJ5KSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlTG9jYXRpb24oKSB7XG4gICAgICByZXR1cm4gYWRkUXVlcnkoaGlzdG9yeS5jcmVhdGVMb2NhdGlvbi5hcHBseShoaXN0b3J5LCBhcmd1bWVudHMpKTtcbiAgICB9XG5cbiAgICAvLyBkZXByZWNhdGVkXG4gICAgZnVuY3Rpb24gcHVzaFN0YXRlKHN0YXRlLCBwYXRoLCBxdWVyeSkge1xuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykgcGF0aCA9IF9wYXJzZVBhdGgyWydkZWZhdWx0J10ocGF0aCk7XG5cbiAgICAgIHB1c2goX2V4dGVuZHMoeyBzdGF0ZTogc3RhdGUgfSwgcGF0aCwgeyBxdWVyeTogcXVlcnkgfSkpO1xuICAgIH1cblxuICAgIC8vIGRlcHJlY2F0ZWRcbiAgICBmdW5jdGlvbiByZXBsYWNlU3RhdGUoc3RhdGUsIHBhdGgsIHF1ZXJ5KSB7XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSBwYXRoID0gX3BhcnNlUGF0aDJbJ2RlZmF1bHQnXShwYXRoKTtcblxuICAgICAgcmVwbGFjZShfZXh0ZW5kcyh7IHN0YXRlOiBzdGF0ZSB9LCBwYXRoLCB7IHF1ZXJ5OiBxdWVyeSB9KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9leHRlbmRzKHt9LCBoaXN0b3J5LCB7XG4gICAgICBsaXN0ZW5CZWZvcmU6IGxpc3RlbkJlZm9yZSxcbiAgICAgIGxpc3RlbjogbGlzdGVuLFxuICAgICAgcHVzaDogcHVzaCxcbiAgICAgIHJlcGxhY2U6IHJlcGxhY2UsXG4gICAgICBjcmVhdGVQYXRoOiBjcmVhdGVQYXRoLFxuICAgICAgY3JlYXRlSHJlZjogY3JlYXRlSHJlZixcbiAgICAgIGNyZWF0ZUxvY2F0aW9uOiBjcmVhdGVMb2NhdGlvbixcblxuICAgICAgcHVzaFN0YXRlOiBfZGVwcmVjYXRlMlsnZGVmYXVsdCddKHB1c2hTdGF0ZSwgJ3B1c2hTdGF0ZSBpcyBkZXByZWNhdGVkOyB1c2UgcHVzaCBpbnN0ZWFkJyksXG4gICAgICByZXBsYWNlU3RhdGU6IF9kZXByZWNhdGUyWydkZWZhdWx0J10ocmVwbGFjZVN0YXRlLCAncmVwbGFjZVN0YXRlIGlzIGRlcHJlY2F0ZWQ7IHVzZSByZXBsYWNlIGluc3RlYWQnKVxuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnRzWydkZWZhdWx0J10gPSB1c2VRdWVyaWVzO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2hpc3RvcnkvbGliL3VzZVF1ZXJpZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAyN1xuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBzdHJpY3RVcmlFbmNvZGUgPSByZXF1aXJlKCdzdHJpY3QtdXJpLWVuY29kZScpO1xuXG5leHBvcnRzLmV4dHJhY3QgPSBmdW5jdGlvbiAoc3RyKSB7XG5cdHJldHVybiBzdHIuc3BsaXQoJz8nKVsxXSB8fCAnJztcbn07XG5cbmV4cG9ydHMucGFyc2UgPSBmdW5jdGlvbiAoc3RyKSB7XG5cdGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiB7fTtcblx0fVxuXG5cdHN0ciA9IHN0ci50cmltKCkucmVwbGFjZSgvXihcXD98I3wmKS8sICcnKTtcblxuXHRpZiAoIXN0cikge1xuXHRcdHJldHVybiB7fTtcblx0fVxuXG5cdHJldHVybiBzdHIuc3BsaXQoJyYnKS5yZWR1Y2UoZnVuY3Rpb24gKHJldCwgcGFyYW0pIHtcblx0XHR2YXIgcGFydHMgPSBwYXJhbS5yZXBsYWNlKC9cXCsvZywgJyAnKS5zcGxpdCgnPScpO1xuXHRcdC8vIEZpcmVmb3ggKHByZSA0MCkgZGVjb2RlcyBgJTNEYCB0byBgPWBcblx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL3F1ZXJ5LXN0cmluZy9wdWxsLzM3XG5cdFx0dmFyIGtleSA9IHBhcnRzLnNoaWZ0KCk7XG5cdFx0dmFyIHZhbCA9IHBhcnRzLmxlbmd0aCA+IDAgPyBwYXJ0cy5qb2luKCc9JykgOiB1bmRlZmluZWQ7XG5cblx0XHRrZXkgPSBkZWNvZGVVUklDb21wb25lbnQoa2V5KTtcblxuXHRcdC8vIG1pc3NpbmcgYD1gIHNob3VsZCBiZSBgbnVsbGA6XG5cdFx0Ly8gaHR0cDovL3czLm9yZy9UUi8yMDEyL1dELXVybC0yMDEyMDUyNC8jY29sbGVjdC11cmwtcGFyYW1ldGVyc1xuXHRcdHZhbCA9IHZhbCA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGRlY29kZVVSSUNvbXBvbmVudCh2YWwpO1xuXG5cdFx0aWYgKCFyZXQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0cmV0W2tleV0gPSB2YWw7XG5cdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHJldFtrZXldKSkge1xuXHRcdFx0cmV0W2tleV0ucHVzaCh2YWwpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXRba2V5XSA9IFtyZXRba2V5XSwgdmFsXTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmV0O1xuXHR9LCB7fSk7XG59O1xuXG5leHBvcnRzLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIChvYmopIHtcblx0cmV0dXJuIG9iaiA/IE9iamVjdC5rZXlzKG9iaikuc29ydCgpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0dmFyIHZhbCA9IG9ialtrZXldO1xuXG5cdFx0aWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXG5cdFx0aWYgKHZhbCA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGtleTtcblx0XHR9XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG5cdFx0XHRyZXR1cm4gdmFsLnNvcnQoKS5tYXAoZnVuY3Rpb24gKHZhbDIpIHtcblx0XHRcdFx0cmV0dXJuIHN0cmljdFVyaUVuY29kZShrZXkpICsgJz0nICsgc3RyaWN0VXJpRW5jb2RlKHZhbDIpO1xuXHRcdFx0fSkuam9pbignJicpO1xuXHRcdH1cblxuXHRcdHJldHVybiBzdHJpY3RVcmlFbmNvZGUoa2V5KSArICc9JyArIHN0cmljdFVyaUVuY29kZSh2YWwpO1xuXHR9KS5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcblx0XHRyZXR1cm4geC5sZW5ndGggPiAwO1xuXHR9KS5qb2luKCcmJykgOiAnJztcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vaGlzdG9yeS9+L3F1ZXJ5LXN0cmluZy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDMwXG4gKiogbW9kdWxlIGNodW5rcyA9IDI3XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyKSB7XG5cdHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC9bIScoKSpdL2csIGZ1bmN0aW9uIChjKSB7XG5cdFx0cmV0dXJuICclJyArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNik7XG5cdH0pO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9oaXN0b3J5L34vcXVlcnktc3RyaW5nL34vc3RyaWN0LXVyaS1lbmNvZGUvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAyN1xuICoqLyIsImltcG9ydCB7IGdldFBhcmFtTmFtZXMgfSBmcm9tICcuL1BhdHRlcm5VdGlscydcblxuZnVuY3Rpb24gcm91dGVQYXJhbXNDaGFuZ2VkKHJvdXRlLCBwcmV2U3RhdGUsIG5leHRTdGF0ZSkge1xuICBpZiAoIXJvdXRlLnBhdGgpXG4gICAgcmV0dXJuIGZhbHNlXG5cbiAgY29uc3QgcGFyYW1OYW1lcyA9IGdldFBhcmFtTmFtZXMocm91dGUucGF0aClcblxuICByZXR1cm4gcGFyYW1OYW1lcy5zb21lKGZ1bmN0aW9uIChwYXJhbU5hbWUpIHtcbiAgICByZXR1cm4gcHJldlN0YXRlLnBhcmFtc1twYXJhbU5hbWVdICE9PSBuZXh0U3RhdGUucGFyYW1zW3BhcmFtTmFtZV1cbiAgfSlcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCBvZiB7IGxlYXZlUm91dGVzLCBlbnRlclJvdXRlcyB9IGRldGVybWluZWQgYnlcbiAqIHRoZSBjaGFuZ2UgZnJvbSBwcmV2U3RhdGUgdG8gbmV4dFN0YXRlLiBXZSBsZWF2ZSByb3V0ZXMgaWYgZWl0aGVyXG4gKiAxKSB0aGV5IGFyZSBub3QgaW4gdGhlIG5leHQgc3RhdGUgb3IgMikgdGhleSBhcmUgaW4gdGhlIG5leHQgc3RhdGVcbiAqIGJ1dCB0aGVpciBwYXJhbXMgaGF2ZSBjaGFuZ2VkIChpLmUuIC91c2Vycy8xMjMgPT4gL3VzZXJzLzQ1NikuXG4gKlxuICogbGVhdmVSb3V0ZXMgYXJlIG9yZGVyZWQgc3RhcnRpbmcgYXQgdGhlIGxlYWYgcm91dGUgb2YgdGhlIHRyZWVcbiAqIHdlJ3JlIGxlYXZpbmcgdXAgdG8gdGhlIGNvbW1vbiBwYXJlbnQgcm91dGUuIGVudGVyUm91dGVzIGFyZSBvcmRlcmVkXG4gKiBmcm9tIHRoZSB0b3Agb2YgdGhlIHRyZWUgd2UncmUgZW50ZXJpbmcgZG93biB0byB0aGUgbGVhZiByb3V0ZS5cbiAqL1xuZnVuY3Rpb24gY29tcHV0ZUNoYW5nZWRSb3V0ZXMocHJldlN0YXRlLCBuZXh0U3RhdGUpIHtcbiAgY29uc3QgcHJldlJvdXRlcyA9IHByZXZTdGF0ZSAmJiBwcmV2U3RhdGUucm91dGVzXG4gIGNvbnN0IG5leHRSb3V0ZXMgPSBuZXh0U3RhdGUucm91dGVzXG5cbiAgbGV0IGxlYXZlUm91dGVzLCBlbnRlclJvdXRlc1xuICBpZiAocHJldlJvdXRlcykge1xuICAgIGxlYXZlUm91dGVzID0gcHJldlJvdXRlcy5maWx0ZXIoZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgICByZXR1cm4gbmV4dFJvdXRlcy5pbmRleE9mKHJvdXRlKSA9PT0gLTEgfHwgcm91dGVQYXJhbXNDaGFuZ2VkKHJvdXRlLCBwcmV2U3RhdGUsIG5leHRTdGF0ZSlcbiAgICB9KVxuXG4gICAgLy8gb25MZWF2ZSBob29rcyBzdGFydCBhdCB0aGUgbGVhZiByb3V0ZS5cbiAgICBsZWF2ZVJvdXRlcy5yZXZlcnNlKClcblxuICAgIGVudGVyUm91dGVzID0gbmV4dFJvdXRlcy5maWx0ZXIoZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgICByZXR1cm4gcHJldlJvdXRlcy5pbmRleE9mKHJvdXRlKSA9PT0gLTEgfHwgbGVhdmVSb3V0ZXMuaW5kZXhPZihyb3V0ZSkgIT09IC0xXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBsZWF2ZVJvdXRlcyA9IFtdXG4gICAgZW50ZXJSb3V0ZXMgPSBuZXh0Um91dGVzXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGxlYXZlUm91dGVzLFxuICAgIGVudGVyUm91dGVzXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29tcHV0ZUNoYW5nZWRSb3V0ZXNcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvbW9kdWxlcy9jb21wdXRlQ2hhbmdlZFJvdXRlcy5qc1xuICoqLyIsImltcG9ydCB7IG1hdGNoUGF0dGVybiB9IGZyb20gJy4vUGF0dGVyblV0aWxzJ1xuXG5mdW5jdGlvbiBkZWVwRXF1YWwoYSwgYikge1xuICBpZiAoYSA9PSBiKVxuICAgIHJldHVybiB0cnVlXG5cbiAgaWYgKGEgPT0gbnVsbCB8fCBiID09IG51bGwpXG4gICAgcmV0dXJuIGZhbHNlXG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoYSkpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShiKSAmJiBhLmxlbmd0aCA9PT0gYi5sZW5ndGggJiYgYS5ldmVyeShmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgIHJldHVybiBkZWVwRXF1YWwoaXRlbSwgYltpbmRleF0pXG4gICAgfSlcbiAgfVxuXG4gIGlmICh0eXBlb2YgYSA9PT0gJ29iamVjdCcpIHtcbiAgICBmb3IgKGxldCBwIGluIGEpIHtcbiAgICAgIGlmICghYS5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBpZiAoYVtwXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChiW3BdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghYi5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH0gZWxzZSBpZiAoIWRlZXBFcXVhbChhW3BdLCBiW3BdKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgcmV0dXJuIFN0cmluZyhhKSA9PT0gU3RyaW5nKGIpXG59XG5cbmZ1bmN0aW9uIHBhcmFtc0FyZUFjdGl2ZShwYXJhbU5hbWVzLCBwYXJhbVZhbHVlcywgYWN0aXZlUGFyYW1zKSB7XG4gIC8vIEZJWE1FOiBUaGlzIGRvZXNuJ3Qgd29yayBvbiByZXBlYXRlZCBwYXJhbXMgaW4gYWN0aXZlUGFyYW1zLlxuICByZXR1cm4gcGFyYW1OYW1lcy5ldmVyeShmdW5jdGlvbiAocGFyYW1OYW1lLCBpbmRleCkge1xuICAgIHJldHVybiBTdHJpbmcocGFyYW1WYWx1ZXNbaW5kZXhdKSA9PT0gU3RyaW5nKGFjdGl2ZVBhcmFtc1twYXJhbU5hbWVdKVxuICB9KVxufVxuXG5mdW5jdGlvbiBnZXRNYXRjaGluZ1JvdXRlSW5kZXgocGF0aG5hbWUsIGFjdGl2ZVJvdXRlcywgYWN0aXZlUGFyYW1zKSB7XG4gIGxldCByZW1haW5pbmdQYXRobmFtZSA9IHBhdGhuYW1lLCBwYXJhbU5hbWVzID0gW10sIHBhcmFtVmFsdWVzID0gW11cblxuICBmb3IgKGxldCBpID0gMCwgbGVuID0gYWN0aXZlUm91dGVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgY29uc3Qgcm91dGUgPSBhY3RpdmVSb3V0ZXNbaV1cbiAgICBjb25zdCBwYXR0ZXJuID0gcm91dGUucGF0aCB8fCAnJ1xuXG4gICAgaWYgKHBhdHRlcm4uY2hhckF0KDApID09PSAnLycpIHtcbiAgICAgIHJlbWFpbmluZ1BhdGhuYW1lID0gcGF0aG5hbWVcbiAgICAgIHBhcmFtTmFtZXMgPSBbXVxuICAgICAgcGFyYW1WYWx1ZXMgPSBbXVxuICAgIH1cblxuICAgIGlmIChyZW1haW5pbmdQYXRobmFtZSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgbWF0Y2hlZCA9IG1hdGNoUGF0dGVybihwYXR0ZXJuLCByZW1haW5pbmdQYXRobmFtZSlcbiAgICAgIHJlbWFpbmluZ1BhdGhuYW1lID0gbWF0Y2hlZC5yZW1haW5pbmdQYXRobmFtZVxuICAgICAgcGFyYW1OYW1lcyA9IFsgLi4ucGFyYW1OYW1lcywgLi4ubWF0Y2hlZC5wYXJhbU5hbWVzIF1cbiAgICAgIHBhcmFtVmFsdWVzID0gWyAuLi5wYXJhbVZhbHVlcywgLi4ubWF0Y2hlZC5wYXJhbVZhbHVlcyBdXG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgcmVtYWluaW5nUGF0aG5hbWUgPT09ICcnICYmXG4gICAgICByb3V0ZS5wYXRoICYmXG4gICAgICBwYXJhbXNBcmVBY3RpdmUocGFyYW1OYW1lcywgcGFyYW1WYWx1ZXMsIGFjdGl2ZVBhcmFtcylcbiAgICApXG4gICAgICByZXR1cm4gaVxuICB9XG5cbiAgcmV0dXJuIG51bGxcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIHBhdGhuYW1lIG1hdGNoZXMgdGhlIGFjdGl2ZSByb3V0ZXNcbiAqIGFuZCBwYXJhbXMuXG4gKi9cbmZ1bmN0aW9uIHJvdXRlSXNBY3RpdmUocGF0aG5hbWUsIHJvdXRlcywgcGFyYW1zLCBpbmRleE9ubHkpIHtcbiAgY29uc3QgaSA9IGdldE1hdGNoaW5nUm91dGVJbmRleChwYXRobmFtZSwgcm91dGVzLCBwYXJhbXMpXG5cbiAgaWYgKGkgPT09IG51bGwpIHtcbiAgICAvLyBObyBtYXRjaC5cbiAgICByZXR1cm4gZmFsc2VcbiAgfSBlbHNlIGlmICghaW5kZXhPbmx5KSB7XG4gICAgLy8gQW55IG1hdGNoIGlzIGdvb2QgZW5vdWdoLlxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICAvLyBJZiBhbnkgcmVtYWluaW5nIHJvdXRlcyBwYXN0IHRoZSBtYXRjaCBpbmRleCBoYXZlIHBhdGhzLCB0aGVuIHdlIGNhbid0XG4gIC8vIGJlIG9uIHRoZSBpbmRleCByb3V0ZS5cbiAgcmV0dXJuIHJvdXRlcy5zbGljZShpICsgMSkuZXZlcnkocm91dGUgPT4gIXJvdXRlLnBhdGgpXG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGFsbCBrZXkvdmFsdWUgcGFpcnMgaW4gdGhlIGdpdmVuIHF1ZXJ5IGFyZVxuICogY3VycmVudGx5IGFjdGl2ZS5cbiAqL1xuZnVuY3Rpb24gcXVlcnlJc0FjdGl2ZShxdWVyeSwgYWN0aXZlUXVlcnkpIHtcbiAgaWYgKGFjdGl2ZVF1ZXJ5ID09IG51bGwpXG4gICAgcmV0dXJuIHF1ZXJ5ID09IG51bGxcblxuICBpZiAocXVlcnkgPT0gbnVsbClcbiAgICByZXR1cm4gdHJ1ZVxuXG4gIHJldHVybiBkZWVwRXF1YWwocXVlcnksIGFjdGl2ZVF1ZXJ5KVxufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhIDxMaW5rPiB0byB0aGUgZ2l2ZW4gcGF0aG5hbWUvcXVlcnkgY29tYmluYXRpb24gaXNcbiAqIGN1cnJlbnRseSBhY3RpdmUuXG4gKi9cbmZ1bmN0aW9uIGlzQWN0aXZlKHBhdGhuYW1lLCBxdWVyeSwgaW5kZXhPbmx5LCBsb2NhdGlvbiwgcm91dGVzLCBwYXJhbXMpIHtcbiAgaWYgKGxvY2F0aW9uID09IG51bGwpXG4gICAgcmV0dXJuIGZhbHNlXG5cbiAgaWYgKCFyb3V0ZUlzQWN0aXZlKHBhdGhuYW1lLCByb3V0ZXMsIHBhcmFtcywgaW5kZXhPbmx5KSlcbiAgICByZXR1cm4gZmFsc2VcblxuICByZXR1cm4gcXVlcnlJc0FjdGl2ZShxdWVyeSwgbG9jYXRpb24ucXVlcnkpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzQWN0aXZlXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL21vZHVsZXMvaXNBY3RpdmUuanNcbiAqKi8iLCJpbXBvcnQgeyBtYXBBc3luYyB9IGZyb20gJy4vQXN5bmNVdGlscydcblxuZnVuY3Rpb24gZ2V0Q29tcG9uZW50c0ZvclJvdXRlKGxvY2F0aW9uLCByb3V0ZSwgY2FsbGJhY2spIHtcbiAgaWYgKHJvdXRlLmNvbXBvbmVudCB8fCByb3V0ZS5jb21wb25lbnRzKSB7XG4gICAgY2FsbGJhY2sobnVsbCwgcm91dGUuY29tcG9uZW50IHx8IHJvdXRlLmNvbXBvbmVudHMpXG4gIH0gZWxzZSBpZiAocm91dGUuZ2V0Q29tcG9uZW50KSB7XG4gICAgcm91dGUuZ2V0Q29tcG9uZW50KGxvY2F0aW9uLCBjYWxsYmFjaylcbiAgfSBlbHNlIGlmIChyb3V0ZS5nZXRDb21wb25lbnRzKSB7XG4gICAgcm91dGUuZ2V0Q29tcG9uZW50cyhsb2NhdGlvbiwgY2FsbGJhY2spXG4gIH0gZWxzZSB7XG4gICAgY2FsbGJhY2soKVxuICB9XG59XG5cbi8qKlxuICogQXN5bmNocm9ub3VzbHkgZmV0Y2hlcyBhbGwgY29tcG9uZW50cyBuZWVkZWQgZm9yIHRoZSBnaXZlbiByb3V0ZXJcbiAqIHN0YXRlIGFuZCBjYWxscyBjYWxsYmFjayhlcnJvciwgY29tcG9uZW50cykgd2hlbiBmaW5pc2hlZC5cbiAqXG4gKiBOb3RlOiBUaGlzIG9wZXJhdGlvbiBtYXkgZmluaXNoIHN5bmNocm9ub3VzbHkgaWYgbm8gcm91dGVzIGhhdmUgYW5cbiAqIGFzeW5jaHJvbm91cyBnZXRDb21wb25lbnRzIG1ldGhvZC5cbiAqL1xuZnVuY3Rpb24gZ2V0Q29tcG9uZW50cyhuZXh0U3RhdGUsIGNhbGxiYWNrKSB7XG4gIG1hcEFzeW5jKG5leHRTdGF0ZS5yb3V0ZXMsIGZ1bmN0aW9uIChyb3V0ZSwgaW5kZXgsIGNhbGxiYWNrKSB7XG4gICAgZ2V0Q29tcG9uZW50c0ZvclJvdXRlKG5leHRTdGF0ZS5sb2NhdGlvbiwgcm91dGUsIGNhbGxiYWNrKVxuICB9LCBjYWxsYmFjaylcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0Q29tcG9uZW50c1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9tb2R1bGVzL2dldENvbXBvbmVudHMuanNcbiAqKi8iLCJpbXBvcnQgd2FybmluZyBmcm9tICd3YXJuaW5nJ1xuaW1wb3J0IHsgbG9vcEFzeW5jIH0gZnJvbSAnLi9Bc3luY1V0aWxzJ1xuaW1wb3J0IHsgbWF0Y2hQYXR0ZXJuIH0gZnJvbSAnLi9QYXR0ZXJuVXRpbHMnXG5pbXBvcnQgeyBjcmVhdGVSb3V0ZXMgfSBmcm9tICcuL1JvdXRlVXRpbHMnXG5cbmZ1bmN0aW9uIGdldENoaWxkUm91dGVzKHJvdXRlLCBsb2NhdGlvbiwgY2FsbGJhY2spIHtcbiAgaWYgKHJvdXRlLmNoaWxkUm91dGVzKSB7XG4gICAgY2FsbGJhY2sobnVsbCwgcm91dGUuY2hpbGRSb3V0ZXMpXG4gIH0gZWxzZSBpZiAocm91dGUuZ2V0Q2hpbGRSb3V0ZXMpIHtcbiAgICByb3V0ZS5nZXRDaGlsZFJvdXRlcyhsb2NhdGlvbiwgZnVuY3Rpb24gKGVycm9yLCBjaGlsZFJvdXRlcykge1xuICAgICAgY2FsbGJhY2soZXJyb3IsICFlcnJvciAmJiBjcmVhdGVSb3V0ZXMoY2hpbGRSb3V0ZXMpKVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgY2FsbGJhY2soKVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldEluZGV4Um91dGUocm91dGUsIGxvY2F0aW9uLCBjYWxsYmFjaykge1xuICBpZiAocm91dGUuaW5kZXhSb3V0ZSkge1xuICAgIGNhbGxiYWNrKG51bGwsIHJvdXRlLmluZGV4Um91dGUpXG4gIH0gZWxzZSBpZiAocm91dGUuZ2V0SW5kZXhSb3V0ZSkge1xuICAgIHJvdXRlLmdldEluZGV4Um91dGUobG9jYXRpb24sIGZ1bmN0aW9uIChlcnJvciwgaW5kZXhSb3V0ZSkge1xuICAgICAgY2FsbGJhY2soZXJyb3IsICFlcnJvciAmJiBjcmVhdGVSb3V0ZXMoaW5kZXhSb3V0ZSlbMF0pXG4gICAgfSlcbiAgfSBlbHNlIGlmIChyb3V0ZS5jaGlsZFJvdXRlcykge1xuICAgIGNvbnN0IHBhdGhsZXNzID0gcm91dGUuY2hpbGRSb3V0ZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIHJldHVybiAhb2JqLmhhc093blByb3BlcnR5KCdwYXRoJylcbiAgICB9KVxuXG4gICAgbG9vcEFzeW5jKHBhdGhsZXNzLmxlbmd0aCwgZnVuY3Rpb24gKGluZGV4LCBuZXh0LCBkb25lKSB7XG4gICAgICBnZXRJbmRleFJvdXRlKHBhdGhsZXNzW2luZGV4XSwgbG9jYXRpb24sIGZ1bmN0aW9uIChlcnJvciwgaW5kZXhSb3V0ZSkge1xuICAgICAgICBpZiAoZXJyb3IgfHwgaW5kZXhSb3V0ZSkge1xuICAgICAgICAgIGNvbnN0IHJvdXRlcyA9IFsgcGF0aGxlc3NbaW5kZXhdIF0uY29uY2F0KCBBcnJheS5pc0FycmF5KGluZGV4Um91dGUpID8gaW5kZXhSb3V0ZSA6IFsgaW5kZXhSb3V0ZSBdIClcbiAgICAgICAgICBkb25lKGVycm9yLCByb3V0ZXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV4dCgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSwgZnVuY3Rpb24gKGVyciwgcm91dGVzKSB7XG4gICAgICBjYWxsYmFjayhudWxsLCByb3V0ZXMpXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBjYWxsYmFjaygpXG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzaWduUGFyYW1zKHBhcmFtcywgcGFyYW1OYW1lcywgcGFyYW1WYWx1ZXMpIHtcbiAgcmV0dXJuIHBhcmFtTmFtZXMucmVkdWNlKGZ1bmN0aW9uIChwYXJhbXMsIHBhcmFtTmFtZSwgaW5kZXgpIHtcbiAgICBjb25zdCBwYXJhbVZhbHVlID0gcGFyYW1WYWx1ZXMgJiYgcGFyYW1WYWx1ZXNbaW5kZXhdXG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJhbXNbcGFyYW1OYW1lXSkpIHtcbiAgICAgIHBhcmFtc1twYXJhbU5hbWVdLnB1c2gocGFyYW1WYWx1ZSlcbiAgICB9IGVsc2UgaWYgKHBhcmFtTmFtZSBpbiBwYXJhbXMpIHtcbiAgICAgIHBhcmFtc1twYXJhbU5hbWVdID0gWyBwYXJhbXNbcGFyYW1OYW1lXSwgcGFyYW1WYWx1ZSBdXG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmFtc1twYXJhbU5hbWVdID0gcGFyYW1WYWx1ZVxuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXNcbiAgfSwgcGFyYW1zKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVQYXJhbXMocGFyYW1OYW1lcywgcGFyYW1WYWx1ZXMpIHtcbiAgcmV0dXJuIGFzc2lnblBhcmFtcyh7fSwgcGFyYW1OYW1lcywgcGFyYW1WYWx1ZXMpXG59XG5cbmZ1bmN0aW9uIG1hdGNoUm91dGVEZWVwKFxuICByb3V0ZSwgbG9jYXRpb24sIHJlbWFpbmluZ1BhdGhuYW1lLCBwYXJhbU5hbWVzLCBwYXJhbVZhbHVlcywgY2FsbGJhY2tcbikge1xuICBsZXQgcGF0dGVybiA9IHJvdXRlLnBhdGggfHwgJydcblxuICBpZiAocGF0dGVybi5jaGFyQXQoMCkgPT09ICcvJykge1xuICAgIHJlbWFpbmluZ1BhdGhuYW1lID0gbG9jYXRpb24ucGF0aG5hbWVcbiAgICBwYXJhbU5hbWVzID0gW11cbiAgICBwYXJhbVZhbHVlcyA9IFtdXG4gIH1cblxuICBpZiAocmVtYWluaW5nUGF0aG5hbWUgIT09IG51bGwpIHtcbiAgICBjb25zdCBtYXRjaGVkID0gbWF0Y2hQYXR0ZXJuKHBhdHRlcm4sIHJlbWFpbmluZ1BhdGhuYW1lKVxuICAgIHJlbWFpbmluZ1BhdGhuYW1lID0gbWF0Y2hlZC5yZW1haW5pbmdQYXRobmFtZVxuICAgIHBhcmFtTmFtZXMgPSBbIC4uLnBhcmFtTmFtZXMsIC4uLm1hdGNoZWQucGFyYW1OYW1lcyBdXG4gICAgcGFyYW1WYWx1ZXMgPSBbIC4uLnBhcmFtVmFsdWVzLCAuLi5tYXRjaGVkLnBhcmFtVmFsdWVzIF1cblxuICAgIGlmIChyZW1haW5pbmdQYXRobmFtZSA9PT0gJycgJiYgcm91dGUucGF0aCkge1xuICAgICAgY29uc3QgbWF0Y2ggPSB7XG4gICAgICAgIHJvdXRlczogWyByb3V0ZSBdLFxuICAgICAgICBwYXJhbXM6IGNyZWF0ZVBhcmFtcyhwYXJhbU5hbWVzLCBwYXJhbVZhbHVlcylcbiAgICAgIH1cblxuICAgICAgZ2V0SW5kZXhSb3V0ZShyb3V0ZSwgbG9jYXRpb24sIGZ1bmN0aW9uIChlcnJvciwgaW5kZXhSb3V0ZSkge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBjYWxsYmFjayhlcnJvcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpbmRleFJvdXRlKSkge1xuICAgICAgICAgICAgd2FybmluZyhcbiAgICAgICAgICAgICAgaW5kZXhSb3V0ZS5ldmVyeShyb3V0ZSA9PiAhcm91dGUucGF0aCksXG4gICAgICAgICAgICAgICdJbmRleCByb3V0ZXMgc2hvdWxkIG5vdCBoYXZlIHBhdGhzJ1xuICAgICAgICAgICAgKVxuICAgICAgICAgICAgbWF0Y2gucm91dGVzLnB1c2goLi4uaW5kZXhSb3V0ZSlcbiAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4Um91dGUpIHtcbiAgICAgICAgICAgIHdhcm5pbmcoXG4gICAgICAgICAgICAgICFpbmRleFJvdXRlLnBhdGgsXG4gICAgICAgICAgICAgICdJbmRleCByb3V0ZXMgc2hvdWxkIG5vdCBoYXZlIHBhdGhzJ1xuICAgICAgICAgICAgKVxuICAgICAgICAgICAgbWF0Y2gucm91dGVzLnB1c2goaW5kZXhSb3V0ZSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjYWxsYmFjayhudWxsLCBtYXRjaClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfVxuXG4gIGlmIChyZW1haW5pbmdQYXRobmFtZSAhPSBudWxsIHx8IHJvdXRlLmNoaWxkUm91dGVzKSB7XG4gICAgLy8gRWl0aGVyIGEpIHRoaXMgcm91dGUgbWF0Y2hlZCBhdCBsZWFzdCBzb21lIG9mIHRoZSBwYXRoIG9yIGIpXG4gICAgLy8gd2UgZG9uJ3QgaGF2ZSB0byBsb2FkIHRoaXMgcm91dGUncyBjaGlsZHJlbiBhc3luY2hyb25vdXNseS4gSW5cbiAgICAvLyBlaXRoZXIgY2FzZSBjb250aW51ZSBjaGVja2luZyBmb3IgbWF0Y2hlcyBpbiB0aGUgc3VidHJlZS5cbiAgICBnZXRDaGlsZFJvdXRlcyhyb3V0ZSwgbG9jYXRpb24sIGZ1bmN0aW9uIChlcnJvciwgY2hpbGRSb3V0ZXMpIHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhlcnJvcilcbiAgICAgIH0gZWxzZSBpZiAoY2hpbGRSb3V0ZXMpIHtcbiAgICAgICAgLy8gQ2hlY2sgdGhlIGNoaWxkIHJvdXRlcyB0byBzZWUgaWYgYW55IG9mIHRoZW0gbWF0Y2guXG4gICAgICAgIG1hdGNoUm91dGVzKGNoaWxkUm91dGVzLCBsb2NhdGlvbiwgZnVuY3Rpb24gKGVycm9yLCBtYXRjaCkge1xuICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyb3IpXG4gICAgICAgICAgfSBlbHNlIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgLy8gQSBjaGlsZCByb3V0ZSBtYXRjaGVkISBBdWdtZW50IHRoZSBtYXRjaCBhbmQgcGFzcyBpdCB1cCB0aGUgc3RhY2suXG4gICAgICAgICAgICBtYXRjaC5yb3V0ZXMudW5zaGlmdChyb3V0ZSlcbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIG1hdGNoKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgICAgfVxuICAgICAgICB9LCByZW1haW5pbmdQYXRobmFtZSwgcGFyYW1OYW1lcywgcGFyYW1WYWx1ZXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjaygpXG4gICAgICB9XG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBjYWxsYmFjaygpXG4gIH1cbn1cblxuLyoqXG4gKiBBc3luY2hyb25vdXNseSBtYXRjaGVzIHRoZSBnaXZlbiBsb2NhdGlvbiB0byBhIHNldCBvZiByb3V0ZXMgYW5kIGNhbGxzXG4gKiBjYWxsYmFjayhlcnJvciwgc3RhdGUpIHdoZW4gZmluaXNoZWQuIFRoZSBzdGF0ZSBvYmplY3Qgd2lsbCBoYXZlIHRoZVxuICogZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKlxuICogLSByb3V0ZXMgICAgICAgQW4gYXJyYXkgb2Ygcm91dGVzIHRoYXQgbWF0Y2hlZCwgaW4gaGllcmFyY2hpY2FsIG9yZGVyXG4gKiAtIHBhcmFtcyAgICAgICBBbiBvYmplY3Qgb2YgVVJMIHBhcmFtZXRlcnNcbiAqXG4gKiBOb3RlOiBUaGlzIG9wZXJhdGlvbiBtYXkgZmluaXNoIHN5bmNocm9ub3VzbHkgaWYgbm8gcm91dGVzIGhhdmUgYW5cbiAqIGFzeW5jaHJvbm91cyBnZXRDaGlsZFJvdXRlcyBtZXRob2QuXG4gKi9cbmZ1bmN0aW9uIG1hdGNoUm91dGVzKFxuICByb3V0ZXMsIGxvY2F0aW9uLCBjYWxsYmFjayxcbiAgcmVtYWluaW5nUGF0aG5hbWU9bG9jYXRpb24ucGF0aG5hbWUsIHBhcmFtTmFtZXM9W10sIHBhcmFtVmFsdWVzPVtdXG4pIHtcbiAgbG9vcEFzeW5jKHJvdXRlcy5sZW5ndGgsIGZ1bmN0aW9uIChpbmRleCwgbmV4dCwgZG9uZSkge1xuICAgIG1hdGNoUm91dGVEZWVwKFxuICAgICAgcm91dGVzW2luZGV4XSwgbG9jYXRpb24sIHJlbWFpbmluZ1BhdGhuYW1lLCBwYXJhbU5hbWVzLCBwYXJhbVZhbHVlcyxcbiAgICAgIGZ1bmN0aW9uIChlcnJvciwgbWF0Y2gpIHtcbiAgICAgICAgaWYgKGVycm9yIHx8IG1hdGNoKSB7XG4gICAgICAgICAgZG9uZShlcnJvciwgbWF0Y2gpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV4dCgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApXG4gIH0sIGNhbGxiYWNrKVxufVxuXG5leHBvcnQgZGVmYXVsdCBtYXRjaFJvdXRlc1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9tb2R1bGVzL21hdGNoUm91dGVzLmpzXG4gKiovIiwiaW1wb3J0IHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG5cbmNvbnN0IHsgZnVuYywgb2JqZWN0LCBhcnJheU9mLCBvbmVPZlR5cGUsIGVsZW1lbnQsIHNoYXBlLCBzdHJpbmcgfSA9IFByb3BUeXBlc1xuXG5leHBvcnQgZnVuY3Rpb24gZmFsc3kocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gIGlmIChwcm9wc1twcm9wTmFtZV0pXG4gICAgcmV0dXJuIG5ldyBFcnJvcihgPCR7Y29tcG9uZW50TmFtZX0+IHNob3VsZCBub3QgaGF2ZSBhIFwiJHtwcm9wTmFtZX1cIiBwcm9wYClcbn1cblxuZXhwb3J0IGNvbnN0IGhpc3RvcnkgPSBzaGFwZSh7XG4gIGxpc3RlbjogZnVuYy5pc1JlcXVpcmVkLFxuICBwdXNoU3RhdGU6IGZ1bmMuaXNSZXF1aXJlZCxcbiAgcmVwbGFjZVN0YXRlOiBmdW5jLmlzUmVxdWlyZWQsXG4gIGdvOiBmdW5jLmlzUmVxdWlyZWRcbn0pXG5cbmV4cG9ydCBjb25zdCBsb2NhdGlvbiA9IHNoYXBlKHtcbiAgcGF0aG5hbWU6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBzZWFyY2g6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBzdGF0ZTogb2JqZWN0LFxuICBhY3Rpb246IHN0cmluZy5pc1JlcXVpcmVkLFxuICBrZXk6IHN0cmluZ1xufSlcblxuZXhwb3J0IGNvbnN0IGNvbXBvbmVudCA9IG9uZU9mVHlwZShbIGZ1bmMsIHN0cmluZyBdKVxuZXhwb3J0IGNvbnN0IGNvbXBvbmVudHMgPSBvbmVPZlR5cGUoWyBjb21wb25lbnQsIG9iamVjdCBdKVxuZXhwb3J0IGNvbnN0IHJvdXRlID0gb25lT2ZUeXBlKFsgb2JqZWN0LCBlbGVtZW50IF0pXG5leHBvcnQgY29uc3Qgcm91dGVzID0gb25lT2ZUeXBlKFsgcm91dGUsIGFycmF5T2Yocm91dGUpIF0pXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZmFsc3ksXG4gIGhpc3RvcnksXG4gIGxvY2F0aW9uLFxuICBjb21wb25lbnQsXG4gIGNvbXBvbmVudHMsXG4gIHJvdXRlXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL21vZHVsZXMvUHJvcFR5cGVzLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuXG5jb25zdCB7IGJvb2wsIG9iamVjdCwgc3RyaW5nLCBmdW5jIH0gPSBSZWFjdC5Qcm9wVHlwZXNcblxuZnVuY3Rpb24gaXNMZWZ0Q2xpY2tFdmVudChldmVudCkge1xuICByZXR1cm4gZXZlbnQuYnV0dG9uID09PSAwXG59XG5cbmZ1bmN0aW9uIGlzTW9kaWZpZWRFdmVudChldmVudCkge1xuICByZXR1cm4gISEoZXZlbnQubWV0YUtleSB8fCBldmVudC5hbHRLZXkgfHwgZXZlbnQuY3RybEtleSB8fCBldmVudC5zaGlmdEtleSlcbn1cblxuZnVuY3Rpb24gaXNFbXB0eU9iamVjdChvYmplY3QpIHtcbiAgZm9yIChsZXQgcCBpbiBvYmplY3QpXG4gICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShwKSlcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gIHJldHVybiB0cnVlXG59XG5cbi8qKlxuICogQSA8TGluaz4gaXMgdXNlZCB0byBjcmVhdGUgYW4gPGE+IGVsZW1lbnQgdGhhdCBsaW5rcyB0byBhIHJvdXRlLlxuICogV2hlbiB0aGF0IHJvdXRlIGlzIGFjdGl2ZSwgdGhlIGxpbmsgZ2V0cyB0aGUgdmFsdWUgb2YgaXRzXG4gKiBgYWN0aXZlQ2xhc3NOYW1lYCBwcm9wXG4gKlxuICogRm9yIGV4YW1wbGUsIGFzc3VtaW5nIHlvdSBoYXZlIHRoZSBmb2xsb3dpbmcgcm91dGU6XG4gKlxuICogICA8Um91dGUgcGF0aD1cIi9wb3N0cy86cG9zdElEXCIgY29tcG9uZW50PXtQb3N0fSAvPlxuICpcbiAqIFlvdSBjb3VsZCB1c2UgdGhlIGZvbGxvd2luZyBjb21wb25lbnQgdG8gbGluayB0byB0aGF0IHJvdXRlOlxuICpcbiAqICAgPExpbmsgdG89e2AvcG9zdHMvJHtwb3N0LmlkfWB9IC8+XG4gKlxuICogTGlua3MgbWF5IHBhc3MgYWxvbmcgbG9jYXRpb24gc3RhdGUgYW5kL29yIHF1ZXJ5IHN0cmluZyBwYXJhbWV0ZXJzXG4gKiBpbiB0aGUgc3RhdGUvcXVlcnkgcHJvcHMsIHJlc3BlY3RpdmVseS5cbiAqXG4gKiAgIDxMaW5rIC4uLiBxdWVyeT17eyBzaG93OiB0cnVlIH19IHN0YXRlPXt7IHRoZTogJ3N0YXRlJyB9fSAvPlxuICovXG5jbGFzcyBMaW5rIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXG4gIGhhbmRsZUNsaWNrKGV2ZW50KSB7XG4gICAgbGV0IGFsbG93VHJhbnNpdGlvbiA9IHRydWVcblxuICAgIGlmICh0aGlzLnByb3BzLm9uQ2xpY2spXG4gICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZXZlbnQpXG5cbiAgICBpZiAoaXNNb2RpZmllZEV2ZW50KGV2ZW50KSB8fCAhaXNMZWZ0Q2xpY2tFdmVudChldmVudCkpXG4gICAgICByZXR1cm5cblxuICAgIGlmIChldmVudC5kZWZhdWx0UHJldmVudGVkID09PSB0cnVlKVxuICAgICAgYWxsb3dUcmFuc2l0aW9uID0gZmFsc2VcblxuICAgIC8vIElmIHRhcmdldCBwcm9wIGlzIHNldCAoZS5nLiB0byBcIl9ibGFua1wiKSBsZXQgYnJvd3NlciBoYW5kbGUgbGluay5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWY6IHVudGVzdGFibGUgd2l0aCBLYXJtYSAqL1xuICAgIGlmICh0aGlzLnByb3BzLnRhcmdldCkge1xuICAgICAgaWYgKCFhbGxvd1RyYW5zaXRpb24pXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgaWYgKGFsbG93VHJhbnNpdGlvbikge1xuICAgICAgbGV0IHsgc3RhdGUsIHRvLCBxdWVyeSwgaGFzaCB9ID0gdGhpcy5wcm9wc1xuXG4gICAgICBpZiAoaGFzaClcbiAgICAgICAgdG8gKz0gaGFzaFxuXG4gICAgICB0aGlzLmNvbnRleHQuaGlzdG9yeS5wdXNoU3RhdGUoc3RhdGUsIHRvLCBxdWVyeSlcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyB0bywgcXVlcnksIGhhc2gsIHN0YXRlLCBhY3RpdmVDbGFzc05hbWUsIGFjdGl2ZVN0eWxlLCBvbmx5QWN0aXZlT25JbmRleCwgLi4ucHJvcHMgfSA9IHRoaXMucHJvcHNcblxuICAgIC8vIE1hbnVhbGx5IG92ZXJyaWRlIG9uQ2xpY2suXG4gICAgcHJvcHMub25DbGljayA9IChlKSA9PiB0aGlzLmhhbmRsZUNsaWNrKGUpXG5cbiAgICAvLyBJZ25vcmUgaWYgcmVuZGVyZWQgb3V0c2lkZSB0aGUgY29udGV4dCBvZiBoaXN0b3J5LCBzaW1wbGlmaWVzIHVuaXQgdGVzdGluZy5cbiAgICBjb25zdCB7IGhpc3RvcnkgfSA9IHRoaXMuY29udGV4dFxuICAgIGlmIChoaXN0b3J5KSB7XG4gICAgICBwcm9wcy5ocmVmID0gaGlzdG9yeS5jcmVhdGVIcmVmKHRvLCBxdWVyeSlcblxuICAgICAgaWYgKGhhc2gpXG4gICAgICAgIHByb3BzLmhyZWYgKz0gaGFzaFxuXG4gICAgICBpZiAoYWN0aXZlQ2xhc3NOYW1lIHx8IChhY3RpdmVTdHlsZSAhPSBudWxsICYmICFpc0VtcHR5T2JqZWN0KGFjdGl2ZVN0eWxlKSkpIHtcbiAgICAgICAgaWYgKGhpc3RvcnkuaXNBY3RpdmUodG8sIHF1ZXJ5LCBvbmx5QWN0aXZlT25JbmRleCkpIHtcbiAgICAgICAgICBpZiAoYWN0aXZlQ2xhc3NOYW1lKVxuICAgICAgICAgICAgcHJvcHMuY2xhc3NOYW1lICs9IHByb3BzLmNsYXNzTmFtZSA9PT0gJycgPyBhY3RpdmVDbGFzc05hbWUgOiBgICR7YWN0aXZlQ2xhc3NOYW1lfWBcblxuICAgICAgICAgIGlmIChhY3RpdmVTdHlsZSlcbiAgICAgICAgICAgIHByb3BzLnN0eWxlID0geyAuLi5wcm9wcy5zdHlsZSwgLi4uYWN0aXZlU3R5bGUgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIDxhIHsuLi5wcm9wc30gLz5cbiAgfVxuXG59XG5cbkxpbmsuY29udGV4dFR5cGVzID0ge1xuICBoaXN0b3J5OiBvYmplY3Rcbn1cblxuTGluay5wcm9wVHlwZXMgPSB7XG4gIHRvOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgcXVlcnk6IG9iamVjdCxcbiAgaGFzaDogc3RyaW5nLFxuICBzdGF0ZTogb2JqZWN0LFxuICBhY3RpdmVTdHlsZTogb2JqZWN0LFxuICBhY3RpdmVDbGFzc05hbWU6IHN0cmluZyxcbiAgb25seUFjdGl2ZU9uSW5kZXg6IGJvb2wuaXNSZXF1aXJlZCxcbiAgb25DbGljazogZnVuY1xufVxuXG5MaW5rLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25seUFjdGl2ZU9uSW5kZXg6IGZhbHNlLFxuICBjbGFzc05hbWU6ICcnLFxuICBzdHlsZToge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGlua1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9tb2R1bGVzL0xpbmsuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgTGluayBmcm9tICcuL0xpbmsnXG5cbi8qKlxuICogQW4gPEluZGV4TGluaz4gaXMgdXNlZCB0byBsaW5rIHRvIGFuIDxJbmRleFJvdXRlPi5cbiAqL1xuY2xhc3MgSW5kZXhMaW5rIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIDxMaW5rIHsuLi50aGlzLnByb3BzfSBvbmx5QWN0aXZlT25JbmRleD17dHJ1ZX0gLz5cbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEluZGV4TGlua1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9tb2R1bGVzL0luZGV4TGluay5qc1xuICoqLyIsImltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnXG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCdcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBSZWRpcmVjdCBmcm9tICcuL1JlZGlyZWN0J1xuaW1wb3J0IHsgZmFsc3kgfSBmcm9tICcuL1Byb3BUeXBlcydcblxuY29uc3QgeyBzdHJpbmcsIG9iamVjdCB9ID0gUmVhY3QuUHJvcFR5cGVzXG5cbi8qKlxuICogQW4gPEluZGV4UmVkaXJlY3Q+IGlzIHVzZWQgdG8gcmVkaXJlY3QgZnJvbSBhbiBpbmRleFJvdXRlLlxuICovXG5jbGFzcyBJbmRleFJlZGlyZWN0IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogc2FuaXR5IGNoZWNrICovXG4gIHJlbmRlcigpIHtcbiAgICBpbnZhcmlhbnQoXG4gICAgICBmYWxzZSxcbiAgICAgICc8SW5kZXhSZWRpcmVjdD4gZWxlbWVudHMgYXJlIGZvciByb3V0ZXIgY29uZmlndXJhdGlvbiBvbmx5IGFuZCBzaG91bGQgbm90IGJlIHJlbmRlcmVkJ1xuICAgIClcbiAgfVxuXG59XG5cbkluZGV4UmVkaXJlY3QucHJvcFR5cGVzID0ge1xuICB0bzogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHF1ZXJ5OiBvYmplY3QsXG4gIHN0YXRlOiBvYmplY3QsXG4gIG9uRW50ZXI6IGZhbHN5LFxuICBjaGlsZHJlbjogZmFsc3lcbn1cblxuSW5kZXhSZWRpcmVjdC5jcmVhdGVSb3V0ZUZyb21SZWFjdEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgcGFyZW50Um91dGUpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2U6IHNhbml0eSBjaGVjayAqL1xuICBpZiAocGFyZW50Um91dGUpIHtcbiAgICBwYXJlbnRSb3V0ZS5pbmRleFJvdXRlID0gUmVkaXJlY3QuY3JlYXRlUm91dGVGcm9tUmVhY3RFbGVtZW50KGVsZW1lbnQpXG4gIH0gZWxzZSB7XG4gICAgd2FybmluZyhcbiAgICAgIGZhbHNlLFxuICAgICAgJ0FuIDxJbmRleFJlZGlyZWN0PiBkb2VzIG5vdCBtYWtlIHNlbnNlIGF0IHRoZSByb290IG9mIHlvdXIgcm91dGUgY29uZmlnJ1xuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbmRleFJlZGlyZWN0XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL21vZHVsZXMvSW5kZXhSZWRpcmVjdC5qc1xuICoqLyIsImltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50J1xuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY3JlYXRlUm91dGVGcm9tUmVhY3RFbGVtZW50IH0gZnJvbSAnLi9Sb3V0ZVV0aWxzJ1xuaW1wb3J0IHsgZm9ybWF0UGF0dGVybiB9IGZyb20gJy4vUGF0dGVyblV0aWxzJ1xuaW1wb3J0IHsgZmFsc3kgfSBmcm9tICcuL1Byb3BUeXBlcydcblxuY29uc3QgeyBzdHJpbmcsIG9iamVjdCB9ID0gUmVhY3QuUHJvcFR5cGVzXG5cbi8qKlxuICogQSA8UmVkaXJlY3Q+IGlzIHVzZWQgdG8gZGVjbGFyZSBhbm90aGVyIFVSTCBwYXRoIGEgY2xpZW50IHNob3VsZFxuICogYmUgc2VudCB0byB3aGVuIHRoZXkgcmVxdWVzdCBhIGdpdmVuIFVSTC5cbiAqXG4gKiBSZWRpcmVjdHMgYXJlIHBsYWNlZCBhbG9uZ3NpZGUgcm91dGVzIGluIHRoZSByb3V0ZSBjb25maWd1cmF0aW9uXG4gKiBhbmQgYXJlIHRyYXZlcnNlZCBpbiB0aGUgc2FtZSBtYW5uZXIuXG4gKi9cbmNsYXNzIFJlZGlyZWN0IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogc2FuaXR5IGNoZWNrICovXG4gIHJlbmRlcigpIHtcbiAgICBpbnZhcmlhbnQoXG4gICAgICBmYWxzZSxcbiAgICAgICc8UmVkaXJlY3Q+IGVsZW1lbnRzIGFyZSBmb3Igcm91dGVyIGNvbmZpZ3VyYXRpb24gb25seSBhbmQgc2hvdWxkIG5vdCBiZSByZW5kZXJlZCdcbiAgICApXG4gIH1cblxufVxuXG5SZWRpcmVjdC5jcmVhdGVSb3V0ZUZyb21SZWFjdEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICBjb25zdCByb3V0ZSA9IGNyZWF0ZVJvdXRlRnJvbVJlYWN0RWxlbWVudChlbGVtZW50KVxuXG4gIGlmIChyb3V0ZS5mcm9tKVxuICAgIHJvdXRlLnBhdGggPSByb3V0ZS5mcm9tXG5cbiAgcm91dGUub25FbnRlciA9IGZ1bmN0aW9uIChuZXh0U3RhdGUsIHJlcGxhY2VTdGF0ZSkge1xuICAgIGNvbnN0IHsgbG9jYXRpb24sIHBhcmFtcyB9ID0gbmV4dFN0YXRlXG5cbiAgICBsZXQgcGF0aG5hbWVcbiAgICBpZiAocm91dGUudG8uY2hhckF0KDApID09PSAnLycpIHtcbiAgICAgIHBhdGhuYW1lID0gZm9ybWF0UGF0dGVybihyb3V0ZS50bywgcGFyYW1zKVxuICAgIH0gZWxzZSBpZiAoIXJvdXRlLnRvKSB7XG4gICAgICBwYXRobmFtZSA9IGxvY2F0aW9uLnBhdGhuYW1lXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCByb3V0ZUluZGV4ID0gbmV4dFN0YXRlLnJvdXRlcy5pbmRleE9mKHJvdXRlKVxuICAgICAgbGV0IHBhcmVudFBhdHRlcm4gPSBSZWRpcmVjdC5nZXRSb3V0ZVBhdHRlcm4obmV4dFN0YXRlLnJvdXRlcywgcm91dGVJbmRleCAtIDEpXG4gICAgICBsZXQgcGF0dGVybiA9IHBhcmVudFBhdHRlcm4ucmVwbGFjZSgvXFwvKiQvLCAnLycpICsgcm91dGUudG9cbiAgICAgIHBhdGhuYW1lID0gZm9ybWF0UGF0dGVybihwYXR0ZXJuLCBwYXJhbXMpXG4gICAgfVxuXG4gICAgcmVwbGFjZVN0YXRlKFxuICAgICAgcm91dGUuc3RhdGUgfHwgbG9jYXRpb24uc3RhdGUsXG4gICAgICBwYXRobmFtZSxcbiAgICAgIHJvdXRlLnF1ZXJ5IHx8IGxvY2F0aW9uLnF1ZXJ5XG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHJvdXRlXG59XG5cblJlZGlyZWN0LmdldFJvdXRlUGF0dGVybiA9IGZ1bmN0aW9uIChyb3V0ZXMsIHJvdXRlSW5kZXgpIHtcbiAgbGV0IHBhcmVudFBhdHRlcm4gPSAnJ1xuXG4gIGZvciAobGV0IGkgPSByb3V0ZUluZGV4OyBpID49IDA7IGktLSkge1xuICAgIGxldCByb3V0ZSA9IHJvdXRlc1tpXVxuICAgIGxldCBwYXR0ZXJuID0gcm91dGUucGF0aCB8fCAnJ1xuICAgIHBhcmVudFBhdHRlcm4gPSBwYXR0ZXJuLnJlcGxhY2UoL1xcLyokLywgJy8nKSArIHBhcmVudFBhdHRlcm5cblxuICAgIGlmIChwYXR0ZXJuLmluZGV4T2YoJy8nKSA9PT0gMClcbiAgICAgIGJyZWFrXG4gIH1cblxuICByZXR1cm4gJy8nICsgcGFyZW50UGF0dGVyblxufVxuXG5SZWRpcmVjdC5wcm9wVHlwZXMgPSB7XG4gIHBhdGg6IHN0cmluZyxcbiAgZnJvbTogc3RyaW5nLCAvLyBBbGlhcyBmb3IgcGF0aFxuICB0bzogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHF1ZXJ5OiBvYmplY3QsXG4gIHN0YXRlOiBvYmplY3QsXG4gIG9uRW50ZXI6IGZhbHN5LFxuICBjaGlsZHJlbjogZmFsc3lcbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVkaXJlY3RcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvbW9kdWxlcy9SZWRpcmVjdC5qc1xuICoqLyIsImltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnXG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCdcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNyZWF0ZVJvdXRlRnJvbVJlYWN0RWxlbWVudCB9IGZyb20gJy4vUm91dGVVdGlscydcbmltcG9ydCB7IGNvbXBvbmVudCwgY29tcG9uZW50cywgZmFsc3kgfSBmcm9tICcuL1Byb3BUeXBlcydcblxuY29uc3QgeyBmdW5jIH0gPSBSZWFjdC5Qcm9wVHlwZXNcblxuLyoqXG4gKiBBbiA8SW5kZXhSb3V0ZT4gaXMgdXNlZCB0byBzcGVjaWZ5IGl0cyBwYXJlbnQncyA8Um91dGUgaW5kZXhSb3V0ZT4gaW5cbiAqIGEgSlNYIHJvdXRlIGNvbmZpZy5cbiAqL1xuY2xhc3MgSW5kZXhSb3V0ZSBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IHNhbml0eSBjaGVjayAqL1xuICByZW5kZXIoKSB7XG4gICAgaW52YXJpYW50KFxuICAgICAgZmFsc2UsXG4gICAgICAnPEluZGV4Um91dGU+IGVsZW1lbnRzIGFyZSBmb3Igcm91dGVyIGNvbmZpZ3VyYXRpb24gb25seSBhbmQgc2hvdWxkIG5vdCBiZSByZW5kZXJlZCdcbiAgICApXG4gIH1cbiAgXG59XG5cbkluZGV4Um91dGUucHJvcFR5cGVzID0ge1xuICBwYXRoOiBmYWxzeSxcbiAgY29tcG9uZW50LFxuICBjb21wb25lbnRzLFxuICBnZXRDb21wb25lbnQ6IGZ1bmMsXG4gIGdldENvbXBvbmVudHM6IGZ1bmNcbn1cblxuSW5kZXhSb3V0ZS5jcmVhdGVSb3V0ZUZyb21SZWFjdEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgcGFyZW50Um91dGUpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2U6IHNhbml0eSBjaGVjayAqL1xuICBpZiAocGFyZW50Um91dGUpIHtcbiAgICBwYXJlbnRSb3V0ZS5pbmRleFJvdXRlID0gY3JlYXRlUm91dGVGcm9tUmVhY3RFbGVtZW50KGVsZW1lbnQpXG4gIH0gZWxzZSB7XG4gICAgd2FybmluZyhcbiAgICAgIGZhbHNlLFxuICAgICAgJ0FuIDxJbmRleFJvdXRlPiBkb2VzIG5vdCBtYWtlIHNlbnNlIGF0IHRoZSByb290IG9mIHlvdXIgcm91dGUgY29uZmlnJ1xuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbmRleFJvdXRlXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL21vZHVsZXMvSW5kZXhSb3V0ZS5qc1xuICoqLyIsImltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50J1xuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY3JlYXRlUm91dGVGcm9tUmVhY3RFbGVtZW50IH0gZnJvbSAnLi9Sb3V0ZVV0aWxzJ1xuaW1wb3J0IHsgY29tcG9uZW50LCBjb21wb25lbnRzIH0gZnJvbSAnLi9Qcm9wVHlwZXMnXG5cbmNvbnN0IHsgc3RyaW5nLCBmdW5jIH0gPSBSZWFjdC5Qcm9wVHlwZXNcblxuLyoqXG4gKiBBIDxSb3V0ZT4gaXMgdXNlZCB0byBkZWNsYXJlIHdoaWNoIGNvbXBvbmVudHMgYXJlIHJlbmRlcmVkIHRvIHRoZVxuICogcGFnZSB3aGVuIHRoZSBVUkwgbWF0Y2hlcyBhIGdpdmVuIHBhdHRlcm4uXG4gKlxuICogUm91dGVzIGFyZSBhcnJhbmdlZCBpbiBhIG5lc3RlZCB0cmVlIHN0cnVjdHVyZS4gV2hlbiBhIG5ldyBVUkwgaXNcbiAqIHJlcXVlc3RlZCwgdGhlIHRyZWUgaXMgc2VhcmNoZWQgZGVwdGgtZmlyc3QgdG8gZmluZCBhIHJvdXRlIHdob3NlXG4gKiBwYXRoIG1hdGNoZXMgdGhlIFVSTC4gIFdoZW4gb25lIGlzIGZvdW5kLCBhbGwgcm91dGVzIGluIHRoZSB0cmVlXG4gKiB0aGF0IGxlYWQgdG8gaXQgYXJlIGNvbnNpZGVyZWQgXCJhY3RpdmVcIiBhbmQgdGhlaXIgY29tcG9uZW50cyBhcmVcbiAqIHJlbmRlcmVkIGludG8gdGhlIERPTSwgbmVzdGVkIGluIHRoZSBzYW1lIG9yZGVyIGFzIGluIHRoZSB0cmVlLlxuICovXG5jbGFzcyBSb3V0ZSBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IHNhbml0eSBjaGVjayAqL1xuICByZW5kZXIoKSB7XG4gICAgaW52YXJpYW50KFxuICAgICAgZmFsc2UsXG4gICAgICAnPFJvdXRlPiBlbGVtZW50cyBhcmUgZm9yIHJvdXRlciBjb25maWd1cmF0aW9uIG9ubHkgYW5kIHNob3VsZCBub3QgYmUgcmVuZGVyZWQnXG4gICAgKVxuICB9XG5cbn1cblxuUm91dGUuY3JlYXRlUm91dGVGcm9tUmVhY3RFbGVtZW50ID0gY3JlYXRlUm91dGVGcm9tUmVhY3RFbGVtZW50XG5cblJvdXRlLnByb3BUeXBlcyA9IHtcbiAgcGF0aDogc3RyaW5nLFxuICBjb21wb25lbnQsXG4gIGNvbXBvbmVudHMsXG4gIGdldENvbXBvbmVudDogZnVuYyxcbiAgZ2V0Q29tcG9uZW50czogZnVuY1xufVxuXG5leHBvcnQgZGVmYXVsdCBSb3V0ZVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9tb2R1bGVzL1JvdXRlLmpzXG4gKiovIiwiaW1wb3J0IHsgaGlzdG9yeSB9IGZyb20gJy4vUHJvcFR5cGVzJ1xuXG4vKipcbiAqIEEgbWl4aW4gdGhhdCBhZGRzIHRoZSBcImhpc3RvcnlcIiBpbnN0YW5jZSB2YXJpYWJsZSB0byBjb21wb25lbnRzLlxuICovXG5jb25zdCBIaXN0b3J5ID0ge1xuXG4gIGNvbnRleHRUeXBlczoge1xuICAgIGhpc3RvcnlcbiAgfSxcblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdGhpcy5oaXN0b3J5ID0gdGhpcy5jb250ZXh0Lmhpc3RvcnlcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEhpc3RvcnlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvbW9kdWxlcy9IaXN0b3J5LmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnXG5cbmNvbnN0IHsgb2JqZWN0IH0gPSBSZWFjdC5Qcm9wVHlwZXNcblxuLyoqXG4gKiBUaGUgTGlmZWN5Y2xlIG1peGluIGFkZHMgdGhlIHJvdXRlcldpbGxMZWF2ZSBsaWZlY3ljbGUgbWV0aG9kIHRvIGFcbiAqIGNvbXBvbmVudCB0aGF0IG1heSBiZSB1c2VkIHRvIGNhbmNlbCBhIHRyYW5zaXRpb24gb3IgcHJvbXB0IHRoZSB1c2VyXG4gKiBmb3IgY29uZmlybWF0aW9uLlxuICpcbiAqIE9uIHN0YW5kYXJkIHRyYW5zaXRpb25zLCByb3V0ZXJXaWxsTGVhdmUgcmVjZWl2ZXMgYSBzaW5nbGUgYXJndW1lbnQ6IHRoZVxuICogbG9jYXRpb24gd2UncmUgdHJhbnNpdGlvbmluZyB0by4gVG8gY2FuY2VsIHRoZSB0cmFuc2l0aW9uLCByZXR1cm4gZmFsc2UuXG4gKiBUbyBwcm9tcHQgdGhlIHVzZXIgZm9yIGNvbmZpcm1hdGlvbiwgcmV0dXJuIGEgcHJvbXB0IG1lc3NhZ2UgKHN0cmluZykuXG4gKlxuICogRHVyaW5nIHRoZSBiZWZvcmV1bmxvYWQgZXZlbnQgKGFzc3VtaW5nIHlvdSdyZSB1c2luZyB0aGUgdXNlQmVmb3JlVW5sb2FkXG4gKiBoaXN0b3J5IGVuaGFuY2VyKSwgcm91dGVyV2lsbExlYXZlIGRvZXMgbm90IHJlY2VpdmUgYSBsb2NhdGlvbiBvYmplY3RcbiAqIGJlY2F1c2UgaXQgaXNuJ3QgcG9zc2libGUgZm9yIHVzIHRvIGtub3cgdGhlIGxvY2F0aW9uIHdlJ3JlIHRyYW5zaXRpb25pbmdcbiAqIHRvLiBJbiB0aGlzIGNhc2Ugcm91dGVyV2lsbExlYXZlIG11c3QgcmV0dXJuIGEgcHJvbXB0IG1lc3NhZ2UgdG8gcHJldmVudFxuICogdGhlIHVzZXIgZnJvbSBjbG9zaW5nIHRoZSB3aW5kb3cvdGFiLlxuICovXG5jb25zdCBMaWZlY3ljbGUgPSB7XG5cbiAgY29udGV4dFR5cGVzOiB7XG4gICAgaGlzdG9yeTogb2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgLy8gTmVzdGVkIGNoaWxkcmVuIHJlY2VpdmUgdGhlIHJvdXRlIGFzIGNvbnRleHQsIGVpdGhlclxuICAgIC8vIHNldCBieSB0aGUgcm91dGUgY29tcG9uZW50IHVzaW5nIHRoZSBSb3V0ZUNvbnRleHQgbWl4aW5cbiAgICAvLyBvciBieSBzb21lIG90aGVyIGFuY2VzdG9yLlxuICAgIHJvdXRlOiBvYmplY3RcbiAgfSxcblxuICBwcm9wVHlwZXM6IHtcbiAgICAvLyBSb3V0ZSBjb21wb25lbnRzIHJlY2VpdmUgdGhlIHJvdXRlIG9iamVjdCBhcyBhIHByb3AuXG4gICAgcm91dGU6IG9iamVjdFxuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGludmFyaWFudChcbiAgICAgIHRoaXMucm91dGVyV2lsbExlYXZlLFxuICAgICAgJ1RoZSBMaWZlY3ljbGUgbWl4aW4gcmVxdWlyZXMgeW91IHRvIGRlZmluZSBhIHJvdXRlcldpbGxMZWF2ZSBtZXRob2QnXG4gICAgKVxuXG4gICAgY29uc3Qgcm91dGUgPSB0aGlzLnByb3BzLnJvdXRlIHx8IHRoaXMuY29udGV4dC5yb3V0ZVxuXG4gICAgaW52YXJpYW50KFxuICAgICAgcm91dGUsXG4gICAgICAnVGhlIExpZmVjeWNsZSBtaXhpbiBtdXN0IGJlIHVzZWQgb24gZWl0aGVyIGEpIGEgPFJvdXRlIGNvbXBvbmVudD4gb3IgJyArXG4gICAgICAnYikgYSBkZXNjZW5kYW50IG9mIGEgPFJvdXRlIGNvbXBvbmVudD4gdGhhdCB1c2VzIHRoZSBSb3V0ZUNvbnRleHQgbWl4aW4nXG4gICAgKVxuXG4gICAgdGhpcy5fdW5saXN0ZW5CZWZvcmVMZWF2aW5nUm91dGUgPSB0aGlzLmNvbnRleHQuaGlzdG9yeS5saXN0ZW5CZWZvcmVMZWF2aW5nUm91dGUoXG4gICAgICByb3V0ZSxcbiAgICAgIHRoaXMucm91dGVyV2lsbExlYXZlXG4gICAgKVxuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGlmICh0aGlzLl91bmxpc3RlbkJlZm9yZUxlYXZpbmdSb3V0ZSlcbiAgICAgIHRoaXMuX3VubGlzdGVuQmVmb3JlTGVhdmluZ1JvdXRlKClcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IExpZmVjeWNsZVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9tb2R1bGVzL0xpZmVjeWNsZS5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgeyBvYmplY3QgfSA9IFJlYWN0LlByb3BUeXBlc1xuXG4vKipcbiAqIFRoZSBSb3V0ZUNvbnRleHQgbWl4aW4gcHJvdmlkZXMgYSBjb252ZW5pZW50IHdheSBmb3Igcm91dGVcbiAqIGNvbXBvbmVudHMgdG8gc2V0IHRoZSByb3V0ZSBpbiBjb250ZXh0LiBUaGlzIGlzIG5lZWRlZCBmb3JcbiAqIHJvdXRlcyB0aGF0IHJlbmRlciBlbGVtZW50cyB0aGF0IHdhbnQgdG8gdXNlIHRoZSBMaWZlY3ljbGVcbiAqIG1peGluIHRvIHByZXZlbnQgdHJhbnNpdGlvbnMuXG4gKi9cbmNvbnN0IFJvdXRlQ29udGV4dCA9IHtcblxuICBwcm9wVHlwZXM6IHtcbiAgICByb3V0ZTogb2JqZWN0LmlzUmVxdWlyZWRcbiAgfSxcblxuICBjaGlsZENvbnRleHRUeXBlczoge1xuICAgIHJvdXRlOiBvYmplY3QuaXNSZXF1aXJlZFxuICB9LFxuXG4gIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcm91dGU6IHRoaXMucHJvcHMucm91dGVcbiAgICB9XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBSb3V0ZUNvbnRleHRcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvbW9kdWxlcy9Sb3V0ZUNvbnRleHQuanNcbiAqKi8iLCJpbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCdcbmltcG9ydCBjcmVhdGVNZW1vcnlIaXN0b3J5IGZyb20gJ2hpc3RvcnkvbGliL2NyZWF0ZU1lbW9yeUhpc3RvcnknXG5pbXBvcnQgdXNlQmFzZW5hbWUgZnJvbSAnaGlzdG9yeS9saWIvdXNlQmFzZW5hbWUnXG5pbXBvcnQgeyBjcmVhdGVSb3V0ZXMgfSBmcm9tICcuL1JvdXRlVXRpbHMnXG5pbXBvcnQgdXNlUm91dGVzIGZyb20gJy4vdXNlUm91dGVzJ1xuXG5jb25zdCBjcmVhdGVIaXN0b3J5ID0gdXNlUm91dGVzKHVzZUJhc2VuYW1lKGNyZWF0ZU1lbW9yeUhpc3RvcnkpKVxuXG4vKipcbiAqIEEgaGlnaC1sZXZlbCBBUEkgdG8gYmUgdXNlZCBmb3Igc2VydmVyLXNpZGUgcmVuZGVyaW5nLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gbWF0Y2hlcyBhIGxvY2F0aW9uIHRvIGEgc2V0IG9mIHJvdXRlcyBhbmQgY2FsbHNcbiAqIGNhbGxiYWNrKGVycm9yLCByZWRpcmVjdExvY2F0aW9uLCByZW5kZXJQcm9wcykgd2hlbiBmaW5pc2hlZC5cbiAqXG4gKiBOb3RlOiBZb3UgcHJvYmFibHkgZG9uJ3Qgd2FudCB0byB1c2UgdGhpcyBpbiBhIGJyb3dzZXIuIFVzZVxuICogdGhlIGhpc3RvcnkubGlzdGVuIEFQSSBpbnN0ZWFkLlxuICovXG5mdW5jdGlvbiBtYXRjaCh7XG4gIHJvdXRlcyxcbiAgbG9jYXRpb24sXG4gIHBhcnNlUXVlcnlTdHJpbmcsXG4gIHN0cmluZ2lmeVF1ZXJ5LFxuICBiYXNlbmFtZVxufSwgY2FsbGJhY2spIHtcbiAgaW52YXJpYW50KFxuICAgIGxvY2F0aW9uLFxuICAgICdtYXRjaCBuZWVkcyBhIGxvY2F0aW9uJ1xuICApXG5cbiAgY29uc3QgaGlzdG9yeSA9IGNyZWF0ZUhpc3Rvcnkoe1xuICAgIHJvdXRlczogY3JlYXRlUm91dGVzKHJvdXRlcyksXG4gICAgcGFyc2VRdWVyeVN0cmluZyxcbiAgICBzdHJpbmdpZnlRdWVyeSxcbiAgICBiYXNlbmFtZVxuICB9KVxuXG4gIC8vIEFsbG93IG1hdGNoKHsgbG9jYXRpb246ICcvdGhlL3BhdGgnLCAuLi4gfSlcbiAgaWYgKHR5cGVvZiBsb2NhdGlvbiA9PT0gJ3N0cmluZycpXG4gICAgbG9jYXRpb24gPSBoaXN0b3J5LmNyZWF0ZUxvY2F0aW9uKGxvY2F0aW9uKVxuXG4gIGhpc3RvcnkubWF0Y2gobG9jYXRpb24sIGZ1bmN0aW9uIChlcnJvciwgcmVkaXJlY3RMb2NhdGlvbiwgbmV4dFN0YXRlKSB7XG4gICAgY2FsbGJhY2soZXJyb3IsIHJlZGlyZWN0TG9jYXRpb24sIG5leHRTdGF0ZSAmJiB7IC4uLm5leHRTdGF0ZSwgaGlzdG9yeSB9KVxuICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCBtYXRjaFxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9tb2R1bGVzL21hdGNoLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJ3dhcm5pbmcnKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG52YXIgX2ludmFyaWFudCA9IHJlcXVpcmUoJ2ludmFyaWFudCcpO1xuXG52YXIgX2ludmFyaWFudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbnZhcmlhbnQpO1xuXG52YXIgX0FjdGlvbnMgPSByZXF1aXJlKCcuL0FjdGlvbnMnKTtcblxudmFyIF9jcmVhdGVIaXN0b3J5ID0gcmVxdWlyZSgnLi9jcmVhdGVIaXN0b3J5Jyk7XG5cbnZhciBfY3JlYXRlSGlzdG9yeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVIaXN0b3J5KTtcblxudmFyIF9wYXJzZVBhdGggPSByZXF1aXJlKCcuL3BhcnNlUGF0aCcpO1xuXG52YXIgX3BhcnNlUGF0aDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wYXJzZVBhdGgpO1xuXG5mdW5jdGlvbiBjcmVhdGVTdGF0ZVN0b3JhZ2UoZW50cmllcykge1xuICByZXR1cm4gZW50cmllcy5maWx0ZXIoZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgcmV0dXJuIGVudHJ5LnN0YXRlO1xuICB9KS5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIGVudHJ5KSB7XG4gICAgbWVtb1tlbnRyeS5rZXldID0gZW50cnkuc3RhdGU7XG4gICAgcmV0dXJuIG1lbW87XG4gIH0sIHt9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTWVtb3J5SGlzdG9yeSgpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblxuICBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zKSkge1xuICAgIG9wdGlvbnMgPSB7IGVudHJpZXM6IG9wdGlvbnMgfTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICBvcHRpb25zID0geyBlbnRyaWVzOiBbb3B0aW9uc10gfTtcbiAgfVxuXG4gIHZhciBoaXN0b3J5ID0gX2NyZWF0ZUhpc3RvcnkyWydkZWZhdWx0J10oX2V4dGVuZHMoe30sIG9wdGlvbnMsIHtcbiAgICBnZXRDdXJyZW50TG9jYXRpb246IGdldEN1cnJlbnRMb2NhdGlvbixcbiAgICBmaW5pc2hUcmFuc2l0aW9uOiBmaW5pc2hUcmFuc2l0aW9uLFxuICAgIHNhdmVTdGF0ZTogc2F2ZVN0YXRlLFxuICAgIGdvOiBnb1xuICB9KSk7XG5cbiAgdmFyIF9vcHRpb25zID0gb3B0aW9ucztcbiAgdmFyIGVudHJpZXMgPSBfb3B0aW9ucy5lbnRyaWVzO1xuICB2YXIgY3VycmVudCA9IF9vcHRpb25zLmN1cnJlbnQ7XG5cbiAgaWYgKHR5cGVvZiBlbnRyaWVzID09PSAnc3RyaW5nJykge1xuICAgIGVudHJpZXMgPSBbZW50cmllc107XG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoZW50cmllcykpIHtcbiAgICBlbnRyaWVzID0gWycvJ107XG4gIH1cblxuICBlbnRyaWVzID0gZW50cmllcy5tYXAoZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgdmFyIGtleSA9IGhpc3RvcnkuY3JlYXRlS2V5KCk7XG5cbiAgICBpZiAodHlwZW9mIGVudHJ5ID09PSAnc3RyaW5nJykgcmV0dXJuIHsgcGF0aG5hbWU6IGVudHJ5LCBrZXk6IGtleSB9O1xuXG4gICAgaWYgKHR5cGVvZiBlbnRyeSA9PT0gJ29iamVjdCcgJiYgZW50cnkpIHJldHVybiBfZXh0ZW5kcyh7fSwgZW50cnksIHsga2V5OiBrZXkgfSk7XG5cbiAgICAhZmFsc2UgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX2ludmFyaWFudDJbJ2RlZmF1bHQnXShmYWxzZSwgJ1VuYWJsZSB0byBjcmVhdGUgaGlzdG9yeSBlbnRyeSBmcm9tICVzJywgZW50cnkpIDogX2ludmFyaWFudDJbJ2RlZmF1bHQnXShmYWxzZSkgOiB1bmRlZmluZWQ7XG4gIH0pO1xuXG4gIGlmIChjdXJyZW50ID09IG51bGwpIHtcbiAgICBjdXJyZW50ID0gZW50cmllcy5sZW5ndGggLSAxO1xuICB9IGVsc2Uge1xuICAgICEoY3VycmVudCA+PSAwICYmIGN1cnJlbnQgPCBlbnRyaWVzLmxlbmd0aCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX2ludmFyaWFudDJbJ2RlZmF1bHQnXShmYWxzZSwgJ0N1cnJlbnQgaW5kZXggbXVzdCBiZSA+PSAwIGFuZCA8ICVzLCB3YXMgJXMnLCBlbnRyaWVzLmxlbmd0aCwgY3VycmVudCkgOiBfaW52YXJpYW50MlsnZGVmYXVsdCddKGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHZhciBzdG9yYWdlID0gY3JlYXRlU3RhdGVTdG9yYWdlKGVudHJpZXMpO1xuXG4gIGZ1bmN0aW9uIHNhdmVTdGF0ZShrZXksIHN0YXRlKSB7XG4gICAgc3RvcmFnZVtrZXldID0gc3RhdGU7XG4gIH1cblxuICBmdW5jdGlvbiByZWFkU3RhdGUoa2V5KSB7XG4gICAgcmV0dXJuIHN0b3JhZ2Vba2V5XTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEN1cnJlbnRMb2NhdGlvbigpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2N1cnJlbnRdO1xuICAgIHZhciBrZXkgPSBlbnRyeS5rZXk7XG4gICAgdmFyIGJhc2VuYW1lID0gZW50cnkuYmFzZW5hbWU7XG4gICAgdmFyIHBhdGhuYW1lID0gZW50cnkucGF0aG5hbWU7XG4gICAgdmFyIHNlYXJjaCA9IGVudHJ5LnNlYXJjaDtcblxuICAgIHZhciBwYXRoID0gKGJhc2VuYW1lIHx8ICcnKSArIHBhdGhuYW1lICsgKHNlYXJjaCB8fCAnJyk7XG5cbiAgICB2YXIgc3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgaWYgKGtleSkge1xuICAgICAgc3RhdGUgPSByZWFkU3RhdGUoa2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUgPSBudWxsO1xuICAgICAga2V5ID0gaGlzdG9yeS5jcmVhdGVLZXkoKTtcbiAgICAgIGVudHJ5LmtleSA9IGtleTtcbiAgICB9XG5cbiAgICB2YXIgbG9jYXRpb24gPSBfcGFyc2VQYXRoMlsnZGVmYXVsdCddKHBhdGgpO1xuXG4gICAgcmV0dXJuIGhpc3RvcnkuY3JlYXRlTG9jYXRpb24oX2V4dGVuZHMoe30sIGxvY2F0aW9uLCB7IHN0YXRlOiBzdGF0ZSB9KSwgdW5kZWZpbmVkLCBrZXkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuR28obikge1xuICAgIHZhciBpbmRleCA9IGN1cnJlbnQgKyBuO1xuICAgIHJldHVybiBpbmRleCA+PSAwICYmIGluZGV4IDwgZW50cmllcy5sZW5ndGg7XG4gIH1cblxuICBmdW5jdGlvbiBnbyhuKSB7XG4gICAgaWYgKG4pIHtcbiAgICAgIGlmICghY2FuR28obikpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF93YXJuaW5nMlsnZGVmYXVsdCddKGZhbHNlLCAnQ2Fubm90IGdvKCVzKSB0aGVyZSBpcyBub3QgZW5vdWdoIGhpc3RvcnknLCBuKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50ICs9IG47XG5cbiAgICAgIHZhciBjdXJyZW50TG9jYXRpb24gPSBnZXRDdXJyZW50TG9jYXRpb24oKTtcblxuICAgICAgLy8gY2hhbmdlIGFjdGlvbiB0byBQT1BcbiAgICAgIGhpc3RvcnkudHJhbnNpdGlvblRvKF9leHRlbmRzKHt9LCBjdXJyZW50TG9jYXRpb24sIHsgYWN0aW9uOiBfQWN0aW9ucy5QT1AgfSkpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmlzaFRyYW5zaXRpb24obG9jYXRpb24pIHtcbiAgICBzd2l0Y2ggKGxvY2F0aW9uLmFjdGlvbikge1xuICAgICAgY2FzZSBfQWN0aW9ucy5QVVNIOlxuICAgICAgICBjdXJyZW50ICs9IDE7XG5cbiAgICAgICAgLy8gaWYgd2UgYXJlIG5vdCBvbiB0aGUgdG9wIG9mIHN0YWNrXG4gICAgICAgIC8vIHJlbW92ZSByZXN0IGFuZCBwdXNoIG5ld1xuICAgICAgICBpZiAoY3VycmVudCA8IGVudHJpZXMubGVuZ3RoKSBlbnRyaWVzLnNwbGljZShjdXJyZW50KTtcblxuICAgICAgICBlbnRyaWVzLnB1c2gobG9jYXRpb24pO1xuICAgICAgICBzYXZlU3RhdGUobG9jYXRpb24ua2V5LCBsb2NhdGlvbi5zdGF0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBfQWN0aW9ucy5SRVBMQUNFOlxuICAgICAgICBlbnRyaWVzW2N1cnJlbnRdID0gbG9jYXRpb247XG4gICAgICAgIHNhdmVTdGF0ZShsb2NhdGlvbi5rZXksIGxvY2F0aW9uLnN0YXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGhpc3Rvcnk7XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGNyZWF0ZU1lbW9yeUhpc3Rvcnk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vaGlzdG9yeS9saWIvY3JlYXRlTWVtb3J5SGlzdG9yeS5qc1xuICoqIG1vZHVsZSBpZCA9IDQ3XG4gKiogbW9kdWxlIGNodW5rcyA9IDI3XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxudmFyIF9FeGVjdXRpb25FbnZpcm9ubWVudCA9IHJlcXVpcmUoJy4vRXhlY3V0aW9uRW52aXJvbm1lbnQnKTtcblxudmFyIF9ydW5UcmFuc2l0aW9uSG9vayA9IHJlcXVpcmUoJy4vcnVuVHJhbnNpdGlvbkhvb2snKTtcblxudmFyIF9ydW5UcmFuc2l0aW9uSG9vazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ydW5UcmFuc2l0aW9uSG9vayk7XG5cbnZhciBfZXh0cmFjdFBhdGggPSByZXF1aXJlKCcuL2V4dHJhY3RQYXRoJyk7XG5cbnZhciBfZXh0cmFjdFBhdGgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXh0cmFjdFBhdGgpO1xuXG52YXIgX3BhcnNlUGF0aCA9IHJlcXVpcmUoJy4vcGFyc2VQYXRoJyk7XG5cbnZhciBfcGFyc2VQYXRoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BhcnNlUGF0aCk7XG5cbnZhciBfZGVwcmVjYXRlID0gcmVxdWlyZSgnLi9kZXByZWNhdGUnKTtcblxudmFyIF9kZXByZWNhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVwcmVjYXRlKTtcblxuZnVuY3Rpb24gdXNlQmFzZW5hbWUoY3JlYXRlSGlzdG9yeSkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG4gICAgdmFyIGJhc2VuYW1lID0gb3B0aW9ucy5iYXNlbmFtZTtcblxuICAgIHZhciBoaXN0b3J5T3B0aW9ucyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvcHRpb25zLCBbJ2Jhc2VuYW1lJ10pO1xuXG4gICAgdmFyIGhpc3RvcnkgPSBjcmVhdGVIaXN0b3J5KGhpc3RvcnlPcHRpb25zKTtcblxuICAgIC8vIEF1dG9tYXRpY2FsbHkgdXNlIHRoZSB2YWx1ZSBvZiA8YmFzZSBocmVmPiBpbiBIVE1MXG4gICAgLy8gZG9jdW1lbnRzIGFzIGJhc2VuYW1lIGlmIGl0J3Mgbm90IGV4cGxpY2l0bHkgZ2l2ZW4uXG4gICAgaWYgKGJhc2VuYW1lID09IG51bGwgJiYgX0V4ZWN1dGlvbkVudmlyb25tZW50LmNhblVzZURPTSkge1xuICAgICAgdmFyIGJhc2UgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYmFzZScpWzBdO1xuXG4gICAgICBpZiAoYmFzZSkgYmFzZW5hbWUgPSBfZXh0cmFjdFBhdGgyWydkZWZhdWx0J10oYmFzZS5ocmVmKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRCYXNlbmFtZShsb2NhdGlvbikge1xuICAgICAgaWYgKGJhc2VuYW1lICYmIGxvY2F0aW9uLmJhc2VuYW1lID09IG51bGwpIHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoYmFzZW5hbWUpID09PSAwKSB7XG4gICAgICAgICAgbG9jYXRpb24ucGF0aG5hbWUgPSBsb2NhdGlvbi5wYXRobmFtZS5zdWJzdHJpbmcoYmFzZW5hbWUubGVuZ3RoKTtcbiAgICAgICAgICBsb2NhdGlvbi5iYXNlbmFtZSA9IGJhc2VuYW1lO1xuXG4gICAgICAgICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lID09PSAnJykgbG9jYXRpb24ucGF0aG5hbWUgPSAnLyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9jYXRpb24uYmFzZW5hbWUgPSAnJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbG9jYXRpb247XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJlcGVuZEJhc2VuYW1lKGxvY2F0aW9uKSB7XG4gICAgICBpZiAoIWJhc2VuYW1lKSByZXR1cm4gbG9jYXRpb247XG5cbiAgICAgIGlmICh0eXBlb2YgbG9jYXRpb24gPT09ICdzdHJpbmcnKSBsb2NhdGlvbiA9IF9wYXJzZVBhdGgyWydkZWZhdWx0J10obG9jYXRpb24pO1xuXG4gICAgICB2YXIgcG5hbWUgPSBsb2NhdGlvbi5wYXRobmFtZTtcbiAgICAgIHZhciBub3JtYWxpemVkQmFzZW5hbWUgPSBiYXNlbmFtZS5zbGljZSgtMSkgPT09ICcvJyA/IGJhc2VuYW1lIDogYmFzZW5hbWUgKyAnLyc7XG4gICAgICB2YXIgbm9ybWFsaXplZFBhdGhuYW1lID0gcG5hbWUuY2hhckF0KDApID09PSAnLycgPyBwbmFtZS5zbGljZSgxKSA6IHBuYW1lO1xuICAgICAgdmFyIHBhdGhuYW1lID0gbm9ybWFsaXplZEJhc2VuYW1lICsgbm9ybWFsaXplZFBhdGhuYW1lO1xuXG4gICAgICByZXR1cm4gX2V4dGVuZHMoe30sIGxvY2F0aW9uLCB7XG4gICAgICAgIHBhdGhuYW1lOiBwYXRobmFtZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gT3ZlcnJpZGUgYWxsIHJlYWQgbWV0aG9kcyB3aXRoIGJhc2VuYW1lLWF3YXJlIHZlcnNpb25zLlxuICAgIGZ1bmN0aW9uIGxpc3RlbkJlZm9yZShob29rKSB7XG4gICAgICByZXR1cm4gaGlzdG9yeS5saXN0ZW5CZWZvcmUoZnVuY3Rpb24gKGxvY2F0aW9uLCBjYWxsYmFjaykge1xuICAgICAgICBfcnVuVHJhbnNpdGlvbkhvb2syWydkZWZhdWx0J10oaG9vaywgYWRkQmFzZW5hbWUobG9jYXRpb24pLCBjYWxsYmFjayk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBoaXN0b3J5Lmxpc3RlbihmdW5jdGlvbiAobG9jYXRpb24pIHtcbiAgICAgICAgbGlzdGVuZXIoYWRkQmFzZW5hbWUobG9jYXRpb24pKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlIGFsbCB3cml0ZSBtZXRob2RzIHdpdGggYmFzZW5hbWUtYXdhcmUgdmVyc2lvbnMuXG4gICAgZnVuY3Rpb24gcHVzaChsb2NhdGlvbikge1xuICAgICAgaGlzdG9yeS5wdXNoKHByZXBlbmRCYXNlbmFtZShsb2NhdGlvbikpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlcGxhY2UobG9jYXRpb24pIHtcbiAgICAgIGhpc3RvcnkucmVwbGFjZShwcmVwZW5kQmFzZW5hbWUobG9jYXRpb24pKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVQYXRoKGxvY2F0aW9uKSB7XG4gICAgICByZXR1cm4gaGlzdG9yeS5jcmVhdGVQYXRoKHByZXBlbmRCYXNlbmFtZShsb2NhdGlvbikpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUhyZWYobG9jYXRpb24pIHtcbiAgICAgIHJldHVybiBoaXN0b3J5LmNyZWF0ZUhyZWYocHJlcGVuZEJhc2VuYW1lKGxvY2F0aW9uKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlTG9jYXRpb24oKSB7XG4gICAgICByZXR1cm4gYWRkQmFzZW5hbWUoaGlzdG9yeS5jcmVhdGVMb2NhdGlvbi5hcHBseShoaXN0b3J5LCBhcmd1bWVudHMpKTtcbiAgICB9XG5cbiAgICAvLyBkZXByZWNhdGVkXG4gICAgZnVuY3Rpb24gcHVzaFN0YXRlKHN0YXRlLCBwYXRoKSB7XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSBwYXRoID0gX3BhcnNlUGF0aDJbJ2RlZmF1bHQnXShwYXRoKTtcblxuICAgICAgcHVzaChfZXh0ZW5kcyh7IHN0YXRlOiBzdGF0ZSB9LCBwYXRoKSk7XG4gICAgfVxuXG4gICAgLy8gZGVwcmVjYXRlZFxuICAgIGZ1bmN0aW9uIHJlcGxhY2VTdGF0ZShzdGF0ZSwgcGF0aCkge1xuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykgcGF0aCA9IF9wYXJzZVBhdGgyWydkZWZhdWx0J10ocGF0aCk7XG5cbiAgICAgIHJlcGxhY2UoX2V4dGVuZHMoeyBzdGF0ZTogc3RhdGUgfSwgcGF0aCkpO1xuICAgIH1cblxuICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgaGlzdG9yeSwge1xuICAgICAgbGlzdGVuQmVmb3JlOiBsaXN0ZW5CZWZvcmUsXG4gICAgICBsaXN0ZW46IGxpc3RlbixcbiAgICAgIHB1c2g6IHB1c2gsXG4gICAgICByZXBsYWNlOiByZXBsYWNlLFxuICAgICAgY3JlYXRlUGF0aDogY3JlYXRlUGF0aCxcbiAgICAgIGNyZWF0ZUhyZWY6IGNyZWF0ZUhyZWYsXG4gICAgICBjcmVhdGVMb2NhdGlvbjogY3JlYXRlTG9jYXRpb24sXG5cbiAgICAgIHB1c2hTdGF0ZTogX2RlcHJlY2F0ZTJbJ2RlZmF1bHQnXShwdXNoU3RhdGUsICdwdXNoU3RhdGUgaXMgZGVwcmVjYXRlZDsgdXNlIHB1c2ggaW5zdGVhZCcpLFxuICAgICAgcmVwbGFjZVN0YXRlOiBfZGVwcmVjYXRlMlsnZGVmYXVsdCddKHJlcGxhY2VTdGF0ZSwgJ3JlcGxhY2VTdGF0ZSBpcyBkZXByZWNhdGVkOyB1c2UgcmVwbGFjZSBpbnN0ZWFkJylcbiAgICB9KTtcbiAgfTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gdXNlQmFzZW5hbWU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vaGlzdG9yeS9saWIvdXNlQmFzZW5hbWUuanNcbiAqKiBtb2R1bGUgaWQgPSA0OFxuICoqIG1vZHVsZSBjaHVua3MgPSAyN1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX2RlcHJlY2F0ZSA9IHJlcXVpcmUoJy4vZGVwcmVjYXRlJyk7XG5cbnZhciBfZGVwcmVjYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlcHJlY2F0ZSk7XG5cbnZhciBfY3JlYXRlTG9jYXRpb24yID0gcmVxdWlyZSgnLi9jcmVhdGVMb2NhdGlvbicpO1xuXG52YXIgX2NyZWF0ZUxvY2F0aW9uMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUxvY2F0aW9uMik7XG5cbnZhciBfY3JlYXRlQnJvd3Nlckhpc3RvcnkgPSByZXF1aXJlKCcuL2NyZWF0ZUJyb3dzZXJIaXN0b3J5Jyk7XG5cbnZhciBfY3JlYXRlQnJvd3Nlckhpc3RvcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQnJvd3Nlckhpc3RvcnkpO1xuXG5leHBvcnRzLmNyZWF0ZUhpc3RvcnkgPSBfY3JlYXRlQnJvd3Nlckhpc3RvcnkyWydkZWZhdWx0J107XG5cbnZhciBfY3JlYXRlSGFzaEhpc3RvcnkyID0gcmVxdWlyZSgnLi9jcmVhdGVIYXNoSGlzdG9yeScpO1xuXG52YXIgX2NyZWF0ZUhhc2hIaXN0b3J5MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUhhc2hIaXN0b3J5Mik7XG5cbmV4cG9ydHMuY3JlYXRlSGFzaEhpc3RvcnkgPSBfY3JlYXRlSGFzaEhpc3RvcnkzWydkZWZhdWx0J107XG5cbnZhciBfY3JlYXRlTWVtb3J5SGlzdG9yeTIgPSByZXF1aXJlKCcuL2NyZWF0ZU1lbW9yeUhpc3RvcnknKTtcblxudmFyIF9jcmVhdGVNZW1vcnlIaXN0b3J5MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZU1lbW9yeUhpc3RvcnkyKTtcblxuZXhwb3J0cy5jcmVhdGVNZW1vcnlIaXN0b3J5ID0gX2NyZWF0ZU1lbW9yeUhpc3RvcnkzWydkZWZhdWx0J107XG5cbnZhciBfdXNlQmFzZW5hbWUyID0gcmVxdWlyZSgnLi91c2VCYXNlbmFtZScpO1xuXG52YXIgX3VzZUJhc2VuYW1lMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZUJhc2VuYW1lMik7XG5cbmV4cG9ydHMudXNlQmFzZW5hbWUgPSBfdXNlQmFzZW5hbWUzWydkZWZhdWx0J107XG5cbnZhciBfdXNlQmVmb3JlVW5sb2FkMiA9IHJlcXVpcmUoJy4vdXNlQmVmb3JlVW5sb2FkJyk7XG5cbnZhciBfdXNlQmVmb3JlVW5sb2FkMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZUJlZm9yZVVubG9hZDIpO1xuXG5leHBvcnRzLnVzZUJlZm9yZVVubG9hZCA9IF91c2VCZWZvcmVVbmxvYWQzWydkZWZhdWx0J107XG5cbnZhciBfdXNlUXVlcmllczIgPSByZXF1aXJlKCcuL3VzZVF1ZXJpZXMnKTtcblxudmFyIF91c2VRdWVyaWVzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVF1ZXJpZXMyKTtcblxuZXhwb3J0cy51c2VRdWVyaWVzID0gX3VzZVF1ZXJpZXMzWydkZWZhdWx0J107XG5cbnZhciBfQWN0aW9uczIgPSByZXF1aXJlKCcuL0FjdGlvbnMnKTtcblxudmFyIF9BY3Rpb25zMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0FjdGlvbnMyKTtcblxuZXhwb3J0cy5BY3Rpb25zID0gX0FjdGlvbnMzWydkZWZhdWx0J107XG5cbi8vIGRlcHJlY2F0ZWRcblxudmFyIF9lbmFibGVCZWZvcmVVbmxvYWQyID0gcmVxdWlyZSgnLi9lbmFibGVCZWZvcmVVbmxvYWQnKTtcblxudmFyIF9lbmFibGVCZWZvcmVVbmxvYWQzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZW5hYmxlQmVmb3JlVW5sb2FkMik7XG5cbmV4cG9ydHMuZW5hYmxlQmVmb3JlVW5sb2FkID0gX2VuYWJsZUJlZm9yZVVubG9hZDNbJ2RlZmF1bHQnXTtcblxudmFyIF9lbmFibGVRdWVyaWVzMiA9IHJlcXVpcmUoJy4vZW5hYmxlUXVlcmllcycpO1xuXG52YXIgX2VuYWJsZVF1ZXJpZXMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZW5hYmxlUXVlcmllczIpO1xuXG5leHBvcnRzLmVuYWJsZVF1ZXJpZXMgPSBfZW5hYmxlUXVlcmllczNbJ2RlZmF1bHQnXTtcbnZhciBjcmVhdGVMb2NhdGlvbiA9IF9kZXByZWNhdGUyWydkZWZhdWx0J10oX2NyZWF0ZUxvY2F0aW9uM1snZGVmYXVsdCddLCAnVXNpbmcgY3JlYXRlTG9jYXRpb24gd2l0aG91dCBhIGhpc3RvcnkgaW5zdGFuY2UgaXMgZGVwcmVjYXRlZDsgcGxlYXNlIHVzZSBoaXN0b3J5LmNyZWF0ZUxvY2F0aW9uIGluc3RlYWQnKTtcbmV4cG9ydHMuY3JlYXRlTG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vaGlzdG9yeS9saWIvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA0OVxuICoqIG1vZHVsZSBjaHVua3MgPSAyN1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX2ludmFyaWFudCA9IHJlcXVpcmUoJ2ludmFyaWFudCcpO1xuXG52YXIgX2ludmFyaWFudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbnZhcmlhbnQpO1xuXG52YXIgX0FjdGlvbnMgPSByZXF1aXJlKCcuL0FjdGlvbnMnKTtcblxudmFyIF9FeGVjdXRpb25FbnZpcm9ubWVudCA9IHJlcXVpcmUoJy4vRXhlY3V0aW9uRW52aXJvbm1lbnQnKTtcblxudmFyIF9ET01VdGlscyA9IHJlcXVpcmUoJy4vRE9NVXRpbHMnKTtcblxudmFyIF9ET01TdGF0ZVN0b3JhZ2UgPSByZXF1aXJlKCcuL0RPTVN0YXRlU3RvcmFnZScpO1xuXG52YXIgX2NyZWF0ZURPTUhpc3RvcnkgPSByZXF1aXJlKCcuL2NyZWF0ZURPTUhpc3RvcnknKTtcblxudmFyIF9jcmVhdGVET01IaXN0b3J5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZURPTUhpc3RvcnkpO1xuXG52YXIgX3BhcnNlUGF0aCA9IHJlcXVpcmUoJy4vcGFyc2VQYXRoJyk7XG5cbnZhciBfcGFyc2VQYXRoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BhcnNlUGF0aCk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIGhpc3Rvcnkgb2JqZWN0IHRoYXQgdXNlcyBIVE1MNSdzIGhpc3RvcnkgQVBJXG4gKiAocHVzaFN0YXRlLCByZXBsYWNlU3RhdGUsIGFuZCB0aGUgcG9wc3RhdGUgZXZlbnQpIHRvIG1hbmFnZSBoaXN0b3J5LlxuICogVGhpcyBpcyB0aGUgcmVjb21tZW5kZWQgbWV0aG9kIG9mIG1hbmFnaW5nIGhpc3RvcnkgaW4gYnJvd3NlcnMgYmVjYXVzZVxuICogaXQgcHJvdmlkZXMgdGhlIGNsZWFuZXN0IFVSTHMuXG4gKlxuICogTm90ZTogSW4gYnJvd3NlcnMgdGhhdCBkbyBub3Qgc3VwcG9ydCB0aGUgSFRNTDUgaGlzdG9yeSBBUEkgZnVsbFxuICogcGFnZSByZWxvYWRzIHdpbGwgYmUgdXNlZCB0byBwcmVzZXJ2ZSBVUkxzLlxuICovXG5mdW5jdGlvbiBjcmVhdGVCcm93c2VySGlzdG9yeSgpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblxuICAhX0V4ZWN1dGlvbkVudmlyb25tZW50LmNhblVzZURPTSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfaW52YXJpYW50MlsnZGVmYXVsdCddKGZhbHNlLCAnQnJvd3NlciBoaXN0b3J5IG5lZWRzIGEgRE9NJykgOiBfaW52YXJpYW50MlsnZGVmYXVsdCddKGZhbHNlKSA6IHVuZGVmaW5lZDtcblxuICB2YXIgZm9yY2VSZWZyZXNoID0gb3B0aW9ucy5mb3JjZVJlZnJlc2g7XG5cbiAgdmFyIGlzU3VwcG9ydGVkID0gX0RPTVV0aWxzLnN1cHBvcnRzSGlzdG9yeSgpO1xuICB2YXIgdXNlUmVmcmVzaCA9ICFpc1N1cHBvcnRlZCB8fCBmb3JjZVJlZnJlc2g7XG5cbiAgZnVuY3Rpb24gZ2V0Q3VycmVudExvY2F0aW9uKGhpc3RvcnlTdGF0ZSkge1xuICAgIGhpc3RvcnlTdGF0ZSA9IGhpc3RvcnlTdGF0ZSB8fCB3aW5kb3cuaGlzdG9yeS5zdGF0ZSB8fCB7fTtcblxuICAgIHZhciBwYXRoID0gX0RPTVV0aWxzLmdldFdpbmRvd1BhdGgoKTtcbiAgICB2YXIgX2hpc3RvcnlTdGF0ZSA9IGhpc3RvcnlTdGF0ZTtcbiAgICB2YXIga2V5ID0gX2hpc3RvcnlTdGF0ZS5rZXk7XG5cbiAgICB2YXIgc3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgaWYgKGtleSkge1xuICAgICAgc3RhdGUgPSBfRE9NU3RhdGVTdG9yYWdlLnJlYWRTdGF0ZShrZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZSA9IG51bGw7XG4gICAgICBrZXkgPSBoaXN0b3J5LmNyZWF0ZUtleSgpO1xuXG4gICAgICBpZiAoaXNTdXBwb3J0ZWQpIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShfZXh0ZW5kcyh7fSwgaGlzdG9yeVN0YXRlLCB7IGtleToga2V5IH0pLCBudWxsLCBwYXRoKTtcbiAgICB9XG5cbiAgICB2YXIgbG9jYXRpb24gPSBfcGFyc2VQYXRoMlsnZGVmYXVsdCddKHBhdGgpO1xuXG4gICAgcmV0dXJuIGhpc3RvcnkuY3JlYXRlTG9jYXRpb24oX2V4dGVuZHMoe30sIGxvY2F0aW9uLCB7IHN0YXRlOiBzdGF0ZSB9KSwgdW5kZWZpbmVkLCBrZXkpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnRQb3BTdGF0ZUxpc3RlbmVyKF9yZWYpIHtcbiAgICB2YXIgdHJhbnNpdGlvblRvID0gX3JlZi50cmFuc2l0aW9uVG87XG5cbiAgICBmdW5jdGlvbiBwb3BTdGF0ZUxpc3RlbmVyKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQuc3RhdGUgPT09IHVuZGVmaW5lZCkgcmV0dXJuOyAvLyBJZ25vcmUgZXh0cmFuZW91cyBwb3BzdGF0ZSBldmVudHMgaW4gV2ViS2l0LlxuXG4gICAgICB0cmFuc2l0aW9uVG8oZ2V0Q3VycmVudExvY2F0aW9uKGV2ZW50LnN0YXRlKSk7XG4gICAgfVxuXG4gICAgX0RPTVV0aWxzLmFkZEV2ZW50TGlzdGVuZXIod2luZG93LCAncG9wc3RhdGUnLCBwb3BTdGF0ZUxpc3RlbmVyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBfRE9NVXRpbHMucmVtb3ZlRXZlbnRMaXN0ZW5lcih3aW5kb3csICdwb3BzdGF0ZScsIHBvcFN0YXRlTGlzdGVuZXIpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBmaW5pc2hUcmFuc2l0aW9uKGxvY2F0aW9uKSB7XG4gICAgdmFyIGJhc2VuYW1lID0gbG9jYXRpb24uYmFzZW5hbWU7XG4gICAgdmFyIHBhdGhuYW1lID0gbG9jYXRpb24ucGF0aG5hbWU7XG4gICAgdmFyIHNlYXJjaCA9IGxvY2F0aW9uLnNlYXJjaDtcbiAgICB2YXIgaGFzaCA9IGxvY2F0aW9uLmhhc2g7XG4gICAgdmFyIHN0YXRlID0gbG9jYXRpb24uc3RhdGU7XG4gICAgdmFyIGFjdGlvbiA9IGxvY2F0aW9uLmFjdGlvbjtcbiAgICB2YXIga2V5ID0gbG9jYXRpb24ua2V5O1xuXG4gICAgaWYgKGFjdGlvbiA9PT0gX0FjdGlvbnMuUE9QKSByZXR1cm47IC8vIE5vdGhpbmcgdG8gZG8uXG5cbiAgICBfRE9NU3RhdGVTdG9yYWdlLnNhdmVTdGF0ZShrZXksIHN0YXRlKTtcblxuICAgIHZhciBwYXRoID0gKGJhc2VuYW1lIHx8ICcnKSArIHBhdGhuYW1lICsgc2VhcmNoICsgaGFzaDtcbiAgICB2YXIgaGlzdG9yeVN0YXRlID0ge1xuICAgICAga2V5OiBrZXlcbiAgICB9O1xuXG4gICAgaWYgKGFjdGlvbiA9PT0gX0FjdGlvbnMuUFVTSCkge1xuICAgICAgaWYgKHVzZVJlZnJlc2gpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBwYXRoO1xuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIFByZXZlbnQgbG9jYXRpb24gdXBkYXRlLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoaGlzdG9yeVN0YXRlLCBudWxsLCBwYXRoKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSRVBMQUNFXG4gICAgICBpZiAodXNlUmVmcmVzaCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShwYXRoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBQcmV2ZW50IGxvY2F0aW9uIHVwZGF0ZS5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKGhpc3RvcnlTdGF0ZSwgbnVsbCwgcGF0aCk7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgaGlzdG9yeSA9IF9jcmVhdGVET01IaXN0b3J5MlsnZGVmYXVsdCddKF9leHRlbmRzKHt9LCBvcHRpb25zLCB7XG4gICAgZ2V0Q3VycmVudExvY2F0aW9uOiBnZXRDdXJyZW50TG9jYXRpb24sXG4gICAgZmluaXNoVHJhbnNpdGlvbjogZmluaXNoVHJhbnNpdGlvbixcbiAgICBzYXZlU3RhdGU6IF9ET01TdGF0ZVN0b3JhZ2Uuc2F2ZVN0YXRlXG4gIH0pKTtcblxuICB2YXIgbGlzdGVuZXJDb3VudCA9IDAsXG4gICAgICBzdG9wUG9wU3RhdGVMaXN0ZW5lciA9IHVuZGVmaW5lZDtcblxuICBmdW5jdGlvbiBsaXN0ZW5CZWZvcmUobGlzdGVuZXIpIHtcbiAgICBpZiAoKytsaXN0ZW5lckNvdW50ID09PSAxKSBzdG9wUG9wU3RhdGVMaXN0ZW5lciA9IHN0YXJ0UG9wU3RhdGVMaXN0ZW5lcihoaXN0b3J5KTtcblxuICAgIHZhciB1bmxpc3RlbiA9IGhpc3RvcnkubGlzdGVuQmVmb3JlKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB1bmxpc3RlbigpO1xuXG4gICAgICBpZiAoLS1saXN0ZW5lckNvdW50ID09PSAwKSBzdG9wUG9wU3RhdGVMaXN0ZW5lcigpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICBpZiAoKytsaXN0ZW5lckNvdW50ID09PSAxKSBzdG9wUG9wU3RhdGVMaXN0ZW5lciA9IHN0YXJ0UG9wU3RhdGVMaXN0ZW5lcihoaXN0b3J5KTtcblxuICAgIHZhciB1bmxpc3RlbiA9IGhpc3RvcnkubGlzdGVuKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB1bmxpc3RlbigpO1xuXG4gICAgICBpZiAoLS1saXN0ZW5lckNvdW50ID09PSAwKSBzdG9wUG9wU3RhdGVMaXN0ZW5lcigpO1xuICAgIH07XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyVHJhbnNpdGlvbkhvb2soaG9vaykge1xuICAgIGlmICgrK2xpc3RlbmVyQ291bnQgPT09IDEpIHN0b3BQb3BTdGF0ZUxpc3RlbmVyID0gc3RhcnRQb3BTdGF0ZUxpc3RlbmVyKGhpc3RvcnkpO1xuXG4gICAgaGlzdG9yeS5yZWdpc3RlclRyYW5zaXRpb25Ib29rKGhvb2spO1xuICB9XG5cbiAgLy8gZGVwcmVjYXRlZFxuICBmdW5jdGlvbiB1bnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2soaG9vaykge1xuICAgIGhpc3RvcnkudW5yZWdpc3RlclRyYW5zaXRpb25Ib29rKGhvb2spO1xuXG4gICAgaWYgKC0tbGlzdGVuZXJDb3VudCA9PT0gMCkgc3RvcFBvcFN0YXRlTGlzdGVuZXIoKTtcbiAgfVxuXG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgaGlzdG9yeSwge1xuICAgIGxpc3RlbkJlZm9yZTogbGlzdGVuQmVmb3JlLFxuICAgIGxpc3RlbjogbGlzdGVuLFxuICAgIHJlZ2lzdGVyVHJhbnNpdGlvbkhvb2s6IHJlZ2lzdGVyVHJhbnNpdGlvbkhvb2ssXG4gICAgdW5yZWdpc3RlclRyYW5zaXRpb25Ib29rOiB1bnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2tcbiAgfSk7XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGNyZWF0ZUJyb3dzZXJIaXN0b3J5O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2hpc3RvcnkvbGliL2NyZWF0ZUJyb3dzZXJIaXN0b3J5LmpzXG4gKiogbW9kdWxlIGlkID0gNTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMjdcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF93YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuXG52YXIgX3dhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2FybmluZyk7XG5cbnZhciBfRXhlY3V0aW9uRW52aXJvbm1lbnQgPSByZXF1aXJlKCcuL0V4ZWN1dGlvbkVudmlyb25tZW50Jyk7XG5cbnZhciBfRE9NVXRpbHMgPSByZXF1aXJlKCcuL0RPTVV0aWxzJyk7XG5cbnZhciBfZGVwcmVjYXRlID0gcmVxdWlyZSgnLi9kZXByZWNhdGUnKTtcblxudmFyIF9kZXByZWNhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVwcmVjYXRlKTtcblxuZnVuY3Rpb24gc3RhcnRCZWZvcmVVbmxvYWRMaXN0ZW5lcihnZXRCZWZvcmVVbmxvYWRQcm9tcHRNZXNzYWdlKSB7XG4gIGZ1bmN0aW9uIGxpc3RlbmVyKGV2ZW50KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSBnZXRCZWZvcmVVbmxvYWRQcm9tcHRNZXNzYWdlKCk7XG5cbiAgICBpZiAodHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAoZXZlbnQgfHwgd2luZG93LmV2ZW50KS5yZXR1cm5WYWx1ZSA9IG1lc3NhZ2U7XG4gICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9XG4gIH1cblxuICBfRE9NVXRpbHMuYWRkRXZlbnRMaXN0ZW5lcih3aW5kb3csICdiZWZvcmV1bmxvYWQnLCBsaXN0ZW5lcik7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBfRE9NVXRpbHMucmVtb3ZlRXZlbnRMaXN0ZW5lcih3aW5kb3csICdiZWZvcmV1bmxvYWQnLCBsaXN0ZW5lcik7XG4gIH07XG59XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBjcmVhdGVIaXN0b3J5IGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gY3JlYXRlXG4gKiBoaXN0b3J5IG9iamVjdHMgdGhhdCBrbm93IGhvdyB0byB1c2UgdGhlIGJlZm9yZXVubG9hZCBldmVudCBpbiB3ZWJcbiAqIGJyb3dzZXJzIHRvIGNhbmNlbCBuYXZpZ2F0aW9uLlxuICovXG5mdW5jdGlvbiB1c2VCZWZvcmVVbmxvYWQoY3JlYXRlSGlzdG9yeSkge1xuICByZXR1cm4gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgaGlzdG9yeSA9IGNyZWF0ZUhpc3Rvcnkob3B0aW9ucyk7XG5cbiAgICB2YXIgc3RvcEJlZm9yZVVubG9hZExpc3RlbmVyID0gdW5kZWZpbmVkO1xuICAgIHZhciBiZWZvcmVVbmxvYWRIb29rcyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gZ2V0QmVmb3JlVW5sb2FkUHJvbXB0TWVzc2FnZSgpIHtcbiAgICAgIHZhciBtZXNzYWdlID0gdW5kZWZpbmVkO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYmVmb3JlVW5sb2FkSG9va3MubGVuZ3RoOyBtZXNzYWdlID09IG51bGwgJiYgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBiZWZvcmVVbmxvYWRIb29rc1tpXS5jYWxsKCk7XG4gICAgICB9cmV0dXJuIG1lc3NhZ2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdGVuQmVmb3JlVW5sb2FkKGhvb2spIHtcbiAgICAgIGJlZm9yZVVubG9hZEhvb2tzLnB1c2goaG9vayk7XG5cbiAgICAgIGlmIChiZWZvcmVVbmxvYWRIb29rcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgaWYgKF9FeGVjdXRpb25FbnZpcm9ubWVudC5jYW5Vc2VET00pIHtcbiAgICAgICAgICBzdG9wQmVmb3JlVW5sb2FkTGlzdGVuZXIgPSBzdGFydEJlZm9yZVVubG9hZExpc3RlbmVyKGdldEJlZm9yZVVubG9hZFByb21wdE1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfd2FybmluZzJbJ2RlZmF1bHQnXShmYWxzZSwgJ2xpc3RlbkJlZm9yZVVubG9hZCBvbmx5IHdvcmtzIGluIERPTSBlbnZpcm9ubWVudHMnKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBiZWZvcmVVbmxvYWRIb29rcyA9IGJlZm9yZVVubG9hZEhvb2tzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgIHJldHVybiBpdGVtICE9PSBob29rO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoYmVmb3JlVW5sb2FkSG9va3MubGVuZ3RoID09PSAwICYmIHN0b3BCZWZvcmVVbmxvYWRMaXN0ZW5lcikge1xuICAgICAgICAgIHN0b3BCZWZvcmVVbmxvYWRMaXN0ZW5lcigpO1xuICAgICAgICAgIHN0b3BCZWZvcmVVbmxvYWRMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gZGVwcmVjYXRlZFxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyQmVmb3JlVW5sb2FkSG9vayhob29rKSB7XG4gICAgICBpZiAoX0V4ZWN1dGlvbkVudmlyb25tZW50LmNhblVzZURPTSAmJiBiZWZvcmVVbmxvYWRIb29rcy5pbmRleE9mKGhvb2spID09PSAtMSkge1xuICAgICAgICBiZWZvcmVVbmxvYWRIb29rcy5wdXNoKGhvb2spO1xuXG4gICAgICAgIGlmIChiZWZvcmVVbmxvYWRIb29rcy5sZW5ndGggPT09IDEpIHN0b3BCZWZvcmVVbmxvYWRMaXN0ZW5lciA9IHN0YXJ0QmVmb3JlVW5sb2FkTGlzdGVuZXIoZ2V0QmVmb3JlVW5sb2FkUHJvbXB0TWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGVwcmVjYXRlZFxuICAgIGZ1bmN0aW9uIHVucmVnaXN0ZXJCZWZvcmVVbmxvYWRIb29rKGhvb2spIHtcbiAgICAgIGlmIChiZWZvcmVVbmxvYWRIb29rcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGJlZm9yZVVubG9hZEhvb2tzID0gYmVmb3JlVW5sb2FkSG9va3MuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW0gIT09IGhvb2s7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChiZWZvcmVVbmxvYWRIb29rcy5sZW5ndGggPT09IDApIHN0b3BCZWZvcmVVbmxvYWRMaXN0ZW5lcigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgaGlzdG9yeSwge1xuICAgICAgbGlzdGVuQmVmb3JlVW5sb2FkOiBsaXN0ZW5CZWZvcmVVbmxvYWQsXG5cbiAgICAgIHJlZ2lzdGVyQmVmb3JlVW5sb2FkSG9vazogX2RlcHJlY2F0ZTJbJ2RlZmF1bHQnXShyZWdpc3RlckJlZm9yZVVubG9hZEhvb2ssICdyZWdpc3RlckJlZm9yZVVubG9hZEhvb2sgaXMgZGVwcmVjYXRlZDsgdXNlIGxpc3RlbkJlZm9yZVVubG9hZCBpbnN0ZWFkJyksXG4gICAgICB1bnJlZ2lzdGVyQmVmb3JlVW5sb2FkSG9vazogX2RlcHJlY2F0ZTJbJ2RlZmF1bHQnXSh1bnJlZ2lzdGVyQmVmb3JlVW5sb2FkSG9vaywgJ3VucmVnaXN0ZXJCZWZvcmVVbmxvYWRIb29rIGlzIGRlcHJlY2F0ZWQ7IHVzZSB0aGUgY2FsbGJhY2sgcmV0dXJuZWQgZnJvbSBsaXN0ZW5CZWZvcmVVbmxvYWQgaW5zdGVhZCcpXG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHVzZUJlZm9yZVVubG9hZDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9oaXN0b3J5L2xpYi91c2VCZWZvcmVVbmxvYWQuanNcbiAqKiBtb2R1bGUgaWQgPSA1MVxuICoqIG1vZHVsZSBjaHVua3MgPSAyN1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX2RlcHJlY2F0ZSA9IHJlcXVpcmUoJy4vZGVwcmVjYXRlJyk7XG5cbnZhciBfZGVwcmVjYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlcHJlY2F0ZSk7XG5cbnZhciBfdXNlQmVmb3JlVW5sb2FkID0gcmVxdWlyZSgnLi91c2VCZWZvcmVVbmxvYWQnKTtcblxudmFyIF91c2VCZWZvcmVVbmxvYWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlQmVmb3JlVW5sb2FkKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gX2RlcHJlY2F0ZTJbJ2RlZmF1bHQnXShfdXNlQmVmb3JlVW5sb2FkMlsnZGVmYXVsdCddLCAnZW5hYmxlQmVmb3JlVW5sb2FkIGlzIGRlcHJlY2F0ZWQsIHVzZSB1c2VCZWZvcmVVbmxvYWQgaW5zdGVhZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2hpc3RvcnkvbGliL2VuYWJsZUJlZm9yZVVubG9hZC5qc1xuICoqIG1vZHVsZSBpZCA9IDUyXG4gKiogbW9kdWxlIGNodW5rcyA9IDI3XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfZGVwcmVjYXRlID0gcmVxdWlyZSgnLi9kZXByZWNhdGUnKTtcblxudmFyIF9kZXByZWNhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVwcmVjYXRlKTtcblxudmFyIF91c2VRdWVyaWVzID0gcmVxdWlyZSgnLi91c2VRdWVyaWVzJyk7XG5cbnZhciBfdXNlUXVlcmllczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VRdWVyaWVzKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gX2RlcHJlY2F0ZTJbJ2RlZmF1bHQnXShfdXNlUXVlcmllczJbJ2RlZmF1bHQnXSwgJ2VuYWJsZVF1ZXJpZXMgaXMgZGVwcmVjYXRlZCwgdXNlIHVzZVF1ZXJpZXMgaW5zdGVhZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2hpc3RvcnkvbGliL2VuYWJsZVF1ZXJpZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA1M1xuICoqIG1vZHVsZSBjaHVua3MgPSAyN1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=