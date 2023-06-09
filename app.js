const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

const PORT = 3000 || process.env.PORT;

const singers = require("./routes/singers");
const albums = require('./routes/albums');
const songs = require('./routes/songs');

app.use("/api/singers", singers);
app.use("/api/albums",albums);
app.use("/api/songs",songs);

app.listen(PORT, (err) => {
  if (err) console.log(`Error: ${err}`);
  else console.log(`Application listening in the port ${PORT}`);
});

mongoose.connect('mongodb://127.0.0.1/demo')
        .then(()=> console.log('Conectado a MongoDB'))
        .catch(err => console.log('No se pudo conectar con MongoDB', err));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API RESTfull Ok en puerto ${port} y ejecutandose...`);
});