if (typeof requestAnimationFrame === 'undefined') {
	window.requestAnimationFrame = fn => setTimeout(fn, 0)
	window.cancelAnimationFrame = id => clearTimeout(id)
}

if (typeof console === 'undefined') {
	console = { log() {}, time() {}, timeEnd() {} }
}

const Counter = React.createClass({
	componentWillMount() {
		console.time('Counter mount')
	},
	componentDidMount() {
		console.timeEnd('Counter mount')
	},
	toNum(num, callback) {
		cancelAnimationFrame(this.rid)
		let { COUNT } = this.props
		let counting = () => {
			let { count } = this.props
			switch (true) {
				case count > num:
					COUNT('DECREMENT')
					break
				case count < num:
					COUNT('INCREMENT')
					break
				case count === num:
					return callback && callback()
			}
			this.rid = requestAnimationFrame(counting)
		}
		counting()
	},
	componentWillUpdate() {
		// debugger
		console.log('willUpdate', 'Counter')
	},
	componentDidUpdate() {
		this;
		//debugger
		console.log('DidUpdate', 'Counter')
	},
	componentWillReceiveProps(nextProps) {
		let state = this.state
		this.setState({
			test: 100
		})
		console.log('Counter: receiveProps:setState', state === this.state)
	},
	shouldComponentUpdate(nextProps, nextState) {
		console.log('Counter: shouldComponentUpdate')
		return true
	},
	componentWillUnmount() {
		console.log('unmount', 'Counter')
	},
	getNum(e) {
		let num = parseInt(this.refs.input.value, 10)
		if (typeof num === 'number') {
			this.toNum(num)
		}
	},
	render() {
		let { props } = this
		let { COUNT } = props
		return (
			<div id="abc">
				<span ref={Math.random() > 0.5 ? '' : 'test-ref'} data-test="abaasdf">count: { props.count }</span>
				{' '}
				<button onClick={ () => COUNT('INCREMENT') }>+</button>
				{' '}
				<button onClick={ () => COUNT('DECREMENT') }>-</button>
				{' '}
				<button onClick={ () => COUNT('INCREMENT_IF_ODD') }>incrementIfOdd</button>
				{' '}
				<input type="text" ref="input" />
				<button onClick={ this.getNum }>run</button>
			</div>
		)
	}
})

const Wrap = React.createClass({
	getInitialState() {
		return { count: 0 }
	},
	COUNT(type) {
		let { count } = this.state
		switch(type) {
			case 'INCREMENT':
			count += 1
			break
			case 'DECREMENT':
			count -= 1
			break
			case 'INCREMENT_IF_ODD':
			if (count % 2 === 0) {
				return
			}
			count += 1
			break
		}
		this.setState({ count })
	},
	componentWillMount() {
		console.time('Wrap mount')
		let state = this.state
		this.setState({
			count: this.props.count
		})
		console.log('componentWillMount:setState', state === this.state)
	},
	componentDidMount() {
		console.timeEnd('Wrap mount')
		// let state = this.state
		// this.setState({
		// 	count: this.props.count * 2
		// })
		// console.log('componentDidMount:setState', state === this.state)
	},
	componentWillUpdate() {
		// debugger
		console.log('willUpdate', 'Wrap')
	},
	componentDidUpdate() {
		//debugger
		console.log('DidUpdate', 'Wrap')
	},
	componentWillReceiveProps(props) {
		this.setState({
			count: props.count
		})
		console.log('Wrap:receiveProps')
	},
	shouldComponentUpdate() {
		console.log('Wrap: shouldComponentUpdate')
		return true
	},
	componentWillUnmount() {
		console.log('unmount', 'wrap')
	},
	render() {
		// let count = Math.random() > 0.5
		// ? <Counter ref="counter" count={ this.state.count } COUNT={ this.COUNT } />
		// : null
		return <div><Counter ref="counter" count={ this.state.count } COUNT={ this.COUNT } /></div>
	}
})

let update = count => {
	React.render(
		<Wrap count={ count } />,
		document.getElementById('container')
	)
}

let num = 10
update(num)
// setInterval(() => {
// 	update(num++)
// }, 1000)

// setTimeout(() => {
// 	React.unmountComponentAtNode(document.getElementById('container'))
// }, 1000)