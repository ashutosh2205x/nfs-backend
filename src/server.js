const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 4000;
const auth = require("./routes/auth/auth");
const hostel = require("./routes/hostel");
const timetable = require("./routes/timetable/timetable");
const fees = require("./routes/fees/fees");
const result = require("dotenv").config({ path: "./configs/.env" });

if (result.error) {
  throw result.error;
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/user", auth);
app.use("/hostel", hostel);
app.use("/timetable", timetable);
app.use("/fees", fees);

// app.use("/", (req, res) => {
//   res.status(200).send("API Working");
// });

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
  server.close(() => process.exit(1));
});
