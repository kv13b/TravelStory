require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const config = "./config.json";
const mongoose = require("mongoose");
const User = require("./models/user.model");

mongoose.connect(
  "mongodb+srv://karthikbhatt22:6OS1cdtPKWZM1vPx@travelstory.rbinw.mongodb.net/?retryWrites=true&w=majority&appName=travelstory",
  { useNewUrlParser: true }
);
mongoose.connection
  .once("open", function () {
    console.log("Conection has been made!");
  })
  .on("error", function (error) {
    console.log("Error is: ", error);
  });

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

//create user
app.post("/create-user", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "All feilds are required" });
  }
  let isUser = await User.findOne({ email });
  if (isUser) {
    return res
      .status(400)
      .json({ error: true, message: "User already exists" });
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  const user = new User({
    fullName,
    email,
    password: hashedpassword,
  });
  await user.save();

  const accesstoken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "72h",
    }
  );
  return res.status(201).json({
    error: false,
    user: { fullName: user.fullName, email: user.email },
    accesstoken,
    message: "Registration successfull",
  });
});
//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "user does not exists" });
  }
  const validpassword = await bcrypt.compare(password, user.password);
  if (!validpassword) {
    return res.status(400).json({ message: "Invlaid credentials" });
  }

  const accesstoken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "72h",
    }
  );
  return res.status(201).json({
    error: false,
    user: { fullName: user.fullName, email: user.email },
    accesstoken,
    message: "Login successfull",
  });
});
app.listen(8000);
module.exports = app;
