# React Router & Redux

## Conținut
1. [React Router](#1-react-router)
    1. [Rutarea tradițională vs rutarea în aplicația client](#11-rutarea-tradițională-vs-rutarea-în-aplicația-client)
    2. [React Router](#12-react-router)

2. [Definirea rutelor](#2-definirea-rutelor)

3. [Gestionarea a stării globale](#3-gestionarea-stării-globale)
    1. [Prop drilling](#31-prop-drilling)
    2. [Redux](#32-redux)

4. [Utilizarea Redux](#4-utilizarea-redux)

## 1. React Router
### 1.1 Rutarea tradițională vs. rutarea în aplicația client
- Majoritatea site-urilor și aplicațiilor web sunt alcătuite din mai multe pagini ce prezintă diverse funcționalități

- La încărcarea unui website tradițional, browser-ul cere și descarcă o pagină, ce conține HTML, CSS și JavaScript, din cadrul unui server web, afișând elementele după încărcarea întregului conținut

- În momentul în care un utilizator accesează o altă pagină de pe același site, întreg procesul se repetă

- Asocierea unei rute cu o anumită pagină a unui website poartă denumirea de **rutare**

- În aplicațiile moderne, rutarea este realizată, de obicei, în aplicația client, deci în browser, fără a reafișa un document HTML de la zero, fapt ce permite încărcarea optimizată a informațiilor în pagină,  într-un mod mai rapid și mai dinamic

- O aplicație care folosește o astfel de rutare poartă de numirea de aplicație cu o singură pagină (**SPA** - _Single Page Application_), deoarece interacționează cu utilizatorul prin rescrierea dinamică a paginii curente cu date actualizate, spre diferență de metoda implicită de încărcare completă a paginii

    ![traditional vs spa app](https://www.digitalclaritygroup.com/wp-content/uploads/2017/10/SPA-1.png)


### 1.2 React Router
- Fiind o bibliotecă folosită pentru construirea interfețelor grafice, React nu oferă, în mod implicit, un utilitar pentru gestionarea rutelor

- **React Router** este o bibliotecă pentru React care furnizează facilități de rutare

- Acesta ajută la gestionarea și sincronizarea navigării în aplicațiile React, astfel încât, în funcție de ruta curentă, să poată fi afișate componente specifice 

- React Router pune la dispoziția programatorilor mai multe componente pentru implementarea mecanismului de rutare:
    - **Router**
        - componenta care se ocupă cu sincronizarea dintre URL și conținutul afișat
        - există 3 tipuri de routere ce pot fi folosite:
            - *BrowserRouter*
                - utilizează History API pentru a sincroniza adresa URL a browser-ului și starea aplicației
                - implementează navigarea între pagini (înainte/înapoi) folosind istoricul predefinit al browser-ului
                - **opțiunea recomandată**

            - *HashRouter*
                - util atunci când nu se poate configura serverul web
                - în loc să folosească un URL normal, va folosi porțiunea din URL de după hash (#) pentru a controla conținutul afișat

            - *MemoryRouter*
                - în loc să utilizeze istoricul browser-ului, ține evidența paginilor accesate in-memory
                - util în principal pentru testare, dar poate fi folosit și în medii care nu sunt bazate pe browsere 

    - **Route**
        - componenta de bază folosită pentru a asocia o componentă React cu o anumită rută
        - atunci când ruta corespunde, componenta asociată este afișată
    
    - **Routes**
        - componenta care grupează rutele și asigură că elementele sunt afișate corect pentru un anumit URL
        - în versiunile mai vechi (până la v6 - versiunea curentă), această componentă purta numele de _Switch_ și avea mai puține funcționalități

    - **Link**
        - componenta care permite crearea de link-uri între pagini în aplicațiile React
        - generează link-uri care actualizează URL-ul, dar fără a provoca o reîncărcare a paginii

- Un exemplu simplu de definire a unui router în componenta principală a unei aplicații React (_App.js_):
    ```js
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import { Home } from './Home';

    function App() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        );
    }
    ```


## 2. Definirea rutelor
- În aplicația action! există 3 entități distincte: Movies, Collections și Persons

- Pentru fiecare dintre acestea putem defini câte o rută care să afișeze pagina corectă

- Primul pas constă în instalarea bibliotecii React Router
    ```sh
    npm install --save react-router-dom
    ```

- Ulterior, vom crea o pagină de tip _Home_ pentru a putea fi afișată pe ruta principală **(/)**, având rolul de landing page
    - _src/pages/Home/index.jsx_
        ```js
        import React from 'react';
        import { useNavigate } from 'react-router-dom';
        import './style.css';

        const Home = () => {
            // hook pentru a naviga catre o pagina dorita
            const navigate = useNavigate();

            return (
                <div className='home'>
                    <h1>Explore movies</h1>
                    <button className='custom-button' onClick={() => navigate('/movies')}>Start now</button>
                </div>
            )
        };

        export { Home };
        ```

    - _src/pages/Home/style.css_
        ```css
            .home {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100%;
            }
        ```

- Pentru cazurile în care ruta nu este identificată, definim o pagină de tip _Not found_
    - _src/pages/NotFound/index.jsx_
        ```js
        import React from 'react';

        const NotFound = () => {
            return (
                <h1>Page not found.</h1>
            );
        };

        export { NotFound };
        ```

- La nivelul întregii aplicații vom configura un router:
    - ruta principală _/_ va afișa pagina _Home_
    - ruta _/movies_ va afișa pagina Movies
    - orice altă rută va afișa pagina _NotFound_

- Configurarea routerului se va face în componenta root a aplicației
    - src/App.js
  ```js
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import { Movies } from './pages/Movies';
  import { Home } from './pages/Home';
  import { NotFound } from './pages/NotFound';
  import './App.css';

  function App() {
    return (
      <div className="App">
        <div class="header">
          <div class="app-title">action!</div>
        </div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    );
  }

  export default App;
  ```

- Pe lângă rutare, ce este gestionată cel mai adesea la nivel global, pot exista contexte în care sincronizarea datelor la nivelul mai multor componente să fie necesară, formând o stare globală a aplicației


## 3. Gestionarea stării globale
### 3.1 Prop drilling
- Analizând următoarea ierarhie de componente:
    ```js
    // Componenta A
    function ComponentA({ data, onDataUpdate }) {
        // ...
        return <ComponentB data={data} onDataUpdate={onDataUpdate} />;
    }

    // Componenta B
    function ComponentB({ data, onDataUpdate }) {
        // ...
        return <ComponentC data={data} onDataUpdate={onDataUpdate} />;
    }

    // Componenta C
    function ComponentC({ data, onDataUpdate }) {
        // Utilizează sau afișează data
        return (
            <div>
            {data}
            <button onClick={() => onDataUpdate("Date actualizate")}>
                Actualizează Data
            </button>
            </div>
        );
    }
    ```

- Observăm că, deși primește ca props elementele _data_ și _onDataUpdate_, Componenta A nu le folosește în mod direct ci le transmite mai departe către Componenta B

- Similar, Componenta B, fără a folosi aceste valori, le transmite mai departe către Componenta C

- Această pasare intermediară, de cele mai multe ori redundantă, de informații pentru a ajunge la componenta din ierarhie pentru care informațiile sunt relevante poartă numele de **"prop drilling"**

    ![prop drilling](https://miro.medium.com/v2/resize:fit:1256/0*ioNTCLVXxOEyed9U)

- Problemele pot apărea în contextul unei ierarhii profunde de componente când datele trebuie să fie transmise prin multe niveluri, fapt ce poate face întreaga aplicație mai greu de întreținut și de înțeles

- Pentru a rezolva astfel de situații, cea mai populară metodă este utilizarea unui mecanism de gestionare a stării globale, precum Redux sau React Context

- În cadrul seminarului vom analiza varianta mai complexă și mai puternică, Redux, însă poți citi mai multe [aici](https://react.dev/reference/react/createContext) despre React Context, o variantă mai simplă ce poate fi foarte eficientă, mai ales în aplicațiile de dimensiuni reduse și medii

### 3.2 Redux
- **Redux** este o bibliotecă open-source pentru gestionarea și centralizarea stării aplicației

- Principalele concepte din Redux sunt:
    - **store** ("baza de date" globală)
        - un obiect care conține întreaga stare a aplicației
        - starea este modificată _doar_ prin intermediul unor funcții speciale numite _reduceri_
    
    - **reducers** (reduceri)
        - funcție pură (nu afectează contextul exterior) care modifică starea curentă în urma unei _acțiuni_
        - primește starea curentă și o acțiune și returnează o _nouă_ stare

    - **actions** (acțiuni)
        - obiecte care descriu intenția de a modifica starea
        - sunt trimise către reduceri

    - **dispatch** (declanșare)
        - procesul de a trimite o acțiune către store

    - **middleware**
        - funcționalități adiționale ce pot fi introduse între trimiterea unei acțiuni și procesarea ei de către reducer
        - ex. logare

- În cadrul Redux se poate observa un **flux unidirecțional de date**, ceea ce înseamnă că datele circulă într-un singur sens: prin acțiuni -> reduceri -> store

- Acest flux poate fi urmărit gradual:
    - La _inițializare_:
        - un store Redux e creat folosind o funcție reducer
        - store-ul apelează reducer-ul o dată și salvează valorile inițiale returnate
        - componentele UI pot accesa acum starea curentă a store-ului și pot primi toate actualizările viitoare pe măsură ce se întâmplă, pentru a afișa datele corecte

    - La _actualizare_:
        - un eveniment determină necesitatea actualizării datelor
        - o acțiune este transmisă către store-ul Redux (dispatch), ex: _dispatch({type: 'counter/increment'})_
        - este apelat reducer-ul, care primește starea anterioară și tipul acțiunii și returnează noua stare, care este salvată
        - store-ul notifică întreaga aplicație cu privire  la această actualizare
        - fiecare componentă care utilizează acea parte a store-ului este reafișarea pentru a putea afișa informațiile corecte

    ![redux flow](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)


## 4. Utilizarea Redux 
- În cadrul store-ului vom salva datele despre filme pe care le vom prelua în momentul accesării rutei principale, cu scopul ca acestea să fie disponibile la nivelul întregii aplicații

- Tot la nivelul store-ului vom sincroniza procesul de adăugare a unui film nou și vom folosi numărul de filme stocate pentru pagina NotFound, definind un mesaj de forma: "Page not found, but you can browse N movies here"

- Primul pas este reprezentat de instalarea redux și a plugin-ului Redux pentru React
    ```sh
    npm install --save @reduxjs/toolkit react-redux
    ```

- Ulterior, vom crea un fișier pentru store, și un fișier pentru un reducer și acțiunile corespunzătoare fiecărui eveniment:
    - _src/reducers/movies-reducer.js_
        ```js
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
        ```

    - _src/stores/store.js_
        ```js
        import { configureStore } from '@reduxjs/toolkit';
        import moviesReducer from '../reducers/movies-reducer';

        export default configureStore({
            reducer: moviesReducer
        });
        ```

- Înainte de a putea folosi store-ul și acțiunile în aplicație, aceasta trebuie să fie _înglobată într-un context Redux_
    - _src/index.js_
        ```js
        import React from 'react';
        import ReactDOM from 'react-dom/client';
        import './index.css';
        import App from './App';
        import reportWebVitals from './reportWebVitals';
        import store from './stores/store';
        import { Provider } from 'react-redux';

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(
            <React.StrictMode>
                <Provider store={store}>
                    <App />
                </Provider>
            </React.StrictMode>
        );

        reportWebVitals();
        ```

- Vom încărca datele în store în momentul accesării aplicației, în componenta _Home_
    - _src/pages/Home/index.jsx_
        ```js
        import React, { useEffect } from 'react';
        import { useNavigate } from 'react-router-dom';
        import { useDispatch } from 'react-redux';
        import { setMovies } from '../../reducers/movies-reducer';
        import './style.css';

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
        ```

- Și vom accesa valoarea în cadrul paginii _NotFound_
    - _src/pages/NotFound/index.jsx_
        ```js
        import React from 'react';
        import { useSelector } from 'react-redux';
        import { useNavigate } from 'react-router-dom';

        const NotFound = () => {
            // utilizarea state-ului
            const movies = useSelector((state) => state.movies);
            const navigate = useNavigate();

            return (
                <div>
                    <h1>Page not found.</h1>
                    <div>{`However, you can explore ${movies.length} movies`} <span onClick={() => navigate('/movies')}>here</span></div>
                </div>
            );
        };

        export { NotFound };
        ```

- În plus, vom modifica și pagina Movies pentru a integra cea de-a doua acțiune, addMovie, ce va fi apelată imediat după ce un film va fi adăugat în aplicație
    - _src/pages/Movies/index.jsx_
        ```js
        import React, { useState, useEffect } from 'react';
        import { useDispatch } from 'react-redux';
        import { addMovie as addMovieAction } from '../../reducers/movies-reducer';

        import { MovieCard } from '../../components/MovieCard';

        import './style.css';
        import { CreateMovieModal } from '../../components/CreateMovieModal';
        import { Searchbar } from '../../components/Searchbar';

        const SERVER_URL = "http://localhost:8080/api/v1";

        const Movies = () => {
            const [movies, setMovies] = useState([]);
            const [isModalOpen, setIsModalOpen] = useState(false);

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

            return (
                <div>
                    <div className="container">
                        <h3>All movies</h3>
                        <Searchbar openModal={openModal} getMovies={getMovies} />
                        <div id="moviesContainer">
                            {movies.map((movie, index) => (
                                <MovieCard movie={movie} key={index} onDelete={deleteMovie} />
                            ))}
                        </div>
                    </div>
                    {isModalOpen && <CreateMovieModal onAddMovie={addMovie} closeModal={closeModal} />}
                </div>
            )
        };

        export { Movies };
        ```

- Iar in Searchbar vom adăuga un buton de navigare către o pagină inexistentă pentru a observa actualizarea automată a state-ului
    - _src/components/Searchbar/index.jsx_
        ```js
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
                    // navigare catre o pagina inexistenta
                    <button className="custom-button" onClick={() => navigate("/series")}>Series Page</button>
                </div>
            );
        };

        export { Searchbar };
        ```
