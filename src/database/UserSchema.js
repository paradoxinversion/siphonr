import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  displayName: String,
  twitterProvider: {
    type: {
      id: String,
      token: String
    }
  }
});

UserSchema.statics.upsertTwitterUser = async function( token, tokenSecret, profile, cb){
  try{
    const twitterProvider = {
      id: profile.id,
      token: token,
      tokenSecret: tokenSecret
    };

    const that=this;
    const existingUser = await this.findOneAndUpdate({"twitterProvider.id": profile.id}, twitterProvider, {
      upsert: true
    });
    if (!existingUser){
      const newUser = new that({
        displayName: profile.displayName,
        twitterProvider: {
          id: profile.id,
          token: token,
          tokenSecret: tokenSecret
        }
      });
      await newUser.save();
      return cb(null, newUser);
    } else {
      await existingUser.save();
      return cb(null, existingUser);
    }
  } catch (e){
    console.log(e);
    return cb(e, false);
  }


};

export default UserSchema;
