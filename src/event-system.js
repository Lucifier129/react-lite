import { updateQueue } from './Component'

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
	oncontextmenu: isNotBubble
}

let eventTypes = {}

export let addEvent = (elem, eventType, listener) => {
	eventType = getEventName(eventType)
	let isNotBubble = notBubbleEvents[eventType]

	if (isNotBubble) {
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
	let isNotBubble = notBubbleEvents[eventType]

	if (isNotBubble) {
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