const express = require("express");
const controller = require("../controllers");

const router = express.Router();

// router.post("/queue", controller.createQueue); Not available now.
router.get("/queue", controller.getQueue);
// router.delete("/queue/:name", controller.deleteQueueByName); Not available now.
router.post("/queue/:name/sendMessage", controller.sendMessageToQueueByName);

module.exports = router;
