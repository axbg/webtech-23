import * as collectionsService from "../services/collections.js";

export const getCollections = async (req, res) => {
    res.send({ collections: await collectionsService.getCollections() });
}

export const getById = async (req, res) => {
    const collection = await collectionsService.getById(req.params.id);

    if (!!collection) {
        res.send({ collection: collection });
    } else {
        res.status(404).send();
    }
}

export const create = async (req, res) => {
    if (!req.body.name || !req.body.personId) {
        return res.status(404).send({ message: "Missing name or associated person" });
    }

    const existingCollection = await collectionsService.getCollections({ name: req.body.name, personId: req.body.personId });
    if (existingCollection.length !== 0) {
        return res.status(400).send({ message: "Collection with this name already exists" });
    }

    await collectionsService.create(req.body);
    res.status(201).send();
}

export const update = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).send({ message: "Collection id is mandatory" });
    }

    await collectionsService.update(req.body);
    res.status(204).send();
}

export const remove = async (req, res) => {
    collectionsService.remove(req.params.id);
    res.send();
}