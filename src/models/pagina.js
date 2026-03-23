'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pagina extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pagina.belongsTo(models.Manga, { foreignKey: 'manga_id' });
    }
  }
  Pagina.init({
    manga_id: DataTypes.INTEGER,
    capitulo_id: DataTypes.INTEGER,
    numero_pagina: DataTypes.INTEGER,
    imagem_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pagina',
    tableName: 'paginas'
  });
  return Pagina;
};
