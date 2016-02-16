/*!
 * react-lite.js v0.0.23
 * (c) 2016 Jade Gu
 * Released under the MIT License.
 */
'use strict';

var TRUE = true;
var xlink = 'http://www.w3.org/1999/xlink';
var xml = 'http://www.w3.org/XML/1998/namespace';

var SVGNamespaceURI = 'http://www.w3.org/2000/svg';

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

var propAlias = {
    // svg attributes alias
    clipPath: 'clip-path',
    fillOpacity: 'fill-opacity',
    fontFamily: 'font-family',
    fontSize: 'font-size',
    markerEnd: 'marker-end',
    markerMid: 'marker-mid',
    markerStart: 'marker-start',
    stopColor: 'stop-color',
    stopOpacity: 'stop-opacity',
    strokeDasharray: 'stroke-dasharray',
    strokeLinecap: 'stroke-linecap',
    strokeOpacity: 'stroke-opacity',
    strokeWidth: 'stroke-width',
    textAnchor: 'text-anchor',
    xlinkActuate: 'xlink:actuate',
    xlinkArcrole: 'xlink:arcrole',
    xlinkHref: 'xlink:href',
    xlinkRole: 'xlink:role',
    xlinkShow: 'xlink:show',
    xlinkTitle: 'xlink:title',
    xlinkType: 'xlink:type',
    xmlBase: 'xml:base',
    xmlLang: 'xml:lang',
    xmlSpace: 'xml:space',
    // DOM attributes alias
    acceptCharset: 'accept-charset',
    className: 'class',
    htmlFor: 'for',
    httpEquiv: 'http-equiv',
    // DOM property alias
    autoCompconste: 'autocompconste',
    autoFocus: 'autofocus',
    autoPlay: 'autoplay',
    autoSave: 'autosave',
    hrefLang: 'hreflang',
    radioGroup: 'radiogroup',
    spellCheck: 'spellcheck',
    srcDoc: 'srcdoc',
    srcSet: 'srcset'
};

var attributesNS = {
    xlinkActuate: xlink,
    xlinkArcrole: xlink,
    xlinkHref: xlink,
    xlinkRole: xlink,
    xlinkShow: xlink,
    xlinkTitle: xlink,
    xlinkType: xlink,
    xmlBase: xml,
    xmlLang: xml,
    xmlSpace: xml
};

