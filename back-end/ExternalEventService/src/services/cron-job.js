const CronJob = require("cron").CronJob;
const services = require("./service");

const job = new CronJob("*/3 * * * *", () => {
  services.updateEventToDatabase().catch(err => console.log(err));
});

job.start();

module.exports = job;
