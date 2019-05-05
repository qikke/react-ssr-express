const { join } = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig, {
  mode: 'production',
  entry: {
    app: join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js'
  },

  plugins: [
    new HTMLPlugin({
      template: join(__dirname, '../client/template.html')
    })
  ]
})

// localhost:8888/filename 可以访问到dist目录下的文件
if (isDev) {
  config.mode = 'development'
  config.entry = {
    app: [
      'react-hot-loader/patch',
      join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    // 比127.0.0.1 或 localhost 合适？
    host: '0.0.0.0',
    port: '8888',
    contentBase: join(__dirname, '../dist'),
    hot: true,
    // 黑色遮布
    overlay: {
      errors: true
    },
    publicPath: '/public',
    historyApiFallback: {
      index: '/public/index.html'
    }
    // proxy: {
    //   '**': {
    //     target: 'http://localhost:8099',
    //     secure: false,
    //     changeOrigin: true
    //   }
    // }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
