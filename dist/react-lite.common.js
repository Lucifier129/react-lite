/*!
 * react-lite.js v0.0.29
 * (c) 2016 Jade Gu
 * Released under the MIT License.
 */
'use strict';

var TRUE = true;
var xlink = 'http://www.w3.org/1999/xlink';
var xml = 'http://www.w3.org/XML/1998/namespace';

var SVGNamespaceURI = 'http://www.w3.org/2000/svg';
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
    children: TRUE,
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

var hasOwn = function hasOwn(obj, key) {
	return Object.prototype.hasOwnProperty.call(obj, key);
};
var noop = function noop() {};
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
	var len = list.length;
	var i = -1;
	record = record || [];

	while (len--) {
		var item = list[++i];
		if (isArr(item)) {
			flattenChildren(item, iteratee, record);
		} else if (!isUndefined(item) && !isBln(item)) {
			record.push(iteratee(item, record.length) || item);
		}
	}
	return record;
};

var eachItem = function eachItem(list, iteratee) {
	for (var i = 0, len = list.length; i < len; i++) {
		iteratee(list[i], i);
	}
};

var mapValue = function mapValue(obj, iteratee) {
	for (var key in obj) {
		if (hasOwn(obj, key)) {
			iteratee(obj[key], key);
		}
	}
};

var mapKey = function mapKey(oldObj, newObj, iteratee) {
	var keyMap = {};
	for (var key in oldObj) {
		if (hasOwn(oldObj, key)) {
			keyMap[key] = true;
			iteratee(key);
		}
	}
	for (var key in newObj) {
		if (hasOwn(newObj, key) && keyMap[key] !== true) {
			iteratee(key);
		}
	}
};

function extend(to, from) {
	if (!from) {
		return to;
	}
	var keys = Object.keys(from);
	var i = keys.length;
	while (i--) {
		if (from[keys[i]] !== undefined) {
			to[keys[i]] = from[keys[i]];
		}
	}
	return to;
}

var uid = 0;
var getUid = function getUid() {
	return ++uid;
};

