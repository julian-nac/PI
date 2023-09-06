const { Router } = require('express');
const axios = require("axios");
const { Platform } = require('../db')
const { YOUR_API_KEY } = process.env;

const router = Router();

const getPlatforms = async (req, res) => { //Funcion de tipo GET para los platforms de la API
    try {
        const platformsApi = await axios.get(`https://api.rawg.io/api/platforms?key=${YOUR_API_KEY}`); //Solicitud API
        const platforms = platformsApi.data.results; //Almaceno la respuesta 
        platforms.forEach(async (p) => {
            await Platform.findOrCreate({ //Busca si existe y si no lo crea
                where: {
                    name: p.name,
                }
            })
        });

        const platformsDb = await Platform.findAll(); //Guardo las plataformas almacenados en la base

        res.status(200).json(platformsDb); //Lo doy como respuesta
        
    } catch (error) {
        console.log(error);
    }
};

router.get('/', getPlatforms);
  
module.exports = router;
