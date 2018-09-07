
const userErrorCode = {

  ERROR_USER_NAME: '用户名为3-25个字符，包括大小写字母和_',

  FAIL_USER_NAME_IS_EXIST: '用户名已被注册',

  ERROR_PASSWORD: '密码长度应该为6-16',

  ERROR_PASSWORD_CONFORM: '两次密码不一致',

  ERROR_EMAIL: '邮箱格式错误',

  FAIL_EMAIL_IS_EXIST: '邮箱已被注册',

  FAIL_USER_NAME_OR_PASSWORD_ERROR: '用户名或登录密码错误',

  FAIL_USER_NO_LOGIN: '用户未登录',

  FAIL_USER_NO_EXIST: '用户不存在'
}

module.exports = userErrorCode
