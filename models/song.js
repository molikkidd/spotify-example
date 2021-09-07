'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Song.belongsTo(models.Album, {foreignKey: "albumId "})
      models.Song.belongsTo(models.Artist, {foreignKey: "artistId "})
      models.Song.belongsToMany(models.User, {through: 'Playlist', foreignKey: "songId "})
    }
  };
  Song.init({
    title: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    plays: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};

// add albumId and artistId to the when creating the Model then delete them from the model file
// but they can remain in the table because we are making the association to the other models