import React, { useState } from 'react';

import { Card, CardContent, Button, Box, Grid, Typography, TextField } from '@mui/material';

// componenta MovieCard primeste un prop denumit movie - obiectul ce descrie un film
// o functie onDelete ce va fi apelata atunci cand se doreste stergerea unui element
const MovieCard = ({ movie, onUpdate, onDelete }) => {
    const [isEditable, setIsEditable] = useState(false);
    const [movieDetails, setMovieDetails] = useState({ ...movie });

    const confirmDelete = (movie) => {
        if (window.confirm(`Do you want to delete ${movie.title}?`)) {
            onDelete(movie);
        }
    }

    const updateMovieDetail = (event) => {
        setMovieDetails({ ...movieDetails, [event.target.name]: event.target.value })
    }

    const cancelUpdate = () => {
        setMovieDetails({ ...movie });
        setIsEditable(false);
    }

    const updateMovie = (event) => {
        event.preventDefault();

        onUpdate(movieDetails);
        setIsEditable(false);
    }

    return (
        <Card variant='outlined' sx={{ marginTop: 2 }}>
            {/* utilizarea componentei grid pentru a realiza aranjarea si spatierea elementelor */}
            {isEditable ?
                <CardContent>
                    <form onSubmit={updateMovie}>
                        <Grid container columnSpacing={1} direction="column">
                            <TextField
                                label="Title"
                                value={movieDetails.title}
                                error={!movieDetails.title}
                                onChange={updateMovieDetail}
                                type="text" id="title"
                                name="title"
                                required />
                            <br />
                            <TextField
                                label="Year"
                                value={movieDetails.year}
                                error={!movieDetails.year}
                                InputProps={{ inputProps: { min: 1930, max: 2100 } }}
                                onChange={updateMovieDetail}
                                type="number"
                                id="year"
                                name="year"
                                required />
                            <br />
                            <TextField
                                label="Director"
                                value={movieDetails.director}
                                error={!movieDetails.director}
                                onChange={updateMovieDetail}
                                type="text" id="director"
                                name="director"
                                required />
                            <br />
                            <TextField
                                label="Genre"
                                value={movieDetails.genre}
                                error={!movieDetails.genre}
                                onChange={updateMovieDetail}
                                type="text"
                                id="genre"
                                name="genre"
                                required />
                            <br />
                            <TextField
                                multiline
                                rows={4}
                                label="Synopsis"
                                value={movieDetails.synopsis}
                                onChange={updateMovieDetail}
                                id="synopsis"
                                name="synopsis" />
                            <br />
                            <TextField
                                label="Duration (minutes)"
                                value={movieDetails.duration}
                                onChange={updateMovieDetail}
                                type="number"
                                id="duration"
                                name="duration" />
                            <br />
                            <TextField
                                label="Poster URL"
                                value={movieDetails.poster}
                                onChange={updateMovieDetail}
                                type="url"
                                id="poster"
                                name="poster" />
                            <br />
                        </Grid>
                        <Button type="submit" variant="contained" color="warning" sx={{ marginRight: 1 }}>Save</Button>
                        <Button variant="contained" color="error" onClick={cancelUpdate}>Abort changes</Button>
                    </form>
                </CardContent>
                :
                <CardContent>
                    <Grid container spacing={2} columns={12}>
                        <Grid item xs={2}>
                            <img alt="movie-img" style={{ maxWidth: "100%", height: "auto" }} src={movie.poster} />
                        </Grid>
                        <Grid item xs={10}>
                            <Grid container columns={12}>
                                <Grid item xs={5}>
                                    <Typography variant="h6">
                                        {`${movie.title} (${movie.year})`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={7} textAlign="right">
                                    <Button variant="contained" color="warning" onClick={() => setIsEditable(true)} sx={{ marginRight: 1 }}>Edit</Button>
                                    <Button variant="contained" color="error" onClick={() => confirmDelete(movie)}>X</Button>
                                </Grid>
                            </Grid>
                            <Box mt={2} mb={2}>
                                {/* sx - proprietate pentru stil custom */}
                                <Typography sx={{ fontStyle: 'italic' }}>
                                    {`${movie.genre} • ${movie.duration} minutes • ${movie.director}`}
                                </Typography>
                            </Box>
                            {/* culoare selectata din tema default https://mui.com/material-ui/customization/palette/ */}
                            <Box backgroundColor="warning.main" p={2} sx={{ borderRadius: 5 }} color="white">
                                {movie.synopsis}
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            }
        </Card>
    )
};

export { MovieCard };