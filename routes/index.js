const router = require("express").Router();
const checkAuth = require("../middleware/check-auth");

router.use("/filter", require("./filter"));
router.use("/telegram-user", require("./telegram-user"));
router.use("/message", require("./message"));

module.exports = router;
