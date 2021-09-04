const cron = require("node-cron");
const axios = require("axios");
const userModel = require("../models/user");

const datasync = () => {
  cron.schedule("0 3 * * *", async function () {
    const { data } = await axios.get("https://randomuser.me/api?results=50");
    const { results } = data;

    await userModel.create(results);

    console.log("success!");
  });
};

module.exports = datasync;
