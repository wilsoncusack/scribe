var http = require('http');
var express = require('express');
var pg = require('pg');
var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);


// pg.connect(process.env.DATABASE_URL, function(err, client) {
//   var query = client.query('SELECT * FROM messages');
//   query.on('row', function(row) {
//     console.log(JSON.stringify(row));
//   });
// });

// app.use(express.bodyParser()); // definitely use this feature

// app.configure(function() {
// 	app.use(express.static(__dirname));
// });

app.set('port', (process.env.PORT || 5000));

//Send homepage
app.get('/file/:name', function (req, res, next) {
  var fileName = req.params.name;
  res.sendFile(__dirname + "/" + fileName)
})

app.get('/chat' , function(request, response){
    response.sendfile(__dirname + '/chatroom.html');

    });

app.get('/newDrawing' , function(request, response){
    response.sendfile(__dirname + '/chatroom.html');
    pg.connect(process.env.DATABASE_URL, function(err, client) {
           var query = client.query('SELECT * FROM drawings ORDER BY date desc LIMIT 1;');
           console.log(query);
        });

    });

io.sockets.on('connection', function(socket){
    // clients emit this when they join new rooms
    socket.on('join', function(callback){

        // do something with room status ready here   
    });


    // the client emits this when they want to send a message
    socket.on('sendMessage', function(message){
        // process an incoming message (don't forget to broadcast it to everyone!)
        // pg.connect(process.env.DATABASE_URL, function(err, client) {
        //   var query = client.query('INSERT INTO messages (message) VALUES ($1);', [message.message]);
        // });
        io.sockets.emit('getMessage', message);
    });
});

// setInterval(function(){
  
//   io.sockets.emit('getMessage', {message: "How is your mother?"});
// }, 5000);

//
server.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

