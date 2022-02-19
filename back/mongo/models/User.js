const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashPassword: {
    type: String,
    required: true,
  },
  entries: {
    type: [
      {
        loggingTime: { type: String },
      },
    ],
  },
});

module.exports = mongoose.model("User", userSchema);
