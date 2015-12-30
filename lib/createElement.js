'use strict';

exports.__esModule = true;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _util = require('./util');

var _ = _interopRequireWildcard(_util);

var _constant = require('./constant');

var _virtualDom = require('./virtual-dom');

var isValidElement = function isValidElement(obj) {
	if (obj == null) {
		return false;
	}
	if (obj.vtype === _constant.VNODE_TYPE.ELEMENT || obj.vtype === _constant.VNODE_TYPE.COMPONENT) {
		return true;
	}
	return false;
};

exports.isValidElement = isValidElement;
var cloneElement = function cloneElement(originElem, props) {
	for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
		children[_key - 2] = arguments[_key];
	}

	var type = originElem.type;
	props = _.extend({}, originElem.props, props);
	var vnode = createElement.apply(undefined, [type, props].concat(children));
	if (vnode.ref === originElem.ref) {
		vnode.refs = originElem.refs;
	}
	return vnode;
};

exports.cloneElement = cloneElement;
var createFactory = function createFactory(type) {
	return function () {
		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return createElement.apply(undefined, [type].concat(args));
	};
};

exports.createFactory = createFactory;
var createElement = function createElement(type, props) {
	for (var _len3 = arguments.length, children = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
		children[_key3 - 2] = arguments[_key3];
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
			throw new Error('React.createElement: unexpect type [ ' + type + ' ]');
	}
	var vnode = new Vnode(type, _.mergeProps(props, children, type.defaultProps));
	var key = null;
	var ref = null;
	var hasRef = false;
	if (props != null) {
		if (!_.isUndefined(props.key)) {
			key = '' + props.key;
		}
		if (!_.isUndefined(props.ref)) {
			ref = props.ref;
			hasRef = true;
		}
	}
	vnode.key = key;
	vnode.ref = ref;
	if (hasRef && Vnode !== _virtualDom.VstatelessComponent) {
		(0, _virtualDom.collectRef)(vnode);
	}
	return vnode;
};

exports['default'] = createElement;