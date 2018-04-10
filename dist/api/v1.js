"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _search = require("./search");

var _search2 = _interopRequireDefault(_search);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.use(function (req, res, next) {
  console.log(process.env.NODE_ENV);
  var origin = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "http://siphonr-overview.herokuapp.com";
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Expose-Headers", "x-auth-token");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
router.route("/search").get(_passport2.default.authenticate("twitter-token", { session: true }), _search2.default);

module.exports = router;