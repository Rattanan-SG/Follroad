const express = require("express");
const controller = require("../controllers");

const router = express.Router();

router.post("/check-route", controller.checkRoute);
// router.post("/queue", controller.createQueue); Not available now.
// router.delete("/queue/:name", controller.deleteQueueByName); Not available now.

module.exports = router;
