/**
* Returns the amount of times the supplies tweet was retweeted
* @param {object} tweet
* @returns An object with the amount of retweets
**/
const getRetweetCount = function(tweet){
  if (tweet.retweeted){
    return tweet.retweet_count;
  }
  return 0;
};

export default getRetweetCount;
