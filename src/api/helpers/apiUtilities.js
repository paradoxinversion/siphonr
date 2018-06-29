const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const jwtConfig = require("../../config/config.js").getConfig().jwt;

// Creates a new webtoken based on the data recieved from twitter
const createToken = auth => {
  return jwt.sign(
    {
      id: auth.id
    },
    jwtConfig.jwt_secret || process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );
};

const generateToken = function(req, res, next) {
  req.token = createToken(req.auth);
  return next();
};

const sendToken = function(req, res) {
  res.setHeader("x-auth-token", req.token);
  return res.status(200).send(JSON.stringify(req.user));
};

const authenticate = expressJwt({
  secret: jwtConfig.jwt_secret || process.env.JWT_SECRET,
  requestProperty: "auth",
  getToken: function(req) {
    if (req.headers["x-auth-token"]) {
      return req.headers["x-auth-token"];
    }
    return null;
  }
});

module.exports = {
  generateToken,
  sendToken
};
