const axios = require('axios');
const express = require('express');
const routes = require("./routes.js");``
const passport = require('passport');
const session = require('express-session');

let app = express();

var port = process.env.PORT || ????;

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
app.use('/', routes);

app.listen(port, ()=>{
  console.log(`listening port: ${app.get('port')}`);
})