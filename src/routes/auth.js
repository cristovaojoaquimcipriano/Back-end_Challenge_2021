const router = require("express").Router();
const { authenticate } = require("../controllers/auth");

router.post("/", authenticate);
module.exports = (app) => app.use("/authenticate", router);
