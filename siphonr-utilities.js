const fs = require("fs");
const S = require("string");

const getSecrets = function(){
  return JSON.parse(fs.readFileSync("secrets.json"));
};
const displayTweet = function(tweet, options){
  if (options.streamfilter){
    if (tweet.text !== undefined && S(tweet.text).contains(options.streamfilter)){
      console.log(`[${tweet.user.screen_name}] ${tweet.text}\n`);
    }
  }else{
    console.log(`[${tweet.user.screen_name}] ${tweet.text}\n`);
  }
};
module.exports = {getSecrets, displayTweet};
