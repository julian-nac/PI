import React from "react";
import { Link } from 'react-router-dom'
import "./contacto.css";

export default function ContactInfo() {
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
            <div className="home-container"></div>


    <div className="contact-info-container">

      <h2>Mi Proyecto Individual en Henry</h2>
      <p>
        ¡Bienvenidos a mi proyecto individual realizado como parte del curso de
        desarrollo web en Henry! Este proyecto es una plataforma para explorar y
        descubrir videojuegos, donde puedes buscar, filtrar, ordenar y obtener información
        detallada sobre tus juegos favoritos.
      </p>

      <h3>¡Conéctate Conmigo!</h3>
      <p>
        Si tienes alguna pregunta o sugerencia, no dudes en contactarme a través de mis redes sociales. Estoy aquí para ayudarte.
      </p>

      <div className="social-links">
          <i className="fab fa-twitter"></i> Correo: julian.narvaezc@gmail.com
          <i className="fab fa-twitter"></i> Número: +57 350 8105620
        {/* Agrega otros enlaces a tus redes sociales si lo deseas */}
      </div>
    </div>    
    </div>
  );
}
