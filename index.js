const express = require("express");
const cors = require("cors");
const config = require("config");
const database = require("./services/database");
const { dropFilterTable } = require("./services/filter.database");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", require("./routes"));

const PORT = config.get("PORT") || 5050;
app.listen(PORT, () => console.log(`Server started at port ${PORT}...`));

const startDatabaseInitialization = async () => {
  console.log("Initializing database module");

  try {
    await database.initialize().then(async () => {
      console.log(`Database initialized | ${new Date()}`);
    });
  } catch (e) {
    console.log(e);

    process.exit(1);
  }
};
startDatabaseInitialization();

require("./telegram");
