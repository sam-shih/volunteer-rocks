const models = require('./models.js');
const bcrypt = require('bcrypt');
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBPLIcGtNnLOb7bqR7wq9s-y2hcsWzU5i4',
  Promise: Promise
});

let Volunteer = models.Volunteers;
let Organization = models.Organizations;
let Opportunity = models.Opportunities;

const newVolunteer = function(volunteer) {
  let aNewVolunteer = new Volunteer({
    name: volunteer.name,
    address: volunteer.address,
    phone: volunteer.phone,
    email: volunteer.email,
    TODO: 'Insert opList'
  });

  aNewVolunteer.save(function(err, volunteer) {
    if (err) {
      throw err;
    }

    console.log(`A new volunteer, ${volunteer.name}, has been saved`);
  });
};

const newOrganization = function(organization, sessionId, res) {
  let hashPassword = '';

  bcrypt.hash(organization.password, 10, function(err, hash) {
    hashPassword = hash;
  });

  let aNewOrganization = new Organization({
    name: organization.name,
    password: hashPassword,
    address: organization.address,
    phone: organization.phone,
    email: organization.email,
    sessionId: sessionId,
    TODO: 'Insert opList'
  });

  aNewOrganization.save(function(err, organization) {
    if (err) {
      throw err;
    }

    console.log(`A new organization, ${organization.name}, has been saved`);
    res.status(201).end();
  });
};

const newOpportunity = function(opportunity) {

  console.log('Is running this');
  googleMapsClient.geocode({
    address: opportunity.address
  }).asPromise()
  .then((response) => {
    let gmapi = response.json.results[0];

    let aNewOpportunity = new Opportunity({
      title: opportunity.title,
      description: opportunity.description,
      cause: opportunity.cause,
      address:{
        // street: `${gmapi.address_components[0].short_name} ${gmapi.address_components[1].short_name}`,
        // city: gmapi.address_components[2].short_name,
        // state: gmapi.address_components[4].short_name,
        zipcode: gmapi.address_components[0].short_name,
      },
      formatted_address: gmapi.formatted_address,
      // start_date: opportunity.start_date,
      // end_date: opportunity.end_date,
      phone: opportunity.phone,
      email: opportunity.email,
      location: {
        lat: gmapi.geometry.location.lat,
        lng: gmapi.geometry.location.lng
      }
    });
      aNewOpportunity.save(function(err, opportunity) {
        if (err) {
          throw err;
        }

        console.log(`A new opportunity, ${opportunity.title}, has been saved`);
      });
  })
  .catch((err) => {
    throw(err);
  });
};

module.exports.newOpportunity = newOpportunity;
module.exports.newOrganization = newOrganization;
module.exports.newVolunteer = newVolunteer;