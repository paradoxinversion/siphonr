import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import session from "express-session";
import User from "./database/User";
// import passport from "passport";
const passport = require("passport"),
  TwitterStrategy = require("passport-twitter").Strategy;
const twitterConfig = require("./config/config.js").getConfig().twitter;

const app = express();

// Allow CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

passport.use(new TwitterStrategy({
  consumerKey: twitterConfig.consumer_key,
  consumerSecret: twitterConfig.consumer_secret,
  callbackURL: `http://localhost:3001/twitter/callback`
},
async function(token, tokenSecret, profile, done){

  try{
    console.log("token:", token);
    console.log("tokenSecret:", tokenSecret);
    console.log("profile:", profile)
    const user = await User.findOne({twitterId: profile.id});
    console.log("Twitter User::",user);
    if (!user){
      const newUser = new User({
        twitterId: profile.id,
        token: token
      });
      await newUser.save();
      return done (null, newUser);
    } else {
      return done(null, user);
    }
  } catch (e){
    console.log(e);
    return (e, false);
  }
}));

passport.serializeUser(function(user, done){
  done (null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Set middlewares
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// Set Routes
const api = require('./api/v1.js');
const auth = require("./api/twitterAuthentication.js");
app.use("/", api);
app.use("/auth", auth);

// Set Error Handling (Should be done after all routes are defined)
app.use(function(req, res, next){
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.send(err.status);
});

// Start the Server
app.listen(3001, () => console.log('Siphonr API Running'));
