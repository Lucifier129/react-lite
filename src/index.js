import h from './hyperscript'
import { render, unmount } from './render'
import { Component, createClass, findDOMNode } from './component'
import { info } from './util'
import {
	createStore,
	createLogger,
	createDispatch,
	createHandler,
	combineHandlers,
	constants,
	mapValues,
	types
} from 'refer'

let check = () => check
check.isRequired = check
let PropTypes = {
    "array": check,
    "bool": check,
    "func": check,
    "number": check,
    "object": check,
    "string": check,
    "any": check,
    "arrayOf": check,
    "element": check,
    "instanceOf": check,
    "node": check,
    "objectOf": check,
    "oneOf": check,
    "oneOfType": check,
    "shape": check
}

let Children = {
	only(children) {
		return children
	}
}

export default {
	h,
	info,
	Component,
	createClass,
	Children,
	render,
	findDOMNode,
	PropTypes,
	unmount,
	unmountComponentAtNode: unmount,
	createElement: h,
	createStore,
	createLogger,
	createDispatch,
	createHandler,
	combineHandlers,
	constants,
	mapValues,
	types
}