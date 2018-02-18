module.exports = function getMostCommonHashTags(tweetArray){
  const tagFrequency = {};
  const tags = tweetArray.forEach((tweet) => {
    if (tweet.entities.hashtags.length > 0){
      tweet.entities.hashtags.forEach((element) => {
        const tag = element.text.toLowerCase();
        if (!tagFrequency[tag]){
          tagFrequency[tag]= 1;
        } else{
          tagFrequency[tag]= tagFrequency[tag] +1;
        }
        return tweet.entities.hashtags;
      });
    }
  });
  console.log("TAGS:", tags);
  console.log("TAG FREQ:", tagFrequency);
};
