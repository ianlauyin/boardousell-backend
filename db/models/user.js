"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.wishlist);
      this.belongsTo(models.level);
      this.hasMany(models.cart);
      this.hasMany(models.order);
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      levelId: {
        type: DataTypes.INTEGER,
        references: { model: "levels", key: "id" },
        defaultValue: 1,
      },
      uuid: DataTypes.STRING,
      isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
      points: { type: DataTypes.INTEGER, defaultValue: 0 },
      phone: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return User;
};
