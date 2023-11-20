import { Op } from "sequelize";
import { Collection, Movie } from "../models/config.js";

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
    const movie = await Movie.findOne({
        where: {
            id: id
        },
        include: {
            model: Collection,
            // remove the joint table from the result
            through: {
                attributes: []
            }
        }
    });

    return movie;
};

export const create = async (movie) => {
    const mov = await Movie.create(movie);

    if (!!movie.collectionId) {
        await mov.addCollection(movie.collectionId);
    }

    return mov;
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

        if (!!movieUpdateData.collectionId) {
            await movie.addCollection(movieUpdateData.collectionId);
        }

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