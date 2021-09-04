const mongoose = require("mongoose");

const database = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((db) => {
      console.log("Connected to database");
    })
    .catch((error) => {
      throw new Error("Cannot to the database because " + error.message);
    });
};

module.exports = database;
