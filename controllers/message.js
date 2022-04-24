const { filterTelegramUsers } = require("../scripts/filter");
const { generateTelegramMessage } = require("../scripts/message");
const { getFilteredFilters } = require("../services/filter.database");
const { sendMessage } = require("../telegram/message");

exports.webhook = async (req, res) => {
  const { body } = req;

  const message = generateTelegramMessage(body);

  if (!message) {
    return;
  }

  const filters = await getFilteredFilters(body);
  console.log(filters);

  for (let filter of filters) {
    await sendMessage(filter.CHAT_ID, message);
  }

  res.send();
};
