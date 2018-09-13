const dbUtils = require('../assets/js/db-utils.js')

/**
 * @description 新增用户
 * @param {Object} model 用户数据模型
 */
async function create(model) {
  let result = await dbUtils.insertData('user', model)
  return result
}

console.log(create({
  email: 'abc',
  password: 1,
  name: '123'
}))

module.exports = {
  create
}
