const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  address: String,
  age: Number,
  registration: Date,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
