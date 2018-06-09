const express = require('express');
const session = require('express-session');
const saveToDb = require('../database/saveToDb.js');
const retrieveFromDb = require('../database/retrieveFromDb.js');
const VolunteerModel = require('../database/models.js').Volunteers;
const checkdb = require('../database/checkdbs.js');
const axios = require('axios');
const saveExampleOpportunity = require('../database/exampleOpGenarator.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(session({secret: 'Is it really a secret', cookie:{maxAge: 365*24*60*60}}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

// passport.serializeUser(function(volunteer, done) {
//   done(null, volunteer[0].googleId);
// });
saveExampleOpportunity.saveExampleOpportunity();
// passport.deserializeUser(function(id, done) {
//   console.log('Inside deserialize user', id);
//   VolunteerModel.findOne( { googleId: id }, function(err, volunteer) {
//     done(err, volunteer);
//   });
// });


// passport.use(new GoogleStrategy({
//   clientID: '177608482290-e9id899c90egnaq61bu5acppkrnenm12.apps.googleusercontent.com',
//   clientSecret: 'RfKLyzUdC7PMcr-_G_hxkVg0',
//   callbackURL: 'http://localhost:3000/auth/google/callback',
// },
//   function(accessToken, refreshToken, profile, done) {

//     let name = profile.displayName;
//     let profileId = profile.id;

//     VolunteerModel.find({ googleId: profileId }, function(err, volunteer) {
//       if (err) {
//         throw err;
//       }

//       if (volunteer.length === 0) {
//         saveToDb.newVolunteer({
//           googleId: profile.id,
//           name: name,
//         });

//         return done(err, profile);
//       }

//       return done(err, volunteer);
//     });
//   }
// ));


//MAIN PAGE GET REQUEST
// app.get('/main', (req, res) => {
//   checkdb.checkSessionId(req.session.id, res);
// });


app.get('/auth/google', passport.authenticate('google', { scope : ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);

//ORGANIZATION LOGIN REQUEST



app.post('/login', (req, res) => {
  checkdb.checkUserCredential(req.body, res);
});

app.get('/logout', function(req, res) {
  console.log(req.user);
  req.logout();
  res.redirect('/');
})

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
<<<<<<< b75ff37cf28104ee036a46149684e926405116d6
  let zipApiUrl = `https://www.zipcodeapi.com/rest/KMRxXQCWHbNZeYAmLCCPoppFkq15nSRQvvSSSiElYr857q0DRjKkjcAZarVimaIa/radius.json/${req.body.zipcode}/1/mile`;
=======
  let zipApiUrl = `https://www.zipcodeapi.com/rest/jXEHhizBNOo3C2RRQSk7Yz7rnOBXayXcDpD0KuAhI1yofRUd7POm4rcDN0tUtTS8/radius.json/${req.body.zipcode}/1/mile`;
>>>>>>> Changed zipAPI key

  axios.get(zipApiUrl)
    .then(response => {
      //console.log('From zipapi ' + response.data.zip_codes[0].zip_code);
      retrieveFromDb.getZipCodeSearch(response.data.zip_codes, 5, res);
    }).catch(err => console.log('Err', err));

})

module.exports = app;