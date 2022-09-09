const mongoose = require("mongoose");
const { MONGO_URL } = require("../key");

// Replace this with your MONGOURI.

const InitiateMongoServer = async () => {
  mongoose.connection.on("connected", () => {
    console.log("connected !! 🌐");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error! : ", err);
  });
};

module.exports = InitiateMongoServer;
