const saveToDb = require('../../database/saveToDb.js');
const retrieveFromDb = require('../../database/retrieveFromDb.js');

exports.fetchAll = (req, res) => {
  retrieveFromDb.getOpportunities(1000, res);
}

exports.fetchByZip = (req, res) => {
  retrieveFromDb.getZipCodeSearch(req.body.coords)
  .then(nearestOpps => {
    res.status(200).send(nearestOpps);
  }).catch(err => {
    console.error(err.message);
    res.status(404).send(err);
  })
}

exports.addNew = (req, res) => {
  //console.log("YESSS!", req.body);
  saveToDb.newOpportunity(req.body);
  res.sendStatus(200);
}

exports.main = (req, res) => {
  var sessionTest = ('user' in req) ? `*** SESSION EXISTS for ${req.session.passport.user.name}` : "*** NO SESSION ***";
  if ('user' in req) {
    res.status(200).send(req.session.passport.user).end('true');
  } else if ('userId' in req.session) {
    res.status(200).send(req.session)
  }
}

exports.updateRating = (req, res)=>{
  retrieveFromDb.insertRatingToOpportunity(req.body)
  .then(updated=>{
    retrieveFromDb.updateOpportunityAverageRating(req.body)
    .then((updated)=>{
      res.status(200).send(updated);
    })
    .catch((error)=>{
      res.status(404).send(error);
    })
  })

}