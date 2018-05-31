var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:password1@ds050189.mlab.com:50189/volunteer-rocks');

var db = mongoose.connection;

db.on('error', function(err) {
  if (err) {
    throw err;
  }
});

db.once('open', function() {
  console.log('Volunteer Database is connected');
});

var volunteerSchema = mongoose.Schema({
  name: String
});

var Volunteers = mongoose.model('Volunteers', volunteerSchema);

module.exports.Volunteers = Volunteers;