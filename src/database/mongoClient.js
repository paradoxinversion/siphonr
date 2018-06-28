const mongoose = require("mongoose");

const startClient = async () => {
  const mongooseOptions = {};
  mongoose.Promise = global.Promise;
  try {
    const databaseURI =
      process.env.MONGODB_URI || "mongodb://localhost/siphonr-users";
    await mongoose.connect(
      databaseURI,
      mongooseOptions
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = startClient;
