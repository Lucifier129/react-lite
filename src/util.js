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

export let isObj = obj => obj !== null && Object.prototype.toString.call(obj) === '[object Object]'
export let isStr = obj => typeof obj === 'string'
export let isFn = obj => typeof obj === 'function'
export let isBln = obj => typeof obj === 'boolean'
export let isArr = Array.isArray
export let isUndefined = obj => obj === undefined
export let isComponent = obj => obj && obj.prototype && ('forceUpdate' in obj.prototype)

export let hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key)
export let noop = () => {}
export let identity = obj => obj

export let pipe = (fn1, fn2) => {
	return function() {
		fn1.apply(this, arguments)
		return fn2.apply(this, arguments)
	}
}


export let flattenChildren = (list, iteratee, a, b) => {
	return flat(list, iteratee, 0, a, b)
}

let flat = (list, iteratee, index, a, b) => {
    let len = list.length
    let i = -1

    while (len--) {
        let item = list[++i]
        if (isArr(item)) {
            index = flat(item, iteratee, index, a, b)
        } else {
        	iteratee(item, index++, a, b)
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

export let EVENT_KEYS = /^on/i
let isInnerHTMLKey = key => key === 'dangerouslySetInnerHTML'
let isStyleKey = key => key === 'style'

export let setProp = (elem, key, value) => {

	if (key === 'children') {
		return
	}

	let originalKey = key
	key = propAlias[key] || key

	if (EVENT_KEYS.test(key)) {
		addEvent(elem, key, value)
	} else if (isStyleKey(key)) {
		setStyle(elem, value)
	} else if (isInnerHTMLKey(key)) {
		value && value.__html != null && (elem.innerHTML = value.__html)
	} else if ((key in elem) && attrbutesConfigs[originalKey] !== true) {
		if (readOnlyProps[key] !== true) {
			if (key === 'title' && value == null) {
				value = ''
			}
			elem[key] = value
		}
	} else {
		if (value == null) {
		    elem.removeAttribute(key)
		} else if (hasOwn(attributesNS, originalKey)) {
			elem.setAttributeNS(attributesNS[originalKey], key, value)
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

export let removeProp = (elem, key, oldValue) => {
	if (key === 'children') {
		return
	}

	key = propAlias[key] || key

	if (EVENT_KEYS.test(key)) {
		removeEvent(elem, key)
	} else if (isStyleKey(key)) {
		removeStyle(elem, oldValue)
	} else if (isInnerHTMLKey(key)) {
		elem.innerHTML = ''
	} else if (!(key in elem) || attrbutesConfigs[key] === true) {
		elem.removeAttribute(key)
	} else if (isFn(oldValue)) {
		elem[key] = null
	} else if (isStr(oldValue)) {
		elem[key] = ''
	} else if (isBln(oldValue)) {
		elem[key] = false
	} else {
		try {
		    delete elem[key]
		} catch (e) {
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
	$elem = elem
	$props = props
	$newProps = newProps
	mapKey(props, newProps, $patchProps)
	$elem = $props = $newProps = null
}

export let removeStyle = (elem, style) => {
	if (!style) {
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
	if (!style) {
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
let setStyleValue = (style, key, value) => {
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