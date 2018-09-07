const getSqlContentMap = require('./util/get-sql-content-map')
const { query } = require('./util/db')

// 日志打印
const serverLog = function (err, fileName, index) {
  if (err) {
    console.error(`[ERROR] sql脚本文件: ${fileName} 第${index + 1}条脚本 执行失败 o(╯□╰)o ！`)
  } else {
    console.log(`[SUCCESS] sql脚本文件: ${fileName} 第${index + 1}条脚本 执行成功 O(∩_∩)O !`)
  }
}

// 获取sql
let sqlContentMap = getSqlContentMap()

// 执行sql
const executeAllSql = async () => {
  for (let key in sqlContentMap) {
    let shell = sqlContentMap[key]
    let shellList = shell.split(';')

    for (let [index, shell] of shellList.entries()) {
      if (shell.trim()) {
        let result = await query(shell)
        if (result.serverStatus * 1 === 2) {
          serverLog(null, key, index)
        } else {
          serverLog(true, key, index)
        }
      }
    }
  }
  console.log('sql脚本执行结束！')
}

executeAllSql()
