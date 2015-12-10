import React, { Component, render } from 'react'


class Counter extends Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {
		console.time('Counter mount')
	}
	componentDidMount() {
		console.timeEnd('Counter mount')
	}
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
	}
	componentWillUpdate() {
		// debugger
		console.log('willUpdate', 'Counter')
	}
	componentDidUpdate() {
		this;
		//debugger
		console.log('DidUpdate', 'Counter')
	}
	componentWillReceiveProps(nextProps) {
		console.log('receiveProps')
	}
	shouldComponentUpdate(nextProps, nextState) {
		console.log('Counter: shouldComponentUpdate')
		return true
	}
	componentWillUnmount() {
		console.log('unmount', 'Counter')
	}
	render() {
		let { props } = this
		let { COUNT } = props
		let getNum = e => {
			let num = parseInt(e.currentTarget.previousElementSibling.value, 10)
			if (typeof num === 'number') {
				this.toNum(num)
			}
		}
		return (
			<div id="abc">
				<span ref="efg" data-test="abaasdf">count: { props.count }</span>
				{' '}
				<button onclick={ () => COUNT('INCREMENT') }>+</button>
				{' '}
				<button onclick={ () => COUNT('DECREMENT') }>-</button>
				{' '}
				<button onclick={ () => COUNT('INCREMENT_IF_ODD') }>incrementIfOdd</button>
				{' '}
				<input type="text" ref="input" />
				<button onclick={ getNum }>run</button>
			</div>
		)
	}
}

class Wrap extends Component {
	constructor(props) {
		super(props)
		this.state = {
			count: 0
		}
		this.actions = {
			COUNT: type => {
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
			}
		}
	}
	componentWillMount() {
		console.time('Wrap mount')
	}
	componentDidMount() {
		console.timeEnd('Wrap mount')
		//this.actions.COUNT('INCREMENT')
	}
	componentWillUpdate() {
		// debugger
		console.log('willUpdate', 'Wrap')
	}
	componentDidUpdate() {
		//debugger
		console.log('DidUpdate', 'Wrap')
	}
	componentWillReceiveProps(props) {
		this.setState({
			count: props.count
		})
	}
	shouldComponentUpdate() {
		console.log('Wrap: shouldComponentUpdate')
		return super()
	}
	componentWillUnmount() {
		console.log('unmount', 'wrap')
	}
	render() {
		console.log(this.state.count)
		return <Counter ref="counter" count={ this.state.count } COUNT={ this.actions.COUNT } />
	}
}

let update = count => {
	render(
		<Wrap count={ count } />,
		document.getElementById('container'),
		console.log.bind(console, 'render')
	)
}

update(0)

// setTimeout(() => {
// 	React.unmountComponentAtNode(document.getElementById('container'))
// }, 1000)
// let num = 0
// setInterval(() => {
// 	update(num++)
// }, 1000)