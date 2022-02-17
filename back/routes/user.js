const express = require("express");
const router = express.Router();
const { getUserById } = require("../controllers/user");

//? Route to:  /user

router.get("/:id", async (req, res) => {
  if (req.params.id) {
    const response = await getUserById(req.params.id);
    if (!response.error) {
      return res.json({ user: response.user });
    }
    return res.status(404).json({ error: response.error });
  }
  return res.status(400).json({ error: "No id param" });
});

//* Could get ?query=string
router.get("/users", async (req, res) => {
  let query = req.query.query ? req.query.query : "";
  const response = getUsers(query);
  if (!response.error) {
    return res.json({ users: response.users });
  }
  return res.status(404).json({ error: response.error });
});

module.exports = router;
