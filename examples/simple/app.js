/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	if (typeof requestAnimationFrame === 'undefined') {
		window.requestAnimationFrame = function (fn) {
			return setTimeout(fn, 0);
		};
		window.cancelAnimationFrame = function (id) {
			return clearTimeout(id);
		};
	}

	if (typeof console === 'undefined') {
		console = { log: function log() {}, time: function time() {}, timeEnd: function timeEnd() {} };
	}

	var Counter = React.createClass({
		displayName: 'Counter',

		componentWillMount: function componentWillMount() {
			console.time('Counter mount');
		},
		componentDidMount: function componentDidMount() {
			console.timeEnd('Counter mount');
		},
		toNum: function toNum(num, callback) {
			var _this = this;

			cancelAnimationFrame(this.rid);
			var COUNT = this.props.COUNT;

			var counting = function counting() {
				var count = _this.props.count;

				switch (true) {
					case count > num:
						COUNT('DECREMENT');
						break;
					case count < num:
						COUNT('INCREMENT');
						break;
					case count === num:
						return callback && callback();
				}
				_this.rid = requestAnimationFrame(counting);
			};
			counting();
		},
		componentWillUpdate: function componentWillUpdate() {
			// debugger
			console.log('willUpdate', 'Counter');
		},
		componentDidUpdate: function componentDidUpdate() {
			this;
			//debugger
			console.log('DidUpdate', 'Counter');
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			var state = this.state;
			this.setState({
				test: 100
			});
			console.log('Counter: receiveProps:setState', state === this.state);
		},
		shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
			console.log('Counter: shouldComponentUpdate');
			return true;
		},
		componentWillUnmount: function componentWillUnmount() {
			console.log('unmount', 'Counter');
		},
		getNum: function getNum(e) {
			var num = parseInt(e.target.previousSibling.value, 10);
			if (typeof num === 'number') {
				this.toNum(num);
			}
		},
		render: function render() {
			var props = this.props;
			var COUNT = props.COUNT;

			return React.createElement(
				'div',
				{ id: 'abc' },
				React.createElement(
					'span',
					{ ref: 'efg', 'data-test': 'abaasdf' },
					'count: ',
					props.count
				),
				' ',
				React.createElement(
					'button',
					{ onClick: function () {
							return COUNT('INCREMENT');
						} },
					'+'
				),
				' ',
				React.createElement(
					'button',
					{ onClick: function () {
							return COUNT('DECREMENT');
						} },
					'-'
				),
				' ',
				React.createElement(
					'button',
					{ onClick: function () {
							return COUNT('INCREMENT_IF_ODD');
						} },
					'incrementIfOdd'
				),
				' ',
				React.createElement('input', { type: 'text', ref: 'input' }),
				React.createElement(
					'button',
					{ onClick: this.getNum },
					'run'
				)
			);
		}
	});

	var Wrap = React.createClass({
		displayName: 'Wrap',

		getInitialState: function getInitialState() {
			return { count: 0 };
		},
		COUNT: function COUNT(type) {
			var count = this.state.count;

			switch (type) {
				case 'INCREMENT':
					count += 1;
					break;
				case 'DECREMENT':
					count -= 1;
					break;
				case 'INCREMENT_IF_ODD':
					if (count % 2 === 0) {
						return;
					}
					count += 1;
					break;
			}
			this.setState({ count: count });
		},
		componentWillMount: function componentWillMount() {
			console.time('Wrap mount');
			var state = this.state;
			this.setState({
				count: this.props.count
			});
			console.log('componentWillMount:setState', state === this.state);
		},
		componentDidMount: function componentDidMount() {
			console.timeEnd('Wrap mount');
			// let state = this.state
			// this.setState({
			// 	count: this.props.count * 2
			// })
			// console.log('componentDidMount:setState', state === this.state)
		},
		componentWillUpdate: function componentWillUpdate() {
			// debugger
			console.log('willUpdate', 'Wrap');
		},
		componentDidUpdate: function componentDidUpdate() {
			//debugger
			console.log('DidUpdate', 'Wrap');
		},
		componentWillReceiveProps: function componentWillReceiveProps(props) {
			this.setState({
				count: props.count
			});
			console.log('Wrap:receiveProps');
		},
		shouldComponentUpdate: function shouldComponentUpdate() {
			console.log('Wrap: shouldComponentUpdate');
			return true;
		},
		componentWillUnmount: function componentWillUnmount() {
			console.log('unmount', 'wrap');
		},
		render: function render() {
			// let count = Math.random() > 0.5
			// ? <Counter ref="counter" count={ this.state.count } COUNT={ this.COUNT } />
			// : null
			return React.createElement(
				'div',
				null,
				React.createElement(Counter, { ref: 'counter', count: this.state.count, COUNT: this.COUNT })
			);
		}
	});

	var update = function update(count) {
		React.render(React.createElement(Wrap, { count: count }), document.getElementById('container'));
	};

	var num = 10;
	update(num);
	// setInterval(() => {
	// 	update(num++)
	// }, 1000)

	// setTimeout(() => {
	// 	React.unmountComponentAtNode(document.getElementById('container'))
	// }, 1000)

/***/ }
/******/ ]);