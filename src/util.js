// util
import { addEvent, removeEvent } from './event-system'
import {
	propAlias,
	attributesNS,
	attrbutesConfigs,
	readOnlyProps,
	isUnitlessNumber,
	ignoreKeys,
	shouldUseDOMProp
} from './constant'
export let isType = type => obj => obj != null && Object.prototype.toString.call(obj) === `[object ${ type }]`
export let isObj = isType('Object')
export let isStr = isType('String')
export let isFn = isType('Function')
export let isBln = isType('Boolean')
export let isArr = Array.isArray || isType('Array')
export let isUndefined = obj => obj === undefined
export let isComponent = obj => obj && obj.prototype && ('forceUpdate' in obj.prototype)
export let isStatelessComponent = obj => isFn(obj) && (!obj.prototype || !('forceUpdate' in obj.prototype))

export let noop = () => {}
export let identity = obj => obj

export let pipe = (fn1, fn2) => {
	return function() {
		fn1.apply(this, arguments)
		return fn2.apply(this, arguments)
	}
}

export let flattenChildren = (list, iteratee, record) => {
	record = record || { index: 0 }
	for (let i = 0, len = list.length; i < len; i++) {
		let item = list[i]
		if (isArr(item)) {
			flattenChildren(item, iteratee, record)
		} else if (!isUndefined(item) && !isBln(item)) {
			iteratee(item, record.index)
			record.index += 1
		}
	}
}

export let eachItem = (list, iteratee) => {
	for (let i = 0, len = list.length; i < len; i++) {
		iteratee(list[i], i)
	}
}

export let mapValue = (obj, iteratee) => {
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			iteratee(obj[key], key)
		}
	}
}

export let mapKey = (oldObj, newObj, iteratee) => {
	var keyMap = {}
	var key
	for (key in oldObj) {
		if (oldObj.hasOwnProperty(key)) {
			keyMap[key] = true
			iteratee(key)
		}
	}
	for (key in newObj) {
		if (newObj.hasOwnProperty(key) && keyMap[key] !== true) {
			iteratee(key)
		}
	}
}

export let extend = function(target) {
	for (let i = 1, len = arguments.length; i < len; i++) {
		let source = arguments[i]
		if (source != null) {
			for (let key in source) {
				if (source.hasOwnProperty(key) && !isUndefined(source[key])) {
					target[key] = source[key]
				}
			}
		}
	}
	return target
}

let uid = 0
export let getUid = () => ++uid

let getChildren = children => {
	let childrenLen = children.length
	if (childrenLen > 0) {
		if (childrenLen === 1) {
			children = children[0]
		}
		return children
	}
}
export let mergeProps = (props, children, defaultProps) => {
	let result = extend({}, defaultProps, props)
	children = getChildren(children)
	if (!isUndefined(children)) {
		result.children = children
	}
	return result
}

let EVENT_KEYS = /^on/i
let isInnerHTMLKey = key => key === 'dangerouslySetInnerHTML'
let isStyleKey = key => key === 'style'

