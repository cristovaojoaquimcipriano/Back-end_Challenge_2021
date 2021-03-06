const router = require("express").Router();
const { findAll, findById, remove, update } = require("../controllers/user");
const authMiddleware = require("../middleware/auth");

router.get("/", findAll);
router.get("/:id", findById);
router.delete("/:id", remove);
router.put("/:id", update);
module.exports = (app) => app.use("/users", authMiddleware, router);
