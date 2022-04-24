const bot = require("./bot");

exports.sendMessage = async (
  chat_id,
  message,
  keyboard = [],
  inline_keyboard = []
) => {
  await bot.telegram
    .sendMessage(chat_id, message, {
      reply_markup: {
        resize_keyboard: true,
        inline_keyboard,
        keyboard,
      },
      parse_mode: "HTML",
    })
    .then((data) => {
      console.log(
        `Message send to ${chat_id} | message_id: ${
          data.message_id
        } | ${new Date()}`
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
