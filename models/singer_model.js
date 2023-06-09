const mongoose = require("mongoose");
const {array} = require("joi");

const singersSchema = new mongoose.Schema({
  artistic_name: {
    type: String,
    required: true,
  },
  real_name: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    required: true,
  },
  albums: {
    type: [String]
  }
});

module.exports = mongoose.model("Singers", singersSchema);
