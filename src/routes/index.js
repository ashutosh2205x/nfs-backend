const express = require("express");
const auth = require("./auth");
const hostel = require("./hostel");

const app = express();

function appRoutes() {
  app.get("/", (req, res) => {
    res.json({ message: "API Working" });
  });

  app.use("/user", auth);
  app.use("/hostel", hostel);
}

module.exports = appRoutes;
