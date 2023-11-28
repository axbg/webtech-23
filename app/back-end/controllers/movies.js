import * as moviesService from "../services/movies.js";

const getMovies = async (req, res) => {
    res.send({ movies: await moviesService.getMovies(req.query) });
};

const getById = async (req, res) => {
    const identifiedMovie = await moviesService.getById(req.params.id);

    if (!!identifiedMovie) {
        res.send({ movie: identifiedMovie });
    } else {
        res.status(404).send();
    }
};

const create = async (req, res) => {
    if (!req.body.title || !req.body.director || !req.body.year) {
        return res.status(400).send({ message: "Missing title, director or year" });
    }

    const existingMovies = await moviesService.getMovies({ title: req.body.title, director: req.body.director, year: req.body.year });
    if (existingMovies.length !== 0) {
        return res.status(400).send({ message: "Movie already exists" });
    }

    await moviesService.create(req.body);
    res.status(201).send();
};

const update = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).send({ message: "Movie id is mandatory" });
    }

    await moviesService.update(req.body);
    res.status(204).send();
}

const remove = (req, res) => {
    moviesService.remove(req.params.id);
    res.send();
}

export {
    getMovies,
    getById,
    create,
    update,
    remove
}