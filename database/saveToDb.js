const models = require('./models.js');
let Volunteer = models.Volunteers;
let Organization = models.Organizations;
let Opportunity = models.Opportunities;

const newVolunteer = function(volunteer) {
  return new Volunteer({
    name: volunteer.name,
    address: volunteer.address,
    phone: volunteer.phone,
    email: volunteer.email,
    TODO: 'Insert opList'
  });
};

const newOrganization = function(organization) {
  return new Organization({
    name: organization.name,
    address: organization.address,
    phone: organization.phone,
    email: organization.email,
    TODO: 'Insert opList'
  });
};

const newOpportunity = function(opportunity) {
  return new Opportunity({
    title: opportunity.title,
    description: opportunity.description,
    cause: opportunity.cause,
    address: opportunity.address,
    start_date: opportunity.start_date,
    end_date: opportunity.end_date,
    phone: opportunity.phone,
    email: opportunity.email
  });
};