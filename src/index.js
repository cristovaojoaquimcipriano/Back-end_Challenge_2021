require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./config/database");

class App {
  constructor() {
    this.express = express();

    this.routes();
    this.middlewares();
    this.database();

    this.express.listen(process.env.PORT || 3333, () => {
      console.log("Server listening on port ", process.env.PORT || 3333);
    });
  }

  middlewares() {
    this.express.use(express.json);
    this.express.use(morgan("dev"));
  }

  database() {
    db();
  }

  routes() {
    this.express.get("/", (req, res) => {
      res.json({ message: "REST Back-end Challenge 20201209 Running" });
    });
  }
}

module.exports = new App().express;
