const express = require('express');
const app = express();
const config = require('./helpers/config');

app.use('/views', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

app.get('/',(req,res)=>{
	// res.sendFile(__dirname + '/index.html');
	res.redirect('views/index.html');
});

const server = app.listen(config.port);
const io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
	io.emit('hello');
	socket.on('chat message', function(msg){
      io.emit('chat message', msg);
	});
	socket.on('disconnected',function(user){
		socket.broadcast.emit('disconnected',user);
	});
  });


  
