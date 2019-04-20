const job = require("../services/cron-job");

exports.home = (req, res) => {
  res.send({
    cronJob: { cronTime: job.cronTime.source, running: job.running }
  });
};

exports.postStartJob = (req, res) => {
  job.start();
  console.log(
    "Update events job has start at: " +
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Bangkok"
      })
  );
  res.status(201).send({ running: job.running });
};

exports.postStopJob = (req, res) => {
  job.stop();
  console.log(
    "Update events job has stop at: " +
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Bangkok"
      })
  );
  res.status(201).send({ running: job.running });
};
