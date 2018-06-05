const models = require('./models.js');
let Volunteers = models.Volunteers;
let Organizations = models.Organizations;
let Opportunities = models.Opportunities;


const getSessionId = function(clientSessionId, callback, res) {
  Organizations.find({'sessionId': clientSessionId}, function(err, sessionIdExist) {
    if(err) throw err;
    sessionIdExist.length > 0 ? callback(true) : res.status(204);
  });
}

module.exports.getSessionId = getSessionId;