const geometry = require("./geometry");
const notification = require("../clients/notification");
const directionRecord = require("../clients/direction-record");
const { logInfo, logDebug } = require("../utils/logger");

exports.isLocationOnRoute = async body => {
  const { latLng, route, toleranceInMeters } = body;
  return geometry.checkLatLngAndRoute(latLng, route, toleranceInMeters);
};

exports.handleMessageBatchCheckEvents = async messages => {
  const records = await directionRecord.getRecordThatReceiveNotification();
  let trueCount = 0,
    faultCount = 0,
    summary = [];
  messages.forEach(({ MessageAttributes: event }) => {
    const { title, description, latitude, longitude } = event;
    const eventLatLng = {
      latitude: Number(latitude.StringValue),
      longitude: Number(longitude.StringValue)
    };
    const resultRecords = records.map(
      ({ _id, uid, name, direction, notificationRoutes }) => {
        const result = geometry.checkEventIsRelatedToThisRoutes(
          eventLatLng,
          direction.routes,
          notificationRoutes,
          200
        );
        if (result) trueCount++;
        else faultCount++;
        return {
          _id,
          uid,
          name,
          result
        };
      }
    );
    // logDebug("Check event is related with records", {
    //   event: title.StringValue,
    //   resultRecords
    // });
    const filterUid = resultRecords
      .filter(item => item.result)
      .map(obj => obj.uid);
    if (filterUid.length > 0) {
      notification.sendToSpecificUser({
        message: {
          title: title.StringValue,
          body: description.StringValue
        },
        uid: filterUid
      });
    }
    summary.push({
      event: title.StringValue,
      latitude: latitude.StringValue,
      longitude: longitude.StringValue,
      related: filterUid
    });
  });
  logInfo("Handle Message Batch Check Events", {
    trueCount,
    faultCount,
    summary
  });
  return summary;
};
