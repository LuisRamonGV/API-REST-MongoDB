// - - - - - Required modules - - - - -
const mongoose = require("mongoose");

// - - - - - Schema - - - - -
const singerSchema = new mongoose.Schema({
  artisticName: {
    type: String,
    required: true,
  },
  realName: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    require: true,
    defaul: true,
  },
});

// - - - - - Models - - - - -
const Singer = mongoose.model("Singer", singerSchema);
const song_model = require("./song_model");
const album_model = require("./album_model");

const singer_model = () => {};

// - - - - - Model queries - - - - -
// Create
singer_model.addSinger = async (body) => {
  let singer = new Singer({
    artisticName: body.artisticName,
    realName: body.realName,
    nationality: body.nationality,
    status: body.status,
  });

  return await singer.save();
};

// Read
singer_model.getActives = async () => {
  let singers = await Singer.find({ status: true });

  return singers;
};

singer_model.getSingerById = async (id) => {
  let singer = await Singer.findById(id);

  return singer;
};

singer_model.getSingerAlbums = async (id) => {
  let albums = await album_model.getActives();
  let albumsBySinger = [];

  albums.forEach((album) => {
    if (id === album._id_singer) albumsBySinger.push(album);
  });

  return albumsBySinger;
};

singer_model.getSingerSongs = async (id) => {
  let songs = await song_model.getActives();
  let albums = await singer_model.getSingerAlbums(id);
  let singerSongs = [];

  songs.forEach((song) => {
    albums.forEach((album) => {
      if (album._id.equals(song._id_album)) singerSongs.push(song);
    });
  });

  return singerSongs;
};

// Update
singer_model.updateSinger = async (id, body) => {
  let singer = await Singer.findByIdAndUpdate(
    id,
    {
      $set: {
        artisticName: body.artisticName,
        realName: body.realName,
        nationality: body.nationality,
        status: body.status,
      },
    },
    { new: true }
  );

  return singer;
};

// Delete
singer_model.deactivateSinger = async (id) => {
  let singer = await Singer.findByIdAndUpdate(
    id,
    {
      $set: {
        status: false,
      },
    },
    { new: true }
  );

  return singer;
};

// - - - - - Model export  - - - - -
module.exports = singer_model;
