"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
* Returns an array of hashtag strings found in a twet
* @param {object} tweet
* @returns An array of hashtag strings
**/
var getTweetHashtags = function getTweetHashtags(tweet) {
  var hashtags = [];
  tweet.entities.hashtags.forEach(function (hashtag) {
    hashtags.push(hashtag.text);
  });
  return hashtags;
};

exports.default = getTweetHashtags;