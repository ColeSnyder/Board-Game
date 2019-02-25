var fs =  require('fs');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const path = require('path');
var Player= []

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
});


// Everything below this line will have to do with Socket.io *********************************************

io.on('connection', function(socket) {
  console.log("Made socket connection" + socket.id)

  socket.on('object', function(data) {
    playerArray.push("player" + playerArray.length);
    console.log(playerArray.length);
    var num = playerArray.length;
      io.to(socket.id).emit("player"+num, num);
  });

  socket.on('P1Number', function(data) {
    io.emit('P1Number', data);
  });

  socket.on('P2Number', function(data) {
    io.sockets.emit('P2Number', data);
  });

  socket.on('P3Number', function(data) {
    io.emit('P3Number', data);
  });
  socket.on('P4Number', function(data) {
    io.emit('P4Number', data);
  });

  socket.on('sendPlayer', function(data) {
    Player.push(data)
    console.log(Player)
  });

});

// Player position array ********************************************************************************

var playerArray = new Array;
