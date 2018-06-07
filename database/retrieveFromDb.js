const models = require('./models.js');
let Volunteers = models.Volunteers;
let Organizations = models.Organizations;
let Opportunities = models.Opportunities;

const getVolunteers = function(callback, limit) {
  Volunteers.find({}, function (err, volData) {
    if (err) {
      throw err;
    }

    callback(volData);
  }).limit(limit);
};

const getOrganizations = function(callback, limit) {
  Organizations.find({}, function (err, orgData) {
    if (err) {
      throw err;
    }

    callback(orgData);
  }).limit(limit);
};

const getOpportunities = function(limit, res) {
  Opportunities.find({}, function (err, oppsData) {
    if (err) {
      throw err;
    }
    res.status(200).json(oppsData);
  }).limit(limit);
};

const getZipCodeSearch = function(limit, res) {
  Opportunities.find({}, function(err, opps) {
    if(err){
      throw err;
    }
    console.log(opps)
    res.status(200).json(opps);
    res.end();
  }).limit(limit);
}

module.exports.getVolunteers = getVolunteers;
module.exports.getOrganizations = getOrganizations;
module.exports.getOpportunities = getOpportunities;
module.exports.getZipCodeSearch = getZipCodeSearch;