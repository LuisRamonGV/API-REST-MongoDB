// - - - - - Required modules - - - - -
const express = require("express");
const route = express.Router();

// - - - - - Controller - - - - -
const songs = require("../controllers/songs");

// - - - - - Routes and requests - - - - -
route.get("/", songs.getActives);
route.get("/:id", songs.getSongById);

route.post("/", songs.addSong);

route.put("/:id", songs.updateSong);

route.delete("/:id", songs.deactivateSong);

module.exports = route;
