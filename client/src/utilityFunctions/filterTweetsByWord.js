const filterTweetsByWord = (tweetArray, word) => {
  const filtered = tweetArray.filter((tweet)=>{
    const Regex = new RegExp(word, "i");
    if (Regex.test(tweet.full_text)){
      return true;
    }
    return false;
  });
  console.log("Filtered Result:", filtered);
  return filtered;
};

export default filterTweetsByWord;
