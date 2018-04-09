"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getTweetHashtagsFromArray = require("./getTweetHashtagsFromArray");

var _getTweetHashtagsFromArray2 = _interopRequireDefault(_getTweetHashtagsFromArray);

var _getRetweetAndQuoteData = require("./getRetweetAndQuoteData");

var _getRetweetAndQuoteData2 = _interopRequireDefault(_getRetweetAndQuoteData);

var _getTweetMedia = require("./getTweetMedia");

var _getTweetMedia2 = _interopRequireDefault(_getTweetMedia);

var _getTweetText = require("./getTweetText");

var _getTweetText2 = _interopRequireDefault(_getTweetText);

var _getRetweetCount = require("./getRetweetCount");

var _getRetweetCount2 = _interopRequireDefault(_getRetweetCount);

var _getTweetUrlData = require("./getTweetUrlData");

var _getTweetUrlData2 = _interopRequireDefault(_getTweetUrlData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processTweetArray = function processTweetArray(tweets) {
  var tweetData = tweets.map(function (tweet) {
    return {
      created_at: tweet.created_at,
      id_str: tweet.id_str,
      full_text: (0, _getTweetText2.default)(tweet),
      hashtags: (0, _getTweetHashtagsFromArray2.default)(tweets),
      in_reply_to_status_id_str: tweet.in_reply_to_status_id_str,
      in_reply_to_user_id_str: tweet.in_reply_to_user_id_str,
      in_reply_to_screen_name: tweet.in_reply_to_screen_name,
      is_quote_status: tweet.is_quote_status,
      retweet_count: tweet.retweet_count,
      favorite_count: (0, _getRetweetCount2.default)(tweet),
      favorited: tweet.favorited,
      retweeted: tweet.retweeted,
      media: (0, _getTweetMedia2.default)(tweet),
      quote_retweet: (0, _getRetweetAndQuoteData2.default)(tweet),
      urlData: (0, _getTweetUrlData2.default)(tweet)
    };
  });

  return tweetData;
};

exports.default = processTweetArray;