const models = require('./models.js');
let Volunteers = models.Volunteers;
let Organizations = models.Organizations;
let Opportunities = models.Opportunities;
let retrieveFromDb = require('./retrieveFromDb.js');
let saveToDb = require('./saveToDb.js');


const checkSessionId = function(clientSessionId, res) {
  Organizations.find({'sessionId': clientSessionId}, function(err, sessionIdExist) {
    if(err) throw err;
    sessionIdExist.length > 0 ? retrieveFromDb.getOpportunities(5, res) : res.status(204);
  });
}

const checkOrganizationExists = function(req, res) {
  Organizations.find({'name': req.body.name}, function(err, orgExist) {
    if(err) throw err;
    console.log(orgExist);
    orgExist.length ? res.status(200).end('true') : saveToDb.newOrganization(req.body, req.session.id, res);
  });
}

const checkUserCredential = function(userCredential, res) {
  Organizations.findOne({name: userCredential.name, password: userCredential.password}, (err, credentialExist) => {
    if(credentialExist.length) {
      res.status(200).end('true');
    } else {
      res.status(401).end('false');
    }
  }).select('+password');
}

module.exports.checkSessionId = checkSessionId;
module.exports.checkOrganizationExists = checkOrganizationExists;
module.exports.checkUserCredential = checkUserCredential;