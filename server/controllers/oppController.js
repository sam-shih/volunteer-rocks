const saveToDb = require('../../database/saveToDb.js');
const retrieveFromDb = require('../../database/retrieveFromDb.js');

exports.fetchAll = (req, res) => {
  retrieveFromDb.getOpportunities(1000, res);
}

exports.fetchByZip = (req, res) => {
  console.log('Request body coords from server: ', req.body.coords)

  retrieveFromDb.getZipCodeSearch(req.body.coords)
  .then(nearestOpps => {
    res.status(200).send(nearestOpps);
  }).catch(err => {
    console.error(err.message);
    res.status(404).send(err);
  })
}

exports.addNew = (req, res) => {
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