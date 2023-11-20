import express from 'express';
import * as personsController from "../controllers/persons.js";

export const router = express.Router();

router.get("/", personsController.getPersons);
router.get("/:id", personsController.getById);

router.post("/", personsController.create);

router.patch("/", personsController.update);

router.delete("/:id", personsController.remove);
