
// Returns a tuple with the hashtag and how many times it has been used, in order
const getMostCommonHashTags = (tweetArray, amount= 10) => {
  const rawTagFrequency = {};
  tweetArray.forEach((tweet) => {
    if (tweet.entities.hashtags.length > 0){
      tweet.entities.hashtags.forEach((element) => {
        const tag = element.text.toLowerCase();
        if (!rawTagFrequency[tag]){
          rawTagFrequency[tag]= 1;
        } else{
          rawTagFrequency[tag]= rawTagFrequency[tag] +1;
        }
        return tweet.entities.hashtags;
      });
    }
  });
  return Object.entries(rawTagFrequency).sort((a,b) => {
    return b[1]-a[1];
  }).slice(0, amount);
};

export default getMostCommonHashTags;
