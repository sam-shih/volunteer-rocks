const express = require('express');
const session = require('express-session');
const port = process.env.PORT || 3000;
const database = require('../database/db.js');


const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(session({secret: 'Is it really a secret'}));

//SIGNUP POST REQUEST
app.post('/signup', (req, res) => {
  let rb = req.body;
  let opportunitesData = {
    title: rb.title,
    description: rb.description,
    cause: rb.cause,
    street: rb.street,
    city: rb.city,
    state: rb.state,
    zipCode: rb.zipCode,
    phone: rb.phone,
    email: rb.email
  }

  database.saveOpportunities(opportunitesData);
});

//OPPORTUNITIES GET REQUEST
app.get('/opportunites', (req, res) => {

});

app.listen(3000, function() {
  console.log(`Listening on 3000`);
});