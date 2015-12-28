import * as _ from './util'

export let only = children => {
	if (children != null && !_.isArr(children)) {
		return children
	}
	throw new Error('expect only one child')
}

export let forEach = (children, iteratee, context) => {
	if (children == null) {
		return
	}
	if (_.isArr(children)) {
		_.forEach(children, (child, index) => {
			iteratee.call(context, child, index)
		})
	} else {
		iteratee.call(context, children, 0)
	}
}

export let map = (children, iteratee, context) => {
	if (children == null) {
		return null
	}
	let result = []
	forEach(children, (child, index) => {
		child = iteratee.call(context, child, index) || child
		result.push(child)
	})
	return result
}

export let count = children => {
	let count = 0
	forEach(children, () => count++)
	return count
}

export let toArray = children => {
	let result = []
	forEach(children, (child, index) => {
		if (child == null || _.isBln(child)) {
			return
		}
		result.push(child)
	})
	return result
}