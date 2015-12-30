// util
'use strict';

exports.__esModule = true;
var isType = function isType(type) {
	return function (obj) {
		return obj != null && Object.prototype.toString.call(obj) === '[object ' + type + ']';
	};
};
exports.isType = isType;
var isObj = isType('Object');
exports.isObj = isObj;
var isStr = isType('String');
exports.isStr = isStr;
var isNum = isType('Number');
exports.isNum = isNum;
var isFn = isType('Function');
exports.isFn = isFn;
var isBln = isType('Boolean');
exports.isBln = isBln;
var isArr = Array.isArray || isType('Array');
exports.isArr = isArr;
var isUndefined = function isUndefined(obj) {
	return obj === undefined;
};
exports.isUndefined = isUndefined;
var isComponent = function isComponent(obj) {
	return obj && obj.prototype && 'forceUpdate' in obj.prototype;
};
exports.isComponent = isComponent;
var isStatelessComponent = function isStatelessComponent(obj) {
	return obj && (!obj.prototype || !('forceUpdate' in obj.prototype));
};

exports.isStatelessComponent = isStatelessComponent;
var toArray = Array.from || function (obj) {
	return Array.prototype.slice.call(obj);
};

exports.toArray = toArray;
var pipe = function pipe(fn1, fn2) {
	return function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		fn1.apply(this, args);
		return fn2.apply(this, args);
	};
};

exports.pipe = pipe;
var forEach = function forEach(list, iteratee) {
	var record = arguments[2] === undefined ? { index: 0 } : arguments[2];

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

exports.forEach = forEach;
var eachItem = function eachItem(list, iteratee) {
	for (var i = 0, len = list.length; i < len; i += 1) {
		iteratee(list[i], i);
	}
};

exports.eachItem = eachItem;
var mapValue = function mapValue(obj, iteratee) {
	for (var key in obj) {
		if (!obj.hasOwnProperty(key)) {
			continue;
		}
		iteratee(obj[key], key);
	}
};

exports.mapValue = mapValue;
var mapKey = function mapKey(sources, iteratee) {
	var keyMap = {};
	var item = undefined;
	var key = undefined;
	for (var i = 0, len = sources.length; i < len; i += 1) {
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

exports.mapKey = mapKey;
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

exports.extend = extend;
var uid = 0;
var getUid = function getUid() {
	return ++uid;
};

exports.getUid = getUid;
var hasKey = function hasKey(obj) {
	var key = arguments[1] === undefined ? 'key' : arguments[1];
	return obj && obj.props && obj.props.hasOwnProperty(key);
};

exports.hasKey = hasKey;
var getChildren = function getChildren(_x3) {
	var _again = true;

	_function: while (_again) {
		var children = _x3;
		_again = false;

		if (children && children.length > 0) {
			if (children.length === 1) {
				children = children[0];
				if (isArr(children)) {
					_x3 = children;
					_again = true;
					continue _function;
				}
			}
		} else {
			children = undefined;
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

exports.mergeProps = mergeProps;
var setAttr = function setAttr(elem, key, value) {
	elem.setAttribute(key, value);
};
exports.setAttr = setAttr;
var getAttr = function getAttr(elem, key) {
	return elem.getAttribute(key);
};
exports.getAttr = getAttr;
var removeAttr = function removeAttr(elem, key) {
	elem.removeAttribute(key);
};

exports.removeAttr = removeAttr;
var eventNameAlias = {
	onDoubleClick: 'ondblclick'
};
var getEventName = function getEventName(key) {
	key = eventNameAlias[key] || key;
	return key.toLowerCase();
};
var setEvent = function setEvent(elem, key, value) {
	if (!isFn(value)) {
		return;
	}
	key = getEventName(key);
	elem[key] = value;
	if (key === 'onchange') {
		elem.oninput = value;
	}
};
exports.setEvent = setEvent;
var removeEvent = function removeEvent(elem, key) {
	key = getEventName(key);
	elem[key] = null;
	if (key === 'onchange') {
		elem.oninput = null;
	}
};

exports.removeEvent = removeEvent;
var ignoreKeys = {
	key: true,
	ref: true,
	children: true
};
var EVENT_KEYS = /^on/i;
var isIgnoreKey = function isIgnoreKey(key) {
	return ignoreKeys[key];
};
exports.isIgnoreKey = isIgnoreKey;
var isEventKey = function isEventKey(key) {
	return EVENT_KEYS.test(key);
};
exports.isEventKey = isEventKey;
var isInnerHTMLKey = function isInnerHTMLKey(key) {
	return key === 'dangerouslySetInnerHTML';
};
exports.isInnerHTMLKey = isInnerHTMLKey;
var isStyleKey = function isStyleKey(key) {
	return key === 'style';
};
exports.isStyleKey = isStyleKey;
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
exports.setProp = setProp;
var setProps = function setProps(elem, props) {
	mapValue(props, function (value, key) {
		setProp(elem, key, value);
	});
};
exports.setProps = setProps;
var removeProps = function removeProps(elem, oldProps) {
	mapValue(oldProps, function (oldValue, key) {
		removeProp(elem, key, oldValue);
	});
};
exports.removeProps = removeProps;
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
			} catch (e) {}
	}
};
exports.removeProp = removeProp;
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
		var oldValue = key === 'value' ? elem.value : props[key];
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
			if (!isStr(html)) {
				elem.innerHTML = '';
			} else if (html !== oldHtml) {
				elem.innerHTML = html;
			}
		} else {
			setProp(elem, key, value);
		}
	});
};

exports.patchProps = patchProps;
var removeStyle = function removeStyle(elem, style) {
	if (!isObj(style)) {
		return;
	}
	var elemStyle = elem.style;
	mapValue(style, function (_, key) {
		elemStyle[key] = '';
	});
};
exports.removeStyle = removeStyle;
var setStyle = function setStyle(elem, style) {
	if (!isObj(style)) {
		return;
	}
	var elemStyle = elem.style;
	mapValue(style, function (value, key) {
		setStyleValue(elemStyle, key, value);
	});
};
exports.setStyle = setStyle;
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

exports.patchStyle = patchStyle;
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
	if (isBln(value) || value == null) {
		value = '';
	}
	if (!isUnitlessNumber[key] && RE_NUMBER.test(value)) {
		style[key] = value + 'px';
	} else {
		style[key] = value;
	}
};
exports.setStyleValue = setStyleValue;

//pass