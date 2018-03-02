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
  {name: "streamfilter", alias: "s", type: String}
];
const options = commandLineArgs(optionDefinitions);

const command = process.argv[2];
const searchQuery = process.argv[3];

const runCLI = async () => {
  try {
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

      console.log(getMostCommonHashTags(result, 20));

      break;
    case "post":
      postSingleTweet(searchQuery, options, utilities.displayTweet);
      break;
    case "thread":
      postTweetThread(searchQuery, options, utilities.displayTweet);
      break;
    }
  } catch (e) {
    throw e;
  }

};
runCLI();
