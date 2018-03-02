const utilities = require("../siphonr-utilities.js");
const { client } = require("../client");

module.exports = async function getSearchResults(searchQuery, options, callback){
  const tweets = await client.get("search/tweets", {q: searchQuery, count: options.count});
  const refinedResults = tweets.statuses.filter((element) => {
    if (options.inclretweets && element.retweeted_status){
      console.log("Including Retweets");
      return true;
    } else if (!element.retweeted_status){
      return true;
    }
  });
  if (callback) callback(refinedResults, options);
};
