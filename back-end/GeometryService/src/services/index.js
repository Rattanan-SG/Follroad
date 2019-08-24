const sqs = require("../consumers/aws-sqs");
const geometry = require("./geometry");
const notification = require("../clients/notification");
const directionRecord = require("../clients/direction-record");
const { logInfo, logDebug } = require("../utils/logger");

exports.checkRoute = async () => {
  // const messages = await sqs.receiveMessage();
  // if (messages) {
  // return notification.getSubscription();
  // } else {
  // return notification.sendToSpecificUser();
  // return "No messages in queue";
  // }
};

exports.checkEventWithRecord = async event => {
  // const e = {
  //   eid: 593559,
  //   title: "MRT เปิดให้ประชาชนทดลองโดยสารฟรี",
  //   title_en: "Information at Wat Mangkon Kamalawat MRT Station",
  //   description:
  //     "MRT เปิดให้ประชาชนทดลองโดยสารฟรี\r\nช่วงสถานีวัดมังกร - สถานีท่าพระ\r\nในวันที่ 29 ก.ค. - 28 ก.ย. 62 ครับ\r\nซึ่งจะวิ่งทุกวัน ตั้งแต่เวลา 10:00 - 16:00 น. \r\n\r\nCr.FM 91",
  //   description_en:
  //     "MRT is open to the public for free trial, Wat Mangkon Kamalawat MRT Station - Tha Phra MRT Station On 29 Jul - 28 Sep 2019\r\nWhich runs every day from 10:00 am.- 04:00 pm.\r\n\r\nCr.FM 91",
  //   latitude: 13.744244219823,
  //   longitude: 100.50825521350001,
  //   type: 8,
  //   start: "2019-07-27 05:22:15",
  //   stop: "2019-09-28 16:22:15",
  //   contributor: "itic.nirat",
  //   icon: "information"
  // };
  // console.log("Start ", event);
  // return geometry.mappingEventAndRecords(event, dd);
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
    summary.push({ event: event.title.StringValue, related: filterUid });
  });
  logInfo("Handle Message Batch Check Events", {
    trueCount,
    faultCount,
    summary
  });
  return summary;
};
