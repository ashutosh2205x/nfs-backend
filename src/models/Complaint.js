const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  
  thread: {
    type: Boolean,
    required: true,
  },
  posted_by: {
    type: String,
    required: true,
  },
  comments:{},
  
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

mongoose.model("complaint", ComplaintSchema);
