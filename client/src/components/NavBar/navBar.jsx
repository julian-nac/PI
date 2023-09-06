import React from "react";
import { useSelector } from "react-redux";
import SearchBar from '../SearchBar/searchBar';
import './navBar.css';

export default function NavBar({ handleFilterGenre, handleSortByRating, handleSortByName, handleResetFilters, selectedGenre }) {
    const genres = useSelector(state => state.genres);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-heading">Género: </div>
                <select className="navbar-select" value={selectedGenre} onChange={handleFilterGenre}>
                    <option value="All">Todos los Géneros</option>
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.name}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="navbar-container">
                <div className="navbar-heading">Según su calificación: </div>
                <button className="navbar-button" onClick={() => handleSortByRating('Low')}>Peor Calificación</button>
                <button className="navbar-button" onClick={() => handleSortByRating('High')}>Mejor Calificación</button>
            </div>
            <div className="navbar-container">
                <div className="navbar-heading">Según su Nombre:</div>
                <button className="navbar-button" onClick={() => handleSortByName('Asc')}>A-Z</button>
                <button className="navbar-button" onClick={() => handleSortByName('Desc')}>Z-A</button>
            </div>
            <button className="navbar-filtro" onClick={handleResetFilters}><img src="/filtro.png" alt="filtro" className="filter"/></button>
            <div className="navbar-container">
                <SearchBar />
            </div>
        </nav>
    );
}
