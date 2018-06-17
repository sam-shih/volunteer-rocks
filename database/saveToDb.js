const models = require('./models.js');
var googleMapsClient = require('@google/maps').createClient({
  key: "AIzaSyAceVbYzIL8yvIXoltC1dQzg40sDVlxtuE",
  Promise: Promise
});

let Volunteer = models.Volunteers;
let Organization = models.Organizations;
let Opportunity = models.Opportunities;
let Comments = models.Comments;

exports.findUserAndJoinOrganization = ({userId, orgId, orgName}) => {
  return new Promise ((resolve ,reject)=>{
  Volunteer.findByIdAndUpdate(userId, {$push: {
    organizations: {id: orgId, name: orgName}
  }})
  .exec().then((updated)=>{
    Organization.findByIdAndUpdate(orgId, {$push: {
      members: userId
    }})
    .exec().then((updated)=>{
      resolve(updated)
    })
  })
  })
  .catch(error=>{
    reject(error);
  })
}

const newVolunteer = function (volunteer, done) {
  let aNewVolunteer = new Volunteer({
    googleId: volunteer.googleId,
    name: volunteer.name,
    address: volunteer.address,
    phone: volunteer.phone,
    email: volunteer.email,
    TODO: 'Insert opList',
    picture: volunteer.picture.slice(0, -2) + '30'
  });

  aNewVolunteer.save(function (err, volunteer) {
    if (err) {
      throw err;
    }
    console.log(`A new volunteer, ${volunteer.name}, has been saved`);
    return done(err, volunteer);
  });
};

exports.insertOrganization = function ({name, street, city, state, zipcode, phone}) {
  const address = {street, city, state, zipcode}
  return new Promise((resolve, reject)=>{
    let newOrganization = new Organization({
      name,
      address,
      phone,
    })
    newOrganization.save()
      .then(savedOrg=>{
        resolve(savedOrg);
      })
      .catch(error=>{
        reject(error);
      })
  })
};

const newOpportunity = function (opportunity) {
  //console.log(opportunity)
  googleMapsClient.geocode({
    address: opportunity.address
    }).asPromise()
    .then((response) => {
      let zipcode = '';
      let gmapi = response.json.results[0];
      for (var i = 0; i < gmapi.address_components.length; i++) {
        if (gmapi.address_components[i].types[0] === 'postal_code') {
          zipcode = gmapi.address_components[i].short_name;
        }
      }
      console.log(opportunity.createdBy)
      let aNewOpportunity = new Opportunity({
        title: opportunity.title,
        organization: opportunity.organization,
        createdBy: opportunity.createdBy,
        description: opportunity.description,
        cause: opportunity.cause,
        zipcode: zipcode,
        formatted_address: gmapi.formatted_address,
        start_date: opportunity.start_date,
        end_date: opportunity.end_date,
        phone: opportunity.phone,
        email: opportunity.email,
        location: {
          lng: gmapi.geometry.location.lng,
          lat: gmapi.geometry.location.lat
        }
      });

      aNewOpportunity.save(function (err, opportunity) {
        if (err) {
          console.log(err);
        }
        console.log("Success in saving newOpportunity")
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addNewComment = function({name, opportunityId, userId, picture, comment}) {
  return new Promise((resolve, reject) => {
    let newComment = new Comments({
      name,
      opportunityId,
      userId,
      picture,
      comment
    })
    newComment.save()
      .then(savedComment=>{
        resolve(savedComment);
      })
      .catch(error=>{
        reject(error);
      })
  });
}

module.exports.newOpportunity = newOpportunity;
module.exports.newVolunteer = newVolunteer;