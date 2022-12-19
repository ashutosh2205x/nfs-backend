const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const SchoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: Array,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fax: {
    type: String,
    required: false,
  },
  post: {
    type: String,
    required: false,
  },
  affliationBoard: {
    type: String,
    required: true,
  },
  schoolLogo: {
    type: String,
    required: false,
  },
  medium: {
    type: String,
    required: true,
  },
  principal: {
    type: String,
    required: true,
  },
  studentStrength: {
    type: String,
    required: true,
  },
  establishment: {
    type: String,
    required: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
  registrationId: {
    type: ObjectId,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.model("school", SchoolSchema);
