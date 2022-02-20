const DB = require("../mongo/mongoClass");

const db = new DB();

async function getUserById(id) {
  const response = await db.getUserById(id);
  if (response.user) {
    return { user: response.user };
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
