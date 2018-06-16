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
// General chat
  // each user has a chat feature and a socket that opens up automatically
  // any user can talk on this chat window
  // implement janky chat window for now
// Namespace or room socket ID? Possibly to talk with specific administrations
// if a user/adminstration gets a message does the window automatically pop up?
// where should the chat be? Is it a constant chat window that users and organizations have?
// how to test chat, log in as one user send a message log out and log in as the other user?
// does user enter organization into a window before sending a message?
// if another user messages the same organization does it pop up a different window?
// if users are creating organizations, how do we know what user made the organization so messages can be sent to the user?
// Where in the code could I put a chat window for a logged in user
// to save or not save the chat
// join leave rooms
Idea?

  everytime a user is created a new namespace shoudl be created on the server side and client?
  */