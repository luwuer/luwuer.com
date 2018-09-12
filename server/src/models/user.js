const dbUtils = require('/asets/js/utils.js')

/**
 * @description 新增用户
 * @param {Object} model 用户数据模型
 */
async function create(model) {
  let result = await dbUtils.insertData('user', model)
}

module.exports = {
  create
}
