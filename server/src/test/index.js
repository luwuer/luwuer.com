const {aliasMap, addAlias} = require('../assets/js/require-reload.js')
console.log(aliasMap)
console.log(addAlias)
addAlias({
  '@js': './js'
})

const say = require('@js/utils.js')
require('@js/temp.js')

// const say = require('./js/utils.js')

say('Hello world')
