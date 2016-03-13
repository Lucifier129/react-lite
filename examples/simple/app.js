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
				Math.random() > 0.5 && img,
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
				React.createElement('p', { dangerouslySetInnerHTML: { __html: 'test dangerouslySetInnerHTML: ' + Math.random().toString(36).substr(2) } })
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
	// update()

	var log;
	var logger = function logger(msg) {
		return function () {
			// return true for shouldComponentUpdate
			log.push(msg);
			return true;
		};
	};
	var Outer = React.createClass({
		displayName: 'Outer',

		render: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(Inner, { x: this.props.x })
			);
		},
		componentWillMount: logger('outer componentWillMount'),
		componentDidMount: logger('outer componentDidMount'),
		componentWillReceiveProps: logger('outer componentWillReceiveProps'),
		shouldComponentUpdate: logger('outer shouldComponentUpdate'),
		componentWillUpdate: logger('outer componentWillUpdate'),
		componentDidUpdate: logger('outer componentDidUpdate'),
		componentWillUnmount: logger('outer componentWillUnmount')
	});
	var Inner = React.createClass({
		displayName: 'Inner',

		render: function render() {
			return React.createElement(
				'span',
				null,
				this.props.x
			);
		},
		componentWillMount: logger('inner componentWillMount'),
		componentDidMount: logger('inner componentDidMount'),
		componentWillReceiveProps: logger('inner componentWillReceiveProps'),
		shouldComponentUpdate: logger('inner shouldComponentUpdate'),
		componentWillUpdate: logger('inner componentWillUpdate'),
		componentDidUpdate: logger('inner componentDidUpdate'),
		componentWillUnmount: logger('inner componentWillUnmount')
	});

	var container = document.createElement('root');
	log = [];
	React.render(React.createElement(Outer, { x: 17 }), container);
	log = [];
	React.unmountComponentAtNode(container);
	console.log(log);

	// class TestRootUpdateAtDidMount extends React.Component {
	// 	componentDidMount() {
	// 		console.log('TestRootUpdateAtDidMount didMount')
	// 		updateName('TestRootUpdateAtDidMount1', () => console.log('TestRootUpdateAtDidMount1 done'))
	// 		updateName('TestRootUpdateAtDidMount2', () => console.log('TestRootUpdateAtDidMount2 done'))
	// 		updateName('TestRootUpdateAtDidMount3', () => console.log('TestRootUpdateAtDidMount3 done'))
	// 	}
	// 	render() {
	// 		let { props } = this
	// 		console.log('render count', props.name)
	// 		return <div>{props.name} asdfsdf</div>
	// 	}
	// }

	// class TestRootUpdateAtDidMountWrapper extends React.Component {
	// 	state = {
	// 		text: 'TestRootUpdateAtDidMountWrapper text'
	// 	};
	// 	componentDidMount() {
	// 		console.log('TestRootUpdateAtDidMountWrapper didMount')
	// 		this.setState({
	// 			text: 'change at didMount'
	// 		})
	// 		this.setState({
	// 			text: 'change at didMount1'
	// 		})
	// 		updateName('TestRootUpdateAtDidMountWrapper')
	// 	}
	// 	render() {
	// 		let { props } = this
	// 		let children = testCount++ > 0 ? <TestRootUpdateAtDidMount name={props.name} /> : 'init'
	// 		return (<div>
	// 					{this.state.text + ' ' + (this.props.name || 'default name')}
	// 					{children}
	// 				</div>)
	// 	}
	// }

	// let testCount = 0

	// let Root = props => {

	// 	return <div className="root"><p>placeholder</p><TestRootUpdateAtDidMountWrapper {...props} /></div>
	// }

	// var globalState = {
	// 	name: 'init'
	// }

	// var updateName = (name, callback) => {
	// 	console.log('updateName', name)
	// 	globalState = {
	// 		...globalState,
	// 		name
	// 	}
	// 	renderTest(callback)
	// }

	// let renderTest = (callback) => {
	// 	React.render(
	// 		<Root {...globalState} />,
	// 		document.getElementById('container'),
	// 		callback
	// 	)
	// }

	// updateName('init')
	// updateName('update')

	// class Test extends React.Component {
	// 	componentWillMount() {
	// 		console.log(this.props.index, 'willMount')
	// 		debugger
	// 	}
	// 	componentDidMount() {
	// 		console.log(this.props.index, 'didMount')
	// 		debugger
	// 	}
	// 	componentWillUnmount() {
	// 		console.log(this.props.index, 'willUnmount')
	// 	}
	// 	render() {
	// 		return <div>{this.props.index}</div>
	// 	}
	// }

	// var root = (
	// 	<div>
	// 		<Test index={0} />
	// 		<Test index={1} />
	// 		<Test index={2} />
	// 	</div>)

	// React.render(root, document.getElementById('container'))

/***/ }
/******/ ]);