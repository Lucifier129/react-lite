'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _util = require('./util');

var _ = _interopRequireWildcard(_util);

var _Component = require('./Component');

var _Component2 = _interopRequireDefault(_Component);

var eachMixin = function eachMixin(mixins, iteratee) {
	_.eachItem(mixins, function (mixin) {
		if (_.isArr(mixin.mixins)) {
			eachMixin(mixin.mixins, iteratee);
		}
		iteratee(mixin);
	});
};

var combineMixinToProto = function combineMixinToProto(proto, mixin) {
	_.mapValue(mixin, function (value, key) {
		if (key === 'getInitialState') {
			proto.$getInitialStates.push(value);
			return;
		}
		var curValue = proto[key];
		if (_.isFn(curValue) && _.isFn(value)) {
			proto[key] = _.pipe(curValue, value);
		} else {
			proto[key] = value;
		}
	});
};

var combineMixinToClass = function combineMixinToClass(Component, mixin) {
	if (_.isObj(mixin.propTypes)) {
		_.extend(Component.propTypes, mixin.propTypes);
	}
	if (_.isFn(mixin.getDefaultProps)) {
		_.extend(Component.defaultProps, mixin.getDefaultProps());
	}
	if (_.isObj(mixin.statics)) {
		_.extend(Component, mixin.statics);
	}
};

var bindContext = function bindContext(obj, source) {
	_.mapValue(source, function (value, key) {
		if (_.isFn(value)) {
			obj[key] = value.bind(obj);
		}
	});
};

var Facade = function Facade() {};
Facade.prototype = _Component2['default'].prototype;

var getInitialState = function getInitialState() {
	var _this = this;

	var state = {};
	var setState = this.setState;
	this.setState = Facade;
	_.eachItem(this.$getInitialStates, function (getInitialState) {
		if (_.isFn(getInitialState)) {
			_.extend(state, getInitialState.call(_this));
		}
	});
	this.setState = setState;
	return state;
};

var createClass = function createClass(spec) {
	if (!_.isFn(spec.render)) {
		throw new Error('createClass: spec.render is not function');
	}
	var specMixins = spec.mixins || [];
	var mixins = specMixins.concat(spec);
	spec.mixins = null;
	function Klass(props) {
		_Component2['default'].call(this, props);
		this.constructor = Klass;
		spec.autobind !== false && bindContext(this, Klass.prototype);
		this.state = this.getInitialState() || this.state;
	}
	Klass.displayName = spec.displayName;
	Klass.propTypes = {};
	Klass.defaultProps = {};
	var proto = Klass.prototype = new Facade();
	var getInitialStates = proto.$getInitialStates = [];
	eachMixin(mixins, function (mixin) {
		combineMixinToProto(proto, mixin);
		combineMixinToClass(Klass, mixin);
	});
	proto.getInitialState = getInitialState;
	spec.mixins = specMixins;
	return Klass;
};

exports.createClass = createClass;
exports['default'] = createClass;