const models = require('./models.js');
const db = require('./connectDb.js');
let Volunteers = models.Volunteers;
let Organizations = models.Organizations;
let Opportunities = models.Opportunities;
let Comments = models.Comments;
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

exports.findOpportunitiesByUser = function (id, res) {
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

exports.findCommentsByOppId = function(oppId) {
  return new Promise((resolve, reject) => {
    Comments.find({opportunityId: oppId}).sort({date: -1})
    .then(commentsByOppId => {
      resolve(commentsByOppId);
    }).catch(err => {
      reject(err);
    })
  })
};

exports.findCommentByIdAndDelete = function(commentId) {
  return new Promise((resolve, reject) => {
    Comments.findByIdAndRemove(commentId)
    .then(deletedComment => {
      resolve(deletedComment);
    }).catch(err => {
      reject(err);
    })
  })
}

exports.findCommentByIdAndUpdate = function(commentId, editComment) {
  return new Promise((resolve, reject) => {
    Comments.findByIdAndUpdate(commentId, { $set: {'comment': editComment} }, { $new: true })
    .then(updatedComment => {
      resolve(updatedComment);
    }).catch(err => {
      reject(err);
    })
  })
}

module.exports.getVolunteers = getVolunteers;
module.exports.getOrganizations = getOrganizations;
module.exports.getOpportunities = getOpportunities;
module.exports.getZipCodeSearch = getZipCodeSearch;