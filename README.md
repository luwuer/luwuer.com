## 构建思想

本项目核心思想是**模块懒加载化**，我把模块分为两类：
1. 基础模块，提供框架和 UI 库，单个
2. 附加模块，业务属性独立的功能或项目，多个

基础模块提供插槽，插槽允许拥有合法接口的附加模块插入，他有如下特性：
- 初始状态插槽是空的，需要访问附加模块时浏览器才会下载它们，所以不用担心模块增多导致首屏加载变慢 （模块懒加载）
- 基础模块和附加模块独立打包，所以不用担心修改一个模块就必须重新打包所有模块 （模块为什么可以懒加载）
- 一旦附加模块被下载，基础模块就会立即注册它们 （模块独立打包后为什么能运行）
- 项目拥有单页风格，即模块之间通过路由跳转 （相对于模块单独部署的优势）


## 附加模块列表

- 一个有意义的登录界面 `Vue`
  - 代码地址：https://github.com/luwuer/luwuer.com/blob/luwuer.com/src/modules/demo
  - 演示地址：https://www.luwuer.com/mod/demo/login

- 像素绘板 `Vue` `Koa2` `Mongodb` 
  - 前端代码地址：https://github.com/luwuer/luwuer.com/blob/luwuer.com/src/modules/pixel
  - 后端代码地址：https://github.com/luwuer/luwuer.com.pixel.server
  - 演示地址：https://www.luwuer.com/mod/pixel/board
  
## 使用

``` bash
# 安装依赖
yarn

# 启动开发服务
yarn dev

# 打包基础模块
yarn build

# 打包附加模块
yarn mod {modNameA} {modNameB} {...}

# 打包公共库
yarn dll
```
