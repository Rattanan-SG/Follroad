const { feedback } = require("../domains");
const CustomError = require("../utils/custom-error");

exports.createFeedback = body => feedback.create(body);

exports.getFeedback = query => feedback.findAll(query);

exports.getFeedbackById = id => feedback.findByPk(id);

exports.patchFeedbackById = async (id, user, body) => {
  await checkFeedbackKeyAndOwner(id, user);
  return feedback.updateByPk(id, body);
};

exports.deleteFeedbackById = async (id, user) => {
  await checkFeedbackKeyAndOwner(id, user);
  return feedback.deleteByPk(id);
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