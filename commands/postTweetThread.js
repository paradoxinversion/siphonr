const { client } = require("../client");
const splitter = require("../splitter.js");

module.exports = async function postTweetThread(searchQuery, options, callback){
  const tweetArray = await splitter(searchQuery);
  let tweetIndex = 0;
  let lastTweet = await client.post("statuses/update", {status:tweetArray[0]})
    .then((tweet)=>
    {
      if (callback) callback(searchQuery, options);
      console.log(tweet.text)
      return tweet;
    })
    .catch(error=>{
      console.log(error)
    });
  console.log("Last: ", lastTweet);
  for (let tweet of tweetArray){
    if (tweetIndex != 0){
      await client.post("statuses/update", {status:tweet, in_reply_to_status_id: lastTweet.id_str})
        .then((tweet)=>{
          if (callback) callback(searchQuery, options);
          // console.log(`@${tweet.user.screen_name}` + tweet.text);
          lastTweet = tweet;
          return tweet
        })
        .catch(error=>{
          throw error;
        });
    }
    tweetIndex++;
  }
}
