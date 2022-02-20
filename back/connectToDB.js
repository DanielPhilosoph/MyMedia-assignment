require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const { MONGO_URI } = require("./config/config");

/**
 * ? Connecting to DB
 */
async function connectToDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`connected to MongoDB`);
    return true;
  } catch (error) {
    console.log("error connecting to MongoDB:", error.message);
    return false;
  }
}

module.exports = { connectToDB };
