var app = require('express')();
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var $ = require('jquery');
var io = require('socket.io')(http);
var cors = require('cors');

var errors = [{id:'10'}];

app.use(cors());

app.use(express.static(__dirname + '/public'));

app.use(bodyParser());

var sampleErrors = [
// {"type": "user", "msg":"Error 1"},
// {"type": "app", "msg":"Error 2"},
// {"type": "app", "msg":"Error 3"},
// {"type": "user", "msg":"Error 4"},
// {"type": "user", "msg":"Error 5"},
// {"type": "app", "msg":"Error 6"},
// {"type": "user", "msg":"Error 7"},
];

var count = 0;
var x = 0;
var errorID = 0;



function deliverMsg () {
    // var msg; 

    // msg = JSON.stringify(sampleErrors[x]);
    
    io.sockets.emit('app:error', errors[x]);

    if (++x >= errors.length) {
        x = 0;
    }

    if (count++ < 10) {
        setTimeout(deliverMsg, 1000);
    }
}

//app.get('/jquery.js', function (req, res) {
//    res.sendFile(__dirname + '/node_modules/jquery/dist/jquery.js');
//})

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

io.on('connection', function(socket) {
    socket.emit('app:init', errors);
    // deliverMsg();
});

app.get('/api/error', function (req, res) {
    res.json(errors);
});

app.get('/api/error/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var found = false;
    var count = 0;

    console.log("Get Error from ID", id);
    while (parseInt(errors[count].id) !== id) {
        console.log(errors[count].id," ",id)
        if (count >= errors.length) {
            res.sendStatus(405);
            return;
        }

        count++;
    }

    res.json(errors[count]);

});


app.post('/api/error', function (req, res) {
    var error = req.body.error;
    var holding = new Date().toLocaleString();

    holding = holding.split(', ');
    error.time = holding[1];

    error.date = holding[0];
    error.id = errorID++;
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