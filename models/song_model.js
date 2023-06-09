required: true
// - - - - - Required modules - - - - -
const mongoose = require("mongoose");

// - - - - - Schema - - - - -
const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  trackNumber: {
    type: Number,
    required: true,
  },
  lenght: {
    type: Number,
    required: true,
  },
  _id_album: {
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
const Song = mongoose.model("Song", songSchema);
const song_model = () => {};

// - - - - - Model queries - - - - -
// Create
song_model.addSong = async (body) => {
  let song = new Song({
    title: body.title,
    trackNumber: body.trackNumber,
    lenght: body.lenght,
    _id_album: body._id_album,
    status: body.status,
  });

  return await song.save();
};

// Read
song_model.getActives = async () => {
  let songs = await Song.find({ status: true });

  return songs;
};

song_model.getSongById = async (id) => {
  let song = await Song.findById(id);

  return song;
};

// Update
song_model.updateSong = async (id, body) => {
  let song = await Song.findByIdAndUpdate(
    id,
    {
      $set: {
        title: body.title,
        trackNumber: body.trackNumber,
        lenght: body.lenght,
        _id_album: body._id_album,
        status: body.status,
      },
    },
    { new: true }
  );

  return song;
};

// Delete
song_model.deactivateSong = async (id) => {
  let song = await Song.findByIdAndUpdate(
    id,
    {
      $set: {
        status: false,
      },
    },
    { new: true }
  );

  return song;
};

// - - - - - Model export  - - - - -
module.exports = song_model;
