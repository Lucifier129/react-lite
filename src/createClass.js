import * as _ from './util'
import Component from './Component'

function eachMixin (mixins, iteratee) {
	_.eachItem(mixins, mixin => {
		if (mixin) {
			if (_.isArr(mixin.mixins)) {
				eachMixin(mixin.mixins, iteratee)
			}
			iteratee(mixin)
		}
	})
}

function combineMixinToProto(proto, mixin) {
	for (let key in mixin) {
		if (!mixin.hasOwnProperty(key)) {
			continue
		}
		let value = mixin[key]
		if (key === 'getInitialState') {
			proto.$getInitialStates.push(value)
			continue
		}
		let curValue = proto[key]
		if (_.isFn(curValue) && _.isFn(value)) {
			proto[key] = _.pipe(curValue, value)
		} else {
			proto[key] = value
		}
	}
}

function combineMixinToClass(Component, mixin) {
	_.extend(Component.propTypes, mixin.propTypes)
	_.extend(Component.contextTypes, mixin.contextTypes)
	_.extend(Component, mixin.statics)
	if (_.isFn(mixin.getDefaultProps)) {
		_.extend(Component.defaultProps, mixin.getDefaultProps())
	}
}

function bindContext(obj, source) {
	for (let key in source) {
		if (source.hasOwnProperty(key)) {
			if (_.isFn(source[key])) {
				obj[key] = source[key].bind(obj)
			}
		}
	}
}

let Facade = function() {}
Facade.prototype = Component.prototype

function getInitialState() {
	let state = {}
	let setState = this.setState
	this.setState = Facade
	_.eachItem(this.$getInitialStates, getInitialState => {
		if (_.isFn(getInitialState)) {
			_.extend(state, getInitialState.call(this))
		}
	})
	this.setState = setState
	return state
}

export default function createClass(spec) {
	if (!_.isFn(spec.render)) {
		throw new Error('createClass: spec.render is not function')
	}
	let specMixins = spec.mixins || []
	let mixins = specMixins.concat(spec)
	spec.mixins = null
	function Klass(props, context) {
		Component.call(this, props, context)
		this.constructor = Klass
		spec.autobind !== false && bindContext(this, Klass.prototype)
		this.state = this.getInitialState() || this.state
	}
	Klass.displayName = spec.displayName
	Klass.contextTypes = {}
	Klass.propTypes = {}
	Klass.defaultProps = {}
	let proto = Klass.prototype = new Facade()
	proto.$getInitialStates = []
	eachMixin(mixins, mixin => {
		combineMixinToProto(proto, mixin)
		combineMixinToClass(Klass, mixin)
	})
	proto.getInitialState = getInitialState
	spec.mixins = specMixins
	return Klass
}