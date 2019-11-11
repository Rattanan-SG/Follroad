const geometryService = require("./geometry");
const eventApi = require("../clients/event");
const notificationApi = require("../clients/notification");
const directionRecordApi = require("../clients/direction-record");
const { logInfo } = require("../utils/logger");

exports.handleBatchCheckNewEvents = async messages => {
  let records = await directionRecordApi.getRecordThatReceiveNotification({
    fields: "id uid name notificationRoutes"
  });
  records = await Promise.all(
    records.map(async ({ _id, uid, name, notificationRoutes }) => {
      const { direction } = await directionRecordApi.getRecordById(_id, {
        fields: "direction"
      });
      return { _id, uid, name, notificationRoutes, direction };
    })
  );
  messages.forEach(async ({ MessageAttributes: event }) => {
    const { id, title, description, latitude, longitude } = event;
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
          100,
          100
        );
        return {
          _id,
          uid,
          name,
          result
        };
      }
    );
    let relatedDirectionRecord = [];
    const listUidToSendNotification = relatedRecords
      .filter(item => item.result)
      .map(({ _id, uid, name }) => {
        relatedDirectionRecord.push({ _id, name });
        return uid;
      });
    if (listUidToSendNotification.length > 0) {
      notificationApi.sendToSpecificUser({
        message: {
          title: title.StringValue,
          body: description.StringValue,
          data: { eventId: Number(id.StringValue) }
        },
        uid: listUidToSendNotification
      });
    }
    logInfo("Handle Message Batch Check New Event", {
      id: Number(id.StringValue),
      title: title.StringValue,
      latitude: latitude.StringValue,
      longitude: longitude.StringValue,
      relatedDirectionRecord
    });
  });
  return;
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
        100,
        100
      );
      return {
        title,
        result
      };
    });
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
