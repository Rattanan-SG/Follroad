const express = require("express");
const checkJwt = require("../../auth");
const { feedback } = require("../../controllers");

const router = express.Router();

router.post("/feedback", checkJwt, feedback.createFeedback);
router.put("/feedback", checkJwt, feedback.putFeedback);
router.get("/feedback", feedback.getFeedback);
router.get("/feedback/:id", feedback.getFeedbackById);
router.patch("/feedback/:id", checkJwt, feedback.patchFeedbackById);
router.delete("/feedback/:id", checkJwt, feedback.deleteFeedbackById);

module.exports = router;
