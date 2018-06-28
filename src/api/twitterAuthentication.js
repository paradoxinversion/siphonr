const passport = require("passport");
const express = require("express");
const twitterConfig = require("../config/config.js").getConfig().twitter;
const apiUtilities = require("./helpers/apiUtilities");
const request = require("request");
const cors = require("cors");
const router = express.Router();

const corsOptions = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"]
};
router.use(cors(corsOptions));

router.route("/twitter/reverse").post(function(req, res) {
  request.post(
    {
      url: "https://api.twitter.com/oauth/request_token",
      oauth: {
        oauth_callback: twitterConfig.callbackURL,
        consumer_key: twitterConfig.consumer_key,
        consumer_secret: twitterConfig.consumer_secret
      }
    },
    function(err, r, body) {
      if (err) {
        return res.send(500, { message: err.message });
      }

      const jsonStr =
        '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      res.send(JSON.parse(jsonStr));
    }
  );
});

router.route("/twitter").post(
  (req, res, next) => {
    request.post(
      {
        url: "https://api.twitter.com/oauth/access_token?oauth_verifier",
        oauth: {
          consumer_key: twitterConfig.consumer_key,
          consumer_secret: twitterConfig.consumer_secret,
          token: req.query.oauth_token
        },
        form: { oauth_verifier: req.query.oauth_verifier }
        //consider setting app/json as content type to see if it causes t to send back same
      },
      function(err, r, body) {
        if (err) {
          return res.send(500, { message: err.message });
        }

        const bodyString =
          '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
        const parsedBody = JSON.parse(bodyString);

        req.body["oauth_token"] = parsedBody.oauth_token;
        req.body["oauth_token_secret"] = parsedBody.oauth_token_secret;
        req.body["user_id"] = parsedBody.user_id;
        next();
      }
    );
  },
  passport.authenticate("twitter-token", { session: true }),
  function(req, res, next) {
    if (!req.user) {
      return res.send(401, "User Not Authenticated");
    }

    req.auth = {
      id: req.user.id
    };
    return next();
  },
  apiUtilities.generateToken,
  apiUtilities.sendToken
);

module.exports = router;
