var http = require('http');
var express = require('express');
var pg = require('pg');
var fs = require('fs');
var app = express();
var server = http.createServer(app);


app.set('port', (process.env.PORT || 5000));


app.get('/newDrawing' , function(request, response){
    response.send('Hello!');
    pg.connect("postgres://tubitwuvyutxtk:yRxIUwIPnN7AE7jkAYP9Nj8Vwj@ec2-184-73-165-193.compute-1.amazonaws.com:5432/d5qfkm0tdfjdum?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory", function(err, client) {
           var query = client.query('SELECT * FROM drawings ORDER BY id desc LIMIT 1;', function(err, result){
            //console.log(result)
            console.log(result.rows[0].id)
            fs.writeFile("use.svg", result.rows[0].drawing, function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("The file was saved!");
                }
            }); 
           });
        });

    });


//
server.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

