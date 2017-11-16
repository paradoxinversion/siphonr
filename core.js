#!/usr/local/bin/node
const commandLineArgs = require("command-line-args");
const utilities = require("./siphonr-utilities.js");
const { getUserFavorites,
  getUserTimeline,
  searchTweets,
  streamTweets,
  postSingleTweet,
  postTweetThread } = require("./controller/commands");
const optionDefinitions = [
  {name: "count", alias: "c", type: Number},
  {name: "noreplies", alias: "r", type: Boolean},
  {name: "inclretweets", alias: "t", type: Boolean},
  // {name: "username", alias: "u", type: String},
  {name: "streamfilter", alias: "s", type: String}
];
const options = commandLineArgs(optionDefinitions);

const command = process.argv[2];
const searchQuery = process.argv[3];

const runCLI = function(){
  switch (command){
  case "stream":
    streamTweets(searchQuery, options, utilities.displayTweet);
    break;
  case "search":
    searchTweets(searchQuery, options, utilities.displayMultipleTweets);
    break;
  case "favorites":
    getUserFavorites(searchQuery, options, utilities.addMultipleTweetsToDB);
    break;
  case "timeline":
    getUserTimeline(searchQuery, options, utilities.displayMultipleTweets);
    break;
  case "post":
    postSingleTweet(searchQuery, options, utilities.displayMultipleTweets);
    break;
  case "thread":
    postTweetThread(searchQuery, options, utilities.displayMultipleTweets);
  }
};
runCLI();
