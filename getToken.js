const getBearerToken = require("get-twitter-bearer-token");
const twitterConfig = require("./src/config/config.js").getConfig().twitter;

const twitter_consumer_key =
  twitterConfig.consumer_key || process.env.TWITTER_CONSUMER_KEY;
const twitter_consumer_secret =
  twitterConfig.consumer_secret || process.env.TWITTER_CONSUMER_SECRET;

getBearerToken(twitter_consumer_key, twitter_consumer_secret, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    // bearer token
    console.log(res.body.access_token);
  }
});

getBearerToken(twitter_consumer_key, twitter_consumer_secret);
