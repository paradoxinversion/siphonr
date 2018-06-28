const getUserTimeline = require("../commands/userSearching/getUserTimeline");
const processTweetArray = require("../commands/tweetProcessing/processTweetArray");
const getTweetAuthor = require("../commands/tweetProcessing/getTweetAuthor");
const packageResponse = require("../commands/tweetProcessing/packageResponse");
const getMostCommonHashtags = require("../commands/tweetProcessing/getMostCommonHashTags");
const search = async (req, res) => {
  try {
    if (req.query.user) {
      const rawTimeLine = await getUserTimeline(
        req.query.oauth_token,
        req.query.oauth_token_secret,
        req.query.user,
        req.query.count
      );
      const processedTimeline = processTweetArray(rawTimeLine);
      const user = getTweetAuthor(rawTimeLine[0]);
      const mostCommonHashtags = getMostCommonHashtags(rawTimeLine);
      const packagedResponse = packageResponse(
        user,
        processedTimeline,
        mostCommonHashtags
      );
      console.log(packagedResponse.processedTweets[10]);
      await res.json(packagedResponse);
    } else {
      res.send("No username was received.");
    }
  } catch (e) {
    console.log("Error in Search::", e);
    throw e;
  }
};

module.exports = search;
