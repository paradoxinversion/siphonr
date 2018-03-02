const path = require("path");
module.exports =(() => {
  let config = {};
  const getEnv = () => {
    return process.env.NODE_ENV;
  };
  const makeConfig = () => {
    if (getEnv() === "development"){
      require("dotenv").config({path: path.join(__dirname, "../../.env")});
    }

    config = {
      twitter: {
        consumer_key : process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
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
