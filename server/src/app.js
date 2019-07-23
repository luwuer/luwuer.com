// https://chenshenhai.github.io/koa2-note/note/request/get.html

// const path = require('path')
// const views = require('koa-views')
// const koaStatic = require('koa-static')

// require('./assets/js/require-reload.js')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
// const session = require('koa-session-minimal')
// const MysqlStore = require('koa-mysql-session')

const useRoutes = require('./routes')
const config = require('../config')

// 重载require，添加别名
require('./assets/js/require-reload.js')

const app = new Koa()

// session存储配置
// const sessionMysqlConfig = {
//   user: config.database.USERNAME,
//   password: config.database.PASSWORD,
//   database: config.database.DATABASE,
//   host: config.database.HOST
// }

// 配置session中间件
// app.use(session({
//   key: 'USER_SID',
//   store: new MysqlStore(sessionMysqlConfig)
// }))

// 配置控制台日志中间件
app.use(koaLogger())

// 配置ctx.body解析中间件
app.use(bodyParser())

// 配置静态资源加载中间件
// app.use(koaStatic(
//   path.join(__dirname, './../static')
// ))

// 配置服务端模板渲染引擎中间件
// app.use(views(path.join(__dirname, './views'), {
//   extension: 'ejs'
// }))

// 路由
useRoutes(app)

// 监听启动端口
app.listen(config.port)
console.log(`the server is start at port ${config.port}`)
