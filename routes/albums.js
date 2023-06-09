// - - - - - Required modules - - - - -
const express = require("express");
const route = express.Router();

// - - - - - Controller - - - - -
const album_controller = require("../controllers/album_controller");

// - - - - - Routes and requests - - - - -
route.get("/", album_controller.getActives);
route.get("/:id", album_controller.getAlbumById);
route.get("/songs/:id", album_controller.getAlbumSongs);

route.post("/", album_controller.addAlbum);

route.put("/:id", album_controller.updateAlbum);

route.delete("/:id", album_controller.deactivateAlbum);

module.exports = route;
