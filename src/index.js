import { render, findDOMNode, unmountComponentAtNode } from './ReactDOM'
import Component from './component'
import createClass from './createClass'
import createElement from './createElement'

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

let createFactory = type => (...args) => createElement(type, ...args)

export default {
	Component,
	createClass,
	createElement,
    createFactory,
	Children,
    PropTypes,
	render,
    findDOMNode,
    unmountComponentAtNode
}