/**
 * DOM Property Operations
 */

import {
    properties,
    isCustomAttribute,
    VALID_ATTRIBUTE_NAME_REGEX
} from './DOMConfig'
/**
 * Sets the value for a property on a node.
 *
 * @param {DOMElement} node
 * @param {string} name
 * @param {*} value
 */
export function setPropValue(node, name, value) {
    let propInfo = properties.hasOwnProperty(name) && properties[name]
    if (propInfo) {
        // should delete value from dom
        if (value == null ||
            (propInfo.hasBooleanValue && !value) ||
            (propInfo.hasNumericValue && isNaN(value)) ||
            (propInfo.hasPositiveNumericValue && (value < 1)) ||
            (propInfo.hasOverloadedBooleanValue && value === false)) {
            removePropValue(node, name)
        } else if (propInfo.mustUseProperty) {
            node[propInfo.propertyName] = value
        } else {
            let attributeName = propInfo.attributeName
            let namespace = propInfo.attributeNamespace

            // `setAttribute` with objects becomes only `[object]` in IE8/9,
            // ('' + value) makes it output the correct toString()-value.
            if (namespace) {
                node.setAttributeNS(namespace, attributeName, '' + value)
            } else if (propInfo.hasBooleanValue || (propInfo.hasOverloadedBooleanValue && value === true)) {
                node.setAttribute(attributeName, '')
            } else {
                node.setAttribute(attributeName, '' + value)
            }
        }
    } else if (isCustomAttribute(name) && VALID_ATTRIBUTE_NAME_REGEX.test(name)) {
        if (value == null) {
            node.removeAttribute(name)
        } else {
            node.setAttribute(name, '' + value)
        }
    }
}

/**
 * Deletes the value for a property on a node.
 *
 * @param {DOMElement} node
 * @param {string} name
 */
export function removePropValue(node, name) {
    let propInfo = properties.hasOwnProperty(name) && properties[name]
    if (propInfo) {
        if (propInfo.mustUseProperty) {
            let propName = propInfo.propertyName;
            if (propInfo.hasBooleanValue) {
                node[propName] = false
            } else {
                node[propName] = ''
            }
        } else {
            node.removeAttribute(propInfo.attributeName)
        }
    } else if (isCustomAttribute(name)) {
        node.removeAttribute(name)
    }
}

export function updateSelectOptions(select, multiple, propValue) {
    var selectedValue, i
    var options = select.options
  
    if (multiple) {
        select.multiple = true
        if (!Array.isArray(propValue)) {
            throw new Error('The value prop supplied to <select> must be an array if `multiple` is true')
        }
        selectedValue = {}
        for (i = 0; i < propValue.length; i++) {
            selectedValue['' + propValue[i]] = true
        }
        for (i = 0; i < options.length; i++) {
            var selected = selectedValue.hasOwnProperty(options[i].value)
            if (options[i].selected !== selected) {
                options[i].selected = selected
            }
        }
    } else {
        select.multiple = false
        if (Array.isArray(propValue)) {
            throw new Error('The value prop supplied to <select> must be a scalar value if `multiple` is false.')
        }
        // Do not set `select.value` as exact behavior isn't consistent across all
        // browsers for all cases.
        selectedValue = '' + propValue
        for (i = 0; i < options.length; i++) {
            var option = options[i]
            if (option.value === selectedValue) {
                if (!option.selected) {
                    option.selected = true
                }
            } else {
                if (option.selected) {
                    option.selected = false
                }
            }
        }

        if (options.selectedIndex < 0 && options.length) {
            options[0].selected = true
        }
    }
}