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

mongoose.connect(process.env.MONGODB_URL||'mongodb://localhost/WeatherDB');


app.use('/',api)

const PORT = 8080
app.listen(process.env.PORT || PORT);