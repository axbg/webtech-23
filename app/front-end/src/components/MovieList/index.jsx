import React from 'react';
import { MovieCard } from '../MovieCard';

const MovieList = ({ movies, deleteMovie }) => {
    return <div id="moviesContainer">
        {movies.map((movie, index) => (
            <MovieCard movie={movie} key={index} onDelete={deleteMovie} />
        ))}
    </div>
}

export { MovieList };