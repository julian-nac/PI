import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { getVideogames, getGenres, filterVideogamesByGenre, orderByName, orderByRating} from '../../actions/index'
import Card from '../Card/card'
import NavBar from '../NavBar/navBar'
import Paginado from '../Paginado/paginado'
import './home.css'
import { Link } from "react-router-dom";

export default function Home() {
    const dispatch = useDispatch();
    const videogames = useSelector(state => state.videogames);
    const genres = useSelector(state => state.genres);
    const isLoading = useSelector((state) => state.isLoading);
    const allVideogames = useSelector((state) => state.videogames)
    const [order, setOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setVideogamesPerPage] = useState(15)
    const [selectedGenre, setSelectedGenre] = useState('All');

    const indexOfLastVideogame = currentPage * videogamesPerPage // 1 * 15 = 15
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage // 0
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)//videogames de la pagina actual


    const paginado = (pageNumber) => {   //me va a ayudar al renderizado
    setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getGenres());
    }, [dispatch]);

    const handleFilterGenre = (event) => {
      const selectedGenre = event.target.value;
      setSelectedGenre(selectedGenre); // Actualiza el estado local con el género seleccionado
      dispatch(filterVideogamesByGenre(selectedGenre));
  };
    const handleSortByName = (order) => {
      dispatch(orderByName(order)); // Aquí no necesitas acceder a order.target.value
      setOrder(order); // Puedes usar esta línea si necesitas actualizar el estado de 'order'
  };
    const handleSortByRating = (order) => {
      dispatch(orderByRating(order));
      setOrder(order);
      
  };
  const handleResetFilters = () => {
    dispatch(getVideogames());
    dispatch(filterVideogamesByGenre('All'));
    setOrder('');
    setSelectedGenre('All'); // Reinicia el estado local para el género seleccionado
};

useEffect(() => {
  window.scrollTo(0, 0); // Hacer scroll al inicio de la página cuando cambia la página
}, [currentPage]);


    return (
        <div>
            <div className="top-bar">
                <div className="logo-container">
                    <Link to='/home'>
                        <img src="/logo.png" alt="Primary Logo" className="primary-logo" />
                    </Link>
                    <img src="/zonagamer.png" alt="Secondary Logo" className="secondary-logo" />
                  <div className="gallery-link">
                      <Link to='/home'>
                        <p>Galería </p>
                      </Link>
                      <Link to='/createvideogame'>
                        <p>| Añadir Juego </p>
                      </Link>
                      <Link to='/contacto'>
                        <p> | Contáctame </p>
                      </Link>
                  </div>
                </div>
            </div>
            <div className="home-container">
        <NavBar
          genres={genres}
          selectedGenre={selectedGenre}
          handleFilterGenre={handleFilterGenre}
          handleSortByName={handleSortByName}
          handleSortByRating={handleSortByRating}
          handleResetFilters={handleResetFilters}
        />
        <div className="videogame-list">
          {isLoading ? (
                  <div className="loading-container">
                      <img src="/gif.webp" alt="Loading" className="loading-gif" />
                  </div>
          ) : videogames.length === 0 ? (
            <img src="/fondo.png" alt="Fondo Carga" className="fondo-logo"/>
          ) : (
              currentVideogames.map((videogame) => (
              <Card
                key={videogame.id}
                name={videogame.name}
                image={videogame.image}
                genres={videogame.genres}
                id={videogame.id}
                rating={videogame.rating}
              />
            ))
          )}
        </div>
        {!isLoading && (
                <Paginado
                    videogamesPerPage={videogamesPerPage}
                    totalVideogames={videogames.length}
                    paginado={paginado}
                />
        )}
      </div>
    </div>
  );
}