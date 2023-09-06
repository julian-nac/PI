import React from "react";
import './paginado.css'

export default function Paginado({ videogamesPerPage, totalVideogames, paginado }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalVideogames / videogamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => paginado(number)}
                    className="pagination-button"
                >
                    {number}
                </button>
            ))}
        </div>
    );
}
