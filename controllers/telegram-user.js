const { getAllTelegramUsers } = require("../services/telegram-user.database");

exports.getTelegramUsers = async (req, res) => {
  res.json(await getAllTelegramUsers());
};

exports.getTelegramUser = async (req, res) => {
  res.json();
};
