"use strict";

require("babel-polyfill");

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

var _User = require("./database/User");

var _User2 = _interopRequireDefault(_User);

var _mongoClient = require("./database/mongoClient");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passport = require("passport");
var TwitterTokenStrategy = require("passport-twitter-token");
var twitterConfig = require("./config/config.js").getConfig().twitter;
var sessionConfig = require("./config/config.js").getConfig().session;
var general = require("./config/config.js").getConfig().general;

(0, _mongoClient.startClient)();
var app = (0, _express2.default)();

passport.use(new TwitterTokenStrategy({
  consumerKey: twitterConfig.consumer_key,
  consumerSecret: twitterConfig.consumer_secret
}, function (token, tokenSecret, profile, done) {
  _User2.default.upsertTwitterUser(token, tokenSecret, profile, function (err, user) {
    return done(err, user);
  });
}));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  _User2.default.findById(id, function (err, user) {
    done(err, user);
  });
});

// Set middlewares
app.use((0, _morgan2.default)('dev'));
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use((0, _expressSession2.default)({
  secret: sessionConfig.session_secret,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

var api = require('./api/v1.js');
var auth = require("./api/twitterAuthentication.js");
app.use("/", api);
app.use("/auth", auth);

// Set Error Handling (Should be done after all routes are defined)
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.status);
});

// Start the Server
app.listen(general.port);