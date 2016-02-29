import { DIFF_TYPE, VNODE_TYPE } from './constant'
import * as _ from './util'

let diff = (vnode, newVnode) => {
	if (vnode === newVnode) {
	    return
	} else if (newVnode === undefined) {
	    return DIFF_TYPE.REMOVE
	} else if (vnode === undefined) {
	    return DIFF_TYPE.CREATE
	} else if (vnode.type !== newVnode.type) {
	    return DIFF_TYPE.REPLACE
	} else if (newVnode.key !== null) {
		return vnode.key === null || newVnode.key !== vnode.key
		? DIFF_TYPE.REPLACE
		: DIFF_TYPE.UPDATE
	} else if (vnode.key !== null) {
		return DIFF_TYPE.REPLACE	
	}
	return DIFF_TYPE.UPDATE
}

export default diff