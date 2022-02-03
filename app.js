const express = require("express") ;
const https = require("https") ;
const bodyPaser = require("body-parser") ;

const app = express() ;

app.use(bodyPaser.urlencoded({extended : true})) ;

app.get("/" , function(req,res){
    res.sendFile(__dirname + "/index.html") ;
}) ;

app.post("/" , function(req , res){
  const query = req.body.cityName ;
  const apiKey = "18fe1b954db5a93a11312e9dc4023d2a" ;
  const units = "metric" ;

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units ;
    https.get(url , function(response){
      response.on("data" , function(data){
        const weatherData = JSON.parse(data) ;
        //JSON.stringify(weatherData) ;

        const temp = weatherData.main.temp ;
        const weatherDescription = weatherData.weather[0].description ;
        const icon = weatherData.weather[0].icon ;
        const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png" ;

        res.write("<p>The temperature Description in " + query + " is " + weatherDescription + ".</p>");
        res.write("<h1>The temperature in " + query + " is " + temp + " degress Celcius.</h1>");
        res.write("<img src =" + imageURL + ">") ;
        res.send() ;
      }) ;
    }) ;


}) ;


app.listen(3000 , function(){
  console.log("Server at port 3000") ;
})  ;
