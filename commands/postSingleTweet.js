const { client } = require("../client");

module.exports= function postOneTweet(searchQuery, options, callback){
  client.post(
    "statuses/update",
    {
      status: searchQuery,
    })
    .then((tweet) =>{
      if (callback) callback(tweet, options);
      // console.log(tweet.text);
    })
    .catch(error=>{
      console.log(error);
    });
};
