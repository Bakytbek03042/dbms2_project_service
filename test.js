const regions = require("./regions.json");

const apiKey = "AIzaSyBF6EiUkb5dsEeizM-3p2Ae26EDCLG7pVw";
const fs = require("fs");

var googleTranslate = require("google-translate")(apiKey);
const translate = require("translate-google");

const start = async () => {
  const rest = [];

  for (let region of regions) {
    const regionName = await translateWord(region.name);

    const cities = [];

    for (let city of region.cities) {
      const cityName = await translateWord(city.name);
      cities.push({
        name: cityName,
        city: city.city,
        popular: city.popular,
      });
    }

    rest.push({
      name: regionName,
      popular: region.popular,
      cities,
    });
  }

  fs.writeFileSync("./reg.json", JSON.stringify(rest));
};

const translateWord = async (word) => {
  const tranObj = {
    a: 1,
    b: "1",
    c: word,
    d: [true, "true", "hi"],
  };

  return await translate(tranObj, { from: "ru", to: "en", except: ["a"] })
    .then((res) => {
      return res.c;
    })
    .catch((err) => {
      console.error(err);
    });
};

start();
