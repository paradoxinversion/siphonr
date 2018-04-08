import getUserTimeline from "../commands/userSearching/getUserTimeline";
import processTweetArray from "../commands/tweetProcessing/processTweetArray";
import getTweetAuthor from "../commands/tweetProcessing/getTweetAuthor";
import packageResponse from "../commands/tweetProcessing/packageResponse";
import getMostCommonHashtags from "../commands/tweetProcessing/getMostCommonHashTags";
const search = async (req, res) => {
  try{
    if (req.query.user){
      const rawTimeLine = await getUserTimeline(req.query.oauth_token, req.query.oauth_token_secret, req.query.user, req.query.count);
      const processedTimeline = processTweetArray(rawTimeLine);
      const user = getTweetAuthor(rawTimeLine[0]);
      const mostCommonHashtags = getMostCommonHashtags(rawTimeLine);
      const packagedResponse = packageResponse(user, processedTimeline, mostCommonHashtags);
      console.log(packagedResponse.processedTweets[10]);
      await res.json( packagedResponse);
    }
    else{
      res.send("No username was received.");
    }
  } catch (e) {
    console.log("Error in Search::", e);
    throw e;
  }
};

export default search;
