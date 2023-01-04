const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 4000;
const auth = require("./routes/auth/auth.route");
const hostel = require("./routes/hostel/hostel");
const timetable = require("./routes/timetable/timetable");
const fees = require("./routes/fees/fees");
const health = require("./routes/health/health.route");
const fileUpload = require("./routes/admin/fileUpload.route");
const cors=require('cors');

const result = require("dotenv").config({ path: "./configs/.env" });
if (result.error) {
  throw result.error;
}
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(health);
app.use("/user", auth);
app.use("/hostel", hostel);
app.use("/timetable", timetable);
app.use("/fees", fees);
app.use(fileUpload)

mongoose.connection.on("connected", () => {
  console.log("connected to MongoDB 🌐 !, PORT:", PORT);
});
mongoose.connection.on("error", (err) => {
  console.log("Error! : ", err);
});

app.listen(PORT, () => {
  console.log("SERVER READY");
});
// Handling Error
process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  app.disable(() => process.exit(1));
});
