const fs = require('fs')

/**
 * @description 遍历目录下文件，返回符合后缀名的的文件
 * @param  {string} pathResolve 需进行遍历的目录路径
 * @param  {string} mime 指定后缀名
 * @return {object} 返回遍历后的目录结果
 */
const walkFile = function (pathResolve, mime) {
  let files = fs.readdirSync(pathResolve)
  let fileList = {}

  for (let item of files) {
    let itemArr = item.split('.')
    if (mime === itemArr[itemArr.length - 1]) {
      fileList[item] = pathResolve + item
    }
  }

  return fileList
}

/**
 * @description 获取sql目录下所有sql文件
 * @return {object}
 */
function getSqlMap() {
  let basePath = __dirname
  basePath = basePath.replace(/\\/g, '/').replace(/\w+$/, 'sql/')

  return walkFile(basePath, 'sql')
}

module.exports = getSqlMap
