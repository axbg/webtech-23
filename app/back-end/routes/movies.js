import express from 'express';
import * as moviesController from "../controllers/movies.js";

export const router = express.Router();

// rute get
router.get("/", moviesController.getMovies);
router.get("/:id", moviesController.getById);

// rute post
router.post("/", moviesController.create);

// rute patch
router.patch("/", moviesController.update);

// rute delete
router.delete("/:id", moviesController.remove);
