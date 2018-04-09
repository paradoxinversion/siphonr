"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Returns an array of hashtags from a tweet containing them, or an empty array if no hashtags exist
var getTweetHashtagsFromArray = function getTweetHashtagsFromArray(tweetArr) {
  var hashtags = [];
  tweetArr.forEach(function (tweet) {
    tweet.entities.hashtags.forEach(function (tag) {
      hashtags.push(tag.text);
    });
  });
  return hashtags;
};

exports.default = getTweetHashtagsFromArray;