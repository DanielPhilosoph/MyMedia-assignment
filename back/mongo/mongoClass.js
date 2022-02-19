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
      console.log(error);
      return { error: "Error while querying for user", unique: false };
    }
  }

  async getUserById(id) {
    try {
      let user = await this.User.findById(id);
      const { __v, ...restUser } = user._doc;
      return { user: restUser };
    } catch (error) {
      return { error: "Could not find user" };
    }
  }

  async addNewUser(firstName, lastName, email, password) {
    try {
      let result = authenticateUser(firstName, lastName, email, password);
      if (result.valid) {
        let hashedPassword = await this.hashPassword(password);
        const user = await this.User.create({
          firstName,
          lastName,
          email,
          hashPassword: hashedPassword,
        });
        return {
          insert: true,
          user: this.cleanUserProperties(user._doc),
          error: "",
        };
      } else {
        return { error: result.error, insert: false };
      }
    } catch (error) {
      // console.log(error);
      return { error: "Could not insert user", insert: false };
    }
  }

  async getUsersByQuery(query) {
    try {
      if (query !== "") {
        let users = await this.User.find({
          $or: [{ firstName: { $regex: `${query}` } }, { lastName: { $regex: `${query}` } }],
        });
        users = users.map((user) => {
          return this.cleanUserProperties(user._doc);
        });
        return { users };
      } else {
        let users = await this.User.find({});
        users = users.map((user) => {
          return this.cleanUserProperties(user._doc);
        });
        return { users };
      }
    } catch (error) {
      console.log(error);
      return { error: "Error while querying for users" };
    }
  }

  //? Removes __v and hashPassword from user
  cleanUserProperties(user) {
    const { __v, hashPassword, ...rest } = user;
    return { ...rest };
  }

  async hashPassword(password) {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.genSalt(parseInt(process.env.ROUNDS), function (_err, salt) {
        bcrypt.hash(password, salt, function (_err, hash) {
          if (_err) reject(_err);
          resolve(hash);
        });
      });
    });
    return hashedPassword;
  }

  async addLogToUserEntries(id) {
    const user = this.getUserById(id);
    if (!user.error) {
      try {
        await this.User.updateOne(
          { _id: id },
          { $push: { entries: { loggingTime: new Date().toString() } } }
        );
        return { updated: true };
      } catch (error) {
        console.log(error);
        return { updated: false, error: "Error while updating logs" };
      }
    }
  }

  //! FOR TESTS ONLY
  async deleteAll() {
    try {
      await this.User.deleteMany({});
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = DB;
