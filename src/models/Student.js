const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  f_name: {
    type: String,
    required: true,
  },
  l_name: {
    type: String,
    required: true,
  },
  roll_no: {
    type: String,
    required: true,
  },
  profile_pic: {
    type: String,
    required: false,
  },
  standard: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
    default: "student",
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
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

mongoose.model("student", StudentSchema);
