const { picture } = require("../domains");
const CustomError = require("../utils/custom-error");

exports.createPicture = body => picture.create(body);

exports.getPicture = query => picture.findAll(query);

exports.getPictureById = id => picture.findByPk(id);

exports.patchPictureById = async (id, user, body) => {
  await checkPictureKeyAndOwner(id, user);
  return picture.updateByPk(id, body);
};

exports.deletePictureById = async (id, user) => {
  await checkPictureKeyAndOwner(id, user);
  return picture.deleteByPk(id);
};

const checkPictureKeyAndOwner = async (id, user) => {
  const { sub: uid } = user;
  const result = await picture.findByPk(id);
  if (!result)
    throw new CustomError(
      "PICTURE_NOT_FOUND",
      400,
      `Not found picture with this id: ${id}`
    );
  if (result.uid != uid)
    throw new CustomError(
      "FORBIDDEN",
      403,
      `You do not have rights for this resource`
    );
};
