const app = require('./server/index.js');
const port = process.env.PORT || 3000;
const dbConnect = require('./database/connectDb.js');

var server = app.listen(port, function() {
  console.log(`Listening on ${port}`);
});
const socketIO = require('socket.io')(server);

socketIO.on('connection', function(socket) {
  console.log('socket connected everyone!');
  socket.on('chat message', function(msg, room){
    console.log('message: ' + msg + ':' + room);
    socket.join(room);
    socketIO.in(room).emit('chat message', msg);
  });
});


