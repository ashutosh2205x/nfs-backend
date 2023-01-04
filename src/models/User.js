const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  f_name: {
    type: String,
    required: false,
  },
  l_name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_pic: {
    type: String,
    required: false,
  },
  roll_no: {
    type: String,
    required: false,
  },
  standard: {
    type: String,
    required: false,
  },
  section: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false,
    default: "student",
  },
  created_at: {
    type: Date,
    default: Date.now(),
    required: false,
  },
  modified_at: {
    type: Date,
    default: Date.now(),
    required: false,
  },
});

mongoose.model("user", UserSchema);
