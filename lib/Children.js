'use strict';

exports.__esModule = true;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _util = require('./util');

var _ = _interopRequireWildcard(_util);

var _createElement = require('./createElement');

var only = function only(children) {
	if (children != null && !_.isArr(children)) {
		return children;
	}
	throw new Error('expect only one child');
};

exports.only = only;
var forEach = function forEach(children, iteratee, context) {
	if (children == null) {
		return children;
	}
	if (_.isArr(children)) {
		_.forEach(children, function (child, index) {
			iteratee.call(context, child, index);
		});
	} else {
		iteratee.call(context, children, 0);
	}
};

exports.forEach = forEach;
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
	_.eachItem(store, function (_ref) {
		var child = _ref.child;
		var key = _ref.key;
		var index = _ref.index;
		var isEqual = _ref.isEqual;

		if (child == null || _.isBln(child)) {
			return;
		}
		if (!(0, _createElement.isValidElement)(child) || key == null) {
			result.push(child);
			return;
		}
		if (keyMap[key] !== 0) {
			key += ':' + index;
		}
		if (!isEqual) {
			key = escapeUserProvidedKey(child.key || '') + '/' + key;
		}
		child = (0, _createElement.cloneElement)(child, { key: key });
		result.push(child);
	});
	return result;
};

exports.map = map;
var count = function count(children) {
	var count = 0;
	forEach(children, function () {
		count++;
	});
	return count;
};

exports.count = count;
var identity = function identity(obj) {
	return obj;
};
var toArray = function toArray(children) {
	var mappedChildren = map(children, identity) || [];
	var result = [];
	_.eachItem(mappedChildren, function (child) {
		if (child == null || _.isBln(child)) {
			return;
		}
		result.push(child);
	});
	return result;
};

exports.toArray = toArray;
var getKey = function getKey(child, index) {
	var key = undefined;
	if ((0, _createElement.isValidElement)(child) && _.isStr(child.key)) {
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