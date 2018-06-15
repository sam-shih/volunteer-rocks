const app = require('./server/index.js');
const port = process.env.PORT || 3000;
const dbConnect = require('./database/connectDb.js');

var server = app.listen(port, function() {
  console.log(`Listening on ${port}`);
});
const socketIO = require('socket.io')(server);


socketIO.on('connection', function(socket) {
  console.log('yo you connected!');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    socketIO.emit('chat message', msg);
  });
  socket.on('disconnect', function (data) {
  console.log('hey disconnected!', data);
  });
});
// Namespace? Possibly to talk with specific administrations