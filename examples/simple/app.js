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
		width: '500px',
		height: '100px',
		background: '#eaeaea'
	};

	var vnode = _react2['default'].createElement(
		'div',
		{ id: 'header', className: 'header', style: style },
		'Hello',
		_react2['default'].createElement(
			'span',
			{ className: 'highlight', attributes: { style: 'padding:0 10px; color: #fff; background:pink;' } },
			'react'
		)
	);

	var node = _react.create(vnode);

	var container = document.getElementById('container');

	container.appendChild(node);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _hyperscript = __webpack_require__(2);

	var _hyperscript2 = _interopRequireDefault(_hyperscript);

	var _create = __webpack_require__(4);

	var _create2 = _interopRequireDefault(_create);

	exports['default'] = {
		h: _hyperscript2['default'],
		create: _create2['default'],
		createElement: _hyperscript2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _util = __webpack_require__(3);

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
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _util = __webpack_require__(3);

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
		}
		if (children && children.length > 0) {
			children.forEach(function (child) {
				var childNode = create(child);
				elem.appendChild(childNode);
			});
		}
		return elem;
	};

	exports['default'] = create;

	var setAttrs = function setAttrs(elem, attrs) {
		if (!_util.isObj(attrs)) {
			return;
		}
		Object.keys(attrs).forEach(function (attrName) {
			elem.setAttribute(attrName, attrs[attrName]);
		});
	};

	var setStyle = function setStyle(elem, style) {
		if (!_util.isObj(style)) {
			return;
		}
		Object.keys(style).forEach(function (key) {
			elem.style[key] = style[key];
		});
	};
	module.exports = exports['default'];

/***/ }
/******/ ]);