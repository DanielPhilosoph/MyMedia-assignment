require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const userRoute = require("./routers/user");

const app = express();

app.use(cors());
app.use(express.json());

module.exports = app;
