const models = require('./models.js');
let Volunteers = models.Volunteers;
let Organizations = models.Organizations;
let Opportunities = models.Opportunities;


const getSessionID = function(clientSessionId, callback) {
  Organizations.find({sessionID: clientSessionId}, function(err, sessionIdExist) {
    if(err) throw err;
    sessionIdExist ? callback(true) : callback(false);
  });
}

module.exports.getSessionID = getSessionID;