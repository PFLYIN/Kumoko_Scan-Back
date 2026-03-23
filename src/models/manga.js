'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Manga.init({
    name: DataTypes.STRING,
    capa_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Manga',
    tableName: 'mangas'
  });
  return Manga;
};
