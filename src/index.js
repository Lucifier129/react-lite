import { render, findDOMNode, unmountComponentAtNode } from './ReactDOM'
import Component from './Component'
import createClass from './createClass'
import createElement, { isValidElement, cloneElement, createFactory } from './createElement'
import { only, forEach, map, count, toArray } from './Children'
import PropTypes from './PropTypes'

let React = {
    cloneElement,
    isValidElement,
    createElement,
    createFactory,
    Component,
    createClass,
    Children: { only, forEach, map, count, toArray },
    PropTypes,
    render,
    findDOMNode,
    unmountComponentAtNode
}

React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
    render,
    findDOMNode,
    unmountComponentAtNode
}

export default React