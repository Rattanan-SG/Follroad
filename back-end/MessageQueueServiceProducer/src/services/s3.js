const AWS = require("../config/aws");

exports.getSignedUrl = async query => {
  const { key = "", contentType = "image/jpeg" } = query;
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
        // const postEndpoint =
        //   data.substring(0, data.lastIndexOf("/")).replace(/^https?\:/i, "") +
        //   "/follroad-picture";
        // const queryParams = data
        //   .substring(data.indexOf("?") + 1)
        //   .split("&")
        //   .reduce(
        //     (memo, param) => ({
        //       ...memo,
        //       [param.split("=")[0]]: param.split("=")[1]
        //     }),
        //     {}
        //   );
        // const result = {
        //   signature: {
        //     "Content-Type": contentType,
        //     acl: "public-read",
        //     success_action_status: "201",
        //     "X-amz-credential": queryParams["X-Amz-Credential"],
        //     "X-amz-algorithm": queryParams["X-Amz-Algorithm"],
        //     "X-amz-date": queryParams["X-Amz-Date"],
        //     "X-amz-signature": queryParams["X-Amz-Signature"],
        //     key
        //   },
        //   postEndpoint
        // };
        // resolve(result);
        resolve(data);
      }
    });
  });
};

exports.createPresignedPost = async query => {
  const { key = "", contentType = "image/jpeg" } = query;
  const params = {
    Bucket: "follroad-picture",
    Expires: 30 * 60, // 30 minutes
    Fields: {
      "Content-Type": contentType,
      key,
      acl: "public-read",
      success_action_status: "201"
    }
  };
  const options = {
    signatureVersion: "v4"
  };
  const client = new AWS.S3(options);
  return new Promise((resolve, reject) => {
    client.createPresignedPost(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const { url, fields } = data;
        const postEndpoint = url.replace(/^https?\:/i, "");
        const result = {
          signature: { ...fields },
          postEndpoint
        };
        resolve(result);
        // resolve(data);
      }
    });
  });
};

exports.attachment = () => {
  return "Success";
};
