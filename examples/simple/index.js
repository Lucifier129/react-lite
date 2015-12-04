import React from 'react'

let style = {
	width: 500,
	height: 100,
	background: '#eaeaea'
}

let vnode = (
	<div id="header" className="header" style={ style }>
		Hello
		<span className="highlight" style='padding:0 10px; color: #fff; background:pink;'>react</span>
	</div>
)

var nextVnode = (
	<div id="header" className="header" style={ style }>
		Hello
		<span className="highlight" data-test="abd" style='padding:0 10px; color: #fff; background:blue;'>world</span>
		sdafasdfasdf
		<div>
			<span className="highlight" data-test="abd" style='padding:0 10px; color: #fff; background:blue;'>world</span>
		</div>
		<span className="highlight" data-test="abd" style='padding:0 10px; color: #fff; background:blue;'>world</span>
		<span className="highlight" data-test="abd" style='padding:0 10px; color: #fff; background:blue;'>world</span>
		<span className="highlight" data-test="abd" style='padding:0 10px; color: #fff; background:blue;'>world</span>
	</div>
)

let container = document.getElementById('container')
let count = 0
let update = () => {
	let patches
	count += 1
	if (count % 2) {
		React.render(vnode, container)
	} else {
		React.render(nextVnode, container)
	}
}

setInterval(update, 1000)

