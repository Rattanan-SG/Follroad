const { comment } = require("../domains");
const CustomError = require("../utils/custom-error");

exports.createComment = (user, body) => {
  const {
    sub: uid,
    "https://follroad.tk/name": authorName = body.authorName,
    "https://follroad.tk/picture": authorPictureUrl = body.authorPictureUrl
  } = user;
  return comment.create({ ...body, uid, authorName, authorPictureUrl });
};

exports.getComment = query => {
  const { orderByNew, ...where } = query;
  let order = orderByNew ? [["updatedAt", "DESC"]] : null;
  return comment.findAll(where, {
    order
  });
};

exports.getCommentById = id => comment.findByPk(id);

exports.patchCommentById = async (id, user, body) => {
  await checkCommentKeyAndOwner(id, user);
  delete body.uid;
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
