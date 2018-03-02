const fs = require("fs");
const S = require("string");
const chalk = require("chalk");
const log = console.log;
const sentiment = require("sentiment");

const loadLocalTweetData = () => {
  const tweets = fs.readFileSync("./tweetdata.txt", "utf8");
  return JSON.parse(tweets);
}
const getTweetText = function(tweet){
  if (tweet.full_text){
    return tweet.full_text;
  } else{
    return tweet.text;
  }
};

const displayTweet =  function(tweet, options){
  if (options.streamfilter){
    if (tweet.text !== undefined && S(tweet.text).contains(options.streamfilter)){
      log(`[${tweet.user.screen_name} (id-${tweet.user.id_str})] ${getTweetText(tweet)}\n`);
    }
  }else{
    log(`[${chalk.green(tweet.user.screen_name)} (id-${tweet.user.id_str})] ${getTweetText(tweet)}\n`);
  }
  // log(getTweetSentiment(tweet));
};

const displayMultipleTweets = function(tweets, options){
  if (tweets.statuses){
    tweets.statuses.forEach((tweet) =>{
      displayTweet(tweet, options);
    });
  } else{
    tweets.forEach((tweet) =>{
      displayTweet(tweet, options);
    });
  }
};

const getTweetSentiment = function(tweet){
  const tweetSentiment = sentiment(getTweetText(tweet));
  return tweetSentiment;
};

const logTweetData = function(tweet){
  log(tweet);
};
const getTweetArrayData = function(tweetArray){
  const tweets = [];
  tweetArray.forEach((tweet) => {
    tweets.push(tweet);
  })
  return tweets;
};
const getUserMentions = function(tweet){
  return tweet.entities.user_mentions;
};
const getRetweetCount = function(tweet){
  if (tweet.retweeted){
    return tweet.retweet_count;
  }
  return 0;
};

const getHashtags = function(tweet){
  return tweet.entities.hashtags;
};

// Returns data about what the tweet was in reply to (if it was a reply)
// Does not return the referenced tweet
const getReplyData = function(tweet){
  const replyData = {
    statusIdStr : null,
    userIdStr: null,
  };
  if (tweet.in_reply_to_status_id != null){
    replyData.statusIdStr = tweet.in_reply_to_status_id;
    replyData.userIdStr = tweet.in_reply_to_user_id_str;
  }
  return replyData;
};
const logMultipleTweetData = function(tweets){
  tweets.forEach((tweet) =>{
    log(tweet);
  });
};

// Returns an array of tweet media
const getTweetMedia = function(tweet){
  let tweetMediaResult = [];
  if (tweet.extended_entities){
    if (tweet.extended_entities.media){
      tweet.extended_entities.media.forEach((media) => {
        if (media.type === "video"){
          const tweetVideo = {
            type: "video",
            duration_millis: media.duration_millis,
            variants: [],
            monetizable: false
          };

          media.video_info.variants.forEach((videoVariant) => {
            if (videoVariant.content_type === "video/mp4"){
              tweetVideo.variants.push(videoVariant);
            }
          });
          if (media.additonal_media_info){
            tweetMediaResult.monetizable = media.additional_media_info.monetizable;
          }
          tweetMediaResult.push(tweetVideo);
        } else if (media.type === "photo"){
          const tweetPhoto = {
            type: "photo",
            media_url_https: media.media_url_https
          };
          tweetMediaResult.push(tweetPhoto);
          // tweetMediaResult.type = "photo";
          // tweetMediaResult.media_url_https = media.media_url_https;
        }
      });
    }
  }
  console.log("media result", tweetMediaResult);
  return tweetMediaResult;
};
module.exports = {
  displayTweet,
  displayMultipleTweets,
  logTweetData,
  logMultipleTweetData,
  getUserMentions,
  getRetweetCount,
  getHashtags,
  getReplyData,
  loadLocalTweetData,
  getTweetArrayData,
  getTweetMedia
};
