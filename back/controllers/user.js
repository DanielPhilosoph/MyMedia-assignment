const DB = require("../mongo/mongo_class");

const db = new DB();

async function getUserById(id) {
  const response = await db.getUserById(id);
  if (response.user) {
    const { hashPassword, ...returnedUser } = response.user;
    return { user: returnedUser };
  }
  return { error: response.error };
}

async function getUsers(query) {
  const response = await db.getUsersByQuery(query);
  if (response.users) {
    return { users: response.users };
  }
  return { error: response.error };
}

module.exports = { getUserById, getUsers };
