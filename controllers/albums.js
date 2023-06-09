// - - - - - Required modules - - - - -
const Joi = require("joi");

// - - - - - Model import - - - - -
const album_model = require("../models/album_model");
const singer_model = require("../models/singer_model");

// - - - - - Controller - - - - -
const album_controller = () => {};

// - - - - - Controller actions - - - - -
album_controller.addAlbum = (req, res) => {
  const { value, error } = validateAlbum(req.body);

  if (!error) {
    singer_model
      .getSingerById(value._id_singer)
      .then((singer) => {
        let result = album_model.addAlbum(value);

        result
          .then((album) => {
            res.status(202).json({ album: album, singer: singer });
          })
          .catch((err) => {
            res.status(400).json({ error: err });
          });
      })
      .catch((err) => {
        res
          .status(400)
          .json({ error: "Trying to input a non-existing artist/singer" });
      });
  } else res.status(400).send(error.details[0].message);
};

album_controller.getActives = (req, res) => {
  let result = album_model.getActives();

  result
    .then((albums) => {
      res.status(200).json(albums);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

album_controller.getAlbumById = (req, res) => {
  let result = album_model.getAlbumById(req.params.id);

  result
    .then((album) => {
      res.status(200).json({ album: album });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

album_controller.getAlbumSongs = (req, res) => {
  let result = album_model.getAlbumSongs(req.params.id);

  result
    .then((songs) => {
      res.status(200).json({ albumSongs: songs });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

album_controller.updateAlbum = (req, res) => {
  const { value, error } = validateAlbum(req.body);

  if (!error) {
    singer_model
      .getSingerById(value._id_singer)
      .then((singer) => {
        let result = album_model.updateAlbum(req.params.id, value);

        result
          .then((album) => {
            res.status(200).json({ album: album, singer: singer });
          })
          .catch((err) => {
            res.status(400).json({ error: err });
          });
      })
      .catch((err) => {
        res
          .status(400)
          .json({ error: "Trying to input a non-existing artist/singer" });
      });
  }
};

album_controller.deactivateAlbum = (req, res) => {
  let result = album_model.deactivateAlbum(req.params.id);

  result
    .then((album) => {
      res.status(200).json({ album: album });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

// - - - - - Utility functions - - - - -
function validateAlbum(body) {
  const schema = Joi.object({
    title: Joi.string().required(),
    label: Joi.string().required(),
    genre: Joi.string().required(),
    year: Joi.number()
      .integer()
      .min(1000)
      .max(new Date().getFullYear())
      .required(),
    _id_singer: Joi.string().required(),
    status: Joi.string().required().default(true),
  });

  return schema.validate(body);
}

// - - - - - Controller export - - - - -
module.exports = album_controller;
