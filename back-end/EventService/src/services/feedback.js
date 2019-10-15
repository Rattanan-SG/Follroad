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

exports.getFeedback = query => feedback.findAll(query);

exports.deleteFeedbackByUniqueKey = async (user, eventId) => {
  const { sub: uid } = user;
  return feedback.delete({ uid, eventId });
};

exports.getFeedbackById = id => feedback.findByPk(id);

exports.patchFeedbackById = async (id, user, body) => {
  await checkFeedbackKeyAndOwner(id, user);
  delete body.uid;
  return feedback.updateByPk(id, body);
};

exports.deleteFeedbackById = async (id, user) => {
  await checkFeedbackKeyAndOwner(id, user);
  return feedback.deleteByPk(id);
};

exports.countLikeAndDislikeOfEventId = async eventId => {
  const countLike = await feedback.count({ eventId, react: true });
  const countDislike = await feedback.count({ eventId, react: false });
  return { countLike, countDislike };
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
