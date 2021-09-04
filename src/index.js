require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const database = require("./config/database");
const datasync = require("./config/cron");

class App {
  constructor() {
    this.express = express();

    this.routes();
    this.middlewares();
    this.services();

    this.express.listen(process.env.PORT || 3333, () => {
      console.log("Server listening on port ", process.env.PORT || 3333);
    });
  }

  middlewares() {
    this.express.use(express.json);
    this.express.use(morgan("dev"));
  }

  services() {
    database();
    datasync();
  }

  routes() {
    this.express.get("/", (req, res) => {
      res.json({ message: "REST Back-end Challenge 20201209 Running" });
    });
  }
}

module.exports = new App().express;
