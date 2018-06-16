const axios = require('axios');
const express = require('express');
const routes = require("./routes.js");``
const passport = require('passport');
const session = require('express-session');

const VolunteerModel = require('../database/models.js').Volunteers;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const exampleDB = require('../database/exampleOpGenarator.js');
const addVolunteerToOpp = require('../database/addVolunteerToOpp').checkIfEnrolled;
const saveToDb = require('../database/saveToDb.js');
const checkdb = require('../database/checkdbs.js');

let app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'))
app.use(session({
  secret: 'Frooty Tooty Loopy',
  cookie: {
    maxAge: 365 * 24 * 60 * 60
  }
}));
app.use(passport.initialize());
app.use(passport.session());



passport.use(new GoogleStrategy({
  clientID: "623460598606-jt79n40o89bp0mppi4aosv313vkq7and.apps.googleusercontent.com",
  clientSecret: "KuEwLAXDBNRDqsRHpKj7sjLz",
  callbackURL: "http://localhost:3000/auth/google/callback"
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

app.get('/init', (req, res) =>{
  exampleDB.initDBsetup();
})

app.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login']
}));

app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/'
}));



app.use('/', routes);

module.exports = app;