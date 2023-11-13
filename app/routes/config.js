import express from 'express';

import {router as moviesRouter} from './movies.js';

export const router = express.Router();

router.use("/movies", moviesRouter);