const rrad = require('rrad')
const _ = require('underscore');
const saveToDb = require('./saveToDb.js');

const saveExampleOpportunity = () => {
  const opportunities = [];
  for (var i = 0; i < 300; i++) {
    let opportunity = {};
    const randomAddress = rrad.addresses[Math.floor(Math.random() * rrad.addresses.length)];
    opportunity['title'] = "Community Service";
    opportunity['description'] = "Help make the world a better place";
    opportunity['cause'] = "Clean our neighborhood";
    opportunity['address'] = `${randomAddress.address1} ${randomAddress.city} ${randomAddress.state} ${randomAddress.postalCode}`;
    opportunity['start_date'] = '06/09/2018';
    opportunity['end_date'] = '07/09/2018';
    opportunity['phone'] = '1234567890';
    opportunity['email'] = 'help@helpwanted.com';
    opportunity['volunteerers'] = [];
    opportunities.push(opportunity)
  }
  console.log(opportunities)
  return opportunities;
}

exports.initDBsetup = () =>{
  const opps = saveExampleOpportunity();
  _.each(opps, opp =>{
    saveToDb.newOpportunity(opp);
  })
}
