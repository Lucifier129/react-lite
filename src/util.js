

export const ATTR_ID = 'data-referid'

export let info = {
	component: {
		amount: 0,
		mounts: 0,
		unmounts: 0
	}
}

export let getId = () => Math.random().toString(36).substr(2)

export let pipe = (fn1, fn2) => function(...args) {
	fn1.apply(this, args)
	return fn2.apply(this, args)
}

export let createCallbackStore = name => {
	let store = []
	return {
		name,
		clear() {
			while (store.length) {
				store.shift()()
			}
		},
		push(item) {
			store.push(item)
		},
		store
	}
}

export let wrapNative = (obj, method, fn) => {
	let nativeMethod = obj[method]
	let wrapper = function(...args) {
		fn.apply(this, args)
		return nativeMethod.apply(this, args)
	}
	obj[method] = wrapper
	return () => obj[method] = nativeMethod
}

if (!Object.assign) {
	Object.assign = (target, ...args) => {
		args.forEach(source => {
			for (let key in source) {
				if (!source.hasOwnProperty(key)) {
					continue
				}
				target[key] = source[key]
			}
		})
		return target
	}
}