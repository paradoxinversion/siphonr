// const utilities = require("../siphonr-utilities.js");
const { client } = require("../client");
const _ = require("lodash");
const chalk = require("chalk");
const isTweet = _.conforms({
  contributors: _.isObject,
  id_str: _.isString,
  text: _.isString,
});
module.exports = function getStatusStream(searchQuery, options, callback){
  // console.log(callback);
  client.stream("statuses/filter", {track: searchQuery}, function(stream){
    stream.on("data", function(tweet){
      try{
        if (options.inclretweets && tweet.retweeted_status && isTweet){
          if (callback){
            callback(tweet, options);
          }
          return tweet;
        }else if (!tweet.retweeted_status && isTweet){
          if (callback){
            callback(tweet, options);
          }
          return tweet;
        }
      }catch (e){
        console.log(chalk.red("An error has occured"));
      }
    });
    stream.on("error", function(error){
      throw error;
    });
  });
};
