const jwt = require("jsonwebtoken");
const DB = require("../mongo/mongoClass");
const { verifyPassword } = require("../helper/functions");

const db = new DB();

async function login(req) {
  if (req.body.email && req.body.password) {
    const user = await db.getUserByEmail(req.body.email);
    if (user.user) {
      const { _id, email, firstName, lastName, hashPassword } = user.user;
      if (await verifyPassword(req.body.password, hashPassword)) {
        const token = generateToken({ _id, email: email });
        const response = await db.addLogToUserEntries(_id);
        if (response.updated) {
          return {
            token,
            _id,
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
