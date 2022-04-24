const { Telegraf } = require("telegraf");
const config = require("config");

const bot = new Telegraf(config.get("telegram.token"));

module.exports = bot;
