const express = require("express");
const controller = require("../controllers");

const router = express.Router();

router.get("/event", controller.getEvent);
router.post("/event/sync", controller.syncEvent);
router.get("/event/type/:type", controller.getEventByType);

module.exports = router;
