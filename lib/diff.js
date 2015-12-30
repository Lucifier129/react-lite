'use strict';

exports.__esModule = true;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _constant = require('./constant');

var _util = require('./util');

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