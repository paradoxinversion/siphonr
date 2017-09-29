const fs = require("fs");
const getSecrets = function(){
  return JSON.parse(fs.readFileSync("secrets.json"));
};

module.exports = {getSecrets};
