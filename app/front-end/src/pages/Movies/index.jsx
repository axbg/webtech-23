import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addMovie as addMovieAction } from '../../reducers/movies-reducer';

import { MovieList } from '../../components/MovieList';
import { MovieTable } from '../../components/MovieTable';

import './style.css';
import { CreateMovieModal } from '../../components/CreateMovieModal';
import { Searchbar } from '../../components/Searchbar';

const SERVER_URL = "http://localhost:8080/api/v1";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState("list");

    const dispatch = useDispatch();

    const getMovies = (queryTitle) => {
        const queryParams = new URLSearchParams();

        if (!!queryTitle) {
            queryParams.append("title", queryTitle);
        }

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
            .then(res => {
                // dupa adaugarea unui film, il adaugam in store
                dispatch(addMovieAction(movie));
                getMovies();
            })
            .catch(err => console.log(err));
    }

    const deleteMovie = (movie) => {
        console.log("yees");
        fetch(`${SERVER_URL}/movies/${movie.id}`, { method: "DELETE" })
            .then(res => getMovies())
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getMovies();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const switchView = () => {
        setViewMode(viewMode === "list" ? "table" : "list");
    }

    return (
        <div>
            <div className="container">
                <h3>All movies</h3>
                <Searchbar openModal={openModal} getMovies={getMovies} switchView={switchView} />
                {viewMode === "list" && <MovieList movies={movies} deleteMovie={deleteMovie} />}
                {viewMode === "table" && <MovieTable movies={movies} deleteMovie={deleteMovie} />}
            </div>
            {isModalOpen && <CreateMovieModal onAddMovie={addMovie} closeModal={closeModal} />}
        </div>
    )
};

export { Movies };