'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ReactDOM = require('./ReactDOM');

var _Component = require('./Component');

var _Component2 = _interopRequireDefault(_Component);

var _createClass = require('./createClass');

var _createClass2 = _interopRequireDefault(_createClass);

var _createElement = require('./createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var _Children = require('./Children');

var _PropTypes = require('./PropTypes');

var _PropTypes2 = _interopRequireDefault(_PropTypes);

var React = {
    cloneElement: _createElement.cloneElement,
    isValidElement: _createElement.isValidElement,
    createElement: _createElement2['default'],
    createFactory: _createElement.createFactory,
    Component: _Component2['default'],
    createClass: _createClass2['default'],
    Children: { only: _Children.only, forEach: _Children.forEach, map: _Children.map, count: _Children.count, toArray: _Children.toArray },
    PropTypes: _PropTypes2['default'],
    render: _ReactDOM.render,
    findDOMNode: _ReactDOM.findDOMNode,
    unmountComponentAtNode: _ReactDOM.unmountComponentAtNode
};

React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
    render: _ReactDOM.render,
    findDOMNode: _ReactDOM.findDOMNode,
    unmountComponentAtNode: _ReactDOM.unmountComponentAtNode
};

exports['default'] = React;
module.exports = exports['default'];