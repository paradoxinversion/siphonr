"use strict";

var commands = "../commands";
var getUserFavorites = require(commands + "/getUserFavorites");
var getUserTimeline = require(commands + "/getUserTimeline");
var searchTweets = require(commands + "/searchTweets");
var streamTweets = require(commands + "/streamTweets");
var postSingleTweet = require(commands + "/postSingleTweet");
var postTweetThread = require(commands + "/postTweetThread");
var getMostCommonHashTags = require(commands + "/getMostCommonHashTags");
module.exports = {
  getUserFavorites: getUserFavorites,
  getUserTimeline: getUserTimeline,
  searchTweets: searchTweets,
  streamTweets: streamTweets,
  postSingleTweet: postSingleTweet,
  postTweetThread: postTweetThread,
  getMostCommonHashTags: getMostCommonHashTags
};