import * as _ from './util'
import Component from './component'

let combineMixin = (proto, mixin) => {
	_.mapValue(mixin, (value, key) => {
		let curValue = proto[key]
		if (_.isFn(curValue) && _.isFn(value)) {
			proto[key] = _.pipe(curValue, value)
		} else {
			proto[key] = value
		}
	})
}
let combineMixins = (proto, mixins) => {
	_.eachItem(mixins, mixin => combineMixin(proto, mixin))
}

let bindContext = (obj, source) => {
	_.mapValue(source, (value, key) => {
		if (_.isFn(value)) {
			obj[key] = value.bind(obj)
		}
	})
}

let Facade = function() {}
Facade.prototype = Component.prototype

export let createClass = spec => {
	let mixins = spec.mixins || []
	function Klass(props) {
		Component.call(this, props)
		bindContext(this, Klass.prototype)
		if (_.isFn(this.getInitialState)) {
			this.state = this.getInitialState()
		}
	}
	Klass.prototype = new Facade()
	combineMixins(Klass.prototype, mixins.concat(spec))
	if (_.isObj(spec.statics)) {
		_.mapValue(spec.statics, (value, key) => {
			Klass[key] = value
		})
	}
	if (_.isFn(spec.getDefaultProps)) {
		Klass.defaultProps =  spec.getDefaultProps()
	}
	return Klass
}

export default createClass