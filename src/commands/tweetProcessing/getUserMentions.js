/**
* Returns an array(?) of users mentioned in the supplied tweet
* @param {object} tweet
* @returns An array(?) of users mentioned in the tweet
**/
const getUserMentions = function(tweet){
  return tweet.entities.user_mentions;
};

export default getUserMentions;
