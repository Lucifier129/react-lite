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
            let propName = propInfo.propertyName;
            // dom.value has side effect
            if (propName !== 'value' || '' + node[propName] !== '' + value) {
                node[propName] = value
            }
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
                // dom.value accept string value has side effect
                if (propName !== 'value' || '' + node[propName] !== '') {
                    node[propName] = ''
                }
            }
        } else {
            node.removeAttribute(propInfo.attributeName)
        }
    } else if (isCustomAttribute(name)) {
        node.removeAttribute(name)
    }
}