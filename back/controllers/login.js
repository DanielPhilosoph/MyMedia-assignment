const jwt = require("jsonwebtoken");
const DB = require("../mongo/mongo_class");
const { verifyPassword } = require("../helper/functions");

const db = new DB();

async function login(req) {
  if (req.body.email && req.body.password) {
    const user = await db.getUserByEmail(req.body.email);
    if (user.user) {
      const { userId, email, firstName, lastName, hashPassword } = user.user;
      if (verifyPassword(req.body.password, hashPassword)) {
        const token = generateToken({ id: userId, email: email });
        const response = await db.addLogToUserEntries(userId);
        if (response.updated) {
          return {
            token,
            userId,
            firstName,
            lastName,
          };
        }
        return { error: response.error };
      }
    }
    return { error: "Email or password are incorrect" };
  }
  return { error: "Missing email or password in body" };
}

function generateToken(info) {
  return jwt.sign(info, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
}

module.exports = { login };
