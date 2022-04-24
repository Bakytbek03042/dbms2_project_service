exports.currencyFormat = (num) => {
  try {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
    });
    return formatter.format(num).replace(/,/g, " ");
  } catch (e) {
    console.log(e);
    return num;
  }
};
