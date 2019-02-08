var fs =  require('fs');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
 const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', function(req, res){
   res.render('index');
});
  
app.get('*', function(req, res) {
  res.render('error');
});


http.listen(3001, function(){
  console.log('listening on *:3001');
});
