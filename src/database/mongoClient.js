import mongoose from "mongoose";

export const startClient = async () => {
  const mongooseOptions = {
    useMongoClient: true
  };
  mongoose.Promise = global.Promise;
  try {
    await mongoose.connect("mongodb://localhost/siphonr-users", mongooseOptions);
  } catch (e){
    console.log(e);
    throw e;
  }
};
