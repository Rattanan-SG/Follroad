const express = require("express");
const checkJwt = require("../../auth");
const { comment } = require("../../controllers");

const router = express.Router();

router.post("/comment", checkJwt, comment.createComment);
router.get("/comment", comment.getComment);
router.get("/comment/:id", comment.getCommentById);
router.patch("/comment/:id", checkJwt, comment.patchCommentById);
router.delete("/comment/:id", checkJwt, comment.deleteCommentById);

module.exports = router;
