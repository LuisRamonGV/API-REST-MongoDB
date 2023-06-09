const mongoose = require("mongoose");


const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    track: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    length: {
        type: Number,
        required: true,
    },
    state: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("Songs", songSchema);
