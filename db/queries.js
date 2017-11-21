const db = require("./client");


const checkTweetExistsTask = function(task, tweet){
  return task.oneOrNone("SELECT * FROM tweets WHERE tweet_json ->> 'id_str' = $1", [tweet.id_str])
    .then(existingTweet => {
      if (existingTweet){
        return true;
      }else{
        return false;
      }
    })
    .catch(e => {
      throw e;
    });
};
const insertTweetTask = function(task, tweet){
  return checkTweetExistsTask(task, tweet)
    .then(tweetExists => {
      if (!tweetExists){
        return task.oneOrNone('INSERT INTO tweets(tweet_json) VALUES ($1)', [tweet]);
      } else{
        return null;
      }
    })
    .catch(e => {
      throw e;
    });
};

const addNewUser = function(task, user){
  return task.oneOrNone('INSERT INTO users VALUES ($1, $2) RETURNING *', [user.id_str, user])
    .catch(e => {
      throw e;
    });
};

/**
* Adds a tweet to the DB. If the tweet's user is not in the DB, it is added too.
* @param {Array} tweets An array of tweets to attempt to add to the db.
*/
// const addTweet = function(tweet){
//   return db.task('addTweetJSON', t=>{
//     return t.oneOrNone('SELECT * FROM users WHERE id_str=$1', [tweet.user.id_str])
//       .then(user => {
//         if (user){
//           return insertTweetTask(t, tweet);
//         }else{
//           return t.oneOrNone('INSERT INTO users VALUES ($1) RETURNING *', [tweet.user.id_str])
//             .then(() => {
//               return insertTweetTask(t, tweet);
//             })
//             .catch(e => {
//               throw e;
//             });
//         }
//       })
//       .catch(e => {
//         throw e;
//       });
//   })
//     .catch(e => {
//       throw e;
//     });
// };

const addTweet = function(tweet){
  return db.task('addTweetJSON', t=>{
    return t.oneOrNone('SELECT * FROM users WHERE id_str=$1', [tweet.user.id_str])
      .then(user => {
        if (user){
          return insertTweetTask(t, tweet);
        }else{
          return addNewUser(t, tweet.user)
            .then(() => {
              return insertTweetTask(t, tweet);
            })
            .catch(e => {
              throw e;
            });
        }
      })
      .catch(e => {
        throw e;
      });
  })
    .catch(e => {
      throw e;
    });
};

const returnAllTweets = function(){
  return db.any("SELECT * from tweets")
    .catch(e => {
      throw e;
    });
};
const getTweetsByUserId = function(userId){
  return db.oneOrNone("SELECT tweet_json FROM tweets WHERE tweet_json -> 'user' ->> 'id_str' = $1", [userId])
    .catch(e => {
      throw e;
    });
};

const removeTweetById = function(id_str){
  return db.oneOrNone("DELETE FROM tweets WHERE tweet_json ->> 'id_str' = $1", [id_str])
    .then(tweet =>{
      console.log("deleted tweet");
      return tweet;
    })
    .catch(e => {
      throw e;
    });
};

const returnAllUsers = function(){
  return db.any("SELECT * FROM users")
    .catch( error => {
      throw error;
    });
};

module.exports = {
  addTweet,
  getTweetsByUserId,
  returnAllTweets,
  removeTweetById,
  returnAllUsers
};
