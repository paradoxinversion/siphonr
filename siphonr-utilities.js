const fs = require("fs");
const S = require("string");
const chalk = require("chalk");
const log = console.log;
const queries = require("./controller/queries");

const displayTweet =  function(tweet, options){
  if (options.streamfilter){
    if (tweet.text !== undefined && S(tweet.text).contains(options.streamfilter)){
      log(`[${tweet.user.screen_name} (id-${tweet.user.id_str})] ${tweet.text}\n`);
    }
  }else{
    log(`[${chalk.green(tweet.user.screen_name)} (id-${tweet.user.id_str})] ${tweet.text}\n`);
  }
  return queries.addTweet(tweet);
};

const displayMultipleTweets = function(tweets, options){
  if (tweets.statuses){
    tweets.statuses.forEach((tweet) =>{
      // console.log(tweet.text);
      displayTweet(tweet, options);
    });
  } else{
    tweets.forEach((tweet) =>{
      displayTweet(tweet, options);
    });
  }
};

const addSingleTweetToDB = async function(tweet){
  await queries.addTweet(tweet);
}

/**
* Adds an array of tweets to the database.
* @param {Array} tweets An array of tweets to attempt to add to the db.
*/
const addMultipleTweetsToDB = async function(tweets){
  for (let tweet of tweets){
    await queries.addTweet(tweet);
  }
  console.log(`Added ${tweets.length} tweets.`)
};
const logTweetData = function(tweet){
  log(tweet);
};

const logMultipleTweetData = function(tweets){
  tweets.forEach((tweet) =>{
    log(tweet);
  });
};
module.exports = {
  displayTweet,
  displayMultipleTweets,
  logTweetData,
  logMultipleTweetData,
  addSingleTweetToDB,
  addMultipleTweetsToDB
};
