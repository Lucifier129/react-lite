import { DIFF_TYPE, VNODE_TYPE } from './constant'
import * as _ from './util'

let diff = (vnode, newVnode) => {
	let type
	switch (true) {
		case vnode === newVnode:
			return null
		case _.isUndefined(newVnode):
			type = DIFF_TYPE.REMOVE
			break
		case _.isUndefined(vnode):
			type = DIFF_TYPE.CREATE
			break
		case vnode === null || newVnode === null || vnode.type !== newVnode.type:
			type = DIFF_TYPE.REPLACE
			break
		case _.hasKey(newVnode):
			if (!_.hasKey(vnode) || newVnode.props.key !== vnode.props.key) {
				type = DIFF_TYPE.REPLACE
			} else {
				type = DIFF_TYPE.UPDATE
			}
			break
		case _.hasKey(vnode):
			type = DIFF_TYPE.REPLACE
			break
	}
	return type
}

export default diff