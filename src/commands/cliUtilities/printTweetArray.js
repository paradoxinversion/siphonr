const printTweet = require("./printTweet");

/**
 * Prints an array of tweets to the terminal using printTweet
 * @param {object} tweet The tweet to display
 **/
const printTweetArray = function(tweets, options) {
  if (tweets.statuses) {
    tweets.statuses.forEach(tweet => {
      printTweet(tweet, options);
    });
  } else {
    tweets.forEach(tweet => {
      printTweet(tweet, options);
    });
  }
};

module.exports = printTweetArray;
