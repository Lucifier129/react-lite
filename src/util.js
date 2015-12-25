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

export let toArray = Array.from || (obj => Array.prototype.slice.call(obj))

export let pipe = (fn1, fn2) => {
	return function(...args) {
		fn1.apply(this, args)
		return fn2.apply(this, args)
	}
}

export let forEach = (list, iteratee, record = { index: 0 }) => {
	for (let i = 0, len = list.length; i < len; i += 1) {
		let item = list[i]
		if (isArr(item)) {
			forEach(item, iteratee, record)
		} else if (!isUndefined(item)) {
			iteratee(item, record.index)
			record.index += 1
		}
	}
}

export let eachItem = (list, iteratee) => {
	for (let i = 0, len = list.length; i < len; i += 1) {
		iteratee(list[i], i)
	}
}

export let mapValue = (obj, iteratee) => {
	for (let key in obj) {
		if (!obj.hasOwnProperty(key)) {
			continue
		}
		iteratee(obj[key], key)
	}
}

export let extend = (target, ...args) => {
	eachItem(args, source => {
		if (source == null) {
			return
		}
		mapValue(source, (value, key) => {
			target[key] = value
		})
	})
	return target
}

let uid = 0
export let getUid = () => ++uid

export let hasKey = (obj, key = 'key') => obj && obj.props && (obj.props.hasOwnProperty(key))

export let mergeProps = (props, children, defaultProps) => {
	let result = extend({}, defaultProps, props)
	if (children && children.length > 0) {
		result.children = children.length === 1 ? children[0] : children
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
export let setEvent = (elem, key, value) => {
	if (!isFn(value)) {
		return
	}
	key = key.toLowerCase()
	elem[key] = value
	if (key === 'onchange') {
		elem.oninput = value
	}
}
export let removeEvent = (elem, key) => {
	key = key.toLowerCase()
	elem[key] = null
	if (key === 'onchange') {
		elem.oninput = null
	}
}

let IGNORE_KEYS = /(key)|(ref)|(children)/i
let EVENT_KEYS = /^on/i
export let isIgnoreKey = key => IGNORE_KEYS.test(key)
export let isEventKey = key => EVENT_KEYS.test(key)
export let isInnerHTMLKey = key => key === 'dangerouslySetInnerHTML'
export let isStyleKey = key => key === 'style'
export let setProp = (elem, key, value) => {
	switch (true) {
		case isIgnoreKey(key):
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
		case key in elem:
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

	mapValue(newProps, (value, key) => {
		if (isIgnoreKey(key)) {
			return
		}
		let valueIsUndefined = isUndefined(value)
		if (!props.hasOwnProperty(key)) {
			if (!valueIsUndefined) {
				setProp(elem, key, value)
				return
			}
		}
		let oldValue = props[key]
		delete props[key]
		if (value === oldValue) {
			return
		}
		if (valueIsUndefined) {
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
	removeProps(elem, props)
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
		mapValue(newStyle, (value, key) => {
			if (value == null) {
				elemStyle[key] = ''
			} else {
				let oldValue
				if (style.hasOwnProperty(key)) {
					oldValue = style[key]
					delete style[key]
				}
				if (value !== oldValue) {
					setStyleValue(elemStyle, key, value)
				}
			}
		})
		removeStyle(elem, style)
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

/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */
let prefixKey = (prefix, key) => prefix + key.charAt(0).toUpperCase() + key.substring(1)

/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */
let prefixes = ['Webkit', 'ms', 'Moz', 'O'];

// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
mapValue(isUnitlessNumber, (_, prop) => {
	eachItem(prefixes, prefix => 
		isUnitlessNumber[prefixKey(prefix, prop)] = true
	)
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