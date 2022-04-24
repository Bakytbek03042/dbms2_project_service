const telegramUserController = require("../controllers/telegram-user");
const router = require("express").Router();

router.get("/", telegramUserController.getTelegramUsers);
router.get("/:chat_id", telegramUserController.getTelegramUser);

module.exports = router;
