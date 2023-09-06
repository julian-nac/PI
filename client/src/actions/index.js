import axios from "axios";
export const POST_VIDEOGAME = 'POST_VIDEOGAME';

export function getVideogames() {
    return async function (dispatch) {
      dispatch({ type: 'START_LOADING' }); // Empieza la carga
  
      try {
        var json = await axios.get('http://localhost:3001/api/videogame');
        dispatch({
          type: 'GET_VIDEOGAMES',
          payload: json.data
        });
      } catch (error) {
        console.error('Error getting videogames:', error);
      }
  
      dispatch({ type: 'STOP_LOADING' }); // Termina la carga
    };
  }
export function getVideogameName(name) {
    return async function(dispatch) {
    try {
        var json = await axios.get(`http://localhost:3001/api/videogame?name=` + name);
        return dispatch ({
            type: 'GET_VIDEOGAME_NAME',
            payload: json.data
        })
    } catch (error) {
        alert('Este juego no se encuentra en nuestros datos.');
    }

    }
}

export function getGenres(){
  return async function(dispatch){
      var json = await axios.get('http://localhost:3001/api/genre'); //ver si le pongo ,{}

      return dispatch({
          type:'GET_GENRES',
          payload: json.data
      })
  }
};

export function getPlatforms() {
    return async function(dispatch) {
        const info = await axios.get('http://localhost:3001/api/platforms');
        dispatch({
            type: 'GET_PLATFORMS',
            payload: info.data
        })
    }
};
  


export function postVideogame(payload) {
    return async function (dispatch) {
        try {
            const response = await axios.post('http://localhost:3001/api/videogame', payload);
            
            // Dispatch the POST_VIDEOGAME action with the response data
            dispatch({ type: POST_VIDEOGAME, payload: response.data });
            
            return response;
        } catch (error) {
            throw error;
        }
    }
}



export function filterVideogamesByGenre(payload) { //el payload es el value del input
    return  {
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export function filterCreated(payload) { //db
    return {
        type: 'FILTER_CREATED',
        payload
    }
}


export function orderByName(payload) { 
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByRating(payload) {
    return {
        type: 'ORDER_BY_RATING',
        payload
    }
}

export function getDetails(id) {
    if (id) {
        return async function (dispatch) {
            try {
                const detail = await axios.get(`http://localhost:3001/api/videogame/${id}`);
                dispatch({
                    type: 'GET_DETAILS',
                    payload: detail.data
                });
            } catch (error) {
                dispatch({
                    type: 'ERROR_GETTING_DETAILS',
                    payload: 'Ocurrio un error al momento de ver los detalles.'
                });
            }
        };
    }
}
