const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const jwtConfig = require("../../config/config.js").getConfig().jwt;

const createToken = (auth) => {
  return jwt.sign({
    id: auth.id
  }, jwtConfig.jwt_secret,
  {
    expiresIn: "1d"
  });
};

const generateToken = function(req, res, next) {
  req.token = createToken(req.auth);
  return next();
};

const sendToken = function(req, res){
  res.setHeader("x-auth-token", req.token);
  return res.status(200).send(JSON.stringify(req.user));
};

const authenticate = expressJwt({
  secret: jwtConfig.jwt_secret,
  requestProperty: "auth",
  getToken: function(req){
    if (req.headers['x-auth-token']){
      return req.headers["x-auth-token"];
    }
    return null;
  }
});

module.exports = {
  generateToken,
  sendToken
};
