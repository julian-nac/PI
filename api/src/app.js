const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js');

const server = express();

server.name = 'API';

server.use(express.urlencoded({ extended: true, limit: '50mb' })); //fijarse de cambiar bodyparser a express
server.use(express.json({ limit: '50mb' }));                       // idem
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {                                       // todas esas en verde de abajo son CORS
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // localhost3000 lo cambio a * y me pueden hacer peticiones de todos lados
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/api', routes);

// Para capturar errores, no tocar
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send({message}); //le agregué las llaves para que me lo mostrara como "message": "blabla"
});

module.exports = server;
