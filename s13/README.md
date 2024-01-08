# React: utilizarea bibliotecilor de componente

## Conținut
1. [Material UI](#1-material-ui)

2. [Integrarea Material UI](#2-integrarea-material-ui)
    1. [Instalare](#21-instalare)
    1. [Utilizarea componentelor de bază](#22-utilizarea-componentelor-de-bază)
    2. [Utilizarea tabelelor](#23-utilizarea-tabelelor)

3. [PrimeReact](#3-primereact)

4. [Bonus: editarea unui film](#4-bonus-editarea-unui-film)

5. [Lucru individual](#5-lucru-individual)

## 1. Material UI
- Adesea, pentru a facilita dezvoltarea aplicațiilor web, programatorii pot folosi o bibliotecă externă pentru componente vizuale

- O astfel de abordare asigură coerență în ceea ce privește aspectul vizual al aplicației, întrucât componentele importate din bibliotecă sunt, de cele mai multe ori, deja stilizate

- Una dintre alegerile populare pentru React (și nu numai) este **Material UI**

- **Material UI** este o bibliotecă de componente pentru React, construită urmând principiile *"Material Design"*, dezvoltate de Google

- Câteva caracteristici cheie ale Material UI includ:
    - **Componente predefinite**: 
        - Material UI oferă o gamă largă de componente *gata de a fi utilizate*, precum butoane, elemente de navigare, căsuțe de dialog, ferestre modale, câmpuri de text, etc

    - [**Stilizare conform principiilor Material Design**](https://m2.material.io/design/introduction)

    - **Tematică personalizabilă**
        - Material UI permite *personalizarea aspectului componentelor* prin intermediul temelor
        - Dezvoltatorii pot adapta culorile, fonturile și alte detalii pentru a se potrivi cu identitatea vizuală a propriilor proiecte

    - **Suport pentru responsiveness**

    - **Documentație bogată și comunitate activă**


## 2. Integrarea Material UI
### 2.1 Instalare
- Conform [documentației](https://mui.com/material-ui/getting-started/installation/), putem instala Material UI precum un orice alt pachet, utilizând *npm*
    ```sh
    npm install --save @mui/material @emotion/react @emotion/styled
    ```

- Pe lângă componentele principale, Material UI definește o serie de componente opționale, ce pot fi integrate în aplicație dacă este nevoie

- Pentru dezvoltarea tabelului din secțiunea [2.3](#23-utilizarea-tabelelor), vom avea nevoie de un pachet ce conține implementarea tabelului și de un pachet ce conține icon-urile definite de Material
     ```sh
    npm install --save @mui/x-data-grid @mui/icons-material
    ```   

### 2.2 Utilizarea componentelor de bază
- Pentru a observa cum putem utiliza componente importate din Material UI în locul elementelor custom definite anterior, vom actualiza componenta MovieCard

- După rescrierea componentei, vom putea observa că aceasta nu va mai utiliza niciun stil custom definit în fișierul *style.css*, acesta fiind unul dintre principalele avantaje ale utilizării unei biblioteci vizuale ce crește viteza de dezvoltare a unei aplicații 

- *src/components/MovieCard/index.jsx*
    ```js
    import React from 'react';

    import { Card, CardContent, Button, Box, Grid, Typography } from '@mui/material';

    // componenta MovieCard primeste un prop denumit movie - obiectul ce descrie un film
    // o functie onDelete ce va fi apelata atunci cand se doreste stergerea unui element
    const MovieCard = ({ movie, onDelete }) => {
        const confirmDelete = (movie) => {
            if (window.confirm(`Do you want to delete ${movie.title}?`)) {
                onDelete(movie);
            }
        }

        return (
            <Card variant='outlined' sx={{ marginTop: 2 }}>
                {/* utilizarea componentei Card si CardContent pentru afisarea continutului intr-o forma structurata */}
                    <CardContent>
                    {/* utilizarea componentei grid pentru a realiza aranjarea si spatierea elementelor */}
                        <Grid container spacing={2} columns={12}>
                            <Grid item xs={2}>

                                <img alt="movie-img" style={{ maxWidth: "100%", height: "auto" }} src={movie.poster} />
                            </Grid>
                            <Grid item xs={10}>
                                <Grid container columns={12}>
                                    <Grid item xs={5}>
                                        {/* utilizarea componentei Typography pentru stilizarea textului */}
                                        <Typography variant="h6">
                                            {/* sintaxa de JSX */}
                                            {`${movie.title} (${movie.year})`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7} textAlign="right">
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
            </Card>
        )
    };

    export { MovieCard };
    ```

### 2.3 Utilizarea tabelelor
- Pe lângă componente de bază, Material UI oferă multe componente smart, care, pe lângă un aspect specific, prezintă și o serie de funcționalități deja implementate

- Pentru a observa un exemplu, vom integra componenta [Data Grid](https://mui.com/x/react-data-grid/), ce permite afișarea datelor într-un tabel, însă oferă, în mod implicit, posibilitatea de a pagina, sorta și filtra datele afișate, precum și de a ascunde dinamic coloanele afișate

- Pentru a simplifica integrarea tabelului, vom defini o nouă componentă, *MovieTable* și un fișier de stil în care vom adăuga două clase
    - *src/components/MovieTable/index.jsx*
        ```js
        import React from "react";
        import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
        import DeleteIcon from '@mui/icons-material/DeleteOutlined';

        import "./style.css";

        const MovieTable = ({ movies, deleteMovie }) => {
            // configurarea coloanelor
            const columns = [
                { 
                    field: "id", 
                    headerName: "ID", 
                    flex: 0.1, align: 'center', 
                    headerClassName: "table-header", 
                    headerAlign: "center" 
                },
                { 
                    field: "title", 
                    headerName: "Title", 
                    flex: 1,
                    align: 'center', 
                    headerClassName: "table-header", 
                    headerAlign: "center" 
                },
                { 
                    field: "director", 
                    headerName: "Director", 
                    flex: 1, 
                    align: 'center', 
                    headerClassName: "table-header", 
                    headerAlign: "center" 
                },
                {
                    field: "year",
                    headerName: "Year",
                    type: "number",
                    flex: 0.5,
                    align: 'center',
                    headerClassName: "table-header",
                    headerAlign: "center"
                },
                { 
                    field: "genre", 
                    headerName: "Genre", 
                    flex: 0.5, 
                    align: 'center', 
                    headerClassName: "table-header", 
                    headerAlign: "center" 
                },
                {
                    field: "duration",
                    headerName: "Duration",
                    type: "number",
                    flex: 0.5,
                    align: 'center',
                    headerClassName: "table-header",
                    headerAlign: "center"
                },
                {
                    field: "actions",
                    type: "actions",
                    headerName: "Remove",
                    align: "center",
                    headerClassName: "table-header",
                    flex: 0.5,
                    // configurarea butoanelor cu actiuni
                    getActions: ({ id }) => {
                        return ([
                            <GridActionsCellItem
                                icon={<DeleteIcon />}
                                label="Delete"
                                onClick={() => {
                                    if (window.confirm("Do you want to delete this movie?")) {
                                        deleteMovie({ id: id });
                                    };
                                }}
                                color="inherit"
                            />
                        ]);
                    }
                }
            ];

            return (
                <div className="table-container">
                    {/* utilizarea DataGrid */}
                    <DataGrid rows={movies} columns={columns} />
                </div>
            );
        }

        export { MovieTable };
        ```

    - *src/components/MovieTable/style.css*
        ```css
        .table-container {
            height: 350px;
            margin: 0 auto;
            width: 100%;
            background-color: white;
        }

        .table-header {
            background-color: whitesmoke;
        }
        ```

- De asemenea, vom defini o altă componentă denumită *MovieList* în care vom muta implementarea existentă în pagina *Movie* 
    - *src/components/MovieList/index.jsx*
        ```js
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
        ```

- În pagina *Movie* vom adăuga un mecanism ce ne va permite să afișam, condițional, unul dintre cele două moduri de vizualizare
    - *src/pages/Movie/index.jsx*
        ```js
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
            // definirea unui nou state care va reflecta modul de vizualizare selectat, valoarea default fiind cea de lista
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
                        dispatch(addMovieAction(movie));
                        getMovies();
                    })
                    .catch(err => console.log(err));
            }

            const deleteMovie = (movie) => {
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
                // metoda switchView va actualiza modul de vizualizare printr-un pseudo mecanism de "toggle"
                setViewMode(viewMode === "list" ? "table" : "list");
            }

            return (
                <div>
                    <div className="container">
                        <h3>All movies</h3>
                        <Searchbar openModal={openModal} getMovies={getMovies} switchView={switchView} />
                        {/* in functie de valoarea proprietatii viewMode, una dintre cele doua componenta de vizualizare va fi afisata */}
                        {viewMode === "list" && <MovieList movies={movies} deleteMovie={deleteMovie} />}
                        {viewMode === "table" && <MovieTable movies={movies} deleteMovie={deleteMovie} />}
                    </div>
                    {isModalOpen && <CreateMovieModal onAddMovie={addMovie} closeModal={closeModal} />}
                </div>
            )
        };

        export { Movies };
        ```

- După cum putem observa, modul de vizualizare va putea fi modificat din interiorul componentei *Searchbar* pe care va trebui, de asemenea, să o actualizăm
    - *src/components/Searchbar/index.jsx*
        ```js
        import React, { useState } from "react";
        import { useNavigate } from 'react-router-dom';

        import "./style.css";

        const Searchbar = ({ openModal, getMovies, switchView }) => {
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
                    {/* noul buton ce va permite schimbarea modurilor de vizualizare, apeland metoda switchView primita ca props */}
                    <button className="custom-button" onClick={() => switchView()}>Switch view</button>
                    <button className="custom-button" onClick={() => openModal()}>Add a movie</button>
                    <button className="custom-button" onClick={() => navigate("/series")}>Series Page</button>
                </div>
            );
        };

        export { Searchbar };
        ```


## 3. PrimeReact
- O altă bibliotecă de componente vizuale foarte utilizată în aplicațiile React este [PrimeReact](https://primereact.org/), ce prezintă atât un aspect diferit față de Material UI, cât și componente cu diferite funcționalități și o filosofie de utilizare diferită

- Urmărește clipurile de mai jos pentru a vedea cum poți utiliza PrimeReact pentru a implementa un tabel similar cu cel definit anterior
    - [Integrarea unui tabel](https://www.youtube.com/watch?v=gpIXwZZxKws)
    - [Paginarea și filtrarea datelor din tabel](https://www.youtube.com/watch?v=YjN0cq2BO6k)
    - [Sortarea datelor din tabel](https://www.youtube.com/watch?v=n-xsJh0Xi1Y)

- În plus, pe lângă bibliotecile "tradiționale" de componente, ce adesea oferă programatorilor o variantă îmbunătățită a elementelor native din browser, există biblioteci ce simplifică implementarea unor scenarii particulare, cum ar fi desenarea unei hărți sau a unui grafic 

- Urmărește clipul de mai jos pentru a vedea cum poți utiliza Google Charts într-o aplicație React
    - [Utilizare Google Charts](https://www.youtube.com/watch?v=ss2Xui0NT-U)


## 4. Bonus: editarea unui film
- Pentru a putea fi o pagină complet utilizabilă, pagina *Movies* trebuie să permită utilizatorului funcționalitatea de editare a unui film deja inserat

- Pentru a implementa acest scenariu, vom actualiza componenta *MovieCard* și vom utiliza componente importate din Material UI în definirea noilor câmpuri
    - *src/components/MovieCard/index.jsx*
        ```js
        import React, { useState } from 'react';

        import { Card, CardContent, Button, Box, Grid, Typography, TextField } from '@mui/material';

        // componenta MovieCard primeste un prop denumit movie - obiectul ce descrie un film
        // o functie onUpdate ce va fi apelata atunci cand se doreste actualizarea unui element
        // o functie onDelete ce va fi apelata atunci cand se doreste stergerea unui element
        const MovieCard = ({ movie, onUpdate, onDelete }) => {
            // proprietate ce va determina modul de vizualizare: de citire sau de editare
            const [isEditable, setIsEditable] = useState(false);
            // proprietate ce va contine valorile actualizate pe masura ce formularul de editare este completat
            const [movieDetails, setMovieDetails] = useState({ ...movie });

            const confirmDelete = (movie) => {
                if (window.confirm(`Do you want to delete ${movie.title}?`)) {
                    onDelete(movie);
                }
            }

            // la actualizarea unei valori, aceasta este salvata in state, pastrand toate celelalte date ce nu au fost modificate
            const updateMovieDetail = (event) => {
                setMovieDetails({ ...movieDetails, [event.target.name]: event.target.value })
            }

            // metoda ce va sterge modificarile aduse filmului si va comuta la modul de citire
            const cancelUpdate = () => {
                setMovieDetails({ ...movie });
                setIsEditable(false);
            }

            // metoda ce va utiliza prop-ul onUpdate, primit din componenta parinte, pentru a actualiza datele unui film
            // de asemenea, va comuta la modul de citire
            const updateMovie = (event) => {
                // anularea evenimentului nativ de submit emis de catre formular
                event.preventDefault();

                onUpdate(movieDetails);
                setIsEditable(false);
            }

            return (
                <Card variant='outlined' sx={{ marginTop: 2 }}>
                    { /* in functie de valoarea proprietatii isEditable, va fi afisat modul de editare sau modul de citire */}
                    {isEditable ?
                        <CardContent>
                            { /* definirea unui formular de va apela metoda updateMovie atunci cand butonul de submit va fi apasat */}
                            <form onSubmit={updateMovie}>
                                <Grid container columnSpacing={1} direction="column">
                                    <TextField
                                        label="Title"
                                        { /* afisarea, in cadrul input-ului de tip text, a valorii stocate la nivelul state-ului */}
                                        value={movieDetails.title}
                                        { /* afisarea stilului de camp invalid in momentul in care valoarea este nula */}
                                        error={!movieDetails.title}
                                        { /* actualizarea valorii la nivelul state-ului cu noua valoare introdusa de utilizator */}
                                        onChange={updateMovieDetail}
                                        type="text" id="title"
                                        name="title"
                                        { /* proprietate ce nu va permite salvarea formularului atunci cand aceasta valoare este nula */}
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
                                        { /* utilizarea unui input de tip multilinie */}
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
                                            { /* buton ce va permite comutarea la modul de editare */ }
                                            <Button variant="contained" color="warning" onClick={() => setIsEditable(true)} sx={{ marginRight: 1 }}>Edit</Button>
                                            <Button variant="contained" color="error" onClick={() => confirmDelete(movie)}>X</Button>
                                        </Grid>
                                    </Grid>
                                    <Box mt={2} mb={2}>
                                        <Typography sx={{ fontStyle: 'italic' }}>
                                            {`${movie.genre} • ${movie.duration} minutes • ${movie.director}`}
                                        </Typography>
                                    </Box>
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
        ```

- În pagina *Movie* vom adăuga implementarea metodei ce reprezintă prop-ul *onUpdate* și care execută un call utilizând endpoint-ul de actualizare a datelor expus de către back-end și actualizează datele la nivelul aplicației front-end, fără a reîncărca întreaga listă de filme
    - *src/pages/Movie/index.jsx*
        ```js
        const updateMovie = (movie) => {
            fetch(`${SERVER_URL}/movies`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            })
                .then(res => updateLocalMovie(movie))
                .catch(err => console.log(err));
        }

        const updateLocalMovie = (updatedMovie) => {
            setMovies(movies.map(movie => movie.id === updatedMovie.id ? { ...updatedMovie } : { ...movie }));
        }
        ```


## 5. Lucru individual
- Pentru a te familiariza mai bine cu utilizarea librăriei Material UI încearcă să înlocuiești și restul componentelor din aplicație cu componente importate din Material UI

- Poți găsi lista de componente [aici](https://mui.com/material-ui/all-components/)
