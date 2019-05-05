const { join } = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: 'production',
  entry: {
    app: join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: join(__dirname, '../dist'),
    // 静态资源前缀
    publicPath: '/public/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          join(__dirname, '../node_modules')
        ]
      },
      {
        test: /\.(jsx)$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        exclude: [
          join(__dirname, '../node_modules')
        ]
      }
    ]
  },
  plugins: [
    new HTMLPlugin({
      template: join(__dirname, '../client/template.html')
    })
  ]
}

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
