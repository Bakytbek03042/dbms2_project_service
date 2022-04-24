const oracledb = require("oracledb");

const table_name = "telegram_users";

// Checking is telegram user already exists
const isTelegramUserExists = async (chat_id, binds = [], opts = []) => {
  const statement = `select chat_id from ${table_name} where chat_id=${chat_id}`;

  const result = await execute(statement, binds, opts);

  return result.rows.length > 0;
};
module.exports.isTelegramUserExists = isTelegramUserExists;

module.exports.getTelegramUsers = async () => {
  const statement = `SELECT * FROM ${table_name}`;

  const result = await execute(statement);

  return result.rows;
};

// Creating telegram user when click start
const createTelegramUser = async (
  { chat_id, username = "", first_name = "" },
  binds = [],
  opts = []
) => {
  if (!chat_id) {
    console.log(`chat_id not found (createTelegramUser)`);
    return;
  }

  const statement = `INSERT INTO ${table_name} (chat_id, username, first_name) VALUES (${chat_id}, '${username}', '${first_name}')`;

  const result = await execute(statement, binds, opts);

  console.log(result);
};
module.exports.createTelegramUser = createTelegramUser;

// Check is exists telegram user phone number
const isExistsTelegramUserPhoneNumber = async (
  chat_id,
  binds = [],
  opts = []
) => {
  if (!chat_id) {
    console.log(`chat_id not found (isExistsTelegramUserPhoneNumber)`);
    return;
  }

  console.log(`Checking telegram user ${chat_id} phone number`);

  const statement = `SELECT phone FROM ${table_name} WHERE chat_id=${chat_id}`;

  const result = await execute(statement, binds, opts);

  let is_exists = false;

  if (result.rows.length > 0) {
    is_exists = result.rows[0].PHONE !== null;
  }

  return is_exists;
};
module.exports.isExistsTelegramUserPhoneNumber =
  isExistsTelegramUserPhoneNumber;

// Save user phone number
const saveTelegramUserPhoneNumber = async (
  chat_id,
  phone,
  binds = [],
  opts = []
) => {
  if (!chat_id || !phone) {
    console.log(`chat_id or phone not found (saveTelegramUserPhoneNumber)`);
    return;
  }

  console.log(`Saving phone number ${phone} for user ${chat_id}`);

  const statement = `UPDATE ${table_name} SET phone=${phone}`;

  const result = await execute(statement, binds, opts);

  return result.rowsAffected >= 1;
};
module.exports.saveTelegramUserPhoneNumber = saveTelegramUserPhoneNumber;

// Create new telegram user table
const createTelegramUserTable = async (binds = [], opts = []) => {
  console.log("Creating telegram user");

  const statement = `
        CREATE TABLE ${table_name}
        ( chat_id number(20) NOT NULL,
          username varchar2(50),
          first_name varchar2(50),
          expire_date date,
          invited_user_id number(20),
          phone varchar(15)
        )`;

  await execute(statement, binds, opts);
};
module.exports.createTelegramUserTable = createTelegramUserTable;

exports.getAllTelegramUsers = async (binds = [], opts = []) => {
  const statement = `select * from ${table_name}`;

  const result = await execute(statement);

  return result.rows;
};

// Execute PL/SQL query
const execute = (statement, binds = [], opts = []) => {
  return new Promise(async (resolve, reject) => {
    let conn;

    opts["outFormat"] = oracledb.OBJECT;
    opts["autoCommit"] = true;

    try {
      conn = await oracledb.getConnection();

      const result = await conn.execute(statement, binds, opts);

      resolve(result);
    } finally {
      // console.log(err);

      // if (err.errorNum === 942) {
      //   await createTelegramUserTable();
      // }
      if (conn) {
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
};
