const mongoose = require("mongoose");

const FeeSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  paid: {
    type: Boolean,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },

  paid_on: {
    type: String,
    required: true,
  },
  student_id: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  modified_at: {
    type: Date,
    default: Date.now(),
    required: false,
  },
});

mongoose.model("fee", FeeSchema);
