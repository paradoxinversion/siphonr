const db = require("./client");

const checkForUser = function(user_id_str){
  return db.oneOrNone(`SELECT * FROM users WHERE id_str=$1`, [user_id_str])
    .then(data => {
      if (data === null){
        console.log("User does not Exist");

        return false;
      }else{
        console.log("User Exists");
        return true;
      }
    })
    .catch(e =>{
      throw e;
    });
};

const addUser = function(userObj){
  return checkForUser(userObj.id_str)
    .then(userExists => {
      if (!userExists){
        return db.oneOrNone(`
          INSERT INTO users
          VALUES ($1)
          `, [userObj.id_str]
        )
          .catch(e =>{
            throw e;
          });
      }
    });
};

const addMultipleTweets =  function(tweets){
  return db.tx('multi-tweet', t =>{
    tweets.forEach((tweet) => {
      return t.oneOrNone(`SELECT * FROM users WHERE id_str=$1`, tweet.user.id_str)
        .then(foundUser => {
          if (!foundUser){
            return t.oneOrNone('INSERT INTO users VALUES($1)', tweet.user.id_str)
              .catch(e => {
                throw e;
              });
          } else{
            return db.oneOrNone(`
              INSERT INTO tweets(tweet_json)
              VALUES ($1)
              `, [tweet]
            )
              .catch(e =>{
                throw e;
              });
          }
        });
    });
  });
};



const addTweetJSON = function(tweet){
  console.log("Adding tweet by ", tweet.user.screen_name);
  return db.task('addTweetJSON', t=>{
    return t.oneOrNone('SELECT * FROM users WHERE id_str=$1', [tweet.user.id_str])
      .then(user => {
        if (user){
          return t.oneOrNone('INSERT INTO tweets(tweet_json) VALUES ($1)', [tweet]);
        }else{
          return t.oneOrNone('INSERT INTO users VALUES ($1) RETURNING *', [tweet.user.id_str])
            .then(() => {
              return t.oneOrNone('INSERT INTO tweets(tweet_json) VALUES ($1)', [tweet]);
            });
        }
      });
  });

};
module.exports = {
  addUser,
  addTweetJSON,
  addMultipleTweets
};
