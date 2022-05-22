const express = require('express')
const mongoose = require('mongoose')
const Citys = require('./model/city')
const api = require('./server/routes/api')
const path = require('path')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'dist')))

mongoose.connect("mongodb://localhost/WeatherDB")


app.use('/',api)

const port = 7070
app.listen(port,function(){})