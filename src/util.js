// util
export let isType = type => obj => obj != null && Object.prototype.toString.call(obj) === `[object ${ type }]`
export let isObj = isType('Object')
export let isStr = isType('String')
export let isNum = isType('Number')
export let isFn = isType('Function')
export let isBln = isType('Boolean')
export let isArr = Array.isArray || isType('Array')
export let isUndefined = obj => obj === undefined
export let isComponent = obj => obj && obj.prototype && ('forceUpdate' in obj.prototype)
export let isStatelessComponent = obj => obj && (!obj.prototype || !('forceUpdate' in obj.prototype))

export let noop = () => {}
export let identity = obj => obj

export let pipe = (fn1, fn2) => {
	return function(...args) {
		fn1.apply(this, args)
		return fn2.apply(this, args)
	}
}

export let forEach = (list, iteratee, record = { index: 0 }) => {
	for (let i = 0, len = list.length; i < len; i++) {
		let item = list[i]
		if (isArr(item)) {
			forEach(item, iteratee, record)
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

export let findIndex = (list, item, startIndex) => {
	let i = startIndex > 0 ? startIndex : 0
	for (let len = list.length; i < len; i++) {
		if (list[i] === item) {
			return i
		}
	}
	return -1
}

export let mapValue = (obj, iteratee) => {
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			iteratee(obj[key], key)
		}
	}
}

export let mapKey = (sources, iteratee) => {
	let keyMap = {}
	let item
	let key
	for (let i = 0, len = sources.length; i < len; i++) {
		item = sources[i]
		for (key in item) {
			if (!item.hasOwnProperty(key) || keyMap[key]) {
				continue
			}
			keyMap[key] = true
			iteratee(key)
		}
	}
}

export let extend = (target, ...args) => {
	let setProp = (value, key) => {
		if (!isUndefined(value)) {
			target[key] = value
		}
	}
	eachItem(args, source => {
		if (source != null) {
			mapValue(source, setProp)
		}
	})
	return target
}

let uid = 0
export let getUid = () => ++uid

let getChildren = children => {
	if (children && children.length > 0) {
		if (children.length === 1) {
			children = children[0]
			if (isArr(children)) {
				return getChildren(children)
			}
		}
	} else {
		children = undefined
	}
	return children
}
export let mergeProps = (props, children, defaultProps) => {
	let result = extend({}, defaultProps, props)
	children = getChildren(children)
	if (!isUndefined(children)) {
		result.children = children
	}
	return result
}

export let setAttr = (elem, key, value) => {
	elem.setAttribute(key, value)
}
export let getAttr = (elem, key) => {
	return elem.getAttribute(key)
}
export let removeAttr = (elem, key) => {
	elem.removeAttribute(key)
}

let eventNameAlias = {
	onDoubleClick: 'ondblclick'
}
let getEventName = key => {
	key = eventNameAlias[key] || key
	return key.toLowerCase()
}
let getEventHandler = handleEvent => function(e) {
	e.stopPropagation()
	e.nativeEvent = e
	return handleEvent.call(this, e)
}
export let setEvent = (elem, key, value) => {
	if (!isFn(value)) {
		return
	}
	key = getEventName(key)
	value = getEventHandler(value)
	elem[key] = value
	if (key === 'onchange') {
		elem.oninput = value
	}
}
export let removeEvent = (elem, key) => {
	key = getEventName(key)
	elem[key] = null
	if (key === 'onchange') {
		elem.oninput = null
	}
}

let ignoreKeys = {
	key: true,
	ref: true,
	children: true
}
let EVENT_KEYS = /^on/i
export let isIgnoreKey = key => ignoreKeys[key]
export let isEventKey = key => EVENT_KEYS.test(key)
export let isInnerHTMLKey = key => key === 'dangerouslySetInnerHTML'
export let isStyleKey = key => key === 'style'
// Setting .type throws on non-<input> tags
export let isTypeKey = key => key === 'type'
export let setProp = (elem, key, value) => {
	switch (true) {
		case isIgnoreKey(key) || (key === 'title' && value == null):
			break
		case isEventKey(key):
			setEvent(elem, key, value)
			break
		case isStyleKey(key):
			setStyle(elem, value)
			break
		case isInnerHTMLKey(key):
			value && isStr(value.__html) && (elem.innerHTML = value.__html)
			break
		case (key in elem) && !isTypeKey(key):
			elem[key] = value
			break
		default:
			elem.setAttribute(key, value)
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
	switch (true) {
		case isIgnoreKey(key):
			break
		case isEventKey(key):
			removeEvent(elem, key)
			break
		case isStyleKey(key):
			removeStyle(elem, oldValue)
			break
		case isInnerHTMLKey(key):
			elem.innerHTML = ''
			break
		case !(key in elem):
			removeAttr(elem, key)
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
				elem[key] = null
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

	mapKey([props, newProps], key => {
		if (isIgnoreKey(key)) {
			return
		}
		let value = newProps[key]
		let oldValue = key === 'value' ? elem.value : props[key]
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
			if (!isStr(html)) {
				elem.innerHTML = ''
			} else if (html !== oldHtml) {
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
		mapKey([style, newStyle], key => {
			let value = newStyle[key]
			let oldValue = style[key]
			if (value !== oldValue) {
				setStyleValue(elemStyle, key, value)
			}
		})
	}
}

const isUnitlessNumber = {
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
	if (isBln(value) || value == null) {
		value = ''
	}
	if (!isUnitlessNumber[key] && RE_NUMBER.test(value)) {
		style[key] = value + 'px'
	} else {
		style[key] = value
	}
}

if (!Object.freeze) {
	Object.freeze = identity
}