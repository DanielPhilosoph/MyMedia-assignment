const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");

async function verifyPassword(password, hash) {
  return await new Promise((resolve, reject) => {
    bcrypt.compare(password.toString(), hash, function (err, result) {
      if (err) reject(false);
      resolve(result);
    });
  });
}

function authenticateUser(firstName, LastName, email, password) {
  if (password.length < 8) {
    return { error: "Password should more then 7 letter length", valid: false };
  }
  if (typeof firstName !== "string" || typeof LastName !== "string") {
    return { error: "First name and last name must be strings", valid: false };
  }
  if (firstName.length < 3) {
    return { error: "Last name should be longer then 2 letters", valid: false };
  }
  if (LastName.length < 3) {
    return {
      error: "First name should be longer then 2 letters",
      valid: false,
    };
  }
  if (!emailValidator.validate(email)) {
    return { error: "Email is not valid", valid: false };
  }
  return { valid: true };
}

module.exports = { authenticateUser, verifyPassword };
