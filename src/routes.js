const express = require("express");
const router = express.Router();
const roomHandler = require("./handler/room.handler");

// Use the room handler for all "/rooms" routes
router.use("/rooms", roomHandler);

module.exports = router;