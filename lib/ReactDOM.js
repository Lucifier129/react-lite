'use strict';

exports.__esModule = true;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _util = require('./util');

var _ = _interopRequireWildcard(_util);

var _constant = require('./constant');

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
		store[id].destroyTree();
		delete store[id];
		return true;
	}
	return false;
};

exports.unmountComponentAtNode = unmountComponentAtNode;
var findDOMNode = function findDOMNode(node) {
	if (node == null) {
		return null;
	}
	if (node.nodeName) {
		return node;
	}
	var component = node;
	if (_.isFn(component.getDOMNode) && component.node) {
		node = component.getDOMNode();
		return node;
	}
	throw new Error('findDOMNode can not find Node');
};
exports.findDOMNode = findDOMNode;