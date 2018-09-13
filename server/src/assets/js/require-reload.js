const config = require('../../../config.js')
const path = require('path')

const Module = require('module')
const aliasMap = {
  '@': config.root
}

Module.prototype.require = dir => {
  let matchArr = dir.match(/^@\w*(?=\/)/)
  if (matchArr) {
    let alias = matchArr[0]
    if (aliasMap[alias]) {
      dir = path.resolve(aliasMap[alias], dir.replace(`${alias}/`, ''))
    }
    return Module._load(dir, this)
  }

  return require(dir, this)
}

function addAlias(obj) {
  Object.assign(aliasMap, obj)
}

module.exports = {
  addAlias
}
