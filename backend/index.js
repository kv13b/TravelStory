require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const config = "./config.json";
const mongoose = require("mongoose");
const User = require("./models/user.model");
const travelstory = require("./models/travelstory.model");
const upload = require("./multer");
const fs = require("fs");
const path = require("path");
const { authToken } = require("./utilities");
const { error } = require("console");

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

//get user
app.get("/get-user", authToken, async (req, res) => {
  try {
    const { userId } = req.user; // Extract userId from the verified token
    const isUser = await User.findOne({ _id: userId });

    if (!isUser) {
      console.error("User not found with ID:", userId);
      return res.sendStatus(404); // Not Found
    }

    return res.json({
      user: isUser,
      message: "User retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return res.sendStatus(500); // Internal Server Error
  }
});
//add travel-story
app.post("/add-travel-story", authToken, async (req, res) => {
  const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
  const { userId } = req.user;

  if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
    return res
      .status(400)
      .json({ error: true, message: "All fields are required" });
  }

  //convert the visistedDate from millisecend to date object
  const parseVisistedDate = new Date(parseInt(visitedDate));

  try {
    const Travelstory = new travelstory({
      title,
      story,
      visitedLocation,
      userId,
      imageUrl,
      visitedDate: parseVisistedDate,
    });
    await Travelstory.save();
    res.status(201).json({ story: Travelstory, message: "added successfully" });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
});
//get all travel stories
app.get("/get-travel-story", authToken, async (req, res) => {
  const { userId } = req.user;
  try {
    const travstory = await travelstory
      .find({ userId: userId })
      .sort({ isFavourite: -1 });
    res.status(200).json({ stories: travstory });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
});
//serve static files from uploads dir
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
//route to the image upload
app.post("/image-upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ error: true, message: "No images uploaded" });
    }
    const imageurl = `http://localhost:8000/uploads/${req.file.filename}`;

    res.status(201).json({ imageurl });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

//delete the image from uploads
app.delete("/delete-image", async (req, res) => {
  const { imageUrl } = req.query;
  try {
    if (!imageUrl) {
      res.status(400).json({
        error: true,
        message: "imageUrl parameter is required",
      });
    }
    const filename = path.basename(imageUrl);
    const filepath = path.join(__dirname, "uploads", filename);

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      res.status(200).json({
        message: "image deleted successfully",
      });
    } else {
      res.status(200).json({ message: "image not found" });
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

//edit travel story
app.post("/edit-story/:id", authToken, async (req, res) => {});

app.listen(8000);
module.exports = app;
