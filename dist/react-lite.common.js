/*!
 * react-lite.js v0.0.2
 * (c) 2015 Jade Gu
 * Released under the MIT License.
 */
'use strict';

var isType = function isType(type) {
	return function (obj) {
		return obj != null && Object.prototype.toString.call(obj) === '[object ' + type + ']';
	};
};
var isObj = isType('Object');
var isStr = isType('String');
var isNum = isType('Number');
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
	return obj && (!obj.prototype || !('forceUpdate' in obj.prototype));
};

var pipe = function pipe(fn1, fn2) {
	return function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		fn1.apply(this, args);
		return fn2.apply(this, args);
	};
};

var forEach = function forEach(list, iteratee) {
	var record = arguments.length <= 2 || arguments[2] === undefined ? { index: 0 } : arguments[2];

	for (var i = 0, len = list.length; i < len; i += 1) {
		var item = list[i];
		if (isArr(item)) {
			forEach(item, iteratee, record);
		} else if (!isUndefined(item)) {
			iteratee(item, record.index);
			record.index += 1;
		}
	}
};

var eachItem = function eachItem(list, iteratee) {
	for (var i = 0, len = list.length; i < len; i += 1) {
		iteratee(list[i], i);
	}
};

var mapValue = function mapValue(obj, iteratee) {
	for (var key in obj) {
		if (!obj.hasOwnProperty(key)) {
			continue;
		}
		iteratee(obj[key], key);
	}
};

var extend = function extend(target) {
	for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
		args[_key2 - 1] = arguments[_key2];
	}

	eachItem(args, function (source) {
		if (source == null) {
			return;
		}
		mapValue(source, function (value, key) {
			target[key] = value;
		});
	});
	return target;
};

var uid = 0;
var getUid = function getUid() {
	return ++uid;
};

var hasKey = function hasKey(obj) {
	var key = arguments.length <= 1 || arguments[1] === undefined ? 'key' : arguments[1];
	return obj && obj.props && obj.props.hasOwnProperty(key);
};

var mergeProps = function mergeProps(props, children, defaultProps) {
	var result = extend({}, defaultProps, props);
	if (children && children.length > 0) {
		result.children = children.length === 1 ? children[0] : children;
	}
	return result;
};

var setAttr = function setAttr(elem, key, value) {
	elem.setAttribute(key, value);
};
var getAttr = function getAttr(elem, key) {
	return elem.getAttribute(key);
};
var removeAttr = function removeAttr(elem, key) {
	elem.removeAttribute(key);
};
var setEvent = function setEvent(elem, key, value) {
	if (!isFn(value)) {
		return;
	}
	key = key.toLowerCase();
	elem[key] = value;
	if (key === 'onchange') {
		elem.oninput = value;
	}
};
var removeEvent = function removeEvent(elem, key) {
	key = key.toLowerCase();
	elem[key] = null;
	if (key === 'onchange') {
		elem.oninput = null;
	}
};

