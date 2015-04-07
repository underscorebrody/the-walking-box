var express = require('express');
//var server = express.createServer();
// express.createServer()  is deprecated. 
var server = express(); // better instead
server.configure(function(){
  server.use('/build', express.static(__dirname + '/build'));
});

server.listen(process.env.PORT);