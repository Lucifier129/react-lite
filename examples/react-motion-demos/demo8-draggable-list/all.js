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
	
	var _Demo = __webpack_require__(28);
	
	var _Demo2 = _interopRequireDefault(_Demo);
	
	_react2['default'].render(_react2['default'].createElement(_Demo2['default'], null), document.querySelector('#content'));

/***/ },
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
	    endA = endB = keyA = keyB = fill = fill = undefined;
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
/* 26 */,
/* 27 */,
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _srcReactMotion = __webpack_require__(11);
	
	var _lodashRange = __webpack_require__(19);
	
	var _lodashRange2 = _interopRequireDefault(_lodashRange);
	
	function reinsert(arr, from, to) {
	  var _arr = arr.slice(0);
	  var val = _arr[from];
	  _arr.splice(from, 1);
	  _arr.splice(to, 0, val);
	  return _arr;
	}
	
	function clamp(n, min, max) {
	  return Math.max(Math.min(n, max), min);
	}
	
	var springConfig = [300, 50];
	var itemsCount = 4;
	
	var Demo = _react2['default'].createClass({
	  displayName: 'Demo',
	
	  getInitialState: function getInitialState() {
	    return {
	      delta: 0,
	      mouse: 0,
	      isPressed: false,
	      lastPressed: 0,
	      order: _lodashRange2['default'](itemsCount)
	    };
	  },
	
	  componentDidMount: function componentDidMount() {
	    window.addEventListener('touchmove', this.handleTouchMove);
	    window.addEventListener('touchend', this.handleMouseUp);
	    window.addEventListener('mousemove', this.handleMouseMove);
	    window.addEventListener('mouseup', this.handleMouseUp);
	  },
	
	  handleTouchStart: function handleTouchStart(key, pressLocation, e) {
	    this.handleMouseDown(key, pressLocation, e.touches[0]);
	  },
	
	  handleTouchMove: function handleTouchMove(e) {
	    e.preventDefault();
	    this.handleMouseMove(e.touches[0]);
	  },
	
	  handleMouseDown: function handleMouseDown(pos, pressY, _ref) {
	    var pageY = _ref.pageY;
	
	    this.setState({
	      delta: pageY - pressY,
	      mouse: pressY,
	      isPressed: true,
	      lastPressed: pos
	    });
	  },
	
	  handleMouseMove: function handleMouseMove(_ref2) {
	    var pageY = _ref2.pageY;
	    var _state = this.state;
	    var isPressed = _state.isPressed;
	    var delta = _state.delta;
	    var order = _state.order;
	    var lastPressed = _state.lastPressed;
	
	    if (isPressed) {
	      var mouse = pageY - delta;
	      var row = clamp(Math.round(mouse / 100), 0, itemsCount - 1);
	      var newOrder = reinsert(order, order.indexOf(lastPressed), row);
	      this.setState({ mouse: mouse, order: newOrder });
	    }
	  },
	
	  handleMouseUp: function handleMouseUp() {
	    this.setState({ isPressed: false, delta: 0 });
	  },
	
	  render: function render() {
	    var _this = this;
	
	    var _state2 = this.state;
	    var mouse = _state2.mouse;
	    var isPressed = _state2.isPressed;
	    var lastPressed = _state2.lastPressed;
	    var order = _state2.order;
	
	    return _react2['default'].createElement(
	      'div',
	      { className: 'demo8' },
	      _lodashRange2['default'](itemsCount).map(function (i) {
	        var style = lastPressed === i && isPressed ? {
	          scale: _srcReactMotion.spring(1.1, springConfig),
	          shadow: _srcReactMotion.spring(16, springConfig),
	          y: mouse
	        } : {
	          scale: _srcReactMotion.spring(1, springConfig),
	          shadow: _srcReactMotion.spring(1, springConfig),
	          y: _srcReactMotion.spring(order.indexOf(i) * 100, springConfig)
	        };
	        return _react2['default'].createElement(
	          _srcReactMotion.Motion,
	          { style: style, key: i },
	          function (_ref3) {
	            var scale = _ref3.scale;
	            var shadow = _ref3.shadow;
	            var y = _ref3.y;
	            return _react2['default'].createElement(
	              'div',
	              {
	                onMouseDown: _this.handleMouseDown.bind(null, i, y),
	                onTouchStart: _this.handleTouchStart.bind(null, i, y),
	                className: 'demo8-item',
	                style: {
	                  boxShadow: 'rgba(0, 0, 0, 0.2) 0px ' + shadow + 'px ' + 2 * shadow + 'px 0px',
	                  transform: 'translate3d(0, ' + y + 'px, 0) scale(' + scale + ')',
	                  WebkitTransform: 'translate3d(0, ' + y + 'px, 0) scale(' + scale + ')',
	                  zIndex: i === lastPressed ? 99 : i
	                } },
	              order.indexOf(i) + 1
	            );
	          }
	        );
	      })
	    );
	  }
	});
	
	exports['default'] = Demo;
	module.exports = exports['default'];

/***/ }
/******/ ]);
//# sourceMappingURL=all.js.map