import { Widget, collectRef } from '../component'
import { isFn } from './util'

let createElement = (tagName, props, ...children) => {
	let isComponent = isFn(tagName) && isFn(tagName.prototype.render)
	if (isComponent) {
		return new Widget(tagName, {
			...props,
			children: children.length === 1 ? children[0] : children 
		})
	}
	return {
		tagName,
		props,
		children
	}
}

export default createElement