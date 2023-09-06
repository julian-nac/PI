import React from "react";
import "./cardContainer.css"; 

export default function CardContainer({ children }) {
  return <div className="card-container">{children}</div>;
}
