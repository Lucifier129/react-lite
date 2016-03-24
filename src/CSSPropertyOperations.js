/**
 * CSS Property Operations
 */

export function setStyle(elemStyle, styles) {
    for (let styleName in styles) {
        if (styles.hasOwnProperty(styleName)) {
            setStyleValue(elemStyle, styleName, styles[styleName])
        }
    }
}

export function removeStyle(elemStyle, styles) {
    for (let styleName in styles) {
        if (styles.hasOwnProperty(styleName)) {
            elemStyle[styleName] = ''
        }
    }
}

export function patchStyle(elemStyle, style, newStyle) {
    if (style === newStyle) {
        return
    }
    if (!newStyle && style) {
        removeStyle(elemStyle, style)
        return
    } else if (newStyle && !style) {
        setStyle(elemStyle, newStyle)
        return
    }

    let keyMap = {}
    for (let key in style) {
        if (style.hasOwnProperty(key)) {
            keyMap[key] = true
            if (style[key] !== newStyle[key]) {
                setStyleValue(elemStyle, key, newStyle[key])
            }
        }
    }
    for (let key in newStyle) {
        if (newStyle.hasOwnProperty(key) && keyMap[key] !== true) {
            if (style[key] !== newStyle[key]) {
                setStyleValue(elemStyle, key, newStyle[key])
            }
        }
    }
}

/**
 * CSS properties which accept numbers but are not in units of "px".
 */
const isUnitlessNumber = {
    animationIterationCount: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
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
    gridRow: true,
    gridColumn: true,
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
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true,
}

function prefixKey(prefix, key) {
    return prefix + key.charAt(0).toUpperCase() + key.substring(1)
}

let prefixes = ['Webkit', 'ms', 'Moz', 'O']

Object.keys(isUnitlessNumber).forEach(function(prop) {
    prefixes.forEach(function(prefix) {
        isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop]
    })
})

let RE_NUMBER = /^-?\d+(\.\d+)?$/
function setStyleValue(elemStyle, styleName, styleValue) {

    if (!isUnitlessNumber[styleName] && RE_NUMBER.test(styleValue)) {
        elemStyle[styleName] = styleValue + 'px'
        return
    }

    if (styleName === 'float' || styleName === 'cssFloat') {
        styleName = styleFloatAccessor
    }

    if (styleValue == null || typeof styleValue === 'boolean') {
        styleValue = ''
    }

    elemStyle[styleName] = styleValue
}