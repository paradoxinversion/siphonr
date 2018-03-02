const getTweetHashtagsFromArray = (tweetArr) => {
  let hashtags = [];
  tweetArr.forEach((tweet) =>{
    tweet.entities.hashtags.forEach((tag) =>{
      hashtags.push(tag.text);
    });
  });


  // console.log(hashtags);
  return hashtags;
};

export default getTweetHashtagsFromArray;
