const webpack = require('webpack')
const config = require('./config')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    open: true,
    compress: true,
    port: config.development.port,
    hot: true,
    hotOnly: false, // HMR 构建失败时刷新页面
    historyApiFallback: true, // 任意的 404 响应都被替代为 index.html
    clientLogLevel: 'none',
    stats: 'minimal',
    inline: true,
    proxy: {
      '/api': {
        target: 'http://43.226.147.135:3000/', // 三丰云
        // target: 'http://45.76.209.110:3000/', // Tokyo
        // target: 'http://127.0.0.1:3000/',
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  optimization: {
    usedExports: true,
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}
