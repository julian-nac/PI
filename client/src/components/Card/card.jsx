import React from "react";
import { Link } from "react-router-dom";
import RatingStars from '../RatingStar/ratingStar'
import CardContainer from "../CardContainer/cardContainer"; // Importa el componente CardContainer
import "./card.css"; // Importa el archivo de estilos CSS

export default function Card({ name, image, genres, id, rating }) {
  const genreNames = genres.map((genre) => genre.name).join('-');

  return (
    <CardContainer>
      <div className="card">
        <Link to={'/videogame/' + id}>
          <div className="card-image-container">
            <img className="card-image" src={image} alt="Game Cover" />
          </div>
        </Link>
        <div className="card-title"><h3>{name}</h3></div>
        <div className="card-genre"><h5>Genre: {genreNames}</h5></div>
        <div className="card-rating">
          <h5>Rating: {rating}<RatingStars rating={rating} /></h5>
        </div>
      </div>
    </CardContainer>
  );
}