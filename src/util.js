import { WILL_UNMOUNT, REF_CALLBACK } from './constant'

export let setAttr = (elem, key, value) => {
	elem.setAttribute(key, value)
}

export let getAttr = (elem, key) => {
	return elem.getAttribute(key)
}

export let removeAttr = (elem, key) => {
	elem.removeAttribute(key)
}

export let querySelectorAll = (elem, selector) => {
	return elem.querySelectorAll(selector)
}

export let setEvent = (elem, key, value) => {
	key = key.toLowerCase()
	elem[key] = value
	if (key === 'onchange') {
		elem.oninput = value
		value.oninput = true
	}
}

export let removeEvent = (elem, key) => {
	key = key.toLowerCase()
	elem[key] = null
	if (key === 'onchange') {
		elem.oninput = null
	}
}

export let toArray = Array.from || (obj => Array.prototype.slice.call(obj))

//types.js
export let isType = type => obj => obj != null && Object.prototype.toString.call(obj) === `[object ${ type }]`
export let isObj = isType('Object')
export let isStr = isType('String')
export let isNum = isType('Number')
export let isFn = isType('Function')
export let isBln = isType('Boolean')
export let isArr = Array.isArray || isType('Array')
export let isComponent = obj => isFn(obj)
export let isComponentClass = obj => isFn(obj) && ('forceUpdate' in obj.prototype)
export let isUndefined = obj => obj === undefined
export let pipe = (fn1, fn2) => function(...args) {
	fn1.apply(this, args)
	return fn2.apply(this, args)
}

export let getUid = () => Math.random().toString(36).substr(2)

export let mergeProps = (props, children) => {
	if (children && children.length) {
		children = children.length === 1 ? children[0] : children
		if (props) {
			props.children = children
		} else {
			props = { children }
		}
	}
	return props
}

export let mapChildren = (children, callback, record = { index: 0, store: [] }) => {
	let { store } = record
	children.forEach(child => {
		if (isArr(child)) {
			mapChildren(child, callback, record)
		} else if (!isBln(child)) {
			store.push(child)
			callback(child, record.index)
			record.index += 1
		}
	})
	return store
}

export let hasKey = obj => obj && obj.props && obj.props.key

let $events = {}

export let $on = (name, callback) => {
	if (!$events[name]) {
		$events[name] = []
	}
	$events[name].push(callback)
}

export let $trigger = (name, ...args) => {
	if (isArr($events[name])) {
		$events[name].forEach(callback => callback(...args))
	}
}

export let $triggerOnce = (name, ...args) => {
	let events = $events[name]
	delete $events[name]
	if (isArr(events)) {
		events.forEach(callback => callback(...args))
	}
}

let componentId
let $componentId
export let setComponentId = id => {
	$componentId = componentId
	componentId = id
}
export let resetComponentId = () => {
	componentId = $componentId
}

let refsStore = {}
let getDOMNode = function() { return this }
export let getRefs = id => {
	let refs = refsStore[id] || {}
	refsStore[id] = {}
	return refs
}
export let collectRef = (key, value, oldKey) => {
	if (!componentId) {
		return
	}
	console.log(componentId, key)
	let refs = refsStore[componentId]
	if (!refs) {
		refs = refsStore[componentId] = {}
	}
	if (isFn(key)) {
		if (!refs.$$fn) {
			refs.$$fn = []
		}
		refs.$$fn.push(key)
		if (key !== oldKey) {
			$on(componentId, () => key(value))
		}
		return
	}
	if (value.nodeName) {
		value.getDOMNode = getDOMNode
	}
	refs[key] = value
}

export let patchRefs = (refs, newRefs) => {
	if (!refs || !refs.$$fn) {
		return
	}
	refs.$$fn.forEach(fn => {
		if (!newRefs || !newRefs.$$fn || newRefs.$$fn.indexOf(fn) === -1) {
			fn(null)
		}
	})
}

