const express = require("express");
const controller = require("../controllers");

const router = express.Router();

router.get("/event", controller.getEvent);
router.post("/update", controller.updateEvent);

module.exports = router;
