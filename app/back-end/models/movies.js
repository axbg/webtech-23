export const MovieTemplate = (db, DataTypes) => {
    return db.define("movie", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1900
            }
        },
        director: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING
        },
        synopsis: {
            type: DataTypes.TEXT
        },
        duration: {
            type: DataTypes.TINYINT
        },
        poster: {
            type: DataTypes.STRING
        }
    },
        {
            underscored: true,
            indexes: [
                {
                    unique: true,
                    fields: ['title', 'year', 'director']
                }
            ]
        })
};