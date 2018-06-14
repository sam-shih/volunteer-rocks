const saveToDb = require('../database/saveToDb.js');
const retrieveFromDb = require('../database/retrieveFromDb.js');
const axios = require('axios');

exports.fetchAll = (req, res) => {
  retrieveFromDb.getOpportunities(1000, res);
}

exports.fetchByZip = (req, res) => {
  let zipApiUrl = `https://www.zipcodeapi.com/rest/O4i5XLUvKKDgHEb3Sw8QNYxNG6NW8Sk7KqQ3kVKI0sodef9qD1THnwOHrd4u4KvD/radius.json/${req.body.zipcode}/50/mile`;

  axios.get(zipApiUrl)
    .then(response => {
      retrieveFromDb.getZipCodeSearch(response.data.zip_codes, res);
    }).catch(err => {
      throw err;
    });
}

exports.addNew = (req, res) => {
  saveToDb.newOpportunity(req.body);
  res.sendStatus(200);
}