export let setProp = (elem, key, value) => {
	let originalKey = key
	key = propAlias[key] || key
	switch (true) {
		case ignoreKeys[key] === true:
			break
		case EVENT_KEYS.test(key):
			addEvent(elem, key, value)
			break
		case isStyleKey(key):
			setStyle(elem, value)
			break
		case isInnerHTMLKey(key):
			value && value.__html != null && (elem.innerHTML = value.__html)
			break
		case (key in elem) && attrbutesConfigs[originalKey] !== true:
			if (readOnlyProps[key] !== true) {
				if (key === 'title' && value == null) {
					value = ''
				}
				elem[key] = value
			}
			break
		default:
			if (value == null) {
				elem.removeAttribute(key)
			} else if (attributesNS[originalKey] === true) {
				elem.setAttributeNS(key, value)
			} else {
				elem.setAttribute(key, value)
			}
	}
}
export let setProps = (elem, props) => {
	mapValue(props, (value, key) => {
		setProp(elem, key, value)
	})
}
export let removeProps = (elem, oldProps) => {
	mapValue(oldProps, (oldValue, key) => {
		removeProp(elem, key, oldValue)
	})
}
export let removeProp = (elem, key, oldValue) => {
	key = propAlias[key] || key
	switch (true) {
		case ignoreKeys[key] === true:
			break
		case EVENT_KEYS.test(key):
			removeEvent(elem, key)
			break
		case isStyleKey(key):
			removeStyle(elem, oldValue)
			break
		case isInnerHTMLKey(key):
			elem.innerHTML = ''
			break
		case attrbutesConfigs[key] === true || !(key in elem):
			elem.removeAttribute(key)
			break
		case isFn(oldValue):
			elem[key] = null
			break
		case isStr(oldValue):
			elem[key] = ''
			break
		case isBln(oldValue):
			elem[key] = false
			break
		default:
			try {
				elem[key] = undefined
				delete elem[key]
			} catch(e) {
				//pass
			}
	}
}

export let patchProps = (elem, props, newProps) => {
	if (props === newProps) {
		return
	}
	if (!props && newProps) {
		setProps(elem, newProps)
		return
	} else if (!newProps && props) {
		removeProps(elem, props)
		return
	}

	mapKey(props, newProps, key => {
		if (ignoreKeys[key] === true) {
			return
		}
		let value = newProps[key]
		let oldValue = shouldUseDOMProp[key] == true ? elem[key] : props[key]
		if (value === oldValue) {
			return
		}
		if (isUndefined(value)) {
			removeProp(elem, key, oldValue)
			return
		}
		if (isStyleKey(key)) {
			patchStyle(elem, oldValue, value)
		} else if (isInnerHTMLKey(key)) {
			let oldHtml = oldValue && oldValue.__html
			let html = value && value.__html
			if (html != null && html !== oldHtml) {
				elem.innerHTML = html
			}
		} else {
			setProp(elem, key, value)
		}
	})
}

export let removeStyle = (elem, style) => {
	if (!isObj(style)) {
		return
	}
	let elemStyle = elem.style
	mapValue(style, (_, key) => {
		elemStyle[key] = ''
	})
}
export let setStyle = (elem, style) => {
	if (!isObj(style)) {
		return
	}
	let elemStyle = elem.style
	mapValue(style, (value, key) => {
		setStyleValue(elemStyle, key, value)
	})
}
export let patchStyle = (elem, style, newStyle) => {
	if (style === newStyle) {
		return
	}
	if (!newStyle && style) {
		removeStyle(elem, style)
	} else if (newStyle && !style) {
		setStyle(elem, newStyle)
	} else {
		var elemStyle = elem.style
		mapKey(style, newStyle, key => {
			let value = newStyle[key]
			let oldValue = style[key]
			if (value !== oldValue) {
				setStyleValue(elemStyle, key, value)
			}
		})
	}
}

let isUnitlessNumberWithPrefix = {}
let prefixes = ['Webkit', 'ms', 'Moz', 'O'];
let prefixKey = (prefix, key) => prefix + key.charAt(0).toUpperCase() + key.substring(1)
mapValue(isUnitlessNumber, (_, prop) => {
	eachItem(prefixes, prefix => 
		isUnitlessNumberWithPrefix[prefixKey(prefix, prop)] = true
	)
})
mapValue(isUnitlessNumberWithPrefix, (value, key) => {
	isUnitlessNumber[key] = value
})

let RE_NUMBER = /^-?\d+(\.\d+)?$/
export let setStyleValue = (style, key, value) => {
	if (!isUnitlessNumber[key] && RE_NUMBER.test(value)) {
		style[key] = value + 'px'
	} else {
		key = key === 'float' ? 'cssFloat' : key
		value = value == null || isBln(value) ? '' : value
		style[key] = value
	}
}

if (!Object.freeze) {
	Object.freeze = identity
}