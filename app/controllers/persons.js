import * as personsService from "../services/persons.js";

export const getPersons = async (req, res) => {
    res.send({ persons: await personsService.getPersons(req.query) });
}

export const getById = async (req, res) => {
    const person = await personsService.getById(req.params.id);

    if (!!person) {
        res.send({ person: person });
    } else {
        res.status(404).send();
    }
}

export const create = async (req, res) => {
    if (!req.body.firstname || !req.body.email) {
        return res.status(404).send({ message: "Missing name or email" });
    }

    const existingPerson = await personsService.getPersons({ firstname: req.body.firstname, email: req.body.email });
    if (existingPerson.length !== 0) {
        return res.status(400).send({ message: "Person with this name or email already exists" });
    }

    await personsService.create(req.body);
    res.status(201).send();
}

export const update = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).send({ message: "Person id is mandatory" });
    }

    await personsService.update(req.body);
    res.status(204).send();
}

export const remove = async (req, res) => {
    personsService.remove(req.params.id);
    res.send();
}