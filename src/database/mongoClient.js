import mongoose from "mongoose";

export const startClient = async () => {
  const mongooseOptions = {
  };
  mongoose.Promise = global.Promise;
  try {
    if (process.env.NODE_ENV === "development"){
      await mongoose.connect("mongodb://localhost/siphonr-users", mongooseOptions);
    } else {
      const config = require("../config/config.js").getConfig();
      await mongoose.connect(`mongodb://${config.db.user}:${config.db.password}@${config.db.url}:${config.db.port}/${config.db.database}`, mongooseOptions);
    }
    
  } catch (e){
    console.log(e);
    throw e;
  }
};
