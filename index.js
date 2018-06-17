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
});

