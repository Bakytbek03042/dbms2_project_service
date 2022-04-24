const {
  getFiltersByChatID,
  createFilterTable,
  saveFilter,
  modifyColumn,
  deleteFilter,
  getFilter,
  updateFilter,
} = require("../services/filter.database");
const {
  isTelegramUserExists,
  createTelegramUserTable,
} = require("../services/telegram-user.database");

exports.getFilters = async (req, res) => {
  const data = await getFiltersByChatID(827932852);

  res.json({
    data,
    status: 200,
  });
};

exports.getFilter = async (req, res) => {
  const { id } = req.params;

  const filter = await getFilter(id);

  if (!filter) {
    return res.status(404).send();
  }

  res.json({
    status: 200,
    data: filter,
  });
};

exports.saveFilters = async (req, res) => {
  // modifyColumn();

  // return;

  try {
    await saveFilter(req.body);

    res.status(201).json({
      status: 201,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("delete filter", id);

    await deleteFilter(id);

    res.status(200).json({ id });
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;

  try {
    await updateFilter(id, req.body);

    res.status(200).json({ id });
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
};
