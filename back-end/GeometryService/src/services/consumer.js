const geometryService = require("./geometry");
const eventApi = require("../clients/event");
const notificationApi = require("../clients/notification");
const directionRecordApi = require("../clients/direction-record");
const { logInfo, logDebug } = require("../utils/logger");

exports.handleBatchCheckNewEvents = async messages => {
  const records = await directionRecordApi.getRecordThatReceiveNotification({
    fields: "id uid name direction notificationRoutes"
  });
  let trueCount = 0,
    faultCount = 0,
    summary = [];
  messages.forEach(({ MessageAttributes: event }) => {
    const { title, description, latitude, longitude } = event;
    const eventLatLng = {
      latitude: Number(latitude.StringValue),
      longitude: Number(longitude.StringValue)
    };
    const relatedRecords = records.map(
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
    //   relatedRecords
    // });
    const listUidToSendNotification = relatedRecords
      .filter(item => item.result)
      .map(key => key.uid);
    if (listUidToSendNotification.length > 0) {
      notificationApi.sendToSpecificUser({
        message: {
          title: title.StringValue,
          body: description.StringValue
        },
        uid: listUidToSendNotification
      });
    }
    summary.push({
      event: title.StringValue,
      latitude: latitude.StringValue,
      longitude: longitude.StringValue,
      related: listUidToSendNotification
    });
  });
  logInfo("Handle Message Batch Check Events", {
    trueCount,
    faultCount,
    summary
  });
  return summary;
};

exports.handleBatchCheckDirectionRecord = async messages => {
  const events = await eventApi.getEvent({
    fields: "title latitude longitude"
  });
  messages.forEach(async ({ MessageAttributes: directionRecord }) => {
    const { id, uid, name, notificationRoutes } = directionRecord;
    const { direction } = await directionRecordApi.getRecordById(
      id.StringValue,
      {
        fields: "direction"
      }
    );
    const routeIndexs = notificationRoutes.StringValue.split(",").map(Number);
    const relatedEvents = events.map(({ title, latitude, longitude }) => {
      const eventLatLng = {
        latitude: Number(latitude),
        longitude: Number(longitude)
      };
      const result = geometryService.checkEventIsRelatedToThisRoutes(
        eventLatLng,
        direction.routes,
        routeIndexs,
        200
      );
      return {
        title,
        result
      };
    });
    // logDebug("Check records have related event", {
    //   directionRecord: name.StringValue,
    //   relatedEvents
    // });
    const filterResult = relatedEvents.filter(item => item.result);
    notificationApi.sendToSpecificUser({
      message: {
        title: `เส้นทาง ${name.StringValue} ของคุณ`,
        body:
          filterResult.length > 0
            ? `มีเหตุการณ์เกิดขึ้นอยู่ ${filterResult.length} เหตุการณ์`
            : "ไม่มีเหตุการณ์เกิดขึ้นบนเส้นทาง"
      },
      uid: uid.StringValue
    });
    logInfo("Handle Message Batch Check Direction-Record", {
      directionRecord: name.StringValue,
      count: filterResult.length,
      related: filterResult
    });
  });
  return;
};
