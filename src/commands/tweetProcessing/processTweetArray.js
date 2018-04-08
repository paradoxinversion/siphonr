import getTweetHashtagsFromArray from "./getTweetHashtagsFromArray";
import getRetweetAndQuoteData from "./getRetweetAndQuoteData";
import getTweetMedia from "./getTweetMedia";
import getTweetText from "./getTweetText";
import getRetweetCount from "./getRetweetCount";
import getTweetUrlData from "./getTweetUrlData";
const processTweetArray = (tweets) => {
  const tweetData = tweets.map((tweet) => {
    return {
      created_at: tweet.created_at,
      id_str: tweet.id_str,
      full_text: getTweetText(tweet),
      hashtags: getTweetHashtagsFromArray(tweets),
      in_reply_to_status_id_str: tweet.in_reply_to_status_id_str,
      in_reply_to_user_id_str: tweet.in_reply_to_user_id_str,
      in_reply_to_screen_name: tweet.in_reply_to_screen_name,
      is_quote_status: tweet.is_quote_status,
      retweet_count: tweet.retweet_count,
      favorite_count: getRetweetCount(tweet),
      favorited: tweet.favorited,
      retweeted: tweet.retweeted,
      media: getTweetMedia(tweet),
      quote_retweet: getRetweetAndQuoteData(tweet),
      urlData: getTweetUrlData(tweet)
    };
  });

  return tweetData;
};

export default processTweetArray;
