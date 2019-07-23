const router = require('koa-router')()

router.prefix('/test')

router.get('/', async ctx => {
  await ctx.render('index', {
    title: 'Hello koa 2!'
  })
})

router.get('/string', async ctx => {
  ctx.body = 'koa2 string'
})

router.get('/json', async ctx => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
