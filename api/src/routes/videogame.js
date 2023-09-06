const { Router } = require('express');
const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db');
const { YOUR_API_KEY } = process.env;

const router = Router();

const getGames = async () => {
    let apiGames = []; //Guardo los juegos

const url1 = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=1`) //Llamo los juegos de la API
const url2 = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=2`)
const url3 = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=3`)
const url4 = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=4`)
const url5 = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=5`)

    apiGames = url1.data.results.concat( //Combino las respuestas de las 5 paginas de la API en el array 
        url2.data.results,
        url3.data.results,
        url4.data.results,
        url5.data.results,
    );


    apiGames = apiGames.map((game) => { //map para recorrer todos los juegos
        const platforms = game.platforms.map((g) => g.platform); //Obtener las plataformas del juego
        return { //Creo un nuevo objeto para cada videojuego en el array
          id: game.id,
          name: game.name,
          image: game.background_image,
          genres: game.genres,
          platforms: platforms,
          rating: game.rating,
          released: game.released,
        };
      });
      return apiGames; //Devuelvo el array con los datos del juego
    };
    
    const dataBase = async () => {
      return await Videogame.findAll({ //Busca todos los videojuegos indicando que debe incluir las relaciones de G y P
        include: [Genre, Platform],
      });
    };
    
      const getAllGames = async () => { //Combina los datos de la API con la base de datos local
      const apiData = await getGames(); //videojuegos/almaceno
      const dbInfo = await dataBase(); //Llama los juegos de la base de datos
      const total = apiData.concat(dbInfo); //Combina los datos de ambas fuentes 
      return total;
    };


router.get("/", async (req, res) => {
        const { name } = req.query; //query con el nombre
        let totalGames = await getAllGames(); //Obtengo todos los juegos
        if (name) {
          let searchGame = totalGames.filter((game) => //Filtro el nombre que busco el usuario
            game.name.toLowerCase().includes(name.toLowerCase()) //Se compara los juegos de la lista con el nombre ingresado
     );
            searchGame.length ?
            res.status(200).send(searchGame):
            res.status(404).json({ msg: 'Game not Found' });
        } else {
            res.status(200).json(totalGames);
      
        }
    });

router.get('/:id', async (req, res) => { 
    const { id } = req.params //parametro con id
    try{
        if(id.includes('-')) { //Si include guión esta en la base de datos local si no esta en el API
            const gameDb = await Videogame.findOne({
                where: {id},
                include: [Genre, Platform], //Relacion de las tablas
            });
            return res.json(gameDb);
        }
        const gameApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`); // Caso sin guión llamada a la API
        res.json(gameApi.data);
       
     } catch (error) {
         res.status(404).json({error: 'Id not found'});     
     }
});

router.post('/', async (req, res) => { //Crear videojuego
    let {name, image, description, released, rating, genres, platforms, createdInDb} = req.body //Se extraen del cuerpo de la soli

    let newGame = await Videogame.create({ //Crea una nueva entrada en la tabla con los datos
        name,
        image,
        description,
        released,
        rating: rating || 1,
        createdInDb
    })

    let genreDb = await Genre.findAll({ //Consulto las tablas para encontrar las relaciones en funcion de los nombres de la soli
        where: {name : genres}
    })

    let platformDb = await Platform.findAll({
        where: {name: platforms}
    });

    newGame.addGenres(genreDb); // relaciones entre el nuevo videojuego y los géneros y plataformas
    newGame.addPlatforms(platformDb);

    res.status(200).send('Videojuego creado con exito');
});    
    

module.exports = router;
