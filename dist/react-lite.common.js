/*!
 * react-lite.js v0.0.22
 * (c) 2016 Jade Gu
 * Released under the MIT License.
 */
'use strict';

var VNODE_TYPE = {
	ELEMENT: 1,
	COMPONENT: 2,
	STATELESS_COMPONENT: 3,
	TEXT: 4
};
var DIFF_TYPE = {
	CREATE: 1,
	REMOVE: 2,
	REPLACE: 3,
	UPDATE: 4
};

var COMPONENT_ID = 'liteid';

var diff = function diff(vnode, newVnode) {
	var type = undefined;
	switch (true) {
		case vnode === newVnode:
			return null;
		case isUndefined(newVnode):
			type = DIFF_TYPE.REMOVE;
			break;
		case isUndefined(vnode):
			type = DIFF_TYPE.CREATE;
			break;
		case vnode.type !== newVnode.type:
			type = DIFF_TYPE.REPLACE;
			break;
		case newVnode.key !== null:
			if (vnode.key === null || newVnode.key !== vnode.key) {
				type = DIFF_TYPE.REPLACE;
			} else {
				type = DIFF_TYPE.UPDATE;
			}
			break;
		case vnode.key !== null:
			type = DIFF_TYPE.REPLACE;
			break;
		default:
			type = DIFF_TYPE.UPDATE;
	}
	return type;
};

var isType = function isType(type) {
	return function (obj) {
		return obj != null && Object.prototype.toString.call(obj) === '[object ' + type + ']';
	};
};
var isObj = isType('Object');
var isStr = isType('String');
var isFn = isType('Function');
var isBln = isType('Boolean');
var isArr = Array.isArray || isType('Array');
var isUndefined = function isUndefined(obj) {
	return obj === undefined;
};
var isComponent = function isComponent(obj) {
	return obj && obj.prototype && 'forceUpdate' in obj.prototype;
};
var isStatelessComponent = function isStatelessComponent(obj) {
	return isFn(obj) && (!obj.prototype || !('forceUpdate' in obj.prototype));
};

var noop$1 = function noop() {};
var identity = function identity(obj) {
	return obj;
};

var pipe = function pipe(fn1, fn2) {
	return function () {
		fn1.apply(this, arguments);
		return fn2.apply(this, arguments);
	};
};

var forEach$1 = function forEach(list, iteratee, record) {
	record = record || { index: 0 };
	for (var i = 0, len = list.length; i < len; i++) {
		var item = list[i];
		if (isArr(item)) {
			forEach(item, iteratee, record);
		} else if (!isUndefined(item) && !isBln(item)) {
			iteratee(item, record.index);
			record.index += 1;
		}
	}
};

var eachItem = function eachItem(list, iteratee) {
	for (var i = 0, len = list.length; i < len; i++) {
		iteratee(list[i], i);
	}
};

var findIndex = function findIndex(list, item, startIndex) {
	var i = startIndex > 0 ? startIndex : 0;
	for (var len = list.length; i < len; i++) {
		if (list[i] === item) {
			return i;
		}
	}
	return -1;
};

var mapValue = function mapValue(obj, iteratee) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			iteratee(obj[key], key);
		}
	}
};

var mapKey = function mapKey(sources, iteratee) {
	var keyMap = {};
	var item = undefined;
	var key = undefined;
	for (var i = 0, len = sources.length; i < len; i++) {
		item = sources[i];
		for (key in item) {
			if (!item.hasOwnProperty(key) || keyMap[key]) {
				continue;
			}
			keyMap[key] = true;
			iteratee(key);
		}
	}
};

var extend = function extend(target) {
	for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		sources[_key - 1] = arguments[_key];
	}

	var setProp = function setProp(value, key) {
		if (!isUndefined(value)) {
			target[key] = value;
		}
	};
	eachItem(sources, function (source) {
		if (source != null) {
			mapValue(source, setProp);
		}
	});
	return target;
};

var uid = 0;
var getUid = function getUid() {
	return ++uid;
};

var getChildren = function getChildren(_x) {
	var _again = true;

	_function: while (_again) {
		var children = _x;
		_again = false;

		if (children && children.length > 0) {
			if (children.length === 1) {
				children = children[0];
				if (isArr(children)) {
					_x = children;
					_again = true;
					continue _function;
				}
			}
			return children;
		}
	}
};
var mergeProps = function mergeProps(props, children, defaultProps) {
	var result = extend({}, defaultProps, props);
	children = getChildren(children);
	if (!isUndefined(children)) {
		result.children = children;
	}
	return result;
};

