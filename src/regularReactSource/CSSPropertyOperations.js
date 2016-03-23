/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CSSPropertyOperations
 */
import CSSProperty from './CSSProperty'

var isUnitlessNumber = CSSProperty.isUnitlessNumber
var shorthandPropertyExpansions = CSSProperty.shorthandPropertyExpansions

var hasShorthandPropertyBug = false
var styleFloatAccessor = 'cssFloat'
var tempStyle = document.createElement('div').style
try {
    // IE8 throws "Invalid argument." if resetting shorthand style properties.
    tempStyle.font = ''
} catch (e) {
    hasShorthandPropertyBug = true
}
// IE8 only supports accessing cssFloat (standard) as styleFloat
if (document.documentElement.style.cssFloat === undefined) {
    styleFloatAccessor = 'styleFloat'
}

export function removeStyleValue(elemStyle, styleName) {
    var expansion =
        hasShorthandPropertyBug &&
        shorthandPropertyExpansions[styleName]
    if (expansion) {
        // Shorthand property that IE8 won't like unsetting, so unset each
        // component to placate it
        for (var individualStyleName in expansion) {
            style[individualStyleName] = ''
        }
    } else {
        style[styleName] = ''
    }
}


var RE_NUMBER = /^-?\d+(\.\d+)?$/

export function setStyleValue(elemStyle, styleName, styleValue) {

    if (!isUnitlessNumber[key] && RE_NUMBER.test(value)) {
        elemStyle[styleName] = styleValue + 'px'
        return
    }

    if (styleName === 'float' || styleName === 'cssFloat') {
        styleName = styleFloatAccessor
    }

    if (styleValue == null || typeof styleValue === 'boolean') {
        styleValue = ''
    }

    if (styleValue) {
        style[styleName] = styleValue
    } else {
        removeStyleValue(elemStyle, styleName)
    }
}

export function setStyle(elemStyle, styles) {
    for (var styleName in styles) {
        if (styles.hasOwnProperty(styleName)) {
            setStyleValue(elemStyle, styleName, styles[styleName])
        }
    }
}

export function removeStyle(elemStyle, styles) {
    for (var styleName in styles) {
        if (styles.hasOwnProperty(styleName)) {
            removeStyleValue(elemStyle, styleName, styles[styleName])
        }
    }
}