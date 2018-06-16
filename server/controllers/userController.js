const checkdb = require('../../database/checkdbs.js');
const retrieveFromDb = require('../../database/retrieveFromDb.js');
const addVolunteerToOpp = require('../../database/addVolunteerToOpp.js');

exports.signUp = (req, res) => {
  return checkdb.checkOrganizationExists(req, res)
}

exports.login = (req, res) => {
  return checkdb.checkUserCredential(req.body, res, session, req)
}

exports.fetchOpps = (req, res) => {
  return retrieveFromDb.findOpportunitiesByUser(req.session.passport.user._id, res)
}

exports.enroll = (req, res) => {
  let opportunity = req.body.opportunity;
  if (req.user) {
    addVolunteerToOpp.checkIfEnrolled(opportunity, req.user._id, res);
  } else {
    res.send('login')
  }
}

exports.sub = (req, res) => {
  let opportunity = req.body.opportunity;
  if (req.user) {
    addVolunteerToOpp.subscribeToOpp(opportunity, req.user._id, res);
  } else {
    res.send('login')
  }
}

exports.logout = (req, res) => {
  //how do we want to hangle logouts?
  req.logout();
  req.session.destroy();
  res.redirect('/');
}