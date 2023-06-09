// - - - - - Required modules - - - - -
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

// - - - - - Route objects - - - - -
const singers = require("./routes/singers");
const albums = require("./routes/albums");
const songs = require("./routes/songs");

// - - - - - Express app object - - - - -
const app = express();

// - - - - - Middlewares - - - - -
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// - - - - - Routes and requests - - - - -
app.use("/singers", singers);
app.use("/albums", albums);
app.use("/songs", songs);

// - - - - - Database connection - - - - -
mongoose.connect('mongodb://127.0.0.1/library_music')
        .then(()=> console.log('Conectado a MongoDB'))
        .catch(err => console.log('No se pudo conectar con MongoDB', err));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API RESTfull Ok en puerto ${port} y ejecutandose...`);
});