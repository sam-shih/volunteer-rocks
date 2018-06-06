const models = require('./models.js');
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
  let aNewOrganization = new Organization({
    name: organization.name,
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
  let aNewOpportunity = new Opportunity({
    title: opportunity.title,
    description: opportunity.description,
    cause: opportunity.cause,
    address: opportunity.address,
    start_date: opportunity.start_date,
    end_date: opportunity.end_date,
    phone: opportunity.phone,
    email: opportunity.email
  });

  aNewOpportunity.save(function(err, opportunity) {
    if (err) {
      throw err;
    }

    console.log(`A new opportunity, ${opportunity.title}, has been saved`);
  });
};

module.exports.newOpportunity = newOpportunity;
module.exports.newOrganization = newOrganization;
module.exports.newVolunteer = newVolunteer;