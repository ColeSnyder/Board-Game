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

//*********************************************************************************************

// const player1router = require('./routes/player1route.js');
// const player2router = require('./routes/player2route.js');
// const player3router = require('./routes/player3route.js');
// const player4router = require('./routes/player4route.js');

//The following 4 lines are what we use to route each player. The first player to join 
//uses 'app.use(player1router)' and so forth until all players are routed to their respective 
//page. 
// app.use(player1router);
// app.use(player2router);
// app.use(player3router);
// app.use(player4router);

//*********************************************************************************************
  
app.get('*', function(req, res) {
  res.render('error');
});

server.listen(3001, function(){
  console.log('listening on *:3001');
  // app.use(player1router);
});
