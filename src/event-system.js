import jQuery from 'jquery'
import { updateQueue } from './Component'
import { eventNameAlias, notBubbleEvents } from './constant'

let $ = jQuery

export let getEventName = key => {
	key = eventNameAlias[key] || key
	return key.toLowerCase()
}

let eventTypes = {}
export let addEvent = (elem, eventType, listener) => {
	eventType = getEventName(eventType)

	if (notBubbleEvents[eventType] === true) {
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

	if (eventType === 'onchange' && (elem.nodeName === 'INPUT' || elem.nodeName === 'TEXTAREA')) {
		if ('oninput' in elem) {
			addEvent(elem, 'oninput', listener)
		} else if ('onpropertychange' in elem) {
			addEvent(elem, 'onpropertychange', function(event) {
				let nativeEvent = event.originalEvent
				let propertyName = nativeEvent.propertyName
				propertyName === 'value' && listener.call(this, event)
			})
		}
	}
}

export let removeEvent = (elem, eventType) => {
	eventType = getEventName(eventType)
	if (notBubbleEvents[eventType] === true) {
		$(elem).off(eventType.substr(2) + '.react')
		return
	}

	let eventStore = elem.eventStore || (elem.eventStore = {})
	delete eventStore[eventType]

	if (eventType === 'onchange' && (elem.nodeName === 'INPUT' || elem.nodeName === 'TEXTAREA')) {
		if ('oninput' in elem) {
			delete eventStore['oninput']
		} else if ('onpropertychange' in elem) {
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
