"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
* Returns an array(?) of users mentioned in the supplied tweet
* @param {object} tweet
* @returns An array(?) of users mentioned in the tweet
**/
var getUserMentions = function getUserMentions(tweet) {
  return tweet.entities.user_mentions;
};

exports.default = getUserMentions;