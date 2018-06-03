const express = require('express');
const session = require('express-session');
const port = process.env.PORT || 3000;
const db = require('../database/openDB.js');
const database = require('../database/db.js');



const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(session({secret: 'Is it really a secret'}));

//SIGNUP POST REQUEST
app.post('/organisation', (req, res) => {
  database.saveOrganisations(req.body);
});

//OPPORTUNITIES GET REQUEST
app.get('/opportunities', (req, res) => {
  database.getOpportunities((data) => {
    res.status(200).json(data);
  });
});



app.listen(port, function() {
  console.log(`Listening on 3000`);
});

module.exports = app;