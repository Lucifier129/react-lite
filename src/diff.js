import { DIFF_TYPE, VNODE_TYPE } from './constant'
import * as _ from './util'

let diff = (vnode, newVnode) => {
	let type
	switch (true) {
		case vnode === newVnode:
			return type
		case _.isUndefined(newVnode):
			type = DIFF_TYPE.REMOVE
			break
		case _.isUndefined(vnode):
			type = DIFF_TYPE.CREATE
			break
		case vnode.type !== newVnode.type:
			type = DIFF_TYPE.REPLACE
			break
		case newVnode.key !== null:
			if (vnode.key === null || newVnode.key !== vnode.key) {
				type = DIFF_TYPE.REPLACE
			} else {
				type = DIFF_TYPE.UPDATE
			}
			break
		case vnode.key !== null:
			type = DIFF_TYPE.REPLACE
			break
		default:
			type = DIFF_TYPE.UPDATE
	}
	return type
}

export default diff