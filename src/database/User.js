const mongoose = require("mongoose");
const UserSchema = require("./UserSchema");
module.exports = mongoose.model("User", UserSchema);
