// - - - - - Required modules - - - - -
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

// - - - - - Route objects - - - - -
const singer_route = require("./routes/singer_route");
const album_route = require("./routes/album_route");
const song_route = require("./routes/song_route");

// - - - - - Express app object - - - - -
const app = express();

// - - - - - Middlewares - - - - -
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// - - - - - Routes and requests - - - - -
app.use("/singer", singer_route);
app.use("/album", album_route);
app.use("/song", song_route);

// - - - - - Port listening - - - - -
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API RUNNING - Listening on port ${PORT}`));

// - - - - - Database connection - - - - -
mongoose.connect('mongodb://127.0.0.1/demo')
        .then(()=> console.log('Conectado a MongoDB'))
        .catch(err => console.log('No se pudo conectar con MongoDB', err));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API RESTfull Ok en puerto ${port} y ejecutandose...`);
});