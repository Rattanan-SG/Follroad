const express = require("express");
const checkJwt = require("../../auth");
const { picture } = require("../../controllers");

const router = express.Router();

router.post("/picture", checkJwt, picture.createPicture);
router.get("/picture", picture.getPicture);
router.get("/picture/:id", picture.getPictureById);
router.patch("/picture/:id", checkJwt, picture.patchPictureById);
router.delete("/picture/:id", checkJwt, picture.deletePictureById);

module.exports = router;
