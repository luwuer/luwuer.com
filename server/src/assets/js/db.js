const mysql = require('mysql')
const config = require('../../../config')

// 创建数据池
const pool = mysql.createPool({
  host: config.database.HOST, // 数据库地址
  user: config.database.USERNAME, // 数据库用户
  password: config.database.PASSWORD, // 数据库密码
  database: config.database.DATABASE // 选中数据库
})

// 在数据池中进行会话操作
let query = (sql, values) => {
  return new Promise(resolve => {
    pool.getConnection(function (connectErr, connection) {
      if (connectErr) throw connectErr.message

      connection.query(sql, values, (sqlErr, rows) => {
        if (sqlErr) throw sqlErr.message

        resolve(rows)
        connection.release()
      })
    })
  })
}

module.exports = {
  query
}
