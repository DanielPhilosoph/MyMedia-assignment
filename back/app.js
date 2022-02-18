const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const authenticateMiddleware = require("./middlewares/authenticateToken");

//* ------------------- App -----------------------

const app = express();
app.use(cors());
app.use(express.json());

//? ---------------- Routes -----------------------

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/user", authenticateMiddleware, userRouter);

//? ---------------- Error 404 --------------------

app.use("/", (req, res) => {
  res.status(404).json({ message: "unknown endpoint" });
});

module.exports = app;
