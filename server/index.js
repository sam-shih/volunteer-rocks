const express = require('express');
const session = require('express-session');
const saveToDb = require('../database/saveToDb.js');
const retrieveFromDb = require('../database/retrieveFromDb.js');
const checkdb = require('../database/checkdbs.js');

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(session({secret: 'Is it really a secret', cookie:{maxAge: 365*24*60*60}}));

//MAIN PAGE GET REQUEST
// app.get('/main', (req, res) => {
//   checkdb.checkSessionId(req.session.id, res);
// });

//ORGANIZATION LOGIN REQUEST
app.post('/login', (req, res) => {
  checkdb.checkUserCredential(req.body, res);
});

//ORGANIZATION SIGNUP POST REQUEST
app.post('/signup', (req, res) => {
  checkdb.checkOrganizationExists(req, res);
});

//OPPORTUNITIES GET REQUEST
app.get('/opportunities', (req, res) => {
  retrieveFromDb.getZipCodeSearch(5, res);
});

app.post('/newOpp', (req, res) => {
  console.log(req.body);
  saveToDb.newOpportunity(req.body);
  res.sendStatus(200);
});
module.exports = app;