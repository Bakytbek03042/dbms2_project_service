const filterController = require("../controllers/filter");
const router = require("express").Router();

router.get("/", filterController.getFilters);
router.get("/:id", filterController.getFilter);
router.post("/", filterController.saveFilters);
router.delete("/:id", filterController.delete);
router.patch("/:id", filterController.update);

module.exports = router;
