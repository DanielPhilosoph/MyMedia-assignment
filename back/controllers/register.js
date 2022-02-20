const DB = require("../mongo/mongoClass");
const { authenticateUser } = require("../helper/functions");

const db = new DB();

async function register(req) {
  const { firstName, lastName, email, password } = req.body;

  //? No duplicate email
  const unique = await db.isUserUnique(email);
  if (!unique.unique) {
    return { error: unique.error };
  }

  const response = authenticateUser(firstName, lastName, email, password);
  if (response.valid) {
    const addUserResponse = await db.addNewUser(firstName, lastName, email, password);

    if (addUserResponse.insert) {
      return { user: addUserResponse.user };
    }
    return { error: addUserResponse.error };
  } else {
    return { error: response.error };
  }
}

module.exports = { register };
