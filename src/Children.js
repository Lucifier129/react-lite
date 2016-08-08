import * as _ from './util'
import { cloneElement, isValidElement } from './createElement'

export function only(children) {
	if (isValidElement(children)) {
		return children
	}
	throw new Error('expect only one child')
}

export function forEach(children, iteratee, context) {
	if (children == null) {
		return children
	}
	let index = 0
	if (_.isArr(children)) {
		_.flatEach(children, child => {
			iteratee.call(context, child, index++)
		})
	} else {
		iteratee.call(context, children, index)
	}
}

export function map(children, iteratee, context) {
	if (children == null) {
		return children
	}
	let store = []
	let keyMap = {}
	forEach(children, (child, index) => {
		let data = {}
		data.child = iteratee.call(context, child, index) || child
		data.isEqual = data.child === child
		let key = data.key = getKey(child, index)
		if (keyMap.hasOwnProperty(key)) {
			keyMap[key] += 1
		} else {
			keyMap[key] = 0
		}
		data.index = keyMap[key]
		_.addItem(store, data)
	})
	let result = []
	store.forEach(({ child, key, index, isEqual }) => {
		if (child == null || typeof child === 'boolean') {
			return
		}
		if (!isValidElement(child) || key == null) {
			_.addItem(result, child)
			return
		}
		if (keyMap[key] !== 0) {
			key += ':' + index
		}
		if (!isEqual) {
			key = escapeUserProvidedKey(child.key || '') + '/' + key
		}
		child = cloneElement(child, { key })
		_.addItem(result, child)
	})
	return result
}

export function count(children) {
	let count = 0
	forEach(children, () => {
		count++
	})
	return count
}

export function toArray(children) {
	return map(children, _.identity) || []
}

function getKey(child, index) {
	let key
	if (isValidElement(child) && typeof child.key === 'string') {
		key = '.$' + child.key
	} else {
		key = '.' + index.toString(36)
	}
	return key
}

let userProvidedKeyEscapeRegex = /\/(?!\/)/g;
function escapeUserProvidedKey(text) {
	return ('' + text).replace(userProvidedKeyEscapeRegex, '//')
}