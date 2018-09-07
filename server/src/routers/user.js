/**
 * @description 注册 user 模块路由
 * @author luwuer
 */

const router = require('koa-router')()
const controller = require('../contrillers/user')

const routers = router
  .get('/user/user-info', controller.getUserInfo)
  .post('/user/sign-in', controller.signIn)
  .post('/user/sign-up', controller.signUp)

module.exports = routers
