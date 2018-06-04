const express = require('express');
const session = require('express-session');
const saveToDb = require('../database/saveToDb.js');
const retrieveFromDb = require('../database/retrieveFromDb.js');

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(session({secret: 'Is it really a secret'}));

//SIGNUP POST REQUEST
app.post('/organization', (req, res) => {
  saveToDb.newOrganization(req.body);
});

//OPPORTUNITIES GET REQUEST
app.get('/opportunities', (req, res) => {
  retrieveFromDb.getOpportunities((data) => {
    res.status(200).json(data);
  });
});

module.exports = app;