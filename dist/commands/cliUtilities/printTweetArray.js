"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _printTweet = require("./printTweet");

var _printTweet2 = _interopRequireDefault(_printTweet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Prints an array of tweets to the terminal using printTweet
* @param {object} tweet The tweet to display
**/
var printTweetArray = function printTweetArray(tweets, options) {
  if (tweets.statuses) {
    tweets.statuses.forEach(function (tweet) {
      (0, _printTweet2.default)(tweet, options);
    });
  } else {
    tweets.forEach(function (tweet) {
      (0, _printTweet2.default)(tweet, options);
    });
  }
};

exports.default = printTweetArray;