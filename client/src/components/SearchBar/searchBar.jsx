import React, { useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameName } from "../../actions";
import './searchBar.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const allVideogames = useSelector(state => state.allVideogames);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const wrapperRef = useRef(null);

    const handleClickOutside = event => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setShowRecommendations(false);
        }
    };

    function handleInputChange(e) {
        e.stopPropagation();
        setName(e.target.value);
        setShowRecommendations(true);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!name.length) {
            alert('Ingrese el nombre del videojuego');
        } else {
            setIsLoading(true);
            dispatch(getVideogameName(name))
                .then(() => {
                    setIsLoading(false);
                    setName(''); // Reiniciar la barra de búsqueda
                })
                .catch(() => {
                    setIsLoading(false);
                });
        }
    }

    function handleRecommendationClick(recommendation) {
        setName(recommendation);
        setShowRecommendations(false);
        setIsLoading(true); // Mostrar el gif de carga
        dispatch(getVideogameName(recommendation))
            .then(() => {
                setIsLoading(false); // Ocultar el gif de carga
                setName('');
            })
            .catch(() => {
                setIsLoading(false); // Ocultar el gif de carga en caso de error
            });
    }

    const getRecommendations = () => {
        if (name.length === 0) {
            return [];
        }

        const filteredGames = allVideogames.filter(game =>
            game.name.toLowerCase().startsWith(name.toLowerCase())
        );

        return filteredGames.map(game => game.name);
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <div ref={wrapperRef} className="search-wrapper">
                <input
                    type="text"
                    value={name}
                    onChange={handleInputChange}
                    placeholder="Buscar un videojuego..."
                    className="search-input"
                />
                <button type="submit" className="search-button">Buscar</button>
                {isLoading && (
    <div className="loading-overlay">
        <img src="/gif.webp" alt="Loading" className="loading-gif" />
    </div>
)}
                {showRecommendations && (
                    <ul className="recommendations">
                        {getRecommendations().map((recommendation, index) => (
                            <li
                                key={index}
                                className="recommendation-item"
                                onClick={() => handleRecommendationClick(recommendation)}
                            >
                                {recommendation}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </form>
        
    );
}
