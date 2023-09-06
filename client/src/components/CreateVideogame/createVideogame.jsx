import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postVideogame, getGenres, getPlatforms} from '../../actions/index';
import { Link } from 'react-router-dom';
import './createVideogame.css'

export default function CreateVideogame () {
    const availableGenres = [ 'Action', 'Adventure' ,'Arcade' ,'Board Gamer' ,'Card' ,'Casual' ,'Educational' ,'Family' ,'Fighting' ,'Indie' ,'Massively Multiplayer' ,'Platformer' ,'Puzzle' ,'Racing' ,'RPG' ,'Shooter' ,'Simulation' ,'Sports' ,'Strategy'];
    const availablePlatforms = ['Android','Dreamcat','iOS','Linux','macOS','Nintendo Switch','Nintendo 3DS','PS Vita','PC','PlayStation 2','PlayStation 3','PlayStation 4','PlayStation 5','Xbox','Xbox360','Xbox One','Xbox Series S/X','Web','WiiU']
    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        description: '',
        platforms: [],
        released: '',
        rating: '',
        genres: [],
    });
    
    const [platformInput, setPlatformInput] = useState('');
    const [genreInput, setGenreInput] = useState('');
    const [errors, setErrors] = useState({});
    

    useEffect(() => {
        dispatch(getPlatforms());
    }, [dispatch]);


    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        // Borra el mensaje de error correspondiente cuando el usuario comienza a escribir en un campo.
        if (name === 'name') {
            setErrors({ ...errors, name: '' });
        } else if (name === 'image') {
            setErrors({ ...errors, image: '' });
        } else if (name === 'description') {
            setErrors({ ...errors, description: '' });
        } else if (name === 'released') {
            setErrors({ ...errors, released: '' });
        } else if (name === 'rating') {
            setErrors({ ...errors, rating: '' });
        }
    
        if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: checked ? [...prevData[name], value] : prevData[name].filter(item => item !== value)
            }));
            if (name === 'platforms' || name === 'genres') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: '',
                }));
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    const handlePlatformInputChange = (e) => {
        setPlatformInput(e.target.value);
    };

    const handleGenreInputChange = (e) => {
        setGenreInput(e.target.value);
    };

    const handleAddPlatform = () => {
        if (platformInput) {
            setFormData((prevData) => ({
                ...prevData,
                platforms: [...prevData.platforms, platformInput],
            }));
            setPlatformInput('');
    
            // Eliminar el mensaje de error de las plataformas al añadir una plataforma
            setErrors((prevErrors) => ({
                ...prevErrors,
                platforms: '',
            }));
        }
    };
    
    const handleAddGenre = () => {
        if (genreInput) {
            setFormData((prevData) => ({
                ...prevData,
                genres: [...prevData.genres, genreInput],
            }));
            setGenreInput('');
    
            // Eliminar el mensaje de error de los géneros al añadir un género
            setErrors((prevErrors) => ({
                ...prevErrors,
                genres: '',
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            try {
                await dispatch(postVideogame(formData));
                console.log('Videogame created');
                setFormData({
                    name: '',
                    image: '',
                    description: '',
                    platforms: [],
                    released: '',
                    rating: '',
                    genres: [],
                });
                window.alert('El juego se ha creado exitosamente.');
            } catch (error) {
                console.error('Error creating videogame:', error);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = () => {

        const errors = {};
    
        if (!formData.name) {
            errors.name = 'Añade un nombre por favor';
        }
        
        if (!formData.image) {
            errors.image = 'Añade el URL de la imagen';
        }
    
        if (!formData.description) {
            errors.description = 'Añade una descripción por favor';
        }
    
        if (formData.platforms.length === 0) {
            errors.platforms = 'Añade por lo menos una plataforma';
        } else {
            delete errors.platforms;
        }
    
        if (!formData.released) {
            errors.released = 'Añade la fecha de creación por favor';
        }
    
        if (!formData.rating) {
            errors.rating = 'Añade una calificación por favor';
        }
    
        if (formData.genres.length === 0) {
            errors.genres = 'Añade por lo menos un género';
        } else {
            // Si se ha seleccionado al menos un género, eliminamos el mensaje de error
            delete errors.genres;
        }
    
        return errors;
    };
    return (
        <div >
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
            <div className="home-container"></div>


        <div className='create-videogame-container'>
            <h2>Añadamos Un Videojuego!</h2>
            <form className='create-form'onSubmit={handleSubmit}>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                    />
                    {errors.name && (
                        <div className="error-message">
                            <span>{errors.name}</span>
                        </div>
                    )}

                <label>Plataformas:</label>
                <div className="input-with-button">
                    <div className="selected-platforms">
                        {formData.platforms.map((platform, index) => (
                            <div key={index} className="selected-platform">
                             <span>- {platform}</span>
                          </div>
                          ))}
                  </div>
                    <select 
                        value={platformInput}
                        onChange={handlePlatformInputChange}
                        className={`genre-input ${errors.platforms ? 'error' : ''}`}
                    >
                        <option value=''>Selecciona una plataforma...</option>
                        {availablePlatforms.map((platform, index) => (
                            <option key={index} value={platform}>
                                {platform}
                            </option>
                        ))}
                    </select>
                        {errors.platforms && (
                            <div className="error-message">
                                <span>{errors.platforms}</span>
                            </div>
                        )}
                    <button type="button" onClick={handleAddPlatform}>Añadir Plataforma</button>
                </div>

                <label>Fecha De Creación:</label>
                <input
                    type="date"
                    name="released"
                    value={formData.released}
                    onChange={handleChange}
                    className={errors.released ? 'error' : ''}
                    />
                    {errors.released && (
                        <div className="error-message">
                            <span>{errors.released}</span>
                        </div>
                    )}
                <label>URL De La Imagen:</label>
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className={errors.image ? 'error' : ''}
                    />
                    {errors.image && (
                        <div className="error-message">
                            <span>{errors.image}</span>
                        </div>
                    )}

                <label>Calificación:</label>
                <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    min="0"
                    max="5"
                    onChange={handleChange}
                    className={errors.rating ? 'error' : ''}
                    />
                    {errors.rating && (
                        <div className="error-message">
                            <span>{errors.rating}</span>
                        </div>
                    )}
                <label>Descripción:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={errors.description ? 'error' : ''}
                    />
                    {errors.description && (
                        <div className="error-message">
                            <span>{errors.description}</span>
                        </div>
                    )}

                    <label>Género:</label>
                    <div className="input-with-button">
                        <div className='selected-platforms'>
                            {formData.genres.map((genre, index) => (
                            <div key={index} className="selected-platform">
                                 <span>- {genre}</span>
                            </div>
                            ))}
                        </div>
                        <select
                            value={genreInput}
                            onChange={handleGenreInputChange}
                            className={`genre-input ${errors.genres ? 'error' : ''}`}
                        >
                            <option value="">Selecciona un género...</option>
                            {availableGenres.map((genre, index) => (
                                <option key={index} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                        {errors.genres && (
                            <div className="error-message">
                                <span>{errors.genres}</span>
                            </div>
                        )}

                        <button type="button" onClick={handleAddGenre}>Añadir Género</button>
                    </div>


                <button type="submit">Crear</button>
            </form>
        </div>    
                  </div>
    );
};

