const express = require("express");
const graphql = require("express-graphql");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { MONGO_URL } = require("./key");
const app = express();
const PORT = process.env.PORT || 4000;
const auth = require("./routes/auth");
const hostel = require("./routes/hostel");
var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/user", auth);
app.use("/hostel", hostel);

app.use("/", (req, res) => {
  res.status(200).send("API Working");
});

mongoose.connection.on("connected", () => {
  console.log("connected !! 🌐");
});

mongoose.connection.on("error", (err) => {
  console.log("Error! : ", err);
});

app.listen(PORT, () => {
  console.log("SERVER READY");
});
