import express from 'express';
import {router as movieRouter} from './routes/movie.js';

const PORT = 8080;

const app = express();
app.use(express.json());

// atașarea rutelor specifice unui film
app.use("/movie", movieRouter);

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));