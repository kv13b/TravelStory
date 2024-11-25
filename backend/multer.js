const express = require("express");
const multer = require("multer");

//storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); //dest folder for storing uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

//file filter to accept only images

const filefilter = (req, file, cb) => {
  if (file.mimetype.startsWith("images/")) {
    cb(null, true);
  } else {
    cb(new Error("only images are allowed"), false);
  }
};

//Initialize multer instance
const upload = multer({ storage, fileFilter });

module.exports = upload;
