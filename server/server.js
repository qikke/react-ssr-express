const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const seesion = require('react-dom/server')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const { join } = require('path')

const isDev = process.env.NODE_ENV === 'development'
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(seesion({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false,
  saveUninitialized: false,
  secret: 'react cnode class'
}))

app.use(favicon(join(__dirname, '../favicon.ico')))

if (!isDev) {
  const serverEntry = require('../dist/server-entry').default
  const template = fs.readFileSync(join(__dirname, '../dist/index.html'), 'utf8')
  app.use('/public', express.static(join(__dirname, '../dist')))
  app.get('*', function (req, res) {
    const appString = ReactSSR.renderToString(serverEntry)
    res.send(template.replace('<!-- app -->', appString))
  })
} else {
  const devStatic = require('./util/dev-static')
  devStatic(app)
}

app.listen(8099, function () {
  console.log('server is listening on 8099')
})
