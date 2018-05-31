var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/volunteer');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('Volunteer Database is connected');
});

var volunteerSchema = mongoose.Schema({
  name: String
});

var Volunteers = mongoose.model('Volunteers', volunteerSchema);

var vol = new Volunteers({name: 'Linda'});