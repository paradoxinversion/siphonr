const express = require("express");
const search = require("./search");
const passport = require("passport");
const router = express.Router();

router
  .route("/search")
  .get(passport.authenticate("twitter-token", { session: true }), search);

module.exports = router;
