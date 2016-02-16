import { updateQueue } from './Component'
import { eventNameAlias, notBubbleEvents } from './constant'

let getEventName = key => {
	key = eventNameAlias[key] || key
	return key.toLowerCase()
}

let eventTypes = {}
export let addEvent = (elem, eventType, listener) => {
	eventType = getEventName(eventType)

	if (notBubbleEvents[eventType] === true) {
		elem[eventType] = listener
		return
	}

	let eventStore = elem.eventStore || (elem.eventStore = {})
	eventStore[eventType] = listener

	if (!eventTypes[eventType]) {
		// onclick -> click
		document.addEventListener(eventType.substr(2), dispatchEvent)
		eventTypes[eventType] = true
	}

	if (eventType === 'onchange') {
		addEvent(elem, 'oninput', listener)
	}
}

export let removeEvent = (elem, eventType) => {
	eventType = getEventName(eventType)
	if (notBubbleEvents[eventType] === true) {
		elem[eventType] = null
		return
	}

	let eventStore = elem.eventStore || (elem.eventStore = {})
	delete eventStore[eventType]

	if (eventType === 'onchange') {
		delete eventStore['oninput']
	}
}

let dispatchEvent = event => {
	let { target, type } = event
	let eventType = 'on' + type
	let syntheticEvent
	updateQueue.isPending = true
	while (target) {
		let { eventStore } = target
		let listener = eventStore && eventStore[eventType]
		if (!listener) {
			target = target.parentNode
			continue
		}
		if (!syntheticEvent) {
			syntheticEvent = {}
			syntheticEvent.nativeEvent = event
			for (let key in event) {
				syntheticEvent[key] = typeof event[key] === 'function'
				? event[key].bind(event)
				: event[key]
			}
		}
		syntheticEvent.currentTarget = target
		listener.call(target, syntheticEvent)
		target = target.parentNode
	}
	updateQueue.batchUpdate()
}