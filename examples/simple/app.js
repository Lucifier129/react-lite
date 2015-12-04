/******/ (function(modules) { // webpackBootstrap
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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var style = {
		width: 500,
		height: 100,
		background: '#eaeaea'
	};

	var vnode = _react2['default'].createElement(
		'div',
		{ id: 'header', className: 'header', style: style },
		'Hello',
		_react2['default'].createElement(
			'span',
			{ className: 'highlight', style: 'padding:0 10px; color: #fff; background:pink;' },
			'react'
		)
	);

	var nextVnode = _react2['default'].createElement(
		'div',
		{ id: 'header', className: 'header', style: style },
		'Hello',
		_react2['default'].createElement(
			'span',
			{ className: 'highlight', 'data-test': 'abd', style: 'padding:0 10px; color: #fff; background:blue;' },
			'world'
		),
		'sdafasdfasdf',
		_react2['default'].createElement(
			'div',
			null,
			_react2['default'].createElement(
				'span',
				{ className: 'highlight', 'data-test': 'abd', style: 'padding:0 10px; color: #fff; background:blue;' },
				'world'
			)
		),
		_react2['default'].createElement(
			'span',
			{ className: 'highlight', 'data-test': 'abd', style: 'padding:0 10px; color: #fff; background:blue;' },
			'world'
		),
		_react2['default'].createElement(
			'span',
			{ className: 'highlight', 'data-test': 'abd', style: 'padding:0 10px; color: #fff; background:blue;' },
			'world'
		),
		_react2['default'].createElement(
			'span',
			{ className: 'highlight', 'data-test': 'abd', style: 'padding:0 10px; color: #fff; background:blue;' },
			'world'
		)
	);

	var container = document.getElementById('container');
	var count = 0;
	var update = function update() {
		var patches = undefined;
		count += 1;
		if (count % 2) {
			_react2['default'].render(vnode, container);
		} else {
			_react2['default'].render(nextVnode, container);
		}
	};

	setInterval(update, 1000);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _hyperscript = __webpack_require__(2);

	var _hyperscript2 = _interopRequireDefault(_hyperscript);

	var _render = __webpack_require__(30);

	var _component = __webpack_require__(10);

	var _util = __webpack_require__(20);

	var _refer = __webpack_require__(11);

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
		h: _hyperscript2['default'],
		info: _util.info,
		Component: _component.Component,
		createClass: _component.createClass,
		Children: Children,
		render: _render.render,
		findDOMNode: _component.findDOMNode,
		PropTypes: PropTypes,
		unmount: _render.unmount,
		unmountComponentAtNode: _render.unmount,
		createElement: _hyperscript2['default'],
		createStore: _refer.createStore,
		createLogger: _refer.createLogger,
		createDispatch: _refer.createDispatch,
		createHandler: _refer.createHandler,
		combineHandlers: _refer.combineHandlers,
		constants: _refer.constants,
		mapValues: _refer.mapValues,
		types: _refer.types
	};
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _virtualDom = __webpack_require__(3);

	var _component = __webpack_require__(10);

	var _refer = __webpack_require__(11);

	var _DOMPropertyOperations = __webpack_require__(21);

	var _DOMProperty = __webpack_require__(23);

	var _HTMLDOMPropertyConfig = __webpack_require__(27);

	var _HTMLDOMPropertyConfig2 = _interopRequireDefault(_HTMLDOMPropertyConfig);

	var _SVGDOMPropertyConfig = __webpack_require__(29);

	var _SVGDOMPropertyConfig2 = _interopRequireDefault(_SVGDOMPropertyConfig);

	var _util = __webpack_require__(20);

	var isFn = _refer.types.isFn;
	var isStr = _refer.types.isStr;
	var isObj = _refer.types.isObj;
	var isNum = _refer.types.isNum;

	_DOMProperty.injection.injectDOMPropertyConfig(_HTMLDOMPropertyConfig2['default']);
	_DOMProperty.injection.injectDOMPropertyConfig(_SVGDOMPropertyConfig2['default']);

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

	var RE_NUMBER = /^\d+(\.\d+)?$/;
	var checkNum = function checkNum(obj) {
		return isNum(obj) || isStr(obj) && RE_NUMBER.test(obj);
	};
	var checkUnit = function checkUnit(style) {
		for (var key in style) {
			if (checkNum(style[key]) && !isUnitlessNumber[key]) {
				style[key] += 'px';
			}
		}
		return style;
	};
	var onchanging = null;
	var checkEvent = function checkEvent(props) {
		var handle = props.onchange;
		if (isFn(handle)) {
			var onchange = function onchange(e) {
				onchanging = handle;
				handle.call(this, e);
				onchanging = null;
			};
			props.onchange = onchange;
			props.oninput = isFn(props.oninput) ? _util.pipe(props.oninput, onchange) : onchange;
			if (onchanging === handle && 'value' in props) {
				delete props.value;
			}
		}
		return props;
	};
	var isKey = function isKey(name) {
		return name === 'key';
	};
	var isEvent = function isEvent(name) {
		return (/^on/.test(name)
		);
	};
	var isStyle = function isStyle(name) {
		return name === 'style';
	};
	var isRef = function isRef(name) {
		return name === 'ref';
	};
	var assign = function assign(properties) {
		if (properties == null) {
			return properties;
		}
		var props = {
			attributes: {}
		};
		var hasChange = undefined;
		for (var _name in properties) {
			if (!properties.hasOwnProperty(_name)) {
				continue;
			}
			var value = properties[_name];
			if (isKey(_name)) {
				if (value != null) {
					props[_name] = value;
					hasChange = true;
				}
			} else if (isEvent(_name)) {
				if (isFn(value)) {
					props[_name.toLowerCase()] = value;
					hasChange = true;
				}
			} else if (isStyle(_name)) {
				if (isStr(value)) {
					props.attributes[_name] = value;
					hasChange = true;
				} else if (isObj(value)) {
					props[_name] = checkUnit(value);
					hasChange = true;
				}
			} else if (isRef(_name)) {
				if (isStr(value)) {
					var refKey = value;
					var refValue = value;
					props.attributes['data-refid'] = _component.collectRef(refKey, refValue);
					hasChange = true;
				}
			} else {
				hasChange = _DOMPropertyOperations.assignProperties(props, _name, value) || hasChange;
			}
		}
		return hasChange ? checkEvent(props) : null;
	};

	var getProps = function getProps(properties, children) {
		var length = children.length;

		properties = properties || {};
		if (length > 0) {
			properties.children = length === 1 ? children[0] : children;
		}
		return properties;
	};

	exports['default'] = function (tagName, properties) {
		for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			children[_key - 2] = arguments[_key];
		}

		var isComponent = isFn(tagName) && isFn(tagName.prototype.render);
		if (isComponent) {
			return new _component.Widget(tagName, getProps(properties, children));
		}
		if (isFn(tagName)) {
			tagName = tagName(getProps(properties, children));
		}
		var props = assign(properties);
		return _virtualDom.h.apply(undefined, [tagName, props].concat(children.filter(function (child) {
			return typeof child !== 'boolean';
		})));
	};

	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _create = __webpack_require__(4);

	var _create2 = _interopRequireDefault(_create);

	var _diff = __webpack_require__(6);

	var _diff2 = _interopRequireDefault(_diff);

	var _patch = __webpack_require__(8);

	var _patch2 = _interopRequireDefault(_patch);

	var _hyperscript = __webpack_require__(9);

	var _hyperscript2 = _interopRequireDefault(_hyperscript);

	exports['default'] = {
		h: _hyperscript2['default'],
		diff: _diff2['default'],
		patch: _patch2['default'],
		create: _create2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _util = __webpack_require__(5);

	/**
	* 根据 tagName props attrs 创建 real-dom
	*/
	var create = function create(vnode) {
		if (_util.isStr(vnode)) {
			return document.createTextNode(vnode);
		}
		var tagName = vnode.tagName;
		var props = vnode.props;
		var children = vnode.children;

		var elem = document.createElement(tagName);
		if (_util.isObj(props)) {
			setProps(elem, props);
		}
		if (children && children.length > 0) {
			children.forEach(function (child) {
				return addChild(elem, child);
			});
		}
		return elem;
	};

	exports['default'] = create;
	var addChild = function addChild(elem, child) {
		var childNode = create(child);
		elem.appendChild(childNode);
	};

	exports.addChild = addChild;
	var setProps = function setProps(elem, props) {
		Object.keys(props).forEach(function (key) {
			var value = props[key];
			if (key === 'attributes') {
				return setAttrs(elem, value);
			}
			if (key === 'style') {
				return setStyle(elem, value);
			}
			elem[key] = value;
		});
	};

	exports.setProps = setProps;
	var setAttrs = function setAttrs(elem, attrs) {
		if (!_util.isObj(attrs)) {
			return;
		}
		Object.keys(attrs).forEach(function (attrName) {
			elem.setAttribute(attrName, attrs[attrName]);
		});
	};

	exports.setAttrs = setAttrs;
	var setStyle = function setStyle(elem, style) {
		if (!_util.isObj(style)) {
			return;
		}
		Object.keys(style).forEach(function (key) {
			elem.style[key] = style[key];
		});
	};
	exports.setStyle = setStyle;

/***/ },
/* 5 */
/***/ function(module, exports) {

	//types.js
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _util = __webpack_require__(5);

	var _constant = __webpack_require__(7);

	/**
	* diff vnode and newVnode
	*/
	var diff = function diff(vnode, newVnode) {
		var patches = {};
		switch (true) {
			case newVnode == null:
				patches.type = _constant.REMOVE;
				break;
			case vnode == null:
				patches.type = _constant.CREATE;
				patches.vnode = newVnode;
				break;
			case (_util.isStr(vnode) || _util.isStr(newVnode)) && vnode !== newVnode:
				patches.type = _constant.REPLACE;
				patches.vnode = newVnode;
				break;
			case vnode.tagName !== newVnode.tagName:
				patches.type = _constant.REPLACE;
				patches.vnode = newVnode;
				break;
			case !!(vnode.props || newVnode.props):
				patches.type = _constant.PROPS;
				patches.store = {
					props: vnode.props,
					newProps: newVnode.props
				};
				break;
		}
		if (!patches.type || patches.type === _constant.PROPS) {
			var childrenPatches = {};
			var children = vnode.children;
			var newChildren = newVnode.children;
			if (!children || children.length === 0) {
				if (newChildren && newChildren.length > 0) {
					childrenPatches.type = _constant.CREATE;
					childrenPatches.vnodes = newChildren;
				}
			} else if (!newChildren || newChildren.length === 0) {
				childrenPatches.type = _constant.REMOVE;
			} else {
				var _length = Math.max(children.length, newChildren.length);
				var store = [];
				for (var i = 0; i < _length; i += 1) {
					var item = diff(children[i], newChildren[i]);
					store.push(item);
				}
				childrenPatches.type = _constant.REPLACE;
				childrenPatches.store = store;
			}
			if (childrenPatches.type) {
				patches.children = childrenPatches;
			}
		}
		return patches.type || patches.children ? patches : null;
	};

	exports['default'] = diff;
	module.exports = exports['default'];

/***/ },
/* 7 */
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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _util = __webpack_require__(5);

	var _constant = __webpack_require__(7);

	var _create = __webpack_require__(4);

	var _create2 = _interopRequireDefault(_create);

	/**
	* patch dom
	*/

	var patch = function patch(node, patches, parent) {
		if (!patches) {
			return node;
		}

		var newNode = undefined;
		parent = parent || node.parentNode;
		switch (patches.type) {
			case _constant.CREATE:
				newNode = _create2['default'](patches.vnode);
				parent.appendChild(newNode);
				break;
			case _constant.REMOVE:
				parent.removeChild(node);
				break;
			case _constant.REPLACE:
				newNode = _create2['default'](patches.vnode);
				parent.replaceChild(newNode, node);
				break;
			case _constant.PROPS:
				var _patches$store = patches.store,
				    props = _patches$store.props,
				    newProps = _patches$store.newProps;

				applyProps(node, props, newProps);
				break;
		}
		if (!patches.children || patches.type && patches.type !== _constant.PROPS) {
			return newNode || node;
		}

		switch (patches.children.type) {
			case _constant.CREATE:
				patches.children.vnodes.forEach(function (vnode) {
					return node.appendChild(vnode);
				});
				break;
			case _constant.REMOVE:
				Array.prototype.slice.call(node.children).forEach(function (child) {
					return node.removeChild(child);
				});
				break;
			case _constant.REPLACE:
				var children = Array.prototype.slice.call(node.childNodes);
				patches.children.store.forEach(function (childPatches, index) {
					return patch(children[index], childPatches, node);
				});
				break;
		}

		return newNode || node;
	};

	exports['default'] = patch;

	var applyProps = function applyProps(node, props, newProps) {
		if (props == null && _util.isObj(newProps)) {
			return _create.setProps(node, newProps);
		} else if (newProps == null && _util.isObj(props)) {
			return removeProps(node, props);
		}
		Object.keys(_extends({}, props, newProps)).forEach(function (key) {
			if (key === 'attributes') {
				return patchAttrs(node, props.attributes, newProps.attributes);
			} else if (key === 'style') {
				return patchStyle(node, props.style, newProps.style);
			}
			node[key] = newProps[key];
		});
	};

	var removeProps = function removeProps(node, props) {
		Object.keys(props).forEach(function (key) {
			var value = props[key];
			if (key === 'attributes') {
				return removeAttrs(node, value);
			} else if (key === 'style') {
				return removeStyle(node, value);
			}
			try {
				node[key] = '';
			} catch (e) {
				node[key] = null;
			}
		});
	};

	var removeAttrs = function removeAttrs(node, attrs) {
		if (!_util.isObj(attrs)) {
			return;
		}
		Object.keys(attrs).forEach(function (attrName) {
			return node.removeAttribute(attrName);
		});
	};

	var removeStyle = function removeStyle(node, style) {
		if (!_util.isObj(style)) {
			return;
		}
		Object.keys(style).forEach(function (key) {
			return node.style[key] = '';
		});
	};

	var patchAttrs = function patchAttrs(node, attrs, newAttrs) {
		Object.keys(_extends({}, attrs, newAttrs)).forEach(function (attrName) {
			var newAttr = newAttrs[attrName];
			if (newAttr === undefined) {
				node.removeAttribute(attrName);
			} else {
				node.setAttribute(attrName, newAttr);
			}
		});
	};

	var patchStyle = function patchStyle(node, style, newStyle) {
		Object.keys(_extends({}, style, newStyle)).forEach(function (key) {
			var value = newStyle[key];
			node.style[key] = value !== undefined ? value : '';
		});
	};
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _util = __webpack_require__(5);

	/*
	* 创建 virtual-dom
	*/

	var hyperscript = function hyperscript(tagName, props) {
		for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			children[_key - 2] = arguments[_key];
		}

		return {
			tagName: tagName,
			props: props,
			children: children
		};
	};

	exports['default'] = hyperscript;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _refer = __webpack_require__(11);

	var _virtualDom = __webpack_require__(3);

	var _util = __webpack_require__(20);

	var isFn = _refer.types.isFn;
	var isThenable = _refer.types.isThenable;
	var isArr = _refer.types.isArr;
	var isObj = _refer.types.isObj;
	var isStr = _refer.types.isStr;
	var isNum = _refer.types.isNum;
	var GET_TABLE = _refer.constants.GET_TABLE;
	var DISPATCH = _refer.constants.DISPATCH;
	var SHOULD_DISPATCH = _refer.constants.SHOULD_DISPATCH;
	var WILL_UPDATE = _refer.constants.WILL_UPDATE;
	var SHOULD_UPDATE = _refer.constants.SHOULD_UPDATE;
	var DID_UPDATE = _refer.constants.DID_UPDATE;
	var THROW_ERROR = _refer.constants.THROW_ERROR;
	var ASYNC_START = _refer.constants.ASYNC_START;
	var ASYNC_END = _refer.constants.ASYNC_END;
	var SYNC = _refer.constants.SYNC;

	var didMounts = _util.info.didMounts = _util.createCallbackStore('didMounts');
	var clearDidMounts = didMounts.clear;

	exports.clearDidMounts = clearDidMounts;
	var unmounts = _util.info.unmounts = {};
	var callUnmount = function callUnmount(node) {
		var id = node.getAttribute(_util.ATTR_ID);
		if (id && isFn(unmounts[id])) {
			unmounts[id]();
			delete unmounts[id];
		}
	};
	var callUnmounts = function callUnmounts(nextNode, node) {
		//if node is undefined, it would be call by removeChild
		if (!node) {
			node = nextNode;
		}
		if (node.nodeType === 3) {
			return;
		}
		var attr = node && node.getAttribute(_util.ATTR_ID);
		if (!attr) {
			return;
		}
		//if nextNode exist，it must be calling by replaceChild method
		if (nextNode && nextNode.nodeName) {
			nextNode.setAttribute(_util.ATTR_ID, attr);
			node.nextNode = nextNode;
		} else {
			callUnmount(node);
		}
		var widgets = node.querySelectorAll('[' + _util.ATTR_ID + ']');
		Array.prototype.slice.call(widgets).forEach(callUnmount);
	};
	exports.callUnmounts = callUnmounts;
	var checkUnmounts = function checkUnmounts(patch) {
		var NodeProto = Node.prototype;
		var resetRemove = _util.wrapNative(NodeProto, 'removeChild', callUnmounts);
		var resetReplace = _util.wrapNative(NodeProto, 'replaceChild', callUnmounts);
		patch();
		resetRemove();
		resetReplace();
	};

	var richPatch = function richPatch(node, patches) {
		checkUnmounts(function () {
			return _virtualDom.patch(node, patches);
		});
		clearDidMounts();
	};

	exports.richPatch = richPatch;
	var refsStore = _util.info.refsStore = {};
	var clearRefs = function clearRefs(id) {
		if (id in refsStore) {
			delete refsStore[id];
		}
	};
	var getDOMNode = function getDOMNode(refs, refKey, refValue) {
		var selector = '[data-refid="' + refValue + '"]';
		Object.defineProperty(refs, refKey, {
			get: function get() {
				var node = document.body.querySelector(selector);
				if (node) {
					node.getDOMNode = function () {
						return node;
					};
				}
				return node;
			}
		});
	};

	var compId = undefined;
	var oldCompId = undefined;
	var setCompId = function setCompId(newCompId) {
		oldCompId = compId;
		compId = newCompId;
	};
	var resetCompId = function resetCompId() {
		return compId = oldCompId;
	};
	var collectRef = function collectRef(refKey, refValue) {
		if (compId == null || !refValue) {
			return;
		}
		var refs = refsStore[compId] = refsStore[compId] || {};
		if (isStr(refValue)) {
			var refid = compId + '-' + refValue;
			getDOMNode(refs, refKey, refid);
			return refid;
		}
		refs[refKey] = refValue;
	};
	exports.collectRef = collectRef;
	var getRefs = function getRefs(id) {
		return refsStore[id] || {};
	};
	var findDOMNode = function findDOMNode(node) {
		return node || node.getDOMNode();
	};

	exports.findDOMNode = findDOMNode;

	var Widget = (function () {
		function Widget(Component, props) {
			_classCallCheck(this, Widget);

			this.type = 'Widget';
			this.Component = Component;
			this.props = props;
		}

		Widget.prototype.init = function init() {
			var props = this.props;
			var Component = this.Component;

			var component = this.component = new Component(props || Component.defaultProps);
			if (isStr(props.ref)) {
				collectRef(props.ref, component);
			}
			var id = component.$id = _util.getId();
			setCompId(id);
			var vnode = component.vnode = component.render();
			var node = component.node = _virtualDom.create(vnode);
			node.setAttribute(_util.ATTR_ID, id);
			resetCompId();
			component.componentWillMount();
			component.refs = getRefs(id);
			_util.info.component.amount += 1;
			var willUnmount = function willUnmount() {
				_util.info.component.mounts -= 1;
				_util.info.component.unmounts += 1;
				clearRefs(id);
				component.componentWillUnmount();
			};
			var didMount = function didMount() {
				_util.info.component.mounts += 1;
				component.componentDidMount();
				if (isFn(unmounts[id])) {
					unmounts[id] = _util.pipe(willUnmount, unmounts[id]);
				} else {
					unmounts[id] = willUnmount;
				}
			};
			didMounts.push(didMount);
			return node;
		};

		Widget.prototype.update = function update(previous) {
			var component = this.component = previous.component;
			var props = this.props;
			var $cache = component.$cache;

			if (isStr(props.ref)) {
				collectRef(props.ref, component);
			}
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

	var getHook = function getHook(component) {
		var _ref;

		var $cache = component.$cache;

		var shouldComponentUpdate = function shouldComponentUpdate(_ref2) {
			var nextState = _ref2.nextState;

			if ($cache.keepSilent) {
				return;
			}
			var props = component.props;
			var state = component.state;

			var shouldUpdate = component.shouldComponentUpdate(props, nextState);
			if (!shouldUpdate) {
				return;
			}
			$cache.props = props;
			$cache.state = nextState;
			component.forceUpdate();
		};
		return _ref = {}, _ref[WILL_UPDATE] = shouldComponentUpdate, _ref;
	};

	var setState = function setState(nextState) {
		return function (state) {
			return Object.assign({}, state, nextState);
		};
	};

	var Component = (function () {
		function Component(props) {
			_classCallCheck(this, Component);

			var $cache = this.$cache = {
				keepSilent: false
			};
			var handlers = [this.getHandlers(), { setState: setState }, getHook(this)];
			var store = this.$store = _refer.createStore(handlers);
			this.dispatch = store.dispatch;
			this.actions = store.actions;
			this.props = props;
			this.refs = {};
		}

		Component.prototype.getDOMNode = function getDOMNode() {
			return this.node;
		};

		Component.prototype.getHandlers = function getHandlers() {
			return {};
		};

		Component.prototype.setState = function setState(nextState, callback) {
			var $store = this.$store;
			var state = this.state;
			var props = this.props;

			if (isFn(nextState)) {
				nextState = nextState(state, props);
			}
			this.$store.dispatch('setState', nextState);
			if (isFn(callback)) {
				callback();
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

			var nextProps = isObj($cache.props) ? $cache.props : props;
			var nextState = isObj($cache.state) ? $cache.state : state;
			$cache.props = $cache.state = null;
			this.componentWillUpdate(nextProps, nextState);
			this.props = nextProps;
			this.state = nextState;
			setCompId(id);
			clearRefs(id);
			var nextVnode = this.render();
			var patches = _virtualDom.diff(vnode, nextVnode);
			richPatch(node, patches);
			resetCompId();
			//update this.node, if component render new element
			if (node.nextNode) {
				this.node = node.nextNode;
				node.innerHTML = '';
			}
			this.refs = getRefs(id);
			this.vnode = nextVnode;
			this.componentDidUpdate(props, state);
			if (isFn(callback)) {
				callback();
			}
		};

		_createClass(Component, [{
			key: 'state',
			get: function get() {
				return this.$store.getState();
			},
			set: function set(nextState) {
				this.$store.replaceState(nextState, true);
			}
		}]);

		return Component;
	})();

	exports.Component = Component;

	var combineMixin = function combineMixin(proto, mixin) {
		for (var key in mixin) {
			if (!mixin.hasOwnProperty(key)) {
				continue;
			}
			var source = mixin[key];
			var currentValue = proto[key];
			if (currentValue === undefined) {
				proto[key] = source;
			} else if (isFn(currentValue) && isFn(source)) {
				proto[key] = _util.pipe(currentValue, source);
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
			if (source.hasOwnProperty(key) && isFn(source[key])) {
				obj[key] = source[key].bind(obj);
			}
		}
	};

	var createClass = function createClass(options) {
		var mixins = options.mixins || [];
		var defaultProps = isFn(options.getDefaultProps) ? options.getDefaultProps() : null;
		var mixinsForDefaultProps = undefined;
		if (isObj(defaultProps)) {
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

			function Klass(props, context) {
				_classCallCheck(this, Klass);

				_Component.call(this, props, context);
				bindContext(this, Klass.prototype);
				if (isObj(defaultProps)) {
					mixinsForDefaultProps.componentWillReceiveProps(props);
				}
				if (isFn(this.getInitialState)) {
					this.state = this.getInitialState();
				}
			}

			return Klass;
		})(Component);
		combineMixins(Klass.prototype, mixins.concat(options));
		if (isObj(options.statics)) {
			Object.assign(Klass, options.statics);
		}
		return Klass;
	};
	exports.createClass = createClass;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createDispatch2 = __webpack_require__(12);

	var _createDispatch3 = _interopRequireDefault(_createDispatch2);

	exports.createDispatch = _createDispatch3['default'];

	var _createStore2 = __webpack_require__(16);

	var _createStore3 = _interopRequireDefault(_createStore2);

	exports.createStore = _createStore3['default'];

	var _createHandler2 = __webpack_require__(18);

	var _createHandler3 = _interopRequireDefault(_createHandler2);

	exports.createHandler = _createHandler3['default'];

	var _combineHandlers2 = __webpack_require__(17);

	var _combineHandlers3 = _interopRequireDefault(_combineHandlers2);

	exports.combineHandlers = _combineHandlers3['default'];

	var _constants2 = __webpack_require__(15);

	var _constants3 = _interopRequireDefault(_constants2);

	exports.constants = _constants3['default'];

	var _createLogger2 = __webpack_require__(19);

	var _createLogger3 = _interopRequireDefault(_createLogger2);

	exports.createLogger = _createLogger3['default'];

	var _mapValues2 = __webpack_require__(14);

	var _mapValues3 = _interopRequireDefault(_mapValues2);

	exports.mapValues = _mapValues3['default'];

	var _types2 = __webpack_require__(13);

	var _types = _interopRequireWildcard(_types2);

	exports.types = _types;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _types = __webpack_require__(13);

	var _mapValues = __webpack_require__(14);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _constants = __webpack_require__(15);

	var createDispatche = function createDispatche(table) {
		if (!_types.isObj(table)) {
			throw new Error('createDispatche(table): Expected table to be an object which is ' + table);
		}
		var dispatch = function dispatch(_x, _x2) {
			var _again = true;

			_function: while (_again) {
				var key = _x,
				    value = _x2;
				handler = undefined;
				_again = false;

				var handler = undefined;
				switch (true) {
					case key === null:
						return value;
					case key === undefined:
						throw new Error('dispatch(key, value): Expected the key not to be undefined');
					case key === _constants.GET_TABLE:
						return table; // special key to get table
					case _types.isStr(key) || _types.isNum(key):
						handler = table[key];
						break;
					default:
						handler = key;
				}

				switch (true) {
					case handler == null:
						return value;
					case _types.isFn(handler):
						return _types.isThenable(value) ? value.then(handler) : handler(value);
					case _types.isStr(handler) || _types.isNum(handler):
						_x = handler;
						_x2 = value;
						_again = true;
						continue _function;

					case _types.isArr(handler):
						return dispatchOnList(handler, value);
					case _types.isThenable(handler):
						return handler.then(function (asyncHandler) {
							return dispatch(asyncHandler, value);
						});
					case _types.isObj(handler):
						return _mapValues2['default'](handler, function (item) {
							return dispatch(item, value);
						});
					default:
						return value;
				}
			}
		};
		var dispatchOnList = function dispatchOnList(handlers, value) {
			for (var i = 0, len = handlers.length; i < len; i++) {
				value = dispatch(handlers[i], value);
				if (_types.isThenable(value)) {
					return i === len - 1 ? value : value.then(function (result) {
						return dispatch(handlers.slice(i + 1), result);
					});
				}
			}
			return value;
		};

		return dispatch;
	};

	exports['default'] = createDispatche;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports) {

	//types.js
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
	var isArr = Array.isArray || isType('Array');
	exports.isArr = isArr;
	var isThenable = function isThenable(obj) {
	  return obj != null && isFn(obj.then);
	};
	exports.isThenable = isThenable;

/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Applies a function to every key-value pair inside an object.
	 *
	 * @param {Object} obj The source object.
	 * @param {Function} fn The mapper function that receives the value and the key.
	 * @returns {Object} A new object that contains the mapped values for the keys.
	 */
	"use strict";

	exports.__esModule = true;
	var mapValues = function mapValues(obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    result[key] = fn(obj[key], key);
	    return result;
	  }, {});
	};

	exports["default"] = mapValues;
	module.exports = exports["default"];

/***/ },
/* 15 */
/***/ function(module, exports) {

	//life cycle key
	'use strict';

	exports.__esModule = true;
	exports['default'] = {
		GET_TABLE: '@REFER_GET_TABLE_' + Math.random().toString(36).substr(2),
		DISPATCH: '@DISPATCH',
		SHOULD_DISPATCH: '@SHOULD_DISPATCH',
		WILL_UPDATE: '@WILL_UPDATE',
		SHOULD_UPDATE: '@SHOULD_UPDATE',
		DID_UPDATE: '@DID_UPDATE',
		THROW_ERROR: '@THROW_ERROR',
		ASYNC_START: '@ASYNC_START',
		ASYNC_END: '@ASYNC_END',
		SYNC: '@SYNC'
	};
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _types = __webpack_require__(13);

	var _combineHandlers = __webpack_require__(17);

	var _combineHandlers2 = _interopRequireDefault(_combineHandlers);

	var _createDispatch = __webpack_require__(12);

	var _createDispatch2 = _interopRequireDefault(_createDispatch);

	var _mapValues = __webpack_require__(14);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _constants = __webpack_require__(15);

	var createStore = function createStore(rootDisaptch) {
		var initialState = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		if (_types.isArr(rootDisaptch)) {
			rootDisaptch = _createDispatch2['default'](_combineHandlers2['default'].apply(undefined, rootDisaptch));
		} else if (_types.isObj(rootDisaptch)) {
			rootDisaptch = _createDispatch2['default'](rootDisaptch);
		}

		if (!_types.isFn(rootDisaptch)) {
			throw new Error('Expected the rootDisaptch to be a function which is ' + rootDisaptch);
		}

		var listeners = [];
		var subscribe = function subscribe(listener) {
			listeners.push(listener);
			return function () {
				var index = listeners.indexOf(listener);
				if (index !== -1) {
					listeners.splice(index, 1);
				}
			};
		};

		var currentState = initialState;
		var replaceState = function replaceState(nextState, silent) {
			currentState = nextState;
			if (!silent) {
				listeners.forEach(function (listener) {
					return listener();
				});
			}
		};
		var updateCurrentState = function updateCurrentState(data) {
			if (rootDisaptch(_constants.SHOULD_UPDATE, data) !== false) {
				rootDisaptch(_constants.WILL_UPDATE, data);
				replaceState(data.nextState);
				rootDisaptch(_constants.DID_UPDATE, data);
			}
		};

		var getState = function getState() {
			return currentState;
		};
		var getNextState = function getNextState(f) {
			return f(currentState);
		};
		var dispatchError = function dispatchError(error) {
			return Promise.reject(rootDisaptch(_constants.THROW_ERROR, error));
		};

		var isDispatching = false;
		var dispatch = function dispatch(key, value) {
			if (isDispatching) {
				throw new Error('store.dispatch(key, value): handler may not dispatch');
			}

			var currentData = { currentState: currentState, key: key, value: value };

			if (rootDisaptch(_constants.SHOULD_DISPATCH, currentData) === false) {
				return currentState;
			}

			rootDisaptch(_constants.DISPATCH, currentData);

			var nextState = undefined;
			try {
				isDispatching = true;
				nextState = rootDisaptch([key, getNextState], value);
			} catch (error) {
				return dispatchError(error);
			} finally {
				isDispatching = false;
			}

			if (nextState === currentState) {
				return currentState;
			}

			var data = { currentState: currentState, nextState: nextState, key: key, value: value };

			if (!_types.isThenable(nextState)) {
				updateCurrentState(data);
				rootDisaptch(_constants.SYNC, data);
				return currentState;
			}

			rootDisaptch(_constants.ASYNC_START, data);
			return nextState.then(function (nextState) {
				var data = { currentState: currentState, nextState: nextState, key: key, value: value };
				rootDisaptch(_constants.ASYNC_END, data);
				updateCurrentState(data);
				return currentState;
			})['catch'](function (error) {
				rootDisaptch(_constants.ASYNC_END, { currentState: currentState, key: key, value: value });
				return dispatchError(error);
			});
		};

		var createActions = function createActions(obj) {
			return _mapValues2['default'](obj, function (_, key) {
				return function (value) {
					return dispatch(key, value);
				};
			});
		};
		var actions = createActions(rootDisaptch(_constants.GET_TABLE));

		return {
			dispatch: dispatch,
			actions: actions,
			getState: getState,
			replaceState: replaceState,
			subscribe: subscribe,
			createActions: createActions
		};
	};

	exports['default'] = createStore;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createDispatch = __webpack_require__(12);

	var _createDispatch2 = _interopRequireDefault(_createDispatch);

	var _types = __webpack_require__(13);

	var combineHandlers = function combineHandlers() {
		for (var _len = arguments.length, handlers = Array(_len), _key = 0; _key < _len; _key++) {
			handlers[_key] = arguments[_key];
		}

		return handlers.reduce(function (rootHandler, handler) {
			if (_types.isArr(handler)) {
				handler = combineHandlers.apply(undefined, handler);
			}
			var dispatch = _createDispatch2['default'](handler);
			return Object.keys(handler).reduce(function (rootHandler, key) {
				if (!rootHandler[key]) {
					rootHandler[key] = [];
				}
				rootHandler[key].push(function (value) {
					return dispatch(key, value);
				});
				return rootHandler;
			}, rootHandler);
		}, {});
	};

	exports['default'] = combineHandlers;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _types = __webpack_require__(13);

	var combine = function combine(resolve, reject) {
		return function (value) {
			try {
				return resolve(value);
			} catch (error) {
				return reject(error);
			}
		};
	};

	var then = function then(resolve, reject) {
		var item = undefined;
		if (_types.isFn(resolve) && _types.isFn(reject)) {
			item = combine(resolve, reject);
		} else {
			item = resolve;
		}
		this.push(item);
		return this;
	};

	var pipe = function pipe() {
		this.push.apply(this, arguments);
		return this;
	};

	var createHandler = function createHandler() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var handler = [].concat(args);
		handler.then = then;
		handler.pipe = pipe;
		return handler;
	};

	exports['default'] = createHandler;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var attr = 'info' in console ? 'info' : "log";
	var pad = function pad(num) {
		return ('0' + num).slice(-2);
	};

	var timeStore = {};
	var getTime = function getTime() {
		return performance ? performance.now() : new Date().getTime();
	};

	var createLogger = function createLogger(_ref) {
		var _ref$scope = _ref.scope;
		var scope = _ref$scope === undefined ? "ROOT" : _ref$scope;
		var debug = _ref.debug;

		var logger = {
			'@DISPATCH': function DISPATCH() {
				timeStore[scope] = getTime();
			},
			'@DID_UPDATE': function DID_UPDATE(_ref2) {
				var key = _ref2.key;
				var value = _ref2.value;
				var currentState = _ref2.currentState;
				var nextState = _ref2.nextState;

				var time = new Date();
				var formattedTime = time.getHours() + ':' + pad(time.getMinutes()) + ':' + pad(time.getSeconds());
				var takeTime = (getTime() - timeStore[scope]).toFixed(2);
				var message = scope + ': action [' + key + '] end at ' + formattedTime + ', take ' + takeTime + 'ms';

				try {
					console.groupCollapsed(message);
				} catch (e) {
					try {
						console.group(message);
					} catch (e) {
						console.log(message);
					}
				}

				console[attr]('%c value', 'color: #03A9F4; font-weight: bold', value);
				console[attr]('%c prev state', 'color: #9E9E9E; font-weight: bold', currentState);
				console[attr]('%c next state', 'color: #4CAF50; font-weight: bold', nextState);

				try {
					console.groupEnd();
				} catch (e) {
					console.log('-- log end --');
				}
			},
			'@THROW_ERROR': function THROW_ERROR(error) {
				if (debug) {
					throw error;
				}
				return error;
			}
		};
		return logger;
	};

	exports['default'] = createLogger;
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var ATTR_ID = 'data-referid';

	exports.ATTR_ID = ATTR_ID;
	var info = {
		component: {
			amount: 0,
			mounts: 0,
			unmounts: 0
		}
	};

	exports.info = info;
	var getId = function getId() {
		return Math.random().toString(36).substr(2);
	};

	exports.getId = getId;
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
	var createCallbackStore = function createCallbackStore(name) {
		var store = [];
		return {
			name: name,
			clear: function clear() {
				while (store.length) {
					store.shift()();
				}
			},
			push: function push(item) {
				store.push(item);
			},
			store: store
		};
	};

	exports.createCallbackStore = createCallbackStore;
	var wrapNative = function wrapNative(obj, method, fn) {
		var nativeMethod = obj[method];
		var wrapper = function wrapper() {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			fn.apply(this, args);
			return nativeMethod.apply(this, args);
		};
		obj[method] = wrapper;
		return function () {
			return obj[method] = nativeMethod;
		};
	};

	exports.wrapNative = wrapNative;
	if (!Object.assign) {
		Object.assign = function (target) {
			for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
				args[_key3 - 1] = arguments[_key3];
			}

			args.forEach(function (source) {
				for (var key in source) {
					if (!source.hasOwnProperty(key)) {
						continue;
					}
					target[key] = source[key];
				}
			});
			return target;
		};
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DOMPropertyOperations
	 * @typechecks static-only
	 */

	'use strict';

	var DOMProperty = __webpack_require__(23);
	var quoteAttributeValueForBrowser = __webpack_require__(25);

	function shouldIgnoreValue(name, value) {
	  return value == null || DOMProperty.hasBooleanValue[name] && !value || DOMProperty.hasNumericValue[name] && isNaN(value) || DOMProperty.hasPositiveNumericValue[name] && value < 1 || DOMProperty.hasOverloadedBooleanValue[name] && value === false;
	}

	/**
	 * Operations for dealing with DOM properties.
	 */
	var DOMPropertyOperations = {
	  /**
	   * Sets the value for a property on a node.
	   *
	   * @param {DOMElement} node
	   * @param {string} name
	   * @param {*} value
	   */
	  assignProperties: function assignProperties(props, name, value) {
	    var hasChange;
	    if (DOMProperty.isStandardName.hasOwnProperty(name) && DOMProperty.isStandardName[name]) {
	      if (!shouldIgnoreValue(name, value) && DOMProperty.mustUseAttribute[name]) {
	        // `setAttribute` with objects becomes only `[object]` in IE8/9,
	        // ('' + value) makes it output the correct toString()-value.
	        props.attributes[DOMProperty.getAttributeName[name]] = '' + value;
	        hasChange = true;
	      } else {
	        var propName = DOMProperty.getPropertyName[name];
	        // Must explicitly cast values for HAS_SIDE_EFFECTS-properties to the
	        // property type before comparing; only `value` does and is string.
	        if (!DOMProperty.hasSideEffects[name] || '' + props[propName] !== '' + value) {
	          // Contrary to `setAttribute`, object properties are properly
	          // `toString`ed by IE8/9.
	          props[propName] = value;
	          hasChange = true;
	        }
	      }
	    } else if (DOMProperty.isCustomAttribute(name) && value != null) {
	      props.attributes[name] = '' + value;
	      hasChange = true;
	    } else if ("production" !== process.env.NODE_ENV) {
	      console.warn('unknow props: %s', name);
	    }
	    return hasChange;
	  }
	};

	module.exports = DOMPropertyOperations;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 22 */
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DOMProperty
	 * @typechecks static-only
	 */

	/*jslint bitwise: true */

	'use strict';

	var invariant = __webpack_require__(24);

	function checkMask(value, bitmask) {
	  return (value & bitmask) === bitmask;
	}

	var DOMPropertyInjection = {
	  /**
	   * Mapping from normalized, camelcased property names to a configuration that
	   * specifies how the associated DOM property should be accessed or rendered.
	   */
	  MUST_USE_ATTRIBUTE: 0x1,
	  MUST_USE_PROPERTY: 0x2,
	  HAS_SIDE_EFFECTS: 0x4,
	  HAS_BOOLEAN_VALUE: 0x8,
	  HAS_NUMERIC_VALUE: 0x10,
	  HAS_POSITIVE_NUMERIC_VALUE: 0x20 | 0x10,
	  HAS_OVERLOADED_BOOLEAN_VALUE: 0x40,

	  /**
	   * Inject some specialized knowledge about the DOM. This takes a config object
	   * with the following properties:
	   *
	   * isCustomAttribute: function that given an attribute name will return true
	   * if it can be inserted into the DOM verbatim. Useful for data-* or aria-*
	   * attributes where it's impossible to enumerate all of the possible
	   * attribute names,
	   *
	   * Properties: object mapping DOM property name to one of the
	   * DOMPropertyInjection constants or null. If your attribute isn't in here,
	   * it won't get written to the DOM.
	   *
	   * DOMAttributeNames: object mapping React attribute name to the DOM
	   * attribute name. Attribute names not specified use the **lowercase**
	   * normalized name.
	   *
	   * DOMPropertyNames: similar to DOMAttributeNames but for DOM properties.
	   * Property names not specified use the normalized name.
	   *
	   * DOMMutationMethods: Properties that require special mutation methods. If
	   * `value` is undefined, the mutation method should unset the property.
	   *
	   * @param {object} domPropertyConfig the config as described above.
	   */
	  injectDOMPropertyConfig: function injectDOMPropertyConfig(domPropertyConfig) {
	    var Properties = domPropertyConfig.Properties || {};
	    var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
	    var DOMPropertyNames = domPropertyConfig.DOMPropertyNames || {};
	    var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};

	    if (domPropertyConfig.isCustomAttribute) {
	      DOMProperty._isCustomAttributeFunctions.push(domPropertyConfig.isCustomAttribute);
	    }

	    for (var propName in Properties) {
	      "production" !== process.env.NODE_ENV ? invariant(!DOMProperty.isStandardName.hasOwnProperty(propName), 'injectDOMPropertyConfig(...): You\'re trying to inject DOM property ' + '\'%s\' which has already been injected. You may be accidentally ' + 'injecting the same DOM property config twice, or you may be ' + 'injecting two configs that have conflicting property names.', propName) : invariant(!DOMProperty.isStandardName.hasOwnProperty(propName));

	      DOMProperty.isStandardName[propName] = true;

	      var lowerCased = propName.toLowerCase();
	      DOMProperty.getPossibleStandardName[lowerCased] = propName;

	      if (DOMAttributeNames.hasOwnProperty(propName)) {
	        var attributeName = DOMAttributeNames[propName];
	        DOMProperty.getPossibleStandardName[attributeName] = propName;
	        DOMProperty.getAttributeName[propName] = attributeName;
	      } else {
	        DOMProperty.getAttributeName[propName] = lowerCased;
	      }

	      DOMProperty.getPropertyName[propName] = DOMPropertyNames.hasOwnProperty(propName) ? DOMPropertyNames[propName] : propName;

	      if (DOMMutationMethods.hasOwnProperty(propName)) {
	        DOMProperty.getMutationMethod[propName] = DOMMutationMethods[propName];
	      } else {
	        DOMProperty.getMutationMethod[propName] = null;
	      }

	      var propConfig = Properties[propName];
	      DOMProperty.mustUseAttribute[propName] = checkMask(propConfig, DOMPropertyInjection.MUST_USE_ATTRIBUTE);
	      DOMProperty.mustUseProperty[propName] = checkMask(propConfig, DOMPropertyInjection.MUST_USE_PROPERTY);
	      DOMProperty.hasSideEffects[propName] = checkMask(propConfig, DOMPropertyInjection.HAS_SIDE_EFFECTS);
	      DOMProperty.hasBooleanValue[propName] = checkMask(propConfig, DOMPropertyInjection.HAS_BOOLEAN_VALUE);
	      DOMProperty.hasNumericValue[propName] = checkMask(propConfig, DOMPropertyInjection.HAS_NUMERIC_VALUE);
	      DOMProperty.hasPositiveNumericValue[propName] = checkMask(propConfig, DOMPropertyInjection.HAS_POSITIVE_NUMERIC_VALUE);
	      DOMProperty.hasOverloadedBooleanValue[propName] = checkMask(propConfig, DOMPropertyInjection.HAS_OVERLOADED_BOOLEAN_VALUE);

	      "production" !== process.env.NODE_ENV ? invariant(!DOMProperty.mustUseAttribute[propName] || !DOMProperty.mustUseProperty[propName], 'DOMProperty: Cannot require using both attribute and property: %s', propName) : invariant(!DOMProperty.mustUseAttribute[propName] || !DOMProperty.mustUseProperty[propName]);
	      "production" !== process.env.NODE_ENV ? invariant(DOMProperty.mustUseProperty[propName] || !DOMProperty.hasSideEffects[propName], 'DOMProperty: Properties that have side effects must use property: %s', propName) : invariant(DOMProperty.mustUseProperty[propName] || !DOMProperty.hasSideEffects[propName]);
	      "production" !== process.env.NODE_ENV ? invariant(!!DOMProperty.hasBooleanValue[propName] + !!DOMProperty.hasNumericValue[propName] + !!DOMProperty.hasOverloadedBooleanValue[propName] <= 1, 'DOMProperty: Value can be one of boolean, overloaded boolean, or ' + 'numeric value, but not a combination: %s', propName) : invariant(!!DOMProperty.hasBooleanValue[propName] + !!DOMProperty.hasNumericValue[propName] + !!DOMProperty.hasOverloadedBooleanValue[propName] <= 1);
	    }
	  }
	};
	var defaultValueCache = {};

	/**
	 * DOMProperty exports lookup objects that can be used like functions:
	 *
	 *   > DOMProperty.isValid['id']
	 *   true
	 *   > DOMProperty.isValid['foobar']
	 *   undefined
	 *
	 * Although this may be confusing, it performs better in general.
	 *
	 * @see http://jsperf.com/key-exists
	 * @see http://jsperf.com/key-missing
	 */
	var DOMProperty = {

	  ID_ATTRIBUTE_NAME: 'data-referid',

	  /**
	   * Checks whether a property name is a standard property.
	   * @type {Object}
	   */
	  isStandardName: {},

	  /**
	   * Mapping from lowercase property names to the properly cased version, used
	   * to warn in the case of missing properties.
	   * @type {Object}
	   */
	  getPossibleStandardName: {},

	  /**
	   * Mapping from normalized names to attribute names that differ. Attribute
	   * names are used when rendering markup or with `*Attribute()`.
	   * @type {Object}
	   */
	  getAttributeName: {},

	  /**
	   * Mapping from normalized names to properties on DOM node instances.
	   * (This includes properties that mutate due to external factors.)
	   * @type {Object}
	   */
	  getPropertyName: {},

	  /**
	   * Mapping from normalized names to mutation methods. This will only exist if
	   * mutation cannot be set simply by the property or `setAttribute()`.
	   * @type {Object}
	   */
	  getMutationMethod: {},

	  /**
	   * Whether the property must be accessed and mutated as an object property.
	   * @type {Object}
	   */
	  mustUseAttribute: {},

	  /**
	   * Whether the property must be accessed and mutated using `*Attribute()`.
	   * (This includes anything that fails `<propName> in <element>`.)
	   * @type {Object}
	   */
	  mustUseProperty: {},

	  /**
	   * Whether or not setting a value causes side effects such as triggering
	   * resources to be loaded or text selection changes. We must ensure that
	   * the value is only set if it has changed.
	   * @type {Object}
	   */
	  hasSideEffects: {},

	  /**
	   * Whether the property should be removed when set to a falsey value.
	   * @type {Object}
	   */
	  hasBooleanValue: {},

	  /**
	   * Whether the property must be numeric or parse as a
	   * numeric and should be removed when set to a falsey value.
	   * @type {Object}
	   */
	  hasNumericValue: {},

	  /**
	   * Whether the property must be positive numeric or parse as a positive
	   * numeric and should be removed when set to a falsey value.
	   * @type {Object}
	   */
	  hasPositiveNumericValue: {},

	  /**
	   * Whether the property can be used as a flag as well as with a value. Removed
	   * when strictly equal to false; present without a value when strictly equal
	   * to true; present with a value otherwise.
	   * @type {Object}
	   */
	  hasOverloadedBooleanValue: {},

	  /**
	   * All of the isCustomAttribute() functions that have been injected.
	   */
	  _isCustomAttributeFunctions: [],

	  /**
	   * Checks whether a property name is a custom attribute.
	   * @method
	   */
	  isCustomAttribute: function isCustomAttribute(attributeName) {
	    for (var i = 0; i < DOMProperty._isCustomAttributeFunctions.length; i++) {
	      var isCustomAttributeFn = DOMProperty._isCustomAttributeFunctions[i];
	      if (isCustomAttributeFn(attributeName)) {
	        return true;
	      }
	    }
	    return false;
	  },
	  injection: DOMPropertyInjection
	};

	module.exports = DOMProperty;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

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

	var invariant = function invariant(condition, format, a, b, c, d, e, f) {
	  if ("production" !== process.env.NODE_ENV) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule quoteAttributeValueForBrowser
	 */

	'use strict';

	var escapeTextContentForBrowser = __webpack_require__(26);

	/**
	 * Escapes attribute value to prevent scripting attacks.
	 *
	 * @param {*} value Value to escape.
	 * @return {string} An escaped string.
	 */
	function quoteAttributeValueForBrowser(value) {
	  return '"' + escapeTextContentForBrowser(value) + '"';
	}

	module.exports = quoteAttributeValueForBrowser;

/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule escapeTextContentForBrowser
	 */

	'use strict';

	var ESCAPE_LOOKUP = {
	  '&': '&amp;',
	  '>': '&gt;',
	  '<': '&lt;',
	  '"': '&quot;',
	  '\'': '&#x27;'
	};

	var ESCAPE_REGEX = /[&><"']/g;

	function escaper(match) {
	  return ESCAPE_LOOKUP[match];
	}

	/**
	 * Escapes text to prevent scripting attacks.
	 *
	 * @param {*} text Text value to escape.
	 * @return {string} An escaped string.
	 */
	function escapeTextContentForBrowser(text) {
	  return ('' + text).replace(ESCAPE_REGEX, escaper);
	}

	module.exports = escapeTextContentForBrowser;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule HTMLDOMPropertyConfig
	 */

	/*jslint bitwise: true*/

	'use strict';

	var DOMProperty = __webpack_require__(23);
	var ExecutionEnvironment = __webpack_require__(28);

	var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;
	var MUST_USE_PROPERTY = DOMProperty.injection.MUST_USE_PROPERTY;
	var HAS_BOOLEAN_VALUE = DOMProperty.injection.HAS_BOOLEAN_VALUE;
	var HAS_SIDE_EFFECTS = DOMProperty.injection.HAS_SIDE_EFFECTS;
	var HAS_NUMERIC_VALUE = DOMProperty.injection.HAS_NUMERIC_VALUE;
	var HAS_POSITIVE_NUMERIC_VALUE = DOMProperty.injection.HAS_POSITIVE_NUMERIC_VALUE;
	var HAS_OVERLOADED_BOOLEAN_VALUE = DOMProperty.injection.HAS_OVERLOADED_BOOLEAN_VALUE;

	var hasSVG;
	if (ExecutionEnvironment.canUseDOM) {
	  var implementation = document.implementation;
	  hasSVG = implementation && implementation.hasFeature && implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');
	}

	var HTMLDOMPropertyConfig = {
	  isCustomAttribute: RegExp.prototype.test.bind(/^(data|aria)-[a-z_][a-z\d_.\-]*$/),
	  Properties: {
	    /**
	     * Standard Properties
	     */
	    accept: null,
	    acceptCharset: null,
	    accessKey: null,
	    action: null,
	    allowFullScreen: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
	    allowTransparency: MUST_USE_ATTRIBUTE,
	    alt: null,
	    async: HAS_BOOLEAN_VALUE,
	    autoComplete: null,
	    // autoFocus is polyfilled/normalized by AutoFocusMixin
	    autoFocus: HAS_BOOLEAN_VALUE,
	    autoPlay: HAS_BOOLEAN_VALUE,
	    cellPadding: null,
	    cellSpacing: null,
	    charSet: MUST_USE_ATTRIBUTE,
	    checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    classID: MUST_USE_ATTRIBUTE,
	    // To set className on SVG elements, it's necessary to use .setAttribute;
	    // this works on HTML elements too in all browsers except IE8. Conveniently,
	    // IE8 doesn't support SVG and so we can simply use the attribute in
	    // browsers that support SVG and the property in browsers that don't,
	    // regardless of whether the element is HTML or SVG.
	    className: hasSVG ? MUST_USE_ATTRIBUTE : MUST_USE_PROPERTY,
	    cols: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
	    colSpan: null,
	    content: null,
	    contentEditable: null,
	    contextMenu: MUST_USE_ATTRIBUTE,
	    controls: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    coords: null,
	    crossOrigin: null,
	    data: null, // For `<object />` acts as `src`.
	    dateTime: MUST_USE_ATTRIBUTE,
	    defer: HAS_BOOLEAN_VALUE,
	    dir: null,
	    disabled: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
	    download: HAS_OVERLOADED_BOOLEAN_VALUE,
	    draggable: null,
	    encType: null,
	    form: MUST_USE_ATTRIBUTE,
	    formAction: MUST_USE_ATTRIBUTE,
	    formEncType: MUST_USE_ATTRIBUTE,
	    formMethod: MUST_USE_ATTRIBUTE,
	    formNoValidate: HAS_BOOLEAN_VALUE,
	    formTarget: MUST_USE_ATTRIBUTE,
	    frameBorder: MUST_USE_ATTRIBUTE,
	    headers: null,
	    height: MUST_USE_ATTRIBUTE,
	    hidden: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
	    high: null,
	    href: null,
	    hrefLang: null,
	    htmlFor: null,
	    httpEquiv: null,
	    icon: null,
	    id: MUST_USE_PROPERTY,
	    label: null,
	    lang: null,
	    list: MUST_USE_ATTRIBUTE,
	    loop: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    low: null,
	    manifest: MUST_USE_ATTRIBUTE,
	    marginHeight: null,
	    marginWidth: null,
	    max: null,
	    maxLength: MUST_USE_ATTRIBUTE,
	    media: MUST_USE_ATTRIBUTE,
	    mediaGroup: null,
	    method: null,
	    min: null,
	    multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    name: null,
	    noValidate: HAS_BOOLEAN_VALUE,
	    open: HAS_BOOLEAN_VALUE,
	    optimum: null,
	    pattern: null,
	    placeholder: null,
	    poster: null,
	    preload: null,
	    radioGroup: null,
	    readOnly: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    rel: null,
	    required: HAS_BOOLEAN_VALUE,
	    role: MUST_USE_ATTRIBUTE,
	    rows: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
	    rowSpan: null,
	    sandbox: null,
	    scope: null,
	    scoped: HAS_BOOLEAN_VALUE,
	    scrolling: null,
	    seamless: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
	    selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    shape: null,
	    size: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
	    sizes: MUST_USE_ATTRIBUTE,
	    span: HAS_POSITIVE_NUMERIC_VALUE,
	    spellCheck: null,
	    src: null,
	    srcDoc: MUST_USE_PROPERTY,
	    srcSet: MUST_USE_ATTRIBUTE,
	    start: HAS_NUMERIC_VALUE,
	    step: null,
	    style: null,
	    tabIndex: null,
	    target: null,
	    title: null,
	    type: null,
	    useMap: null,
	    value: MUST_USE_PROPERTY | HAS_SIDE_EFFECTS,
	    width: MUST_USE_ATTRIBUTE,
	    wmode: MUST_USE_ATTRIBUTE,

	    /**
	     * Non-standard Properties
	     */
	    // autoCapitalize and autoCorrect are supported in Mobile Safari for
	    // keyboard hints.
	    autoCapitalize: null,
	    autoCorrect: null,
	    // itemProp, itemScope, itemType are for
	    // Microdata support. See http://schema.org/docs/gs.html
	    itemProp: MUST_USE_ATTRIBUTE,
	    itemScope: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
	    itemType: MUST_USE_ATTRIBUTE,
	    // itemID and itemRef are for Microdata support as well but
	    // only specified in the the WHATWG spec document. See
	    // https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
	    itemID: MUST_USE_ATTRIBUTE,
	    itemRef: MUST_USE_ATTRIBUTE,
	    // property is supported for OpenGraph in meta tags.
	    property: null,
	    // IE-only attribute that controls focus behavior
	    unselectable: MUST_USE_ATTRIBUTE
	  },
	  DOMAttributeNames: {
	    acceptCharset: 'accept-charset',
	    className: 'class',
	    htmlFor: 'for',
	    httpEquiv: 'http-equiv'
	  },
	  DOMPropertyNames: {
	    autoCapitalize: 'autocapitalize',
	    autoComplete: 'autocomplete',
	    autoCorrect: 'autocorrect',
	    autoFocus: 'autofocus',
	    autoPlay: 'autoplay',
	    // `encoding` is equivalent to `enctype`, IE8 lacks an `enctype` setter.
	    // http://www.w3.org/TR/html5/forms.html#dom-fs-encoding
	    encType: 'encoding',
	    hrefLang: 'hreflang',
	    radioGroup: 'radiogroup',
	    spellCheck: 'spellcheck',
	    srcDoc: 'srcdoc',
	    srcSet: 'srcset'
	  }
	};

	module.exports = HTMLDOMPropertyConfig;

/***/ },
/* 28 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ExecutionEnvironment
	 */

	/*jslint evil: true */

	"use strict";

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {

	  canUseDOM: canUseDOM,

	  canUseWorkers: typeof Worker !== 'undefined',

	  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

	  canUseViewport: canUseDOM && !!window.screen,

	  isInWorker: !canUseDOM // For now, this is true - might change in the future.

	};

	module.exports = ExecutionEnvironment;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SVGDOMPropertyConfig
	 */

	/*jslint bitwise: true*/

	'use strict';

	var DOMProperty = __webpack_require__(23);

	var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;

	var SVGDOMPropertyConfig = {
	  Properties: {
	    clipPath: MUST_USE_ATTRIBUTE,
	    cx: MUST_USE_ATTRIBUTE,
	    cy: MUST_USE_ATTRIBUTE,
	    d: MUST_USE_ATTRIBUTE,
	    dx: MUST_USE_ATTRIBUTE,
	    dy: MUST_USE_ATTRIBUTE,
	    fill: MUST_USE_ATTRIBUTE,
	    fillOpacity: MUST_USE_ATTRIBUTE,
	    fontFamily: MUST_USE_ATTRIBUTE,
	    fontSize: MUST_USE_ATTRIBUTE,
	    fx: MUST_USE_ATTRIBUTE,
	    fy: MUST_USE_ATTRIBUTE,
	    gradientTransform: MUST_USE_ATTRIBUTE,
	    gradientUnits: MUST_USE_ATTRIBUTE,
	    markerEnd: MUST_USE_ATTRIBUTE,
	    markerMid: MUST_USE_ATTRIBUTE,
	    markerStart: MUST_USE_ATTRIBUTE,
	    offset: MUST_USE_ATTRIBUTE,
	    opacity: MUST_USE_ATTRIBUTE,
	    patternContentUnits: MUST_USE_ATTRIBUTE,
	    patternUnits: MUST_USE_ATTRIBUTE,
	    points: MUST_USE_ATTRIBUTE,
	    preserveAspectRatio: MUST_USE_ATTRIBUTE,
	    r: MUST_USE_ATTRIBUTE,
	    rx: MUST_USE_ATTRIBUTE,
	    ry: MUST_USE_ATTRIBUTE,
	    spreadMethod: MUST_USE_ATTRIBUTE,
	    stopColor: MUST_USE_ATTRIBUTE,
	    stopOpacity: MUST_USE_ATTRIBUTE,
	    stroke: MUST_USE_ATTRIBUTE,
	    strokeDasharray: MUST_USE_ATTRIBUTE,
	    strokeLinecap: MUST_USE_ATTRIBUTE,
	    strokeOpacity: MUST_USE_ATTRIBUTE,
	    strokeWidth: MUST_USE_ATTRIBUTE,
	    textAnchor: MUST_USE_ATTRIBUTE,
	    transform: MUST_USE_ATTRIBUTE,
	    version: MUST_USE_ATTRIBUTE,
	    viewBox: MUST_USE_ATTRIBUTE,
	    x1: MUST_USE_ATTRIBUTE,
	    x2: MUST_USE_ATTRIBUTE,
	    x: MUST_USE_ATTRIBUTE,
	    y1: MUST_USE_ATTRIBUTE,
	    y2: MUST_USE_ATTRIBUTE,
	    y: MUST_USE_ATTRIBUTE
	  },
	  DOMAttributeNames: {
	    clipPath: 'clip-path',
	    fillOpacity: 'fill-opacity',
	    fontFamily: 'font-family',
	    fontSize: 'font-size',
	    gradientTransform: 'gradientTransform',
	    gradientUnits: 'gradientUnits',
	    markerEnd: 'marker-end',
	    markerMid: 'marker-mid',
	    markerStart: 'marker-start',
	    patternContentUnits: 'patternContentUnits',
	    patternUnits: 'patternUnits',
	    preserveAspectRatio: 'preserveAspectRatio',
	    spreadMethod: 'spreadMethod',
	    stopColor: 'stop-color',
	    stopOpacity: 'stop-opacity',
	    strokeDasharray: 'stroke-dasharray',
	    strokeLinecap: 'stroke-linecap',
	    strokeOpacity: 'stroke-opacity',
	    strokeWidth: 'stroke-width',
	    textAnchor: 'text-anchor',
	    viewBox: 'viewBox'
	  }
	};

	module.exports = SVGDOMPropertyConfig;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _virtualDom = __webpack_require__(3);

	var _refer = __webpack_require__(11);

	var _component = __webpack_require__(10);

	var _util = __webpack_require__(20);

	var isFn = _refer.types.isFn;

	var store = _util.info.store = {};

	var render = function render(vnode, container, callback) {
		var id = container.getAttribute(_util.ATTR_ID);
		if (id) {
			var prevVnode = store[id];
			var patches = _virtualDom.diff(prevVnode, vnode);
			_component.richPatch(container.firstChild, patches);
			store[id] = vnode;
		} else {
			var node = _virtualDom.create(vnode);
			container.setAttribute(_util.ATTR_ID, id = _util.getId());
			store[id] = vnode;
			container.innerHTML = '';
			container.appendChild(node);
			_component.clearDidMounts();
		}
		if (isFn(callback)) {
			callback();
		}
	};

	exports.render = render;
	var unmount = function unmount(container) {
		var id = container.getAttribute(_util.ATTR_ID);
		if (id) {
			var prevVnode = store[id];
			if (prevVnode) {
				delete store[id];
				_component.callUnmounts(container);
				container.innerHTML = '';
			}
		}
	};
	exports.unmount = unmount;

/***/ }
/******/ ]);