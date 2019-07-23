/**
 * @description 路由整合
 * @author luwuer
 */

const router = require('koa-router')()
const users = require('./users')
const test = require('./test')

module.exports = app => {
  app.use(users.routes())
  app.use(test.routes())
  router.use(router.allowedMethods())
}
