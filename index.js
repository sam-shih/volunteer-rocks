const app = require('./server/index.js');
const port = process.env.PORT || 3000;
const dbConnect = require('./database/connectDb.js');

var server = app.listen(port, function() {
  console.log(`Listening on ${port}`);
});
const socketIO = require('socket.io')(server);
var nsp = socketIO.of('/jabroni');

nsp.on('connection', function(socket) {
  console.log('socket connected jabroni!');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    nsp.emit('chat message', msg);
  });
  socket.on('disconnect', function (data) {
  console.log('socket disconnected jabroni!', data);
  });
});

socketIO.on('connection', function(socket) {
  console.log('socket connected everyone!');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    socketIO.emit('chat message', msg);
  });
  socket.on('disconnect', function (data) {
  console.log('socket disconnected everyone!', data);
  });
});

/*
// Namespace or room socket ID? Possibly to talk with specific administrations
// specific window to talk
// to save or not save the chat
// join leave rooms
// put into react somehow
Idea?

  everytime a user is created a new namespace shoudl be created on the server side and client?
  */