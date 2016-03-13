import * as _ from '../util'
import { VCOMMENT } from '../constant'

export let createVcomment = text => ({
    vtype: VCOMMENT,
    text: text
})

export let initVcomment = vcomment => document.createComment(vcomment.text)