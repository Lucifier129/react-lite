import hyperscript from './hyperscript'
import { isFn, isStr, isObj, isNum, pipe } from './util'
import { assignProperties } from './vendor/DOMPropertyOperations'
import { injection } from './vendor/DOMProperty'
import HTMLDOMPropertyConfig from './vendor/HTMLDOMPropertyConfig'
import SVGDOMPropertyConfig from './vendor/SVGDOMPropertyConfig'

injection.injectDOMPropertyConfig(HTMLDOMPropertyConfig)
injection.injectDOMPropertyConfig(SVGDOMPropertyConfig)

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

let RE_NUMBER = /^\d+(\.\d+)?$/
let checkNum = obj => isNum(obj) || (isStr(obj) && RE_NUMBER.test(obj))
let checkUnit = style => {
	for (let key in style) {
		if (checkNum(style[key]) && !isUnitlessNumber[key]) {
			style[key] += 'px'
		}
	}
	return style
}
let onchanging = null
let checkEvent = props => {
	let handle = props.onchange
	if (isFn(handle)) {
		let onchange = function(e) {
			onchanging = handle
			handle.call(this, e)
			onchanging = null
		}
		props.onchange = onchange
		props.oninput = isFn(props.oninput) ? pipe(props.oninput, onchange) : onchange
		if (onchanging === handle && 'value' in props) {
			delete props.value
		}
	}
	return props
}
let isKey = name => name === 'key'
let isEvent = name => /^on/.test(name)
let isStyle = name => name === 'style'
let isRef = name => name === 'ref'
let assign = (properties) => {
	if (properties == null) {
		return properties
	}
	let props = {
		attributes: {}
	}
	let hasChange
	for (let name in properties) {
		if (!properties.hasOwnProperty(name)) {
			continue
		}
		let value = properties[name]
		if (isKey(name)) {
			if (value != null) {
				props[name] = value
				hasChange = true
			}
		} else if (isEvent(name)) {
			if (isFn(value)) {
				props[name.toLowerCase()] = value
				hasChange = true
			}
		} else if (isStyle(name)) {
			if (isStr(value)) {
				props.attributes[name] = value
				hasChange = true
			} else if (isObj(value)) {
				props[name] = checkUnit(value)
				hasChange = true
			}
		} else if (isRef(name)) {
			if (isStr(value)) {
				let refKey = value
				let refValue = value
				props.attributes['data-refid'] = refValue
				hasChange = true
			}
		} else {
			hasChange = assignProperties(props, name, value) || hasChange
		}
	}
	return hasChange ? checkEvent(props) : null
}

let getProps = (properties, children) => {
	let { length } = children
	properties = properties || {}
	if (length > 0) {
		properties.children = length === 1 ? children[0] : children
	}
	return properties
}

let createElement = (tagName, properties, ...children) => {
	if (isFn(tagName)) {
		tagName = tagName(getProps(properties, children))
	}
	let props = assign(properties)
	return hyperscript(tagName, props, ...children.filter(child => typeof child !== 'boolean'))
}

export default createElement