// those key must use be attributes
var attrbutesConfigs = {
    type: TRUE,
    clipPath: TRUE,
    cx: TRUE,
    cy: TRUE,
    d: TRUE,
    dx: TRUE,
    dy: TRUE,
    fill: TRUE,
    fillOpacity: TRUE,
    fontFamily: TRUE,
    fontSize: TRUE,
    fx: TRUE,
    fy: TRUE,
    gradientTransform: TRUE,
    gradientUnits: TRUE,
    markerEnd: TRUE,
    markerMid: TRUE,
    markerStart: TRUE,
    offset: TRUE,
    opacity: TRUE,
    patternContentUnits: TRUE,
    patternUnits: TRUE,
    points: TRUE,
    preserveAspectRatio: TRUE,
    r: TRUE,
    rx: TRUE,
    ry: TRUE,
    spreadMethod: TRUE,
    stopColor: TRUE,
    stopOpacity: TRUE,
    stroke: TRUE,
    strokeDasharray: TRUE,
    strokeLinecap: TRUE,
    strokeOpacity: TRUE,
    strokeWidth: TRUE,
    textAnchor: TRUE,
    transform: TRUE,
    version: TRUE,
    viewBox: TRUE,
    x1: TRUE,
    x2: TRUE,
    x: TRUE,
    xlinkActuate: TRUE,
    xlinkArcrole: TRUE,
    xlinkHref: TRUE,
    xlinkRole: TRUE,
    xlinkShow: TRUE,
    xlinkTitle: TRUE,
    xlinkType: TRUE,
    xmlBase: TRUE,
    xmlLang: TRUE,
    xmlSpace: TRUE,
    y1: TRUE,
    y2: TRUE,
    y: TRUE,

    /**
     * Standard Properties
     */
    allowFullScreen: TRUE,
    allowTransparency: TRUE,
    // capture: TRUE,
    charSet: TRUE,
    challenge: TRUE,
    classID: TRUE,
    cols: TRUE,
    contextMenu: TRUE,
    dateTime: TRUE,
    // disabled: TRUE,
    form: TRUE,
    formAction: TRUE,
    formEncType: TRUE,
    formMethod: TRUE,
    formTarget: TRUE,
    frameBorder: TRUE,
    height: TRUE,
    // hidden: TRUE,
    inputMode: TRUE,
    is: TRUE,
    keyParams: TRUE,
    keyType: TRUE,
    list: TRUE,
    manifest: TRUE,
    maxLength: TRUE,
    media: TRUE,
    minLength: TRUE,
    nonce: TRUE,
    role: TRUE,
    rows: TRUE,
    // seamless: TRUE,
    size: TRUE,
    sizes: TRUE,
    srcSet: TRUE,
    width: TRUE,
    wmode: TRUE,
    /**
     * RDFa Properties
     */
    about: TRUE,
    datatype: TRUE,
    inlist: TRUE,
    prefix: TRUE,
    // property is also supported for OpenGraph in meta tags.
    property: TRUE,
    resource: TRUE,
    'typeof': TRUE,
    vocab: TRUE,
    /**
     * Non-standard Properties
     */
    // autoCapitalize and autoCorrect are supported in Mobile Safari for
    // keyboard hints.
    autoCapitalize: TRUE,
    autoCorrect: TRUE,
    // itemProp, itemScope, itemType are for
    // Microdata support. See http://schema.org/docs/gs.html
    itemProp: TRUE,
    // itemScope: TRUE,
    itemType: TRUE,
    // itemID and itemRef are for Microdata support as well but
    // only specified in the the WHATWG spec document. See
    // https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
    itemID: TRUE,
    itemRef: TRUE,
    // IE-only attribute that specifies security restrictions on an iframe
    // as an alternative to the sandbox attribute on IE<10
    security: TRUE,
    // IE-only attribute that controls focus behavior
    unselectable: TRUE
};

var readOnlyProps = {
    nodeName: TRUE,
    nodeValue: TRUE,
    nodeType: TRUE,
    parentNode: TRUE,
    childNodes: TRUE,
    classList: TRUE,
    firstChild: TRUE,
    lastChild: TRUE,
    previousSibling: TRUE,
    previousElementSibling: TRUE,
    nextSibling: TRUE,
    nextElementSibling: TRUE,
    attributes: TRUE,
    ownerDocument: TRUE,
    namespaceURI: TRUE,
    localName: TRUE,
    baseURI: TRUE,
    prefix: TRUE,
    length: TRUE,
    specified: TRUE,
    tagName: TRUE,
    offsetTop: TRUE,
    offsetLeft: TRUE,
    offsetWidth: TRUE,
    offsetHeight: TRUE,
    offsetParent: TRUE,
    scrollWidth: TRUE,
    scrollHeight: TRUE,
    clientTop: TRUE,
    clientLeft: TRUE,
    clientWidth: TRUE,
    clientHeight: TRUE,
    x: TRUE,
    y: TRUE
};

var isUnitlessNumber = {
    animationIterationCount: TRUE,
    boxFlex: TRUE,
    boxFlexGroup: TRUE,
    boxOrdinalGroup: TRUE,
    columnCount: TRUE,
    flex: TRUE,
    flexGrow: TRUE,
    flexPositive: TRUE,
    flexShrink: TRUE,
    flexNegative: TRUE,
    flexOrder: TRUE,
    fontWeight: TRUE,
    lineClamp: TRUE,
    lineHeight: TRUE,
    opacity: TRUE,
    order: TRUE,
    orphans: TRUE,
    tabSize: TRUE,
    widows: TRUE,
    zIndex: TRUE,
    zoom: TRUE,

    // SVG-related properties
    fillOpacity: TRUE,
    stopOpacity: TRUE,
    strokeDashoffset: TRUE,
    strokeOpacity: TRUE,
    strokeWidth: TRUE
};

