const sequelize = require("sequelize");
const { feedback } = require("../domains");
const CustomError = require("../utils/custom-error");

exports.createFeedback = (user, body) => {
  const { sub: uid } = user;
  return feedback.create({ ...body, uid });
};

exports.createOrUpdateFeedback = (user, body) => {
  const { sub: uid } = user;
  return feedback.upsert({ ...body, deletedAt: null, uid });
};

exports.getFeedback = query => {
  const { fields, ...where } = query;
  return feedback.findAll(where, { attributes: fields });
};

exports.deleteFeedbackByUniqueKey = async (user, eventId) => {
  const { sub: uid } = user;
  return feedback.delete({ uid, eventId });
};

exports.getFeedbackById = (id, query) => {
  const { fields } = query;
  return feedback.findByPk(id, {
    attributes: fields
  });
};

exports.patchFeedbackById = async (id, user, body) => {
  await checkFeedbackKeyAndOwner(id, user);
  delete body.uid;
  return feedback.updateByPk(id, body);
};

exports.deleteFeedbackById = async (id, user) => {
  await checkFeedbackKeyAndOwner(id, user);
  return feedback.deleteByPk(id);
};

exports.getEventFeedbackSummary = async query => {
  const { uid } = query;
  let eventFeedback = await feedback.findAll(null, {
    attributes: [
      "eventId",
      [
        sequelize.fn(
          "SUM",
          sequelize.literal("CASE WHEN react = true THEN 1 ELSE 0 END")
        ),
        "like"
      ],
      [
        sequelize.fn(
          "SUM",
          sequelize.literal("CASE WHEN react = false THEN 1 ELSE 0 END")
        ),
        "dislike"
      ]
    ],
    group: ["eventId"]
  });
  if (uid) {
    const userFeedback = await feedback.findAll(
      { uid },
      {
        attributes: ["eventId", "react"],
        raw: true
      }
    );
    let eventFeedbackJson = JSON.parse(JSON.stringify(eventFeedback));
    eventFeedback = eventFeedbackJson.map(data => ({
      ...userFeedback.find(item => item.eventId === data.eventId && item),
      ...data
    }));
  }
  return eventFeedback;
};

exports.countLikeAndDislikeOfEventById = async eventId => {
  const like = await feedback.count({ eventId, react: true });
  const dislike = await feedback.count({ eventId, react: false });
  return { eventId: Number(eventId), like, dislike };
};

const checkFeedbackKeyAndOwner = async (id, user) => {
  const { sub: uid } = user;
  const result = await feedback.findByPk(id);
  if (!result)
    throw new CustomError(
      "FEEDBACK_NOT_FOUND",
      400,
      `Not found feedback with this id: ${id}`
    );
  if (result.uid != uid)
    throw new CustomError(
      "FORBIDDEN",
      403,
      `You do not have rights for this resource`
    );
};
