const express = require('express');
const session = require('express-session');
const saveToDb = require('../database/saveToDb.js');
const retrieveFromDb = require('../database/retrieveFromDb.js');
const checkdb = require('../database/checkdbs.js');
const axios = require('axios');

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
  saveToDb.newOpportunity(req.body);
  res.sendStatus(200);
});

app.post('/opportunities', (req, res) => {
  let zipApiUrl = 'https://www.zipcodeapi.com/rest/TMQkh3bB6MHNtwd82NiUZmvp5sQ3vePfDRcJ2YDnQJW4RIB2LWDWuEMAaqmkOU5G/radius.json/' + req.body.zipcode+'/'+'20'+'/'+'mile'
  let nearbyZipCodes = [];

  axios.post(zipApiUrl)
    .then(response => {
      console.log('From zipapi ' + response.data.zip_codes[0].zip_code);
      retrieveFromDb.getZipCodeSearch(response.data.zip_codes, 5, res);
    }).catch(err => console.log('Err', err));
})
module.exports = app;