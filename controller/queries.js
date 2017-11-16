const queries = require("../db/queries");

module.exports = {
  addUser: queries.addUser,
  addTweet: queries.addTweetJSON,
  addMultipleTweets: queries.addMultipleTweets
};
