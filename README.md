# luwuer.com

网站架构思路：基础模块提供插槽，用户想访问其余模块时动态把**打包后**的模块插到基础模板上，形成模块按需加载又可单独维护的结构，还能保留单页风格。

## Build Setup

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification
yarn build

# build modules
yarn mod {modNameA} {modNameB} {...}

# build dll
yarn dll
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