export let appendChild = (node, child) => {
	node.appendChild(child)
}

export let removeChild = (node, child) => {
	$trigger(WILL_UNMOUNT, child)
	node.removeChild(child)
}

export let replaceChild = (node, newChild, child) => {
	$trigger(WILL_UNMOUNT, child, newChild)
	node.replaceChild(newChild, child)
}

export let setProp = (elem, key, value) => {
	switch (true) {
		case key === 'key':
			break
		case key === 'ref':
			if (value) {
				collectRef(value, elem)
			}
			break
		case key === 'style':
			setStyle(elem, value)
			break
		case isEventKey(key):
			setEvent(elem, key, value)
			break
		case key in elem:
			elem[key] = value
			break
		case key === 'dangerouslySetInnerHTML':
			if (elem.innerHTML !== value.__html) {
				elem.innerHTML = value.__html
			}
			break
		default:
			elem.setAttribute(key, value)
	}
}

export let setProps = (elem, props) => {
	Object.keys(props).forEach(key => 
		setProp(elem, key, props[key])
	)
}

export let isEventKey = key => /^on/.test(key)

export let removeProp = (elem, key) => {
	switch (true) {
		case isEventKey(key):
			removeEvent(elem, key)
			break
		case !(key in elem):
			removeAttr(elem, key)
			break
		case isFn(elem[key]):
			elem[key] = null
			break
		case isStr(elem[key]):
			elem[key] = ''
			break
		case isBln(elem[key]):
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

export let patchProps = (node, props, newProps) => {
	if (!props && newProps) {
		return setProps(node, newProps)
	} else if (!newProps && props) {
		return Object.keys(props).each(key => {
			if (key === 'style') {
				removeStyle(node, props[key])
			} else {
				removeProp(node, key)
			}
		})
	}

	for (let key in newProps) {
		if (!newProps.hasOwnProperty(key)) {
			continue
		}
		let value = props[key]
		let newValue = newProps[key]
		if (key === 'style') {
			patchStyle(node, props.style, newProps.style)
		} else if (isUndefined(newValue)) {
			removeProp(node, key)
		} else if (newValue !== value) {
			setProp(node, key, newValue)
		} else if (key === 'ref') {
			if (isFn(value) && newValue !== value) {
				value(null)
			}
			if (isFn(newValue) && newValue !== value) {
				newValue(node)
			} else if (node.parentId) {
				attachRef(node.parentId, newValue, node)
			}
		}
		delete props[key]
	}

	for (let key in props) {
		if (!props.hasOwnProperty(key)) {
			continue
		}
		if (isUndefined(newValue[key])) {
			removeProp(node, key)
		}
	}
}

export let removeStyle = (elem, style) => {
	if (!isObj(style)) {
		return
	}
	Object.keys(style).forEach(key => elem.style[key] = '')
}

export let setStyle = (elem, style) => {
	if (!isObj(style)) {
		return
	}
	Object.keys(style).forEach(key => {
		setStyleValue(elem.style, key, style[key])
	})
}

export let patchStyle = (elem, style, newStyle) => {
	if (!newStyle && style) {
		removeStyle(elem, style)
	} else if (newStyle && !style) {
		setStyle(elem, newStyle)
	} else {
		let domStyle = elem.style
		Object.keys({ ...style, ...newStyle }).forEach(key => {
			let value = newStyle[key]
			if (isUndefined(value)) {
				domStyle[key] = ''
			} else if (value !== style[key]) {
				setStyleValue(domStyle, key, value)
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
Object.keys(isUnitlessNumber).forEach(prop => prefixes.forEach(prefix => 
	isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop]
))

let RE_NUMBER = /^-?\d+(\.\d+)?$/
export let setStyleValue = (style, key, value) => {
	if (RE_NUMBER.test(value) && !isUnitlessNumber[key]) {
		style[key] = value + 'px'
	} else {
		style[key] = value
	}
}