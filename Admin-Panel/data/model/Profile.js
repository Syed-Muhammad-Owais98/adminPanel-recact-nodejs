const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  Website: { type: String },
  paypal: { type: Number },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: Number },
  country: { type: String },
  phone: { type: Number },
  timeSetting: { type: TimeRanges },
  memberSince: { type: Number },
  companyLogo: { type: String },
  companyLicense: { type: String },
  companyName: { type: String },
  companyTags: { type: String },
  companyAbout: { type: String },
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
