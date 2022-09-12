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
  subject_code: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  teacher_id: {
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
  schedule_parent_node: {
    type: String,
    required: false,
  },
  lunch_start_time: {
    type: Object,
    required: true,
  },
  lunch_end_time: {
    type: Object,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.model("classtimetable", ClassTimetable);
