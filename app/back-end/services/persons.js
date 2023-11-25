import { Person, Collection } from "../models/config.js";

export const getPersons = async (query) => {
    console.log(query);
    const where = Object.keys(query).map(key => {
        return { [key]: query[key] }
    });

    return await Person.findAll({
        where: where,
        include: {
            model: Collection,
            attributes: ['id', 'name', 'poster']
        }
    });
}

export const getById = async (id) => {
    return await Person.findOne({
        where: {
            id: id
        },
        include: {
            model: Collection
        }
    });
};

export const create = async (personData) => {
    return await Person.create(personData);
};

export const update = async (personUpdateData) => {
    const person = await Person.findOne({
        where: {
            id: personUpdateData.id
        }
    });

    if (!!person) {
        delete personUpdateData.id;
        person.set({
            ...personUpdateData
        });

        await person.save();
    }
}

export const remove = (id) => {
    Person.destroy({
        where: {
            id: id
        }
    });
}