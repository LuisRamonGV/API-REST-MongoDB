const Album = require('../models/album');
const Song = require('../models/song');

const {albumsValidator} = require("../validations/albumsMD");

async function getAll(req, res) {
    const albums = await Album.find({state: true});
    res.status(200).json(albums)
}

async function newAlbum(req, res) {
    try {
        const { title, label, genre,year } = req.body;
        await albumsValidator.validateAsync({
            title,
            label,
            genre,
            year
        });

        const  album = new Album({
            title,
            label,
            genre,
            year,
            state:true
        });
        const result = await  album.save();
        res.status(202).json({result});
    } catch (e) {
        res.status(401).send({ error: e });
    }
}

async  function updateAlbum(req,res){
    try{
        const id = req.params.id_album;
        const { title, label, genre,year } = req.body;
        await albumsValidator.validateAsync({
            title,
            label,
            genre,
            year
        });
        const  result = await Album.findByIdAndUpdate(id,{
            title,
            label,
            genre,
            year
        },
            {new:true}).exec();
        if(!result) throw  'No se pudo completar la operacion';
        res.status(202).json({result});
    }catch (error){
        res.status(401).json({error});
    }
}

async function deleteAlbum(req,res){
    try{
        const id  = req.params.id_album;
        const  result = await Album.findByIdAndUpdate(id,{ state: false },
            {new:true}).exec();
        res.status(202).json({result});
        if(!result) throw  'No se pudo completar la operacion';
    }catch (error){
        res.status(401).json({error});
    }
}

async function addSongAlbum(req,res){
    try{
        const id_song = req.body.id_song;
        const id_album = req.body.id_album;

        const result = await  Album.findByIdAndUpdate(id_album,{ $addToSet:{ songs: id_song} },{new:true}).exec();
        if(!result) throw 'No se completo la orperacion';
        res.status(202).json(result);
    }catch (e){
        res.status(401).json({error:e});
    }
}

async  function getSongs(req,res){
    try {
        const id = req.params.id_album;
        const result = await Album.findById(id).exec();
        if(!result) throw 'No se completo la orperacion';
        const idSongs = result.songs;
        const recordsSongs = await Song.find({'_id':{$in:idSongs},state:true});
        res.status(202).send(recordsSongs);
    }
    catch (e){
        res.status(401).json({error:e});
    }
}

async function deleteSongAlbum(req,res){
    try {
        const id = req.params.id_album;
        const id_song = req.body.id_song;
        console.log('bien');
        const result = await Album.findByIdAndUpdate(id,{ $pull:{songs:id_song}},{new:true}).exec();
        if(!result) throw 'No se completo la operacion';
        res.status(202).send({result});
    }catch (e){
        res.status(401).json({error:e});
    }
}
module.exports = {getAll,newAlbum,updateAlbum,deleteAlbum,addSongAlbum,getSongs,deleteSongAlbum};