var ignoreKeys = {
	key: true,
	ref: true,
	children: true
};
var EVENT_KEYS = /^on/i;
var isIgnoreKey = function isIgnoreKey(key) {
	return ignoreKeys[key];
};
var isEventKey = function isEventKey(key) {
	return EVENT_KEYS.test(key);
};
var isInnerHTMLKey = function isInnerHTMLKey(key) {
	return key === 'dangerouslySetInnerHTML';
};
var isStyleKey = function isStyleKey(key) {
	return key === 'style';
};
// Setting .type throws on non-<input> tags
var isTypeKey = function isTypeKey(key) {
	return key === 'type';
};
var setProp = function setProp(elem, key, value) {
	switch (true) {
		case isIgnoreKey(key) || key === 'title' && value == null:
			break;
		case isEventKey(key):
			addEvent(elem, key, value);
			break;
		case isStyleKey(key):
			setStyle(elem, value);
			break;
		case isInnerHTMLKey(key):
			value && value.__html != null && (elem.innerHTML = value.__html);
			break;
		case key in elem && !isTypeKey(key):
			elem[key] = value;
			break;
		default:
			elem.setAttribute(key, '' + value);
	}
};
var setProps = function setProps(elem, props) {
	mapValue(props, function (value, key) {
		setProp(elem, key, value);
	});
};
var removeProps = function removeProps(elem, oldProps) {
	mapValue(oldProps, function (oldValue, key) {
		removeProp(elem, key, oldValue);
	});
};
var removeProp = function removeProp(elem, key, oldValue) {
	switch (true) {
		case isIgnoreKey(key):
			break;
		case isEventKey(key):
			removeEvent(elem, key);
			break;
		case isStyleKey(key):
			removeStyle(elem, oldValue);
			break;
		case isInnerHTMLKey(key):
			elem.innerHTML = '';
			break;
		case !(key in elem) || isTypeKey(key):
			elem.removeAttribute(key);
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
				elem[key] = undefined;
				delete elem[key];
			} catch (e) {
				//pass
			}
	}
};

// 用 dom 属性作为 oldValue
var shouldUseDOMProp = {
	value: true,
	checked: true
};

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

	mapKey([props, newProps], function (key) {
		if (isIgnoreKey(key)) {
			return;
		}
		var value = newProps[key];
		var oldValue = shouldUseDOMProp[key] ? elem[key] : props[key];
		if (value === oldValue) {
			return;
		}
		if (isUndefined(value)) {
			removeProp(elem, key, oldValue);
			return;
		}
		if (isStyleKey(key)) {
			patchStyle(elem, oldValue, value);
		} else if (isInnerHTMLKey(key)) {
			var oldHtml = oldValue && oldValue.__html;
			var html = value && value.__html;
			if (html != null && html !== oldHtml) {
				elem.innerHTML = html;
			}
		} else {
			setProp(elem, key, value);
		}
	});
};

var removeStyle = function removeStyle(elem, style) {
	if (!isObj(style)) {
		return;
	}
	var elemStyle = elem.style;
	mapValue(style, function (_, key) {
		elemStyle[key] = '';
	});
};
var setStyle = function setStyle(elem, style) {
	if (!isObj(style)) {
		return;
	}
	var elemStyle = elem.style;
	mapValue(style, function (value, key) {
		setStyleValue(elemStyle, key, value);
	});
};
var patchStyle = function patchStyle(elem, style, newStyle) {
	if (style === newStyle) {
		return;
	}
	if (!newStyle && style) {
		removeStyle(elem, style);
	} else if (newStyle && !style) {
		setStyle(elem, newStyle);
	} else {
		var elemStyle = elem.style;
		mapKey([style, newStyle], function (key) {
			var value = newStyle[key];
			var oldValue = style[key];
			if (value !== oldValue) {
				setStyleValue(elemStyle, key, value);
			}
		});
	}
};

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

var isUnitlessNumberWithPrefix = {};
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
var prefixKey = function prefixKey(prefix, key) {
	return prefix + key.charAt(0).toUpperCase() + key.substring(1);
};
mapValue(isUnitlessNumber, function (_, prop) {
	eachItem(prefixes, function (prefix) {
		return isUnitlessNumberWithPrefix[prefixKey(prefix, prop)] = true;
	});
});
mapValue(isUnitlessNumberWithPrefix, function (value, key) {
	isUnitlessNumber[key] = value;
});

var RE_NUMBER = /^-?\d+(\.\d+)?$/;
var setStyleValue = function setStyleValue(style, key, value) {
	if (value == null || isBln(value)) {
		value = '';
	}
	if (!isUnitlessNumber[key] && RE_NUMBER.test(value)) {
		style[key] = value + 'px';
	} else {
		style[key] = value;
	}
};

if (!Object.freeze) {
	Object.freeze = identity;
}

