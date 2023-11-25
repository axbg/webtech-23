export const CollectionTemplate = (db, DataTypes) => {
    return db.define("collection", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        poster: {
            type: DataTypes.STRING
        }
    }, {
        underscored: true
    });
}