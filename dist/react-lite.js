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

	var _ReactDOM = __webpack_require__(5);

	var _component = __webpack_require__(2);

	var _component2 = _interopRequireDefault(_component);

	var _createClass = __webpack_require__(6);

	var _createClass2 = _interopRequireDefault(_createClass);

	var _createElement = __webpack_require__(7);

	var _createElement2 = _interopRequireDefault(_createElement);

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
	  Component: _component2['default'],
	  createClass: _createClass2['default'],
	  createElement: _createElement2['default'],
	  Children: Children,
	  PropTypes: PropTypes,
	  render: _ReactDOM.render,
	  findDOMNode: _ReactDOM.findDOMNode,
	  unmountComponentAtNode: _ReactDOM.unmountComponentAtNode
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	// util
	'use strict';

	exports.__esModule = true;
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
	var isUndefined = function isUndefined(obj) {
		return obj === undefined;
	};
	exports.isUndefined = isUndefined;
	var isComponent = function isComponent(obj) {
		return obj && obj.prototype && 'forceUpdate' in obj.prototype;
	};
	exports.isComponent = isComponent;
	var isStatelessComponent = function isStatelessComponent(obj) {
		return obj && (!obj.prototype || !('forceUpdate' in obj.prototype));
	};

	exports.isStatelessComponent = isStatelessComponent;
	var toArray = Array.from || function (obj) {
		return Array.prototype.slice.call(obj);
	};

	exports.toArray = toArray;
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
	var forEach = function forEach(list, iteratee) {
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

	exports.forEach = forEach;
	var eachItem = function eachItem(list, iteratee) {
		for (var i = 0, len = list.length; i < len; i += 1) {
			iteratee(list[i], i);
		}
	};

	exports.eachItem = eachItem;
	var mapValue = function mapValue(obj, iteratee) {
		for (var key in obj) {
			if (!obj.hasOwnProperty(key)) {
				continue;
			}
			iteratee(obj[key], key);
		}
	};

	exports.mapValue = mapValue;
	var extend = function extend(target) {
		for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
			args[_key2 - 1] = arguments[_key2];
		}

		eachItem(args, function (source) {
			if (source == null) {
				return;
			}
			mapValue(source, function (value, key) {
				target[key] = value;
			});
		});
		return target;
	};

	exports.extend = extend;
	var uid = 0;
	var getUid = function getUid() {
		return ++uid;
	};

	exports.getUid = getUid;
	var hasKey = function hasKey(obj) {
		var key = arguments.length <= 1 || arguments[1] === undefined ? 'key' : arguments[1];
		return obj && obj.props && obj.props.hasOwnProperty(key);
	};

	exports.hasKey = hasKey;
	var mergeProps = function mergeProps(props, children, defaultProps) {
		var result = extend({}, defaultProps, props);
		if (children && children.length > 0) {
			result.children = children.length === 1 ? children[0] : children;
		}
		return result;
	};

	exports.mergeProps = mergeProps;
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
	var setEvent = function setEvent(elem, key, value) {
		if (!isFn(value)) {
			return;
		}
		key = key.toLowerCase();
		elem[key] = value;
		if (key === 'onchange') {
			elem.oninput = value;
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
	var IGNORE_KEYS = /(key)|(ref)/i;
	var EVENT_KEYS = /^on/i;
	var isIgnoreKey = function isIgnoreKey(key) {
		return IGNORE_KEYS.test(key);
	};
	exports.isIgnoreKey = isIgnoreKey;
	var isEventKey = function isEventKey(key) {
		return EVENT_KEYS.test(key);
	};
	exports.isEventKey = isEventKey;
	var isInnerHTMLKey = function isInnerHTMLKey(key) {
		return key === 'dangerouslySetInnerHTML';
	};
	exports.isInnerHTMLKey = isInnerHTMLKey;
	var isStyleKey = function isStyleKey(key) {
		return key === 'style';
	};
	exports.isStyleKey = isStyleKey;
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
	exports.setProp = setProp;
	var setProps = function setProps(elem, props) {
		mapValue(props, function (value, key) {
			setProp(elem, key, value);
		});
	};
	exports.setProps = setProps;
	var removeProps = function removeProps(elem, oldProps) {
		mapValue(oldProps, function (oldValue, key) {
			removeProp(elem, key, oldValue);
		});
	};
	exports.removeProps = removeProps;
	var removeProp = function removeProp(elem, key, oldValue) {
		switch (true) {
			case isIgnoreKey(key):
				break;
			case isEventKey(key):
				removeEvent(elem, key);
				break;
			case isStyleKey(key):
				removeStyle(elem.style, oldValue);
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
	exports.removeProp = removeProp;
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

		mapValue(newProps, function (value, key) {
			if (isIgnoreKey(key)) {
				return;
			}
			var valueIsUndefined = isUndefined(value);
			if (!props.hasOwnProperty(key)) {
				if (!valueIsUndefined) {
					setProp(elem, key, value);
					return;
				}
			}
			var oldValue = props[key];
			delete props[key];
			if (value === oldValue) {
				return;
			}
			if (valueIsUndefined) {
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
		removeProps(elem, props);
	};

	exports.patchProps = patchProps;
	var removeStyle = function removeStyle(elem, style) {
		var elemStyle = elem.style;
		mapValue(style, function (_, key) {
			elemStyle[key] = '';
		});
	};
	exports.removeStyle = removeStyle;
	var setStyle = function setStyle(elem, style) {
		var elemStyle = elem.style;
		mapValue(style, function (value, key) {
			setStyleValue(elemStyle, key, value);
		});
	};
	exports.setStyle = setStyle;
	var patchStyle = function patchStyle(elem, style, newStyle) {
		if (style === newStyle) {
			return;
		}
		if (!newStyle && style) {
			removeStyle(elem, style);
		} else if (newStyle && !style) {
			setStyle(elem, newStyle);
		} else {
			(function () {
				var elemStyle = elem.style;
				mapValue(newStyle, function (value, key) {
					if (value == null) {
						elemStyle[key] = '';
					} else {
						var oldValue = undefined;
						if (style.hasOwnProperty(key)) {
							oldValue = style[key];
							delete style[key];
						}
						if (value !== oldValue) {
							setStyleValue(elemStyle, key, value);
						}
					}
				});
				removeStyle(elemStyle, style);
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
	mapValue(isUnitlessNumber, function (_, prop) {
		eachItem(prefixes, function (prefix) {
			return isUnitlessNumber[prefixKey(prefix, prop)] = true;
		});
	});

	var RE_NUMBER = /^-?\d+(\.\d+)?$/;
	var setStyleValue = function setStyleValue(style, key, value) {
		if (!isUnitlessNumber[key] && RE_NUMBER.test(value)) {
			style[key] = value + 'px';
		} else {
			style[key] = value;
		}
	};
	exports.setStyleValue = setStyleValue;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = Component;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _util = __webpack_require__(1);

	var _ = _interopRequireWildcard(_util);

	var _virtualDom = __webpack_require__(4);

	function Updater(instant) {
		this.instant = instant;
		this.pendingState = null;
		this.pendingCallback = null;
		this.isPendingForceUpdate = false;
	}

	Updater.prototype = {
		constructor: Updater,
		emitUpdate: function emitUpdate(nextProps) {
			var instant = this.instant;
			var pendingState = this.pendingState;
			var pendingCallback = this.pendingCallback;

			if (nextProps || pendingState) {
				var props = nextProps || instant.props;
				var state = pendingState || instant.state;
				shouldUpdate(instant, props, state, pendingCallback);
			}
			this.pendingState = null;
			this.pendingCallback = null;
		},
		addState: function addState(nextState) {
			if (nextState) {
				this.pendingState = nextState;
				if (this.isPendingForceUpdate === false) {
					this.emitUpdate();
				}
			}
		},
		addCallback: function addCallback(callback) {
			if (_.isFn(callback)) {
				this.pendingCallback = callback;
			}
		}
	};

	function Component(props) {
		this.$updater = new Updater(this);
		this.$cache = {};
		this.props = props;
		this.state = {};
		this.refs = {};
		this.$id = _.getUid();
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
			var nextVtree = checkVtree(this.render());
			vtree.updateTree(nextVtree, node && node.parentNode);
			this.vtree = nextVtree;
			this.componentDidUpdate(props, state);
			if (_.isFn(callback)) {
				callback.call(this);
			}
		},
		setState: function setState(nextState, callback) {
			var props = this.props;
			var state = this.state;
			var $updater = this.$updater;

			if (_.isFn(nextState)) {
				nextState = nextState.call(this, state, props);
			}
			if (_.isObj(nextState)) {
				nextState = _.extend({}, state, nextState);
			}
			$updater.addCallback(callback);
			$updater.addState(nextState);
		},
		getDOMNode: function getDOMNode() {
			var node = this.vtree.node;
			return node.tagName === 'NOSCRIPT' ? null : node;
		},
		replaceState: function replaceState(nextState, callback) {
			if (!_.isObj(nextState)) {
				return;
			}
			var $updater = this.$updater;

			$updater.addCallback(callback);
			$updater.addState(nextState);
		}
	};

	var checkVtree = function checkVtree(vtree) {
		if (_.isUndefined(vtree)) {
			throw new Error('component can not render undefined');
		}
		return _virtualDom.getVnode(vtree);
	};

	exports.checkVtree = checkVtree;
	var updatePropsAndState = function updatePropsAndState(component, props, state) {
		component.state = state;
		component.props = props;
	};

	exports.updatePropsAndState = updatePropsAndState;
	var shouldUpdate = function shouldUpdate(component, nextProps, nextState, callback) {
		var $cache = component.$cache;

		var shouldUpdate = component.shouldComponentUpdate(nextProps, nextState);
		if (shouldUpdate === false) {
			updatePropsAndState(component, nextProps, nextState);
			return;
		}
		updatePropsAndState(component.$cache, nextProps, nextState);
		component.forceUpdate(callback);
	};
	exports.shouldUpdate = shouldUpdate;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var VNODE_TYPE = {
		ELEMENT: 1,
		COMPONENT: 2,
		STATELESS_COMPONENT: 3,
		TEXT: 4
	};
	exports.VNODE_TYPE = VNODE_TYPE;
	var DIFF_TYPE = {
		CREATE: 1,
		REMOVE: 2,
		REPLACE: 3,
		UPDATE: 4
	};

	exports.DIFF_TYPE = DIFF_TYPE;
	var COMPONENT_ID = 'data-liteid';
	exports.COMPONENT_ID = COMPONENT_ID;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Vtext = Vtext;
	exports.Velem = Velem;
	exports.VstatelessComponent = VstatelessComponent;
	exports.Vcomponent = Vcomponent;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _util = __webpack_require__(1);

	var _ = _interopRequireWildcard(_util);

	var _constant = __webpack_require__(3);

	var _component = __webpack_require__(2);

	var _diff = __webpack_require__(8);

	var _diff2 = _interopRequireDefault(_diff);

	function Vtree(properties) {
		_.extend(this, properties);
	}

	var noop = function noop() {};
	Vtree.prototype = {
		constructor: Vtree,
		eachChildren: noop,
		mapTree: noop,
		initTree: noop,
		destroyTree: noop,
		attachRef: noop,
		detachRef: noop,
		updateRef: noop,
		updateTree: function updateTree(nextVtree, parentNode) {
			_updateTree(this, nextVtree, parentNode);
		}
	};

	function Vtext(text) {
		this.text = text;
	}

	Vtext.prototype = new Vtree({
		constructor: Vtext,
		vtype: _constant.VNODE_TYPE.TEXT,
		update: function update(nextVtext) {
			var node = this.node;
			var text = this.text;

			if (nextVtext.text !== text) {
				node.replaceData(0, node.length, nextVtext.text);
			}
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

	function Velem(type, props, children) {
		this.type = type;
		this.props = props;
		this.children = children;
	}

	var detachTree = function detachTree(vtree) {
		var props = vtree.props;
		var vtype = vtree.vtype;

		vtree.detachRef(props && props.ref);
		unbindRefs(vtree);
		if (vtype === _constant.VNODE_TYPE.COMPONENT) {
			vtree.component.vtree.destroyTree();
		} else if (vtype === _constant.VNODE_TYPE.STATELESS_COMPONENT) {
			vtree.destroyTree();
		}
	};
	var destroyTree = function destroyTree(vtree) {
		return vtree.destroyTree();
	};
	Velem.prototype = new Vtree({
		constructor: Velem,
		vtype: _constant.VNODE_TYPE.ELEMENT,
		eachChildren: function eachChildren(iteratee) {
			var _this = this;

			var children = this.children;
			var sorted = this.sorted;

			if (sorted) {
				_.eachItem(children, iteratee);
				return;
			}
			if (children && children.length > 0) {
				(function () {
					var newChildren = [];
					_.forEach(children, function (vchild, index) {
						vchild = getVnode(vchild);
						iteratee(vchild, index);
						newChildren.push(vchild);
					});
					_this.children = newChildren;
					_this.sorted = true;
				})();
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

			var node = this.node = createElement(type, props);
			this.eachChildren(function (vchild) {
				vchild.initTree(node);
			});
			appendNode(parentNode, node);
			this.attachRef(props && props.ref, node);
		},
		destroyTree: function destroyTree() {
			var node = this.node;
			var props = this.props;

			this.mapTree(detachTree);
			removeNode(node);
		},
		update: function update(newVelem) {
			var node = this.node;
			var props = this.props;

			_.patchProps(node, props, newVelem.props);

			var children = this.children || [];
			newVelem.node = node;
			newVelem.eachChildren(function (newVchild, index) {
				newVelem;
				var vchild = children[index];
				if (vchild) {
					vchild.updateTree(newVchild, node);
				} else {
					newVchild.initTree(node);
				}
			});

			var newVchildLen = newVelem.children && newVelem.children.length ? newVelem.children.length : 0;
			if (children.length > newVchildLen) {
				_.eachItem(children.slice(newVchildLen), destroyTree);
			}
			var newRefKey = newVelem.props && newVelem.props.ref;
			var oldRefKey = props && props.ref;
			if (oldRefKey !== newRefKey) {
				this.updateRef(newRefKey, oldRefKey, node);
			}
			if (this.detachRef !== noop) {
				newVelem.detachRef = this.detachRef;
				newVelem.attachRef = this.attachRef;
				newVelem.updateRef = this.updateRef;
			}
		}
	});

	function VstatelessComponent(type, props, children) {
		this.type = type;
		this.props = props;
		this.children = children;
	}

	VstatelessComponent.prototype = new Vtree({
		constructor: VstatelessComponent,
		vtype: _constant.VNODE_TYPE.STATELESS_COMPONENT,
		mapTree: function mapTree(iteratee) {
			iteratee(this);
		},
		renderTree: function renderTree() {
			var factory = this.type;

			var props = _.mergeProps(this.props, this.children, factory.defaultProps);
			var vtree = factory(props);
			if (_.isObj(vtree) && _.isFn(vtree.render)) {
				vtree = vtree.render();
			}
			this.vtree = getVnode(vtree);
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
			var vtree = this.vtree;

			newVtree.renderTree();
			vtree.updateTree(newVtree.vtree, parentNode);
		}
	});

	function Vcomponent(type, props, children) {
		this.type = type;
		this.props = props;
		this.children = children;
	}

	Vcomponent.prototype = new Vtree({
		constructor: Vcomponent,
		vtype: _constant.VNODE_TYPE.COMPONENT,
		mapTree: function mapTree(iteratee) {
			iteratee(this);
		},
		initTree: function initTree(parentNode) {
			var Component = this.type;

			var props = _.mergeProps(this.props, this.children, Component.defaultProps);
			var component = this.component = new Component(props);
			var updater = component.$updater;
			updater.isPendingForceUpdate = true;
			component.props = component.props || props;
			component.componentWillMount();
			if (updater.pendingState) {
				_component.updatePropsAndState(component, component.props, updater.pendingState);
				updater.pendingState = null;
			}
			var vtree = _component.checkVtree(component.render());
			vtree.mapTree(bindRefs(component.refs));
			component.vtree = vtree;
			vtree.initTree(parentNode);
			var node = component.node = this.node = vtree.node;
			var componentId = _.getAttr(node, _constant.COMPONENT_ID);
			if (componentId) {
				componentId = component.$id + ',' + componentId;
			} else {
				componentId = component.$id;
			}
			_.setAttr(node, _constant.COMPONENT_ID, componentId);
			component.componentDidMount();
			updater.isPendingForceUpdate = false;
			updater.emitUpdate();
			this.attachRef(props.ref, component);
		},
		destroyTree: function destroyTree() {
			var component = this.component;
			var props = this.props;

			component.componentWillUnmount();
			detachTree(this);
			this.component = this.node = component.node = component.refs = null;
		},
		update: function update(newVtree, parentNode) {
			var component = this.component;

			if (!component) {
				return;
			}
			var Component = newVtree.type;
			var props = newVtree.props;
			var children = newVtree.children;

			var nextProps = _.mergeProps(props, children, Component.defaultProps);
			var updater = component.$updater;
			newVtree.component = component;
			updater.isPendingForceUpdate = true;
			component.componentWillReceiveProps(nextProps);
			updater.isPendingForceUpdate = false;
			updater.emitUpdate(nextProps);
			var newRefKey = nextProps.ref;
			var oldRefKey = this.props && this.props.ref;
			if (newRefKey !== oldRefKey) {
				this.updateRef(newRefKey, oldRefKey, component);
			}
			if (this.detachRef !== noop) {
				newVtree.detachRef = this.detachRef;
				newVtree.attachRef = this.attachRef;
				newVtree.updateRef = this.updateRef;
			}
		}
	});

	var _updateTree = function _updateTree(vtree, newVtree, parentNode) {
		var diffType = _diff2['default'](vtree, newVtree);
		switch (diffType) {
			case _constant.DIFF_TYPE.CREATE:
				newVtree.initTree(parentNode);
				break;
			case _constant.DIFF_TYPE.REMOVE:
				vtree.destroyTree();
				break;
			case _constant.DIFF_TYPE.REPLACE:
				newVtree.initTree(function (newNode) {
					replaceNode(parentNode, newNode, vtree.node);
				});
				vtree.destroyTree();
				break;
			case _constant.DIFF_TYPE.UPDATE:
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
			if (_.isFn(parentNode)) {
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
	var createElement = function createElement(tagName, props) {
		var node = document.createElement(tagName);
		props && _.setProps(node, props);
		return node;
	};

	var getVnode = function getVnode(vnode) {
		if (vnode === null || vnode === false) {
			vnode = new Velem('noscript');
		} else if (!_.isObj(vnode)) {
			vnode = new Vtext(vnode);
		}
		return vnode;
	};

	exports.getVnode = getVnode;
	var getDOMNode = function getDOMNode() {
		return this;
	};

	var attachRef = function attachRef(refKey, refValue, refs) {
		if (refValue && refValue.nodeName) {
			refValue.getDOMNode = getDOMNode;
		}
		if (_.isFn(refKey)) {
			refKey(refValue);
		} else if (_.isStr(refKey)) {
			refs[refKey] = refValue;
		}
	};

	var detachRef = function detachRef(refKey, refs) {
		if (_.isFn(refKey)) {
			refKey(null);
		} else if (_.isStr(refKey)) {
			delete refs[refKey];
		}
	};

	var updateRef = function updateRef(newRefKey, oldRefKey, refValue, refs) {
		detachRef(oldRefKey, refs);
		attachRef(newRefKey, refValue, refs);
	};

	var bindRefs = function bindRefs(refs) {
		var $attachRef = function $attachRef(refKey, refValue) {
			return attachRef(refKey, refValue, refs);
		};
		var $detachRef = function $detachRef(refKey) {
			return detachRef(refKey, refs);
		};
		var $updateRef = function $updateRef(newRefKey, oldRefKey, refValue) {
			return updateRef(newRefKey, oldRefKey, refValue, refs);
		};
		return function (vnode) {
			if (vnode.vtype === _constant.VNODE_TYPE.TEXT || vnode.vtype === _constant.VNODE_TYPE.STATELESS_COMPONENT) {
				return;
			}
			var props = vnode.props;

			if (!props || _.isUndefined(props.ref)) {
				return;
			}
			vnode.attachRef = $attachRef;
			vnode.detachRef = $detachRef;
			vnode.updateRef = $updateRef;
		};
	};

	var unbindRefs = function unbindRefs(vnode) {
		delete vnode.attachRef;
		delete vnode.detachRef;
		delete vnode.updateRef;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _util = __webpack_require__(1);

	var _ = _interopRequireWildcard(_util);

	var _constant = __webpack_require__(3);

	var store = {};
	var render = function render(vtree, container, callback) {
		if (!vtree) {
			throw new Error('cannot render ' + vtree + ' to container');
		}
		var id = _.getAttr(container, _constant.COMPONENT_ID);
		if (store.hasOwnProperty(id)) {
			store[id].updateTree(vtree, container);
		} else {
			_.setAttr(container, _constant.COMPONENT_ID, id = _.getUid());
			container.innerHTML = '';
			vtree.initTree(container);
		}
		store[id] = vtree;

		var result = undefined;

		switch (vtree.vtype) {
			case _constant.VNODE_TYPE.ELEMENT:
				result = container.firstChild;
				break;
			case _constant.VNODE_TYPE.COMPONENT:
				result = vtree.component;
				break;
			default:
				result = null;
		}

		if (_.isFn(callback)) {
			callback.call(result);
		}

		return result;
	};

	exports.render = render;
	var unmountComponentAtNode = function unmountComponentAtNode(container) {
		var id = _.getAttr(container, _constant.COMPONENT_ID);
		if (store.hasOwnProperty(id)) {
			store[id].destroyTree(container);
			delete store[id];
			return true;
		}
		return false;
	};

	exports.unmountComponentAtNode = unmountComponentAtNode;
	var findDOMNode = function findDOMNode(node) {
		return node.nodeName ? node : node.getDOMNode();
	};
	exports.findDOMNode = findDOMNode;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _util = __webpack_require__(1);

	var _ = _interopRequireWildcard(_util);

	var _component = __webpack_require__(2);

	var _component2 = _interopRequireDefault(_component);

	var combineMixin = function combineMixin(proto, mixin) {
		_.mapValue(mixin, function (value, key) {
			var curValue = proto[key];
			if (_.isFn(curValue) && _.isFn(value)) {
				proto[key] = _.pipe(curValue, value);
			} else {
				proto[key] = value;
			}
		});
	};
	var combineMixins = function combineMixins(proto, mixins) {
		_.eachItem(mixins, function (mixin) {
			return combineMixin(proto, mixin);
		});
	};

	var bindContext = function bindContext(obj, source) {
		_.mapValue(source, function (value, key) {
			if (_.isFn(value)) {
				obj[key] = value.bind(obj);
			}
		});
	};

	var Facade = function Facade() {};
	Facade.prototype = _component2['default'].prototype;

	var createClass = function createClass(spec) {
		var mixins = spec.mixins || [];
		function Klass(props) {
			_component2['default'].call(this, props);
			bindContext(this, Klass.prototype);
			if (_.isFn(this.getInitialState)) {
				this.state = this.getInitialState();
			}
		}
		Klass.prototype = new Facade();
		combineMixins(Klass.prototype, mixins.concat(spec));
		if (_.isObj(spec.statics)) {
			_.mapValue(spec.statics, function (value, key) {
				Klass[key] = value;
			});
		}
		if (_.isFn(spec.getDefaultProps)) {
			Klass.defaultProps = spec.getDefaultProps();
		}
		return Klass;
	};

	exports.createClass = createClass;
	exports['default'] = createClass;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _util = __webpack_require__(1);

	var _ = _interopRequireWildcard(_util);

	var _virtualDom = __webpack_require__(4);

	var createElement = function createElement(type, props) {
		for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			children[_key - 2] = arguments[_key];
		}

		var Vnode = undefined;
		switch (true) {
			case _.isStr(type):
				Vnode = _virtualDom.Velem;
				break;
			case _.isComponent(type):
				Vnode = _virtualDom.Vcomponent;
				break;
			case _.isStatelessComponent(type):
				Vnode = _virtualDom.VstatelessComponent;
				break;
			default:
				throw new Error('React.createElement: unexpect type ' + type);
		}
		if (children.length === 0) {
			children = undefined;
		}
		return new Vnode(type, props, children);
	};

	exports['default'] = createElement;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _constant = __webpack_require__(3);

	var _util = __webpack_require__(1);

	var _ = _interopRequireWildcard(_util);

	var diff = function diff(vnode, newVnode) {
		var type = undefined;
		switch (true) {
			case vnode === newVnode:
				return null;
			case _.isUndefined(newVnode):
				type = _constant.DIFF_TYPE.REMOVE;
				break;
			case _.isUndefined(vnode):
				type = _constant.DIFF_TYPE.CREATE;
				break;
			case vnode.type !== newVnode.type:
				type = _constant.DIFF_TYPE.REPLACE;
				break;
			case _.hasKey(newVnode):
				if (!_.hasKey(vnode) || newVnode.props.key !== vnode.props.key) {
					type = _constant.DIFF_TYPE.REPLACE;
				} else {
					type = _constant.DIFF_TYPE.UPDATE;
				}
				break;
			case _.hasKey(vnode):
				type = _constant.DIFF_TYPE.REPLACE;
				break;
			default:
				type = _constant.DIFF_TYPE.UPDATE;
		}
		return type;
	};

	exports['default'] = diff;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;