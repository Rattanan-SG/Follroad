const express = require("express");
const controller = require("../controllers");

const router = express.Router();

router.post("/event", controller.event.createEvent);
router.get("/event", controller.event.getEvent);
router.get("/event/:id", controller.event.getEventById);
router.patch("/event/:id", controller.event.patchEventById);
router.delete("/event/:id", controller.event.deleteEventById);
router.post("/event/sync", controller.event.syncIticEvent);

module.exports = router;
