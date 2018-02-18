const { client } = require("../client");
// Takes a screen name and returns 20 (or more) tweets in the timeline
module.exports = async function getTimeLine(searchQuery, options){

  const twitterResult = await client.get( "statuses/user_timeline",{
    screen_name: searchQuery,
    count: options.count === undefined ? 20 : options.count,
    exclude_replies: options.noreplies,
    include_rts: true,
    tweet_mode: 'extended'
  });

  return twitterResult;

};
