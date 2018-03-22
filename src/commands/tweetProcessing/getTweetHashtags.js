/**
* Returns an array of hashtag strings found in a twet
* @param {object} tweet
* @returns An array of hashtag strings
**/
const getTweetHashtags = (tweet) => {
  let hashtags = [];
  tweet.entities.hashtags.forEach((hashtag) =>{
    hashtags.push(hashtag.text);
  });
  return hashtags;
};

export default getTweetHashtags;
