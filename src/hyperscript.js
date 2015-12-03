import { isStr, isObj, isFn } from './util'

/*
* 创建 virtual-dom
*/

let hyperscript = (tagName, props, ...children) => {
	return {
		tagName,
		props,
		children
	}
}

export default hyperscript