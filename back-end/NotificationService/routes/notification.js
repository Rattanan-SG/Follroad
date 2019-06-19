const express = require("express");
const controller = require("../controllers/notification");
const router = express.Router();

router.get("/", controller.home);
router.post("/noti", controller.send);

module.exports = router;
