var express = require('express');
var app = express();
var choices = require('./choices.json');

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//------

var votes = null;

var start = function (socket) {
    var rand = Math.floor(Math.random() * choices.length);
    console.log(choices[rand]);

    votes =  choices[rand];

    io.sockets.emit('votes', votes);
    votes.left.total = 0;
    votes.right.total = 0;
};

setInterval(function(){
    start();
}, 3000);
start();


//--------------------

io.on('connection', function(socket){
    socket.emit('votes', votes);

    socket.on('choice', function(what){
        if (what === 'left') {
            votes.left.total++;
        } else {
            votes.right.total++;
        }
        io.sockets.emit('total', votes);
    });

    socket.on('unchoice', function(what){
        if (what === 'left') {
            votes.left.total--;
        } else {
            votes.right.total--;
        }
        io.sockets.emit('total', votes);
    });



});

http.listen(3000, function(){
    console.log('listening on *:3000');
});