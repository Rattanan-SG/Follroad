const express = require("express");
const { event } = require("../controllers");
const checkJwt = require("../auth");

const router = express.Router();

router.post("/event", checkJwt, event.createEvent);
router.get("/event", event.getEvent);
router.get("/event/:id", event.getEventById);
router.patch("/event/:id", checkJwt, event.patchEventById);
router.delete("/event/:id", checkJwt, event.deleteEventById);
router.post("/event/sync", event.syncIticEvent);

module.exports = router;
