import express from 'express';
import search from "./search";
import passport from "passport";
const router = express.Router();

router.route("/search")
  .get(passport.authenticate("twitter-token", {session: true}),search);

module.exports = router;
