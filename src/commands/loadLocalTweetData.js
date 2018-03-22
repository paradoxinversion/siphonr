const fs = require("fs");

/**
* Returns saved tweet data used for testing.
* @returns A JSON object containing raw tweet data.
**/
const loadLocalTweetData = () => {
  const tweets = fs.readFileSync("./tweetdata.txt", "utf8");
  return JSON.parse(tweets);
};
export default loadLocalTweetData;
