import { DataTypes, Sequelize } from "sequelize";
import { MovieTemplate } from "./movies.js";

export const db = new Sequelize({
   dialect: "sqlite",
   storage: "action.db" 
});

export const Movie = MovieTemplate(db, DataTypes);

export const synchronizeDatabase = async () => {
   await db.authenticate();
   await db.sync();
};
