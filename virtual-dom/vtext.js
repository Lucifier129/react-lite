import * as _ from '../util'
import { VTEXT } from '../constant'

export let createVtext = text => ({
    vtype: VTEXT,
    text: text
})

export let initVtext = vtext => document.createTextNode(vtext.text)
export let updateVtext = (vtext, newVtext, textNode) => {
	if (vtext.text !== newVtext.text) {
		textNode.nodeValue = newVtext.text
	}
	return textNode
}