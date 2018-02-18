const commands = "../commands";
const getUserFavorites = require(commands + "/getUserFavorites");
const getUserTimeline = require(commands + "/getUserTimeline");
const searchTweets = require(commands + "/searchTweets");
const streamTweets = require(commands + "/streamTweets");
const postSingleTweet = require(commands + "/postSingleTweet");
const postTweetThread = require(commands + "/postTweetThread");
const getMostCommonHashTags = require(commands + "/getMostCommonHashTags");
module.exports = {
  getUserFavorites,
  getUserTimeline,
  searchTweets,
  streamTweets,
  postSingleTweet,
  postTweetThread,
  getMostCommonHashTags
};
