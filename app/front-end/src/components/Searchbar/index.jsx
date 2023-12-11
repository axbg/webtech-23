import React, { useState } from "react";

import "./style.css";

// primirea unor metode din parinte ce vor fi apelate din copil
const Searchbar = ({ openModal, getMovies }) => {
    // declaram o variabila state pentru a stoca titlul filmului cautat de utilizator
    const [queryTitle, setQueryTitle] = useState(null);

    const onChangeQueryTitle = (event) => {
        // preluarea valorii introduse de utilizator pentru filmul cautat
        const searchedMovieTitle = event.target.value;
        // setarea valorii in state
        setQueryTitle(searchedMovieTitle);
    }

    return (
        <div className="toolbar">
            <input onChange={onChangeQueryTitle} id="search" className="searchbar custom-text-input" type="text" placeholder="Search for a movie" />
            <button className="custom-button" onClick={() => getMovies(queryTitle)}>Search</button>
            <button className="custom-button" onClick={() => openModal()}>Add a movie</button>
        </div>
    );
};

export { Searchbar };