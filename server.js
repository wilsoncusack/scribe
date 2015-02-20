var http = require('http');
var express = require('express');
var pg = require('pg');
var fs = require('fs');
var app = express();
var server = http.createServer(app);
require('shelljs/global');


app.set('port', (process.env.PORT || 5000));



app.get('/newDrawing' , function(request, response){
  response.send('Hello!');
  console.log('helloaaaa')
  svg = request.query.svg
  pg.connect("postgres://tubitwuvyutxtk:yRxIUwIPnN7AE7jkAYP9Nj8Vwj@ec2-184-73-165-193.compute-1.amazonaws.com:5432/d5qfkm0tdfjdum?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory", function(err, client) {
   if(err){
      console.log(err)
    } else {
     var query = client.query('INSERT INTO drawings (drawing, source) VALUES ($1);', [svg, 3]);
    }
  });
});


//
server.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

