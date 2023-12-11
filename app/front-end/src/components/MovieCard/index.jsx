import React from 'react';

import './style.css';

// componenta MovieCard primeste un prop denumit movie - obiectul ce descrie un film
// o functie onDelete ce va fi apelata atunci cand se doreste stergerea unui element
const MovieCard = ({ movie, onDelete }) => {
    return (
        <div className="movie-container">
            <img alt="movie-img" className="poster-container" src={movie.poster} />
            <div className="movie-info-container">
                <div className="movie-header">
                    <h4 className="movieTitle">
                        {/* sintaxa JSX */}
                        {`${movie.title} (${movie.year})`}
                    </h4>
                    {/* apeleaza la click functia de delete primita prin props si trimite filmul drept parametru */}
                    <button className="remove-btn" onClick={() => onDelete(movie)}>X</button>
                </div>
                <div className="movie-specs">
                    {`${movie.genre} • ${movie.duration} minutes • ${movie.director}`}
                </div>
                <div className="movie-synopsis">
                    {movie.synopsis}
                </div>
            </div>
        </div>
    )
};

export { MovieCard };