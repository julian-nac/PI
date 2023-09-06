const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    platforms: [],
    createVideogame: null,
    detail: {},
}

function rootReducer( state = initialState, action){ //En esta acción se envia todos los datos al array
    switch(action.type) {
        case 'GET_VIDEOGAMES':
            return{
                ...state, //Copia del estado
                videogames: action.payload,
                allVideogames: action.payload, //Actualiza videogames y allVideogames
            }
        case 'GET_VIDEOGAME_NAME':
            return{
                ...state,
                videogames: action.payload //Actualiza videogames
            }
        case 'GET_GENRES':
            return{
                ...state,
                 genres: action.payload         
            }  
            case 'GET_PLATFORMS':
                return {
                    ...state,
                    platforms: action.payload
                }   
    
            case 'POST_VIDEOGAME':
                    const newGame = action.payload;
                    return {
                        ...state,
                        videogames: [...state.videogames, newGame]
                    };
            case 'FILTER_BY_GENRE':
                const allGames = state.allVideogames;
                const genresFiltered = action.payload === 'All' ?
                    allGames
                    : allGames.filter(el => {
                        return el.genres.find(genre => genre.name === action.payload);
                    });
                return {
                    ...state,
                    videogames: genresFiltered,
                };
        case 'ORDER_BY_NAME':
            let sortedVideogames = [...state.videogames]; // Copia del array original
            sortedVideogames.sort(function(a, b) {
                if (action.payload === 'Asc') {
                    return a.name.localeCompare(b.name); // Orden ascendente
                } else {
                    return b.name.localeCompare(a.name); // Orden descendente
                }
            });
            return {
                ...state,
                videogames: sortedVideogames,
            };
        case 'ORDER_BY_RATING':
            let sortedVideogamesRating = [...state.videogames]; // Copia del array original
            sortedVideogamesRating.sort(function(a, b) {
                if (action.payload === 'Low') {
                    return a.rating - b.rating; // Orden ascendente
                } else {
                    return b.rating - a.rating; // Orden descendente
                }
            });
            return {
                ...state,
                videogames: sortedVideogamesRating,
            };
        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            }
        case 'START_LOADING':
      return {
        ...state,
        isLoading: true // Inicia la carga
      };
    case 'STOP_LOADING':
      return {
        ...state,
        isLoading: false // Termina la carga
      };
        default:
            return state //Retornar el estado default
    }
}

export default rootReducer