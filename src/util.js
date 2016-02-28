// util
import { addEvent, removeEvent } from './event-system'
import {
	propAlias,
	attributesNS,
	attrbutesConfigs,
	readOnlyProps,
	isUnitlessNumber,
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

export let hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key)
export let noop = () => {}
export let identity = obj => obj

export let pipe = (fn1, fn2) => {
	return function() {
		fn1.apply(this, arguments)
		return fn2.apply(this, arguments)
	}
}

export let flattenChildren = (list, iteratee, record) => {
    let len = list.length
    let i = -1
    record = record || []

    while (len--) {
        let item = list[++i]
        if (isArr(item)) {
            flattenChildren(item, iteratee, record)
        } else if (!isUndefined(item) && !isBln(item)) {
            record.push(iteratee(item, record.length) || item)
        }
    }
    return record
}

export let eachItem = (list, iteratee) => {
	for (let i = 0, len = list.length; i < len; i++) {
		iteratee(list[i], i)
	}
}

export let mapValue = (obj, iteratee) => {
	for (let key in obj) {
		if (hasOwn(obj, key)) {
			iteratee(obj[key], key)
		}
	}
}

export let mapKey = (oldObj, newObj, iteratee) => {
	let keyMap = {}
	for (let key in oldObj) {
		if (hasOwn(oldObj, key)) {
			keyMap[key] = true
			iteratee(key)
		}
	}
	for (let key in newObj) {
		if (hasOwn(newObj, key) && keyMap[key] !== true) {
			iteratee(key)
		}
	}
}

export function extend(to, from) {
    if (!from) {
        return to
    }
    var keys = Object.keys(from)
    var i = keys.length
    while (i--) {
        if (from[keys[i]] !== undefined) {
            to[keys[i]] = from[keys[i]]
        }
    }
    return to
}


let uid = 0
export let getUid = () => ++uid

export let mergeProps = (props, children, defaultProps) => {
	let result = extend(extend({}, defaultProps), props)
	let childrenLen = children.length
	if (childrenLen === 1) {
		result.children = children[0]
	} else if (childrenLen > 1) {
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
		case key === 'children':
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
	for (let key in props) {
		if (hasOwn(props, key)) {
			setProp(elem, key, props[key])
		}
	}
}
export let removeProps = (elem, props) => {
	for (let key in props) {
		if (hasOwn(props, key)) {
			removeProp(elem, key, props[key])
		}
	}
}
export let removeProp = (elem, key, oldValue) => {
	key = propAlias[key] || key
	switch (true) {
		case key === 'children':
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

let $props = null
let $newProps = null
let $elem = null
let $patchProps = key => {
    if (key === 'children') {
        return
    }
    let value = $newProps[key]
    let oldValue = shouldUseDOMProp[key] == true
    ? $elem[key]
    : $props[key]
    if (value === oldValue) {
        return
    }
    if (isUndefined(value)) {
        removeProp($elem, key, oldValue)
        return
    }
    if (isStyleKey(key)) {
        patchStyle($elem, oldValue, value)
    } else if (isInnerHTMLKey(key)) {
        let oldHtml = oldValue && oldValue.__html
        let html = value && value.__html
        if (html != null && html !== oldHtml) {
            $elem.innerHTML = html
        }
    } else {
        setProp($elem, key, value)
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

	$elem = elem
	$props = props
	$newProps = newProps
	mapKey(props, newProps, $patchProps)
	$elem = $props = $newProps = null
}

export let removeStyle = (elem, style) => {
	if (!isObj(style)) {
		return
	}
	let elemStyle = elem.style
	for (let key in style) {
		if (hasOwn(style, key)) {
			elemStyle[key] = ''
		}
	}
}
export let setStyle = (elem, style) => {
	if (!isObj(style)) {
		return
	}
	let elemStyle = elem.style
	for (let key in style) {
		if (hasOwn(style, key)) {
			setStyleValue(elemStyle, key, style[key])
		}
	}
}

let $elemStyle = null
let $style = null
let $newStyle = null
let $patchStyle = key => {
    let value = $newStyle[key]
    let oldValue = $style[key]
    if (value !== oldValue) {
        setStyleValue($elemStyle, key, value)
    }
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
		$elemStyle = elem.style
		$style = style
		$newStyle = newStyle
		mapKey(style, newStyle, $patchStyle)
		$elemStyle = $style = $newStyle = null
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
		value = (value == null || isBln(value)) ? '' : value
		style[key] = value
	}
}

if (!Object.freeze) {
	Object.freeze = identity
}