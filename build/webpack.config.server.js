const { join } = require('path')

module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  target: 'node',
  entry: {
    app: join(__dirname, '../client/server-entry.js')
  },
  output: {
    filename: 'server-entry.js',
    path: join(__dirname, '../dist'),
    // 静态资源前缀
    publicPath: '/public/',
    libraryTarget: 'commonjs2'
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
  }
}
