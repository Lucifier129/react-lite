
let createElement = (tagName, props, ...children) => {
	return {
		tagName,
		props,
		children
	}
}

export default createElement