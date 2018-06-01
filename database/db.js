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

var ObjectId = Schema.ObjectId;
var volunteerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address:{
    street:String,
    City: String,
    State: String,
    zipCode: String,
  },
  phone: String,
  email: String,
  opList: [ObjectId],
  created_at: {type: Date, default: Date.now}
});


var organizationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address:{
    street:String,
    city: String,
    State: String,
    zip_code: String,
  },
  phone: String,
  email: String,
  opList: [ObjectId]
});

var opportunitiesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  cause:String,
  location:{
    street:String,
    City: String,
    State: String,
    zipCode: String,
  },
  start_date: ISODate,
  end_date:ISODate,
  phone: String,
  email: String
});


var Volunteers = mongoose.model('Volunteers', volunteerSchema);
var Organization = mongoose.model('Organization', organizationSchema);
var OpportunitiesSchema = mongoose.model('Opportunities', opportunitiesSchema);

// var volunteerSchema = mongoose.Schema({
//   name: String
// });

// var Volunteers = mongoose.model('Volunteers', volunteerSchema);

// module.exports.Volunteers = Volunteers;