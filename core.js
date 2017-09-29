const Twitter = require("twitter");
const commandLineArgs = require("command-line-args");
const utilities = require("./siphonr-utilities.js");
/**
* Options
**/

const optionDefinitions = [
  {name: "count", alias: "c", type: Number},
  {name: "noreplies", alias: "r", type: Boolean},
  {name: "inclretweets", alias: "t", type: Boolean},
  {name: "username", alias: "u", type: String},
  {name: "streamfilter", alias: "s", type: String}
];
const options = commandLineArgs(optionDefinitions);

/**
* Main Args
**/
const mode = process.argv[2];
const searchQuery = process.argv[3];

const client = new Twitter(utilities.getSecrets());

const getStatusStream = function(){
  client.stream("statuses/filter", {track: searchQuery}, function(stream){
    stream.on("data", function(tweet){
      if (options.inclretweets && tweet.retweeted_status){
        utilities.displayTweet(tweet, options);
      }else if (!tweet.retweeted_status){
        utilities.displayTweet(tweet, options);
      }
    });
    stream.on("error", function(error){
      throw error;
    });
  });
};

const getSearchResults = function(){
  client.get("search/tweets", {q: searchQuery}, function(error, tweets, response){
    console.log(`Reporting ${tweets.statuses.length} results`);
    tweets.statuses.forEach(function(element, index){
      console.log(`Result ${index+1}: ${tweets.statuses[index].text}\n`);
    });
  });
};

const getFavoriteUserTweets = function(){
  client.get("favorites/list", {screen_name: searchQuery, count: options.count === undefined ? 20 : options.count}, function(error, tweets, response){
    if (error) throw error;
    tweets.forEach(function(element, index){
      console.log(`Result ${index+1}: ${tweets[index].text}\n`);
    });
  });
};

const getTimeLine = function(){
  client.get(
    "statuses/user_timeline",
    {
      screen_name: searchQuery,
      count: options.count === undefined ? 20 : options.count,
      exclude_replies: options.noreplies,
      include_rts: optionDefinitions.inclretweets === undefined ? false : true
    },
    function(error, tweets, response){
      if (error) throw error;
      tweets.forEach(function(element, index){
        console.log(`Result ${index+1}: ${tweets[index].text}\n`);
      });
    });
};

const commands = {
  stream : getStatusStream,
  search : getSearchResults,
  favorites : getFavoriteUserTweets,
  timeline : getTimeLine
};

commands[mode]();
