// Returns an array of hashtags from a tweet containing them, or an empty array if no hashtags exist
const getTweetHashtagsFromArray = tweetArr => {
  let hashtags = [];
  tweetArr.forEach(tweet => {
    tweet.entities.hashtags.forEach(tag => {
      hashtags.push(tag.text);
    });
  });
  return hashtags;
};

module.exports = getTweetHashtagsFromArray;
