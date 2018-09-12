const path = require('path')
// console.log(__dirname)
// console.log(path.resolve('src'))

const Module = require('module')
// const re = Module.prototype.require
const aliasMap = {
  '@': 'js'
}

Module.prototype.require = dir => {
  let alias = dir.match(/^@\w*(?=\/)/)[0]
  if (aliasMap[alias]) {
    // dir = dir.replace(alias, aliasMap[alias])
    dir = path.resolve(aliasMap[alias], dir.replace(`${alias}/`, ''))
  }
  console.log(dir)
  return Module._load(dir, this)
  // return require(dir)
}

const say = require('@/utils.js')

// const say = require('./js/utils.js')

say('Hello world')
