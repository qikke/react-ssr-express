const { join } = require('path')

module.exports = {
  target: 'node',
  entry: {
    app: join(__dirname, '../client/server-entry.js')
  },
  output: {
    filename: 'server-entry.js',
    path: join(__dirname, '../dist'),
    // 静态资源前缀
    publicPath: '/public',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
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
