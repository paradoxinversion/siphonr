const { client } = require("../client");

/**
* Retrieves all favorites from a specific user's timeline.
* @param {String} screenName The screen name of the user who's favs to retrive
* @param {Object} optionDefinitions
* @param {Function} callback
*/
module.exports = function getFavoriteUserTweets(screenName, options, callback){
  return client.get("favorites/list",
    {
      screen_name: screenName,
      count: options.count === undefined ? 20 : options.count
    })
    .then( (tweets) =>{
      if (callback) callback(tweets, options);
      return tweets;
    })
    .catch(e => {
      throw e;
    });
};
