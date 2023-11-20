import { Collection, Movie } from "../models/config.js";

export const getCollections = async () => {
    return await Collection.findAll({
        // include the associated movies and select only the specified attributes
        include: {
            model: Movie,
            attributes: ['id', 'title', 'year', 'director']
        }
    });
}

export const getById = async (id) => {
    return await Collection.findOne({
        where: {
            id: id
        },
        include: {
            model: Movie,
            // remove the joint table from the result
            through: {
                attributes: []
            }
        }
    });
};

export const create = async (collectionData) => {
    return await Collection.create(collectionData);
};

export const update = async (collectionUpdateData) => {
    const collection = await Collection.findOne({
        where: {
            id: collectionUpdateData.id
        }
    });

    if (!!collection) {
        delete collectionUpdateData.id;
        collection.set({
            ...collectionUpdateData
        });

        await collection.save();
    }
}

export const remove = (id) => {
    Collection.destroy({
        where: {
            id: id
        }
    });
}