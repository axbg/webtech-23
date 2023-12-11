import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
    },
    reducers: {
        // state-ul este imutabil, deci reducerii trebuie sa reconstruiasca, pentru orice actiune, state-ul pe baza valorilor anterioare si a payload-ului curent
        addMovie: (state, action) => {
            return { movies: [...state.movies, action.payload] }
        },
        setMovies: (state, action) => {
            return { movies: [...action.payload] };
        },
    },
});

// exportarea actiunilor
export const { addMovie, setMovies } = moviesSlice.actions;

// exportarea reducerului
export default moviesSlice.reducer;