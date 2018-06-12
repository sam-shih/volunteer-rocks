const axios = require('axios');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const checkdb = require('../database/checkdbs.js');
const saveToDb = require('../database/saveToDb.js');
const retrieveFromDb = require('../database/retrieveFromDb.js');
const VolunteerModel = require('../database/models.js').Volunteers;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const saveExampleOpportunity = require('../database/exampleOpGenarator.js');
const addVolunteerToOpp = require('../database/addVolunteerToOpp').checkIfEnrolled;

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(session({
  secret: 'Frooty Tooty Loopy',
  cookie: {
    maxAge: 365 * 24 * 60 * 60
  }
}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID, // Please get clientID (instructions in README)
    clientSecret: process.env.CLIENT_SECRET, // Please get clientSecret (instructions in README)
    callbackURL: process.env.O_AUTH_CB
  },
  function (accessToken, refreshToken, profile, done) {
    let name = profile.displayName;
    let profileId = profile.id;

    VolunteerModel.findOne({
      googleId: profileId
    }, function (err, volunteer) {
      if (err) {
        throw err;
      }
      if (!volunteer) {
        saveToDb.newVolunteer({
          googleId: profile.id,
          name: name,
          picture: profile.photos[0].value
        }, done)
        return;
      }
      return done(err, volunteer);
    });
  }
));

passport.serializeUser(function (volunteer, done) {
  done(null, volunteer);
});

passport.deserializeUser(function (serializedObj, done) {
  VolunteerModel.findOne({
    googleId: serializedObj.googleId
  }, function (err, volunteer) {
    done(err, volunteer);
  });
});

app.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login']
}));

app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/'
}));

app.get('/main', (req, res) => {
  var sessionTest = ('user' in req) ? `*** SESSION EXISTS for ${req.session.passport.user.name}` : "*** NO SESSION ***";
  if ('user' in req) {
    res.status(200).send(req.session.passport.user).end('true');
  } else if ('userId' in req.session) {
    res.status(200).send(req.session)
  }
});

app.post('/login', (req, res) => {
  checkdb.checkUserCredential(req.body, res, session, req);
});

app.get('/logout', function (req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
})

app.post('/signup', (req, res) => {
  checkdb.checkOrganizationExists(req, res);
});

app.get('/myOps', (req, res) => {
  console.log('in mops ./server')
  retrieveFromDb.myOpportunities(req.session.passport.user._id, res);
})

app.post('/newOpp', (req, res) => {
  saveToDb.newOpportunity(req.body);
  res.sendStatus(200);
});

// link for getting new key for below https://www.zipcodeapi.com/
//click on zip in radius.
app.post('/opportunities', (req, res) => {
  let zipApiUrl = `https://www.zipcodeapi.com/rest/O4i5XLUvKKDgHEb3Sw8QNYxNG6NW8Sk7KqQ3kVKI0sodef9qD1THnwOHrd4u4KvD/radius.json/${req.body.zipcode}/50/mile`;

  axios.get(zipApiUrl)
    .then(response => {
      retrieveFromDb.getZipCodeSearch(response.data.zip_codes, res);
    }).catch(err => {
      throw err;
    });
});

app.get('/opportunities/all', (req, res) => {
  retrieveFromDb.getOpportunities(1000, res);
});

app.post('/enroll', (req, res) => {
  let opportunity = req.body.opportunity;
  if (req.user) {
    addVolunteerToOpp(opportunity, req.user._id, res);
  } else {
    res.send('login')
  }
});

// saveExampleOpportunity.saveExampleOpportunity(); // Uncomment and run to generate exampleOpportunityData

module.exports = app;