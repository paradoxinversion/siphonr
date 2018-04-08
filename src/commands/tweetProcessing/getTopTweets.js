const getTopTweets = (tweetArray, byRetweet = false)=>{
  const topTweets = tweetArray.map((tweet) => {
    return {
      created_at: tweet.created_at,
      id_str: tweet.id_str,
      full_text: tweet.full_text,
      in_reply_to_status_id_str: tweet.in_reply_to_status_id_str,
      in_reply_to_user_id_str: tweet.in_reply_to_user_id_str,
      in_reply_to_screen_name: tweet.in_reply_to_screen_name,
      is_quote_status: tweet.is_quote_status,
      retweet_count: tweet.retweet_count,
      favorite_count: tweet.favorite_count,
      favorited: tweet.favorited,
      retweeted: tweet.retweeted,

    };
  }).sort((a,b) =>{
    if (byRetweet){
      return b.retweet_count - a.retweet_count;
    } else{
      return b.favorite_count - a.favorite_count;
    }
  });
  return topTweets;

};

export default getTopTweets;
