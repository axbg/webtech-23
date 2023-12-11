import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { useDispatch } from 'react-redux';
import { setMovies } from '../../reducers/movies-reducer';

const SERVER_URL = "http://localhost:8080/api/v1";

const Home = () => {
    // hook pentru a naviga catre o pagina dorita
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`${SERVER_URL}/movies`)
            .then(res => res.json())
            // dispatch-ul actiunii setMovies
            .then(data => dispatch(setMovies(data.movies)));
    }, []);

    return (
        <div className='home'>
            <h1>Explore movies</h1>
            <button className='custom-button' onClick={() => navigate('/movies')}>Start now</button>
            <br />
            <h1>Explore the latest series</h1>
            <button className='custom-button' onClick={() => navigate('/series')}>Start now</button>
        </div>
    )
};

export { Home };