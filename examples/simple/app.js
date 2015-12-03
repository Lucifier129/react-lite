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

	var _diff = __webpack_require__(5);

	var _diff2 = _interopRequireDefault(_diff);

	var _patch = __webpack_require__(7);

	var _patch2 = _interopRequireDefault(_patch);

	exports['default'] = {
		diff: _diff2['default'],
		patch: _patch2['default'],
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
	var addChild = function addChild(elem, childVnode) {
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _util = __webpack_require__(3);

	var _constant = __webpack_require__(6);

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
			case _util.isStr(vnode) || _util.isStr(newVnode):
				patches.type = _constant.REPLACE;
				patches.vnode = newVnode;
				break;
			case vnode.tagName !== newVnode.tagName:
				patches.type = _constant.REPLACE;
				patches.vnode = newVnode;
				break;
			case vnode.props || newVnode.props:
				patches.type = _constant.PROPS;
				patches.store = {
					props: vnode.props,
					newProps: newVnode.props
				};
		}
		if (!patches.type || patches.type === _constant.PROPS) {
			var childrenPatches = {};
			var children = vnode.children;
			var newChildren = newVnode.children;
			if (children.length === 0) {
				childrenPatches.type = _constant.CREATE;
				childrenPatches.vnodes = newChildren;
			} else if (newChildren.length === 0) {
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
			patches.children = childrenPatches;
		}
		return patches;
	};

	exports['default'] = diff;
	module.exports = exports['default'];

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _util = __webpack_require__(3);

	var _constant = __webpack_require__(6);

	var _create = __webpack_require__(4);

	var _create2 = _interopRequireDefault(_create);

	/**
	* patch dom
	*/

	var patch = function patch(node, patches, parent) {
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
				patches.children.store.forEach(function (childPatches, index) {
					return patch(node.children[i], childPatches, node);
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

/***/ }
/******/ ]);