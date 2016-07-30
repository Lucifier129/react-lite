import shallowEqual from './shallowEqual'
import Component from './Component'

export default function PureComponent(props, context) {
	Component.call(this, props, context)
}

PureComponent.prototype = Object.create(Component.prototype)
PureComponent.prototype.constructor = PureComponent
PureComponent.prototype.isPureReactComponent = true
PureComponent.prototype.shouldComponentUpdate = shallowCompare

function shallowCompare(nextProps, nextState) {
	return !shallowEqual(this.props, nextProps) ||
            !shallowEqual(this.state, nextState)
}