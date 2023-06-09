// - - - - - Required modules - - - - -
const express = require("express");
const route = express.Router();

// - - - - - Controller - - - - -
const albums = require("../controllers/albums");

// - - - - - Routes and requests - - - - -
route.get("/", albums.getActives);
route.get("/:id", albums.getAlbumById);
route.get("/songs/:id", albums.getAlbumSongs);

route.post("/", albums.addAlbum);

route.put("/:id", albums.updateAlbum);

route.delete("/:id", albums.deactivateAlbum);

module.exports = route;
