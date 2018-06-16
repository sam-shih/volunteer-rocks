const models = require('./models.js');
const db = require('./connectDb.js');
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
  return new Promise((resolve, reject)=>{
    Organizations.find()
    .then(orgs=>{
      resolve(orgs);
    })
    .catch(error=>{
      reject(error);
    })
  })
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

const getZipCodeSearch = function (zipCodes, res) {
  console.log(zipCodes);
  let zipCodesArray = [];
  zipCodes.forEach((zip) => {
    zipCodesArray.push(zip.zip_code);
  });
  Opportunities.find()
    .where('zipcode')
    .in(zipCodesArray)
    .exec((err, opps) => {
      if (err) {
        console.log("Error " + err)
        res.send(err);
      } else {
        console.log(opps)
        res.status(200).json(opps);
        res.end();
      }
    });
};

module.exports.myOpportunities = myOpportunities;
module.exports.getVolunteers = getVolunteers;
module.exports.getOrganizations = getOrganizations;
module.exports.getOpportunities = getOpportunities;
module.exports.getZipCodeSearch = getZipCodeSearch;