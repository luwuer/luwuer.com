const userService = require('../services/user')
const userErrorCode = require('../assets/codes/user')

/**
 * @description 注册
 */
async function signUp(ctx) {
  let data = ctx.request.body
  let result = {
    succcess: false,
    message: '',
    data: null
  }

  let validateResult = userService.validateSignUp(data)
  if (validateResult.success === false) {
    return validateResult
  }

  return result
}

module.exports = {
  signUp
}
