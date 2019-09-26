const geometryService = require("./geometry");
const notificationApi = require("../clients/notification");
const directionRecordApi = require("../clients/direction-record");
const { logInfo, logDebug } = require("../utils/logger");

exports.handleMessageBatchCheckEvents = async messages => {
  const records = await directionRecordApi.getRecordThatReceiveNotification();
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
        const result = geometryService.checkEventIsRelatedToThisRoutes(
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
      notificationApi.sendToSpecificUser({
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
