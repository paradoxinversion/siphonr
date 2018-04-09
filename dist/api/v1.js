"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _search = require("./search");

var _search2 = _interopRequireDefault(_search);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route("/search").get(_passport2.default.authenticate("twitter-token", { session: true }), _search2.default);

module.exports = router;