// - - - - - Required modules - - - - -
const express = require("express");
const route = express.Router();

// - - - - - Controller - - - - -
const singer_controller = require("../controllers/singer_controller");

// - - - - - Routes and requests - - - - -
route.get("/", singer_controller.getActives);
route.get("/:id", singer_controller.getSingerById);
route.get("/albums/:id", singer_controller.getSingerAlbums);
route.get("/songs/:id", singer_controller.getSingerSongs);

route.post("/", singer_controller.addSong);

route.put("/:id", singer_controller.updateSinger);

route.delete("/:id", singer_controller.deactivateSinger);

module.exports = route;
