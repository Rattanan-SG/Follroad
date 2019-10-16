const express = require("express");
const controller = require("../controllers");
const checkJwt = require("../auth");

const router = express.Router();

router.post("/record", checkJwt, controller.createRecord);
router.get("/record", controller.getRecord);
router.get("/record/notification", controller.getRecordThatReceiveNotification);
router.post("/record/notification/schedule", controller.scheduleCheckRecord);
router.get("/record/:id", controller.getRecordById);
router.patch("/record/:id", checkJwt, controller.patchRecordById);
router.delete("/record/:id", checkJwt, controller.deleteRecordById);

module.exports = router;
