const express = require("express");
const router = express.Router();
const controller = require("../controllers/cron-job");

router.get("/", controller.getJobStatus);
router.post("/start", controller.postStartJob);
router.post("/stop", controller.postStopJob);

module.exports = router;
