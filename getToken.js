const getBearerToken = require("get-twitter-bearer-token");
const twitterConfig = require("./src/config/config.js").getConfig().twitter;

const twitter_consumer_key = twitterConfig.consumer_key;
const twitter_consumer_secret = twitterConfig.consumer_secret;

getBearerToken(twitter_consumer_key, twitter_consumer_secret, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    // bearer token
    console.log(res.body.access_token);
  }
});

getBearerToken(twitter_consumer_key, twitter_consumer_secret);
