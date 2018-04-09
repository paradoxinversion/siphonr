"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var packageResponse = function packageResponse(user, processedTweets, mostCommonHashtags) {
  return {
    user: user,
    mostCommonHashtags: mostCommonHashtags,
    processedTweets: processedTweets,
    topTweetsByRT: Object.assign([], processedTweets).sort(function (a, b) {
      return b.retweet_count - a.retweet_count;
    })
  };
};

exports.default = packageResponse;