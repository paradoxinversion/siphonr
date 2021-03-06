const sentiment = require("sentiment");
import getTweetText from "./getTweetText";

/**
 * Returns a numerical 'sentiment' of the tweet's text according to the sentiment library
 * @param {object} tweet
 * @returns A numer representing the text sentiment
 **/
const getTweetSentiment = tweet => {
  const tweetSentiment = sentiment(getTweetText(tweet));
  return tweetSentiment;
};

module.exports = getTweetSentiment;
