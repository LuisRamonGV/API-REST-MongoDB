// - - - - - Required modules - - - - -
const Joi = require("joi");

// - - - - - Model import - - - - -
const singer_model = require("../models/singer_model");

// - - - - - Controller - - - - -
const singer_controller = () => {};

// - - - - - Controller actions - - - - -
singer_controller.addSong = (req, res) => {
  const { value, error } = validateSinger(req.body);

  if (!error) {
    let result = singer_model.addSinger(value);

    result
      .then((singer) => {
        res.status(202).json({ singer: singer });
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  } else res.status(400).send(error.details[0].message);
};

singer_controller.getActives = (req, res) => {
  let result = singer_model.getActives();

  result
    .then((singers) => {
      res.status(200).json(singers);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

singer_controller.getSingerById = (req, res) => {
  let result = singer_model.getSingerById(req.params.id);

  result
    .then((singer) => {
      res.status(200).json({ singer: singer });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

singer_controller.getSingerAlbums = (req, res) => {
  let result = singer_model.getSingerAlbums(req.params.id);

  result
    .then((albums) => {
      res.status(200).json({ albumsBySinger: albums });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

singer_controller.getSingerSongs = (req, res) => {
  let result = singer_model.getSingerSongs(req.params.id);

  result
    .then((songs) => {
      res.status(200).json({ songsBySinger: songs });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

singer_controller.updateSinger = (req, res) => {
  const { value, error } = validateSinger(req.body);

  if (!error) {
    let result = singer_model.updateSinger(req.params.id, value);

    result
      .then((singer) => {
        res.status(200).json({ singer: singer });
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  }
};

singer_controller.deactivateSinger = (req, res) => {
  let result = singer_model.deactivateSinger(req.params.id);

  result
    .then((singer) => {
      res.status(200).json({ singer: singer });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

// - - - - - Utility functions - - - - -
function validateSinger(body) {
  const schema = Joi.object({
    artisticName: Joi.string().required(),
    realName: Joi.string().required(),
    nationality: Joi.string().required(),
    status: Joi.string().required().default(true),
  });

  return schema.validate(body);
}

// - - - - - Controller export - - - - -
module.exports = singer_controller;
