const {DataTypes} = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('platform', { //Defino el modelo platform
        id: {
            type: DataTypes.UUID, //UUID
            allowNull: false,
            primaryKey: true, // Clave primaria
            defaultValue: DataTypes.UUIDV4,
        },

        name: {
            type: DataTypes.STRING, // Cadena de texto
            allowNull: false,

        },
    });
};