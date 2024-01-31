"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.user);
    }
  }
  Level.init(
    {
      title: DataTypes.STRING,
      requirement: DataTypes.INTEGER,
      discount: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "level",
      underscored: true,
    }
  );
  return Level;
};
