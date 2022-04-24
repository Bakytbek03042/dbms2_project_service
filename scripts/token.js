const jwt = require("jsonwebtoken");
const config = require("config");

exports.generateTokenForTelegramUser = (chat_id) => {
  const JWT_KEY = config.get("telegram.JWT_KEY");

  const payload = {
    chat_id,
  };

  return {
    access_token: jwt.sign(payload, JWT_KEY),
  };
};
