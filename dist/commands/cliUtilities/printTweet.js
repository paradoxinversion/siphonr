"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getTweetText = require("../tweetProcessing/getTweetText");

var _getTweetText2 = _interopRequireDefault(_getTweetText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = require("string");
var chalk = require("chalk");

var log = console.log;

/**
* Prints a tweet to the terminal
* @param {object} tweet The tweet to display
**/
var printTweet = function printTweet(tweet, options) {
  if (options.streamfilter) {
    if (tweet.text !== undefined && S(tweet.text).contains(options.streamfilter)) {
      log("[" + tweet.user.screen_name + " (id-" + tweet.user.id_str + ")] " + (0, _getTweetText2.default)(tweet) + "\n");
    }
  } else {
    log("[" + chalk.green(tweet.user.screen_name) + " (id-" + tweet.user.id_str + ")] " + (0, _getTweetText2.default)(tweet) + "\n");
  }
};

exports.default = printTweet;