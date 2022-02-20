const express = require("express");
const router = express.Router();
const { login } = require("../controllers/login");

//? Route to:  /login

/**
 * * Body - { email: string, password: string }
 */
router.post("/", async (req, res) => {
  const response = await login(req);
  if (!response.error) {
    return res.json({ user: response, login: true });
  }
  return res.status(401).json({ error: response.error, login: false });
});

module.exports = router;
