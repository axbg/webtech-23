import * as movieService from "../services/movie.js";

const getMovies = (req, res) => {
    res.send({ records: movieService.getMovies() });
};

const getRandomMovie = (req, res) => {
    res.send({ movie: movieService.getRandomMovie() });
};

const search = (req, res) => {
    const identifiedMovie = movieService.search(req.query.title);

    if (!!identifiedMovie) {
        res.send({ movie: identifiedMovie });
    } else {
        // ne amintim că fiecare response are un status atașat ce informează clientul cu privire la 
        //  tipul răspunsului
        res.status(404).send({ message: "Movie not found" });
    }
};

const getById = (req, res) => {
    const identifiedMovie = movieService.getById(req.params.id);

    if (!!identifiedMovie) {
        res.send({ movie: identifiedMovie });
    } else {
        res.status(404).send({ message: "Movie not found" });
    }
};

const create = (req, res) => {
    movieService.create(req.body.title);
    res.status(201).send({ result: "Movie was created" });
};

const update = (req, res) => {
    const result = movieService.update(req.body.oldTitle, req.body.newTitle);

    if (result) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
};

const remove = (req, res) => {
    movieService.remove(req.params.id);
    res.send();
};

// alte metode

export {
    getMovies,
    getRandomMovie,
    search,
    getById,
    create,
    update,
    remove
}