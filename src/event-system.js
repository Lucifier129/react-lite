import { updateQueue } from './Component'

let matchHandler = event => {
	let { path, type } = event
	let eventType = 'on' + type
	let syntheticEvent
	for (let i = 0, len = path.length; i < len; i++) {
		let elem = path[i]
		let { eventStore } = elem
		let listener = eventStore && eventStore[eventType]
		if (listener) {
			if (!syntheticEvent) {
				syntheticEvent = {}
				for (let key in event) {
					if (typeof event[key] === 'function') {
						syntheticEvent[key] = (...args) => event[key](...args)
					} else {
						syntheticEvent[key] = event[key]
					}
				}
				syntheticEvent.nativeEvent = event
			}
			syntheticEvent.currentTarget = elem
			updateQueue.isPending = true
			listener.call(elem, syntheticEvent)
			updateQueue.batchUpdate()
		}
	}
}

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
		document.addEventListener(eventType.substr(2), matchHandler)
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








