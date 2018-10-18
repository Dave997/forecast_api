/* 
    Davide ambrosi SE2
    Create a server to get forecast API 
*/
//? mapquest 
//? sunrise-sunset.org
//* input fields: state, city
//* output: sunset/sunset time + local forecast

var http = require('http');
var https = require('https');
var port = 3000;
var bodyParser = require('body-parser');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
/*
var requestHandler = function(request, response){
      console.log(request.url);

      http.get('/', function(resp){

            resp.on("data", function(chunk){
                  data += chunk;
            });
      
            resp.on("end", function(){
                  if (request.method === 'POST') {
                        var data = '';
                        var app_key = "eMKrrKGjAppIVAcuXL1NYqWIWEGbMVtR";
                        var ret = 'City not found :(';
      
                        var country = request.body.country;
                        var city = request.body.city;
      
                        var url = ('http://www.mapquestapi.com/geocoding/v1/address?key='
                        + app_key
                        +'&location='
                        + city
                        + ','
                        + country);
      
                        console.log(country);
                        console.log(city);
                        console.log(url);
      
                        http.get(url, function(resp){
                              //receive chunks
                              resp.on("data", function(chunk){
                                    data += chunk;
                              });
      
                              resp.on("end", function(){
                                    var obj = JSON.parse(data);
      
                                    var lat = obj.results[0].locations[0].displayLatLng.lat;
                                    var lng = obj.results[0].locations[0].displayLatLng.lng;
                                    
                                    url = "https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng;
                                    https.get(url, function(resp){
                                          var data = '';
                              
                                          //receive chunks
                                          resp.on("data", function(chunk){
                                                data += chunk;
                                          });
                              
                                          resp.on("end", function(){
                                                var obj = JSON.parse(data);
                              
                                                var result = '<html><head>';
                                                result += '<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">';
                                                result += '</head><body><table class="table">';
                                                result += '<tr><th>Sunset</th><th>Sunrise</th></tr>';
                                                result += '<tr><td>' + obj.results.sunset + '</td><td>' + obj.results.sunrise + '</td></tr>';
                                                result += '</table></body></html>';
      
                                                console.log(obj.results);
      
                                                response.end(result);
                                          });
                                    }).on("error", function(err){
                                          response.end(ret);
                                    });
                              });
                        }).on("error", function(err){
                              response.end(ret);
                        });
                  }
                  else 
                  {
                        response.end(`
                              <!doctype html>
                              <html>
                              <head>
                                    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
                              </head>
                              <body>
                                    <h2>Check sunset and sunrise hour of your city! </h2>
                                    <form action="/" method="post">
                                          <div class="form-group">
                                                <input type="text" country="country" class="form-control"/><br />
                                                <input type="text" city="city" class="form-control"/><br />
                                                <button>Check</button>
                                          </div>
                                    </form>
                              </body>
                              </html>
                        `);
                  }
                  
            });

      }).on("error", function(err){
            response.end(ret);
      });
}
*/
app.post('/', urlencodedParser, function (req, res){
      var data = '';
      var app_key = "eMKrrKGjAppIVAcuXL1NYqWIWEGbMVtR";
      var ret = 'City not found :(';

      var country = req.body.country;
      var city = req.body.city;

      var url = ('http://www.mapquestapi.com/geocoding/v1/address?key='
      + app_key
      +'&location='
      + city
      + ','
      + country);

      console.log(country);
      console.log(city);
      console.log(url);

      http.get(url, function(resp){
            //receive chunks
            resp.on("data", function(chunk){
                  data += chunk;
            });

            resp.on("end", function(){
                  var obj = JSON.parse(data);

                  var lat = obj.results[0].locations[0].displayLatLng.lat;
                  var lng = obj.results[0].locations[0].displayLatLng.lng;
                  
                  url = "https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng;
                  https.get(url, function(resp){
                        var data = '';
            
                        //receive chunks
                        resp.on("data", function(chunk){
                              data += chunk;
                        });
            
                        resp.on("end", function(){
                              var obj = JSON.parse(data);
            
                              var result = '<html><head>';
                              result += '<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">';
                              result += '</head><body><div class ="container"><table class="table">';
                              result += '<tr><th>Sunset</th><th>Sunrise</th></tr>';
                              result += '<tr><td>' + obj.results.sunset + '</td><td>' + obj.results.sunrise + '</td></tr>';
                              result += '</table></div></body></html>';

                              console.log(obj.results);

                              res.end(result);
                        });
                  }).on("error", function(err){
                        res.end(ret);
                  });
            });
      }).on("error", function(err){
            res.end(ret);
      });
});

app.get('/', function (req, res) {
      var html= (`
            <!doctype html>
            <html>
            <head>
                  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
            </head>
            <body>
                  <div class ="container">
                        <h2>Check sunset and sunrise hour of your city! </h2>
                        <form action="/" method="post">
                              <div class="form-group">
                                    <input type="text" country="country" class="form-control"/><br />
                                    <input type="text" city="city" class="form-control"/><br />
                                    <button>Check</button>
                              </div>
                        </form>
                  </div>
            </body>
            </html>
      `);
      res.send(html);
});

/*
var server = http.createServer(requestHandler);
server.listen(port);
*/

// Running Server Details.
var server = app.listen(3000, function () {
      var host = server.address().address
      var port = server.address().port
      console.log("Forecast app listening at %s:%s Port", host, port)
});