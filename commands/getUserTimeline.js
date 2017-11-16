const { client } = require("../client");
// Takes a screen name and returns 20 (or more) tweets in the timeline
module.exports = function getTimeLine(searchQuery, options, callback){
  // client.get(
  //   "statuses/user_timeline",
  //   {
  //     screen_name: searchQuery,
  //     count: options.count === undefined ? 20 : options.count,
  //     exclude_replies: options.noreplies,
  //     include_rts: options.inclretweets === undefined ? false : true
  //   },
  //   function(error, tweets){
  //     if (error) throw error;
  //     if (callback) callback(tweets, options);
  //   });
  client.get( "statuses/user_timeline",
    {
      screen_name: searchQuery,
      count: options.count === undefined ? 20 : options.count,
      exclude_replies: options.noreplies,
      include_rts: options.inclretweets === undefined ? false : true
    })
    .then(tweets => {
      if (callback) callback(tweets, options);
    })
    .catch(e => {
      console.log(e);
    });

};
