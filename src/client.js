const Twitter = require("twitter");
const twitterConfig = require("./config/config.js").getConfig().twitter;
(()=>{
  Object.keys(twitterConfig).forEach((key) => {
    if (twitterConfig[key] === undefined){
      const envUndefinedError = new Error(`${key} is undefined. Make sure the path to your .env is correct in config.js.`);
      throw envUndefinedError;
    }
  })
})();
console.log("twitterConfig::", twitterConfig);
const client = new Twitter(twitterConfig);

module.exports = {client};
