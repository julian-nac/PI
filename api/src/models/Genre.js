const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('genre', { //Defino el modelo genre
        id: {
            type: DataTypes.UUID, //Identificador unico
            allowNull: false,
            primaryKey: true, // Clave primaria
            defaultValue: DataTypes.UUIDV4, //Establezco un valor unico UUID = Universal Unique Identifier
        },

        name: {
            type: DataTypes.STRING, //Almacena cadenas de texto
            allowNull: false,

        },
    });
};