var mergeProps = function mergeProps(props, children, defaultProps) {
	var result = extend(extend({}, defaultProps), props);
	var childrenLen = children.length;
	if (childrenLen === 1) {
		result.children = children[0];
	} else if (childrenLen > 1) {
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

	if (key === 'children') {
		return;
	}

	var originalKey = key;
	key = propAlias[key] || key;

	if (EVENT_KEYS.test(key)) {
		addEvent(elem, key, value);
	} else if (isStyleKey(key)) {
		setStyle(elem, value);
	} else if (isInnerHTMLKey(key)) {
		value && value.__html != null && (elem.innerHTML = value.__html);
	} else if (key in elem && attrbutesConfigs[originalKey] !== true) {
		if (readOnlyProps[key] !== true) {
			if (key === 'title' && value == null) {
				value = '';
			}
			elem[key] = value;
		}
	} else {
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
	for (var key in props) {
		if (hasOwn(props, key)) {
			setProp(elem, key, props[key]);
		}
	}
};
var removeProps = function removeProps(elem, props) {
	for (var key in props) {
		if (hasOwn(props, key)) {
			removeProp(elem, key, props[key]);
		}
	}
};
var removeProp = function removeProp(elem, key, oldValue) {
	if (key === 'children') {
		return;
	}

	key = propAlias[key] || key;

	if (EVENT_KEYS.test(key)) {
		removeEvent(elem, key);
	} else if (isStyleKey(key)) {
		removeStyle(elem, oldValue);
	} else if (isInnerHTMLKey(key)) {
		elem.innerHTML = '';
	} else if (attrbutesConfigs[key] === true || !(key in elem)) {
		elem.removeAttribute(key);
	} else if (isFn(oldValue)) {
		elem[key] = null;
	} else if (isStr(oldValue)) {
		elem[key] = '';
	} else if (isBln(oldValue)) {
		elem[key] = false;
	} else {
		try {
			elem[key] = undefined;
			delete elem[key];
		} catch (e) {
			//pass
		}
	}
};

var $props = null;
var $newProps = null;
var $elem = null;
var $patchProps = function $patchProps(key) {
	if (key === 'children') {
		return;
	}
	var value = $newProps[key];
	var oldValue = shouldUseDOMProp[key] == true ? $elem[key] : $props[key];
	if (value === oldValue) {
		return;
	}
	if (isUndefined(value)) {
		removeProp($elem, key, oldValue);
		return;
	}
	if (isStyleKey(key)) {
		patchStyle($elem, oldValue, value);
	} else if (isInnerHTMLKey(key)) {
		var oldHtml = oldValue && oldValue.__html;
		var html = value && value.__html;
		if (html != null && html !== oldHtml) {
			$elem.innerHTML = html;
		}
	} else {
		setProp($elem, key, value);
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

	$elem = elem;
	$props = props;
	$newProps = newProps;
	mapKey(props, newProps, $patchProps);
	$elem = $props = $newProps = null;
};

var removeStyle = function removeStyle(elem, style) {
	if (!style) {
		return;
	}
	var elemStyle = elem.style;
	for (var key in style) {
		if (hasOwn(style, key)) {
			elemStyle[key] = '';
		}
	}
};
var setStyle = function setStyle(elem, style) {
	if (!style) {
		return;
	}
	var elemStyle = elem.style;
	for (var key in style) {
		if (hasOwn(style, key)) {
			setStyleValue(elemStyle, key, style[key]);
		}
	}
};

var $elemStyle = null;
var $style = null;
var $newStyle = null;
var $patchStyle = function $patchStyle(key) {
	var value = $newStyle[key];
	var oldValue = $style[key];
	if (value !== oldValue) {
		setStyleValue($elemStyle, key, value);
	}
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
		$elemStyle = elem.style;
		$style = style;
		$newStyle = newStyle;
		mapKey(style, newStyle, $patchStyle);
		$elemStyle = $style = $newStyle = null;
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

var noop$1 = noop;
var refs = null;

function Vtext(text) {
    this.text = text;
}

var VtextPrototype = Vtext.prototype;
VtextPrototype.isVdom = true;
VtextPrototype.init = function (parentNode) {
    var textNode = document.createTextNode(this.text);
    appendNode(parentNode, textNode);
    return textNode;
};
VtextPrototype.update = function (newVtext, textNode) {
    if (newVtext.text !== this.text) {
        textNode.replaceData(0, textNode.length, newVtext.text);
    }
    return textNode;
};
VtextPrototype.destroy = function (textNode) {
    removeNode(textNode);
};

function Velem(type, props) {
    this.type = type;
    this.props = props;
    this.refs = refs;
}

var VelemPrototype = Velem.prototype;
VelemPrototype.isVdom = true;
VelemPrototype.init = function (parentNode, parentContext) {
    var type = this.type;
    var props = this.props;

    var node = undefined;
    if (type === 'svg' || parentNode.namespaceURI === SVGNamespaceURI) {
        node = document.createElementNS(SVGNamespaceURI, type);
    } else {
        node = document.createElement(type);
    }
    var children = props.children;

    if (isArr(children)) {
        children = props.children = flattenChildren(children, getVnode);
    } else if (children !== undefined && !isBln(children)) {
        children = props.children = [getVnode(children)];
    } else {
        children = props.children = undefined;
    }

    if (children) {
        var len = children.length;
        var i = -1;
        while (len--) {
            children[++i].init(node, parentContext);
        }
    }
    setProps(node, props);
    appendNode(parentNode, node);
    attachRef(this, node);
    return node;
};
VelemPrototype.update = function (newVelem, node, parentNode, parentContext) {
    var props = this.props;

    var newProps = newVelem.props;
    var oldHtml = props.dangerouslySetInnerHTML && props.dangerouslySetInnerHTML.__html;
    var children = props.children;
    var newChildren = newProps.children;

    if (isArr(newChildren)) {
        newChildren = newProps.children = flattenChildren(newChildren, getVnode);
    } else if (newChildren !== undefined && !isBln(newChildren)) {
        newChildren = newProps.children = [getVnode(newChildren)];
    } else {
        newChildren = newProps.children = undefined;
    }

    if (oldHtml == null && children) {
        var childNodes = node.childNodes;
        if (newChildren) {
            var len = newChildren.length;
            var i = -1;
            while (len--) {
                var newVchild = newChildren[++i];
                var vchild = children[i];
                if (vchild) {
                    compareTwoTrees(vchild, newVchild, childNodes[i], node, parentContext);
                } else {
                    newVchild.init(node, parentContext);
                }
            }
        }
        var childrenLen = children.length;
        var newChildrenLen = newChildren && newChildren.length || 0;

        // destroy old children not in the newChildren
        while (childrenLen > newChildrenLen) {
            childrenLen -= 1;
            children[childrenLen].destroy(childNodes[childrenLen]);
        }
        patchProps(node, props, newProps);
    } else {
        // should patch props first, make sure innerHTML was cleared
        patchProps(node, props, newProps);
        if (newChildren) {
            var len = newChildren.length;
            var i = -1;
            while (len--) {
                newChildren[++i].init(node, parentContext);
            }
        }
    }
    updateRef(this, newVelem, node);
    return node;
};
VelemPrototype.destroy = function (node) {
    var children = this.props.children;

    if (children) {
        var childNodes = node.childNodes;
        var $removeNode = removeNode;
        removeNode = noop$1;
        var len = children.length;
        var i = -1;
        while (len--) {
            children[++i].destroy(childNodes[i]);
        }
        removeNode = $removeNode;
    }
    detachRef(this);
    removeNode(node);
};

function VstatelessComponent(type, props) {
    this.id = getUid();
    this.type = type;
    this.props = props;
}

var VstatelessComponentPrototype = VstatelessComponent.prototype;
VstatelessComponentPrototype.isVdom = true;
VstatelessComponentPrototype.init = function (parentNode, parentContext) {
    var vtree = renderVstatelessComponent(this, parentContext);
    var node = vtree.init(parentNode, parentContext);
    node.cache = node.cache || {};
    node.cache[this.id] = vtree;
    return node;
};
VstatelessComponentPrototype.update = function (newVstatelessComponent, node, parentNode, parentContext) {
    var id = this.id;
    var vtree = node.cache[id];
    delete node.cache[id];
    var newVtree = renderVstatelessComponent(newVstatelessComponent, parentContext);
    var newNode = compareTwoTrees(vtree, newVtree, node, parentNode, parentContext);
    newNode.cache = newNode.cache || {};
    newNode.cache[newVstatelessComponent.id] = newVtree;
    if (newNode !== node) {
        extend(newNode.cache, node.cache);
    }
    return newNode;
};
VstatelessComponentPrototype.destroy = function (node) {
    var id = this.id;
    var vtree = node.cache[id];
    delete node.cache[id];
    vtree.destroy(node);
};

var renderVstatelessComponent = function renderVstatelessComponent(vstatelessComponent, parentContext) {
    var factory = vstatelessComponent.type;
    var props = vstatelessComponent.props;

    var componentContext = getContextByTypes(parentContext, factory.contextTypes);
    var vtree = factory(props, componentContext);
    if (vtree && vtree.render) {
        vtree = vtree.render();
    }
    return getVnode(vtree);
};

function Vcomponent(type, props) {
    this.id = getUid();
    this.type = type;
    this.props = props;
    this.refs = refs;
}

var VcomponentPrototype = Vcomponent.prototype;
VcomponentPrototype.isVdom = true;
VcomponentPrototype.init = function (parentNode, parentContext) {
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
    if (component.componentWillMount) {
        component.componentWillMount();
        component.state = updater.getState();
    }
    var vtree = renderComponent(component, parentContext);
    var node = vtree.init(parentNode, vtree.context);
    node.cache = node.cache || {};
    node.cache[id] = component;
    cache.vtree = vtree;
    cache.node = node;
    cache.isMounted = true;
    pendingComponents.push(component);
    attachRef(this, component);
    return node;
};
VcomponentPrototype.update = function (newVcomponent, node, parentNode, parentContext) {
    var id = this.id;
    var component = node.cache[id];
    var updater = component.$updater;
    var cache = component.$cache;
    var Component = newVcomponent.type;
    var nextProps = newVcomponent.props;

    var componentContext = getContextByTypes(parentContext, Component.contextTypes);
    delete node.cache[id];
    node.cache[newVcomponent.id] = component;
    cache.parentContext = parentContext;
    if (component.componentWillReceiveProps) {
        updater.isPending = true;
        component.componentWillReceiveProps(nextProps, componentContext);
        updater.isPending = false;
    }
    updater.emitUpdate(nextProps, componentContext);
    updateRef(this, newVcomponent, component);
    return cache.node;
};
VcomponentPrototype.destroy = function (node) {
    var id = this.id;
    var component = node.cache[id];
    var cache = component.$cache;
    delete node.cache[id];
    detachRef(this);
    component.setState = component.forceUpdate = noop$1;
    if (component.componentWillUnmount) {
        component.componentWillUnmount();
    }
    cache.vtree.destroy(node);
    delete component.setState;
    cache.isMounted = false;
    cache.node = cache.parentContext = cache.vtree = component.refs = component.context = null;
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

var renderComponent = function renderComponent(component, parentContext) {
    refs = component.refs;
    var vtree = component.render();
    if (isUndefined(vtree)) {
        throw new Error('component can not render undefined');
    }
    vtree = getVnode(vtree);
    var curContext = refs = null;
    if (component.getChildContext) {
        curContext = component.getChildContext();
    }
    if (curContext) {
        curContext = extend(extend({}, parentContext), curContext);
    } else {
        curContext = parentContext;
    }
    vtree.context = curContext;
    return vtree;
};

var pendingComponents = [];
var clearPendingComponents = function clearPendingComponents() {
    var components = pendingComponents;
    var len = components.length;
    if (!len) {
        return;
    }
    pendingComponents = [];
    var i = -1;
    while (len--) {
        var component = components[++i];
        var updater = component.$updater;
        if (component.componentDidMount) {
            component.componentDidMount();
        }
        updater.isPending = false;
        updater.emitUpdate();
    }
};

function compareTwoTrees(vtree, newVtree, node, parentNode, parentContext) {
    var newNode = node;

    if (vtree === newVtree) {
        // equal
        return newNode;
    } else if (newVtree === undefined) {
        // remove
        vtree.destroy(node);
    } else if (vtree === undefined) {
        // create
        newNode = newVtree.init(parentNode, parentContext);
    } else if (vtree.type !== newVtree.type || newVtree.key !== vtree.key) {
        // set removeNode to no-op, do not remove exist node, then replace it with new node
        var $removeNode = removeNode;
        removeNode = noop$1;
        vtree.destroy(node);
        removeNode = $removeNode;
        $parentNode = parentNode;
        $existNode = node;
        newNode = newVtree.init(replaceNode, parentContext);
    } else {
        // same type and same key -> update
        newNode = vtree.update(newVtree, node, parentNode, parentContext);
    }

    return newNode;
}

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

var $parentNode = null;
var $existNode = null;
var replaceNode = function replaceNode(newNode) {
    $parentNode.replaceChild(newNode, $existNode);
    $parentNode = $existNode = null;
};

var getVnode = function getVnode(vnode) {
    if (vnode === null) {
        vnode = new Velem('noscript', {});
    } else if (!vnode || !vnode.isVdom) {
        vnode = new Vtext('' + vnode);
    }
    return vnode;
};

var getDOMNode = function getDOMNode() {
    return this;
};

var attachRef = function attachRef(vtree, refValue) {
    var refKey = vtree.ref;
    var refs = vtree.refs;

    if (!refs || refKey == null || !refValue) {
        return;
    }
    if (refValue.nodeName && !refValue.getDOMNode) {
        // support react v0.13 style: this.refs.myInput.getDOMNode()
        refValue.getDOMNode = getDOMNode;
    }
    if (isFn(refKey)) {
        refKey(refValue);
    } else {
        refs[refKey] = refValue;
    }
};

var detachRef = function detachRef(vtree) {
    var refKey = vtree.ref;
    var refs = vtree.refs;

    if (!refs || refKey == null) {
        return;
    }
    if (isFn(refKey)) {
        refKey(null);
    } else {
        delete refs[refKey];
    }
};

var updateRef = function updateRef(vtree, newVtree, refValue) {
    if (vtree.ref !== newVtree.ref) {
        detachRef(vtree);
        attachRef(newVtree, refValue);
    }
};

var updateQueue = {
	updaters: [],
	isPending: false,
	add: function add(updater) {
		this.updaters.push(updater);
	},
	batchUpdate: function batchUpdate() {
		if (this.isPending) {
			return;
		}
		this.isPending = true;
		/*
   each updater.update may add new updater to updateQueue
   clear them with a loop
   event bubbles from bottom-level to top-level
   reverse the updater order can merge some props and state and reduce the refresh times
   see Updater.update method below to know why
  */
		var updaters = this.updaters;

		var updater = undefined;
		while (updater = updaters.pop()) {
			updater.updateComponent();
		}
		this.isPending = false;
	}
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
		nextProps || !updateQueue.isPending ? this.updateComponent() : updateQueue.add(this);
	},
	updateComponent: function updateComponent() {
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
			this.pendingCallbacks = [];
			eachItem(pendingCallbacks, function (callback) {
				return callback.call(instance);
			});
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

Component.prototype = {
	constructor: Component,
	// getChildContext: _.noop,
	// componentWillUpdate: _.noop,
	// componentDidUpdate: _.noop,
	// componentWillReceiveProps: _.noop,
	// componentWillMount: _.noop,
	// componentDidMount: _.noop,
	// componentWillUnmount: _.noop,
	// shouldComponentUpdate(nextProps, nextState) {
	// 	return true
	// },
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
		if (this.componentWillUpdate) {
			this.componentWillUpdate(nextProps, nextState, nextContext);
		}
		this.state = nextState;
		this.props = nextProps;
		this.context = nextContext;
		var nextVtree = renderComponent(this, parentContext);
		var newNode = compareTwoTrees(vtree, nextVtree, node, node.parentNode, nextVtree.context);
		if (newNode !== node) {
			newNode.cache = newNode.cache || {};
			extend(newNode.cache, node.cache);
		}
		$cache.vtree = nextVtree;
		$cache.node = newNode;
		clearPendingComponents();
		if (this.componentDidUpdate) {
			this.componentDidUpdate(props, state, context);
		}
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

var shouldUpdate = function shouldUpdate(component, nextProps, nextState, nextContext, callback) {
	var shouldComponentUpdate = true;
	if (component.shouldComponentUpdate) {
		shouldComponentUpdate = component.shouldComponentUpdate(nextProps, nextState, nextContext);
	}
	if (shouldComponentUpdate === false) {
		component.props = nextProps;
		component.state = nextState;
		component.context = nextContext || {};
		return;
	}
	var cache = component.$cache;
	cache.props = nextProps;
	cache.state = nextState;
	cache.context = nextContext || {};
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
			syntheticEvent = createSyntheticEvent(event);
		}
		syntheticEvent.currentTarget = target;
		listener.call(target, syntheticEvent);
		if (syntheticEvent.$cancalBubble) {
			break;
		}
		target = target.parentNode;
	}
	updateQueue.isPending = false;
	updateQueue.batchUpdate();
};

var createSyntheticEvent = function createSyntheticEvent(nativeEvent) {
	var syntheticEvent = {};
	var cancalBubble = function cancalBubble() {
		return syntheticEvent.$cancalBubble = true;
	};
	syntheticEvent.nativeEvent = nativeEvent;
	for (var key in nativeEvent) {
		if (typeof nativeEvent[key] !== 'function') {
			syntheticEvent[key] = nativeEvent[key];
		} else if (key === 'stopPropagation' || key === 'stopImmediatePropagation') {
			syntheticEvent[key] = cancalBubble;
		} else {
			syntheticEvent[key] = nativeEvent[key].bind(nativeEvent);
		}
	}
	return syntheticEvent;
};

var pendingRendering = {};
var vtreeStore = {};
var renderTreeIntoContainer = function renderTreeIntoContainer(vtree, container, callback, parentContext) {
	if (!vtree.isVdom) {
		throw new Error('cannot render ' + vtree + ' to container');
	}
	var id = container[COMPONENT_ID] || (container[COMPONENT_ID] = getUid());
	var argsCache = pendingRendering[id];

	// component lify cycle method maybe call root rendering
	// should bundle them and render by only one time
	if (argsCache) {
		if (argsCache === TRUE) {
			pendingRendering[id] = argsCache = [vtree, callback, parentContext];
		} else {
			argsCache[0] = vtree;
			argsCache[2] = parentContext;
			if (callback) {
				argsCache[1] = argsCache[1] ? pipe(argsCache[1], callback) : callback;
			}
		}
		return;
	}

	pendingRendering[id] = TRUE;
	if (vtreeStore[id]) {
		compareTwoTrees(vtreeStore[id], vtree, container.firstChild, container, parentContext);
	} else {
		container.innerHTML = '';
		vtree.init(container, parentContext);
	}
	vtreeStore[id] = vtree;
	var isPending = updateQueue.isPending;
	updateQueue.isPending = true;
	clearPendingComponents(true);
	argsCache = pendingRendering[id];
	delete pendingRendering[id];

	var result = null;
	if (isArr(argsCache)) {
		result = renderTreeIntoContainer(argsCache[0], container, argsCache[1], argsCache[2]);
	} else if (isStr(vtree.type)) {
		result = container.firstChild;
	} else if (isComponent(vtree.type)) {
		result = container.firstChild.cache[vtree.id];
	}

	if (!isPending) {
		updateQueue.isPending = false;
		updateQueue.batchUpdate();
	}

	if (callback) {
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
	if (vtreeStore[id]) {
		vtreeStore[id].destroy(container.firstChild);
		delete vtreeStore[id];
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

var isValidElement = function isValidElement(obj) {
	return obj != null && !!obj.isVdom;
};

var cloneElement = function cloneElement(originElem, props) {
	for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
		children[_key - 2] = arguments[_key];
	}

	var type = originElem.type;
	var key = originElem.key;
	var ref = originElem.ref;

	var newProps = extend(extend({ key: key, ref: ref }, originElem.props), props);
	var vnode = createElement.apply(undefined, [type, newProps].concat(children));
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

	var Vnode = null;

	if (isStr(type)) {
		Vnode = Velem;
	} else if (isComponent(type)) {
		Vnode = Vcomponent;
	} else if (isStatelessComponent(type)) {
		Vnode = VstatelessComponent;
	} else {
		throw new Error('React.createElement: unexpect type [ ' + type + ' ]');
	}

	var key = null;
	var ref = null;
	if (props != null) {
		if (props.key !== undefined) {
			key = '' + props.key;
			delete props.key;
		}
		if (props.ref !== undefined) {
			ref = props.ref;
			delete props.ref;
		}
	}

	var vnode = new Vnode(type, mergeProps(props, children, type.defaultProps));
	vnode.key = key;
	vnode.ref = ref;
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
			keyMap[key] += 1;
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

React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactDOM;

module.exports = React;