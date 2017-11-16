const db = require("./client");


const checkTweetExistsTask = function(task, tweet){
  return task.oneOrNone("SELECT * FROM tweets WHERE tweet_json ->> 'id_str' = $1", [tweet.id_str])
    .then(existingTweet => {
      if (existingTweet){
        return true;
      }else{
        return false;
      }
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
    });
};

/**
* Adds a tweet to the DB. If the tweet's user is not in the DB, it is added too.
* @param {Array} tweets An array of tweets to attempt to add to the db.
*/
const addTweet = function(tweet){
  return db.task('addTweetJSON', t=>{
    return t.oneOrNone('SELECT * FROM users WHERE id_str=$1', [tweet.user.id_str])
      .then(user => {
        if (user){
          return insertTweetTask(t, tweet);
        }else{
          return t.oneOrNone('INSERT INTO users VALUES ($1) RETURNING *', [tweet.user.id_str])
            .then(() => {
              return insertTweetTask(t, tweet);
            });
        }
      });
  });
};

module.exports = {
  addTweet
};