var ignoreKeys = {
    key: TRUE,
    ref: TRUE,
    children: TRUE
};

// use dom prop to compare new prop
var shouldUseDOMProp = {
    value: TRUE,
    checked: TRUE
};

var eventNameAlias = {
    onDoubleClick: 'ondblclick'
};

var notBubbleEvents = {
    onmouseleave: TRUE,
    onmouseenter: TRUE,
    onload: TRUE,
    onunload: TRUE,
    onscroll: TRUE,
    onfocus: TRUE,
    onblur: TRUE,
    onrowexit: TRUE,
    onbeforeunload: TRUE,
    onstop: TRUE,
    ondragdrop: TRUE,
    ondragenter: TRUE,
    ondragexit: TRUE,
    ondraggesture: TRUE,
    ondragover: TRUE,
    oncontextmenu: TRUE
};

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

var diff = function diff(vnode, newVnode) {
	var type = undefined;
	switch (true) {
		case vnode === newVnode:
			return type;
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

var flattenChildren = function flattenChildren(list, iteratee, record) {
	record = record || { index: 0 };
	for (var i = 0, len = list.length; i < len; i++) {
		var item = list[i];
		if (isArr(item)) {
			flattenChildren(item, iteratee, record);
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

var mapValue = function mapValue(obj, iteratee) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			iteratee(obj[key], key);
		}
	}
};

var mapKey = function mapKey(oldObj, newObj, iteratee) {
	var keyMap = {};
	var key;
	for (key in oldObj) {
		if (oldObj.hasOwnProperty(key)) {
			keyMap[key] = true;
			iteratee(key);
		}
	}
	for (key in newObj) {
		if (newObj.hasOwnProperty(key) && keyMap[key] !== true) {
			iteratee(key);
		}
	}
};

var extend = function extend(target) {
	for (var i = 1, len = arguments.length; i < len; i++) {
		var source = arguments[i];
		if (source != null) {
			for (var key in source) {
				if (source.hasOwnProperty(key) && !isUndefined(source[key])) {
					target[key] = source[key];
				}
			}
		}
	}
	return target;
};

var uid = 0;
var getUid = function getUid() {
	return ++uid;
};

var getChildren = function getChildren(children) {
	var childrenLen = children.length;
	if (childrenLen > 0) {
		if (childrenLen === 1) {
			children = children[0];
		}
		return children;
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

var EVENT_KEYS = /^on/i;
var isInnerHTMLKey = function isInnerHTMLKey(key) {
	return key === 'dangerouslySetInnerHTML';
};
var isStyleKey = function isStyleKey(key) {
	return key === 'style';
};

var setProp = function setProp(elem, key, value) {
	var originalKey = key;
	key = propAlias[key] || key;
	switch (true) {
		case ignoreKeys[key] === true:
			break;
		case EVENT_KEYS.test(key):
			addEvent(elem, key, value);
			break;
		case isStyleKey(key):
			setStyle(elem, value);
			break;
		case isInnerHTMLKey(key):
			value && value.__html != null && (elem.innerHTML = value.__html);
			break;
		case key in elem && attrbutesConfigs[originalKey] !== true:
			if (readOnlyProps[key] !== true) {
				if (key === 'title' && value == null) {
					value = '';
				}
				elem[key] = value;
			}
			break;
		default:
			if (value == null) {
				elem.removeAttribute(key);
			} else if (attributesNS[originalKey] === true) {
				elem.setAttributeNS(key, value);
			} else {
				elem.setAttribute(key, value);
			}
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
	key = propAlias[key] || key;
	switch (true) {
		case ignoreKeys[key] === true:
			break;
		case EVENT_KEYS.test(key):
			removeEvent(elem, key);
			break;
		case isStyleKey(key):
			removeStyle(elem, oldValue);
			break;
		case isInnerHTMLKey(key):
			elem.innerHTML = '';
			break;
		case attrbutesConfigs[key] === true || !(key in elem):
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

	mapKey(props, newProps, function (key) {
		if (ignoreKeys[key] === true) {
			return;
		}
		var value = newProps[key];
		var oldValue = shouldUseDOMProp[key] == true ? elem[key] : props[key];
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
		mapKey(style, newStyle, function (key) {
			var value = newStyle[key];
			var oldValue = style[key];
			if (value !== oldValue) {
				setStyleValue(elemStyle, key, value);
			}
		});
	}
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
	if (!isUnitlessNumber[key] && RE_NUMBER.test(value)) {
		style[key] = value + 'px';
	} else {
		key = key === 'float' ? 'cssFloat' : key;
		value = value == null || isBln(value) ? '' : value;
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
	attachRef: function attachRef(refValue) {
		var refKey = this.ref;
		var refs = this.refs;
		var vtype = this.vtype;

		if (!refs || refKey == null || !refValue) {
			return;
		}
		if (refValue.nodeName) {
			// support react v0.13 style: this.refs.myInput.getDOMNode()
			refValue.getDOMNode = getDOMNode;
		}
		if (isFn(refKey)) {
			refKey(refValue);
		} else {
			refs[refKey] = refValue;
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
	updateRef: function updateRef(newVtree, refValue) {
		if (!this.refs) {
			newVtree.attachRef(refValue);
			return;
		}
		if (!newVtree.refs) {
			this.detachRef();
			return;
		}
		if (this.refs !== newVtree.refs) {
			this.detachRef();
			newVtree.attachRef(refValue);
			return;
		}
		var oldRef = this.ref;
		var newRef = newVtree.ref;
		if (newRef == null) {
			this.detachRef();
		} else if (oldRef !== newRef) {
			this.detachRef();
			newVtree.attachRef(refValue);
		}
	},
	updateTree: function updateTree(node, newVtree, parentNode, parentContext) {
		var newNode = node;
		switch (diff(this, newVtree)) {
			case DIFF_TYPE.CREATE:
				newNode = newVtree.initTree(parentNode, parentContext);
				break;
			case DIFF_TYPE.REMOVE:
				this.destroyTree(node);
				break;
			case DIFF_TYPE.REPLACE:
				var $removeNode = removeNode;
				removeNode = noop$2;
				this.destroyTree(node);
				removeNode = $removeNode;
				newNode = newVtree.initTree(function (nextNode) {
					return parentNode.replaceChild(nextNode, node);
				}, parentContext);
				break;
			case DIFF_TYPE.UPDATE:
				newNode = this.update(node, newVtree, parentNode, parentContext);
				break;
		}
		return newNode;
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
	update: function update(node, nextVtext) {
		if (nextVtext.text !== this.text) {
			node.replaceData(0, node.length, nextVtext.text);
		}
		return node;
	},
	initTree: function initTree(parentNode) {
		var node = document.createTextNode(this.text);
		appendNode(parentNode, node);
		return node;
	},
	destroyTree: function destroyTree(node) {
		removeNode(node);
	}
});

function Velem(type, props) {
	this.type = type;
	this.props = props;
}

var getInnerHTML = function getInnerHTML(props) {
	var innerHTMLObj = props.dangerouslySetInnerHTML;
	return innerHTMLObj && innerHTMLObj.__html;
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
			flattenChildren(children, function (vchild, index) {
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
	initTree: function initTree(parentNode, parentContext) {
		var type = this.type;
		var props = this.props;

		var node = undefined;
		if (type === 'svg' || parentNode.namespaceURI === SVGNamespaceURI) {
			node = document.createElementNS(SVGNamespaceURI, type);
		} else {
			node = document.createElement(type);
		}
		this.eachChildren(function (vchild) {
			vchild.initTree(node, parentContext);
		});
		setProps(node, props);
		appendNode(parentNode, node);
		this.attachRef(node);
		return node;
	},
	destroyTree: function destroyTree(node) {
		var childNodes = [];
		for (var i = 0, len = node.childNodes.length; i < len; i++) {
			childNodes.push(node.childNodes[i]);
		}
		this.eachChildren(function (vchild, index) {
			vchild.destroyTree(childNodes[index]);
		});
		this.detachRef();
		removeNode(node);
	},
	update: function update(node, newVelem, parentNode, parentContext) {
		var props = this.props;

		var newProps = newVelem.props;
		var oldHtml = getInnerHTML(props);
		if (oldHtml == null) {
			var children = !isUndefined(props.children) ? props.children : [];
			if (!isArr(children)) {
				children = [children];
			}
			var count = 0;
			var childNodes = node.childNodes;
			newVelem.eachChildren(function (newVchild, index) {
				count += 1;
				var vchild = children[index];
				if (vchild) {
					vchild.updateTree(childNodes[index], newVchild, node, parentContext);
				} else {
					newVchild.initTree(node, parentContext);
				}
			});
			var childrenLen = children.length;
			// destroy old children not in the newChildren
			while (childrenLen > count) {
				childrenLen -= 1;
				children[childrenLen].destroyTree(childNodes[childrenLen]);
			}
			patchProps(node, props, newProps);
		} else {
			patchProps(node, props, newProps);
			newVelem.eachChildren(function (newVchild) {
				return newVchild.initTree(node, parentContext);
			});
		}
		this.updateRef(newVelem, node);
		return node;
	}
});

function VstatelessComponent(type, props) {
	this.type = type;
	this.props = props;
	this.id = getUid();
}

VstatelessComponent.prototype = new Vtree({
	vtype: VNODE_TYPE.STATELESS_COMPONENT,
	attachRef: noop$2,
	detachRef: noop$2,
	updateRef: noop$2,
	renderTree: function renderTree(parentContext) {
		var factory = this.type;
		var props = this.props;

		var componentContext = getContextByTypes(parentContext, factory.contextTypes);
		var vtree = factory(props, componentContext);
		if (vtree && vtree.render) {
			vtree = vtree.render();
		}
		return getVnode(vtree);
	},
	initTree: function initTree(parentNode, parentContext) {
		var vtree = this.renderTree(parentContext);
		var node = vtree.initTree(parentNode, parentContext);
		node.cache = node.cache || {};
		node.cache[this.id] = vtree;
		return node;
	},
	destroyTree: function destroyTree(node) {
		var id = this.id;
		var vtree = node.cache[id];
		var $removeNode = removeNode;
		removeNode = noop$2;
		delete node.cache[id];
		vtree.destroyTree(node);
		removeNode = $removeNode;
		removeNode(node);
	},
	update: function update(node, newVstatelessComponent, parentNode, parentContext) {
		var id = this.id;
		var vtree = node.cache[id];
		delete node.cache[id];
		var newVtree = newVstatelessComponent.renderTree(parentContext);
		var newNode = vtree.updateTree(node, newVtree, parentNode, parentContext);
		newNode.cache = newNode.cache || {};
		newNode.cache[newVstatelessComponent.id] = newVtree;
		if (newNode !== node) {
			extend(newNode.cache, node.cache);
		}
		return newNode;
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
	for (var key in contextTypes) {
		if (contextTypes.hasOwnProperty(key)) {
			context[key] = curContext[key];
		}
	}
	return context;
};

var bindRefs = function bindRefs(refs) {
	return function (vnode) {
		vnode.refs = vnode.refs || refs;
	};
};

var renderComponent = function renderComponent(component, parentContext) {
	setRefs = bindRefs(component.refs);
	var vtree = component.render();
	if (isUndefined(vtree)) {
		throw new Error('component can not render undefined');
	}
	vtree = getVnode(vtree);
	var curContext = component.getChildContext();
	if (curContext) {
		curContext = extend({}, parentContext, curContext);
	} else {
		curContext = parentContext;
	}
	vtree.context = curContext;
	setRefs = noop$2;
	return vtree;
};

var didMountComponents = [];
var callDidMount = function callDidMount(store) {
	return store.vcomponent.didMount(store.node);
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
	this.id = getUid();
}

Vcomponent.prototype = new Vtree({
	vtype: VNODE_TYPE.COMPONENT,
	initTree: function initTree(parentNode, parentContext) {
		var Component = this.type;
		var props = this.props;
		var id = this.id;

		var componentContext = getContextByTypes(parentContext, Component.contextTypes);
		var component = new Component(props, componentContext);
		var updater = component.$updater;
		var cache = component.$cache;

		cache.parentContext = parentContext;
		updater.isPending = true;
		component.props = component.props || props;
		component.componentWillMount();
		updatePropsAndState(component, component.props, updater.getState(), component.context);
		var vtree = renderComponent(component, parentContext);
		var node = vtree.initTree(parentNode, vtree.context);
		node.cache = node.cache || {};
		node.cache[id] = component;
		cache.vtree = vtree;
		cache.node = node;
		cache.isMounted = true;
		didMountComponents.push({ node: node, vcomponent: this });
		return node;
	},
	didMount: function didMount(node) {
		var component = node.cache[this.id];
		var updater = component.$updater;
		component.componentDidMount();
		updater.isPending = false;
		this.attachRef(component);
		updater.emitUpdate();
	},
	destroyTree: function destroyTree(node) {
		var id = this.id;
		var component = node.cache[id];
		var cache = component.$cache;
		var $removeNode = removeNode;
		removeNode = noop$2;
		delete node.cache[id];
		this.detachRef();
		component.setState = noop$2;
		component.componentWillUnmount();
		cache.vtree.destroyTree(node);
		removeNode = $removeNode;
		removeNode(node);
		delete component.setState;
		cache.isMounted = false;
		cache.node = cache.parentContext = cache.vtree = component.refs = component.context = null;
	},
	update: function update(node, newVtree, parentNode, parentContext) {
		var id = this.id;
		var component = node.cache[id];
		var updater = component.$updater;
		var cache = component.$cache;
		var Component = newVtree.type;
		var nextProps = newVtree.props;

		var componentContext = getContextByTypes(parentContext, Component.contextTypes);
		delete node.cache[id];
		node.cache[newVtree.id] = component;
		cache.parentContext = parentContext;
		updater.isPending = true;
		component.componentWillReceiveProps(nextProps, componentContext);
		updater.isPending = false;
		updater.emitUpdate(nextProps, componentContext);
		this.updateRef(newVtree, component);
		return cache.node;
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

var getVnode = function getVnode(vnode) {
	if (vnode === null) {
		vnode = new Velem('noscript', {});
	} else if (!isValidElement(vnode)) {
		vnode = new Vtext(vnode);
	}
	return vnode;
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
		nextProps || !updateQueue.isPending ? this.update() : updateQueue.add(this);
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

		if ($updater.isPending || !$cache.isMounted) {
			return;
		}
		var nextProps = $cache.props || props;
		var nextState = $cache.state || state;
		var nextContext = $cache.context || {};
		var parentContext = $cache.parentContext;
		var node = $cache.node;
		var vtree = $cache.vtree;
		$cache.props = $cache.state = $cache.context = null;
		$updater.isPending = true;
		this.componentWillUpdate(nextProps, nextState, nextContext);
		this.state = nextState;
		this.props = nextProps;
		this.context = nextContext;
		var nextVtree = renderComponent(this, parentContext);
		var newNode = vtree.updateTree(node, nextVtree, node.parentNode, nextVtree.context);
		if (newNode !== node) {
			newNode.cache = newNode.cache || {};
			extend(newNode.cache, node.cache);
		}
		$cache.vtree = nextVtree;
		$cache.node = newNode;
		clearDidMount();
		this.componentDidUpdate(props, state, context);
		if (callback) {
			callback.call(this);
		}
		$updater.isPending = false;
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
		var node = this.$cache.node;
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

var getEventName = function getEventName(key) {
	key = eventNameAlias[key] || key;
	return key.toLowerCase();
};

var eventTypes = {};
var addEvent = function addEvent(elem, eventType, listener) {
	eventType = getEventName(eventType);

	if (notBubbleEvents[eventType] === true) {
		elem[eventType] = listener;
		return;
	}

	var eventStore = elem.eventStore || (elem.eventStore = {});
	eventStore[eventType] = listener;

	if (!eventTypes[eventType]) {
		// onclick -> click
		document.addEventListener(eventType.substr(2), dispatchEvent);
		eventTypes[eventType] = true;
	}

	if (eventType === 'onchange') {
		addEvent(elem, 'oninput', listener);
	}
};

var removeEvent = function removeEvent(elem, eventType) {
	eventType = getEventName(eventType);
	if (notBubbleEvents[eventType] === true) {
		elem[eventType] = null;
		return;
	}

	var eventStore = elem.eventStore || (elem.eventStore = {});
	delete eventStore[eventType];

	if (eventType === 'onchange') {
		delete eventStore['oninput'];
	}
};

var dispatchEvent = function dispatchEvent(event) {
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
var renderTreeIntoContainer = function renderTreeIntoContainer(vtree, container, callback, parentContext) {
	if (!vtree) {
		throw new Error('cannot render ' + vtree + ' to container');
	}
	var id = container[COMPONENT_ID];
	if (store.hasOwnProperty(id)) {
		store[id].updateTree(container.firstChild, vtree, container, parentContext);
	} else {
		container[COMPONENT_ID] = id = getUid();
		container.innerHTML = '';
		vtree.initTree(container, parentContext);
	}
	store[id] = vtree;
	clearDidMount();

	var result = null;
	switch (vtree.vtype) {
		case VNODE_TYPE.ELEMENT:
			result = container.firstChild;
			break;
		case VNODE_TYPE.COMPONENT:
			result = container.firstChild.cache[vtree.id];
			break;
	}

	if (isFn(callback)) {
		callback.call(result);
	}

	return result;
};

var render = function render(vtree, container, callback) {
	return renderTreeIntoContainer(vtree, container, callback);
};

var unstable_renderSubtreeIntoContainer = function unstable_renderSubtreeIntoContainer(parentComponent, subVtree, container, callback) {
	var context = parentComponent.vtree ? parentComponent.vtree.context : parentComponent.$cache.parentContext;
	return renderTreeIntoContainer(subVtree, container, callback, context);
};

var unmountComponentAtNode = function unmountComponentAtNode(container) {
	if (!container.nodeName) {
		throw new Error('expect node');
	}
	var id = container[COMPONENT_ID];
	if (store.hasOwnProperty(id)) {
		store[id].destroyTree(container.firstChild);
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
	if (component.getDOMNode && component.$cache.isMounted) {
		return component.getDOMNode();
	}
	throw new Error('findDOMNode can not find Node');
};


var ReactDOM = Object.freeze({
	render: render,
	unstable_renderSubtreeIntoContainer: unstable_renderSubtreeIntoContainer,
	unmountComponentAtNode: unmountComponentAtNode,
	findDOMNode: findDOMNode
});

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
	if (isValidElement(children)) {
		return children;
	}
	throw new Error('expect only one child');
};

var forEach = function forEach(children, iteratee, context) {
	if (children == null) {
		return children;
	}
	if (isArr(children)) {
		flattenChildren(children, function (child, index) {
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