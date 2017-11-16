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

const addMultipleTweetsToDB = async function(tweets){
  for (let tweet of tweets){
    await queries.addTweet(tweet);
  }
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
  addMultipleTweetsToDB
};
