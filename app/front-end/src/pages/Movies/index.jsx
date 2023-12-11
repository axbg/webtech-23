import React, { useState, useEffect } from 'react';

import { MovieCard } from '../../components/MovieCard';

import './style.css';
import { CreateMovieModal } from '../../components/CreateMovieModal';
import { Searchbar } from '../../components/Searchbar';

const SERVER_URL = "http://localhost:8080/api/v1";

const Movies = () => {
    // declaram o variabila state pentru a stoca filmele - inițial este un array gol
    const [movies, setMovies] = useState([]);
    // declaram o variabila state pentru a determina daca afisam sau nu modala
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getMovies = (queryTitle) => {
        const queryParams = new URLSearchParams();

        if (!!queryTitle) {
            queryParams.append("title", queryTitle);
        }

        // apelam metoda expusa de backend pentru a prelua filmele si le setam in state
        fetch(`${SERVER_URL}/movies?` + queryParams)
            .then(res => res.json())
            .then(data => setMovies(data.movies));
    };

    const addMovie = (movie) => {
        fetch(`${SERVER_URL}/movies`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie)
        })
            .then(res => getMovies())
            .catch(err => console.log(err));
    }

    const deleteMovie = (movie) => {
        fetch(`${SERVER_URL}/movies/${movie.id}`, { method: "DELETE" })
            .then(res => getMovies())
            .catch(err => console.log(err));
    }

    useEffect(() => {
        // in momentul in care pagina este adaugata in DOM
        // se preiau datele din backend
        getMovies();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div>
            <div className="container">
                <h3>All movies</h3>
                <Searchbar openModal={openModal} getMovies={getMovies} />
                <div id="moviesContainer">
                    {/* sintaxa de JSX, pentru fiecare film din lista este afisata o componenta de tip MovieCard */}
                    {movies.map((movie, index) => (
                        <MovieCard movie={movie} key={index} onDelete={deleteMovie} />
                    ))}
                </div>
            </div>
            {/* randare conditionala */}
            {isModalOpen && <CreateMovieModal onAddMovie={addMovie} closeModal={closeModal} />}
        </div>
    )
};

export { Movies };