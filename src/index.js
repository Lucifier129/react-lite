import hyperscript from './hyperscript'
import create from './create'
import diff from './diff'
import patch from './patch'

export default {
	diff,
	patch,
	h: hyperscript,
	create,
	createElement: hyperscript
}
