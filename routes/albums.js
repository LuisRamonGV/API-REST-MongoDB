const  express = require ('express');
const  router = express.Router();
const albumsController = require('../controllers/albums');
const {getAll,newAlbum, updateAlbum, deleteAlbum, addSongAlbum, getSongs, deleteSongAlbum} = require("../controllers/albums");
const {validateAlbumExist} = require("../validations/albumsMD");
const {validateSongExist} = require("../validations/songsMD");


router.get("/",getAll);
router.post("/",newAlbum);
router.put("/:id_album",validateAlbumExist,updateAlbum);
router.delete("/:id_album",validateAlbumExist,deleteAlbum)
router.post("/addSong/",validateSongExist,validateAlbumExist,addSongAlbum);
router.get("/getSongs/:id_album",validateAlbumExist,getSongs);
router.put("/deleteSong/:id_album",validateAlbumExist,deleteSongAlbum);
module.exports = router;