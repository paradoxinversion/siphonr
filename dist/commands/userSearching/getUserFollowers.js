// const Twitter = require("twitter");
// const twitterConfig = require("../../config/config.js").getConfig().twitter;

// const getUserFollowers = async(token, secret, screenName, count, cursor = undefined, maxRuns = 15) => {
//     count = count === undefined ? 20 : count;
//     let twitterResult;
//     try{
//       const config = {
//         consumer_key : twitterConfig.consumer_key,
//         consumer_secret: twitterConfig.consumer_secret,
//         access_token_key: token,
//         access_token_secret: secret,
//         callbackURL: twitterConfig.callbackURL
//       };
//       const client = await new Twitter(config);
//       if (count === undefined || count <= 200){
//         try {
//           twitterResult = await client.get( "followers/ids",{
//             screen_name: screenName,
//             count: count
//           });
//           console.log(twitterResult[6].entities)
//           return twitterResult;
//         } catch (e){
//           throw e;
//         }
//       } else{
//         try {
//           let collectedTweets = [];
//           const tweetProgress = {
//             tweetsProcessed: 0,
//             processTimes: 0,
//             last_id: cursor,
//             done: false
//           };
//           while (tweetProgress.tweetsProcessed < count){
//             const newTweets = await client.get( "statuses/user_timeline",{
//               screen_name: screenName,
//               count: 200,
//             });
//             collectedTweets = collectedTweets.concat(newTweets);
//             tweetProgress.tweetsProcessed = collectedTweets.length;
//             tweetProgress.processTimes++;
//             if (newTweets[newTweets.length - 1].id_str === tweetProgress.last_id){
//               twitterResult = collectedTweets;
//               break;
//             }
//             tweetProgress.last_id = newTweets[newTweets.length-1].id_str;
//             twitterResult = collectedTweets;
//             if (tweetProgress.processTimes === maxRuns){
//               break;
//             }
//           }
//           return twitterResult;
//         } catch (e){
//           console.error("Error getting timeline::", e)
//           throw e;
//         }
//       }
//     } catch (e){
//       console.error("Error getting timeline::", e)
//       throw e;
//     }

//   }

//   export default getUserFollowers;
"use strict";