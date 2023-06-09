const  express = require ('express');
const {getAll, deleteSong,newSong, updateSong} = require("../controllers/songs");
const {validateSongExist} = require("../validations/songsMD");
const {validateAlbumExist} = require("../validations/albumsMD");
const {addSongAlbum} = require("../controllers/albums");
const  router = express.Router();



router.get("/",getAll);
router.post("/",newSong);
router.put("/:id_song",validateSongExist,updateSong);
router.delete("/:id_song",validateSongExist,deleteSong);

module.exports = router;