const rrad = require('rrad')
const axios = require('axios')
const _ = require('underscore');
const models = require('./models.js');
const mongoose = require('mongoose');
const saveToDb = require('./saveToDb.js');

function saveExampleOpportunity() {
  const opportunities = {};
  for (var i = 0; i < 2200; i++) {
    const randomAddress = rrad.addresses[Math.floor(Math.random() * rrad.addresses.length)];
    opportunities['title'] = "Community Service";
    opportunities['description'] = "Help make the world a better place";
    opportunities['cause'] = "Clean our neighborhood";
    opportunities['address'] = `${randomAddress.address1} ${randomAddress.city} ${randomAddress.state} ${randomAddress.postalCode}`;
    opportunities['start_date'] = '06/09/2018';
    opportunities['end_date'] = '07/09/2018';
    opportunities['phone'] = '1234567890';
    opportunities['email'] = 'help@helpwanted.com';
    opportunities['volunteerers'] = [];
  }
}

module.exports.saveExampleOpportunity = saveExampleOpportunity;