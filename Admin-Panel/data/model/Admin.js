const mongoose = require("mongoose");

const AdminsSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  companyName: String,
  emailAddress: String,
  password: String,
  role: {
    type: Number,
    default: 1,
    enum: [1, 0],
  },
});

const Admins = mongoose.model("Admins", AdminsSchema);

module.exports = Admins;
