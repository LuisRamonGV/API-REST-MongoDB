const mongoose = require("mongoose");

const albumsSchema= new mongoose.Schema({
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
    songs:{
        type:[String]
    },
    state: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("Albums", albumsSchema);
