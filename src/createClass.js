import * as _ from './util'
import Component from './component'

let combineMixin = (proto, mixin) => {
	if (_.isArr(mixin.mixins)) {
		combineMixins(proto, mixin.mixins)
	}
	_.mapValue(mixin, (value, key) => {
		if (key === 'statics' || key === 'propTypes' || key === 'mixins') {
			return
		}
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

let combineStaticsAndPropTypes = (Component, mixins) => {
	_.eachItem(mixins, mixin => {
		if (_.isArr(mixin.mixins)) {
			combineStaticsAndPropTypes(Component, mixin.mixins)
		}
		if (_.isObj(mixin.propTypes)) {
			_.extend(Component.propTypes, mixin.propTypes)
		}
		if (_.isObj(mixin.statics)) {
			_.extend(Component, mixin.statics)
		}
	})
}

let Facade = function() {}
Facade.prototype = Component.prototype

export let createClass = spec => {
	if (!_.isFn(spec.render)) {
		throw new Error('createClass: spec.render is not function')
	}
	let mixins = spec.mixins || []
	delete spec.mixins
	mixins = mixins.concat(spec)
	function Klass(props) {
		Component.call(this, props)
		spec.autobind !== false && bindContext(this, Klass.prototype)
		this.constructor = Klass
		if (_.isFn(this.getInitialState)) {
			let setState = this.setState
			this.setState = Facade
			this.state = this.getInitialState()
			this.setState = setState
		}
	}
	Klass.prototype = new Facade()
	combineMixins(Klass.prototype, mixins)
	Klass.propTypes = {}
	combineStaticsAndPropTypes(Klass, mixins)
	if (_.isFn(spec.getDefaultProps)) {
		Klass.defaultProps =  spec.getDefaultProps()
	}
	Klass.displayName = spec.displayName
	mixins.pop()
	spec.mixins = mixins
	return Klass
}

export default createClass