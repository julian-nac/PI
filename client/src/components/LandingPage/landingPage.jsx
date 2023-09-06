import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";

export default function LandingPage() {
  return (
    <div className="landing_page">
      <div className="landing_content">
        <h4 className="landing_title">Bienvenido Gamer!</h4>
        <Link to="/home" className="no_underline">
          <button className="custom_button">Ingresar</button>
        </Link>
      </div>
    </div>
  );
}
