import passport from "passport";
import express from "express";
// import twitterAuthentication from "../config/passport/twitter-authentication/twitterAuthentication";
const router = express.Router();
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
router.get("/twitter", passport.authenticate("twitter"));

router.get("/twitter/callback",
  passport.authenticate('twitter'), (req, res) => {
    console.log("doing the thing");
    res.json(req);
  });

module.exports = router;
