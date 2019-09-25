const express = require("express");
const event = require("./event");
const comment = require("./comment");
const feedback = require("./feedback");
const picture = require("./picture");

const router = express.Router();

const apis = [event, comment, feedback, picture];

router.use(apis);

module.exports = router;
