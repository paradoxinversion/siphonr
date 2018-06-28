const Twitter = require("twitter");
const twitterConfig = require("../../config/config.js").getConfig().twitter;

//
/**
 * Takes a screen name and returns 20 (or more) tweets in the timeline
 * @param {string} token the user's authentication token from twitter
 * @param {string} secet the user's authentication secret from twitter
 * @param {string} screenName the screen name of the user to search
 * @param {number} count the amount of tweets to retrives
 * @param {string} from the tweet to begin retrieving from, if not the beginning of the timeline
 * @param {number} maxRuns the max amount of times to attempt to get more data
 * @returns An object with information about and links to the media in the tweet
 **/
const getUserTimeline = async (
  token,
  secret,
  screenName,
  count,
  from = undefined,
  maxRuns = 15
) => {
  count = count === undefined ? 20 : count;
  let twitterResult;
  try {
    const config = {
      consumer_key: twitterConfig.consumer_key,
      consumer_secret: twitterConfig.consumer_secret,
      access_token_key: token,
      access_token_secret: secret,
      callbackURL: twitterConfig.callbackURL
    };
    const client = await new Twitter(config);
    if (count === undefined || count <= 200) {
      try {
        twitterResult = await client.get("statuses/user_timeline", {
          screen_name: screenName,
          count: count,
          include_rts: true,
          tweet_mode: "extended"
        });
        return twitterResult;
      } catch (e) {
        throw e;
      }
    } else {
      try {
        let collectedTweets = [];
        const tweetProgress = {
          tweetsProcessed: 0,
          processTimes: 0,
          last_id: from,
          done: false
        };
        while (tweetProgress.tweetsProcessed < count) {
          const newTweets = await client.get("statuses/user_timeline", {
            screen_name: screenName,
            count: 200,
            include_rts: true,
            tweet_mode: "extended",
            max_id: tweetProgress.last_id
          });
          collectedTweets = collectedTweets.concat(newTweets);
          tweetProgress.tweetsProcessed = collectedTweets.length;
          tweetProgress.processTimes++;
          if (
            newTweets[newTweets.length - 1].id_str === tweetProgress.last_id
          ) {
            twitterResult = collectedTweets;
            break;
          }
          tweetProgress.last_id = newTweets[newTweets.length - 1].id_str;
          twitterResult = collectedTweets;
          if (tweetProgress.processTimes === maxRuns) {
            break;
          }
        }
        return twitterResult;
      } catch (e) {
        console.error("Error getting timeline::", e);
        throw e;
      }
    }
  } catch (e) {
    console.error("Error getting timeline::", e);
    throw e;
  }
};

module.exports = getUserTimeline;
