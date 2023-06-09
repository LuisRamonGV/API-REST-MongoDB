// - - - - - Required modules - - - - -
const express = require("express");
const route = express.Router();

// - - - - - Controller - - - - -
const singers = require("../controllers/singers");

// - - - - - Routes and requests - - - - -
route.get("/", singers.getActives);
route.get("/:id", singers.getSingerById);
route.get("/albums/:id", singers.getSingerAlbums);
route.get("/songs/:id", singers.getSingerSongs);

route.post("/", singers.addSong);

route.put("/:id", singers.updateSinger);

route.delete("/:id", singers.deactivateSinger);

module.exports = route;
