import getTweetText from "../tweetProcessing/getTweetText";
const S = require("string");
const chalk = require("chalk");

const log = console.log;

/**
* Prints a tweet to the terminal
* @param {object} tweet The tweet to display
**/
const printTweet =  function(tweet, options){
  if (options.streamfilter){
    if (tweet.text !== undefined && S(tweet.text).contains(options.streamfilter)){
      log(`[${tweet.user.screen_name} (id-${tweet.user.id_str})] ${getTweetText(tweet)}\n`);
    }
  }else{
    log(`[${chalk.green(tweet.user.screen_name)} (id-${tweet.user.id_str})] ${getTweetText(tweet)}\n`);
  }
};

export default printTweet;
