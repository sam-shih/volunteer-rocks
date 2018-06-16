const models = require('./models.js');
let Volunteers = models.Volunteers;
let Organizations = models.Organizations;
let Opportunities = models.Opportunities;
let zipCodesArray = [];

const getVolunteers = function (callback, limit) {
  Volunteers.find({}, function (err, volData) {
    if (err) {
      throw err;
    }

    callback(volData);
  }).limit(limit);
};

const getOrganizations = function (callback, limit) {
  Organizations.find({}, function (err, orgData) {
    if (err) {
      throw err;
    }

    callback(orgData);
  }).limit(limit);
};

const getOpportunities = function (limit, res) {
  Opportunities.find({
    title: 'Community Service'
  }, function (err, oppsData) {
    if (err) {
      throw err;
    }
    res.status(200).json(oppsData);
  }).limit(limit);
};

const myOpportunities = function (id, res) {
  Volunteers.findById(id, function (err, volunteer) {
    if (err) {
      throw err;
    }
    console.log('OPPPPPPS DATAAAAAAA HELLO', volunteer)
    Opportunities.find({
      '_id': {
        $in: volunteer.opList
      }
    }, function (err, result) {
      res.status(200).json(result);
    });
  })
};

const getZipCodeSearch = function (coords) {
  console.log('Coords from inside db: ', coords);
  return new Promise((resolve, reject) => {
    Opportunities.find({
      location: {
        $geoNear: {
          $geometry: {
            type: 'Point',
            coordinates: coords
          },
          $maxDistance: 80467.2
        }
      }
    }).exec().then(nearestOpps => {
      resolve(nearestOpps);
    }).catch(err => {
      reject(err);
    })
  })
};


module.exports.myOpportunities = myOpportunities;
module.exports.getVolunteers = getVolunteers;
module.exports.getOrganizations = getOrganizations;
module.exports.getOpportunities = getOpportunities;
module.exports.getZipCodeSearch = getZipCodeSearch;