require("dotenv").config();
const User = require("./models/User");
const uniqid = require("uniqid");
const { authenticateUser } = require("../helper/functions");
const bcrypt = require("bcrypt");

class DB {
  constructor() {
    this.User = User;
  }

  async getUserByEmail(email) {
    try {
      return { user: await this.User.findOne({ email: email }) };
    } catch (error) {
      return { error: "Error while querying for user" };
    }
  }

  async isUserUnique(email) {
    try {
      let user = await this.User.findOne({ email: email });
      if (user) {
        return { error: "Email has already been used", unique: false };
      }
      return { unique: true };
    } catch (error) {
      return { error: "Error while querying for user", unique: false };
    }
  }

  async getUserById(id) {
    try {
      return { user: await this.User.findById(id) };
    } catch (error) {
      return { error: "Could not find user" };
    }
  }

  async addNewUser(firstName, lastName, email, password) {
    try {
      let result = authenticateUser(firstName, lastName, email, password);
      if (result.valid) {
        id = uniqid();
        let hashedPassword = this.hashPassword(password);
        await this.User.insertOne({
          userId: id,
          firstName,
          lastName,
          email,
          hashPassword: hashedPassword,
        });
        return {
          insert: true,
          user: {
            userId: id,
            firstName,
            lastName,
            email,
          },
          error: "",
        };
      } else {
        return { error: result.error, insert: false };
      }
    } catch (error) {
      return { error: "Could not insert user", insert: false };
    }
  }

  async getUsersByQuery(query) {
    try {
      if (query !== "") {
        const users = await this.User.find({
          $or: [{ firstName: { $regex: `${query}` } }, { lastName: { $regex: `${query}` } }],
        });
        return { users };
      } else {
        const users = await this.User.find({});
        return { users };
      }
    } catch (error) {
      return { error: "Error while querying for users" };
    }
  }

  hashPassword(password) {
    let hashedPassword = "";
    bcrypt.genSalt(parseInt(process.env.ROUNDS), function (_err, salt) {
      bcrypt.hash(password, salt, function (_err, hash) {
        hashedPassword = hash;
      });
    });
    return hashedPassword;
  }

  async addLogToUserEntries(id) {
    const user = this.getUserById(id);
    if (!user.error) {
      try {
        await this.User.findOneAndUpdate(
          { userId: id },
          { $push: { loggingTime: new Date().toString() } }
        );
        return { updated: true };
      } catch (error) {
        return { updated: false, error: "Error while updating logs" };
      }
    }
  }
}

export default DB;
