const mongoose = require("mongoose");

const ClassTimetable = new mongoose.Schema({
  // moment().format('LLLL');
  day: {
    type: String,
    required: true,
  },

  period_start_time: {
    type: String,
    required: true,
  },
  period_end_time: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: false,
  },
  teacher: {
    type: String,
    required: true,
  },
  standard: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  lunch_start_time: {
    type: Object,
    required: true,
  },
  lunch_end_time: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.model("classtimetable", ClassTimetable);
