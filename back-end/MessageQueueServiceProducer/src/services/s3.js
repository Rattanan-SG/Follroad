const AWS = require("../config/aws");

exports.getSignedUrl = async body => {
  const { key = "", contentType = "image/jpeg" } = body;
  const params = {
    Bucket: "follroad-picture",
    Key: key,
    Expires: 30 * 60, // 30 minutes
    ContentType: contentType,
    ACL: "public-read"
  };
  const options = {
    signatureVersion: "v4"
  };
  const client = new AWS.S3(options);
  return new Promise((resolve, reject) => {
    client.getSignedUrl("putObject", params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
