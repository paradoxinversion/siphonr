"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
* Returns the text of a tweet
* @param {object} tweet
* @returns The full text of the tweet if it is extended, or the truncated tweet text.
**/
var getTweetText = function getTweetText(tweet) {
  if (tweet.full_text) {
    return tweet.full_text;
  } else {
    return tweet.text;
  }
};

exports.default = getTweetText;