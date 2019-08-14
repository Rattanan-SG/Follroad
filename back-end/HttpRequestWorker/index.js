const http = require("http");

const { env } = process;
const options = {
  hostname: env.HOST,
  port: env.PORT,
  path: env.PATH,
  method: env.METHOD,
  headers: {
    "Content-Type": "application/json"
  }
};

// const options = {
//   hostname: "localhost",
//   port: 3000,
//   path: "/external-event/api/event/sync",
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   }
// };

const req = http.request(options, response => {
  response.setEncoding("utf8");
  response.on("data", res => {
    console.log(
      `{"time":"${new Date().toLocaleString("en-US", {
        timeZone: "Asia/Bangkok"
      })}","options":${JSON.stringify(options)},"response":${res}}`
    );
  });
});

req.on("error", e => {
  console.log("Problem with request:", e);
});

req.end();
