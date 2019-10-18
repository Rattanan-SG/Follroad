const express = require("express");
const { consumer } = require("../../controllers");

const router = express.Router();

router.get("/consumer/newEvent/status", consumer.newEventConsumerStatus);
router.post("/consumer/newEvent/start", consumer.newEventConsumerStart);
router.post("/consumer/newEvent/stop", consumer.newEventConsumerStop);

module.exports = router;
