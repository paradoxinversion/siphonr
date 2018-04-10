import express from 'express';
import search from "./search";
import passport from "passport";
const router = express.Router();
router.use(function(req, res, next) {
  console.log(process.env.NODE_ENV);
  const origin = (process.env.NODE_ENV === "development") ? "http://localhost:3001" : "http://siphonr-overview.herokuapp.com"; 
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Expose-Headers", "x-auth-token");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
router.route("/search")
  .get(passport.authenticate("twitter-token", {session: true}),search);

module.exports = router;
