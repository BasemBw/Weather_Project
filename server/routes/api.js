const express = require('express')
const router = express.Router()
const Citys = require('../../model/city')
const request = require('request')

router.get('/city',function(req,res){
    let URL = ""
    if(req.query.long!='undefined'&&req.query.lat!='undefined'){
        URL = `https://api.openweathermap.org/data/2.5/weather?lat=${req.query.long}&lon=${req.query.lat}&appid=2762f70f13209fe19e1f7c60b2071f17`
    }else if(req.query.city!='undefined'){
        URL = `https://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&units=metric&appid=2762f70f13209fe19e1f7c60b2071f17`
    }
   request(URL,function(err,response,body){
    if (err) {
        res.status(404).send("city not found")
      }      
    let cityObj = {
             name:JSON.parse(response.body).name,
             temperature:JSON.parse(response.body).main.temp,
             condition:JSON.parse(response.body).weather[0].description,
             conditionPic:JSON.parse(response.body).weather[0].icon,
             exists:false
         }  
      res.status(200).send(cityObj)
   })
})

router.get('/cities',function(req,res){
    let citysData = Citys.find({})
    citysData.then(function(citys){
        res.send(citys)
    })
})

router.post('/city',function(req,res){
    let cityData = req.body.cityData
    let city = new Citys({
        name:cityData.name,
        temperature:parseFloat(cityData.temperature),
        condition:cityData.condition,
        conditionPic:cityData.conditionPic,
        exists:true
    })
    city.save()
    Citys.find({},function(err,cities){
        res.status(204).send(cities)
    })
})

router.delete('/city/:cityName',function(req,res){
    Citys.deleteOne({ name: req.params.cityName }, function (err) {
        if (err){
            res.status(404).send("Error While delete!")
        }
        res.status(204).send("Delet Succeed!")
      });
})


module.exports = router