var io = require('socket.io'); // useless at the moment


var express = require('express');
var app = express();


var http = require('http').Server(app);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

http.listen(3000, function(){
    console.log('listenong on *:3000');
});
