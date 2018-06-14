const axios = require('axios');
const express = require('express');
const routes = require("./routes.js");``
const passport = require('passport');
const session = require('express-session');

const VolunteerModel = require('../database/models.js').Volunteers;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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
  clientID: "623460598606-jt79n40o89bp0mppi4aosv313vkq7and.apps.googleusercontent.com", // Please get clientID (instructions in README)
  clientSecret: "KuEwLAXDBNRDqsRHpKj7sjLz", // Please get clientSecret (instructions in README)
  callbackURL: "http://localhost:3000/"
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

app.use('/', routes);

module.exports = app;