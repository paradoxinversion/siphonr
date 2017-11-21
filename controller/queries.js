const queries = require("../db/queries");

module.exports = {
  addTweet: queries.addTweet,
  getTweetsByUserId: queries.getTweetsByUserId,
  returnAllTweets: queries.returnAllTweets,
  removeTweetById: queries.removeTweetById
};
