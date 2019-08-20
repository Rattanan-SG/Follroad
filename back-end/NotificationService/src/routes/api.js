const express = require("express");
const controller = require("../controllers");

const router = express.Router();

router.post("/subscription", controller.subscribe);
router.get("/subscription", controller.getSubscription);
router.put("/subscription", controller.updateOrCreateSubscription);
router.delete("/subscription", controller.unSubscribe);
router.get("/subscription/null", controller.getSubscriptionThatUidisNull);
router.post("/subscription/renew", controller.renewSubscription);
router.post("/subscription/send", controller.sendNotificationToSpecificUser);
router.post("/subscription/send/all", controller.sendNotificationToAllUser);
router.get("/subscription/:id", controller.getSubscriptionById);
router.patch("/subscription/:id", controller.updateSubscriptionById);
router.post("/send", controller.sendNotification);

module.exports = router;
