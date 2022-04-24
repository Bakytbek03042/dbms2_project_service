const { currencyFormat } = require("./format");

exports.generateTelegramMessage = (data) => {
  try {
    let text = "";

    text += `<b>${data.TITLE}</b>\n`;
    text += `City: <b>${data.CITY[0].toUpperCase()}${data.CITY.substring(
      1,
      data.CITY.length
    )}\n</b>`;
    text += `Price: <b>${currencyFormat(data.PRICE)} KZT</b>\n`;
    text += `Year: <b>${data.CAR_YEAR}</b>\n`;
    text += `Condition: <b>${getCondition(data.condition)}</b>\n`;
    text += `Gearbox: <b>${getGearbox(data.gearbox)}</b>\n`;
    text += `Views: <b>${data.CAR_VIEW}</b>\n`;
    text += `Link: <b>${data.CAR_URL}</b>\n`;

    return text;
  } catch (e) {
    console.log(e);

    return "";
  }
};

const getCondition = (value) => {
  if (value.trim() === "На ходу") {
    return "On the go";
  }

  return "Emergency";
};

const getGearbox = (value) => {
  if (value.trim().toLowerCase() === "автомат") {
    return "Automatic transmission";
  }

  return "Mechanics";
};
