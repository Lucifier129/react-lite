import { render, findDOMNode, unmountComponentAtNode, unstable_renderSubtreeIntoContainer } from './ReactDOM'
import Component from './Component'
import createClass from './createClass'
import createElement, { isValidElement, cloneElement, createFactory } from './createElement'
import { only, forEach, map, count, toArray } from './Children'
import PropTypes from './PropTypes'
import DOM from './DOM'

let React = {
    version: '0.14.4',
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
    unmountComponentAtNode,
    unstable_renderSubtreeIntoContainer,
    DOM
}

React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
    render,
    findDOMNode,
    unmountComponentAtNode,
    unstable_renderSubtreeIntoContainer
}

export default React