"use strict";

var path = require("path");
module.exports = function () {
  var config = {};
  var getEnv = function getEnv() {
    return process.env.NODE_ENV;
  };
  var makeConfig = function makeConfig() {
    if (getEnv() === "development") {
      require("dotenv").config({ path: path.join(__dirname, "../../.dev.env") });
    }

    config = {
      twitter: {
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK_URL
      },
      jwt: {
        jwt_secret: process.env.JWT_SECRET
      },
      session: {
        session_secret: process.env.EXPRESS_SESSION_SECRET
      },
      general: {
        port: process.env.PORT
      },
      db: {
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
        port: process.env.MONGO_PORT,
        url: process.env.MONGODB_URI,
        database: process.env.MONGO_DATABASE
      }
    };
    return config;
  };

  var getConfig = function getConfig() {
    return config;
  };

  makeConfig();
  return {
    getEnv: getEnv,
    getConfig: getConfig
  };
}();