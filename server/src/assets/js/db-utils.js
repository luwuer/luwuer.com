const { query } = require('../../../init/util/db.js')
console.log(query)

let insertData = function (table, values) {
  let _sql = 'INSERT INTO ?? SET ?'
  return query(_sql, [table, values])
}

module.exports = {
  insertData
}
