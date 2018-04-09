"use strict";

var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
var jwtConfig = require("../../config/config.js").getConfig().jwt;

// Creates a new webtoken based on the data recieved from twitter
var createToken = function createToken(auth) {
  return jwt.sign({
    id: auth.id
  }, jwtConfig.jwt_secret, {
    expiresIn: "1d"
  });
};

var generateToken = function generateToken(req, res, next) {
  req.token = createToken(req.auth);
  return next();
};

var sendToken = function sendToken(req, res) {
  res.setHeader("x-auth-token", req.token);
  return res.status(200).send(JSON.stringify(req.user));
};

var authenticate = expressJwt({
  secret: jwtConfig.jwt_secret,
  requestProperty: "auth",
  getToken: function getToken(req) {
    if (req.headers['x-auth-token']) {
      return req.headers["x-auth-token"];
    }
    return null;
  }
});

module.exports = {
  generateToken: generateToken,
  sendToken: sendToken
};