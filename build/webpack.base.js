const { join } = require('path')

module.exports = {
  output: {
    path: join(__dirname, '../dist'),
    // 静态资源前缀
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
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
