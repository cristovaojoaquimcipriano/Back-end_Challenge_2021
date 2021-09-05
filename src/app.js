require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
const express = require("express");
const morgan = require("morgan");
const database = require("./config/database");
const datasync = require("./config/cron");
const cors = require("cors");

class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.services();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(morgan("dev"));
    this.express.use(cors());
  }

  services() {
    database();
    datasync.start();
  }

  routes() {
    this.express.get("/", (req, res) => {
      res.json({ message: "REST Back-end Challenge 20201209 Running" });
    });
    require("./routes/user")(this.express);
    require("./routes/auth")(this.express);
  }
}

module.exports = new App().express;
