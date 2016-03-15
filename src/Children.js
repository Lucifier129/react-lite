import * as _ from './util'
import { cloneElement, isValidElement } from './createElement'

export let only = children => {
	if (isValidElement(children)) {
		return children
	}
	throw new Error('expect only one child')
}

export let forEach = (children, iteratee, context) => {
	if (children == null) {
		return children
	}
	let index = 0
	if (_.isArr(children)) {
		_.flattenChildren(children, child => {
			iteratee.call(context, child, index++)
		})
	} else {
		iteratee.call(context, children, index)
	}
}

export let map = (children, iteratee, context) => {
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
		store.push(data)
	})
	let result = []
	_.eachItem(store, ({ child, key, index, isEqual }) => {
		if (child == null || _.isBln(child)) {
			return
		}
		if (!isValidElement(child) || key == null) {
			result.push(child)
			return
		}
		if (keyMap[key] !== 0) {
			key += ':' + index
		}
		if (!isEqual) {
			key = escapeUserProvidedKey(child.key || '') + '/' + key
		}
		child = cloneElement(child, { key })
		result.push(child)
	})
	return result
}

export let count = children => {
	let count = 0
	forEach(children, () => {
		count++
	})
	return count
}

export let toArray = children => map(children, _.identity) || []

let getKey = (child, index) => {
	let key
	if (isValidElement(child) && _.isStr(child.key)) {
		key = '.$' + child.key
	} else {
		key = '.' + index.toString(36)
	}
	return key
}

let userProvidedKeyEscapeRegex = /\/(?!\/)/g;
let escapeUserProvidedKey = text => ('' + text).replace(userProvidedKeyEscapeRegex, '//')