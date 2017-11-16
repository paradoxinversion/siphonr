const Twitter = require("twitter");
const twitterConfig = require("./config/config.js").getConfig().twitter;

const client = new Twitter(twitterConfig);

module.exports = {client};
