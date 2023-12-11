import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../reducers/movies-reducer';

export default configureStore({
    reducer: moviesReducer
});