require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const { MONGO_URI, APP_PORT } = require("./config/config");

/**
 * ? Connecting to DB
 */
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`connected to MongoDB`);

    //! Run API listen
    app.listen(APP_PORT, () => console.log(`app listening at http://localhost:${APP_PORT}`));
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
