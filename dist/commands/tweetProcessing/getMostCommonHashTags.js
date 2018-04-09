"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
* Returns a tuple with the hashtag and how many times it has been used, in order
* @param {object} tweet
* @returns An object with more information about the reply
**/
var getMostCommonHashTags = function getMostCommonHashTags(tweetArray) {
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

  var rawTagFrequency = {};
  tweetArray.forEach(function (tweet) {
    if (tweet.entities.hashtags.length > 0) {
      tweet.entities.hashtags.forEach(function (element) {
        var tag = element.text.toLowerCase();
        if (!rawTagFrequency[tag]) {
          rawTagFrequency[tag] = 1;
        } else {
          rawTagFrequency[tag] = rawTagFrequency[tag] + 1;
        }
        return tweet.entities.hashtags;
      });
    }
  });
  return Object.entries(rawTagFrequency).sort(function (a, b) {
    return b[1] - a[1];
  }).slice(0, amount);
};

exports.default = getMostCommonHashTags;