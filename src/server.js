// import "babel-polyfill";
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const User = require("./database/User");
const startClient = require("./database/mongoClient");
const passport = require("passport");
const TwitterTokenStrategy = require("passport-twitter-token");
const twitterConfig = require("./config/config.js").getConfig().twitter;
const sessionConfig = require("./config/config.js").getConfig().session;
const general = require("./config/config.js").getConfig().general;

startClient();

const app = express();

passport.use(
  new TwitterTokenStrategy(
    {
      consumerKey: twitterConfig.consumer_key,
      consumerSecret: twitterConfig.consumer_secret,
      callbackURL: "http://www.example.com/auth/twitter/callback"
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

app.use(morgan("dev"));
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

app.use(function(req, res, next) {
  const origin =
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "local-production"
      ? process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "http://localhost:3001"
      : "http://siphonr.herokuapp.com";
  res.header("Access-Control-Allow-Origin", origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

const api = require("./api/v1.js");
const auth = require("./api/twitterAuthentication.js");
app.use("/api", api);
app.use("/auth", auth);

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "local-production"
) {
  app.use("/", express.static(path.resolve(__dirname, "..", "client/dist")));
  app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname, "..", "client/dist/index.html"));
  });
}

app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.status);
});

app.listen(
  process.env.NODE_ENV === "development"
    ? general.port
    : process.env.NODE_ENV === "local-production"
      ? 3000
      : process.env.PORT
);
