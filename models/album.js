'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Album.belongsTo(models.Artist, {foreignKey: "artistId "})
      models.Album.hasMany(models.Song, {foreignKey: "albumId "})
    }
  };
  Album.init({
    name: DataTypes.STRING,
    label: DataTypes.STRING,
    genre: DataTypes.STRING,
    releaseYear: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};

// add artistId when creating the initial model then delete it from the model file,
// so it will remain in the migration file as a column and the association between 
// the models will remain