var IGNORE_KEYS = /(key)|(ref)|(children)/i;
var EVENT_KEYS = /^on/i;
var isIgnoreKey = function isIgnoreKey(key) {
	return IGNORE_KEYS.test(key);
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
var setProp = function setProp(elem, key, value) {
	switch (true) {
		case isIgnoreKey(key):
			break;
		case isEventKey(key):
			setEvent(elem, key, value);
			break;
		case isStyleKey(key):
			setStyle(elem, value);
			break;
		case isInnerHTMLKey(key):
			value && isStr(value.__html) && (elem.innerHTML = value.__html);
			break;
		case key in elem:
			elem[key] = value;
			break;
		default:
			elem.setAttribute(key, value);
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
		case !(key in elem):
			removeAttr(elem, key);
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
				elem[key] = null;
			} catch (e) {
				//pass
			}
	}
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

	mapValue(newProps, function (value, key) {
		if (isIgnoreKey(key)) {
			return;
		}
		var valueIsUndefined = isUndefined(value);
		if (!props.hasOwnProperty(key)) {
			if (!valueIsUndefined) {
				setProp(elem, key, value);
				return;
			}
		}
		var oldValue = props[key];
		delete props[key];
		if (value === oldValue) {
			return;
		}
		if (valueIsUndefined) {
			removeProp(elem, key, oldValue);
			return;
		}
		if (isStyleKey(key)) {
			patchStyle(elem, oldValue, value);
		} else if (isInnerHTMLKey(key)) {
			var oldHtml = oldValue && oldValue.__html;
			var html = value && value.__html;
			if (!isStr(html)) {
				elem.innerHTML = '';
			} else if (html !== oldHtml) {
				elem.innerHTML = html;
			}
		} else {
			setProp(elem, key, value);
		}
	});
	removeProps(elem, props);
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
		mapValue(newStyle, function (value, key) {
			if (value == null) {
				elemStyle[key] = '';
			} else {
				var oldValue = undefined;
				if (style.hasOwnProperty(key)) {
					oldValue = style[key];
					delete style[key];
				}
				if (value !== oldValue) {
					setStyleValue(elemStyle, key, value);
				}
			}
		});
		removeStyle(elem, style);
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
mapValue(isUnitlessNumber, function (_, prop) {
	eachItem(prefixes, function (prefix) {
		return isUnitlessNumber[prefixKey(prefix, prop)] = true;
	});
});

var RE_NUMBER = /^-?\d+(\.\d+)?$/;
var setStyleValue = function setStyleValue(style, key, value) {
	if (isBln(value) || value == null) {
		value = '';
	}
	if (!isUnitlessNumber[key] && RE_NUMBER.test(value)) {
		style[key] = value + 'px';
	} else {
		style[key] = value;
	}
};

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

var COMPONENT_ID = 'data-liteid';

var store = {};
var render = function render(vtree, container, callback) {
	if (!vtree) {
		throw new Error('cannot render ' + vtree + ' to container');
	}
	var id = getAttr(container, COMPONENT_ID);
	if (store.hasOwnProperty(id)) {
		store[id].updateTree(vtree, container);
	} else {
		setAttr(container, COMPONENT_ID, id = getUid());
		container.innerHTML = '';
		vtree.initTree(container);
	}
	store[id] = vtree;

	var result = undefined;

	switch (vtree.vtype) {
		case VNODE_TYPE.ELEMENT:
			result = container.firstChild;
			break;
		case VNODE_TYPE.COMPONENT:
			result = vtree.component;
			break;
		default:
			result = null;
	}

	if (isFn(callback)) {
		callback.call(result);
	}

	return result;
};

var unmountComponentAtNode = function unmountComponentAtNode(container) {
	var id = getAttr(container, COMPONENT_ID);
	if (store.hasOwnProperty(id)) {
		store[id].destroyTree(container);
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
	if (isFn(component.getDOMNode) && component.node) {
		node = component.getDOMNode();
		return node;
	}
	throw new Error('findDOMNode can not find Node');
};

function Updater(instant) {
	this.instant = instant;
	this.pendingStates = [];
	this.pendingCallbacks = [];
	this.isPendingForceUpdate = false;
}

Updater.prototype = {
	constructor: Updater,
	emitUpdate: function emitUpdate(nextProps) {
		var instant = this.instant;
		var pendingStates = this.pendingStates;
		var pendingCallbacks = this.pendingCallbacks;

		if (nextProps || pendingStates.length > 0) {
			var props = nextProps || instant.props;
			shouldUpdate(instant, props, this.getState(), this.clearCallbacks.bind(this));
		}
	},
	addState: function addState(nextState) {
		if (nextState) {
			this.pendingStates.push(nextState);
			if (!this.isPendingForceUpdate) {
				this.emitUpdate();
			}
		}
	},
	replaceState: function replaceState(nextState) {
		var pendingStates = this.pendingStates;

		pendingStates.pop();
		pendingStates.push(nextState);
	},
	getState: function getState() {
		var instant = this.instant;
		var pendingStates = this.pendingStates;
		var state = instant.state;
		var props = instant.props;

		eachItem(pendingStates, function (nextState) {
			if (isFn(nextState)) {
				nextState = nextState.call(instant, state, props);
			}
			state = extend({}, state, nextState);
		});
		pendingStates.length = 0;
		return state;
	},
	clearCallbacks: function clearCallbacks() {
		var pendingCallbacks = this.pendingCallbacks;
		var instant = this.instant;

		if (pendingCallbacks.length > 0) {
			eachItem(pendingCallbacks, function (callback) {
				return callback.call(instant);
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
function Component(props) {
	this.$updater = new Updater(this);
	this.$cache = {};
	this.props = props;
	this.state = {};
	this.refs = {};
}

Component.prototype = {
	constructor: Component,
	componentWillUpdate: function componentWillUpdate(nextProps, nextState) {},
	componentDidUpdate: function componentDidUpdate(prevProps, prevState) {},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {},
	componentWillMount: function componentWillMount() {},
	componentDidMount: function componentDidMount() {},
	componentWillUnmount: function componentWillUnmount() {},
	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		return true;
	},
	forceUpdate: function forceUpdate(callback) {
		var $cache = this.$cache;
		var props = this.props;
		var state = this.state;
		var vtree = this.vtree;
		var node = this.node;
		var refs = this.refs;

		var nextProps = $cache.props || props;
		var nextState = $cache.state || state;
		$cache.props = $cache.state = null;
		this.componentWillUpdate(nextProps, nextState);
		this.props = nextProps;
		this.state = nextState;
		var nextVtree = renderComponent(this);
		vtree.updateTree(nextVtree, node && node.parentNode);
		this.vtree = nextVtree;
		this.componentDidUpdate(props, state);
		if (isFn(callback)) {
			callback.call(this);
		}
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
		return node.tagName === 'NOSCRIPT' ? null : node;
	}
};

var updatePropsAndState = function updatePropsAndState(component, props, state) {
	component.state = state;
	component.props = props;
};

var shouldUpdate = function shouldUpdate(component, nextProps, nextState, callback) {
	var $cache = component.$cache;

	var shouldUpdate = component.shouldComponentUpdate(nextProps, nextState);
	if (shouldUpdate === false) {
		updatePropsAndState(component, nextProps, nextState);
		return;
	}
	updatePropsAndState(component.$cache, nextProps, nextState);
	component.forceUpdate(callback);
};

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
		case hasKey(newVnode):
			if (!hasKey(vnode) || newVnode.props.key !== vnode.props.key) {
				type = DIFF_TYPE.REPLACE;
			} else {
				type = DIFF_TYPE.UPDATE;
			}
			break;
		case hasKey(vnode):
			type = DIFF_TYPE.REPLACE;
			break;
		default:
			type = DIFF_TYPE.UPDATE;
	}
	return type;
};

function Vtree(properties) {
	extend(this, properties);
}

var noop = function noop() {};
var getDOMNode = function getDOMNode() {
	return this;
};
Vtree.prototype = {
	constructor: Vtree,
	mapTree: noop,
	eachChildren: noop,
	attachRef: function attachRef() {
		var props = this.props;
		var refs = this.refs;
		var vtype = this.vtype;

		if (!refs) {
			return;
		}
		var refKey = undefined;
		var refValue = undefined;
		if (vtype === VNODE_TYPE.ELEMENT) {
			refValue = this.node;
			refValue.getDOMNode = getDOMNode;
		} else if (vtype === VNODE_TYPE.COMPONENT) {
			refValue = this.component;
		}
		if (refValue && refs && props && props.ref) {
			refKey = props.ref;
			if (isFn(refKey)) {
				refKey(refValue);
			} else if (isStr(refKey)) {
				refs[refKey] = refValue;
			}
		}
	},
	detachRef: function detachRef() {
		var props = this.props;
		var refs = this.refs;
		var vtype = this.vtype;

		if (!refs) {
			return;
		}
		var refKey = undefined;
		if (refs && props && props.ref) {
			if (isFn(props.ref)) {
				props.ref(null);
			} else {
				delete refs[props.ref];
			}
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
		var props = this.props;
		var newProps = newVtree.props;
		var oldTreeRef = props && props.ref;
		var newTreeRef = newProps && newProps.ref;
		if (isUndefined(newTreeRef)) {
			this.detachRef();
		} else if (oldTreeRef !== newTreeRef) {
			this.detachRef();
			newVtree.attachRef();
		}
	},
	updateTree: function updateTree(nextVtree, parentNode) {
		_updateTree(this, nextVtree, parentNode);
	}
};

function Vtext(text) {
	this.text = text;
}

Vtext.prototype = new Vtree({
	constructor: Vtext,
	vtype: VNODE_TYPE.TEXT,
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

function Velem(type, props, children) {
	this.type = type;
	this.props = props;
	this.children = children;
}

var unmountTree = function unmountTree(vtree) {
	var vtype = vtree.vtype;

	if (vtype === VNODE_TYPE.COMPONENT || vtype === VNODE_TYPE.STATELESS_COMPONENT) {
		vtree.destroyTree();
		return;
	}
	vtree.detachRef();
};
var destroyTree = function destroyTree(vtree) {
	return vtree.destroyTree();
};
Velem.prototype = new Vtree({
	constructor: Velem,
	vtype: VNODE_TYPE.ELEMENT,
	eachChildren: function eachChildren(iteratee) {
		var children = this.children;
		var sorted = this.sorted;

		if (sorted) {
			eachItem(children, iteratee);
			return;
		}
		if (children && children.length > 0) {
			var newChildren = [];
			forEach(children, function (vchild, index) {
				vchild = getVnode(vchild);
				iteratee(vchild, index);
				newChildren.push(vchild);
			});
			this.children = newChildren;
			this.sorted = true;
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

		var node = this.node = createElement$1(type, props);
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

		var children = this.children || [];
		patchProps(node, props, newVelem.props);
		newVelem.node = node;
		newVelem.eachChildren(function (newVchild, index) {
			newVelem;
			var vchild = children[index];
			if (vchild) {
				vchild.updateTree(newVchild, node);
			} else {
				newVchild.initTree(node);
			}
		});

		var newVchildLen = newVelem.children && newVelem.children.length ? newVelem.children.length : 0;
		if (children.length > newVchildLen) {
			eachItem(children.slice(newVchildLen), destroyTree);
		}
		this.updateRef(newVelem);
	}
});

function VstatelessComponent(type, props, children) {
	this.type = type;
	this.props = props;
	this.children = children;
}

VstatelessComponent.prototype = new Vtree({
	constructor: VstatelessComponent,
	vtype: VNODE_TYPE.STATELESS_COMPONENT,
	attachRef: noop,
	detachRef: noop,
	updateRef: noop,
	mapTree: function mapTree(iteratee) {
		iteratee(this);
	},
	renderTree: function renderTree() {
		var factory = this.type;

		var props = mergeProps(this.props, this.children, factory.defaultProps);
		var vtree = factory(props);
		if (vtree && isFn(vtree.render)) {
			vtree = vtree.render();
		}
		this.vtree = getVnode(vtree);
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
	}
});

var setRefs = noop;
var collectRef = function collectRef(vnode) {
	setRefs(vnode);
};
var bindRefs = function bindRefs(refs) {
	return function (vnode) {
		if (!vnode.refs) {
			vnode.refs = refs;
		}
	};
};
var renderComponent = function renderComponent(component) {
	setRefs = bindRefs(component.refs);
	var vtree = checkVtree(component.render());
	setRefs = noop;
	return vtree;
};
var neverUpdate = function neverUpdate() {
	return false;
};

function Vcomponent(type, props, children) {
	this.type = type;
	this.props = props;
	this.children = children;
}

Vcomponent.prototype = new Vtree({
	constructor: Vcomponent,
	vtype: VNODE_TYPE.COMPONENT,
	mapTree: function mapTree(iteratee) {
		iteratee(this);
	},
	initTree: function initTree(parentNode) {
		var Component = this.type;

		var props = mergeProps(this.props, this.children, Component.defaultProps);
		var component = this.component = new Component(props);
		var updater = component.$updater;
		updater.isPendingForceUpdate = true;
		component.props = component.props || props;
		component.componentWillMount();
		var nextState = updater.getState();
		if (nextState !== component.state) {
			updatePropsAndState(component, component.props, nextState);
		}
		var vtree = renderComponent(component);
		component.vtree = vtree;
		vtree.initTree(parentNode);
		component.node = this.node = vtree.node;
		component.componentDidMount();
		updater.isPendingForceUpdate = false;
		this.attachRef();
		updater.emitUpdate();
	},
	destroyTree: function destroyTree() {
		var component = this.component;
		var props = this.props;

		component.shouldComponentUpdate = neverUpdate;
		component.forceUpdate = noop;
		component.componentWillUnmount();
		this.detachRef();
		component.vtree.destroyTree();
		this.component = this.node = component.node = component.refs = null;
	},
	update: function update(newVtree, parentNode) {
		var component = this.component;

		if (!component) {
			return;
		}
		var Component = newVtree.type;
		var props = newVtree.props;
		var children = newVtree.children;

		var nextProps = mergeProps(props, children, Component.defaultProps);
		var updater = component.$updater;
		newVtree.component = component;
		updater.isPendingForceUpdate = true;
		component.componentWillReceiveProps(nextProps);
		updater.isPendingForceUpdate = false;
		updater.emitUpdate(nextProps);
		this.updateRef(newVtree);
	}
});

var _updateTree = function _updateTree(vtree, newVtree, parentNode) {
	var diffType = diff(vtree, newVtree);
	switch (diffType) {
		case DIFF_TYPE.CREATE:
			newVtree.initTree(parentNode);
			break;
		case DIFF_TYPE.REMOVE:
			vtree.destroyTree();
			break;
		case DIFF_TYPE.REPLACE:
			newVtree.initTree(function (newNode) {
				replaceNode(parentNode, newNode, vtree.node);
			});
			vtree.destroyTree();
			break;
		case DIFF_TYPE.UPDATE:
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
		if (isFn(parentNode)) {
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
var createElement$1 = function createElement(tagName, props) {
	var node = document.createElement(tagName);
	props && setProps(node, props);
	return node;
};

var getVnode = function getVnode(vnode) {
	if (vnode === null || vnode === false) {
		vnode = new Velem('noscript');
	} else if (!isObj(vnode)) {
		vnode = new Vtext(vnode);
	}
	return vnode;
};

var checkVtree = function checkVtree(vtree) {
	if (isUndefined(vtree)) {
		throw new Error('component can not render undefined');
	}
	return getVnode(vtree);
};

var createElement = function createElement(type, props) {
	for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
		children[_key - 2] = arguments[_key];
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
			throw new Error('React.createElement: unexpect type ' + type);
	}
	if (children.length === 0) {
		children = undefined;
	}
	var vnode = new Vnode(type, props, children);
	if (hasKey(vnode, 'ref') && Vnode !== VstatelessComponent) {
		collectRef(vnode);
	}
	return vnode;
};

var combineMixin = function combineMixin(proto, mixin) {
	if (isArr(mixin.mixins)) {
		combineMixins(proto, mixin.mixins);
	}
	mapValue(mixin, function (value, key) {
		if (key === 'statics' || key === 'propTypes' || key === 'mixins') {
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
var combineMixins = function combineMixins(proto, mixins) {
	eachItem(mixins, function (mixin) {
		return combineMixin(proto, mixin);
	});
};

var bindContext = function bindContext(obj, source) {
	mapValue(source, function (value, key) {
		if (isFn(value)) {
			obj[key] = value.bind(obj);
		}
	});
};

var combineStaticsAndPropTypes = function combineStaticsAndPropTypes(Component, mixins) {
	eachItem(mixins, function (mixin) {
		if (isArr(mixin.mixins)) {
			combineStaticsAndPropTypes(Component, mixin.mixins);
		}
		if (isObj(mixin.propTypes)) {
			extend(Component.propTypes, mixin.propTypes);
		}
		if (isObj(mixin.statics)) {
			extend(Component, mixin.statics);
		}
	});
};

var Facade = function Facade() {};
Facade.prototype = Component.prototype;

var createClass = function createClass(spec) {
	if (!isFn(spec.render)) {
		throw new Error('createClass: spec.render is not function');
	}
	var mixins = spec.mixins || [];
	delete spec.mixins;
	mixins = mixins.concat(spec);
	function Klass(props) {
		Component.call(this, props);
		spec.autobind !== false && bindContext(this, Klass.prototype);
		this.constructor = Klass;
		if (isFn(this.getInitialState)) {
			var setState = this.setState;
			this.setState = Facade;
			this.state = this.getInitialState();
			this.setState = setState;
		}
	}
	Klass.prototype = new Facade();
	combineMixins(Klass.prototype, mixins);
	Klass.propTypes = {};
	combineStaticsAndPropTypes(Klass, mixins);
	if (isFn(spec.getDefaultProps)) {
		Klass.defaultProps = spec.getDefaultProps();
	}
	Klass.displayName = spec.displayName;
	mixins.pop();
	spec.mixins = mixins;
	return Klass;
};

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

var createFactory = function createFactory(type) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return createElement.apply(undefined, [type].concat(args));
  };
};

var index = {
  Component: Component,
  createClass: createClass,
  createElement: createElement,
  createFactory: createFactory,
  Children: Children,
  PropTypes: PropTypes,
  render: render,
  findDOMNode: findDOMNode,
  unmountComponentAtNode: unmountComponentAtNode
};

module.exports = index;