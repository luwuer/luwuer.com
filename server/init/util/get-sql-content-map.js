const fs = require('fs')
const getSqlMap = require('./get-sql-map')

/**
 * @description 获取所有sql文件脚本内容
 * @return {object}
 */
function getSqlContentMap() {
  let sqlMap = getSqlMap()
  let sqlContentMap = {}
  for (let key in sqlMap) {
    sqlContentMap[key] = fs.readFileSync(sqlMap[key], 'binary')
  }

  return sqlContentMap
}

module.exports = getSqlContentMap
