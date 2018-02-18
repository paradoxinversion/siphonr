#!/usr/local/bin/node
const commandLineArgs = require("command-line-args");
const utilities = require("./siphonr-utilities.js");
const { getUserFavorites,
  getUserTimeline,
  searchTweets,
  streamTweets,
  postSingleTweet,
  postTweetThread,
  getMostCommonHashTags } = require("./controller/commands");

const optionDefinitions = [
  {name: "count", alias: "c", type: Number},
  {name: "noreplies", alias: "r", type: Boolean}, // Exclude replies?
  {name: "inclretweets", alias: "t", type: Boolean}, // Include Retweets?
  // {name: "username", alias: "u", type: String},
  {name: "streamfilter", alias: "s", type: String}
];
const options = commandLineArgs(optionDefinitions);

const command = process.argv[2];
const searchQuery = process.argv[3];

const runCLI = async function(){
  console.log("Options:", options);
  let result;
  switch (command){
  case "stream":
    streamTweets(searchQuery, options, utilities.displayTweet);
    break;
  case "search":
    searchTweets(searchQuery, options, utilities.displayMultipleTweets);
    break;
  case "favorites":
    getUserFavorites(searchQuery, options, utilities.displayMultipleTweets);
    break;
  case "timeline":
    result = await getUserTimeline(searchQuery, options);
    // utilities.displayMultipleTweets(result, options);
    getMostCommonHashTags(result);
    // result.forEach((el) => {
    //   console.log(utilities.getHashtags(el));
    // });
    break;
  case "post":
    postSingleTweet(searchQuery, options, utilities.displayTweet);
    break;
  case "thread":
    postTweetThread(searchQuery, options, utilities.displayTweet);
    break;
  }
};
runCLI();
