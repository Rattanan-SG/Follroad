const express = require("express");
const controller = require("../controllers/external-event");
const router = express.Router();

router.get("/", controller.home);
router.get("/events", controller.getEvents);
router.get("/events/type/:type", controller.getEventsByType);
router.post("/update", controller.updateEvents);

module.exports = router;
