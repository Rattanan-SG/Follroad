const express = require("express");
const { consumer } = require("../../controllers");

const router = express.Router();

router.get("/consumer/status", consumer.consumerStatus);
router.post("/consumer/start", consumer.consumerStart);
router.post("/consumer/stop", consumer.consumerStop);

module.exports = router;
