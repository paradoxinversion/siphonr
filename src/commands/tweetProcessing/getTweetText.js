/**
* Returns the text of a tweet
* @param {object} tweet
* @returns The full text of the tweet if it is extended, or the truncated tweet text.
**/
const getTweetText = function(tweet){
  if (tweet.full_text){
    return tweet.full_text;
  } else{
    return tweet.text;
  }
};

export default getTweetText;
