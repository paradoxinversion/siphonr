import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  twitterID: String,
  token: String,
  displayName: String
});

export default UserSchema;
