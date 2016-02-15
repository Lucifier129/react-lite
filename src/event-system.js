import jQuery from 'jquery'
import { updateQueue } from './Component'
let $ = jQuery

let eventNameAlias = {
	onDoubleClick: 'ondblclick'
}
let getEventName = key => {
	key = eventNameAlias[key] || key
	return key.toLowerCase()
}

let isNotBubble = true
let notBubbleEvents = {
	onload: isNotBubble,
	onunload: isNotBubble,
	onscroll: isNotBubble,
	onfocus: isNotBubble,
	onblur: isNotBubble,
	onrowexit: isNotBubble,
	onbeforeunload: isNotBubble,
	onstop: isNotBubble,
	ondragdrop: isNotBubble,
	ondragenter: isNotBubble,
	ondragexit: isNotBubble,
	ondraggesture: isNotBubble,
	ondragover: isNotBubble,
	oncontextmenu: isNotBubble,
	onpropertychange: isNotBubble
}

let eventTypes = {}

export let addEvent = (elem, eventType, listener) => {
	eventType = getEventName(eventType)
	let isNotBubble = notBubbleEvents[eventType]

	if (isNotBubble) {
		$(elem).on(eventType.substr(2) + '.react', listener)
		return
	}

	let eventStore = elem.eventStore || (elem.eventStore = {})
	eventStore[eventType] = listener

	if (!eventTypes[eventType]) {
		// onclick -> click
		$(document).on(eventType.substr(2) + '.react', dispatchEvent)
		eventTypes[eventType] = true
	}

	if (eventType === 'onchange') {
		if ('oninput' in elem) {
			addEvent(elem, 'oninput', listener)
		} else {
			addEvent(elem, 'onpropertychange', function(event) {
				let nativeEvent = event.originEvent
				let propertyName = nativeEvent.propertyName
				propertyName === 'value' && listener.call(this, event)
			})
		}
	}
}

export let removeEvent = (elem, eventType) => {
	eventType = getEventName(eventType)
	let isNotBubble = notBubbleEvents[eventType]

	if (isNotBubble) {
		$(elem).off(eventType.substr(2) + '.react')
		return
	}

	let eventStore = elem.eventStore || (elem.eventStore = {})
	delete eventStore[eventType]

	if (eventType === 'onchange') {
		if ('oninput' in elem) {
			delete eventStore['oninput']
		} else {
			removeEvent(elem, 'onpropertychange')
		}
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
			syntheticEvent = event
			syntheticEvent.nativeEvent = event
		}
		syntheticEvent.currentTarget = target
		listener.call(target, syntheticEvent)
		target = target.parentNode
	}
	updateQueue.batchUpdate()
}