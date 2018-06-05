const express = require('express');
const session = require('express-session');
const saveToDb = require('../database/saveToDb.js');
const retrieveFromDb = require('../database/retrieveFromDb.js');

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(session({secret: 'Is it really a secret', cookie:{maxAge: 60000}, name: "Mayank"}));

//SIGNUP POST REQUEST
app.post('/organization', (req, res) => {
  saveToDb.newOrganization(req.body);

});

//OPPORTUNITIES GET REQUEST
app.get('/opportunities', (req, res) => {

  retrieveFromDb.getSession_Id(req.session.id, (sessionIdExist) => {
    if(sessionIdExist) { retrieveFromDb.getOpportunities((data) => { res.status(200).json(data) });
    } else {
      res.status(204);
    }
  });

});

app.post('/signup', (req, res) => {

});

module.exports = app;