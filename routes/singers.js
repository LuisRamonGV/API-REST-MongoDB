const express = require("express");
const router = express.Router();
const singersController = require("../controllers/singers");
const {validateSingerExist} = require("../validations/singersMD");
const {validateAlbumExist} = require("../validations/albumsMD");


router.get("/", singersController.getAll);
router.post("/",singersController.newSinger);
router.put("/:id_singer",validateSingerExist,singersController.updateSinger);
router.delete("/:id_singer",validateSingerExist,singersController.deleteSinger);

router.post("/addAlbum/",validateSingerExist,validateAlbumExist,singersController.addAlbumSinger);
router.get("/getAlbums/:id_singer",validateSingerExist,singersController.getAlbums);
router.put("/deleteAlbum/:id_singer",validateSingerExist,singersController.deleteAlbumSinger);


module.exports = router;
