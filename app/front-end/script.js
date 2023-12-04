window.onload = () => loadMovies();

document.getElementById("addMovieForm").addEventListener('submit', ($event) => {
    $event.preventDefault();
    addMovie()
});

function loadMovies(title) {
    const queryParams = new URLSearchParams();

    if(!!title) {
        queryParams.append("title", title);
    }

    fetch("http://localhost:8080/api/v1/movies?" + queryParams)
        .then(response => response.json())
        .then(data => data.movies)
        .then(movies => {
            const moviesList = document.getElementById("moviesContainer");
            moviesList.innerHTML = "";

            movies.forEach(movie => {
                const movieItem = document.createElement("div");
                movieItem.classList.add("movie-container");

                const movieInfoContainer = document.createElement("div");
                movieInfoContainer.classList.add("movie-info-container");

                const movieHeader = document.createElement("div");
                movieHeader.classList.add("movie-header");

                const movieTitle = document.createElement("h4");
                movieTitle.innerText = `${movie.title} (${movie.year})`;

                const movieDeleteBtn = document.createElement("button");
                movieDeleteBtn.classList.add("remove-btn");
                movieDeleteBtn.innerText = "X";
                movieDeleteBtn.addEventListener("click", () => removeMovie(movie));

                const movieSpecs = document.createElement("div");
                movieSpecs.classList.add("movie-specs");
                movieSpecs.innerText = `${movie.genre} • ${movie.duration} minutes • ${movie.director}`;

                movieHeader.appendChild(movieTitle);
                movieHeader.appendChild(movieDeleteBtn);

                const movieSynopsis = document.createElement("div");
                movieSynopsis.classList.add("movie-synopsis");
                movieSynopsis.innerText = movie.synopsis;

                movieInfoContainer.appendChild(movieHeader);
                movieInfoContainer.appendChild(movieSpecs);
                movieInfoContainer.appendChild(movieSynopsis);

                const moviePoster = document.createElement("img");
                moviePoster.setAttribute("src", movie.poster);
                moviePoster.classList.add("poster-container");

                movieItem.appendChild(moviePoster);
                movieItem.appendChild(movieInfoContainer);

                moviesList.appendChild(movieItem);
            })
        }
    )
}

function removeMovie(movie) {
    fetch(`http://localhost:8080/api/v1/movies/${movie.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        loadMovies();
    })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function searchMovie() {
    const title = document.getElementById("search").value;
    loadMovies(title);
}

function addMovie() {
    const formData = {
        title: document.getElementById('title').value,
        year: parseInt(document.getElementById('year').value),
        director: document.getElementById('director').value,
        genre: document.getElementById('genre').value,
        synopsis: document.getElementById('synopsis').value,
        duration: parseInt(document.getElementById('duration').value),
        poster: document.getElementById('poster').value,
    };

    fetch('http://localhost:8080/api/v1/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(response => {
            document.getElementById("addMovieForm").reset();
            loadMovies();
            closeModal();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function openModal() {
    document.getElementById("addMovieModal").show();
}

function closeModal() {
    document.getElementById("addMovieModal").close();
}