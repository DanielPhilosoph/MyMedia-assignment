const env = process.env.NODE_ENV || "production";
const MONGO_URI =
  env === "test" ? process.env.TEST_MONGO_URI : process.env.MONGO_URI;
const APP_PORT = process.env.PORT || 3001;

module.exports = { MONGO_URI, APP_PORT };
