const router = require("express").Router();
const messageController = require("../controllers/message");

router.post("/webhook", messageController.webhook);

module.exports = router;
