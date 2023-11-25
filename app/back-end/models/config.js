import { DataTypes, Sequelize } from "sequelize";
import { MovieTemplate } from "./movies.js";
import { CollectionTemplate } from "./collections.js";
import { PersonTemplate } from "./persons.js";

export const db = new Sequelize({
   dialect: "sqlite",
   storage: "action.db"
});

export const Movie = MovieTemplate(db, DataTypes);
export const Collection = CollectionTemplate(db, DataTypes);
export const Person = PersonTemplate(db, DataTypes);

Movie.belongsToMany(Collection, { through: "movie_collections" });
Collection.belongsToMany(Movie, { through: "movie_collections" });

Person.hasMany(Collection);
Collection.belongsTo(Person);

export const synchronizeDatabase = async () => {
   await db.authenticate();
   await db.sync();
};
