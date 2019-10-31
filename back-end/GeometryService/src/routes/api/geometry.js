const express = require("express");
const { geometry } = require("../../controllers");

const router = express.Router();

router.post("/geometry/isLocationOnRoute", geometry.isLocationOnRoute);
router.post(
  "/geometry/checkDirectionRecord",
  geometry.checkAllEventWithDirectionRecordById
);

module.exports = router;
