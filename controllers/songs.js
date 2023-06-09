const Song = require('../models/song');
const {songsValidator} = require("../validations/songsMD");


async function getAll(req, res) {
    const songs = await Song.find({state: true});
    res.status(200).json(songs)
}

async function newSong(req, res) {
    try {
        const { title, track, number,length } = req.body;
        await songsValidator.validateAsync({
            title,
            track,
            number,
            length
        });

        const  song = new Song({
            title,
            track,
            number,
            length,
            state: true
        });
        const result = await  song.save();
        res.status(202).json({result});
    } catch (e) {
        res.status(401).send({ error: e });
    }
}

async  function updateSong(req,res){
    try{
        const id = req.params.id_song;
        const { title, track, number,length } = req.body;
        await songsValidator.validateAsync({
            title,
            track,
            number,
            length
        });
        const  result = await Song.findByIdAndUpdate(id,{
                title,
                track,
                number,
                length
            },
            {new:true}).exec();
        if(!result) throw  'No se pudo actualizar';
        res.status(202).json({result});
    }catch (error){
        res.status(401).json({error});
    }
}

async function deleteSong(req,res){
    try{
        const id  = req.params.id_song;
        const  result = await Song.findByIdAndUpdate(id,{ state: false },
            {new:true}).exec();
        if(!result) throw  'No se pudo completar la operacion';
        res.status(202).json({result});

    }catch (error){
        res.status(401).json({error});
    }
}


module.exports = {getAll,newSong,updateSong,deleteSong};
