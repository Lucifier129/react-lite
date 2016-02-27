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
			syntheticEvent = createSyntheticEvent(event)
		}
		syntheticEvent.currentTarget = target
		listener.call(target, syntheticEvent)
		if (syntheticEvent.$cancalBubble) {
			break
		}
		target = target.parentNode
	}
	updateQueue.isPending = false
	updateQueue.batchUpdate()
}


let createSyntheticEvent = nativeEvent => {
    let syntheticEvent = {}
    let cancalBubble = () => syntheticEvent.$cancalBubble = true
    syntheticEvent.nativeEvent = nativeEvent
    for (let key in nativeEvent) {
    	if (typeof nativeEvent[key] !== 'function') {
    		syntheticEvent[key] = nativeEvent[key]
    	} else if (key === 'stopPropagation' || key === 'stopImmediatePropagation') {
    		syntheticEvent[key] = cancalBubble
    	} else {
    		syntheticEvent[key] = nativeEvent[key].bind(nativeEvent)
    	}
    }
    return syntheticEvent
}
