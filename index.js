var fs =  require('fs');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);




app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
  


http.listen(3001, function(){
  console.log('listening on *:3001');
});
