const { comment } = require("../domains");
const CustomError = require("../utils/custom-error");

exports.createComment = body => comment.create(body);

exports.getComment = query => comment.findAll(query);

exports.getCommentById = id => comment.findByPk(id);

exports.patchCommentById = async (id, user, body) => {
  await checkCommentKeyAndOwner(id, user);
  return comment.updateByPk(id, body);
};

exports.deleteCommentById = async (id, user) => {
  await checkCommentKeyAndOwner(id, user);
  return comment.deleteByPk(id);
};

const checkCommentKeyAndOwner = async (id, user) => {
  const { sub: uid } = user;
  const result = await comment.findByPk(id);
  if (!result)
    throw new CustomError(
      "COMMENT_NOT_FOUND",
      400,
      `Not found comment with this id: ${id}`
    );
  if (result.uid != uid)
    throw new CustomError(
      "FORBIDDEN",
      403,
      `You do not have rights for this resource`
    );
};
