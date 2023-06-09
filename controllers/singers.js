const Singer = require("../models/singer");
const {singersValidator }= require("../validations/singersMD");
const Album = require("../models/album");


async function getAll(req, res) {
    const singers = await Singer.find({state: true});
    res.status(200).json(singers)
}

async function newSinger(req, res) {
  try {
    const { artistic_name, real_name, nationality } = req.body;
    await singersValidator.validateAsync({
      artistic_name,
      real_name,
      nationality,
    });

    const  singer = new Singer({
       artistic_name,
      real_name,
      nationality,
      state: true
    });
    const result = await  singer.save();
    if(!result) throw  'No se pudo actualizar';
    res.status(202).json({result});
  } catch (e) {
    res.status(401).send({ error: e });
  }
}

async  function updateSinger(req,res){
  try{
    const id = req.params.id_singer;
    const {artistic_name,real_name, nationality} = req.body;
    await singersValidator.validateAsync({artistic_name,real_name,nationality});
    const  result = await Singer.findByIdAndUpdate(id,{ artistic_name,real_name,nationality },
        {new:true}).exec();
    if(!result) throw  'No se pudo actualizar';
    res.status(202).json({result});
  }catch (error){
    res.status(401).json({error});
  }
}

async function deleteSinger(req,res){
    try{
      const id  = req.params.id_singer;
      const  result = await Singer.findByIdAndUpdate(id,{ state: false },
          {new:true}).exec();
      if(!result) throw  'No se pudo eliminar';
      res.status(202).json({result});

    }catch (error){
      res.status(401).json({error});
    }
}
async function addAlbumSinger(req,res){
  try{
    const id_album = req.body.id_album;
    const id_singer = req.body.id_singer;

    const result = await  Singer.findByIdAndUpdate(id_singer,{ $addToSet:{ albums: id_album} },{new:true}).exec();
    if(!result) throw 'No se completo la orperacion';
    res.status(202).json(result);
  }catch (e){
    res.status(401).json({error:e});
  }
}

async  function getAlbums(req,res){
  try {
    const id = req.params.id_singer;
    const result = await Singer.findById(id).exec();
    if(!result) throw 'No se completo la orperacion';
    const idAlbums = result.albums;
    const recordsAlbums = await Album.find({'_id':{$in:idAlbums},state:true});
    res.status(202).send(recordsAlbums);
  }
  catch (e){
    res.status(401).json({error:e});
  }
}

async function deleteAlbumSinger(req,res){
  try {
    const id = req.params.id_singer;
    const id_album = req.body.id_album;
    const result = await Singer.findByIdAndUpdate(id,{ $pull:{albums:id_album}},{new:true}).exec();
    if(!result) throw 'No se completo la operacion';
    res.status(202).send({result});
  }catch (e){
    res.status(401).json({error:e});
  }
}

module.exports = { getAll, newSinger, updateSinger,deleteSinger,addAlbumSinger,getAlbums,deleteAlbumSinger };
