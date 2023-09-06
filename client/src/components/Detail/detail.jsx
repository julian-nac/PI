import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetails } from "../../actions/index";
import { useEffect } from "react";
import "./detail.css"

export default function Details(){
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getDetails(id));   
    },[id, dispatch]);

    const detail = useSelector((state) => state.detail);

    function handleReset() {
        dispatch(getDetails());
    }
    const cleanDescription = (description) => {
        return description ? description.replace(/<[^>]*>/g, "") : "";
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
    <div className="detail-container">
        <img
          className="detail-image"
          src={detail.background_image ? detail.background_image : detail.image}
          alt="not found"
        />
        <div className="detail-info">
        <p className="detail-rating">⭐{detail.rating}</p>
          <h1 className="detail-title">{detail.name}</h1>
          <p className="detail-released">| {detail.released}</p>
          <p className="detail-platforms">
          | {" "}
            {detail.id?.length > 7
              ? detail.platforms?.map((p) => p.name).join(" - ")
              : detail.platforms?.map((p) => p.platform.name).join(" - ")}
          </p>
          <p className="detail-genres">
          | {detail.genres?.map((g) => g.name).join(" - ")}
          </p>
          
          <p className="detail-description">
            {cleanDescription(detail.description || detail.description_raw)}
          </p>
        </div>
      </div>
    </div>
  );
}