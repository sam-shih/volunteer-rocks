const models = require('./models.js');
let Volunteers = models.Volunteers;
let Organizations = models.Organizations;
let Opportunities = models.Opportunities;

const checkIfEnrolled = function(oppId, volId, res) {
  Opportunities.findById(oppId, function(err, opportunity) {
    if (err) {
      throw err;
    }

    let volunteerers = opportunity.volunteerers;

    if (volunteerers.indexOf(volId) > -1) {
      res.send('already');
    } else {
      addVolunteerToOpp(oppId, volId, res);
    }
  });
}

const addVolunteerToOpp = function(oppId, volId, res) {
  Opportunities.findByIdAndUpdate(oppId, {$push: { volunteerers: volId }}, function(err, opportunity) {
    if (err) {
      throw err;
    }

    res.send('enrolled');
  });
};

module.exports.addVolunteerToOpp = addVolunteerToOpp;
module.exports.checkIfEnrolled = checkIfEnrolled;
