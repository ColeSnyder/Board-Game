var fs =  require('fs');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/player1', function(req, res){
  console.log('Routing to index1.ejs')
 res.render('player1');
});
app.get('/player2', function(req, res){
  console.log('Routing to index2.ejs')
 res.render('player2');
});
app.get('/player3', function(req, res){
  console.log('Routing to index3.ejs')
 res.render('player3');
});
app.get('/player4', function(req, res){
  console.log('Routing to index4.ejs')
 res.render('player4');
});
  
app.get('*', function(req, res) {
  res.render('error');
});

server.listen(3001, '0.0.0.0', function(){
  console.log('listening on *:3001');
  // app.use(player1router);
});


// Everything below this line will have to do with Socket.io *********************************************

io.on('connection', function(socket) {
  console.log("Made socket connection", socket.id);
  socket.on('object', function(data) {
    io.sockets.emit('object', data);
  });
  socket.on('joinRequest', function(data) {
    playerArray.append("player"+playerArray.length);
    console.log(playerArray.length);
    socket.emit(window.location.assign("192.168.0.17:3001/player"+playerArray.length));


  });
});

// Player position array ********************************************************************************

var playerArray = new Array;



