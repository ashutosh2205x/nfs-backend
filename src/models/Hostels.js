const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const HostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uid: {
    type: ObjectId,
    required: false,
  },
  rating: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.model("hostel", HostelSchema);
