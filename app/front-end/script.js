function loadMovies() {
    fetch("http://localhost:8080/api/v1/movies")
        .then(response => response.json())
        .then(data => data.movies)
        .then(movies => {
            const moviesList = document.getElementById("moviesContainer");
            moviesList.innerHTML = "";

            for (let movie of movies) {
                const item = document.createElement("div");
                item.classList.add("movie-container");
                item.addEventListener("click", () => onMovieClick(movie));

                const movieName = document.createElement("p");
                movieName.innerText = movie.title + " (" + movie.year + ")";

                const moviePoster = document.createElement("img");
                moviePoster.setAttribute("src", movie.poster);
                moviePoster.classList.add("poster-container");

                item.appendChild(movieName);
                item.appendChild(moviePoster);

                moviesList.appendChild(item);
            }
        });
}

function onMovieClick(movie) {
    alert("Directed by " + movie.director);
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
            if (response.status === 201) {
                loadMovies();
                alert("Movie added!");
            } else if (response.status === 400) {
                alert("Movie already exists!");
            }
        })
        .catch((error) => {
            console.log("yes");
            console.error('Error:', error);
        });
}