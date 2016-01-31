import Component from './Component'
import createClass from './createClass'
import createElement, { isValidElement, cloneElement, createFactory } from './createElement'
import * as Children from './Children'
import * as ReactDOM from './ReactDOM'
import PropTypes from './PropTypes'
import DOM from './DOM'
import * as _ from './util'

let React = _.extend({
    version: '0.14.7',
    cloneElement,
    isValidElement,
    createElement,
    createFactory,
    Component,
    createClass,
    Children,
    PropTypes,
    DOM
}, ReactDOM)

export default React