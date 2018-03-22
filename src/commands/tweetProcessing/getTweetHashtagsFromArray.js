const getTweetHashtagsFromArray = (tweetArr) => {
  let hashtags = [];
  tweetArr.forEach((tweet) =>{
    tweet.entities.hashtags.forEach((tag) =>{
      hashtags.push(tag.text);
    });
  });
  return hashtags;
};

export default getTweetHashtagsFromArray;
