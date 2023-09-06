const { Router } = require('express');
const genreRoute = require('./genre');
const videogameRoute = require('./videogame');
const platformRoute = require('./platforms')

const router = Router(); //Enrutador principal

router.use('/genre', genreRoute); //Ruta para genreRoute
router.use('/videogame', videogameRoute); //Ruta para videogameRoute
router.use('/platforms', platformRoute); //Ruta para platformRoute

module.exports = router;
