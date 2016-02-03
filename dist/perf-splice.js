
var stack = []
var items = [1, 2]

console.time('test')
for (var i = 0; i < 50000; i++) {
	//stack.splice.apply(stack, [0, 0].concat(items))
	//stack = items.concat(stack)
	stack.unshift.apply(stack, items)
}
console.timeEnd('test')
console.log(stack.length)