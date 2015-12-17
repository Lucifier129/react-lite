import { DIFF_TYPE: type } from './constant'
import * as _ from './util'

let diff = (vnode, newVnode) => {
	let type
	switch (true) {
		case vnode === newVnode:
			return null
		case _.isUndefined(newVnode):
			type = type.REMOVE
			break
		case _.isUndefined(vnode):
			type = type.CREATE
			break
		case vnode === null || newVnode === null || vnode.type !== newVnode.type:
			type = type.REPLACE
			break
		case hasKey(newVnode):
			if (!hasKey(vnode) || newVnode.props.key !== vnode.props.key) {
				type = type.REPLACE
			} else {
				type = type.UPDATE
			}
			break
		case hasKey(vnode):
			type = type.REPLACE
			break
	}
}

export default diff