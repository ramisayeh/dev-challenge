const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  name: String,
  bio: String,
  phone: Number,
  email: String,
  password: String,
  photo: String,
  uid: String,
});
const profile = mongoose.model("profile", profileSchema);
module.exports = profile;
