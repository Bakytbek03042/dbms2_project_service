const {
  isTelegramUserExists,
  createTelegramUser,
  isExistsTelegramUserPhoneNumber,
  saveTelegramUserPhoneNumber,
} = require("../services/telegram-user.database");
const bot = require("./bot");
const { sendMessage } = require("./message");
const { send_phone_keyboard, main_menu_keyboard } = require("./keyboards");
const { generateTokenForTelegramUser } = require("../scripts/token");
const { personal_cabinet_text } = require("./constants");

bot.start(async (ctx) => {
  const chat_id = ctx.from.id;
  console.log(`User ${chat_id} is clicked start | ${new Date()}`);

  const is_users_exists = await isTelegramUserExists(chat_id);

  console.log(`Is user ${chat_id} exists: ${is_users_exists}`);

  if (!is_users_exists) {
    const username = ctx.from.username;
    const first_name = ctx.from.first_name;

    const is_registered = await createTelegramUser({
      chat_id,
      username,
      first_name,
    });

    if (is_registered) {
      await ctx.reply(
        "To continue registration, please send your phone number"
      );
      return;
    }
  } else {
    const is_phone_exists = await isExistsTelegramUserPhoneNumber(chat_id);

    if (is_phone_exists) {
      await sendMessage(
        chat_id,
        "Welcome",
        main_menu_keyboard
      );
      return;
    }
  }

  await sendMessage(
    chat_id,
    "To continue registration, please send your phone number",
    send_phone_keyboard
  );
});

bot.on("contact", async (ctx) => {
  const chat_id = ctx.from.id;

  if (!(await isTelegramUserExists(chat_id))) {
    return;
  }

  const phone = ctx.update.message.contact.phone_number;

  const is_exists = await isExistsTelegramUserPhoneNumber(chat_id);

  if (!is_exists) {
    const is_saved = await saveTelegramUserPhoneNumber(chat_id, phone);

    if (is_saved) {
      await sendMessage(
        chat_id,
        "You are successfully registered",
        main_menu_keyboard
      );
    }
  } else {
    await sendMessage(
      chat_id,
      "You are successfully registered",
      main_menu_keyboard
    );
  }
});

bot.on("message", async (ctx) => {
  const chat_id = ctx.from.id;

  if (ctx.update.message.text === personal_cabinet_text) {
    const token = generateTokenForTelegramUser(chat_id);

    await sendMessage(
      chat_id,
      "To go to your personal account, click the button below",
      [],
      [
        [
          {
            text: personal_cabinet_text,
            url: `https://google.com/${chat_id}/?token=${token.access_token}`,
          },
        ],
      ]
    );
  }
});

bot.launch().then(() => {
  console.log(`Telegram bot launched | ${new Date()}`);
});
