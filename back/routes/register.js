const express = require("express");
const router = express.Router();
const { register } = require("../controllers/user");

//? Route to:  /register

router.post("/register", async (req, res) => {
  const response = await register(req);
  if (!response.error) {
    return res.json({ user: response.user, registered: true });
  }
  return res.status(403).json({ error: response.error, registered: false });
});

module.exports = router;
