var fs =  require('fs');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var socket = require('socket.io');
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(__dirname + '/public'));

// The following area will be where we take in info from index.html about which player the user will be
//****************************************************************************************************

var playerOrder = [];

const player1router = require('./routes/player1route.js');
const player2router = require('./routes/player2route.js');
const player3router = require('./routes/player3route.js');
const player4router = require('./routes/player4route.js');

//The following 4 lines are what we use to route each player. The first player to join 
//uses 'app.use(player1router)' and so forth until all players are routed to their respective 
//page. 
// app.use(player1router);
// app.use(player2router);
// app.use(player3router);
// app.use(player4router);

//****************************************************************************************************
  
app.get('*', function(req, res) {
  res.render('error');
});

server.listen(3001, function(){
  console.log('listening on *:3001');
  app.use(player1router);
});


//The following stuff will all have to due with socket.io setup/use ********************************

var io = socket(server);

io.on('connection', function(socket) {
  console.log("Made connection", socket.id);

  socket.on('object', function(data) {
    io.sockets.emit('object', data);
  });
});