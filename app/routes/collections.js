import express from 'express';
import * as collectionsController from "../controllers/collections.js";

export const router = express.Router();

router.get("/", collectionsController.getCollections);
router.get("/:id", collectionsController.getById);

router.post("/", collectionsController.create);

router.patch("/", collectionsController.update);

router.delete("/:id", collectionsController.remove);
