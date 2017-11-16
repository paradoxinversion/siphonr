const { client } = require("../client");
const splitter = require("../splitter.js");

// module.exports = async function postTweetThread(tweetThreadText, options, callback){
//   // Split the tweet into a array.
//   const tweetArray = await splitter(tweetThreadText);
//   console.log("Got Tweet Array:: ", tweetArray);
//   // Get a reference to which tweet in the array we are currently on
//   let currentTweetIndex = 0;
//
//   let lastTweet = await client.post("statuses/update", {status: tweetArray[0]})
//     .then((tweet)=>
//     {
//       if (callback) callback(tweetThreadText, options);
//       console.log(tweet.text)
//       return tweet;
//     })
//     .catch(error=>{
//       console.log(error)
//     });
//   console.log("Last: ", lastTweet);
//   for (let tweet of tweetArray){
//     if (currentTweetIndex != 0){
//       await client.post("statuses/update", {status:tweet, in_reply_to_status_id: lastTweet.id_str})
//         .then((tweet)=>{
//           if (callback) callback(tweetThreadText, options);
//           // console.log(`@${tweet.user.screen_name}` + tweet.text);
//           lastTweet = tweet;
//           return tweet
//         })
//         .catch(error=>{
//           throw error;
//         });
//     }
//     currentTweetIndex++;
//   }
// }
module.exports = async function postTweetThread(tweetThreadText, options, callback){
  // Split the tweet into a array.
  const tweetArray = await splitter(tweetThreadText);
  console.log("Got Tweet Array:: ", tweetArray);
  // Get a reference to which tweet in the array we are currently on
  let currentTweetIndex = 0;

  // Declare a var to hold a 'last tweet'-- We will use this var as the
  // tweet we must reply to, in order to keep thread integrity
  let lastProcessedTweet = null;
  // Set our initial tweet. This will be the start of the reply chain.
  const initialTweet = await client.post("statuses/update", {status: tweetArray[0]})
    .then((firstTweet) => {
      if (callback) callback(firstTweet, options);
      lastProcessedTweet = firstTweet;
      return firstTweet;
    })
    .catch(error =>{
      throw error;
    })
  // For Each other tweet in our array
  // Use for..of in order to use async/away to not spam twitter too fast
  for (let currentTweetText of tweetArray){
    // If our current tweet is not our initial tweet
    if (currentTweetIndex !== 0){
      // Post this tweet in reply to the last one
      await client.post("statuses/update", {status: currentTweetText, in_reply_to_status_id: lastProcessedTweet.id_str})
        .then (tweet => {
          if (callback) callback(tweet, options);
          lastProcessedTweet = tweet;
          return tweet;
        })
        .catch(error => {
          throw error;
        })
    }
    currentTweetIndex++;
  }

}
