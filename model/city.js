const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
    name:String,
    temperature:Number,
    condition:String,
    conditionPic:String,
    exists:Boolean
})

const Citys = mongoose.model('Citys',citySchema)

module.exports = Citys
