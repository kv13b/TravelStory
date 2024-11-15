const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const config = "./config.json";
const mongoose = require("mongoose");
const user = require("./models/user.model");

// mongoose.connect(config.connectionString);
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/create-user", async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "All feilds are required" });
  }
  const isUser = await user.findOne({ email });
  if (isUser) {
    return res
      .status(400)
      .json({ error: true, message: "User already exists" });
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  const user = new User({
    fullname,
    email,
    password: hashedpassword,
  });
  await user.save();
});
app.listen(8000);
module.exports = app;
