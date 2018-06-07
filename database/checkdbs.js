const models = require('./models.js');
const bcrypt = require('bcrypt');
let Volunteers = models.Volunteers;
let Organizations = models.Organizations;
let Opportunities = models.Opportunities;
let retrieveFromDb = require('./retrieveFromDb.js');
let saveToDb = require('./saveToDb.js');


const checkSessionId = function(clientSessionId, res) {
  Organizations.find({'sessionId': clientSessionId}, (err, sessionIdExist) => {
    if(err) throw err;
    sessionIdExist.length > 0 ? retrieveFromDb.getOpportunities(5, res) : res.status(204);
  });
}

const checkOrganizationExists = function(req, res) {
  Organizations.find({'name': req.body.name}, (err, orgExist) => {
    if(err) throw err;
    orgExist.length ? res.status(200).end('true') : saveToDb.newOrganization(req.body, req.session.id, res);
  });
}

const checkUserCredential = function(userCredential, res) {
  Organizations.findOne({name: userCredential.name}, (err, user) => {
    if(err) throw err;

    if(user.length) { // if username found check password
      bcrypt.compare(userCredential.password, user.password, (err, isMatch) => {
        if(err) throw err;
        isMatch ? res.status(200).end('true') : res.status(401).end('false');
      });

    } else {
      res.status(401).end('false');//if username not found
    }

  }).select('+password');
}

module.exports.checkSessionId = checkSessionId;
module.exports.checkOrganizationExists = checkOrganizationExists;
module.exports.checkUserCredential = checkUserCredential;