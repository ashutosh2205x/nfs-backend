const mongoose = require("mongoose");

// Replace this with your MONGOURI.

class DBConfigs {
  InitiateMongoServer = async () => {
    mongoose.connection.on("connected", () => {
      console.log("connected !! 🌐");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Error! : ", err);
    });
  };
}

module.exports = DBConfigs;
