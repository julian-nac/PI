const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('videogame', {  // Defino el modelo videogame
    id: {
      type: DataTypes.UUID, //UUID
      allowNull: false,
      primaryKey: true, // Clave
      defaultValue: DataTypes.UUIDV4, // Establece valor unico
    },

    name: {
      type: DataTypes.STRING, //Cadena de texto 
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING, //Cadena de texto 
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT, //Cadena de texto grande
      allowNull: false,
    },

    released: {
      type: DataTypes.STRING, //Cadena de texto
      //No hace falta se puede permitir que sea nulo
    },

    rating: {
      type: DataTypes.STRING, //Cadena de texto
      
    },

    createdInDb: {
      type: DataTypes.BOOLEAN, //Tipo booleano 
      allowNull: false,
      defaultValue: true, //Si no se proporciona un valor específico se asumirá automáticamente que createdInDb es true.
    }

  });
};
