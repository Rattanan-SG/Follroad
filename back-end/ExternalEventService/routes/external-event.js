const express = require("express");
const router = express.Router();
const controller = require("../controllers/external-event");

router.get("/", controller.home);
router.get("/events", controller.getEvents);
router.get("/events/type/:type", controller.getEventsByType);
router.post("/update", controller.updateEvents);

module.exports = router;
