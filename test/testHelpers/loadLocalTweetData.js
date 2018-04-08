import fs from "fs";
import path from "path";
/**
* Returns saved tweet data used for testing.
* @returns A JSON object containing raw tweet data.
**/
const loadLocalTweetData = () => {
  const jsonPath = path.join(__dirname, "../../testData.json");
  console.log(jsonPath);
  const tweets = fs.readFileSync(jsonPath, "utf8");
  return JSON.parse(tweets);
};
export default loadLocalTweetData;
