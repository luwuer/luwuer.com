const path = require('path')

console.log(__dirname)

console.log('---')

console.log(path.join(''))
console.log(path.join('./js'))
console.log(path.join('js', 'utils.js'))
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux'))
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'))

console.log('---')

console.log(path.resolve(''))
console.log(path.resolve('js'))
console.log(path.resolve('js', 'utils.js'))
console.log(path.resolve('js', '../../'))
