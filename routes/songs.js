// - - - - - Required modules - - - - -
const express = require("express");
const route = express.Router();

// - - - - - Controller - - - - -
const song_controller = require("../controllers/song_controller");

// - - - - - Routes and requests - - - - -
route.get("/", song_controller.getActives);
route.get("/:id", song_controller.getSongById);

route.post("/", song_controller.addSong);

route.put("/:id", song_controller.updateSong);

route.delete("/:id", song_controller.deactivateSong);

module.exports = route;
