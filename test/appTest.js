const expect = require('chai').expect;
const request = require('request');
const db = require('../database/db.js');
const dbConnection = require('../database/db.js').dbConnection;
const app = require('../server/index.js');
const VolunteerSchema = db.Volunteers.schema.obj;

describe ('Database', function() {

  var server;

  before(function() {
    server = app.listen(4568, function() {
      console.log('Shortly is listening on 4568');
    });
  });

  after(function() {
    dbConnection.close();
    server.close();
  });

  describe('Volunteer', function() {

    describe('Volunteer Schema', function() {

      it('Should have a name property', function() {
        expect(VolunteerSchema.name).to.exist;
      });
      it('Should have a address property', function() {
        expect(VolunteerSchema.address).to.exist;
      });
      it('Should have a phone property', function() {
        expect(VolunteerSchema.phone).to.exist;
      });
      it('Should have a email property', function() {
        expect(VolunteerSchema.email).to.exist;
      });

    });   
    
  });

}); 

console.log(app)

