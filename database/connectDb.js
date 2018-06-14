var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/legacy');

var db = mongoose.connection;

db.on('error', function (err) {
  if (err) {
    throw err;
  }
});

db.once('open', function () {
  console.log('Volunteer Database is connected');
});

let disconnect = function () {
  mongoose.connection.close();
};

module.exports.dbConnect = db;
module.exports.disconnect = disconnect;