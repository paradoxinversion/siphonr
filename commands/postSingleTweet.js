const { client } = require("../client");

module.exports= async function postOneTweet(searchQuery, options, callback){
  client.post(
    "statuses/update",
    {
      status: searchQuery,
    })
    .then((tweet) =>{
      if (callback) callback(searchQuery, options);
      // console.log(tweet.text);
    })
    .catch(error=>{
      console.log(error);
    });
};
