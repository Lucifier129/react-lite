'use strict';

exports.__esModule = true;
exports.Vtext = Vtext;
exports.Velem = Velem;
exports.VstatelessComponent = VstatelessComponent;
exports.Vcomponent = Vcomponent;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _util = require('./util');

var _ = _interopRequireWildcard(_util);

var _constant = require('./constant');

var _Component = require('./Component');

var _diff = require('./diff');

var _diff2 = _interopRequireDefault(_diff);

function Vtree(properties) {
	_.extend(this, properties);
}

var noop = function noop() {};
var getDOMNode = function getDOMNode() {
	return this;
};
Vtree.prototype = {
	constructor: Vtree,
	mapTree: noop,
	attachRef: function attachRef() {
		var refKey = this.ref;
		var refs = this.refs;
		var vtype = this.vtype;

		if (!refs || refKey == null) {
			return;
		}
		var refValue = undefined;
		if (vtype === _constant.VNODE_TYPE.ELEMENT) {
			refValue = this.node;
			refValue.getDOMNode = getDOMNode;
		} else if (vtype === _constant.VNODE_TYPE.COMPONENT) {
			refValue = this.component;
		}
		if (refValue) {
			if (_.isFn(refKey)) {
				refKey(refValue);
			} else if (_.isStr(refKey)) {
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
		if (_.isFn(refKey)) {
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
	updateTree: (function (_updateTree) {
		function updateTree(_x, _x2) {
			return _updateTree.apply(this, arguments);
		}

		updateTree.toString = function () {
			return _updateTree.toString();
		};

		return updateTree;
	})(function (nextVtree, parentNode) {
		updateTree(this, nextVtree, parentNode);
	})
};

function Vtext(text) {
	this.text = text;
}

Vtext.prototype = new Vtree({
	constructor: Vtext,
	vtype: _constant.VNODE_TYPE.TEXT,
	attachRef: noop,
	detachRef: noop,
	updateRef: noop,
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
	vtype: _constant.VNODE_TYPE.ELEMENT,
	eachChildren: function eachChildren(iteratee) {
		var children = this.props.children;
		var sorted = this.sorted;

		if (sorted) {
			_.eachItem(children, iteratee);
			return;
		}
		if (_.isArr(children)) {
			var newChildren = [];
			_.forEach(children, function (vchild, index) {
				vchild = getVnode(vchild);
				iteratee(vchild, index);
				newChildren.push(vchild);
			});
			this.props.children = newChildren;
			this.sorted = true;
		} else if (!_.isUndefined(children)) {
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

		var node = this.node = createElement(type, props);
		this.eachChildren(function (vchild) {
			vchild.initTree(node);
		});
		appendNode(parentNode, node);
		this.attachRef();
	},
	destroyTree: function destroyTree() {
		var node = this.node;
		var props = this.props;

		this.mapTree(unmountTree);
		removeNode(node);
	},
	update: function update(newVelem) {
		var node = this.node;
		var props = this.props;

		var children = !_.isUndefined(props.children) ? props.children : [];
		var count = 0;
		if (!_.isArr(children)) {
			children = [children];
		}
		_.patchProps(node, props, newVelem.props);
		newVelem.node = node;
		newVelem.eachChildren(function (newVchild, index) {
			var vchild = children[index];
			if (vchild && vchild.node) {
				vchild.updateTree(newVchild, node);
			} else {
				newVchild.initTree(node);
			}
			count += 1;
		});
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
	vtype: _constant.VNODE_TYPE.STATELESS_COMPONENT,
	attachRef: noop,
	detachRef: noop,
	updateRef: noop,
	mapTree: function mapTree(iteratee) {
		iteratee(this);
	},
	renderTree: function renderTree() {
		var factory = this.type;
		var props = this.props;
		var context = this.context;

		var vtree = factory(props, getContext(context, factory.contextTypes));
		if (vtree && _.isFn(vtree.render)) {
			vtree = vtree.render();
		}
		this.vtree = getVnode(vtree);
		this.vtree.mapTree(function (item) {
			if (isValidComponent(item)) {
				item.context = context;
			}
		});
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
		newVtree.node = newVtree.vtree.node;
	}
});

var setRefs = noop;
var collectRef = function collectRef(vnode) {
	setRefs(vnode);
};
exports.collectRef = collectRef;
var getContext = function getContext(curContext, contextTypes) {
	var context = {};
	if (!_.isObj(contextTypes) || !_.isObj(curContext)) {
		return context;
	}
	for (var key in contextTypes) {
		if (!contextTypes.hasOwnProperty(key)) {
			continue;
		}
		context[key] = curContext[key];
	}
	return context;
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
	setRefs = noop;
	vtree.mapTree(function (item) {
		if (isValidComponent(item)) {
			item.context = curContext;
		}
	});
	return vtree;
};
exports.renderComponent = renderComponent;
var neverUpdate = function neverUpdate() {
	return false;
};

function Vcomponent(type, props) {
	this.type = type;
	this.props = props;
}

Vcomponent.prototype = new Vtree({
	constructor: Vcomponent,
	vtype: _constant.VNODE_TYPE.COMPONENT,
	mapTree: function mapTree(iteratee) {
		iteratee(this);
	},
	initTree: function initTree(parentNode) {
		var Component = this.type;
		var props = this.props;
		var context = this.context;

		var component = this.component = new Component(props, getContext(context, Component.contextTypes));
		var updater = component.$updater;
		var cache = component.$cache;

		cache.$context = context;
		updater.isPending = true;
		component.props = component.props || props;
		component.componentWillMount();
		(0, _Component.updatePropsAndState)(component, component.props, updater.getState(), component.context);
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
		var props = this.props;

		if (!component) {
			return;
		}
		component.shouldComponentUpdate = neverUpdate;
		component.forceUpdate = noop;
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

		var context = getContext(nextContext, Component.contextTypes);
		$cache.$context = nextContext;
		newVtree.component = component;
		updater.isPending = true;
		component.componentWillReceiveProps(nextProps, context);
		updater.isPending = false;
		updater.emitUpdate(nextProps, context);
		newVtree.node = component.node;
		this.updateRef(newVtree);
	}
});

var updateTree = function updateTree(vtree, newVtree, parentNode) {
	var diffType = (0, _diff2['default'])(vtree, newVtree);
	var $removeNode = undefined;
	var node = undefined;
	switch (diffType) {
		case _constant.DIFF_TYPE.CREATE:
			newVtree.initTree(parentNode);
			break;
		case _constant.DIFF_TYPE.REMOVE:
			vtree.destroyTree();
			break;
		case _constant.DIFF_TYPE.REPLACE:
			node = vtree.node;
			$removeNode = removeNode;
			removeNode = noop;
			vtree.destroyTree();
			removeNode = $removeNode;
			newVtree.initTree(function (newNode) {
				replaceNode(parentNode, newNode, node);
			});
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
	_.setProps(node, props);
	return node;
};

var getVnode = function getVnode(vnode) {
	if (vnode === null || vnode === false) {
		vnode = new Velem('noscript', {});
	} else if (!_.isObj(vnode)) {
		vnode = new Vtext(vnode);
	}
	return vnode;
};

var checkVtree = function checkVtree(vtree) {
	if (_.isUndefined(vtree)) {
		throw new Error('component can not render undefined');
	}
	return getVnode(vtree);
};

var isValidComponent = function isValidComponent(obj) {
	if (obj == null) {
		return false;
	}
	var vtype = obj.vtype;
	if (vtype === _constant.VNODE_TYPE.COMPONENT || vtype === _constant.VNODE_TYPE.STATELESS_COMPONENT) {
		return true;
	}
	return false;
};