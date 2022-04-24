const { personal_cabinet_text } = require("./constants");
const constants = require("./constants");

const send_phone_keyboard = [
  [
    {
      text: constants.send_phone_text,
      request_contact: true,
    },
  ],
];

const main_menu_keyboard = [
  [
    {
      text: personal_cabinet_text,
    },
  ],
];

module.exports = {
  send_phone_keyboard,
  main_menu_keyboard,
};
