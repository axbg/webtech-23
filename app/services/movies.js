import { Op } from "sequelize";
import { Movie } from "../models/config.js";

export const getMovies = async (query) => {
    delete query.id;
    delete query.poster;

    const where = Object.keys(query).map(key => {
        if (key === "title" || key === "director") {
            return { [key]: { [Op.like]: `%${query[key]}%` } }
        }

        return { [key]: query[key] }
    });

    return await Movie.findAll({
        attributes: ['id', 'title', 'year', 'director', 'genre', 'poster'],
        where: where
    });
};

export const getById = async (id) => {
    return await Movie.findOne({
        where: {
            id: id
        }
    });
};

export const create = async (movie) => {
    return await Movie.create(movie);
};

export const update = async (movieUpdateData) => {
    const movie = await Movie.findOne({
        where: {
            id: movieUpdateData.id
        }
    });

    if (!!movie) {
        delete movieUpdateData.id;
        movie.set({
            ...movieUpdateData
        });

        await movie.save();
    }
}

export const remove = (id) => {
    Movie.destroy({
        where: {
            id: id
        }
    });
}