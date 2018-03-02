const { client } = require("../client");
const siphonerUtilities = require("../siphonr-utilities");
import getTweetHashtagsFromArray from "./getTweetHashtagsFromArray";
import getMostCommonHashTags from "./getMostCommonHashTags";
import getTopTweets from "./getTopTweets";

// Takes a screen name and returns 20 (or more) tweets in the timeline
const getTimeLine = async (screenName, count, from = undefined, maxRuns = 15) => {

  count = count === undefined ? 20 : count;
  let twitterResult;
  try{
    if (count === undefined || count <= 200){
      try {
        twitterResult = await client.get( "statuses/user_timeline",{
          screen_name: screenName,
          count: count,
          include_rts: true,
          tweet_mode: 'extended',
        });
      } catch (e){
        throw e;
      }
    } else{
      try {
        let collectedTweets = [];
        const tweetProgress = {
          tweetsProcessed: 0,
          processTimes: 0,
          last_id: from,
          done: false
        };
        while (tweetProgress.tweetsProcessed < count){
          const newTweets = await client.get( "statuses/user_timeline",{
            screen_name: screenName,
            count: 200,
            include_rts: true,
            tweet_mode: 'extended',
            max_id: tweetProgress.last_id
          });
          collectedTweets = collectedTweets.concat(newTweets);
          tweetProgress.tweetsProcessed = collectedTweets.length;
          tweetProgress.processTimes++;
          if (newTweets[newTweets.length - 1].id_str === tweetProgress.last_id){
            twitterResult = collectedTweets;
            break;
          }
          tweetProgress.last_id = newTweets[newTweets.length-1].id_str;
          twitterResult = collectedTweets;
          if (tweetProgress.processTimes === maxRuns){
            break;
          }
        }
      } catch (e){
        throw e;
      }
    }
  } catch (e){
    throw e;
  }

  const tweetData = twitterResult.map((tweet) => {

    return {
      created_at: tweet.created_at,
      id_str: tweet.id_str,
      full_text: tweet.full_text,
      hashtags: getTweetHashtagsFromArray(twitterResult),
      in_reply_to_status_id_str: tweet.in_reply_to_status_id_str,
      in_reply_to_user_id_str: tweet.in_reply_to_user_id_str,
      in_reply_to_screen_name: tweet.in_reply_to_screen_name,
      is_quote_status: tweet.is_quote_status,
      retweet_count: tweet.retweet_count,
      favorite_count: tweet.favorite_count,
      favorited: tweet.favorited,
      retweeted: tweet.retweeted,
      media: siphonerUtilities.getTweetMedia(tweet)
    };
  });
  // console.log(twitterResult);
  const timelineData = {
    user: {
      id_str: twitterResult[0].user.id_str,
      name: twitterResult[0].user.name,
      screen_name: twitterResult[0].user.screen_name,
      location: twitterResult[0].user.location,
      description: twitterResult[0].user.description,
      created_at: twitterResult[0].user.created_at,
      followers_count: twitterResult[0].user.followers_count,
      friends_count: twitterResult[0].user.friends_count,
      verified: twitterResult[0].user.verified,
      statuses_count: twitterResult[0].user.statuses_count,
      default_profile: twitterResult[0].user.default_profile,
      default_profile_image: twitterResult[0].user.default_profile_image,
      profile_image: twitterResult[0].user.profile_image_url_https.replace(/_normal/, "_400x400"),
      most_common_hashtags: getMostCommonHashTags(twitterResult)
    },
    tweetData,
    topTweets: getTopTweets(twitterResult)
  };
  // console.log(timelineData);
  return timelineData;
};
export default getTimeLine;
