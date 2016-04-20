var app = require('express')();
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var $ = require('jquery');
var io = require('socket.io')(http);

var errors = [];

app.use(express.static(__dirname + '/public'));

app.use(bodyParser());

//app.get('/jquery.js', function (req, res) {
//    res.sendFile(__dirname + '/node_modules/jquery/dist/jquery.js');
//})

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

io.on('connection', function(socket) {

});

app.post('/api/error', function (req, res) {
    var error = req.body.error;

    errors.push(error);

    io.sockets.emit('app:error', error);

    res.sendStatus(200);
});

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });



http.listen(3000, function(){
  console.log('listening on *:3000');
});