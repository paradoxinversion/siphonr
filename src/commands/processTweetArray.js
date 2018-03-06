const siphonrUtilities = require("../siphonr-utilities");
import getTweetHashtagsFromArray from "./getTweetHashtagsFromArray";
export default (tweets) => {
  const tweetData = tweets.map((tweet) => {
    if (tweet.retweeted_status){
      console.log(tweet.retweeted_status);
    }
    return {
      created_at: tweet.created_at,
      id_str: tweet.id_str,
      full_text: tweet.full_text,
      hashtags: getTweetHashtagsFromArray(tweets),
      in_reply_to_status_id_str: tweet.in_reply_to_status_id_str,
      in_reply_to_user_id_str: tweet.in_reply_to_user_id_str,
      in_reply_to_screen_name: tweet.in_reply_to_screen_name,
      is_quote_status: tweet.is_quote_status,
      retweet_count: tweet.retweet_count,
      favorite_count: tweet.favorite_count,
      favorited: tweet.favorited,
      retweeted: tweet.retweeted,
      media: siphonrUtilities.getTweetMedia(tweet),
      retweet: tweet.retweeted_status ? {
        created_at: tweet.retweeted_status.created_at,
        id_str: tweet.retweeted_status.id_str,
        full_text: tweet.retweeted_status.full_text,
        // hashtags: getTweetHashtagsFromArray(tweets),
        in_reply_to_status_id_str: tweet.retweeted_status.in_reply_to_status_id_str,
        in_reply_to_user_id_str: tweet.retweeted_status.in_reply_to_user_id_str,
        in_reply_to_screen_name: tweet.retweeted_status.in_reply_to_screen_name,
        is_quote_status: tweet.retweeted_status.is_quote_status,
        retweet_count: tweet.retweeted_status.retweet_count,
        favorite_count: tweet.retweeted_status.favorite_count,
        favorited: tweet.retweeted_status.favorited,
        retweeted: tweet.retweeted_status.retweeted,
        media: siphonrUtilities.getTweetMedia(tweet.retweeted_status),
      } : null
    };
  });

  return tweetData;
};
