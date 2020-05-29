import express from 'express'
import mysql from 'mysql'
import bodyParser from 'body-parser'

import router from './routes/router'

import { mysqlConfig } from './config/mysqlConfig'

const app = express()
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))
app.use(router)

export const connection = mysql.createConnection(mysqlConfig)
connection.connect()

app.set('host', '10.161.4.205')
app.listen(7001, () => {
  console.log('app is running at port: 7001')
})
