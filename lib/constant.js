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