const express = require("express");
const checkJwt = require("../../auth");
const { feedback } = require("../../controllers");

const router = express.Router();

router.post("/feedback", checkJwt, feedback.createFeedback);
router.get("/feedback", feedback.getFeedback);
router.put("/feedback", checkJwt, feedback.putFeedback);
router.delete("/feedback", checkJwt, feedback.deleteFeedback);
router.get("/feedback/summary", feedback.getEventFeedbackSummary);
router.get("/feedback/:id", feedback.getFeedbackById);
router.patch("/feedback/:id", checkJwt, feedback.patchFeedbackById);
router.delete("/feedback/:id", checkJwt, feedback.deleteFeedbackById);
router.get("/feedback/count/:eventId", feedback.getCountFeedbackOfEventById);

module.exports = router;
