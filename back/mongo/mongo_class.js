const User = require("./models/User");

class DB {
  constructor() {
    this.User = User;
  }

  getUserModel() {
    return this.User;
  }

  async getUserById(id) {
    try {
      return await User.findById(id);
    } catch (error) {
      return { error: "Could not find user!" };
    }
  }

  async AddNewUser(
    firstName,
    LastName,
    email,
    twoFactorAuthentication = false
  ) {}
}
