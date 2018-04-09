"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getTweetText = require("./getTweetText");

var _getTweetText2 = _interopRequireDefault(_getTweetText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sentiment = require("sentiment");


/**
* Returns a numerical 'sentiment' of the tweet's text according to the sentiment library
* @param {object} tweet
* @returns A numer representing the text sentiment
**/
var getTweetSentiment = function getTweetSentiment(tweet) {
  var tweetSentiment = sentiment((0, _getTweetText2.default)(tweet));
  return tweetSentiment;
};

exports.default = getTweetSentiment;