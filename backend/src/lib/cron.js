import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", function () {
  console.log("Pinging:", process.env.API_URL);
  https
    .get(process.env.API_URL, (res) => {
      console.log("Status code:", res.statusCode); // log this
      if (res.statusCode === 200) {
        console.log("GET request sent successfully ✅");
      } else {
        console.log("GET request failed ❌", res.statusCode);
      }
    })
    .on("error", (e) => {
      console.error("Error while sending request 🚨", e);
    });
});

export default job;
