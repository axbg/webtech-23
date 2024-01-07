import React from 'react';
import { MovieCard } from '../MovieCard';

const MovieList = ({ movies, updateMovie, deleteMovie }) => {
    return <div id="moviesContainer">
        {movies.map((movie, index) => (
            <MovieCard movie={movie} key={index} onUpdate={updateMovie} onDelete={deleteMovie} />
        ))}
    </div>
}

export { MovieList };