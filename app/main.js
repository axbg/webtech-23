import express from "express";
import { router } from "./routes/config.js";
import { logger as loggerMiddleware } from './middlewares/logger.js';
import { synchronizeDatabase } from "./models/config.js";

const PORT = 8080;

const app = express();

// process incoming JSON bodies in requests
app.use(express.json());

// attach a middleware
app.use(loggerMiddleware);

// attach a router
app.use("/api/v1", router);

// start listening for connections
const server = app.listen(PORT, async () => {
    try {
        await synchronizeDatabase();
        console.log(`Server started on http://localhost:${PORT}`);
    } catch (err) {
        console.log("There was an error with the database connection");
        server.close();
    }
});

server.on("close", () => {
    console.log("Stopping the server");
});