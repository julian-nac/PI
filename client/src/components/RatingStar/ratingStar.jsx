import React from "react";
import './ratingStar.css'

export default function RatingStars({ rating }) {
  const MAX_STARS = 5; // Máximo de estrellas
  const fullStars = Math.floor(rating); // Parte entera del rating
  const remainingStars = MAX_STARS - fullStars; // Estrellas restantes

  return (
    <div className="rating-stars">
      {[...Array(fullStars)].map((_, index) => (
        <span key={index} className="star full-star">★</span>
      ))}
      {[...Array(remainingStars)].map((_, index) => (
        <span key={index} className="star empty-star">☆</span>
      ))}
    </div>
  );
}
