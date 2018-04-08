const packageResponse = (user, processedTweets, mostCommonHashtags) => {
  return {
    user,
    mostCommonHashtags,
    processedTweets,
    topTweetsByRT: Object.assign([],processedTweets).sort((a,b) =>{
      return b.retweet_count - a.retweet_count; })
  };
};

export default packageResponse;
