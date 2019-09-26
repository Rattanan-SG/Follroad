const express = require("express");
const { geometry } = require("../../controllers");

const router = express.Router();

router.post("/geometry/isLocationOnRoute", geometry.isLocationOnRoute);

module.exports = router;
