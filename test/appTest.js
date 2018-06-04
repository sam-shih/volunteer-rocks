const expect = require('chai').expect;
const request = require('request');
const app = require('../server/index.js');
const models = require('../database/models.js');
const VolunteerSchema = models.Volunteers.schema.obj;
const OrganizationSchema = models.Organizations.schema.obj;
const OpportunitiesSchema = models.Opportunities.schema.obj;
var server;

before(function() {
  server = app.listen(4568, function() {
    console.log('The tests are listening on 4568');
  });
});

after(function() {
  server.close();
});

describe ('Database', function() {

  describe('Volunteers', function() {

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

  describe('Organizations', function() {

    describe('Organization Schema', function() {
 
      it('Should have a name property', function() {
        expect(OrganizationSchema.name).to.exist;
      });
      it('Should have a address property', function() {
        expect(OrganizationSchema.address).to.exist;
      });
      it('Should have a phone property', function() {
        expect(OrganizationSchema.phone).to.exist;
      });
      it('Should have a email property', function() {
        expect(OrganizationSchema.email).to.exist;
      });

    });

  });

  describe('Opportunitiess', function() {

    describe('Opportunity Schema', function() {
 
      it('Should have a title property', function() {
        expect(OpportunitiesSchema.title).to.exist;
      });
      it('Should have a description property', function() {
        expect(OpportunitiesSchema.description).to.exist;
      });
      it('Should have a cause property', function() {
        expect(OpportunitiesSchema.cause).to.exist;
      });
      it('Should have a address property', function() {
        expect(OpportunitiesSchema.address).to.exist;
      });
      it('Should have a start date property', function() {
        expect(OpportunitiesSchema.start_date).to.exist;
      });
      it('Should have a end date property', function() {
        expect(OpportunitiesSchema.end_date).to.exist;
      });
      it('Should have a phone property', function() {
        expect(OpportunitiesSchema.phone).to.exist;
      });
      it('Should have a email property', function() {
        expect(OpportunitiesSchema.email).to.exist;
      });
      
    });

  });

}); 

