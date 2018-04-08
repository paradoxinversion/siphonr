const path = require("path");
module.exports =(() => {
  let config = {};
  const getEnv = () => {
    return process.env.NODE_ENV;
  };
  const makeConfig = () => {
    if (getEnv() === "development"){
      require("dotenv").config({path: path.join(__dirname, "../../.dev.env")});
    } else if ( getEnv() === "development" === "production"){
      require("dotenv").config({path: path.join(__dirname, "../../.prod.env")});
    }

    config = {
      twitter: {
        consumer_key : process.env.TWITTER_CONSUMER_KEY,
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
      db:{
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
        port: process.env.MONGO_PORT,
        url: process.env.MONGO_URL,
        database: process.env.MONGO_DATABASE
      }
    };
    return config;
  };

  const getConfig = () => {
    return config;
  };

  makeConfig();
  return {
    getEnv,
    getConfig
  };
})();
