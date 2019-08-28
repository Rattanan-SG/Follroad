const geometry = require("./geometry");
const notification = require("../clients/notification");
const directionRecord = require("../clients/direction-record");
const { logInfo, logDebug } = require("../utils/logger");

exports.isLocationOnRoute = async body => {
  const { latLng, route, toleranceInMeters } = body;
  return geometry.checkLatLngAndRoute(latLng, route, toleranceInMeters);
};

exports.handleMessageBatchCheckEvents = async messages => {
  const records = await directionRecord.getRecord();
  let trueCount = 0,
    faultCount = 0,
    summary = [];
  messages.forEach(({ MessageAttributes: event }) => {
    const resultRecords = records.map(record => {
      const result = geometry.checkEventIsRelatedToThisRoutes(
        {
          latitude: Number(event.latitude.StringValue),
          longitude: Number(event.longitude.StringValue)
        },
        record.direction.routes,
        200
      );
      if (result) trueCount++;
      else faultCount++;
      return {
        recordId: record._id,
        uid: record.uid,
        result
      };
    });
    // logDebug("Check event is related with records", {
    //   event: event.title.StringValue,
    //   resultRecords
    // });
    const filterUid = resultRecords
      .filter(item => item.result)
      .map(obj => obj.uid);
    if (filterUid.length > 0) {
      notification.sendToSpecificUser({
        message: {
          title: event.title.StringValue,
          body: event.description.StringValue
        },
        uid: filterUid
      });
    }
    summary.push({
      event: event.title.StringValue,
      latitude: event.latitude.StringValue,
      longitude: event.longitude.StringValue,
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
