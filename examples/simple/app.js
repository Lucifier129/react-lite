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

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	if (typeof requestAnimationFrame === 'undefined') {
		window.requestAnimationFrame = function (fn) {
			return setTimeout(fn, 100 / 6);
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

		getInitialState: function getInitialState() {
			return {
				text: '123123123'
			};
		},
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
			if (this.state.text === '123123123') {
				this.setState({
					text: '[text set by willUpdate]'
				});
			}
			console.log(this.state.text, 'WillUpdate');
		},
		componentDidUpdate: function componentDidUpdate() {
			console.log(this.state.text, 'DidUpdate');
			this;
			//debugger
			console.log('DidUpdate', 'Counter');
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			var state = this.state;
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
			var num = parseInt(this.input.value, 10);
			if (typeof num === 'number') {
				this.toNum(num);
			}
		},
		getInput: function getInput(input) {
			this.input = input;
		},
		handleChange: function handleChange(e) {
			var text = e.target.value.replace(/[^\d]+/, '');
			this.setState({ text: text });
		},
		render: function render() {
			var _this2 = this;

			var props = this.props;
			var COUNT = props.COUNT;

			var img = React.createElement('img', {
				src: 'http://ww3.sinaimg.cn/bmiddle/887790fagw1ezs0ci6qjxj20c10go0uf.jpg',
				ref: 'img',
				onLoad: function () {
					console.log('onload this.refs', _this2.refs);
				},
				onError: function () {
					console.log('onerror this.refs', _this2.refs);
				}
			});
			return React.createElement(
				'div',
				{ id: 'abc' },
				React.createElement(
					'span',
					{ ref: Math.random() > 0.5 ? '' : 'test-ref', 'data-test': 'abaasdf' },
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
				React.createElement(
					'label',
					{ htmlFor: 'myinput' },
					'input number:',
					React.createElement('input', {
						type: 'text',
						value: this.state.text,
						onChange: this.handleChange,
						ref: this.getInput,
						id: 'myinput',
						name: 'myinput' })
				),
				React.createElement(
					'button',
					{ onClick: this.getNum },
					'run'
				),
				React.createElement(
					'a',
					{ href: 'adbadfasdf' },
					'test link'
				),
				React.createElement('p', { dangerouslySetInnerHTML: { __html: 'test dangerouslySetInnerHTML: ' + Math.random().toString(36).substr(2) } }),
				Math.random() > 0.5 && img
			);
		}
	});

	var Example = React.createClass({
		displayName: 'Example',

		getInitialState: function getInitialState() {
			return {
				val: 0,
				test: 0
			};
		},

		componentDidMount: function componentDidMount() {
			var _this3 = this;

			this.setState({ val: this.state.val + 1, test1: 1 });
			console.log('didMount', this.state); // log 1
			this.setState({ val: this.state.val + 1, test2: 2 });
			console.log('didMount', this.state); // log 2

			setTimeout(function () {
				_this3.setState({ val: _this3.state.val + 1 });
				console.log('setTimeout:', _this3.state); // log 3
				_this3.setState({ val: _this3.state.val + 1 });
				console.log('setTimeout:', _this3.state); // log 4
			}, 4);
		},

		render: function render() {
			return React.createElement(
				'p',
				{ ref: 'paragraph' },
				this.state.val
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
			// let state = this.state
			// this.setState({
			// 	count: this.props.count
			// })
			// console.log('componentWillMount:setState', state === this.state)
		},
		componentDidMount: function componentDidMount() {
			console.timeEnd('Wrap mount');
			var state = this.state;
			this.setState({
				count: this.props.count * 2
			});
			console.log('componentDidMount:setState', state === this.state);
			console.log(this);
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
			var example = React.createElement(Example, { ref: 'example' });
			// let count = Math.random() > 0.5
			// ? <Counter ref="counter" count={ this.state.count } COUNT={ this.COUNT } />
			// : null
			return React.createElement(
				'div',
				null,
				React.createElement(Counter, { ref: 'counter', count: this.state.count, COUNT: this.COUNT }),
				example,
				example
			);
		}
	});

	var wrap = React.createElement(Wrap, { count: 10 });

	var update = function update(count) {
		return React.render(wrap, document.getElementById('container'));
	};

	var num = 10;

	var TestRootUpdateAtDidMount = (function (_React$Component) {
		_inherits(TestRootUpdateAtDidMount, _React$Component);

		function TestRootUpdateAtDidMount() {
			_classCallCheck(this, TestRootUpdateAtDidMount);

			_get(Object.getPrototypeOf(TestRootUpdateAtDidMount.prototype), 'constructor', this).apply(this, arguments);
		}

		_createClass(TestRootUpdateAtDidMount, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				console.log('TestRootUpdateAtDidMount didMount');
				updateName('TestRootUpdateAtDidMount1', function () {
					return console.log('TestRootUpdateAtDidMount1 done');
				});
				updateName('TestRootUpdateAtDidMount2', function () {
					return console.log('TestRootUpdateAtDidMount2 done');
				});
				updateName('TestRootUpdateAtDidMount3', function () {
					return console.log('TestRootUpdateAtDidMount3 done');
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var props = this.props;

				console.log('render count', props.name);
				return React.createElement(
					'div',
					null,
					props.name,
					' asdfsdf'
				);
			}
		}]);

		return TestRootUpdateAtDidMount;
	})(React.Component);

	var TestRootUpdateAtDidMountWrapper = (function (_React$Component2) {
		_inherits(TestRootUpdateAtDidMountWrapper, _React$Component2);

		function TestRootUpdateAtDidMountWrapper() {
			_classCallCheck(this, TestRootUpdateAtDidMountWrapper);

			_get(Object.getPrototypeOf(TestRootUpdateAtDidMountWrapper.prototype), 'constructor', this).apply(this, arguments);

			this.state = {
				text: 'TestRootUpdateAtDidMount'
			};
		}

		_createClass(TestRootUpdateAtDidMountWrapper, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				console.log('TestRootUpdateAtDidMountWrapper didMount');
				updateName('TestRootUpdateAtDidMountWrapper');
				this.setState({
					text: 'change at didMount'
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var props = this.props;

				var children = testCount++ > 0 ? React.createElement(TestRootUpdateAtDidMount, { name: props.name }) : 'init';
				return React.createElement(
					'div',
					null,
					this.state.text + ' ' + (this.props.name || 'default name'),
					children
				);
			}
		}]);

		return TestRootUpdateAtDidMountWrapper;
	})(React.Component);

	var testCount = 0;

	var Root = function Root(props) {

		return React.createElement(
			'div',
			{ className: 'root' },
			React.createElement(
				'p',
				null,
				'placeholder'
			),
			React.createElement(TestRootUpdateAtDidMountWrapper, props)
		);
	};

	var globalState = {
		name: 'init'
	};

	var updateName = function updateName(name, callback) {
		globalState = _extends({}, globalState, {
			name: name
		});
		renderTest(callback);
	};

	var renderTest = function renderTest(callback) {
		React.render(React.createElement(Root, globalState), document.getElementById('container'), callback);
	};

	updateName('init');
	updateName('update');

/***/ }
/******/ ]);