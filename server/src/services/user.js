/**
 * @description 用户业务操作
 */
const validator = require('validator')
const userModel = require('../models/user')
const userErrorCode = require('../assets/codes/user')

module.exports = {
  /**
   * @description 创建用户
   */
  async create(user) {
    let result = await userModel.create(user)
    return result
  },
  /**
   * @description 注册校验
   */
  async signUpValidator(user) {
    let result = {
      success: false,
      message: ''
    }

    if (!/[\u4e00-\u9fa5a-z0-9\-_]{1,16}/.test(user.name)) {
      result.message = userErrorCode.ERROR_USER_NAME
      return result
    }

    if (validator.isEmail(user.email)) {
      result.message = userErrorCode.ERROR_EMAIL
      return result
    }

    result.success = true
    return result
  }
}
