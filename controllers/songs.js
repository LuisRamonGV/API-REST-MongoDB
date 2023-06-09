// - - - - - Required modules - - - - -
const Joi = require("joi");

// - - - - - Model import - - - - -
const song_model = require("../models/song_model");
const album_model = require("../models/album_model");

// - - - - - Controller - - - - -
const song_controller = () => {};

// - - - - - Controller actions - - - - -
song_controller.addSong = (req, res) => {
  const { value, error } = validateSong(req.body);

  if (!error) {
    album_model
      .getAlbumById(value._id_album)
      .then((album) => {
        let result = song_model.addSong(value);

        result
          .then((song) => {
            res.status(202).json({ song: song, album: album });
          })
          .catch((err) => {
            res.status(400).json({ error: err });
          });
      })
      .catch((err) => {
        res.status(400).json({ error: "Trying to input a non-existing album" });
      });
  } else res.status(400).send(error.details[0].message);
};

song_controller.getActives = (req, res) => {
  let result = song_model.getActives();

  result
    .then((songs) => {
      res.status(200).json(songs);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

song_controller.getSongById = (req, res) => {
  let result = song_model.getSongById(req.params.id);

  result
    .then((song) => {
      res.status(200).json({ song: song });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

song_controller.updateSong = (req, res) => {
  const { value, error } = validateSong(req.body);

  if (!error) {
    album_model
      .getAlbumById(value._id_album)
      .then((album) => {
        let result = song_model.updateSong(req.params.id, value);

        result
          .then((song) => {
            res.status(200).json({ song: song, album: album });
          })
          .catch((err) => {
            res.status(400).json({ error: err });
          });
      })
      .catch((err) => {
        res.status(400).json({ error: "Trying to input a non-existing album" });
      });
  } else res.status(400).send(error.details[0].message);
};

song_controller.deactivateSong = (req, res) => {
  let result = song_model.deactivateSong(req.params.id);

  result
    .then((song) => {
      res.status(200).json({ song: song });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

// - - - - - Utility functions - - - - -
function validateSong(body) {
  const schema = Joi.object({
    title: Joi.string().required(),
    trackNumber: Joi.number().integer().required(),
    lenght: Joi.number().integer().required(),
    _id_album: Joi.string().required(),
    status: Joi.boolean().required().default(true),
  });

  return schema.validate(body);
}

// - - - - - Controller export - - - - -
module.exports = song_controller;
