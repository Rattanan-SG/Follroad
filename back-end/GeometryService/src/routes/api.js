const express = require("express");
const controller = require("../controllers");

const router = express.Router();

router.post("/isLocationOnRoute", controller.isLocationOnRoute);
router.get("/consumer/status", controller.consumerStatus);
router.post("/consumer/start", controller.consumerStart);
router.post("/consumer/stop", controller.consumerStop);

module.exports = router;
