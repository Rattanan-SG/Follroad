const express = require("express");
const controller = require("../controllers");

const router = express.Router();

router.post("/event", controller.internalEvent.createInternalEvent);
router.get("/event", controller.internalEvent.getInternalEvent);
router.get("/event/:id", controller.internalEvent.getInternalEventById);
// router.patch("/event/:id", controller.patchRecordById);
// router.delete("/event/:id", controller.deleteRecordById);

module.exports = router;
