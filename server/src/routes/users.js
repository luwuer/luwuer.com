/**
 * @description 注册 user 模块路由
 * @author luwuer
 */

const router = require('koa-router')()
// const controller = require('../controllers/user')

router.prefix('/users')

// const routers = router
//   .get('/user-info', controller.getUserInfo)
//   .post('/sign-in', controller.signIn)
//   .post('/sign-up', controller.signUp)

router.get('/info', async ctx => {
  ctx.body = {
    name: 'luwuer',
    age: 1
  }
})

module.exports = router
