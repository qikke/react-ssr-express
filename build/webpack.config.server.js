const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const { join } = require('path')

module.exports = webpackMerge(baseConfig, {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  target: 'node',
  entry: {
    app: join(__dirname, '../client/server-entry.js')
  },
  externals: Object.keys(require('../package.json').dependencies),
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2'
  }
})