function Vtree(properties) {
	extend(this, properties);
}

var noop$2 = noop$1;
var getDOMNode = function getDOMNode() {
	return this;
};
Vtree.prototype = {
	attachRef: function attachRef() {
		var refKey = this.ref;
		var refs = this.refs;
		var vtype = this.vtype;

		if (!refs || refKey == null) {
			return;
		}
		var refValue = undefined;
		if (vtype === VNODE_TYPE.ELEMENT) {
			refValue = this.node;
			// support react v0.13 style: this.refs.myInput.getDOMNode()
			this.node.getDOMNode = getDOMNode;
		} else if (vtype === VNODE_TYPE.COMPONENT) {
			refValue = this.component;
		}
		if (refValue != null) {
			if (isFn(refKey)) {
				refKey(refValue);
			} else {
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
		if (isFn(refKey)) {
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
	updateTree: function updateTree(newVtree, parentNode) {
		var node = this.node;

		var $removeNode = undefined;
		switch (diff(this, newVtree)) {
			case DIFF_TYPE.CREATE:
				newVtree.initTree(parentNode);
				break;
			case DIFF_TYPE.REMOVE:
				this.destroyTree();
				break;
			case DIFF_TYPE.REPLACE:
				// don't remove the existNode for replacing
				$removeNode = removeNode;
				removeNode = noop$2;
				this.destroyTree();
				removeNode = $removeNode;
				newVtree.initTree(function (newNode) {
					return parentNode.replaceChild(newNode, node);
				});
				break;
			case DIFF_TYPE.UPDATE:
				this.update(newVtree, parentNode);
				break;
		}
	}
};

function Vtext(text) {
	this.text = text;
}

Vtext.prototype = new Vtree({
	vtype: VNODE_TYPE.TEXT,
	attachRef: noop$2,
	detachRef: noop$2,
	updateRef: noop$2,
	update: function update(nextVtext) {
		var node = this.node;
		var text = this.text;

		if (nextVtext.text !== text) {
			node.replaceData(0, node.length, nextVtext.text);
		}
		// deliver node to the newTree for next updating
		nextVtext.node = node;
		this.node = null;
		return this;
	},
	initTree: function initTree(parentNode) {
		this.node = document.createTextNode(this.text);
		appendNode(parentNode, this.node);
	},
	destroyTree: function destroyTree() {
		removeNode(this.node);
		this.node = null;
	}
});

function Velem(type, props) {
	this.type = type;
	this.props = props;
}

var unmountTree = function unmountTree(vtree) {
	if (isValidComponent(vtree)) {
		vtree.destroyTree();
		return false; //ignore mapping children
	} else if (vtree.vtype === VNODE_TYPE.ELEMENT) {
			var node = vtree.node;
			var props = vtree.props;

			// aviod triggered when node was removed
			if (props.onLoad) {
				node.onload = null;
			}
			if (node.eventStore) {
				node.eventStore = null;
			}
			vtree.detachRef();
		}
};
Velem.prototype = new Vtree({
	vtype: VNODE_TYPE.ELEMENT,
	eachChildren: function eachChildren(iteratee) {
		var children = this.props.children;

		var newChildren = undefined;
		if (this.sorted) {
			eachItem(children, iteratee);
			return;
		}
		// the default children often be nesting array, make it flat and cache
		if (isArr(children)) {
			newChildren = [];
			forEach$1(children, function (vchild, index) {
				vchild = getVnode(vchild);
				iteratee(vchild, index);
				newChildren.push(vchild);
			});
			this.props.children = newChildren;
			this.sorted = true;
		} else if (!isUndefined(children)) {
			children = this.props.children = getVnode(children);
			iteratee(children, 0);
		}
	},
	initTree: function initTree(parentNode) {
		var type = this.type;
		var props = this.props;

		var node = document.createElement(type);
		setProps(node, props);
		this.node = node;
		this.eachChildren(function (vchild) {
			vchild.initTree(node);
		});
		appendNode(parentNode, node);
		this.attachRef();
	},
	destroyTree: function destroyTree() {
		mapTree(this, unmountTree);
		removeNode(this.node);
		this.node = null;
	},
	update: function update(newVelem) {
		var node = this.node;
		var props = this.props;

		var children = !isUndefined(props.children) ? props.children : [];
		var count = 0;
		var vindex = undefined;
		if (!isArr(children)) {
			children = [children];
		}
		patchProps(node, props, newVelem.props);
		newVelem.node = node;
		newVelem.eachChildren(function (newVchild, index) {
			var vchild = children[index];
			count += 1;
			// if newVchild.node exist, destroy it and remove it when it's in children
			if (vchild !== newVchild && newVchild.node) {
				newVchild.destroyTree();
				vindex = findIndex(children, newVchild, index + 1);
				if (vindex !== -1) {
					children.splice(vindex, 1);
				}
			}
			if (vchild) {
				vchild.updateTree(newVchild, node);
			} else {
				newVchild.initTree(node);
			}
		});
		// destroy old children not in the newChildren
		while (children.length > count) {
			children[count].destroyTree();
			count += 1;
		}
		this.updateRef(newVelem);
		this.node = null;
	}
});

function VstatelessComponent(type, props) {
	this.type = type;
	this.props = props;
}

VstatelessComponent.prototype = new Vtree({
	vtype: VNODE_TYPE.STATELESS_COMPONENT,
	attachRef: noop$2,
	detachRef: noop$2,
	updateRef: noop$2,
	renderTree: function renderTree() {
		var factory = this.type;
		var props = this.props;
		var context = this.context;

		var vtree = factory(props, getContextByTypes(context, factory.contextTypes));
		if (vtree && vtree.render) {
			vtree = vtree.render();
		}
		this.vtree = getVnode(vtree);
		setContext(context, this.vtree);
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
		newVtree.renderTree();
		this.vtree.updateTree(newVtree.vtree, parentNode);
		newVtree.node = newVtree.vtree.node;
		this.node = this.vtree = null;
	}
});

var setRefs = noop$2;
var handleVnodeWithRef = function handleVnodeWithRef(vnode) {
	setRefs(vnode);
};
var getContextByTypes = function getContextByTypes(curContext, contextTypes) {
	var context = {};
	if (!contextTypes || !curContext) {
		return context;
	}
	mapValue(contextTypes, function (_, key) {
		context[key] = curContext[key];
	});
	return context;
};

var setContext = function setContext(context, vtree) {
	mapTree(vtree, function (item) {
		if (isValidComponent(item)) {
			item.context = context;
		}
	});
};
var bindRefs = function bindRefs(refs) {
	return function (vnode) {
		vnode.refs = vnode.refs || refs;
	};
};

var renderComponent = function renderComponent(component, parentContext) {
	var curContext = component.getChildContext();
	curContext = extend({}, parentContext, curContext);
	setRefs = bindRefs(component.refs);
	var vtree = component.render();
	if (isUndefined(vtree)) {
		throw new Error('component can not render undefined');
	}
	vtree = getVnode(vtree);
	setContext(curContext, vtree);
	setRefs = noop$2;
	return vtree;
};

var didMountComponents = [];
var callDidMount = function callDidMount(obj) {
	return obj.didMount();
};
var clearDidMount = function clearDidMount() {
	var components = didMountComponents;
	if (components.length === 0) {
		return;
	}
	didMountComponents = [];
	eachItem(components, callDidMount);
};

function Vcomponent(type, props) {
	this.type = type;
	this.props = props;
}

Vcomponent.prototype = new Vtree({
	vtype: VNODE_TYPE.COMPONENT,
	initTree: function initTree(parentNode) {
		var Component = this.type;
		var props = this.props;
		var context = this.context;

		var componentContext = getContextByTypes(context, Component.contextTypes);
		var component = this.component = new Component(props, componentContext);
		var updater = component.$updater;
		var cache = component.$cache;

		cache.$context = context;
		updater.isPending = true;
		component.props = component.props || props;
		component.componentWillMount();
		updatePropsAndState(component, component.props, updater.getState(), component.context);
		var vtree = component.vtree = renderComponent(component, context);
		vtree.initTree(parentNode);
		cache.isMounted = true;
		component.node = this.node = vtree.node;
		didMountComponents.push(this);
	},
	didMount: function didMount() {
		var component = this.component;

		var updater = component.$updater;
		component.componentDidMount();
		updater.isPending = false;
		this.attachRef();
		updater.emitUpdate();
	},
	destroyTree: function destroyTree() {
		var component = this.component;

		if (!component) {
			return;
		}
		this.detachRef();
		component.setState = noop$2;
		component.componentWillUnmount();
		component.vtree.destroyTree();
		delete component.setState;
		component.$cache.isMounted = false;
		this.component = this.node = component.vtree = component.node = component.refs = component.context = null;
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

		var context = getContextByTypes(nextContext, Component.contextTypes);
		$cache.$context = nextContext;
		updater.isPending = true;
		component.componentWillReceiveProps(nextProps, context);
		updater.isPending = false;
		updater.emitUpdate(nextProps, context);
		newVtree.component = component;
		newVtree.node = component.node;
		this.updateRef(newVtree);
		this.component = this.node = null;
	}
});

var removeNode = function removeNode(node) {
	// if node.parentNode had set innerHTML, do nothing
	if (node && node.parentNode) {
		node.parentNode.removeChild(node);
	}
};
var appendNode = function appendNode(parentNode, node) {
	// for replacing node
	if (isFn(parentNode)) {
		parentNode(node);
	} else {
		parentNode.appendChild(node);
	}
};

var mapTree = function mapTree(tree, iteratee) {
	var queue = [tree];
	while (queue.length) {
		var item = queue.shift();
		// as you know, vnode's children may be nested list
		if (isArr(item)) {
			queue.splice.apply(queue, [0, 0].concat(item));
			continue;
		}
		// if iteratee return false, ignore mapping children
		if (iteratee(item) === false) {
			continue;
		}
		if (item && item.props && !isUndefined(item.props.children)) {
			isArr(item.props.children) ? queue.push.apply(queue, item.props.children) : queue.push(item.props.children);
		}
	}
};

var getVnode = function getVnode(vnode) {
	if (vnode === null) {
		vnode = new Velem('noscript', {});
	} else if (!isObj(vnode)) {
		vnode = new Vtext(vnode);
	}
	return vnode;
};

var isValidComponent = function isValidComponent(obj) {
	if (obj == null) {
		return false;
	}
	var vtype = obj.vtype;
	if (vtype === VNODE_TYPE.COMPONENT || vtype === VNODE_TYPE.STATELESS_COMPONENT) {
		return true;
	}
	return false;
};

var updateQueue = {
	updaters: [],
	isPending: false,
	add: function add(updater) {
		/*
   event bubbles from bottom-level to top-level
   reverse the updater order can merge some props and state and reduce the refresh times
   see Updater.update method below to know why
  */
		this.updaters.splice(0, 0, updater);
	},
	batchUpdate: function batchUpdate() {
		this.isPending = true;
		/*
    each updater.update may add new updater to updateQueue
    clear them with a loop
  */
		while (this.updaters.length) {
			var updaters = this.updaters;

			this.updaters = [];
			eachItem(updaters, triggerUpdate);
		}
		this.isPending = false;
	}
};
var triggerUpdate = function triggerUpdate(updater) {
	return updater.update();
};

function Updater(instance) {
	this.instance = instance;
	this.pendingStates = [];
	this.pendingCallbacks = [];
	this.isPending = false;
	this.nextProps = this.nextContext = null;
	this.clearCallbacks = this.clearCallbacks.bind(this);
}

Updater.prototype = {
	emitUpdate: function emitUpdate(nextProps, nextContext) {
		this.nextProps = nextProps;
		this.nextContext = nextContext;
		// receive nextProps!! should update immediately
		!nextProps && updateQueue.isPending ? updateQueue.add(this) : this.update();
	},
	update: function update() {
		var instance = this.instance;
		var pendingStates = this.pendingStates;
		var nextProps = this.nextProps;
		var nextContext = this.nextContext;

		if (nextProps || pendingStates.length > 0) {
			nextProps = nextProps || instance.props;
			nextContext = nextContext || instance.context;
			this.nextProps = this.nextContext = null;
			// merge the nextProps and nextState and update by one time
			shouldUpdate(instance, nextProps, this.getState(), nextContext, this.clearCallbacks);
		}
	},
	addState: function addState(nextState) {
		if (nextState) {
			this.pendingStates.push(nextState);
			if (!this.isPending) {
				this.emitUpdate();
			}
		}
	},
	replaceState: function replaceState(nextState) {
		var pendingStates = this.pendingStates;

		pendingStates.pop();
		// push special params to point out should replace state
		pendingStates.push([nextState]);
	},
	getState: function getState() {
		var instance = this.instance;
		var pendingStates = this.pendingStates;
		var state = instance.state;
		var props = instance.props;

		if (pendingStates.length) {
			state = extend({}, state);
			eachItem(pendingStates, function (nextState) {
				// replace state
				if (isArr(nextState)) {
					state = extend({}, nextState[0]);
					return;
				}
				if (isFn(nextState)) {
					nextState = nextState.call(instance, state, props);
				}
				extend(state, nextState);
			});
			pendingStates.length = 0;
		}
		return state;
	},
	clearCallbacks: function clearCallbacks() {
		var pendingCallbacks = this.pendingCallbacks;
		var instance = this.instance;

		if (pendingCallbacks.length > 0) {
			eachItem(pendingCallbacks, function (callback) {
				return callback.call(instance);
			});
			pendingCallbacks.length = 0;
		}
	},
	addCallback: function addCallback(callback) {
		if (isFn(callback)) {
			this.pendingCallbacks.push(callback);
		}
	}
};
function Component(props, context) {
	this.$updater = new Updater(this);
	this.$cache = { isMounted: false };
	this.props = props;
	this.state = {};
	this.refs = {};
	this.context = context || {};
}

var noop = noop$1;
Component.prototype = {
	constructor: Component,
	getChildContext: noop,
	componentWillUpdate: noop,
	componentDidUpdate: noop,
	componentWillReceiveProps: noop,
	componentWillMount: noop,
	componentDidMount: noop,
	componentWillUnmount: noop,
	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		return true;
	},
	forceUpdate: function forceUpdate(callback) {
		var $updater = this.$updater;
		var $cache = this.$cache;
		var props = this.props;
		var state = this.state;
		var context = this.context;
		var vtree = this.vtree;
		var node = this.node;

		if ($updater.isPending) {
			return;
		}
		var nextProps = $cache.props || props;
		var nextState = $cache.state || state;
		var nextContext = $cache.context || {};
		$cache.props = $cache.state = $cache.context = null;
		$updater.isPending = true;
		this.componentWillUpdate(nextProps, nextState, nextContext);
		this.state = nextState;
		this.props = nextProps;
		this.context = nextContext;
		var nextVtree = renderComponent(this, $cache.$context);
		vtree.updateTree(nextVtree, node && node.parentNode);
		clearDidMount();
		$updater.isPending = false;
		this.vtree = nextVtree;
		this.node = nextVtree.node;
		this.componentDidUpdate(props, state, context);
		if (isFn(callback)) {
			callback.call(this);
		}
		$updater.emitUpdate();
	},
	setState: function setState(nextState, callback) {
		var $updater = this.$updater;

		$updater.addCallback(callback);
		$updater.addState(nextState);
	},
	replaceState: function replaceState(nextState, callback) {
		var $updater = this.$updater;

		$updater.addCallback(callback);
		$updater.replaceState(nextState);
	},
	getDOMNode: function getDOMNode() {
		var node = this.vtree.node;
		return node && node.tagName === 'NOSCRIPT' ? null : node;
	},
	isMounted: function isMounted() {
		return this.$cache.isMounted;
	}
};

var updatePropsAndState = function updatePropsAndState(component, props, state, context) {
	component.state = state;
	component.props = props;
	component.context = context || {};
};

var shouldUpdate = function shouldUpdate(component, nextProps, nextState, nextContext, callback) {
	var shouldComponentUpdate = component.shouldComponentUpdate(nextProps, nextState, nextContext);
	if (shouldComponentUpdate === false) {
		updatePropsAndState(component, nextProps, nextState, nextContext);
		return;
	}
	updatePropsAndState(component.$cache, nextProps, nextState, nextContext);
	component.forceUpdate(callback);
};

var eventNameAlias = {
	onDoubleClick: 'ondblclick'
};
var getEventName = function getEventName(key) {
	key = eventNameAlias[key] || key;
	return key.toLowerCase();
};

var isNotBubble = true;
var notBubbleEvents = {
	onload: isNotBubble,
	onunload: isNotBubble,
	onscroll: isNotBubble,
	onfocus: isNotBubble,
	onblur: isNotBubble,
	onrowexit: isNotBubble,
	onbeforeunload: isNotBubble,
	onstop: isNotBubble,
	ondragdrop: isNotBubble,
	ondragenter: isNotBubble,
	ondragexit: isNotBubble,
	ondraggesture: isNotBubble,
	ondragover: isNotBubble,
	oncontextmenu: isNotBubble
};

var eventTypes = {};

var addEvent = function addEvent(elem, eventType, listener) {
	eventType = getEventName(eventType);
	var isNotBubble = notBubbleEvents[eventType];

	if (isNotBubble) {
		elem[eventType] = listener;
		return;
	}

	var eventStore = elem.eventStore || (elem.eventStore = {});
	eventStore[eventType] = listener;

	if (!eventTypes[eventType]) {
		// onclick -> click
		document.addEventListener(eventType.substr(2), matchHandler);
		eventTypes[eventType] = true;
	}

	if (eventType === 'onchange') {
		addEvent(elem, 'oninput', listener);
	}
};

var removeEvent = function removeEvent(elem, eventType) {
	eventType = getEventName(eventType);
	var isNotBubble = notBubbleEvents[eventType];

	if (isNotBubble) {
		elem[eventType] = null;
		return;
	}

	var eventStore = elem.eventStore || (elem.eventStore = {});
	delete eventStore[eventType];

	if (eventType === 'onchange') {
		delete eventStore['oninput'];
	}
};

var matchHandler = function matchHandler(event) {
	var target = event.target;
	var type = event.type;

	var eventType = 'on' + type;
	var syntheticEvent = undefined;
	updateQueue.isPending = true;
	while (target) {
		var _target = target;
		var eventStore = _target.eventStore;

		var listener = eventStore && eventStore[eventType];
		if (!listener) {
			target = target.parentNode;
			continue;
		}
		if (!syntheticEvent) {
			syntheticEvent = {};
			syntheticEvent.nativeEvent = event;
			for (var key in event) {
				syntheticEvent[key] = typeof event[key] === 'function' ? event[key].bind(event) : event[key];
			}
		}
		syntheticEvent.currentTarget = target;
		listener.call(target, syntheticEvent);
		target = target.parentNode;
	}
	updateQueue.batchUpdate();
};

var store = {};
var render = function render(vtree, container, callback) {
	if (!vtree) {
		throw new Error('cannot render ' + vtree + ' to container');
	}
	var id = container[COMPONENT_ID];
	if (store.hasOwnProperty(id)) {
		store[id].updateTree(vtree, container);
	} else {
		container[COMPONENT_ID] = id = getUid();
		container.innerHTML = '';
		vtree.initTree(container);
	}
	store[id] = vtree;
	clearDidMount();

	var result = null;
	switch (vtree.vtype) {
		case VNODE_TYPE.ELEMENT:
			result = vtree.node;
			break;
		case VNODE_TYPE.COMPONENT:
			result = vtree.component;
			break;
	}

	if (isFn(callback)) {
		callback.call(result);
	}

	return result;
};

var unmountComponentAtNode = function unmountComponentAtNode(container) {
	if (!container.nodeName) {
		throw new Error('expect node');
	}
	var id = container[COMPONENT_ID];
	if (store.hasOwnProperty(id)) {
		store[id].destroyTree();
		delete store[id];
		return true;
	}
	return false;
};

var findDOMNode = function findDOMNode(node) {
	if (node == null) {
		return null;
	}
	if (node.nodeName) {
		return node;
	}
	var component = node;
	// if component.node equal to false, component must be unmounted
	if (isFn(component.getDOMNode) && component.node) {
		return component.getDOMNode();
	}
	throw new Error('findDOMNode can not find Node');
};

var unstable_renderSubtreeIntoContainer = function unstable_renderSubtreeIntoContainer(parentComponent, nextElement, container, callback) {
	return render(nextElement, container, callback);
};


var ReactDOM = Object.freeze({
	render: render,
	unmountComponentAtNode: unmountComponentAtNode,
	findDOMNode: findDOMNode,
	unstable_renderSubtreeIntoContainer: unstable_renderSubtreeIntoContainer
});

var isValidElement = function isValidElement(obj) {
	return obj != null && !!obj.vtype;
};

var cloneElement = function cloneElement(originElem, props) {
	for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
		children[_key - 2] = arguments[_key];
	}

	var type = originElem.type;
	var key = originElem.key;
	var ref = originElem.ref;

	props = extend({ key: key, ref: ref }, originElem.props, props);
	var vnode = createElement.apply(undefined, [type, props].concat(children));
	if (vnode.ref === originElem.ref) {
		vnode.refs = originElem.refs;
	}
	return vnode;
};

var createFactory = function createFactory(type) {
	var factory = function factory() {
		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return createElement.apply(undefined, [type].concat(args));
	};
	factory.type = type;
	return factory;
};

var createElement = function createElement(type, props) {
	for (var _len3 = arguments.length, children = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
		children[_key3 - 2] = arguments[_key3];
	}

	var Vnode = undefined;
	switch (true) {
		case isStr(type):
			Vnode = Velem;
			break;
		case isComponent(type):
			Vnode = Vcomponent;
			break;
		case isStatelessComponent(type):
			Vnode = VstatelessComponent;
			break;
		default:
			throw new Error('React.createElement: unexpect type [ ' + type + ' ]');
	}
	var key = null;
	var ref = null;
	var hasRef = false;
	if (props != null) {
		if (!isUndefined(props.key)) {
			key = '' + props.key;
			delete props.key;
		}
		if (!isUndefined(props.ref)) {
			ref = props.ref;
			delete props.ref;
			hasRef = true;
		}
	}
	var vnode = new Vnode(type, mergeProps(props, children, type.defaultProps));
	vnode.key = key;
	vnode.ref = ref;
	if (hasRef && Vnode !== VstatelessComponent) {
		handleVnodeWithRef(vnode);
	}
	return vnode;
};

var tagNames = 'a|abbr|address|area|article|aside|audio|b|base|bdi|bdo|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|data|datalist|dd|del|details|dfn|dialog|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|main|map|mark|menu|menuitem|meta|meter|nav|noscript|object|ol|optgroup|option|output|p|param|picture|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|u|ul|var|video|wbr|circle|clipPath|defs|ellipse|g|image|line|linearGradient|mask|path|pattern|polygon|polyline|radialGradient|rect|stop|svg|text|tspan';
var DOM = {};
eachItem(tagNames.split('|'), function (tagName) {
	DOM[tagName] = createFactory(tagName);
});

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

var only = function only(children) {
	if (children != null && !isArr(children)) {
		return children;
	}
	throw new Error('expect only one child');
};

var forEach = function forEach(children, iteratee, context) {
	if (children == null) {
		return children;
	}
	if (isArr(children)) {
		forEach$1(children, function (child, index) {
			iteratee.call(context, child, index);
		});
	} else {
		iteratee.call(context, children, 0);
	}
};

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
	eachItem(store, function (_ref) {
		var child = _ref.child;
		var key = _ref.key;
		var index = _ref.index;
		var isEqual = _ref.isEqual;

		if (child == null || isBln(child)) {
			return;
		}
		if (!isValidElement(child) || key == null) {
			result.push(child);
			return;
		}
		if (keyMap[key] !== 0) {
			key += ':' + index;
		}
		if (!isEqual) {
			key = escapeUserProvidedKey(child.key || '') + '/' + key;
		}
		child = cloneElement(child, { key: key });
		result.push(child);
	});
	return result;
};

var count = function count(children) {
	var count = 0;
	forEach(children, function () {
		count++;
	});
	return count;
};

var toArray = function toArray(children) {
	return map(children, identity) || [];
};

var getKey = function getKey(child, index) {
	var key = undefined;
	if (isValidElement(child) && isStr(child.key)) {
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

var Children = Object.freeze({
	only: only,
	forEach: forEach,
	map: map,
	count: count,
	toArray: toArray
});

var eachMixin = function eachMixin(mixins, iteratee) {
	eachItem(mixins, function (mixin) {
		if (mixin) {
			if (isArr(mixin.mixins)) {
				eachMixin(mixin.mixins, iteratee);
			}
			iteratee(mixin);
		}
	});
};

var combineMixinToProto = function combineMixinToProto(proto, mixin) {
	mapValue(mixin, function (value, key) {
		if (key === 'getInitialState') {
			proto.$getInitialStates.push(value);
			return;
		}
		var curValue = proto[key];
		if (isFn(curValue) && isFn(value)) {
			proto[key] = pipe(curValue, value);
		} else {
			proto[key] = value;
		}
	});
};

var combineMixinToClass = function combineMixinToClass(Component, mixin) {
	if (isObj(mixin.propTypes)) {
		extend(Component.propTypes, mixin.propTypes);
	}
	if (isObj(mixin.contextTypes)) {
		extend(Component.contextTypes, mixin.contextTypes);
	}
	if (isFn(mixin.getDefaultProps)) {
		extend(Component.defaultProps, mixin.getDefaultProps());
	}
	if (isObj(mixin.statics)) {
		extend(Component, mixin.statics);
	}
};

var bindContext = function bindContext(obj, source) {
	mapValue(source, function (value, key) {
		if (isFn(value)) {
			obj[key] = value.bind(obj);
		}
	});
};

var Facade = function Facade() {};
Facade.prototype = Component.prototype;

var getInitialState = function getInitialState() {
	var _this = this;

	var state = {};
	var setState = this.setState;
	this.setState = Facade;
	eachItem(this.$getInitialStates, function (getInitialState) {
		if (isFn(getInitialState)) {
			extend(state, getInitialState.call(_this));
		}
	});
	this.setState = setState;
	return state;
};

var createClass = function createClass(spec) {
	if (!isFn(spec.render)) {
		throw new Error('createClass: spec.render is not function');
	}
	var specMixins = spec.mixins || [];
	var mixins = specMixins.concat(spec);
	spec.mixins = null;
	function Klass(props, context) {
		Component.call(this, props, context);
		this.constructor = Klass;
		spec.autobind !== false && bindContext(this, Klass.prototype);
		this.state = this.getInitialState() || this.state;
	}
	Klass.displayName = spec.displayName;
	Klass.contextTypes = {};
	Klass.propTypes = {};
	Klass.defaultProps = {};
	var proto = Klass.prototype = new Facade();
	proto.$getInitialStates = [];
	eachMixin(mixins, function (mixin) {
		combineMixinToProto(proto, mixin);
		combineMixinToClass(Klass, mixin);
	});
	proto.getInitialState = getInitialState;
	spec.mixins = specMixins;
	return Klass;
};

var React = extend({
    version: '0.14.7',
    cloneElement: cloneElement,
    isValidElement: isValidElement,
    createElement: createElement,
    createFactory: createFactory,
    Component: Component,
    createClass: createClass,
    Children: Children,
    PropTypes: PropTypes,
    DOM: DOM
}, ReactDOM);

module.exports = React;