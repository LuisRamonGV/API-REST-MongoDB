// - - - - - Required modules - - - - -
const mongoose = require("mongoose");

// - - - - - Schema - - - - -
const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  _id_singer: {
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
const Album = mongoose.model("Album", albumSchema);
const song_model = require("./song_model");

const album_model = () => {};

// - - - - - Model queries - - - - -
// Create
album_model.addAlbum = async (body) => {
  let album = new Album({
    title: body.title,
    label: body.label,
    genre: body.genre,
    year: body.year,
    _id_singer: body._id_singer,
    status: body.status,
  });

  return await album.save();
};

// Read
album_model.getActives = async () => {
  let albums = await Album.find({ status: true });

  return albums;
};

album_model.getAlbumById = async (id) => {
  let album = await Album.findById(id);

  return album;
};

album_model.getAlbumSongs = async (id) => {
  let songs = await song_model.getActives();
  let albumSongs = [];

  songs.forEach((song) => {
    if (song._id_album === id) albumSongs.push(song);
  });

  return albumSongs;
};

// Update
album_model.updateAlbum = async (id, body) => {
  let album = await Album.findByIdAndUpdate(
    id,
    {
      $set: {
        title: body.title,
        label: body.label,
        genre: body.genre,
        year: body.year,
        _id_singer: body._id_singer,
        status: body.status,
      },
    },
    { new: true }
  );

  return album;
};

// Delete
album_model.deactivateAlbum = async (id) => {
  let album = await Album.findByIdAndUpdate(
    id,
    {
      $set: {
        status: false,
      },
    },
    { new: true }
  );

  return album;
};

// - - - - - Model export  - - - - -
module.exports = album_model;
