const express = require("express");
const controller = require("../controllers/cron-job");
const router = express.Router();

router.get("/", controller.getJobStatus);
router.post("/start", controller.postStartJob);
router.post("/stop", controller.postStopJob);

module.exports = router;
