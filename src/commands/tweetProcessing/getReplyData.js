/**
 * Returns information about who the supplied tweet is in reply to
 * @param {object} tweet
 * @returns An object with more information about the reply
 **/
const getReplyData = function(tweet) {
  const replyData = {
    statusIdStr: null,
    userIdStr: null
  };
  if (tweet.in_reply_to_status_id != null) {
    replyData.statusIdStr = tweet.in_reply_to_status_id_str;
    replyData.userIdStr = tweet.in_reply_to_user_id_str;
  }
  return replyData;
};

module.exports = getReplyData;
