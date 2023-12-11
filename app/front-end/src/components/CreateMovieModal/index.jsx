import React, { useState } from 'react';

import "./style.css";

const CreateMovieModal = ({ onAddMovie, closeModal }) => {
    // adaugam in state toate campurile care vor fi completate
    const [title, setTitle] = useState("");
    const [year, setYear] = useState(0);
    const [director, setDirector] = useState("");
    const [genre, setGenre] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [duration, setDuration] = useState(0);
    const [poster, setPoster] = useState("");

    // definim callbacks pentru evenimentele de onChange pentru toate inputurile
    const onChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const onChangeYear = (event) => {
        setYear(event.target.value);
    }

    const onChangeGenre = (event) => {
        setGenre(event.target.value);
    }

    const onChangeSynopsis = (event) => {
        setSynopsis(event.target.value);
    }

    const onChangeDirector = (event) => {
        setDirector(event.target.value);
    }

    const onChangeDuration = (event) => {
        setDuration(event.target.value);
    }

    const onChangePoster = (event) => {
        setPoster(event.target.value);
    }

    const saveMovie = (event) => {
        // impiedicam trimiterea default a formularului -> refresh paginii
        event.preventDefault();
        // pasam functiei de salvare obiectul movie construit prin completarea formularului
        onAddMovie({ title, year, director, genre, synopsis, duration, poster });
        closeModal();
    }

    return (
        <dialog id="CreateMovieModal" className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Add movie</h2>
                    <span className="modal-close" onClick={closeModal}>&times;</span>
                </div>
                <form id="addMovieForm" className="create-form">
                    <label htmlFor="title">Title:</label>
                    <input onChange={onChangeTitle} className="custom-text-input" type="text" id="title" name="title" required /><br />

                    <label htmlFor="year">Year:</label>
                    <input onChange={onChangeYear} className="custom-text-input" type="number" id="year" name="year" required /><br />

                    <label htmlFor="director">Director:</label>
                    <input onChange={onChangeDirector} className="custom-text-input" type="text" id="director" name="director" required /><br />

                    <label htmlFor="genre">Genre:</label>
                    <input onChange={onChangeGenre} className="custom-text-input" type="text" id="genre" name="genre" required /><br />

                    <label htmlFor="synopsis">Synopsis:</label>
                    <textarea onChange={onChangeSynopsis} className="custom-text-input" id="synopsis" name="synopsis" required></textarea><br />

                    <label htmlFor="duration">Duration (minutes):</label>
                    <input onChange={onChangeDuration} className="custom-text-input" type="number" id="duration" name="duration" required /><br />

                    <label htmlFor="poster">Poster URL:</label>
                    <input onChange={onChangePoster} className="custom-text-input" type="url" id="poster" name="poster" required /><br />

                    <button className="custom-button" onClick={saveMovie}>Save</button>
                </form>
            </div>
        </dialog>
    )
};

export { CreateMovieModal };