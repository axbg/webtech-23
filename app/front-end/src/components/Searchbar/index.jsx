import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import "./style.css";

const Searchbar = ({ openModal, getMovies }) => {
    const [queryTitle, setQueryTitle] = useState(null);

    const navigate = useNavigate();

    const onChangeQueryTitle = (event) => {
        const searchedMovieTitle = event.target.value;
        setQueryTitle(searchedMovieTitle);
    }

    return (
        <div className="toolbar">
            <input onChange={onChangeQueryTitle} id="search" className="searchbar custom-text-input" type="text" placeholder="Search for a movie" />
            <button className="custom-button" onClick={() => getMovies(queryTitle)}>Search</button>
            <button className="custom-button" onClick={() => openModal()}>Add a movie</button>
            <button className="custom-button" onClick={() => navigate("/series")}>Series Page</button>
        </div>
    );
};

export { Searchbar };