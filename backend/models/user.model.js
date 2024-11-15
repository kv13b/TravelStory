const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdOm: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", userSchema);
