const express = require('express');
const session = require('express-session');
const saveToDb = require('../database/saveToDb.js');
const retrieveFromDb = require('../database/retrieveFromDb.js');
const checkdb = require('../database/checkdbs.js');

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(session({secret: 'Is it really a secret', cookie:{maxAge: 365*24*60*60}}));

//ORGANISATION SIGNUP POST REQUEST
app.post('/signup', (req, res) => {
  console.log("this is signup "+ req.body.address)
  saveToDb.newOrganization(req.body, req.session.id);
  res.end();
});

//OPPORTUNITIES GET REQUEST
app.get('/opportunities', (req, res) => {
  checkdb.getSessionId(req.session.id, (sessionIdExist) => {
    if(sessionIdExist) retrieveFromDb.getOpportunities((data) =>  res.status(200).json(data));
  }, res);
});

module.exports = app;