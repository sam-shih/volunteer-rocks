const axios = require('axios')
const _ = require('underscore');
const models = require('./models.js');
const mongoose = require('mongoose');
const saveToDb = require('./saveToDb.js');

var iterateThisBitch = Array.from(Array(5).keys(), n => n + 1)
var allZips = [];
var results = {};

function saveExampleOpportunity(mile, zip) {

   // let opps = new models.Opportunities({
   //  title: mile,
   //  'address.zipcode': zip,
   // });

   // opps.save(function(err, data) {
   //  if(err) {throw err;}
   //  console.log("Success " + data)
   // });

   let opportunities = {
    title: mile,
    description: "",
    cause: "",
    address: zip,
    start_date: {},
    end_date: {},
    phone: "",
    email: ""
   }

   saveToDb.newOpportunity(opportunities);
}


function getDataAndStore() {
  iterateThisBitch.forEach(number => {
    axios.get(`https://www.zipcodeapi.com/rest/EhVSb31JIErNesYXGW0KyU2MU5IabAJxRzPce736wBLNc1h3Z1VmlqdtsZePCRev/radius.json/94102/${number}/mile`)
      .then(response => {
        response.data.zip_codes.forEach(function(zip) {
          saveExampleOpportunity(number, zip.zip_code);
        });
      });
  });
}


module.exports.getDataAndStore = getDataAndStore;