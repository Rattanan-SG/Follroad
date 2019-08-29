const axios = require("axios");
const { env } = process;
const options = {
  url: env.URL,
  method: env.METHOD
};

axios(options)
  .then(res => {
    console.log(
      `{"time":"${new Date().toLocaleString("en-US", {
        timeZone: "Asia/Bangkok"
      })}","options":${JSON.stringify(options)},"response":${JSON.stringify(
        res.data
      )}}`
    );
  })
  .catch(err => console.log(err));
