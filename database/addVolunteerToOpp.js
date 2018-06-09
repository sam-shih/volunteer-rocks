const models = require('./models.js');
let Volunteers = models.Volunteers;
let Organizations = models.Organizations;
let Opportunities = models.Opportunities;

const addVolunteerToOpp = function(oppId, volId) {
  Opportunities.findByIdAndUpdate(oppId, { volunteerers: volunteerers.push(volId) }, function(err, opportunity) {
    if (err) {
      throw err;
    }

    
  });
};

module.exports.addVolunteerToOpp;
