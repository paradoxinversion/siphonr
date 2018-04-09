"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
* Returns the amount of times the supplies tweet was retweeted
* @param {object} tweet
* @returns An object with the amount of retweets
**/
var getRetweetCount = function getRetweetCount(tweet) {
  if (tweet.retweeted) {
    return tweet.retweet_count;
  }
  return 0;
};

exports.default = getRetweetCount;