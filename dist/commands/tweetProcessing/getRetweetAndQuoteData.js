"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getTweetHashtags = require("./getTweetHashtags");

var _getTweetHashtags2 = _interopRequireDefault(_getTweetHashtags);

var _getTweetMedia = require("./getTweetMedia");

var _getTweetMedia2 = _interopRequireDefault(_getTweetMedia);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRetweetAndQuoteData = function getRetweetAndQuoteData(tweet) {
  try {
    if (tweet.created_at !== undefined) {
      return {
        retweet: tweet.retweeted_status ? {
          created_at: tweet.retweeted_status.created_at,
          id_str: tweet.retweeted_status.id_str,
          full_text: tweet.retweeted_status.full_text,
          hashtags: (0, _getTweetHashtags2.default)(tweet),
          in_reply_to_status_id_str: tweet.retweeted_status.in_reply_to_status_id_str,
          in_reply_to_user_id_str: tweet.retweeted_status.in_reply_to_user_id_str,
          in_reply_to_screen_name: tweet.retweeted_status.in_reply_to_screen_name,
          is_quote_status: tweet.retweeted_status.is_quote_status,
          retweet_count: tweet.retweeted_status.retweet_count,
          favorite_count: tweet.retweeted_status.favorite_count,
          favorited: tweet.retweeted_status.favorited,
          retweeted: tweet.retweeted_status.retweeted,
          media: (0, _getTweetMedia2.default)(tweet.retweeted_status)
        } : null,
        quote: tweet.quoted_status ? {
          created_at: tweet.quoted_status.created_at,
          id_str: tweet.quoted_status.id_str,
          full_text: tweet.quoted_status.full_text,
          hashtags: (0, _getTweetHashtags2.default)(tweet),
          in_reply_to_status_id_str: tweet.quoted_status.in_reply_to_status_id_str,
          in_reply_to_user_id_str: tweet.quoted_status.in_reply_to_user_id_str,
          in_reply_to_screen_name: tweet.quoted_status.in_reply_to_screen_name,
          is_quote_status: tweet.quoted_status.is_quote_status,
          retweet_count: tweet.quoted_status.retweet_count,
          favorite_count: tweet.quoted_status.favorite_count,
          favorited: tweet.quoted_status.favorited,
          retweeted: tweet.quoted_status.retweeted,
          media: (0, _getTweetMedia2.default)(tweet.quoted_status)
        } : null
      };
    }
  } catch (e) {
    console.log(e);
  }
};

exports.default = getRetweetAndQuoteData;