const express = require("express");
const controller = require("../controllers");

const router = express.Router();

router.get("/", controller.home);
router.post("/register", controller.register);
router.post("/send", controller.send);

module.exports = router;
