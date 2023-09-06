const  axios = require('axios');
const { Router } = require('express');
const { Genre } = require('../db');
const { YOUR_API_KEY } = process.env;

const router = Router();

const getAllGenres = async (req, res) => { //Función para manejar las solicitudes GET y da los generos de la API
    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`); //Solicitud a la API
    const nameGenres = genresApi.data.results; //Almaceno los datos de la API
    
    nameGenres.forEach(async (g) => {
        await Genre.findOrCreate({ //Busca el género en la base de datos, si no, lo crea
            where: {
                name: g.name,
            }
        })
    });
    const allGenres = await Genre.findAll(); //Llamo todos los géneros locales almacenados en la Base Datos
    res.status(200).json(allGenres)
}


router.get('/', getAllGenres);

module.exports = router;
