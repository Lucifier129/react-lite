import React, { create } from 'react'

let style = {
	width: '500px',
	height: '100px',
	background: '#eaeaea'
}

let vnode = (
	<div id="header" className="header" style={ style }>
		Hello
		<span className="highlight" attributes={{ style: 'padding:0 10px; color: #fff; background:pink;' }}>react</span>
	</div>
)

let node = create(vnode)

let container = document.getElementById('container')

container.appendChild(node)
