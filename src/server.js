import "babel-polyfill";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import session from "express-session";
import User from "./database/User";
import { startClient } from "./database/mongoClient";
const passport = require("passport");
const TwitterTokenStrategy = require("passport-twitter-token");
const twitterConfig = require("./config/config.js").getConfig().twitter;
const sessionConfig = require("./config/config.js").getConfig().session;
const general = require("./config/config.js").getConfig().general;

startClient();
const app = express();
console.log(twitterConfig);
passport.use(
  new TwitterTokenStrategy(
    {
      consumerKey: twitterConfig.consumer_key,
      consumerSecret: twitterConfig.consumer_secret
    },
    function(token, tokenSecret, profile, done) {
      User.upsertTwitterUser(token, tokenSecret, profile, function(err, user) {
        return done(err, user);
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Set middlewares
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: sessionConfig.session_secret,
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

const api = require("./api/v1.js");
const auth = require("./api/twitterAuthentication.js");
app.use("/", api);
app.use("/auth", auth);

// Set Error Handling (Should be done after all routes are defined)
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.status);
});

// Start the Server
app.listen(general.port);
